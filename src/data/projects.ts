export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  category: string;
  color: string;
  tech: string[];
  stats: { value: string; label: string }[];
  hero: {
    headline: string;
    role: string;
    timeline: string;
    status: string;
    liveUrl?: string;
    githubUrl?: string;
  };
  problem: {
    headline: string;
    body: string;
    userStory?: string;
  };
  solution: {
    headline: string;
    body: string;
    valueProposition: string;
  };
  architecture: {
    techStack: { category: string; items: string[] }[];
    description: string;
  };
  decisions: {
    title: string;
    decision: string;
    why: string;
    result: string;
  }[];
  results: {
    value: string;
    label: string;
    description?: string;
  }[];
  features?: string[];
}

export const projects: ProjectData[] = [
  {
    slug: "metroplex-match",
    title: "MetroPlex Match",
    description:
      "A dating platform where AI coaches guide DFW singles to real compatibility — not just swiping. Personality science meets modern matchmaking.",
    category: "AI Platform",
    color: "#6366F1",
    tech: ["React", "TypeScript", "Supabase", "OpenAI", "n8n"],
    stats: [
      { value: "205+", label: "Active Users" },
      { value: "6", label: "AI Coaches" },
      { value: "256", label: "Match Combinations" },
    ],
    hero: {
      headline: "Dating apps optimize for swipes. I built one that optimizes for compatibility.",
      role: "Solo Developer & Designer",
      timeline: "4 months",
      status: "Live",
      liveUrl: "https://metroplexmatch.com",
    },
    problem: {
      headline: "Dating apps are broken by design.",
      body: "The DFW dating scene was saturated with apps that rewarded looks over personality, engagement over connection. Users reported swiping hundreds of times per week but rarely finding meaningful matches. The gamification loop kept people subscribed but chronically lonely.\n\nPsychological research consistently shows that long-term compatibility is driven by personality alignment, communication style, and shared values — none of which are conveyed in a photo grid. The existing apps knew this, but fixing it would hurt their engagement metrics.\n\nI set out to build a platform that treated compatibility as a solvable engineering problem, not a revenue optimization problem.",
      userStory:
        "One early user told me she'd been on three different dating apps for two years, gone on dozens of dates, and felt more exhausted than hopeful. Within two weeks on MetroPlex Match she had three genuinely compelling conversations — people who matched her communication style and life goals, not just her aesthetic preferences.",
    },
    solution: {
      headline: "Six AI coaches, one goal: finding your actual match.",
      body: "MetroPlex Match pairs each user with an AI coaching system built on six distinct personality frameworks — attachment style, love language, communication pattern, life goals, dealbreakers, and values alignment. Each coach runs a structured intake conversation and builds a compatibility model that goes far deeper than a questionnaire.\n\nThe matching engine cross-references all six models to surface the highest-compatibility pairings from the user pool. Instead of infinite scroll, users see a curated daily set of matches with compatibility scores broken down by dimension — so you know not just that someone is a 94% match, but exactly why.\n\nThe platform is DFW-first intentionally. Geographic focus means the user pool is dense enough for high-quality matching without needing millions of users.",
      valueProposition:
        "Six AI coaches that understand who you actually are — and match you with someone who complements it.",
    },
    architecture: {
      description:
        "React frontend deployed on Cloudflare Pages communicates with a Supabase backend that handles auth, profiles, and real-time messaging. Each AI coach is a separate OpenAI assistant with a custom system prompt and memory store. n8n orchestrates the intake workflows, match recalculation jobs, and notification pipelines.",
      techStack: [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
        { category: "Backend", items: ["Supabase", "PostgreSQL", "Row Level Security"] },
        { category: "AI Layer", items: ["OpenAI Assistants API", "GPT-4o", "Vector Embeddings"] },
        { category: "Automation", items: ["n8n", "Webhook Pipelines", "Cron Jobs"] },
        { category: "Infrastructure", items: ["Cloudflare Pages", "Cloudflare Workers"] },
      ],
    },
    decisions: [
      {
        title: "Six coaches instead of one",
        decision: "Build six specialized AI coaches rather than one general compatibility assistant.",
        why: "A single AI trying to assess all compatibility dimensions produced shallow, inconsistent results. Specialization let each coach go deeper on its domain and improved the quality of the compatibility models significantly.",
        result: "Each coach became genuinely expert in its domain. Users report the intake conversations feel surprisingly insightful — more like talking to a therapist than filling out a form.",
      },
      {
        title: "n8n for workflow orchestration",
        decision: "Use n8n instead of custom serverless functions for all automation workflows.",
        why: "Match recalculation, notification scheduling, and onboarding flows are complex multi-step processes. Writing them as code would have been slow to debug and hard to iterate on. n8n gave me visual pipelines I could modify without redeployment.",
        result: "Built and iterated on 8 distinct automation workflows in the time it would have taken to write 2 in code. Changed notification timing 4 times based on user feedback — each change took minutes.",
      },
      {
        title: "DFW-only geographic focus",
        decision: "Hard-limit the platform to the Dallas-Fort Worth metro area at launch.",
        why: "A dating app with a thin user pool is useless. By concentrating all growth effort in one metro, we could achieve critical mass faster and enable real-world meetups.",
        result: "205+ users in the DFW area in 4 months. Matching quality is significantly higher than broader-market apps because the density allows for genuine compatibility filtering, not just proximity filtering.",
      },
    ],
    results: [
      { value: "205+", label: "Active Users", description: "DFW metro area in 4 months" },
      { value: "6", label: "AI Coaches", description: "Specialized personality frameworks" },
      { value: "256", label: "Match Combinations", description: "Compatibility dimension pairings" },
      { value: "94%", label: "Profile Completion", description: "Users who finish all six coaches" },
    ],
    features: [
      "Six specialized AI coaches for personality, attachment, values, communication, love language, and dealbreakers",
      "Compatibility score breakdown by dimension — not just a single percentage",
      "Curated daily match set (no infinite scroll)",
      "Real-time messaging with read receipts",
      "DFW metro area geographic matching",
      "Onboarding flow with progressive disclosure",
      "n8n-powered match recalculation on profile updates",
      "Admin dashboard for platform health monitoring",
    ],
  },
  {
    slug: "trip-buddy",
    title: "Trip Buddy",
    description:
      "Your AI travel companion that plans the trip, coordinates outfits, tracks visitors, and keeps family updated in real-time — with a voice AI assistant that knows your name, your itinerary, and what you're wearing tonight.",
    category: "AI Platform",
    color: "#F97316",
    tech: ["React", "TypeScript", "Supabase", "OpenAI", "Cloudflare", "TTS"],
    stats: [
      { value: "18", label: "Database Tables" },
      { value: "7", label: "AI Tools" },
      { value: "4", label: "Modules" },
    ],
    hero: {
      headline: "One platform for the traveler, their family, and their agent — with a voice AI that knows everything about the trip.",
      role: "Solo Developer & Designer",
      timeline: "14 sessions",
      status: "Live — travel.alanponton.com",
    },
    problem: {
      headline: "Travel planning is still fragmented across five different tools.",
      body: "A typical trip involves coordinating between Google Flights, a hotel booking site, a notes app for the itinerary, a messaging thread to keep family updated, and a separate communication channel with any travel agent involved. Nothing talks to anything else.\n\nTravel agents face a particularly bad version of this problem. They manage dozens of clients, each on their own scattered communication thread, with no unified view of who's traveling when and what they need. Client updates require phone calls or long email threads.\n\nFamily members who aren't on the trip have zero visibility. They know a vague departure date and get sporadic text message updates — which means real anxiety when a traveler goes quiet for a day.",
      userStory:
        "I built an early version of this for my own family trip and the difference was immediate. My wife could see my exact itinerary, hotel confirmation numbers, and daily plan without asking me anything. My travel agent could see everything in one dashboard. Nobody had to send a single 'how's the trip going?' text.",
    },
    solution: {
      headline: "Three dashboards, one source of truth, zero duplicate communication.",
      body: "Trip Buddy unifies trip management across three distinct user roles: the traveler, family members, and the travel agent. Each role sees a dashboard optimized for their needs — the traveler has itinerary management, outfit planning, and AI tools; family members have a read-only live view of the trip; and the travel agent has a client portfolio dashboard.\n\nSophia, the built-in AI assistant, handles trip planning — generating daily itineraries, suggesting restaurants, answering travel questions, and surfacing weather forecasts. She also knows every planned outfit, can suggest alternatives from the wardrobe inventory, and greets every user by name with a unique AI-generated voice message when they open the app.\n\nThe Outfit Buddy module adds day-by-day outfit coordination for the traveler and companion, with wardrobe inventory management, coordination badges, photo priority flags, and auto-generated packing lists. Visitor analytics track who's following the trip and what they're looking at.\n\nAll roles share a single trip record in real-time. When the traveler updates anything — itinerary, outfits, packing — family and the agent see it immediately.",
      valueProposition:
        "Your entire travel ecosystem — planner, family tracker, and agent portal — unified in a single platform that keeps everyone in the loop without anyone lifting a finger.",
    },
    architecture: {
      description:
        "Supabase handles the shared data layer across 18 tables with real-time subscriptions powering live updates across all dashboards. The frontend is a single React app with role-based routing. OpenAI powers Sophia — the trip AI assistant with voice TTS (Fable voice), auto-greetings, outfit awareness, and function calling across 7 tools. The Outfit Buddy module uses trip_outfits and wardrobe_items tables with JSONB for flexible outfit storage. Cloudflare Workers handles edge functions. Visitor tracking stores page views and session data for the admin analytics dashboard. Three Supabase storage buckets handle outfit photos, closet photos, and itinerary images.",
      techStack: [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
        { category: "Backend", items: ["Supabase", "PostgreSQL", "Realtime Subscriptions", "JSONB", "RLS", "Storage Buckets"] },
        { category: "AI Layer", items: ["OpenAI GPT-4o", "Function Calling", "Streaming", "TTS (Fable Voice)", "Auto-Greetings"] },
        { category: "Infrastructure", items: ["Cloudflare Pages", "Cloudflare Workers", "Custom Domain"] },
      ],
    },
    decisions: [
      {
        title: "Single app, three role-based views",
        decision: "Build one React app with role-based routing rather than three separate apps.",
        why: "Separate apps would mean three codebases to maintain, three deployments, and duplicate logic for the shared data layer. A single app with role-based routing shares all the infrastructure and the real-time data layer automatically.",
        result: "Role switching is instant — a user invited in both traveler and family roles can toggle between dashboards. Shipped faster than three separate apps would have allowed.",
      },
      {
        title: "Full outfit module over lightweight integration",
        decision: "Build a dedicated Outfit Buddy module with its own tables, dashboard tab, and AI tools rather than attaching outfit notes to existing itinerary items.",
        why: "A lightweight approach would have stored outfits as itinerary metadata — quick to build but impossible to query, edit independently, or scale. A full module with trip_outfits and wardrobe_items tables gives Sophia structured data to reason about and makes the feature reusable for future trips.",
        result: "Sophia can answer 'What am I wearing to Giovanni\\'s tonight?' and suggest alternatives from the wardrobe. Packing lists auto-generate from unique items across all outfits. Companion coordination is visible at a glance with matching/complementary badges.",
      },
      {
        title: "Voice-first AI with personalized greetings",
        decision: "Give Sophia a voice (TTS) and have her auto-greet every user by name when they open the AI tab, with a unique AI-generated message every time.",
        why: "A text-only chatbot feels generic. Making Sophia speak first — addressing the user by name with context-aware greetings — transforms her from a tool into a companion. Visitors get a 'following along with the trip' greeting; admins get trip planning context.",
        result: "Every user interaction starts with Sophia speaking directly to them. The personal touch creates an emotional connection that makes the app feel alive — real visitors like Debra, Fran, and Mary experienced this on the actual trip.",
      },
    ],
    results: [
      { value: "18", label: "Database Tables", description: "Full relational schema with RLS" },
      { value: "7", label: "AI Tools", description: "Itinerary, Q&A, recommendations, weather, packing, outfit lookup, wardrobe suggestions" },
      { value: "4", label: "Modules", description: "Itinerary, Packing, Outfit Buddy, Visitor Analytics" },
      { value: "6+", label: "Real Visitors", description: "Family and friends tracked on a live trip" },
    ],
    features: [
      "Three role-based dashboards for traveler, family, and travel agent",
      "Sophia AI assistant with voice TTS, auto-greetings, and personalized name awareness",
      "AI-powered itinerary generation with daily scheduling across 19 items",
      "Real-time trip updates across all roles via Supabase Realtime",
      "Outfit Buddy module with day-by-day outfit planning for traveler and companion",
      "Side-by-side outfit view with coordination badges and photo priority flags",
      "Sophia answers outfit questions and suggests alternatives from wardrobe inventory",
      "Auto-generated packing lists derived from unique items across all planned outfits",
      "Wardrobe inventory system with closet photo storage",
      "Visitor analytics dashboard with page view tracking and activity timelines",
      "Personalized visitor experience with name-based greetings throughout the app",
      "Restaurant and activity recommendations based on preferences",
      "Travel agent client portfolio view with upcoming trips",
      "Three Supabase storage buckets for outfit, closet, and itinerary images",
      "Offline-capable itinerary view for areas with poor connectivity",
    ],
  },
  {
    slug: "follow-this-model",
    title: "FollowThisModel",
    description:
      "Creator economy platform where fans chat with AI-powered personas trained on real model personalities. Token payments, Stripe payouts, zero ghostwriting.",
    category: "SaaS Platform",
    color: "#EC4899",
    tech: ["React", "TypeScript", "Supabase", "Claude API", "Stripe"],
    stats: [
      { value: "540+", label: "Community Members" },
      { value: "8-Step", label: "Model Onboarding" },
      { value: "3", label: "Revenue Tiers" },
    ],
    hero: {
      headline: "Authentic creator connections at scale — no ghostwriting, no burnout.",
      role: "Solo Developer & Designer",
      timeline: "3 months",
      status: "Live",
    },
    problem: {
      headline: "Creators can't be everywhere at once. Their fans expect them to be.",
      body: "The creator economy has a fundamental scaling problem. As an audience grows, the expectation of personal connection doesn't diminish — it intensifies. But a creator has the same 24 hours as everyone else. The math doesn't work.\n\nThe existing solutions are either low-quality (automated responses that feel robotic and damage the creator-fan relationship) or high-cost (hiring a team of ghostwriters who pretend to be the creator, which is a brand and trust risk).\n\nFor models and content creators specifically, authentic connection is their core product. The moment fans feel like they're talking to an intern instead of the creator they follow, the relationship — and the revenue — evaporates.",
      userStory:
        "One model creator on the platform told me she used to spend 4 hours a day responding to fan messages, which was cutting into her actual content creation. After FollowThisModel, her AI persona handles the volume of conversations and she reviews transcripts weekly to keep her persona sharp. Her fan engagement scores went up because the AI is always available.",
    },
    solution: {
      headline: "An AI persona trained to sound like you — not a chatbot, a presence.",
      body: "FollowThisModel creates AI personas trained directly on the creator's personality — their way of speaking, their humor, their interests, their boundaries. The onboarding process is an 8-step deep-dive that captures enough signal to build a genuinely authentic-feeling presence.\n\nFans pay for access with tokens. Different message types — regular chat, voice notes, exclusive content — cost different amounts, creating a tiered experience that rewards deeper engagement. Creators receive Stripe payouts automatically, with no transaction friction on either side.\n\nClaude is the AI backbone because of its superior instruction-following and persona consistency. A persona built on Claude stays in character more reliably than alternatives — which is the entire point.",
      valueProposition:
        "Your personality, available 24/7, at scale — so you can be everywhere your fans expect you to be without sacrificing the authenticity that made them follow you.",
    },
    architecture: {
      description:
        "The platform runs on a React frontend with Supabase handling auth, user data, token balances, and conversation storage. Claude API powers all persona conversations with custom system prompts built from the onboarding data. Stripe handles token purchases and creator payouts with webhook integration for real-time balance updates.",
      techStack: [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
        { category: "Backend", items: ["Supabase", "PostgreSQL", "Edge Functions"] },
        { category: "AI Layer", items: ["Anthropic Claude API", "Persona System Prompts", "Conversation Memory"] },
        { category: "Payments", items: ["Stripe", "Webhooks", "Connect (Creator Payouts)"] },
      ],
    },
    decisions: [
      {
        title: "Claude over GPT for persona work",
        decision: "Use Anthropic's Claude API instead of OpenAI for all persona conversations.",
        why: "After testing both, Claude demonstrated significantly better persona consistency and instruction adherence. For a product where staying in character is the core feature, this was not a close decision.",
        result: "Creators report that their AI personas feel genuinely like them, not like a generic chatbot wearing their name. The persona integrity is what justifies the premium token pricing.",
      },
      {
        title: "8-step onboarding instead of a quick form",
        decision: "Make creator onboarding a structured 8-step conversation rather than a profile form.",
        why: "A form captures surface-level data. To build a persona that actually sounds like the creator, we need voice, humor, opinions, boundaries, and conversational patterns — things that only emerge in conversation.",
        result: "Creators complete the full 8-step process 91% of the time, which is unusually high for long onboarding flows. The output quality of the personas correlates directly with onboarding completion.",
      },
      {
        title: "Token-based payments over subscriptions",
        decision: "Use a token micropayment model instead of monthly subscriptions.",
        why: "Subscriptions work when the value is predictable. Fan engagement with creators is spiky — high around content drops, lower between them. Tokens let fans pay for exactly the value they consume.",
        result: "Average fan spend is higher under the token model than equivalent subscription tiers. The pay-per-interaction model also reduces churn from fans who would cancel subscriptions during low-engagement periods.",
      },
    ],
    results: [
      { value: "540+", label: "Community Members", description: "Active fans across all personas" },
      { value: "8", label: "Onboarding Steps", description: "Deep persona capture process" },
      { value: "3", label: "Revenue Tiers", description: "Token pack sizes for different fan budgets" },
      { value: "91%", label: "Onboarding Completion", description: "Creators who finish all 8 steps" },
    ],
    features: [
      "8-step conversational creator onboarding for deep persona capture",
      "AI personas trained on individual creator personality, voice, and interests",
      "Token micropayment system for fan-to-persona conversations",
      "Multiple message types: text chat, voice notes, exclusive content",
      "Stripe Connect integration for automatic creator payouts",
      "Creator dashboard with conversation analytics and earnings tracking",
      "Fan dashboard with token balance and conversation history",
      "Admin moderation tools for content policy compliance",
    ],
  },
  {
    slug: "push-coach",
    title: "Push Coach",
    description:
      "AI accountability coach that texts you a personalized task every morning and follows up if you don't respond. No app download needed — just SMS.",
    category: "AI Coaching",
    color: "#22D3EE",
    tech: ["React", "TypeScript", "Supabase", "Claude API", "Twilio"],
    stats: [
      { value: "99.7%", label: "Cost Reduction" },
      { value: "6", label: "Auto Workflows" },
      { value: "94%", label: "Profit Margin" },
    ],
    hero: {
      headline: "The accountability coach that lives in your texts — not in another app you'll forget to open.",
      role: "Solo Developer & Designer",
      timeline: "3 weeks",
      status: "Live",
    },
    problem: {
      headline: "Accountability apps fail because they're apps.",
      body: "The average person has 80+ apps on their phone and actively uses fewer than 10. Every new productivity or accountability tool requires the user to change a behavior — open the app, check in, log progress. That friction is exactly the friction these tools are supposed to help overcome.\n\nExisting coaching apps cost $50-200/month for human coaches, which creates access barriers. AI-powered alternatives exist but they still require app interaction, still require the user to come to the tool rather than the tool coming to the user.\n\nThe insight was simple: everyone checks their texts. SMS has a 98% open rate. If the coaching happened in the medium people already use, the friction problem disappears.",
      userStory:
        "One user told me they'd tried 6 different productivity apps and abandoned all of them within 2 weeks. With Push Coach, they've been receiving and completing daily tasks for 4 months. 'I don't have to remember to use it. It finds me.'",
    },
    solution: {
      headline: "Coaching that comes to you, not the other way around.",
      body: "Push Coach sends each user a personalized task every morning via SMS. The task is generated by Claude based on the user's stated goals, their completion history, and a progressive difficulty model that gradually stretches their capacity. No app to open, no notification to dismiss.\n\nIf the user doesn't respond by a configurable follow-up time, Push Coach sends a check-in. If they complete it, they get a brief positive reinforcement message. If they miss, they get a gentle reset and tomorrow's task is recalibrated.\n\nThe entire interaction happens in SMS. Signup, goal-setting, daily tasks, check-ins, and progress reviews are all done through text conversation. The management dashboard (web app) is optional — for users who want to see patterns and analytics, not for basic operation.",
      valueProposition:
        "An AI accountability coach that texts you every morning with one specific, personalized task — and follows up to make sure you did it.",
    },
    architecture: {
      description:
        "Twilio handles all SMS sending and receiving with webhook callbacks to a Supabase Edge Function that processes incoming messages. Claude generates personalized tasks and coaching responses based on user context stored in Supabase. n8n manages the scheduling workflows for morning sends and follow-up timers. The web dashboard is a React app for users who want analytics.",
      techStack: [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
        { category: "Backend", items: ["Supabase", "PostgreSQL", "Edge Functions"] },
        { category: "AI Layer", items: ["Anthropic Claude API", "Conversation Context", "Adaptive Difficulty"] },
        { category: "Messaging", items: ["Twilio SMS", "Webhook Processing", "Two-way Conversation"] },
        { category: "Automation", items: ["n8n", "Scheduling Workflows", "Follow-up Timers"] },
      ],
    },
    decisions: [
      {
        title: "SMS over app notifications",
        decision: "Build around SMS as the primary interaction medium, not push notifications or in-app experience.",
        why: "SMS has a 98% open rate versus ~20% for push notifications. More importantly, SMS doesn't require the user to have the app installed, maintain an active account, or remember to open anything.",
        result: "99.7% cost reduction vs. the original concept (human coaches at $150/month). The SMS-first approach also means near-zero churn from app abandonment — a problem that kills every other coaching app.",
      },
      {
        title: "Claude for adaptive coaching",
        decision: "Use Claude with a rich context window and conversation history for task generation.",
        why: "Task personalization requires knowing the user's goals, their recent completions, their struggle patterns, and their current momentum. Claude's long context window and instruction-following quality was critical for maintaining coaching continuity.",
        result: "Task relevance scores from user feedback are significantly higher than a rule-based alternative prototype. Users report that tasks feel tailored to where they actually are in their goals.",
      },
      {
        title: "n8n for scheduling workflows",
        decision: "Use n8n instead of cron jobs or cloud schedulers for message timing.",
        why: "Morning send time, follow-up delay, and weekend behavior all need to be configurable per-user and easy to modify as we learn. n8n workflows are visual and fast to iterate on.",
        result: "6 active automation workflows managing thousands of daily sends. Changed the default follow-up timing 3 times based on user behavior data — each change was a 5-minute workflow edit.",
      },
    ],
    results: [
      { value: "99.7%", label: "Cost Reduction", description: "vs. human coaching alternatives" },
      { value: "6", label: "Automation Workflows", description: "Managing daily sends and follow-ups" },
      { value: "94%", label: "Profit Margin", description: "SMS + AI cost structure" },
      { value: "98%", label: "Message Open Rate", description: "vs ~20% for push notifications" },
    ],
    features: [
      "Personalized daily task generation via Claude based on user goals",
      "Automated morning SMS delivery with configurable send time",
      "Follow-up check-in if no response by configurable deadline",
      "Progressive difficulty model that adapts to completion patterns",
      "Full two-way SMS conversation for check-ins and adjustments",
      "Web dashboard with completion rates, streaks, and goal progress",
      "Goal-setting and adjustment via SMS conversation",
      "n8n-powered scheduling with per-user configuration",
    ],
  },
  {
    slug: "2100-security",
    title: "2100 Security",
    description:
      "Operations platform for a 24/7 security team at a 33-floor high-rise. Replaced manual scheduling, added team comms, and modernized a legacy Wix site.",
    category: "Client Project",
    color: "#22C55E",
    tech: ["React", "TypeScript", "Supabase", "n8n", "Cloudflare"],
    stats: [
      { value: "16", label: "Officers Managed" },
      { value: "33", label: "Floor Building" },
      { value: "24/7", label: "Coverage" },
    ],
    hero: {
      headline: "From spreadsheets and phone calls to a real operations platform.",
      role: "Solo Developer & Designer",
      timeline: "8 weeks",
      status: "Live",
    },
    problem: {
      headline: "A 16-person security operation running on spreadsheets and group texts.",
      body: "The 2100 McKinney building in Dallas is a 33-floor commercial high-rise requiring 24/7 security coverage. When I came on, the security company managing the contract was operating their entire scheduling and communications system through a shared Google Sheets document and a WhatsApp group chat.\n\nSchedule changes required calls or texts to individual officers. Coverage gaps were discovered the hard way. The company's public-facing website was still on Wix from several years prior and reflected none of the professionalism the client demanded. Leadership had no visibility into who was on shift without digging through the spreadsheet.\n\nFor a team responsible for the safety of a major commercial property, the operational infrastructure was alarmingly fragile.",
      userStory:
        "The operations manager told me they'd had three scheduling mishaps in the prior quarter — shifts where no one showed up because of communication breakdowns. Each incident created a tense conversation with the building management. After the platform launched, they went 6 months without a single coverage gap.",
    },
    solution: {
      headline: "An operations platform purpose-built for shift-based security teams.",
      body: "The platform I built has two components: an internal operations system for the security team and a client-facing marketing site for the company. The operations system handles scheduling (with visual shift calendars and automated conflict detection), team communications (replacing the WhatsApp group with a structured channel system), incident logging, and a manager dashboard with real-time coverage status.\n\nThe new public site was rebuilt from the ground up on Cloudflare Pages with a professional design that matched the standard of their client roster. The old Wix site was actively hurting them in the sales process.\n\nn8n handles shift reminder notifications, coverage gap alerts, and the daily schedule digest sent to all officers each morning.",
      valueProposition:
        "Professional-grade operations infrastructure for a security company that was one scheduling mistake away from losing their most important contract.",
    },
    architecture: {
      description:
        "Supabase powers the data layer for officers, schedules, shifts, incidents, and messages with Row Level Security ensuring officers only see their own data. The React frontend has two distinct interfaces — the officer mobile-optimized view and the manager desktop dashboard. n8n runs the notification and alerting workflows. The marketing site is a separate Cloudflare Pages deployment.",
      techStack: [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
        { category: "Backend", items: ["Supabase", "PostgreSQL", "Row Level Security"] },
        { category: "Automation", items: ["n8n", "Shift Reminders", "Coverage Alerts"] },
        { category: "Infrastructure", items: ["Cloudflare Pages", "Cloudflare Workers"] },
      ],
    },
    decisions: [
      {
        title: "Separate marketing site from ops platform",
        decision: "Build the marketing site and operations platform as two separate deployments.",
        why: "The marketing site needs to be fast, public, and SEO-optimized. The operations platform needs auth, real-time data, and complex state. Combining them would have added complexity to both.",
        result: "The marketing site loads in under 0.8 seconds. The ops platform can be updated and deployed independently without any downtime risk to the public site.",
      },
      {
        title: "Mobile-first for officer interface",
        decision: "Design the officer view as a mobile-first interface rather than a responsive desktop layout.",
        why: "Officers access the system on their phones, often at the start of a shift in poor lighting conditions. Desktop-optimized UI adapted to mobile is noticeably worse for this use case than UI designed for mobile first.",
        result: "Officer adoption was immediate — the team moved to the platform within the first week without needing training sessions. The previous Google Sheets approach required help from the ops manager to interpret.",
      },
    ],
    results: [
      { value: "16", label: "Officers Managed", description: "Across all shifts and roles" },
      { value: "0", label: "Coverage Gaps", description: "In 6 months post-launch" },
      { value: "33", label: "Floor Building", description: "High-rise requiring continuous coverage" },
      { value: "8w", label: "Build Time", description: "Full ops platform + marketing site" },
    ],
    features: [
      "Visual shift calendar with drag-and-drop scheduling",
      "Automated conflict detection for overlapping or uncovered shifts",
      "Team communications system with role-based channels",
      "Incident logging with timestamps and officer attribution",
      "Manager dashboard with real-time coverage status",
      "Mobile-optimized officer interface",
      "n8n-powered shift reminders and coverage gap alerts",
      "Daily schedule digest sent via notification to all active officers",
      "New marketing site with professional design on Cloudflare Pages",
    ],
  },
  {
    slug: "sophia-ai",
    title: "Sophia AI",
    description:
      "The voice-first AI assistant platform behind multiple products. Talk naturally, get real answers, connected to your email, calendar, and contacts.",
    category: "AI Foundation",
    color: "#A855F7",
    tech: ["React", "TypeScript", "OpenAI", "n8n", "Google APIs"],
    stats: [
      { value: "95%", label: "Cost vs Competitors" },
      { value: "3+", label: "Products Built On It" },
      { value: "30+", label: "Issues Resolved" },
    ],
    hero: {
      headline: "Building a voice AI assistant from scratch so I'd never have to do it again.",
      role: "Solo Developer & Architect",
      timeline: "5 months (ongoing)",
      status: "Active Development",
    },
    problem: {
      headline: "Every AI product I built needed the same voice assistant foundation.",
      body: "After building two AI-powered products, a pattern emerged: every project needed natural language understanding, voice interaction, context management, and integrations with the same set of tools — email, calendar, contacts. Building this from scratch for each product was wasteful, but using off-the-shelf solutions (Siri Shortcuts, Alexa Skills, Google Assistant) imposed too many constraints.\n\nCommercial AI assistant platforms cost $200-500/month and provide minimal customization. The features you don't need are baked in; the integrations you do need aren't available. The underlying technology is the same — they're all GPT wrappers with proprietary middleware.\n\nThe engineering problem was interesting enough that the better solution was to build a reusable platform rather than pay indefinitely for something inferior.",
      userStory:
        "When I started integrating Sophia into Trip Buddy, the entire voice layer took 2 days instead of the 3 weeks it had taken to build from scratch in the first project. That's the ROI of the platform approach — the investment depreciates across every product built on top of it.",
    },
    solution: {
      headline: "A reusable AI assistant foundation with natural voice, real integrations, and product-specific customization.",
      body: "Sophia AI is a platform, not a product. It provides the foundation layer that any conversational AI product needs: speech-to-text and text-to-speech with natural pacing, context management that maintains coherent multi-turn conversations, intent classification that routes requests to the right tool, and integrations with Google Workspace APIs.\n\nProducts built on Sophia inherit all of this infrastructure and customize it with product-specific system prompts, tool definitions, and personality parameters. The integration between products and Sophia is an API — clean, versioned, and designed to be built against.\n\nn8n handles the integration workflows — calendar reads and writes, email fetching and drafting, contact lookups — as reusable building blocks that any Sophia-powered product can invoke.",
      valueProposition:
        "A production-grade AI assistant foundation that turns a 3-week engineering effort into a 2-day integration — for every product built on top of it.",
    },
    architecture: {
      description:
        "Sophia is structured as a React component library plus a backend service. The frontend components handle voice input (Web Speech API), audio output (Web Speech Synthesis), and conversation UI. The backend service manages conversation state, routes intents to tools, and maintains integration with the Google APIs. n8n acts as the integration middleware, providing pre-built workflow blocks for calendar, email, and contacts operations.",
      techStack: [
        { category: "Frontend", items: ["React", "TypeScript", "Web Speech API", "Speech Synthesis"] },
        { category: "Backend", items: ["Supabase", "Edge Functions", "Conversation State"] },
        { category: "AI Layer", items: ["OpenAI GPT-4o", "Function Calling", "Intent Classification"] },
        { category: "Integrations", items: ["Google Calendar API", "Gmail API", "Google Contacts API"] },
        { category: "Automation", items: ["n8n", "Integration Workflows", "Tool Definitions"] },
      ],
    },
    decisions: [
      {
        title: "Platform architecture from day one",
        decision: "Design as a reusable platform with a clean API from the start, not as a product feature to extract later.",
        why: "Extracting reusable infrastructure from a product codebase is painful and slow. Designing for reuse from the beginning costs 20-30% more upfront but pays back exponentially as more products build on it.",
        result: "Three products now use Sophia as their AI foundation. The combined development time saved vs. building from scratch each time is estimated at 8+ weeks of work.",
      },
      {
        title: "n8n as integration middleware",
        decision: "Use n8n to manage all Google API integrations rather than writing direct API calls in the backend.",
        why: "Google Workspace APIs have OAuth flows, token refresh logic, rate limiting, and error handling quirks that are painful to manage in custom code. n8n abstracts all of that into visual workflows that are easy to test and maintain.",
        result: "Added full Gmail read/write integration in one afternoon. The same would have taken 2-3 days of custom code. 30+ edge cases and API quirks were handled by n8n's built-in error handling.",
      },
      {
        title: "OpenAI function calling for tool routing",
        decision: "Use OpenAI's function calling feature for intent-to-tool routing instead of a custom classifier.",
        why: "A custom intent classifier requires training data, maintenance, and still produces worse results than GPT-4o's zero-shot function selection. Function calling is also easier to extend with new tools.",
        result: "Intent routing accuracy is near-perfect for well-defined tools. Adding a new integration requires only a function definition — no classifier retraining or rule updates.",
      },
    ],
    results: [
      { value: "95%", label: "Lower Cost", description: "vs. commercial AI assistant platforms" },
      { value: "3+", label: "Products Built On It", description: "Trip Buddy, Push Coach, and more" },
      { value: "30+", label: "Issues Resolved", description: "Edge cases handled by platform, not products" },
      { value: "8w+", label: "Dev Time Saved", description: "Across all products using Sophia" },
    ],
    features: [
      "Voice-first interface with Web Speech API for natural spoken interaction",
      "Context-aware multi-turn conversation management",
      "OpenAI function calling for accurate intent-to-tool routing",
      "Google Calendar integration: read, write, and update events",
      "Gmail integration: read, draft, send, and search emails",
      "Google Contacts integration for contact lookup and management",
      "Product-level customization via system prompt parameters",
      "Versioned API for product integration",
      "n8n integration middleware for maintainable external connections",
    ],
  },
];
