// src/components/concierge/useConciergeStream.ts

import { useCallback, useRef, useState } from "react";
import type { ChatMessage } from "./types";
import { getOrCreateSessionId, rotateSessionId } from "./session";

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

type RunResult =
  | { kind: "ok" }
  | { kind: "rate_limit"; error: string; message: string };

export function useConciergeStream() {
  const [state, setState] = useState<StreamState>({
    messages: [],
    isStreaming: false,
    escalated: false,
    conversationId: null,
    error: null,
  });

  const conversationIdRef = useRef<string | null>(null);
  const sessionIdRef = useRef<string>(getOrCreateSessionId());

  const sendMessage = useCallback(async (text: string) => {
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

    const setAssistantError = (msg: string) =>
      setState((s) => ({
        ...s,
        isStreaming: false,
        error: msg,
        messages: s.messages.map((m) =>
          m.id === assistantMsg.id
            ? { ...m, content: msg, streaming: false }
            : m,
        ),
      }));

    // One fetch + stream cycle. On a 429 it reads the server error code so the
    // caller can tell an ip_limit (do not retry) from a session_limit (rotate).
    const runOnce = async (): Promise<RunResult> => {
      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionIdRef.current,
          message: text,
          conversation_id: conversationIdRef.current,
        }),
      });

      if (res.status === 429) {
        // Read the server code. ip_limit is enforced per IP across sessions, so
        // the caller must not rotate and retry. session_limit is per session.
        let error = "";
        let message = "";
        try {
          const body = await res.json();
          error = typeof body?.error === "string" ? body.error : "";
          message = typeof body?.message === "string" ? body.message : "";
        } catch {
          // ignore parse failure, treat as an unspecified rate limit
        }
        return { kind: "rate_limit", error, message };
      }

      if (!res.ok || !res.body) {
        throw new Error(`HTTP ${res.status}`);
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

      return { kind: "ok" };
    };

    try {
      const result = await runOnce();

      if (result.kind === "rate_limit") {
        if (result.error === "ip_limit") {
          // Enforced per IP across sessions. Rotating would just hit it again,
          // so show the server message and stop.
          setAssistantError(
            result.message || "Daily limit reached. Please come back tomorrow.",
          );
        } else {
          // session_limit. Rotate to a fresh session and retry the message once.
          sessionIdRef.current = rotateSessionId();
          conversationIdRef.current = null;
          setState((s) => ({ ...s, conversationId: null }));

          try {
            const retry = await runOnce();
            if (retry.kind === "rate_limit") {
              setAssistantError("This chat is taking a break. Please try again shortly.");
            }
          } catch {
            setAssistantError("This chat is taking a break. Please try again shortly.");
          }
        }
      }
    } catch {
      setAssistantError("Something went wrong. Try again in a moment.");
    }
  }, []);

  const dismissEscalation = useCallback(() => {
    setState((s) => ({ ...s, escalated: false }));
  }, []);

  return {
    ...state,
    sessionId: sessionIdRef.current,
    sendMessage,
    dismissEscalation,
  };
}
