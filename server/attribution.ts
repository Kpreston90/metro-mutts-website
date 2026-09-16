import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, desc, or } from "drizzle-orm";
import { attributionSchema } from "../shared/attribution";
import {
  websiteInquiries,
  bookingOutcomes,
  gingrRegistrations,
} from "../drizzle/schema";
import { getDb } from "./db";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";

export const inquirySchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(255),
  email: z
    .string()
    .trim()
    .email()
    .max(320)
    .transform(value => value.toLowerCase()),
  phone: z.string().trim().max(30),
  service: z.enum(["", "daycare", "boarding", "grooming", "multiple"]),
  message: z.string().trim().max(4000),
  botField: z.string().max(200).default(""),
  attribution: attributionSchema.optional(),
});
export const signupHandoffSchema = inquirySchema.pick({
  id: true,
  email: true,
  botField: true,
  attribution: true,
});
export const registrationSchema = z.object({
  inquiryId: z.string().uuid(),
  ownerId: z.string().trim().min(1).max(100),
  ownerEmail: inquirySchema.shape.email,
  registeredAt: z
    .date()
    .refine(
      date => date.getTime() <= Date.now(),
      "Registration cannot be in the future"
    )
    .transform(date => new Date(Math.floor(date.getTime() / 1000) * 1000)),
  verified: z.literal(true),
});

export const paidOutcomeSchema = z.object({
  inquiryId: z.string().uuid(),
  ownerId: z.string().trim().min(1).max(100),
  invoiceId: z.string().trim().min(1).max(100),
  paidAt: z
    .date()
    .refine(
      date => date.getTime() <= Date.now(),
      "Payment cannot be in the future"
    )
    .transform(date => new Date(Math.floor(date.getTime() / 1000) * 1000)),
  valueCents: z.number().int().positive().max(2147483647),
  verified: z.literal(true),
});
async function database() {
  const db = await getDb();
  if (!db)
    throw new TRPCError({
      code: "SERVICE_UNAVAILABLE",
      message:
        "We couldn't save your inquiry. Please call 539-867-3841 or try again.",
    });
  return db;
}

