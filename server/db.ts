import { eq, and, sql, gte, lte, or, isNull } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, promoCodes, promoRedemptions, seasonalMessages, InsertPromoCode, InsertPromoRedemption, InsertSeasonalMessage } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============ Promo Code Queries ============

/**
 * Get all promo codes (admin view)
 */
export async function getAllPromoCodes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(promoCodes).orderBy(sql`${promoCodes.createdAt} DESC`);
}

/**
 * Get a single promo code by its code string
 */
export async function getPromoCodeByCode(code: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(promoCodes).where(eq(promoCodes.code, code.toUpperCase())).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Get a single promo code by ID
 */
export async function getPromoCodeById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(promoCodes).where(eq(promoCodes.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

/**
 * Create a new promo code
 */
export async function createPromoCode(data: InsertPromoCode) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(promoCodes).values({
    ...data,
    code: data.code.toUpperCase(),
  });
  return getPromoCodeByCode(data.code);
}

/**
 * Update a promo code
 */
export async function updatePromoCode(id: number, data: Partial<InsertPromoCode>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: Record<string, unknown> = {};
  if (data.code !== undefined) updateData.code = data.code.toUpperCase();
  if (data.description !== undefined) updateData.description = data.description;
  if (data.serviceType !== undefined) updateData.serviceType = data.serviceType;
  if (data.discountType !== undefined) updateData.discountType = data.discountType;
  if (data.discountValue !== undefined) updateData.discountValue = data.discountValue;
  if (data.maxRedemptions !== undefined) updateData.maxRedemptions = data.maxRedemptions;
  if (data.isActive !== undefined) updateData.isActive = data.isActive;
  if (data.newCustomersOnly !== undefined) updateData.newCustomersOnly = data.newCustomersOnly;
  if (data.startsAt !== undefined) updateData.startsAt = data.startsAt;
  if (data.expiresAt !== undefined) updateData.expiresAt = data.expiresAt;
  await db.update(promoCodes).set(updateData).where(eq(promoCodes.id, id));
  return getPromoCodeById(id);
}

/**
 * Delete a promo code
 */
export async function deletePromoCode(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(promoCodes).where(eq(promoCodes.id, id));
}

/**
 * Validate a promo code — checks if it's active, not expired, not over limit, and matches service
 */
export async function validatePromoCode(code: string, serviceType: "daycare" | "boarding" | "grooming") {
  const promo = await getPromoCodeByCode(code);
  if (!promo) return { valid: false, error: "Invalid promo code" };
  if (promo.isActive !== "true") return { valid: false, error: "This promo code is no longer active" };

  const now = new Date();
  if (promo.startsAt && promo.startsAt > now) return { valid: false, error: "This promo code is not yet active" };
  if (promo.expiresAt && promo.expiresAt < now) return { valid: false, error: "This promo code has expired" };

  if (promo.maxRedemptions && promo.currentRedemptions >= promo.maxRedemptions) {
    return { valid: false, error: "This promo code has reached its maximum uses" };
  }

  if (promo.serviceType !== "all" && promo.serviceType !== serviceType) {
    return { valid: false, error: `This promo code is only valid for ${promo.serviceType}` };
  }

  return { valid: true, promo };
}

/**
 * Redeem a promo code — increments the counter and records the redemption
 */
export async function redeemPromoCode(data: {
  promoCodeId: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  serviceType: "daycare" | "boarding" | "grooming";
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Increment the redemption counter
  await db.update(promoCodes)
    .set({ currentRedemptions: sql`${promoCodes.currentRedemptions} + 1` })
    .where(eq(promoCodes.id, data.promoCodeId));

  // Record the redemption
  await db.insert(promoRedemptions).values({
    promoCodeId: data.promoCodeId,
    customerName: data.customerName,
    customerEmail: data.customerEmail,
    customerPhone: data.customerPhone || null,
    serviceType: data.serviceType,
    status: "pending",
  });

  return { success: true };
}

/**
 * Get all redemptions (admin view), optionally filtered by promo code
 */
export async function getRedemptions(promoCodeId?: number) {
  const db = await getDb();
  if (!db) return [];
  if (promoCodeId) {
    return db.select().from(promoRedemptions).where(eq(promoRedemptions.promoCodeId, promoCodeId)).orderBy(sql`${promoRedemptions.redeemedAt} DESC`);
  }
  return db.select().from(promoRedemptions).orderBy(sql`${promoRedemptions.redeemedAt} DESC`);
}

/**
 * Update redemption status
 */
export async function updateRedemptionStatus(id: number, status: "pending" | "confirmed" | "expired", notes?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: Record<string, unknown> = { status };
  if (notes !== undefined) updateData.notes = notes;
  await db.update(promoRedemptions).set(updateData).where(eq(promoRedemptions.id, id));
}

/**
 * Check if a customer has already redeemed a specific promo code
 */
export async function hasCustomerRedeemedCode(promoCodeId: number, customerEmail: string) {
  const db = await getDb();
  if (!db) return false;
  const result = await db.select().from(promoRedemptions)
    .where(and(
      eq(promoRedemptions.promoCodeId, promoCodeId),
      eq(promoRedemptions.customerEmail, customerEmail.toLowerCase())
    ))
    .limit(1);
  return result.length > 0;
}

// ============ Seasonal Messages Queries ============

/**
 * Get all seasonal messages (admin view)
 */
export async function getAllSeasonalMessages() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(seasonalMessages).orderBy(sql`${seasonalMessages.priority} DESC, ${seasonalMessages.createdAt} DESC`);
}

/**
 * Get active seasonal messages (public — for the ticker)
 * Filters by isActive, and date range (startsAt/endsAt)
 */
export async function getActiveSeasonalMessages() {
  const db = await getDb();
  if (!db) return [];
  const now = new Date();
  return db.select().from(seasonalMessages).where(
    and(
      eq(seasonalMessages.isActive, "true"),
      or(isNull(seasonalMessages.startsAt), lte(seasonalMessages.startsAt, now)),
      or(isNull(seasonalMessages.endsAt), gte(seasonalMessages.endsAt, now))
    )
  ).orderBy(sql`${seasonalMessages.priority} DESC`);
}

/**
 * Create a seasonal message
 */
export async function createSeasonalMessage(data: InsertSeasonalMessage) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(seasonalMessages).values(data);
  return { success: true };
}

/**
 * Update a seasonal message
 */
export async function updateSeasonalMessage(id: number, data: Partial<InsertSeasonalMessage>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(seasonalMessages).set(data).where(eq(seasonalMessages.id, id));
  return { success: true };
}

/**
 * Delete a seasonal message
 */
export async function deleteSeasonalMessage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(seasonalMessages).where(eq(seasonalMessages.id, id));
  return { success: true };
}
