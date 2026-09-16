import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the ENV module
vi.mock("./_core/env", () => ({
  ENV: {
    gingrApiKey: "4f62cac94f0ddf0aeb5ef38210a62207",
    gingrBaseUrl: "https://metromutts.gingrapp.com",
  },
}));

describe("Gingr API Integration", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should have GINGR_API_KEY configured", () => {
    expect(process.env.GINGR_API_KEY).toBeDefined();
    expect(process.env.GINGR_API_KEY!.length).toBeGreaterThan(10);
  });

  it("should have GINGR_BASE_URL configured", () => {
    expect(process.env.GINGR_BASE_URL).toBeDefined();
    expect(process.env.GINGR_BASE_URL).toContain("gingrapp.com");
  });

  it("getAvailability returns fallback data when API is unreachable", async () => {
    // Mock fetch to simulate API being unreachable (403 from WAF)
    global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    const { getAvailability } = await import("./gingr");
    const result = await getAvailability("2026-04-30");

    expect(result).toHaveProperty("date", "2026-04-30");
    expect(result).toHaveProperty("daycare");
    expect(result).toHaveProperty("boarding");
    expect(result).toHaveProperty("grooming");
    // Fallback uses current realistic numbers
    expect(result.daycare.capacity).toBe(40);
    expect(result.daycare.spotsLeft).toBe(33);
    expect(result.daycare.booked).toBe(7);
    expect(result.boarding.capacity).toBe(19);
    expect(result.boarding.spotsLeft).toBe(12);
    expect(result.boarding.booked).toBe(7);
    expect(result.grooming.capacity).toBe(6);
    expect(result.grooming.spotsLeft).toBe(1);
    expect(result.grooming.booked).toBe(5);
    expect(result.lastUpdated).toBeDefined();
  });

  it("getAvailability correctly counts reservations by type", async () => {
    const mockReservations = [
      { id: 1, reservation_type_id: 1, reservation_type_name: "Daycare - Full Day", start_date: "2026-04-30", end_date: "2026-04-30" },
      { id: 2, reservation_type_id: 1, reservation_type_name: "Daycare - Half Day", start_date: "2026-04-30", end_date: "2026-04-30" },
      { id: 3, reservation_type_id: 2, reservation_type_name: "Boarding - Luxury Suite", start_date: "2026-04-30", end_date: "2026-05-01" },
      { id: 4, reservation_type_id: 3, reservation_type_name: "Grooming - Full Groom", start_date: "2026-04-30", end_date: "2026-04-30" },
      { id: 5, reservation_type_id: 3, reservation_type_name: "Bath & Brush", start_date: "2026-04-30", end_date: "2026-04-30" },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockReservations),
    });

    const { getAvailability } = await import("./gingr");
    const result = await getAvailability("2026-04-30");

    expect(result.daycare.booked).toBe(2);
    expect(result.daycare.spotsLeft).toBe(38);
    expect(result.boarding.booked).toBe(1);
    expect(result.boarding.spotsLeft).toBe(18);
    expect(result.grooming.booked).toBe(2);
    expect(result.grooming.spotsLeft).toBe(4);
  });

  it("handles object-keyed data response from Gingr (real format)", async () => {
    // Gingr returns { error: false, data: { "6553": {...}, "6575": {...} } }
    const objectKeyedResponse = {
      error: false,
      data: {
        "6553": {
          reservation_id: "6553",
          reservation_type_id: 574389,
          reservation_type_name: { id: "574389", type: "Boarding " },
          start_date: "2026-04-28T07:00:00-05:00",
          end_date: "2026-05-03T10:00:00-05:00",
          cancelled_date: null,
        },
        "6697": {
          reservation_id: "6697",
          reservation_type_id: 574501,
          reservation_type_name: { id: "574501", type: "Spa Services" },
          start_date: "2026-04-29T08:30:00-05:00",
          end_date: "2026-04-29T18:00:00-05:00",
          cancelled_date: null,
        },
        "6700": {
          reservation_id: "6700",
          reservation_type_id: 574400,
          reservation_type_name: { id: "574400", type: "Daycare" },
          start_date: "2026-04-29T07:00:00-05:00",
          end_date: "2026-04-29T18:00:00-05:00",
          cancelled_date: null,
        },
        "6701": {
          reservation_id: "6701",
          reservation_type_id: 574389,
          reservation_type_name: { id: "574389", type: "Boarding " },
          start_date: "2026-04-29T07:00:00-05:00",
          end_date: "2026-04-30T18:00:00-05:00",
          cancelled_date: "2026-04-28T10:00:00-05:00",
        },
      },
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(objectKeyedResponse),
    });

    const { getAvailability } = await import("./gingr");
    const result = await getAvailability("2026-04-29");

    // Should count: 1 boarding (6553), 1 spa/grooming (6697), 1 daycare (6700)
    // Should skip: 6701 (cancelled)
    expect(result.boarding.booked).toBe(1);
    expect(result.grooming.booked).toBe(1);
    expect(result.daycare.booked).toBe(1);
  });

  it("getTodayAndTomorrowAvailability returns both days", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const { getTodayAndTomorrowAvailability } = await import("./gingr");
    const result = await getTodayAndTomorrowAvailability();

    expect(result).toHaveProperty("today");
    expect(result).toHaveProperty("tomorrow");
    expect(result.today).toHaveProperty("daycare");
    expect(result.tomorrow).toHaveProperty("boarding");
  });
});
