// src/components/concierge/ConciergeDrawer.tsx

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ConciergeMessage } from "./ConciergeMessage";
import { ConciergeEscalation } from "./ConciergeEscalation";
import type { ChatMessage, EscalationFormData } from "./types";

interface Props {
  open: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  isStreaming: boolean;
  escalated: boolean;
  conversationId: string | null;
  onSend: (text: string) => void;
  onSubmitEscalation: (data: EscalationFormData) => Promise<void>;
  onDismissEscalation: () => void;
}

const CHIP_QUESTIONS = [
  "What does Alan do?",
  "Show me his strongest project",
  "What's his stack?",
  "How do I reach him?",
];

export function ConciergeDrawer({
  open,
  onClose,
  messages,
  isStreaming,
  escalated,
  conversationId,
  onSend,
  onSubmitEscalation,
  onDismissEscalation,
}: Props) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, escalated]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isStreaming) return;
    onSend(text);
    setInput("");
  };

  const handleChip = (q: string) => {
    if (isStreaming) return;
    onSend(q);
  };

  const showChips = messages.length === 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Mobile overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-900/30 z-40 md:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="
              fixed top-0 right-0 bottom-0 z-50
              w-full md:w-[420px]
              bg-white
              shadow-2xl
              flex flex-col
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
              <div>
                <h2 className="text-sm font-semibold text-neutral-900">
                  Ask Alan AI
                </h2>
                <p className="text-xs text-neutral-500">
                  Ask anything about Alan's work
                </p>
              </div>
              <button
                onClick={onClose}
                className="
                  w-8 h-8 rounded-full
                  flex items-center justify-center
                  text-neutral-500 hover:text-neutral-900
                  hover:bg-neutral-100 transition-colors
                "
                aria-label="Close Ask Alan AI"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 py-4"
            >
              {showChips && (
                <div className="space-y-4">
                  <div className="px-4 py-3 rounded-2xl bg-neutral-100 text-neutral-900 text-[15px] leading-relaxed rounded-bl-sm max-w-[85%]">
                    Hey. I'm an AI assistant for Alan Ponton's portfolio. Ask me about his work, his stack, or anything you'd want to know before reaching out.
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {CHIP_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleChip(q)}
                        className="
                          px-3 py-1.5 text-[13px]
                          rounded-full
                          bg-white border border-neutral-200
                          text-neutral-700 hover:border-neutral-900 hover:text-neutral-900
                          transition-colors
                        "
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m) => (
                <ConciergeMessage key={m.id} message={m} />
              ))}

              {escalated && !isStreaming && (
                <ConciergeEscalation
                  conversationId={conversationId}
                  onSubmit={onSubmitEscalation}
                  onDismiss={onDismissEscalation}
                />
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-neutral-200 p-4">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask anything about Alan..."
                  rows={1}
                  disabled={isStreaming}
                  className="
                    flex-1 px-4 py-2.5 text-[15px]
                    rounded-2xl border border-neutral-200
                    focus:border-neutral-900 focus:outline-none
                    resize-none max-h-32
                    disabled:bg-neutral-50
                  "
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isStreaming}
                  className="
                    w-10 h-10 rounded-full
                    bg-neutral-900 text-white
                    flex items-center justify-center
                    disabled:bg-neutral-300 disabled:cursor-not-allowed
                    hover:bg-neutral-800 transition-colors
                    flex-shrink-0
                  "
                  aria-label="Send"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12L19 12M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-[10px] text-neutral-400 text-center mt-2">
                AI assistant. Responses may not be perfect.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
