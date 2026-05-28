// src/components/concierge/ConciergeEscalation.tsx

import { motion } from "framer-motion";
import { useState } from "react";
import type { EscalationFormData } from "./types";

interface Props {
  conversationId: string | null;
  onSubmit: (data: EscalationFormData) => Promise<void>;
  onDismiss: () => void;
}

export function ConciergeEscalation({ conversationId, onSubmit, onDismiss }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({ name: name.trim(), email: email.trim(), message: message.trim() });
      setSubmitted(true);
    } catch {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="my-4 p-5 rounded-2xl bg-emerald-50 border border-emerald-200"
      >
        <p className="text-sm text-emerald-900 font-medium">Message sent.</p>
        <p className="text-sm text-emerald-800 mt-1">
          Alan will reply directly to {email}.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="my-4 p-5 rounded-2xl bg-neutral-50 border border-neutral-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-semibold text-neutral-900">
            Pass this to Alan
          </h3>
          <p className="text-xs text-neutral-600 mt-0.5">
            He'll read the conversation and reply directly.
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="text-neutral-400 hover:text-neutral-700 text-xs px-2 py-1"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={submitting}
          className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 focus:border-neutral-900 focus:outline-none bg-white"
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 focus:border-neutral-900 focus:outline-none bg-white"
        />
        <textarea
          placeholder="Anything specific to add? (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={submitting}
          rows={2}
          className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 focus:border-neutral-900 focus:outline-none bg-white resize-none"
        />
        <button
          onClick={handleSubmit}
          disabled={submitting || !name.trim() || !email.trim()}
          className="w-full px-4 py-2.5 text-sm font-medium rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
        >
          {submitting ? "Sending..." : "Send to Alan"}
        </button>
        {conversationId && (
          <p className="text-[10px] text-neutral-400 text-center pt-1">
            Conversation #{conversationId.slice(0, 8)}
          </p>
        )}
      </div>
    </motion.div>
  );
}
