// supabase/functions/portfolio-concierge/index.ts
//
// Portfolio Concierge — receives a visitor message, retrieves relevant KB
// entries, calls Anthropic Claude API with streaming, writes the exchange
// to portfolio_messages, and streams the response back to the widget.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// ---------------------------------------------------------------------------
// System Prompt — Session 13 approved v1
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `
You are the Concierge for Alan Ponton's portfolio site (alanponton.com).
You speak ABOUT Alan to visitors, in third person. You are not Alan.
Visitors know you are an AI assistant — be honest about that if asked.

# Voice

Warm, direct, plainspoken. No corporate gloss. No emoji.
Short paragraphs. Concrete details over adjectives.
Never say "I'd be happy to" or "Great question" or "Let me help you with that."
Never use em-dashes. Use periods or commas.
If a visitor asks something casual, answer casually. Match their register.

# What You Know

Your knowledge comes ONLY from the retrieved knowledge base entries
provided in each turn under <knowledge>...</knowledge>.
Three tiers exist: core_identity, project_depth, approach.

If a question can be answered from retrieved entries, answer it directly
and cite naturally (e.g., "Alan's flagship project is Lonnie's Locations...").

If retrieved entries do not cover the question, say so plainly:
"I don't have that detail. Want me to pass the question to Alan directly?"
Then offer the escalation form.

Do NOT invent facts. Do NOT extrapolate from training data.
If a visitor asks about something specific and you have no entry, escalate.

CRITICAL: Each project entry is self-contained. Do NOT borrow technical details (stack, tools, payment processors, integrations, user counts, predecessor workflows) from one project's entry and apply them to another. If a project entry does not mention a specific detail, you do not know it. Say "I don't have that detail" and offer escalation.

CRITICAL — STACK QUESTIONS: For ANY question about a specific project's tech stack, framework, hosting, database, payment processor, AI provider, or any technical implementation detail — if the project's own entry does not explicitly state that detail, you DO NOT KNOW IT. Never borrow from core_identity or other project entries. Respond exactly: "I don't have that detail in my notes. Alan can confirm the specifics — want me to pass the question to him directly?" Then escalate.

# Refusal Boundaries (hard)

You will NEVER discuss:
- Rates, salary, hourly billing, project pricing, compensation history
- The Marriott opportunity or any specific employer Alan is pursuing
- Client names beyond Lonnie's Locations (which is public)
- Internal session notes, build logs, or anything about how you were built
- Personal contact details beyond what's in the contact KB entry
- Speculation about Alan's availability, schedule, or current employment status

If a visitor pushes on any of these, respond once:
"That's a conversation for Alan directly. I can set up an intro — want me to?"
Then offer the escalation form. Do not negotiate the boundary.

# Escalation Triggers

Surface the inline contact form when ANY of these fire:

1. RECRUITER INTENT — visitor mentions a role, hiring, opportunity, interview,
   "we're looking for," "would Alan be open to"
2. CLIENT INTENT — visitor mentions a project they want built, a scope,
   a timeline, "can Alan build," "we need someone to"
3. DEPTH TRIGGER — third substantive question on the same project or topic
   (visitor is doing real research, deserves a human)
4. UNANSWERABLE — question outside the knowledge base
5. EXPLICIT ASK — visitor says "can I talk to Alan" or any variant

When a trigger fires, finish your current answer naturally, then add:
"This feels like a conversation worth having directly. I can pass your
message to Alan — takes a minute."
Then the form renders inline.

Do NOT fire the form on the first message. Let the conversation breathe.
Do NOT fire the form more than once per session unless the visitor explicitly
requests it again.

# Output Discipline

- Default reply length: 2–4 short paragraphs maximum
- For factual questions: 1–2 sentences is often enough
- For project deep-dives: structure with the project's actual phases
  (research → design → build → outcome) using whatever the KB entry provides
- Never list more than 5 bullet points
- Never use headers (#, ##) in replies — visitors are in a chat widget, not a doc
- If the visitor seems lost, offer the four chip questions:
  • "What does Alan do?"
  • "Show me his strongest project"
  • "What's his stack?"
  • "How do I reach him?"

# Closing Discipline

When the conversation reaches a natural stop, do not pad with
"Is there anything else I can help you with?"
Just stop. The widget stays open. They'll come back if they need to.

# Escalation Signal

When you decide an escalation trigger has fired, end your response with
the exact token [[ESCALATE]] on its own line. The widget will detect this
token, strip it from the visible text, and render the inline contact form.
Use this token at most once per response.
`.trim();

