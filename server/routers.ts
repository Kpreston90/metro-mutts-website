import { attributionRouter } from "./attribution";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { getTodayAndTomorrowAvailability, getAvailability } from "./gingr";
import { notifyOwner } from "./_core/notification";
import { sendPromoRedemptionEmail } from "./email";
import { processChat } from "./chat";
import {
  getAllPromoCodes,
  getPromoCodeByCode,
  createPromoCode,
  updatePromoCode,
  deletePromoCode,
  validatePromoCode,
  redeemPromoCode,
  getRedemptions,
  updateRedemptionStatus,
  hasCustomerRedeemedCode,
  getAllSeasonalMessages,
  getActiveSeasonalMessages,
  createSeasonalMessage,
  updateSeasonalMessage,
  deleteSeasonalMessage,
} from "./db";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  attribution: attributionRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  chat: router({
    /**
     * Send a message to the AI chat assistant (public — no auth required)
     */
    send: publicProcedure
      .input(z.object({
        messages: z.array(z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string().min(1).max(2000),
        })).min(1).max(30),
      }))
      .mutation(async ({ input }) => {
        const response = await processChat(input.messages);
        return { response };
      }),
  }),

  availability: router({
    /**
     * Get availability for today and tomorrow — used by the Limited Spots Toast
     */
    todayAndTomorrow: publicProcedure.query(async () => {
      return getTodayAndTomorrowAvailability();
    }),

    /**
     * Get availability for a specific date — used by the booking modal
     */
    byDate: publicProcedure
      .input(z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }))
      .query(async ({ input }) => {
        return getAvailability(input.date);
      }),
  }),

  promo: router({
    /**
     * Validate a promo code (public) — customers enter a code and see if it's valid
     */
    validate: publicProcedure
      .input(z.object({
        code: z.string().min(1).max(50),
        serviceType: z.enum(["daycare", "boarding", "grooming"]),
      }))
      .query(async ({ input }) => {
        const result = await validatePromoCode(input.code, input.serviceType);
        if (!result.valid) {
          return { valid: false as const, error: result.error };
        }
        return {
          valid: true as const,
          description: result.promo!.description,
          discountType: result.promo!.discountType,
          discountValue: result.promo!.discountValue,
          newCustomersOnly: result.promo!.newCustomersOnly === "true",
        };
      }),

    /**
     * Redeem a promo code (public) — customer submits their info to claim the offer
     */
    redeem: publicProcedure
      .input(z.object({
        code: z.string().min(1).max(50),
        customerName: z.string().min(1).max(255),
        customerEmail: z.string().email().max(320),
        customerPhone: z.string().max(20).optional(),
        serviceType: z.enum(["daycare", "boarding", "grooming"]),
      }))
      .mutation(async ({ input }) => {
        // Validate the code first
        const validation = await validatePromoCode(input.code, input.serviceType);
        if (!validation.valid) {
          return { success: false as const, error: validation.error };
        }

        const promo = validation.promo!;

        // Check if customer already redeemed this code
        const alreadyRedeemed = await hasCustomerRedeemedCode(promo.id, input.customerEmail);
        if (alreadyRedeemed) {
          return { success: false as const, error: "You have already used this promo code" };
        }

        // Record the redemption
        await redeemPromoCode({
          promoCodeId: promo.id,
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          customerPhone: input.customerPhone,
          serviceType: input.serviceType,
        });

        // Notify owner about the redemption (push notification)
        await notifyOwner({
          title: `Promo Code Redeemed: ${promo.code}`,
          content: `${input.customerName} (${input.customerEmail}) redeemed promo code "${promo.code}" for ${input.serviceType}. Offer: ${promo.description}. Please apply the discount manually in Gingr when they check in.`,
        }).catch(() => {}); // Don't fail if notification fails

        // Send email to front desk with full details
        await sendPromoRedemptionEmail({
          customerName: input.customerName,
          customerEmail: input.customerEmail,
          customerPhone: input.customerPhone,
          serviceType: input.serviceType,
          promoCode: promo.code,
          promoDescription: promo.description,
          discountType: promo.discountType,
          discountValue: promo.discountValue,
        }).catch(() => {}); // Don't fail if email fails

        return {
          success: true as const,
          description: promo.description,
          discountType: promo.discountType,
          discountValue: promo.discountValue,
        };
      }),

    // ===== Admin procedures =====

    /**
     * List all promo codes (admin)
     */
    list: adminProcedure.query(async () => {
      return getAllPromoCodes();
    }),

    /**
     * Create a new promo code (admin)
     */
    create: adminProcedure
      .input(z.object({
        code: z.string().min(1).max(50),
        description: z.string().min(1),
        serviceType: z.enum(["daycare", "boarding", "grooming", "all"]),
        discountType: z.enum(["percentage", "fixed_amount", "free_night"]),
        discountValue: z.number().int().min(1),
        maxRedemptions: z.number().int().min(1).nullable().optional(),
        newCustomersOnly: z.boolean().optional(),
        startsAt: z.date().nullable().optional(),
        expiresAt: z.date().nullable().optional(),
      }))
      .mutation(async ({ input }) => {
        return createPromoCode({
          code: input.code,
          description: input.description,
          serviceType: input.serviceType,
          discountType: input.discountType,
          discountValue: input.discountValue,
          maxRedemptions: input.maxRedemptions ?? null,
          newCustomersOnly: input.newCustomersOnly ? "true" : "false",
          startsAt: input.startsAt ?? null,
          expiresAt: input.expiresAt ?? null,
        });
      }),

    /**
     * Update a promo code (admin)
     */
    update: adminProcedure
      .input(z.object({
        id: z.number().int(),
        code: z.string().min(1).max(50).optional(),
        description: z.string().min(1).optional(),
        serviceType: z.enum(["daycare", "boarding", "grooming", "all"]).optional(),
        discountType: z.enum(["percentage", "fixed_amount", "free_night"]).optional(),
        discountValue: z.number().int().min(1).optional(),
        maxRedemptions: z.number().int().min(1).nullable().optional(),
        isActive: z.boolean().optional(),
        newCustomersOnly: z.boolean().optional(),
        startsAt: z.date().nullable().optional(),
        expiresAt: z.date().nullable().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        const updateData: Record<string, unknown> = {};
        if (data.code !== undefined) updateData.code = data.code;
        if (data.description !== undefined) updateData.description = data.description;
        if (data.serviceType !== undefined) updateData.serviceType = data.serviceType;
        if (data.discountType !== undefined) updateData.discountType = data.discountType;
        if (data.discountValue !== undefined) updateData.discountValue = data.discountValue;
        if (data.maxRedemptions !== undefined) updateData.maxRedemptions = data.maxRedemptions;
        if (data.isActive !== undefined) updateData.isActive = data.isActive ? "true" : "false";
        if (data.newCustomersOnly !== undefined) updateData.newCustomersOnly = data.newCustomersOnly ? "true" : "false";
        if (data.startsAt !== undefined) updateData.startsAt = data.startsAt;
        if (data.expiresAt !== undefined) updateData.expiresAt = data.expiresAt;
        return updatePromoCode(id, updateData as any);
      }),

    /**
     * Delete a promo code (admin)
     */
    delete: adminProcedure
      .input(z.object({ id: z.number().int() }))
      .mutation(async ({ input }) => {
        await deletePromoCode(input.id);
        return { success: true };
      }),

    /**
     * Get redemptions (admin) — optionally filtered by promo code ID
     */
    redemptions: adminProcedure
      .input(z.object({ promoCodeId: z.number().int().optional() }).optional())
      .query(async ({ input }) => {
        return getRedemptions(input?.promoCodeId);
      }),

    /**
     * Update redemption status (admin)
     */
    updateRedemption: adminProcedure
      .input(z.object({
        id: z.number().int(),
        status: z.enum(["pending", "confirmed", "expired"]),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await updateRedemptionStatus(input.id, input.status, input.notes);
        return { success: true };
      }),
  }),

  seasonalMessages: router({
    /**
     * Get active seasonal messages (public) — for the ticker
     */
    getActive: publicProcedure.query(async () => {
      return getActiveSeasonalMessages();
    }),

    /**
     * List all seasonal messages (admin)
     */
    list: adminProcedure.query(async () => {
      return getAllSeasonalMessages();
    }),

    /**
     * Create a seasonal message (admin)
     */
    create: adminProcedure
      .input(z.object({
        message: z.string().min(1),
        highlight: z.string().max(255).nullable().optional(),
        bookable: z.boolean().optional(),
        isActive: z.boolean().optional(),
        startsAt: z.date().nullable().optional(),
        endsAt: z.date().nullable().optional(),
        priority: z.number().int().min(1).max(10).optional(),
      }))
      .mutation(async ({ input }) => {
        return createSeasonalMessage({
          message: input.message,
          highlight: input.highlight ?? null,
          bookable: input.bookable ? "true" : "false",
          isActive: input.isActive !== false ? "true" : "false",
          startsAt: input.startsAt ?? null,
          endsAt: input.endsAt ?? null,
          priority: input.priority ?? 1,
        });
      }),

    /**
     * Update a seasonal message (admin)
     */
    update: adminProcedure
      .input(z.object({
        id: z.number().int(),
        message: z.string().min(1).optional(),
        highlight: z.string().max(255).nullable().optional(),
        bookable: z.boolean().optional(),
        isActive: z.boolean().optional(),
        startsAt: z.date().nullable().optional(),
        endsAt: z.date().nullable().optional(),
        priority: z.number().int().min(1).max(10).optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        const updateData: Record<string, unknown> = {};
        if (data.message !== undefined) updateData.message = data.message;
        if (data.highlight !== undefined) updateData.highlight = data.highlight;
        if (data.bookable !== undefined) updateData.bookable = data.bookable ? "true" : "false";
        if (data.isActive !== undefined) updateData.isActive = data.isActive ? "true" : "false";
        if (data.startsAt !== undefined) updateData.startsAt = data.startsAt;
        if (data.endsAt !== undefined) updateData.endsAt = data.endsAt;
        if (data.priority !== undefined) updateData.priority = data.priority;
        return updateSeasonalMessage(id, updateData as any);
      }),

    /**
     * Delete a seasonal message (admin)
     */
    delete: adminProcedure
      .input(z.object({ id: z.number().int() }))
      .mutation(async ({ input }) => {
        await deleteSeasonalMessage(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
