// src/components/concierge/ConciergeMessage.tsx

import { motion } from "framer-motion";
import type { ChatMessage } from "./types";

interface Props {
  message: ChatMessage;
}

export function ConciergeMessage({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`
          max-w-[85%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed
          whitespace-pre-wrap
          ${isUser
            ? "bg-neutral-900 text-neutral-50 rounded-br-sm"
            : "bg-neutral-100 text-neutral-900 rounded-bl-sm"
          }
        `}
      >
        {message.content}
        {message.streaming && message.content === "" && (
          <span className="inline-flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-pulse [animation-delay:0.4s]" />
          </span>
        )}
        {message.streaming && message.content !== "" && (
          <span className="inline-block w-0.5 h-4 bg-neutral-600 ml-0.5 animate-pulse align-middle" />
        )}
      </div>
    </motion.div>
  );
}
