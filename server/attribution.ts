import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, desc } from "drizzle-orm";
import { attributionSchema } from "../shared/attribution";
import { websiteInquiries, bookingOutcomes } from "../drizzle/schema";
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
      await db
        .insert(bookingOutcomes)
        .values({
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
