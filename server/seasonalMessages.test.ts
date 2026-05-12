import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the database module
vi.mock("./db", () => ({
  getAllSeasonalMessages: vi.fn(),
  getActiveSeasonalMessages: vi.fn(),
  createSeasonalMessage: vi.fn(),
  updateSeasonalMessage: vi.fn(),
  deleteSeasonalMessage: vi.fn(),
}));

import {
  getAllSeasonalMessages,
  getActiveSeasonalMessages,
  createSeasonalMessage,
  updateSeasonalMessage,
  deleteSeasonalMessage,
} from "./db";

const mockGetAll = vi.mocked(getAllSeasonalMessages);
const mockGetActive = vi.mocked(getActiveSeasonalMessages);
const mockCreate = vi.mocked(createSeasonalMessage);
const mockUpdate = vi.mocked(updateSeasonalMessage);
const mockDelete = vi.mocked(deleteSeasonalMessage);

describe("Seasonal Messages", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllSeasonalMessages", () => {
    it("returns all messages ordered by priority", async () => {
      const mockMessages = [
        {
          id: 1,
          message: "Summer Sale!",
          highlight: "Book now →",
          bookable: "true" as const,
          isActive: "true" as const,
          startsAt: null,
          endsAt: null,
          priority: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          message: "Holiday Special",
          highlight: null,
          bookable: "false" as const,
          isActive: "false" as const,
          startsAt: new Date("2026-12-01"),
          endsAt: new Date("2026-12-31"),
          priority: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      mockGetAll.mockResolvedValue(mockMessages);

      const result = await getAllSeasonalMessages();
      expect(result).toHaveLength(2);
      expect(result[0].message).toBe("Summer Sale!");
      expect(result[0].priority).toBe(5);
      expect(result[1].isActive).toBe("false");
    });

    it("returns empty array when no messages exist", async () => {
      mockGetAll.mockResolvedValue([]);
      const result = await getAllSeasonalMessages();
      expect(result).toEqual([]);
    });
  });

  describe("getActiveSeasonalMessages", () => {
    it("returns only active messages within date range", async () => {
      const activeMsg = {
        id: 1,
        message: "Active promo!",
        highlight: "Limited time →",
        bookable: "true" as const,
        isActive: "true" as const,
        startsAt: null,
        endsAt: null,
        priority: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockGetActive.mockResolvedValue([activeMsg]);

      const result = await getActiveSeasonalMessages();
      expect(result).toHaveLength(1);
      expect(result[0].isActive).toBe("true");
    });

    it("excludes inactive messages", async () => {
      mockGetActive.mockResolvedValue([]);
      const result = await getActiveSeasonalMessages();
      expect(result).toEqual([]);
    });
  });

  describe("createSeasonalMessage", () => {
    it("creates a message with all fields", async () => {
      mockCreate.mockResolvedValue({ success: true });

      const result = await createSeasonalMessage({
        message: "New Year Special!",
        highlight: "Save 20% →",
        bookable: "true",
        isActive: "true",
        startsAt: new Date("2027-01-01"),
        endsAt: new Date("2027-01-31"),
        priority: 8,
      });

      expect(result.success).toBe(true);
      expect(mockCreate).toHaveBeenCalledWith({
        message: "New Year Special!",
        highlight: "Save 20% →",
        bookable: "true",
        isActive: "true",
        startsAt: expect.any(Date),
        endsAt: expect.any(Date),
        priority: 8,
      });
    });

    it("creates a message with minimal fields", async () => {
      mockCreate.mockResolvedValue({ success: true });

      const result = await createSeasonalMessage({
        message: "Simple announcement",
      });

      expect(result.success).toBe(true);
      expect(mockCreate).toHaveBeenCalledWith({
        message: "Simple announcement",
      });
    });
  });

  describe("updateSeasonalMessage", () => {
    it("updates message text", async () => {
      mockUpdate.mockResolvedValue({ success: true });

      const result = await updateSeasonalMessage(1, { message: "Updated text" });
      expect(result.success).toBe(true);
      expect(mockUpdate).toHaveBeenCalledWith(1, { message: "Updated text" });
    });

    it("toggles active status", async () => {
      mockUpdate.mockResolvedValue({ success: true });

      const result = await updateSeasonalMessage(1, { isActive: "false" });
      expect(result.success).toBe(true);
      expect(mockUpdate).toHaveBeenCalledWith(1, { isActive: "false" });
    });
  });

  describe("deleteSeasonalMessage", () => {
    it("deletes a message by ID", async () => {
      mockDelete.mockResolvedValue({ success: true });

      const result = await deleteSeasonalMessage(1);
      expect(result.success).toBe(true);
      expect(mockDelete).toHaveBeenCalledWith(1);
    });
  });

  describe("Seasonal message data structure", () => {
    it("has correct shape for ticker consumption", async () => {
      const msg = {
        id: 1,
        message: "Flash sale!",
        highlight: "50% off →",
        bookable: "true" as const,
        isActive: "true" as const,
        startsAt: null,
        endsAt: null,
        priority: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockGetActive.mockResolvedValue([msg]);

      const result = await getActiveSeasonalMessages();
      const first = result[0];

      // Verify the shape matches what SocialProofTicker expects
      expect(first).toHaveProperty("message");
      expect(first).toHaveProperty("highlight");
      expect(first).toHaveProperty("bookable");
      expect(typeof first.message).toBe("string");
      expect(first.bookable).toMatch(/^(true|false)$/);
    });

    it("handles null highlight correctly", async () => {
      const msg = {
        id: 2,
        message: "No highlight message",
        highlight: null,
        bookable: "false" as const,
        isActive: "true" as const,
        startsAt: null,
        endsAt: null,
        priority: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockGetActive.mockResolvedValue([msg]);

      const result = await getActiveSeasonalMessages();
      expect(result[0].highlight).toBeNull();
    });
  });
});
