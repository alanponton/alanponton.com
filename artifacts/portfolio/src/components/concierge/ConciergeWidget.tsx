// src/components/concierge/ConciergeWidget.tsx

import { useEffect, useState } from "react";
import { ConciergeLauncher } from "./ConciergeLauncher";
import { ConciergeDrawer } from "./ConciergeDrawer";
import { useConciergeStream } from "./useConciergeStream";
import type { EscalationFormData } from "./types";

const SESSION_KEY = "concierge_session_id";

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `s_${crypto.randomUUID()}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function ConciergeWidget() {
  const [open, setOpen] = useState(false);
  const [sessionId] = useState(() => getOrCreateSessionId());

  const {
    messages,
    isStreaming,
    escalated,
    conversationId,
    sendMessage,
    dismissEscalation,
  } = useConciergeStream(sessionId);

  // Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleSubmitEscalation = async (data: EscalationFormData) => {
    // POSTs to the n8n escalation endpoint — wired in next session.
    // For now, the conversation row already has escalated=true in Supabase,
    // so even if this fetch fails, the data is captured.
    const ESCALATION_ENDPOINT = import.meta.env.VITE_ESCALATION_WEBHOOK_URL as
      | string
      | undefined;

    if (!ESCALATION_ENDPOINT) {
      console.warn("Escalation webhook URL not configured.");
      return;
    }

    await fetch(ESCALATION_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        conversation_id: conversationId,
        session_id: sessionId,
      }),
    });
  };

  return (
    <>
      <ConciergeLauncher open={open} onClick={() => setOpen(true)} />
      <ConciergeDrawer
        open={open}
        onClose={() => setOpen(false)}
        messages={messages}
        isStreaming={isStreaming}
        escalated={escalated}
        conversationId={conversationId}
        onSend={sendMessage}
        onSubmitEscalation={handleSubmitEscalation}
        onDismissEscalation={dismissEscalation}
      />
    </>
  );
}
