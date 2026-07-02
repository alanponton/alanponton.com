// src/components/concierge/useConciergeStream.ts

import { useCallback, useRef, useState } from "react";
import type { ChatMessage } from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const FUNCTION_URL = `${SUPABASE_URL}/functions/v1/portfolio-concierge`;

interface StreamState {
  messages: ChatMessage[];
  isStreaming: boolean;
  escalated: boolean;
  conversationId: string | null;
  error: string | null;
}

export function useConciergeStream(sessionId: string) {
  const [state, setState] = useState<StreamState>({
    messages: [],
    isStreaming: false,
    escalated: false,
    conversationId: null,
    error: null,
  });

  const conversationIdRef = useRef<string | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
      };

      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "",
        streaming: true,
      };

      setState((s) => ({
        ...s,
        messages: [...s.messages, userMsg, assistantMsg],
        isStreaming: true,
        error: null,
      }));

      let httpStatus: number | null = null; // TEMP DEBUG
      try {
        const res = await fetch(FUNCTION_URL, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            session_id: sessionId,
            message: text,
            conversation_id: conversationIdRef.current,
          }),
        });

        if (!res.ok || !res.body) {
          httpStatus = res.status; // TEMP DEBUG
          throw new Error(`HTTP ${res.status}${!res.body ? " (no body)" : ""}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split("\n\n");
          buffer = events.pop() ?? "";

          for (const block of events) {
            const lines = block.split("\n");
            let eventType = "message";
            let dataStr = "";
            for (const line of lines) {
              if (line.startsWith("event: ")) eventType = line.slice(7).trim();
              else if (line.startsWith("data: ")) dataStr = line.slice(6).trim();
            }
            if (!dataStr) continue;

            try {
              const data = JSON.parse(dataStr);

              if (eventType === "meta" && data.conversation_id) {
                conversationIdRef.current = data.conversation_id;
                setState((s) => ({ ...s, conversationId: data.conversation_id }));
              } else if (eventType === "token" && typeof data.text === "string") {
                accumulated += data.text;
                const visible = accumulated.replace(/\[\[ESCALATE\]\]/g, "").trim();
                setState((s) => ({
                  ...s,
                  messages: s.messages.map((m) =>
                    m.id === assistantMsg.id ? { ...m, content: visible } : m,
                  ),
                }));
              } else if (eventType === "done") {
                setState((s) => ({
                  ...s,
                  isStreaming: false,
                  escalated: s.escalated || !!data.escalated,
                  messages: s.messages.map((m) =>
                    m.id === assistantMsg.id ? { ...m, streaming: false } : m,
                  ),
                }));
              }
            } catch {
              // ignore malformed events
            }
          }
        }
      } catch (err) {
        // TEMP DEBUG — surface real error detail for mobile debugging (remove after)
        const e = err as Error;
        const debugMsg = `Debug: ${e?.name ?? "Error"}: ${e?.message ?? String(err)}${httpStatus !== null ? ` (HTTP ${httpStatus})` : ""}`;
        setState((s) => ({
          ...s,
          isStreaming: false,
          error: String(err),
          messages: s.messages.map((m) =>
            m.id === assistantMsg.id
              ? { ...m, content: debugMsg, streaming: false }
              : m,
          ),
        }));
      }
    },
    [sessionId],
  );

  const dismissEscalation = useCallback(() => {
    setState((s) => ({ ...s, escalated: false }));
  }, []);

  return {
    ...state,
    sendMessage,
    dismissEscalation,
  };
}
