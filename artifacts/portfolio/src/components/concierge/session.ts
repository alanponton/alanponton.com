// src/components/concierge/session.ts
//
// Session id helpers shared between ConciergeWidget and useConciergeStream.
// The widget seeds the id on mount; the stream hook can rotate it when the
// backend rate limits a session (429).

export const SESSION_KEY = "concierge_session_id";

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `s_${crypto.randomUUID()}`;
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function rotateSessionId(): string {
  const id = `s_${crypto.randomUUID()}`;
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}
