import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Promo codes table — allows Metro Mutts to offer promotions
 * (e.g., "first night free for new boarders") without Gingr native promo support.
 */
export const promoCodes = mysqlTable("promo_codes", {
  id: int("id").autoincrement().primaryKey(),
  /** The code customers enter (uppercase, e.g., "FIRSTNIGHT") */
  code: varchar("code", { length: 50 }).notNull().unique(),
  /** Human-readable description of the offer */
  description: text("description").notNull(),
  /** Which service this applies to: daycare, boarding, grooming, or all */
  serviceType: mysqlEnum("serviceType", ["daycare", "boarding", "grooming", "all"]).notNull(),
  /** Discount type: percentage, fixed_amount, or free_night */
  discountType: mysqlEnum("discountType", ["percentage", "fixed_amount", "free_night"]).notNull(),
  /** Discount value (e.g., 20 for 20% or $20 off, 1 for 1 free night) */
  discountValue: int("discountValue").notNull(),
  /** Maximum number of total redemptions allowed (null = unlimited) */
  maxRedemptions: int("maxRedemptions"),
  /** Current number of times this code has been redeemed */
  currentRedemptions: int("currentRedemptions").default(0).notNull(),
  /** Whether this code is currently active */
  isActive: mysqlEnum("isActive", ["true", "false"]).default("true").notNull(),
  /** Optional: restrict to new customers only */
  newCustomersOnly: mysqlEnum("newCustomersOnly", ["true", "false"]).default("false").notNull(),
  /** Start date for the promo (null = immediately active) */
  startsAt: timestamp("startsAt"),
  /** Expiration date (null = never expires) */
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PromoCode = typeof promoCodes.$inferSelect;
export type InsertPromoCode = typeof promoCodes.$inferInsert;

/**
 * Promo code redemptions — tracks who used what code and when.
 * Used to enforce per-customer limits and provide analytics.
 */
export const promoRedemptions = mysqlTable("promo_redemptions", {
  id: int("id").autoincrement().primaryKey(),
  /** Reference to the promo code */
  promoCodeId: int("promoCodeId").notNull(),
  /** Customer name (from booking form) */
  customerName: varchar("customerName", { length: 255 }).notNull(),
  /** Customer email (for deduplication) */
  customerEmail: varchar("customerEmail", { length: 320 }).notNull(),
  /** Customer phone (optional) */
  customerPhone: varchar("customerPhone", { length: 20 }),
  /** Which service they're booking */
  serviceType: mysqlEnum("serviceType", ["daycare", "boarding", "grooming"]).notNull(),
  /** Status of the redemption */
  status: mysqlEnum("status", ["pending", "confirmed", "expired"]).default("pending").notNull(),
  /** Optional notes from staff */
  notes: text("notes"),
  redeemedAt: timestamp("redeemedAt").defaultNow().notNull(),
});

export type PromoRedemption = typeof promoRedemptions.$inferSelect;
export type InsertPromoRedemption = typeof promoRedemptions.$inferInsert;

/**
 * Seasonal/announcement messages for the ticker bar.
 * Admin can create, activate/deactivate, and schedule messages.
 */
export const seasonalMessages = mysqlTable("seasonal_messages", {
  id: int("id").autoincrement().primaryKey(),
  /** The message text to display */
  message: text("message").notNull(),
  /** Optional highlight text (shown in accent color) */
  highlight: varchar("highlight", { length: 255 }),
  /** Whether clicking should open the booking modal */
  bookable: mysqlEnum("bookable", ["true", "false"]).default("false").notNull(),
  /** Whether this message is currently active */
  isActive: mysqlEnum("isActive", ["true", "false"]).default("true").notNull(),
  /** Optional start date (null = immediately active) */
  startsAt: timestamp("startsAt"),
  /** Optional end date (null = never expires) */
  endsAt: timestamp("endsAt"),
  /** Display priority (higher = shown more often) */
  priority: int("priority").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SeasonalMessage = typeof seasonalMessages.$inferSelect;
export type InsertSeasonalMessage = typeof seasonalMessages.$inferInsert;