export const attributionRouter = router({
  startSignup: publicProcedure
    .input(signupHandoffSchema)
    .mutation(async ({ input }) => {
      if (input.botField)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Unable to continue.",
        });
      const db = await database();
      const [existing] = await db
        .select()
        .from(websiteInquiries)
        .where(eq(websiteInquiries.id, input.id))
        .limit(1);
      if (
        existing &&
        (existing.email !== input.email || existing.kind !== "signup_handoff")
      ) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Please reload the page to start a new signup.",
        });
      }
      if (!existing) {
        await db
          .insert(websiteInquiries)
          .values({
            id: input.id,
            kind: "signup_handoff",
            name: "",
            email: input.email,
            phone: "",
            service: "",
            message:
              "Email captured before Gingr registration. Registration not yet verified.",
            attribution: input.attribution
              ? JSON.stringify(input.attribution)
              : null,
          })
          .onDuplicateKeyUpdate({ set: { id: input.id } });
      }
      // This is an identified handoff only; never count it as an account or booking.
      return { id: input.id, saved: true, registered: false as const };
    }),
  registrations: adminProcedure.query(async () => {
    const db = await database();
    return db
      .select()
      .from(gingrRegistrations)
      .orderBy(desc(gingrRegistrations.createdAt))
      .limit(100);
  }),
  verifyRegistration: adminProcedure
    .input(registrationSchema)
    .mutation(async ({ input, ctx }) => {
      const db = await database();
      const [inquiry] = await db
        .select()
        .from(websiteInquiries)
        .where(eq(websiteInquiries.id, input.inquiryId))
        .limit(1);
      if (!inquiry)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Inquiry not found",
        });
      if (inquiry.email !== input.ownerEmail)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Gingr email must match the inquiry email exactly",
        });
      if (input.registeredAt < inquiry.createdAt)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "The account must have been created after this inquiry",
        });
      const [existing] = await db
        .select()
        .from(gingrRegistrations)
        .where(
          or(
            eq(gingrRegistrations.inquiryId, input.inquiryId),
            eq(gingrRegistrations.ownerId, input.ownerId)
          )
        )
        .limit(1);
      if (existing) {
        if (
          existing.inquiryId !== input.inquiryId ||
          existing.ownerId !== input.ownerId ||
          existing.registeredAt.getTime() !== input.registeredAt.getTime()
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message:
              "This account or inquiry already has a different verified registration",
          });
        }
      } else {
        await db
          .insert(gingrRegistrations)
          .values({
            inquiryId: input.inquiryId,
            ownerId: input.ownerId,
            registeredAt: input.registeredAt,
            verifiedBy: ctx.user.id,
          });
      }
      return {
        eventId: `gingr-registration-${input.ownerId}`,
        uploaded: false,
      };
    }),
  submit: publicProcedure.input(inquirySchema).mutation(async ({ input }) => {
    if (input.botField)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Unable to submit this inquiry.",
      });
    const db = await database();
    const existing = await db
      .select()
      .from(websiteInquiries)
      .where(eq(websiteInquiries.id, input.id))
      .limit(1);
    if (!existing.length) {
      await db
        .insert(websiteInquiries)
        .values({
          id: input.id,
          name: input.name,
          email: input.email,
          phone: input.phone,
          service: input.service,
          message: input.message,
          attribution: input.attribution
            ? JSON.stringify(input.attribution)
            : null,
        })
        .onDuplicateKeyUpdate({ set: { id: input.id } });
      // Notification failure never loses an inquiry; administrators can retrieve it below.
      try {
        await notifyOwner({
          title: "New website inquiry",
          content: `Inquiry ${input.id}: ${input.name}, ${input.email}, ${input.phone}, ${input.service}. ${input.message}`,
        });
      } catch {
        console.warn(
          "[Inquiry] Notification unavailable; inquiry saved",
          input.id
        );
      }
    }
    return { id: input.id, success: true };
  }),
  list: adminProcedure.query(async () => {
    const db = await database();
    return db
      .select()
      .from(websiteInquiries)
      .orderBy(desc(websiteInquiries.createdAt))
      .limit(100);
  }),
  outcomes: adminProcedure.query(async () => {
    const db = await database();
    return db
      .select()
      .from(bookingOutcomes)
      .orderBy(desc(bookingOutcomes.createdAt))
      .limit(100);
  }),
  verifyPaidVisit: adminProcedure
    .input(paidOutcomeSchema)
    .mutation(async ({ input, ctx }) => {
      const db = await database();
      const [inquiry] = await db
        .select()
        .from(websiteInquiries)
        .where(eq(websiteInquiries.id, input.inquiryId))
        .limit(1);
      if (!inquiry)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Inquiry not found",
        });
      if (input.paidAt < inquiry.createdAt)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Payment must follow the inquiry",
        });
      const [existing] = await db
        .select()
        .from(bookingOutcomes)
        .where(eq(bookingOutcomes.invoiceId, input.invoiceId))
        .limit(1);
      if (existing) {
        if (
          existing.inquiryId !== input.inquiryId ||
          existing.ownerId !== input.ownerId ||
          existing.valueCents !== input.valueCents ||
          existing.paidAt.getTime() !== input.paidAt.getTime()
        ) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "This invoice already has a different verified outcome",
          });
        }
        return { eventId: `gingr-paid-${input.invoiceId}`, uploaded: false };
      }
      await db.insert(bookingOutcomes).values({
        inquiryId: input.inquiryId,
        ownerId: input.ownerId,
        invoiceId: input.invoiceId,
        paidAt: input.paidAt,
        valueCents: input.valueCents,
        verifiedBy: ctx.user.id,
      });
      return { eventId: `gingr-paid-${input.invoiceId}`, uploaded: false };
    }),
});
