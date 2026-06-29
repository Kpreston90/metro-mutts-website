import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ArrowDown, MessageSquareText } from "lucide-react";

/** Custom speech-bubble-with-paw icon */
function PawBubble({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Speech bubble */}
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      {/* Paw pads - filled */}
      <g fill="currentColor" stroke="none">
        {/* Main pad */}
        <ellipse cx="12" cy="12" rx="2.2" ry="1.8" />
        {/* Top-left toe */}
        <circle cx="9.5" cy="8.5" r="1.1" />
        {/* Top-right toe */}
        <circle cx="14.5" cy="8.5" r="1.1" />
        {/* Left toe */}
        <circle cx="8.5" cy="11" r="1" />
        {/* Right toe */}
        <circle cx="15.5" cy="11" r="1" />
      </g>
    </svg>
  );
}
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED_QUESTIONS = [
  "What's your first day process?",
  "How much is boarding?",
  "Tell me about grooming",
  "What vaccines are required?",
];

/**
 * Metro Mutts AI Chat Widget
 * Floating chat assistant with glassmorphism design, smooth animations,
 * and comprehensive business knowledge.
 */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const chatMutation = trpc.chat.send.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having a moment! 🐾 No worries though — just **text us at 539-867-3841** and our team will help you out directly.",
        },
      ]);
    },
  });

  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "instant",
    });
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Track scroll position for "scroll to bottom" button
  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
  }, []);

  const handleSend = (content?: string) => {
    const text = (content || input).trim();
    if (!text || chatMutation.isPending) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(newMessages);
    setInput("");
    chatMutation.mutate({ messages: newMessages });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[90] group"
            aria-label="Open chat assistant"
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[#48D597] animate-ping opacity-20" />
            {/* Button */}
            <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#48D597] to-[#345460] shadow-lg shadow-[#48D597]/30 group-hover:shadow-xl group-hover:shadow-[#48D597]/40 transition-shadow">
              <PawBubble className="w-6 h-6 text-white" />
            </span>
            {/* Label tooltip */}
            <span className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg bg-[#345460] text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              Ask us anything! 🐾
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-[91] w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-3rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-white/20"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,236,0.98) 100%)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <div className="relative px-5 py-4 bg-gradient-to-r from-[#345460] to-[#2a4550] flex items-center gap-3 shrink-0">
              {/* Decorative dots */}
              <div className="absolute top-2 right-16 w-2 h-2 rounded-full bg-[#48D597]/30" />
              <div className="absolute top-5 right-12 w-1.5 h-1.5 rounded-full bg-[#48D597]/20" />

              {/* Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#48D597] to-[#3bc085] flex items-center justify-center shadow-md">
                  <PawBubble className="w-5 h-5 text-white" />
                </div>
                {/* Online indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-[#345460] rounded-full" />
              </div>

              {/* Title */}
              <div className="flex-1">
                <h3 className="text-white font-bold text-sm leading-tight">
                  Metro Mutts Assistant
                </h3>
                <p className="text-white/60 text-xs">
                  Ask about services, pricing & more
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages area */}
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 relative scroll-smooth"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#48D597 transparent",
              }}
            >
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-5 px-2">
                  {/* Welcome */}
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#48D597]/10 mb-3">
                      <span className="text-3xl">🐕</span>
                    </div>
                    <h4 className="text-[#345460] font-bold text-base mb-1">
                      Hey there! 👋
                    </h4>
                    <p className="text-[#345460]/60 text-sm leading-relaxed">
                      I know everything about Metro Mutts. Ask me about services,
                      pricing, first visits, or anything else!
                    </p>
                  </div>

                  {/* Suggested questions */}
                  <div className="w-full space-y-2">
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        onClick={() => handleSend(q)}
                        disabled={chatMutation.isPending}
                        className="w-full text-left px-4 py-2.5 rounded-xl border border-[#48D597]/20 bg-white hover:bg-[#48D597]/5 hover:border-[#48D597]/40 text-[#345460] text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex gap-2 ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#48D597] to-[#3bc085] flex items-center justify-center shrink-0 mt-1 shadow-sm">
                          <PawBubble className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                          msg.role === "user"
                            ? "bg-gradient-to-br from-[#345460] to-[#2a4550] text-white rounded-br-md"
                            : "bg-white border border-[#e8e8e0] text-[#345460] rounded-bl-md shadow-sm"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <div className="prose prose-sm max-w-none text-[#345460] [&_p]:mb-1.5 [&_p:last-child]:mb-0 [&_strong]:text-[#345460] [&_a]:text-[#48D597] [&_a]:underline [&_ul]:my-1 [&_li]:my-0.5">
                            <Streamdown>{msg.content}</Streamdown>
                          </div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">
                            {msg.content}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {chatMutation.isPending && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2 items-start"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#48D597] to-[#3bc085] flex items-center justify-center shrink-0 shadow-sm">
                        <PawBubble className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="bg-white border border-[#e8e8e0] rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                        <div className="flex gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#48D597] animate-bounce [animation-delay:0ms]" />
                          <span className="w-2 h-2 rounded-full bg-[#48D597] animate-bounce [animation-delay:150ms]" />
                          <span className="w-2 h-2 rounded-full bg-[#48D597] animate-bounce [animation-delay:300ms]" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Text Us escalation — appears after 2+ exchanges */}
                  {messages.filter((m) => m.role === "user").length >= 2 && !chatMutation.isPending && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex justify-center pt-2 pb-1"
                    >
                      <a
                        href="sms:5398673841?body=Hi! I was chatting on your website and couldn't find the answer I needed:"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#345460]/5 border border-[#345460]/10 text-[#345460] text-xs font-medium hover:bg-[#345460]/10 hover:border-[#345460]/20 transition-all"
                      >
                        <MessageSquareText className="w-3.5 h-3.5" />
                        Still have questions? Text our team directly
                      </a>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </>
              )}

              {/* Scroll to bottom button */}
              <AnimatePresence>
                {showScrollBtn && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => scrollToBottom()}
                    className="sticky bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#345460] text-white flex items-center justify-center shadow-lg hover:bg-[#2a4550] transition-colors"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Input area */}
            <div className="shrink-0 px-4 py-3 border-t border-[#e8e8e0] bg-white/80">
              {/* Text escalation bar — appears after 3+ messages indicating they may need more help */}
              {messages.length >= 3 && (
                <a
                  href="sms:5398673841?body=Hi! I was chatting on your website and couldn't find the answer I needed:"
                  className="flex items-center justify-center gap-2 mb-2 py-2 rounded-lg bg-gradient-to-r from-[#345460] to-[#2a4550] text-white text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  <MessageSquareText className="w-3.5 h-3.5" />
                  Can't find what you need? Text our team
                </a>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-end gap-2"
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about services, pricing..."
                  rows={1}
                  className="flex-1 resize-none rounded-xl border border-[#e8e8e0] bg-[#FFFFEC]/50 px-4 py-2.5 text-sm text-[#345460] placeholder:text-[#345460]/40 focus:outline-none focus:ring-2 focus:ring-[#48D597]/30 focus:border-[#48D597]/50 transition-all max-h-24"
                  style={{ minHeight: "40px" }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || chatMutation.isPending}
                  className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#48D597] to-[#3bc085] text-white flex items-center justify-center shadow-md shadow-[#48D597]/20 hover:shadow-lg hover:shadow-[#48D597]/30 disabled:opacity-40 disabled:shadow-none transition-all disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[10px] text-[#345460]/30 text-center mt-2">
                AI assistant · May not always be accurate · Call{" "}
                <a
                  href="tel:5398673841"
                  className="underline hover:text-[#48D597]"
                >
                  539-867-3841
                </a>{" "}
                for help
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