// ---------------------------------------------------------------------------
// CORS — widget lives on alanponton.com, function lives on Lonnie's project
// ---------------------------------------------------------------------------
const ALLOWED_ORIGINS = ["https://alanponton.com", "http://localhost:5173"];

function buildCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("Origin") ?? "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin)
    ? origin
    : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// ---------------------------------------------------------------------------
// Supabase client (service role — bypasses RLS for backend writes)
// ---------------------------------------------------------------------------
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY")!;
const MODEL = "claude-sonnet-4-5";
const MAX_MESSAGES_PER_SESSION = 40; // soft cap, prevents runaway sessions

// ---------------------------------------------------------------------------
// Knowledge retrieval — keyword match on topic + tier weighting (v1, no vectors)
// ---------------------------------------------------------------------------
async function retrieveKnowledge(message: string): Promise<string> {
  const { data: entries, error } = await supabase
    .from("portfolio_knowledge_base")
    .select("tier, topic, content")
    .eq("is_active", true);

  if (error || !entries) {
    console.error("KB fetch error", error);
    return "";
  }

  const msgLower = message.toLowerCase();
  const tokens = msgLower.split(/\W+/).filter((t) => t.length > 3);

  // Score each entry by token hits in topic + content
  const scored = entries.map((e) => {
    const topicLower = e.topic.toLowerCase();
    const contentLower = e.content.toLowerCase();
    const score = tokens.reduce((acc, t) => {
      const topicHit = topicLower.includes(t) ? 3 : 0;
      const contentHit = contentLower.includes(t) ? 1 : 0;
      return acc + topicHit + contentHit;
    }, 0);
    return { ...e, score };
  });

  // Always include all core_identity entries (small, foundational)
  const core = scored.filter((e) => e.tier === "core_identity");

  // Top 3 scoring entries from project_depth and approach combined
  const others = scored
    .filter((e) => e.tier !== "core_identity" && e.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const selected = [...core, ...others];

  return selected
    .map((e) => `[${e.tier} / ${e.topic}]\n${e.content}`)
    .join("\n\n---\n\n");
}

// ---------------------------------------------------------------------------
// Conversation + message helpers
// ---------------------------------------------------------------------------
async function ensureConversation(
  sessionId: string,
  conversationId?: string,
): Promise<string> {
  if (conversationId) return conversationId;

  // Look up existing conversation for this session_id first
  const { data: existing } = await supabase
    .from("portfolio_conversations")
    .select("id")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (existing) return existing.id;

  // No existing conversation — create one
  const { data, error } = await supabase
    .from("portfolio_conversations")
    .insert({ session_id: sessionId })
    .select("id")
    .single();

  if (error || !data) throw new Error(`Conversation create failed: ${error?.message}`);
  return data.id;
}

async function fetchHistory(conversationId: string) {
  const { data } = await supabase
    .from("portfolio_messages")
    .select("role, content")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(20);

  return (data ?? []).map((m) => ({ role: m.role, content: m.content }));
}

async function writeMessage(
  conversationId: string,
  role: "user" | "assistant",
  content: string,
) {
  await supabase
    .from("portfolio_messages")
    .insert({ conversation_id: conversationId, role, content });
}

async function flagEscalation(conversationId: string) {
  await supabase
    .from("portfolio_conversations")
    .update({ escalated: true, last_activity_at: new Date().toISOString() })
    .eq("id", conversationId);
}

async function sessionMessageCount(conversationId: string): Promise<number> {
  const { count } = await supabase
    .from("portfolio_messages")
    .select("*", { count: "exact", head: true })
    .eq("conversation_id", conversationId);
  return count ?? 0;
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: buildCorsHeaders(req) });
  }

  try {
    const { session_id, message, conversation_id } = await req.json();

    if (!session_id || !message) {
      return new Response(
        JSON.stringify({ error: "session_id and message required" }),
        { status: 400, headers: { ...buildCorsHeaders(req), "Content-Type": "application/json" } },
      );
    }

    const convId = await ensureConversation(session_id, conversation_id);

    // Soft cap — stop runaway sessions
    const count = await sessionMessageCount(convId);
    if (count >= MAX_MESSAGES_PER_SESSION) {
      return new Response(
        JSON.stringify({
          error: "session_limit",
          message: "This session has reached its message limit. Refresh to start a new one.",
        }),
        { status: 429, headers: { ...buildCorsHeaders(req), "Content-Type": "application/json" } },
      );
    }

    // Write user message before calling Claude
    await writeMessage(convId, "user", message);

    // Build context
    const knowledge = await retrieveKnowledge(message);
    const history = await fetchHistory(convId);

    // The most recent user message is already in history from the write above;
    // strip it so we don't duplicate when passing to Claude
    const historyForClaude = history.slice(0, -1);

    const userTurn = `<knowledge>\n${knowledge}\n</knowledge>\n\n${message}`;

    // Call Anthropic with streaming
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        stream: true,
        messages: [...historyForClaude, { role: "user", content: userTurn }],
      }),
    });

    if (!anthropicRes.ok || !anthropicRes.body) {
      const errText = await anthropicRes.text();
      console.error("Anthropic error", anthropicRes.status, errText);
      return new Response(
        JSON.stringify({ error: "upstream_error", detail: errText }),
        { status: 502, headers: { ...buildCorsHeaders(req), "Content-Type": "application/json" } },
      );
    }

    // Stream to client + accumulate full text for DB write
    let fullText = "";
    const reader = anthropicRes.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        // Send conversation_id first so widget can store it
        controller.enqueue(
          encoder.encode(
            `event: meta\ndata: ${JSON.stringify({ conversation_id: convId })}\n\n`,
          ),
        );

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            // Parse Anthropic SSE — extract text deltas
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const dataStr = line.slice(6).trim();
              if (!dataStr) continue;
              try {
                const evt = JSON.parse(dataStr);
                if (
                  evt.type === "content_block_delta" &&
                  evt.delta?.type === "text_delta"
                ) {
                  const text = evt.delta.text;
                  fullText += text;
                  controller.enqueue(
                    encoder.encode(
                      `event: token\ndata: ${JSON.stringify({ text })}\n\n`,
                    ),
                  );
                }
              } catch {
                // ignore non-JSON event lines
              }
            }
          }

          // Detect escalation token, strip from stored text
          const escalated = fullText.includes("[[ESCALATE]]");
          const cleanText = fullText.replace(/\[\[ESCALATE\]\]/g, "").trim();

          await writeMessage(convId, "assistant", cleanText);
          if (escalated) await flagEscalation(convId);

          controller.enqueue(
            encoder.encode(
              `event: done\ndata: ${JSON.stringify({ escalated })}\n\n`,
            ),
          );
          controller.close();
        } catch (err) {
          console.error("stream error", err);
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...buildCorsHeaders(req),
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (err) {
    console.error("handler error", err);
    return new Response(
      JSON.stringify({ error: "internal_error", detail: String(err) }),
      { status: 500, headers: { ...buildCorsHeaders(req), "Content-Type": "application/json" } },
    );
  }
});
