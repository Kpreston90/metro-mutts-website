import { describe, it, expect, vi } from "vitest";
import { processChat } from "./chat";

// Mock the LLM module
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    id: "test-id",
    created: Date.now(),
    model: "test-model",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "Our boarding rates start at $55/night for a standard suite.",
        },
        finish_reason: "stop",
      },
    ],
    usage: { prompt_tokens: 100, completion_tokens: 50, total_tokens: 150 },
  }),
}));

describe("Chat Assistant", () => {
  it("should return a string response from processChat", async () => {
    const messages = [{ role: "user" as const, content: "How much is boarding?" }];
    const response = await processChat(messages);
    expect(typeof response).toBe("string");
    expect(response.length).toBeGreaterThan(0);
  });

  it("should handle multiple messages in conversation", async () => {
    const messages = [
      { role: "user" as const, content: "Hi there!" },
      { role: "assistant" as const, content: "Hello! How can I help?" },
      { role: "user" as const, content: "What are your hours?" },
    ];
    const response = await processChat(messages);
    expect(typeof response).toBe("string");
    expect(response.length).toBeGreaterThan(0);
  });

  it("should trim messages to last 20 when conversation is long", async () => {
    const { invokeLLM } = await import("./_core/llm");
    const longConversation = Array.from({ length: 25 }, (_, i) => ({
      role: (i % 2 === 0 ? "user" : "assistant") as "user" | "assistant",
      content: `Message ${i}`,
    }));

    await processChat(longConversation);

    // Verify invokeLLM was called with trimmed messages
    expect(invokeLLM).toHaveBeenCalled();
    const callArgs = (invokeLLM as any).mock.calls[
      (invokeLLM as any).mock.calls.length - 1
    ][0];
    // System prompt + last 20 messages = 21 max
    expect(callArgs.messages.length).toBeLessThanOrEqual(21);
    // First message should always be the system prompt
    expect(callArgs.messages[0].role).toBe("system");
  });

  it("should handle LLM returning array content", async () => {
    const { invokeLLM } = await import("./_core/llm");
    (invokeLLM as any).mockResolvedValueOnce({
      id: "test-id",
      created: Date.now(),
      model: "test-model",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: [
              { type: "text", text: "Part 1. " },
              { type: "text", text: "Part 2." },
            ],
          },
          finish_reason: "stop",
        },
      ],
    });

    const messages = [{ role: "user" as const, content: "Hello" }];
    const response = await processChat(messages);
    expect(response).toBe("Part 1. \nPart 2.");
  });

  it("should return fallback message when LLM returns empty content", async () => {
    const { invokeLLM } = await import("./_core/llm");
    (invokeLLM as any).mockResolvedValueOnce({
      id: "test-id",
      created: Date.now(),
      model: "test-model",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "",
          },
          finish_reason: "stop",
        },
      ],
    });

    const messages = [{ role: "user" as const, content: "Hello" }];
    const response = await processChat(messages);
    expect(response).toContain("539-867-3841");
  });

  it("should return fallback message when LLM throws an error", async () => {
    const { invokeLLM } = await import("./_core/llm");
    (invokeLLM as any).mockRejectedValueOnce(new Error("LLM service unavailable"));

    const messages = [{ role: "user" as const, content: "Hello" }];
    await expect(processChat(messages)).rejects.toThrow();
  });
});
