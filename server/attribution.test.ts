import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  captureAttribution,
  attributionSchema,
  isGoogleAdEntry,
} from "../shared/attribution";

vi.mock("./db", () => ({ getDb: vi.fn() }));
vi.mock("./_core/notification", () => ({ notifyOwner: vi.fn() }));
import { getDb } from "./db";
import { notifyOwner } from "./_core/notification";
import {
  attributionRouter,
  inquirySchema,
  paidOutcomeSchema,
} from "./attribution";

const input = {
  id: "123e4567-e89b-42d3-a456-426614174000",
  name: "Test",
  email: "TEST@example.com",
  phone: "",
  service: "daycare" as const,
  message: "Hello",
  botField: "",
};
const context = { user: null, req: {}, res: {} } as any;
function database(rows: unknown[][]) {
  const select = vi.fn(() => ({
    from: () => ({ where: () => ({ limit: async () => rows.shift() ?? [] }) }),
  }));
  const insert = vi.fn(() => ({
    values: vi.fn(() => ({
      onDuplicateKeyUpdate: vi.fn().mockResolvedValue(undefined),
    })),
  }));
  return { select, insert };
}

beforeEach(() => {
  vi.clearAllMocks();
});
describe("consent and validation", () => {
  it("discards unrelated query parameters and full URL", () => {
    const captured = captureAttribution(
      "https://metromutts.com/daycare?gclid=click&utm_campaign=dogs&email=private@example.com&token=secret"
    );
    expect(captured.gclid).toBe("click");
    expect(captured.landingPath).toBe("/daycare");
    expect(captured).not.toHaveProperty("email");
    expect(captured).not.toHaveProperty("token");
    expect(attributionSchema.safeParse(captured).success).toBe(false);
    expect(
      attributionSchema.safeParse({ ...captured, consent: true }).success
    ).toBe(true);
  });
  it("allows inquiries without measurement consent and normalizes email", () => {
    const parsed = inquirySchema.parse(input);
    expect(parsed.email).toBe("test@example.com");
    expect(parsed.attribution).toBeUndefined();
  });
  it("rejects unverified, unpaid, and future outcomes", () => {
    const outcome = {
      inquiryId: input.id,
      ownerId: "owner",
      invoiceId: "invoice",
      paidAt: new Date(),
      valueCents: 100,
      verified: true,
    };
    expect(
      paidOutcomeSchema.safeParse({ ...outcome, verified: false }).success
    ).toBe(false);
    expect(
      paidOutcomeSchema.safeParse({ ...outcome, valueCents: 0 }).success
    ).toBe(false);
    expect(
      paidOutcomeSchema.safeParse({
        ...outcome,
        paidAt: new Date(Date.now() + 86400000),
      }).success
    ).toBe(false);
  });
});
describe("durable inquiry behavior", () => {
  it("fails rather than reporting success when no database exists", async () => {
    vi.mocked(getDb).mockResolvedValue(null);
    await expect(
      attributionRouter.createCaller(context).submit(input)
    ).rejects.toMatchObject({ code: "SERVICE_UNAVAILABLE" });
    expect(notifyOwner).not.toHaveBeenCalled();
  });
  it("returns success after saving even when notification fails", async () => {
    const db = database([[]]);
    vi.mocked(getDb).mockResolvedValue(db as any);
    vi.mocked(notifyOwner).mockRejectedValue(new Error("offline"));
    expect(await attributionRouter.createCaller(context).submit(input)).toEqual(
      { id: input.id, success: true }
    );
    expect(db.insert).toHaveBeenCalledOnce();
  });
  it("does not create another record or notify on a retry", async () => {
    const db = database([[{ ...input }]]);
    vi.mocked(getDb).mockResolvedValue(db as any);
    expect(await attributionRouter.createCaller(context).submit(input)).toEqual(
      { id: input.id, success: true }
    );
    expect(db.insert).not.toHaveBeenCalled();
    expect(notifyOwner).not.toHaveBeenCalled();
  });
  it("rejects public access to customer records and outcome mutations", async () => {
    const caller = attributionRouter.createCaller(context);
    await expect(caller.list()).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(
      caller.verifyPaidVisit({
        inquiryId: input.id,
        ownerId: "1",
        invoiceId: "2",
        paidAt: new Date(),
        valueCents: 100,
        verified: true,
      })
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
});

describe("verified paid visits", () => {
  const admin = { ...context, user: { id: 1, role: "admin" } };
  const outcome = {
    inquiryId: input.id,
    ownerId: "owner",
    invoiceId: "invoice",
    paidAt: new Date("2026-01-02T12:00:00Z"),
    valueCents: 100,
    verified: true as const,
  };
  const inquiry = { id: input.id, createdAt: new Date("2026-01-01T12:00:00Z") };
  it("returns the same event ID without re-inserting an already verified invoice", async () => {
    const db = database([[inquiry], [outcome]]);
    vi.mocked(getDb).mockResolvedValue(db as any);
    expect(
      await attributionRouter.createCaller(admin).verifyPaidVisit(outcome)
    ).toEqual({ eventId: "gingr-paid-invoice", uploaded: false });
    expect(db.insert).not.toHaveBeenCalled();
  });
  it("rejects reassignment or a changed amount for an existing invoice", async () => {
    const db = database([[inquiry], [{ ...outcome, valueCents: 200 }]]);
    vi.mocked(getDb).mockResolvedValue(db as any);
    await expect(
      attributionRouter.createCaller(admin).verifyPaidVisit(outcome)
    ).rejects.toMatchObject({ code: "CONFLICT" });
    expect(db.insert).not.toHaveBeenCalled();
  });
  it("rejects a payment before the inquiry", async () => {
    const db = database([
      [{ ...inquiry, createdAt: new Date("2026-01-03T12:00:00Z") }],
    ]);
    vi.mocked(getDb).mockResolvedValue(db as any);
    await expect(
      attributionRouter.createCaller(admin).verifyPaidVisit(outcome)
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});

describe("email-first handoff", () => {
  const handoff = { id: input.id, email: input.email, botField: "" };
  it("recognizes paid Google entries without inventing an LSA source", () => {
    expect(isGoogleAdEntry({ gclid: "click" })).toBe(true);
    expect(
      isGoogleAdEntry({ utm_source: "google", utm_medium: "local_services" })
    ).toBe(true);
    expect(
      isGoogleAdEntry({ utm_source: "google", utm_medium: "organic" })
    ).toBe(false);
    expect(isGoogleAdEntry({ fbclid: "click" })).toBe(false);
    expect(isGoogleAdEntry({})).toBe(false);
  });
  it("blocks forwarding when persistence is unavailable", async () => {
    vi.mocked(getDb).mockResolvedValue(null);
    await expect(
      attributionRouter.createCaller(context).startSignup(handoff)
    ).rejects.toMatchObject({ code: "SERVICE_UNAVAILABLE" });
  });
  it("saves a normalized email with no attribution or invented registration", async () => {
    const db = database([[]]);
    vi.mocked(getDb).mockResolvedValue(db as any);
    expect(
      await attributionRouter.createCaller(context).startSignup(handoff)
    ).toEqual({ id: input.id, saved: true, registered: false });
    const values = db.insert.mock.results[0].value.values;
    expect(values).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "test@example.com",
        kind: "signup_handoff",
        attribution: null,
      })
    );
    expect(notifyOwner).not.toHaveBeenCalled();
  });
  it("deduplicates retries and rejects identity changes", async () => {
    const db = database([
      [{ id: input.id, email: "test@example.com", kind: "signup_handoff" }],
      [{ id: input.id, email: "other@example.com", kind: "signup_handoff" }],
    ]);
    vi.mocked(getDb).mockResolvedValue(db as any);
    const caller = attributionRouter.createCaller(context);
    await caller.startSignup(handoff);
    await expect(caller.startSignup(handoff)).rejects.toMatchObject({
      code: "CONFLICT",
    });
    expect(db.insert).not.toHaveBeenCalled();
  });
  it("rejects honeypot submissions", async () => {
    await expect(
      attributionRouter
        .createCaller(context)
        .startSignup({ ...handoff, botField: "spam" })
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(getDb).not.toHaveBeenCalled();
  });
});
describe("verified registrations", () => {
  const admin = { ...context, user: { id: 1, role: "admin" } };
  const registration = {
    inquiryId: input.id,
    ownerId: "owner",
    ownerEmail: "TEST@example.com",
    registeredAt: new Date("2026-01-02T12:00:00Z"),
    verified: true as const,
  };
  const inquiry = {
    id: input.id,
    email: "test@example.com",
    createdAt: new Date("2026-01-01T12:00:00Z"),
  };
  it("requires administrator access", async () => {
    await expect(
      attributionRouter.createCaller(context).verifyRegistration(registration)
    ).rejects.toMatchObject({ code: "FORBIDDEN" });
  });
  it("rejects mismatched emails and existing accounts", async () => {
    const db = database([
      [{ ...inquiry, email: "different@example.com" }],
      [{ ...inquiry, createdAt: new Date("2026-01-03T12:00:00Z") }],
    ]);
    vi.mocked(getDb).mockResolvedValue(db as any);
    const caller = attributionRouter.createCaller(admin);
    await expect(caller.verifyRegistration(registration)).rejects.toMatchObject(
      { code: "BAD_REQUEST" }
    );
    await expect(caller.verifyRegistration(registration)).rejects.toMatchObject(
      { code: "BAD_REQUEST" }
    );
    expect(db.insert).not.toHaveBeenCalled();
  });
  it("deduplicates the owner and rejects reassignment", async () => {
    const db = database([
      [inquiry],
      [registration],
      [inquiry],
      [{ ...registration, inquiryId: "other" }],
    ]);
    vi.mocked(getDb).mockResolvedValue(db as any);
    const caller = attributionRouter.createCaller(admin);
    expect(await caller.verifyRegistration(registration)).toEqual({
      eventId: "gingr-registration-owner",
      uploaded: false,
    });
    await expect(caller.verifyRegistration(registration)).rejects.toMatchObject(
      { code: "CONFLICT" }
    );
    expect(db.insert).not.toHaveBeenCalled();
  });
});
