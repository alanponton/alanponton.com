// src/components/concierge/types.ts

export type Role = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  streaming?: boolean;
}

export interface StreamMeta {
  conversation_id: string;
}

export interface StreamDone {
  escalated: boolean;
}

export interface EscalationFormData {
  name: string;
  email: string;
  message: string;
}
