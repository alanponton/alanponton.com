export interface ProjectData {
  slug: string;
  title: string;
  description: string;
  category: string;
  color: string;
  gallery?: { src: string; caption: string; inCard?: boolean; theme?: "light" | "dark"; }[];
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
    imageGroups?: {
      layout: "single" | "pair" | "trio" | "quad";
      caption?: string;
      images: { src: string; alt: string; theme?: "light" | "dark" }[];
    }[];
  };
  solution: {
    headline: string;
    body: string;
    valueProposition: string;
    imageGroups?: {
      layout: "single" | "pair" | "trio" | "quad";
      caption?: string;
      images: { src: string; alt: string; theme?: "light" | "dark" }[];
    }[];
  };
  architecture: {
    techStack: { category: string; items: string[] }[];
    description: string;
    imageGroups?: {
      layout: "single" | "pair" | "trio" | "quad";
      caption?: string;
      images: { src: string; alt: string; theme?: "light" | "dark" }[];
    }[];
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
  versions?: {
    label: string;
    headline: string;
    body: string;
    learning: string;
    imageGroups?: {
      layout: "single" | "pair" | "trio" | "quad";
      caption?: string;
      images: { src: string; alt: string; theme?: "light" | "dark" }[];
    }[];
  }[];
  features?: string[];
}

export const projects: ProjectData[] = [
  {
    slug: "lonnies-locations",
    title: "Lonnie's Locations",
    description:
      "A productized group-travel platform for an independent advisor. Per-trip branded experiences, AI concierge, and self-service guest portal.",
    category: "Client Project",
    color: "#D4A574",
    gallery: [
      { src: "/projects/Lonnies/lonnies_home_mobile_trip_card.png", caption: "Trip card — Sunny Celebration", inCard: true },
      { src: "/projects/Lonnies/lonnies_home_mobile.png", caption: "Homepage hero", inCard: true },
      { src: "/projects/Lonnies/lonnies_home_mobile_concierge.png", caption: "AI concierge", inCard: true },
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Anthropic Claude", "Supabase", "Cloudflare"],

    stats: [
      { value: "3", label: "Live Trips" },
      { value: "30+", label: "Guests Served" },
      { value: "$2.50/mo", label: "Infrastructure Cost" },
      { value: "0", label: "Promise-Breaking UI" },
    ],

    hero: {
      headline: "Premium group travel, productized, without losing the high-touch.",
      role: "UX Designer & Full-Stack Developer (solo)",
      timeline: "Dec 2025 to present",
      status: "Live in production",
      liveUrl: "https://lonnieslocations.com",
    },

    problem: {
      headline: "A thriving high-touch travel business with zero digital infrastructure.",
      body: "An independent travel advisor was running 30 plus person group trips out of Chicago, and her business was built entirely on direct relationships. The success was crushing her. One anxious guest could send four messages a week, all in the same five categories. Passports. Vaccinations. Packing. Motion sickness. Payment timing. Multiply that by thirty guests across three concurrent trips, and the math stopped working.\n\nThe structural problem was harder than the volume. Every trip was different. A Royal Caribbean family cruise, a Caribbean milestone voyage, and a month-long East Africa journey share almost nothing. They have different booking shapes, different commitment levels, different anxieties. But they had to feel like one coherent premium brand, or the productized promise collapsed.",
    },

    solution: {
      headline: "A productized platform that absorbs the repetitive work and lets the relationship work scale.",
      body: "Lonnie's Locations is a per-trip branded platform with three pillars. A trip-aware AI concierge that absorbs the recurring questions. Reservation flows designed structurally around how each trip actually commits. A passwordless self-service guest portal that ends the status-anxiety loop.\n\nNew trips launch as content entries, not redesigns. The architecture flexes between cruise structure and journey structure while shared components like the concierge, the portal, and the brand system stay constant.\n\nThe concierge is the headline feature, but the real design work is in the judgment layer. What it refuses to answer. How it hands off to a human. How every escalation reaches the advisor with full context, instead of disappearing into a banner that promised more than the system delivered.",
      valueProposition:
        "Productized premium travel that respects the relationship at the heart of the business. Designed for an older, anxious, mobile-first audience where accessibility and microcopy are where the premium actually lives.",
      imageGroups: [
        {
          layout: "trio",
          caption: "The three guest-facing pillars: concierge, reservation flow, status portal",
          images: [
            { src: "/projects/Lonnies/lonnies_home_mobile_concierge.png", alt: "Trip-aware AI concierge answering a guest question", theme: "light" },
            { src: "/projects/Lonnies/lonnies_home_mobile_choose_cabin.png", alt: "Cruise reservation flow, cabin selection", theme: "light" },
            { src: "/projects/Lonnies/lonnies_home_mobile_trip_status.png", alt: "Passwordless guest portal showing trip status", theme: "light" },
          ],
        },
      ],
    },

    architecture: {
      description:
        "A trip-type model abstracts the shared guest journey of discover, understand, reserve, and track. The middle layer flexes between cruise structure with cabin selection, a single ship, and a fixed sailing, and journey structure with a multi-leg timeline, per-leg hotel choices, and flexible participation. Shared components stay constant. Trip-specific components swap underneath. The concierge runs on a per-trip knowledge base. The admin dashboard receives real-time escalations with full conversation transcripts. The whole system operates at roughly $2.50 per month in infrastructure cost.",
      imageGroups: [
        {
          layout: "pair",
          caption: "The advisor's command center: live escalations and the client pipeline",
          images: [
            { src: "/projects/Lonnies/admin-top-page.jpg", alt: "Admin dashboard showing all escalations clear", theme: "light" },
            { src: "/projects/Lonnies/admin-traveler-list-redacted.jpg", alt: "Client pipeline with status filters, client details anonymized", theme: "light" },
          ],
        },
      ],
      techStack: [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
        { category: "Conversation", items: ["Anthropic Claude", "Per-trip knowledge base", "Conversation design"] },
        { category: "Backend", items: ["Supabase", "PostgreSQL", "Magic-link authentication"] },
        { category: "Infrastructure", items: ["Cloudflare Pages", "$2.50 per month"] },
      ],
    },

    decisions: [
      {
        title: "Identifying the escalation banner as a trust-integrity defect",
        decision:
          "Rebuild the AI concierge's human-handoff into a real closed loop with a live admin dashboard, urgency-coded alerts, audible chime, and full transcript context.",
        why:
          "When the agent hit something it shouldn't answer, the interface promised the guest that Lonnie had been notified and would reach out personally. The system was not keeping that promise. Nothing actually notified her. A UI lie is a trust defect, not a polish item. Designing for trust meant making the banner literally true.",
        result:
          "Escalations now reach the advisor with color-coded urgency. Medical questions show red. Payment questions show gold. Cancellations show orange. She gets a transcript so she has context before she reaches out, and the agent proactively captures the guest's best contact method. The banner became a real promise the system keeps.",
      },
      {
        title: "Reversing my own designer-imposition failure mid-build",
        decision:
          "Archive the elevated aspirational itinerary I had designed for a client's birthday trip and make her actual chosen plans canonical.",
        why:
          "I had swapped her real plans, club nights and a specific beach-club birthday dinner, for a high-end safari. I did it on instinct that a premium trip should feel a certain way. On review I recognized the pattern. I had designed for an aspirational persona instead of the actual user. The fix was not a tweak. It was reversing my own work and making one principle govern the rest of the build. The experience must reflect who the client actually is, not who I assume a premium traveler should be.",
        result:
          "A design discipline that carried through the rest of the project. No aspirational overrides. No assumptions about what a premium traveler should want. The case study for what UX research is actually for. Catching designer bias before it ships.",
      },
      {
        title: "Treating the concierge as conversation design first, engineering second",
        decision:
          "Build the concierge around what it should refuse to answer, not just what it can answer. Honest boundaries on pricing, medical, refund, and group-conflict questions. Trip-aware persona. Suggested-question chips for the blank-prompt problem.",
        why:
          "A travel concierge that bluffs a price quote or guesses at a medical question damages the relationship it is supposed to protect. The premium experience comes from a concierge that knows when to hand off. The product is the judgment, not the omniscience. What the assistant says, what it refuses, and how it hands off is the design. The model wiring is the easy part.",
        result:
          "A concierge guests trust because it acknowledges its limits, escalates real judgment calls to a human, and surfaces the highest-anxiety topics like passport, packing, and payments up front through data-driven suggested questions per trip. A 25,000 character knowledge base derived from the advisor's real inbox grounds it in actual guest questions, not hypothetical ones.",
      },
    ],

    results: [
      { value: "3", label: "Live Trips", description: "Cruise, voyage, multi-country journey" },
      { value: "30+", label: "Guests Served", description: "Confirmed group cruise plus ongoing trips" },
      { value: "$2.50/mo", label: "Infrastructure Cost", description: "vs. $200–400/yr commercial alternatives" },
      { value: "0", label: "Promise-Breaking UI", description: "Every banner the system shows is one the system keeps" },
    ],

    features: [
      "AI travel concierge with trip-aware persona and a 25,000 character per-trip knowledge base",
      "Real-time admin dashboard with urgency-coded escalation alerts and full transcript context",
      "Structurally distinct reservation flows. Cruise modal versus journey multi-leg selector.",
      "Passwordless magic-link guest portal with status microcopy that reads as reassurance",
      "\"Important to Know\" disclosure pattern with required acknowledgment for trip-blocking realities",
      "Accessibility-first premium aesthetic with dual-layer text shadows, reduced-motion honor, and mobile-first layout",
      "Editorial personalization layer with per-trip theme, hero line, narrative, and concierge prompts",
      "Custom branded social-preview cards designed around the trip date as the hero element",
      "Streaming concierge responses for perceived performance",
      "Suggested-question chips surfacing the highest-anxiety topics first",
      "Honest refusal boundaries on pricing, medical, refund, and group-conflict questions",
      "Productized model where new trips launch as content entries, not redesigns",
    ],
  },
  {
    slug: "2100-security",
    title: "2100 Security",
    description:
      "Operations platform for a 24/7 security team at a 33-floor high-rise. Three production versions: killed the no-SSL warnings, built the rotation engine, shipped real auth and safety tracking.",
    category: "Personal / Operational Tool",
    color: "#22C55E",
    gallery: [
      { src: "/projects/2100/V3/live-guard-select-dark-v3.jpg", caption: "Guard picker, tap your name", inCard: true },
      { src: "/projects/2100/V3/live-landing-dark-v3.jpg", caption: "Tonight's rotation dashboard", inCard: true },
      { src: "/projects/2100/V3/live-rotation-light-v3.jpg", caption: "Monthly rotation schedule", inCard: true },
      { src: "/projects/2100/V3/live-landing-light-v3.jpg", caption: "Tonight's shift home screen, light mode.", inCard: false, theme: "light" },
      { src: "/projects/2100/V3/live-rotation-dark-v3.jpg", caption: "Monthly schedule, dark mode for overnight shifts.", inCard: false, theme: "dark" },
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Node/Express", "Cloudflare"],
    stats: [
      { value: "3", label: "Production Versions" },
      { value: "5", label: "Officers, Nightly Use" },
      { value: "33", label: "Floor High-Rise" },
    ],
    hero: {
      headline: "From a broken no-SSL site to an operations tool the night shift actually uses.",
      role: "Solo UX Designer & Developer",
      timeline: "3 versions, ongoing",
      status: "Live in production",
    },
    problem: {
      headline: "A five-person overnight team running on a broken legacy site.",
      body: "The team ran on a free-tier Wix site with no SSL, so every officer who opened it got a browser security warning. For a security operation, an embarrassment that quietly eroded trust before anyone used the tool. The site was static, so I rebuilt the schedule by hand every month. On a phone it required pinch-zoom and horizontal scrolling to read an assignment. There was no authentication, no awareness of who was on shift, and nothing operational beyond a schedule grid.",
      userStory:
        "Evaluating a team chat tool, I watched Slack die on free-tier limits and Microsoft Teams die because officers had scattered emails and forgotten passwords. Google Chat won only because everyone already had Gmail. The lesson became the platform's governing principle: the best technology is worthless if users can't get into it.",
    },
    solution: {
      headline: "An operations hub designed for a tired person, one-handed, in a dark stairwell.",
      body: "I designed the app around the single question an officer asks every night: what am I doing right now? The home screen answers it on open: current block, post, floor range. The full rotation is one tap down. Constraints came from direct observation of officers using the old site in real conditions: dark by default, high-contrast type, large tap targets, never any horizontal scroll. Identity is a guard-picker, not a login form. Tap your name, set an employee ID once, under five seconds, no email or app store. Where a careless tap causes real harm (confirming a fire-extinguisher safety inspection), I deliberately ADDED friction with required ID re-entry.",
      valueProposition:
        "Zero-friction access where friction kills adoption; deliberate friction exactly where a careless tap is real-world harm.",
      imageGroups: [
        {
          layout: "trio",
          caption: "Identity in under five seconds: tap your name, enter your ID",
          images: [
            { src: "/projects/2100/V3/live-guard-select-dark-v3.jpg", alt: "Guard picker, tap your name", theme: "dark" },
            { src: "/projects/2100/V3/live-login-start-dark-v3.jpg", alt: "Login start screen", theme: "dark" },
            { src: "/projects/2100/V3/live-login-dark-v3.jpg", alt: "Employee ID entry with numeric keypad", theme: "dark" },
          ],
        },
      ],
    },
    architecture: {
      description:
        "React/TypeScript PWA with Tailwind, deployed on Replit. A Node/Express backend serves a weather proxy and guard authentication. Replit Database stores guard credentials and inspection records. Cloudflare handles SSL, DNS, and caching. A constraint-based rotation engine cycles guards through three posts across three time blocks, honoring 5–7 simultaneous scheduling rules, with floors travelling with each guard through every rotation.",
      imageGroups: [
        {
          layout: "pair",
          caption: "The shift-aware home screen and the rotation engine output",
          images: [
            { src: "/projects/2100/V3/live-landing-dark-v3.jpg", alt: "Tonight's shift, current block highlighted", theme: "dark" },
            { src: "/projects/2100/V3/live-rotation-dark-v3.jpg", alt: "Monthly rotation schedule generated by the engine", theme: "dark" },
          ],
        },
      ],
      techStack: [
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS"] },
        { category: "Backend", items: ["Node/Express", "Replit Database"] },
        { category: "Infrastructure", items: ["Cloudflare SSL/DNS", "PWA"] },
        { category: "Logic", items: ["Constraint scheduling engine"] },
      ],
    },
    decisions: [
      {
        title: "Guard picker as identity, not a login form",
        decision: "Replace traditional auth with a tap-your-name picker plus a one-time employee ID.",
        why: "A failed chat-tool rollout proved access friction kills internal tools regardless of features. Officers needed in under five seconds with no email or app store.",
        result: "Full team adoption with zero onboarding friction. Five officers use it nightly across Android and iOS.",
      },
      {
        title: "Deliberately adding friction for safety inspections",
        decision: "Require employee-ID re-entry to confirm a fire-extinguisher inspection.",
        why: "A fat-fingered tap marking a safety inspection complete when it wasn't is real-world harm, not a UI annoyance — the inverse of the zero-friction principle.",
        result: "Inspection confirmations are deliberate; accidental completions designed out.",
      },
    ],
    versions: [
      {
        label: "V1: Paper Era",
        headline: "A color-coded Excel rotation taped to the command desk.",
        body: "Before any web tool existed, the team ran on a color-coded Excel rotation I rebuilt monthly. Posts, shift codes, and floor ranges all expressed in cells and color.\n\nInstantly readable at a glance, but with no awareness of who was working or when. Updates required reprinting. Conflicts solved by hand. Every monthly change cost me an evening.",
        learning: "The constraints were the data model. The eventual app would automate the same five-to-seven rules I was solving manually in a spreadsheet.",
        imageGroups: [
          {
            layout: "single",
            images: [
              { src: "/projects/2100/V1/excel-rotation-color-coded-v1.png", alt: "Excel rotation schedule, color-coded by post" },
            ],
          },
        ],
      },
      {
        label: "V2: Wix Era",
        headline: "The first web tool. No SSL, no auth, no shift awareness.",
        body: "A free-tier Wix site that gave every officer a browser security warning. For a security company, an embarrassment.\n\nThe site was static, so I rebuilt the schedule page by hand every month. On a phone it required pinch-zoom and horizontal scrolling.\n\nI pushed the platform with wireframes, prototypes, passdown notes, and social sign-up. But Wix could not support the dynamic shift-aware behavior the team actually needed. The problem wasn't the design. It was the foundation.",
        learning: "Watching a separate chat-tool rollout fail on forgotten passwords (not capability) gave me the governing principle: zero-friction access beats feature richness every time.",
        imageGroups: [
          {
            layout: "trio",
            caption: "Wireframes (low-fi design exploration)",
            images: [
              { src: "/projects/2100/V2/2100_Security_wireframes/wireframe-landing-v2.jpg", alt: "Landing wireframe" },
              { src: "/projects/2100/V2/2100_Security_wireframes/wireframe-rotation-v2.jpg", alt: "Rotation wireframe" },
              { src: "/projects/2100/V2/2100_Security_wireframes/wireframe-signup-v2.jpg", alt: "Sign-up wireframe" },
            ],
          },
          {
            layout: "quad",
            caption: "Prototypes (deployed on Wix)",
            images: [
              { src: "/projects/2100/V2/prototype-landing-v2.jpg", alt: "Wix landing page" },
              { src: "/projects/2100/V2/prototype-passdown-v2.jpg", alt: "Wix passdown notes form" },
              { src: "/projects/2100/V2/prototype-rotation-v2.jpg", alt: "Wix daily rotation view" },
              { src: "/projects/2100/V2/prototype-social-login-v2.jpg", alt: "Wix sign-up with Google and Facebook" },
            ],
          },
        ],
      },
      {
        label: "V3: The Production Platform (current)",
        headline: "A solo build that survived three internal iterations and the night shift.",
        body: "A custom PWA replacing Wix. Three internal builds got it here.\n\nBuild 1 prioritized aesthetics and lost to readability on overnight shifts.\n\nBuild 2 reversed that: stripped styling, dark-mode toggle, guard picker, block-rotation highlighting, floor-specific patrol notes, patrol-reminder overlay.\n\nBuild 3 added employee-ID authentication backed by Replit Database, automated fire-extinguisher inspection tracking with deliberate ID-confirmation, and Safari/iOS hardening across every interactive feature.",
        learning: "The decisions I'm proudest of are the self-correcting ones. Build 1 was a designer designing for himself; the users couldn't read it on shift and said so. The inspection-confirmation pattern is the inverse move: deliberately adding friction exactly where a careless tap causes real-world harm.",
        imageGroups: [
          {
            layout: "trio",
            caption: "Identity flow: tap your name, then your employee ID",
            images: [
              { src: "/projects/2100/V3/live-guard-select-dark-v3.jpg", alt: "Guard picker, dark mode", theme: "dark" },
              { src: "/projects/2100/V3/live-login-start-dark-v3.jpg", alt: "Login start, dark mode", theme: "dark" },
              { src: "/projects/2100/V3/live-login-dark-v3.jpg", alt: "Employee ID entry with numeric keypad", theme: "dark" },
            ],
          },
          {
            layout: "pair",
            caption: "Tonight's shift, dark and light",
            images: [
              { src: "/projects/2100/V3/live-landing-dark-v3.jpg", alt: "Dashboard with current block highlighted, dark mode", theme: "dark" },
              { src: "/projects/2100/V3/live-landing-light-v3.jpg", alt: "Dashboard, light mode", theme: "light" },
            ],
          },
          {
            layout: "pair",
            caption: "Monthly rotation schedule",
            images: [
              { src: "/projects/2100/V3/live-rotation-dark-v3.jpg", alt: "Monthly rotation, dark mode", theme: "dark" },
              { src: "/projects/2100/V3/live-rotation-light-v3.jpg", alt: "Monthly rotation, light mode", theme: "light" },
            ],
          },
          {
            layout: "pair",
            caption: "Full schedule overlay",
            images: [
              { src: "/projects/2100/V3/live-rotation-detail-full-schedule-background-dark-v3.jpg", alt: "Full schedule detail, dark mode", theme: "dark" },
              { src: "/projects/2100/V3/live-rotation-detail-full-schedule-background-light-v3.jpg", alt: "Full schedule detail, light mode", theme: "light" },
            ],
          },
          {
            layout: "pair",
            caption: "Mid-shift moments",
            images: [
              { src: "/projects/2100/V3/live-landing-detail-rotation-light-v3.jpg", alt: "Rotation card detail expanded, light mode", theme: "light" },
              { src: "/projects/2100/V3/live-reminder-popup-dark-v3.jpg", alt: "Patrol reminder modal, dark mode", theme: "dark" },
            ],
          },
        ],
      },
    ],
    results: [
      { value: "100%", label: "Security Warnings Eliminated", description: "No-SSL Wix to Cloudflare-protected hosting" },
      { value: "1", label: "Data-Array Edit", description: "Replaced monthly hand-rebuilding of the schedule" },
      { value: "5", label: "Officers, Nightly", description: "Across Android and iOS" },
      { value: "5–7", label: "Simultaneous Constraints", description: "Honored per generated rotation" },
    ],
    features: [
      "Passwordless guard-picker identity (under five seconds, no email)",
      "Shift-aware home screen answering 'what am I doing right now'",
      "Constraint-based rotation engine (5–7 simultaneous rules)",
      "Automated fire-extinguisher inspection tracking with deliberate ID confirmation",
      "Dark-by-default, high-contrast, mobile-first, zero horizontal scroll",
      "Employee-ID authentication with locked guard switcher and logout",
      "Safari/iOS compatibility hardening across all interactive features",
    ],
  },
  {
    slug: "metroplex-match",
    title: "MetroPlex Match",
    description:
      "A dating platform where AI coaches guide DFW singles to real compatibility — not just swiping. Personality science meets modern matchmaking.",
    category: "AI Platform",
    color: "#6366F1",
    gallery: [
      { src: "/projects/metroplex-match/mobile_home.png", caption: "Home", inCard: true },
    ],
    tech: ["React", "TypeScript", "Supabase", "OpenAI", "n8n"],
    stats: [
      { value: "16", label: "MBTI Types" },
      { value: "6", label: "AI Coaches" },
      { value: "256", label: "Match Combinations" },
    ],
    hero: {
      headline: "Dating apps optimize for swipes. I built one that optimizes for compatibility.",
      role: "Solo Developer & Designer",
      timeline: "4 months",
      status: "Built, pre-launch",
    },
    problem: {
      headline: "Dating apps are broken by design.",
      body: "The DFW dating scene was saturated with apps that rewarded looks over personality, engagement over connection. Users reported swiping hundreds of times per week but rarely finding meaningful matches. The gamification loop kept people subscribed but chronically lonely.\n\nPsychological research consistently shows that long-term compatibility is driven by personality alignment, communication style, and shared values — none of which are conveyed in a photo grid. The existing apps knew this, but fixing it would hurt their engagement metrics.\n\nI set out to build a platform that treated compatibility as a solvable engineering problem, not a revenue optimization problem.",
      userStory:
        "The frustration is one I heard consistently from friends in the DFW dating scene: years on the major apps, dozens of dates, and a persistent feeling of exhaustion rather than connection. I built MetroPlex Match around that gap — surfacing communication style, life goals, and values instead of just a photo grid.",
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
        result: "Each coach became genuinely expert in its domain — intake conversations go noticeably deeper than a standard questionnaire flow.",
      },
      {
        title: "n8n for workflow orchestration",
        decision: "Use n8n instead of custom serverless functions for all automation workflows.",
        why: "Match recalculation, notification scheduling, and onboarding flows are complex multi-step processes. Writing them as code would have been slow to debug and hard to iterate on. n8n gave me visual pipelines I could modify without redeployment.",
        result: "Built 8 distinct automation workflows in the time it would have taken to write 2 in code — and each can be retimed or restructured in minutes ahead of launch.",
      },
      {
        title: "DFW-only geographic focus",
        decision: "Hard-limit the platform to the Dallas-Fort Worth metro area at launch.",
        why: "A dating app with a thin user pool is useless. By concentrating all growth effort in one metro, the platform can reach critical mass faster and enable real-world meetups.",
        result: "Built, pre-launch: the metro-only design means compatibility filtering can rely on genuine density instead of proximity alone once the platform opens to the DFW market.",
      },
    ],
    results: [
      { value: "6", label: "AI Coaches", description: "Specialized personality frameworks" },
      { value: "16", label: "MBTI Types", description: "Personality dimension inputs" },
      { value: "256", label: "Match Combinations", description: "Compatibility dimension pairings" },
      { value: "8", label: "Automation Workflows", description: "n8n pipelines for matching and notifications" },
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
    gallery: [
      { src: "/projects/trip-buddy/mobile-home.png", caption: "Home", inCard: true },
    ],
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
    gallery: [
      { src: "/projects/follow-this-model/webapp-images/mobile-landing-dark-v1.png", caption: "Landing", inCard: true },
      { src: "/projects/follow-this-model/webapp-images/mobile-browse-dark-v1.png", caption: "Browse", inCard: true },
      { src: "/projects/follow-this-model/webapp-images/mobile-chat1a-dark-v1.png", caption: "Chat", inCard: true },
    ],
    tech: ["React", "TypeScript", "Supabase", "Claude API", "Stripe"],
    stats: [
      { value: "10-Step", label: "Creator Onboarding" },
      { value: "3", label: "Message Types" },
      { value: "Claude", label: "Persona Engine" },
    ],
    hero: {
      headline: "Authentic creator connections at scale: no ghostwriting, no burnout.",
      role: "Solo Developer & Designer",
      timeline: "3 months",
      status: "Built, pre-launch",
    },
    problem: {
      headline: "Creators can't be everywhere at once. Their fans expect them to be.",
      body: "The creator economy has a fundamental scaling problem. As an audience grows, the expectation of personal connection doesn't diminish. It intensifies. But a creator has the same 24 hours as everyone else. The math doesn't work.\n\nThe existing solutions are either low-quality (automated responses that feel robotic and damage the creator-fan relationship) or high-cost (hiring a team of ghostwriters who pretend to be the creator, which is a brand and trust risk).\n\nFor models and content creators specifically, authentic connection is their core product. The moment fans feel like they're talking to an intern instead of the creator they follow, the relationship, and the revenue, evaporates.",
      userStory:
        "The scaling problem is the whole reason the product exists. A creator's audience grows, but their hours don't. I built the platform around that math: an authentic-feeling presence that absorbs the conversational volume a creator can't personally sustain.",
    },
    solution: {
      headline: "An AI persona trained to sound like you: not a chatbot, a presence.",
      body: "FollowThisModel creates AI personas trained directly on the creator's personality: their way of speaking, their humor, their interests, their boundaries. The onboarding process is a 10-step deep-dive that captures enough signal to build a genuinely authentic-feeling presence.\n\nFans pay for access with tokens. Regular chat, voice notes, and exclusive content each cost different amounts, creating a tiered experience that rewards deeper engagement. Creators receive Stripe payouts automatically, with no transaction friction on either side.\n\nClaude is the AI backbone because of its superior instruction-following and persona consistency. A persona built on Claude stays in character more reliably than alternatives, which is the entire point.",
      valueProposition:
        "Your personality, available 24/7, at scale: so you can be everywhere your fans expect you to be without sacrificing the authenticity that made them follow you.",
      imageGroups: [
        {
          layout: "trio",
          caption: "The three pillars: an in-character persona, the token economy, and creator onboarding",
          images: [
            { src: "/projects/follow-this-model/webapp-images/mobile-chat1a-dark-v1.png", alt: "Fan chatting with a creator's AI persona", theme: "dark" },
            { src: "/projects/follow-this-model/webapp-images/mobile-tokens-dark-v1.png", alt: "Token wallet gating access to conversations", theme: "dark" },
            { src: "/projects/follow-this-model/webapp-images/mobile-model-ai-twin-10-steps-dark-v1.png", alt: "Creator's guided ten-step AI twin onboarding", theme: "dark" },
          ],
        },
      ],
    },
    architecture: {
      description:
        "The platform runs on a React frontend with Supabase handling auth, user data, token balances, and conversation storage. Claude API powers all persona conversations with custom system prompts built from the onboarding data. Stripe handles token purchases and creator payouts with webhook integration for real-time balance updates.",
      imageGroups: [
        {
          layout: "pair",
          caption: "The operational backbone: Google auth and the admin dashboard",
          images: [
            { src: "/projects/follow-this-model/webapp-images/mobile-google-login-dark-v1.png", alt: "Passwordless Google sign-in", theme: "dark" },
            { src: "/projects/follow-this-model/webapp-images/mobile-admin-dash-dark-v1.png", alt: "Admin dashboard tracking creators and revenue", theme: "dark" },
          ],
        },
      ],
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
        result:
          "The persona stays in character across long conversations, which is the entire premium the product is built to sell.",
      },
      {
        title: "10-step onboarding instead of a quick form",
        decision: "Make creator onboarding a structured 10-step conversation rather than a profile form.",
        why: "A form captures surface-level data. To build a persona that actually sounds like the creator, we need voice, humor, opinions, boundaries, and conversational patterns, all things that only emerge in conversation.",
        result:
          "The depth of capture is what separates a persona that sounds like the creator from a generic chatbot wearing their name.",
      },
      {
        title: "Token-based payments over subscriptions",
        decision: "Use a token micropayment model instead of monthly subscriptions.",
        why: "Subscriptions work when the value is predictable. Fan engagement with creators is spiky: high around content drops, lower between them. Tokens let fans pay for exactly the value they consume.",
        result:
          "Pay-per-interaction matches how fan engagement actually behaves, spiky around drops and quiet between, without locking fans into subscriptions they would cancel.",
      },
    ],
    results: [
      { value: "10", label: "Onboarding Steps", description: "Structured persona-capture conversation" },
      { value: "3", label: "Message Types", description: "Text chat, voice notes, exclusive content" },
      { value: "Claude", label: "Persona Engine", description: "Chosen over GPT for in-character consistency" },
      { value: "Stripe", label: "Connect Payouts", description: "Automated creator payouts built in" },
    ],
    features: [
      "10-step conversational creator onboarding for deep persona capture",
      "AI personas trained on individual creator personality, voice, and interests",
      "Token micropayment system for fan-to-persona conversations",
      "Multiple message types: text chat, voice notes, exclusive content",
      "Stripe Connect integration for automatic creator payouts",
      "Creator dashboard with conversation analytics and earnings tracking",
      "Fan dashboard with token balance and conversation history",
      "Admin moderation tools for content policy compliance",
    ],
    versions: [
      {
        label: "Fan-side",
        headline: "The Member Experience",
        body: "The front door for members. Landing, discovery, and conversations with creators' AI twins. A token economy gates access so chat remains a deliberate purchase, not a feed.",
        learning: "The token model shapes the product's character by design. Because chat costs something, each message is a deliberate choice rather than idle scrolling. The intent was a higher-quality signal flowing back to creators, not an endless feed.",
        imageGroups: [
          {
            layout: "trio",
            caption: "Landing, browse, discover",
            images: [
              { src: "/projects/follow-this-model/webapp-images/mobile-landing-dark-v1.png", alt: "Landing page, dark mode", theme: "dark" },
              { src: "/projects/follow-this-model/webapp-images/mobile-browse-dark-v1.png", alt: "Browse creators, dark mode", theme: "dark" },
              { src: "/projects/follow-this-model/webapp-images/mobile-discover-dark-v1.png", alt: "Discover page, dark mode", theme: "dark" },
            ],
          },
        ],
      },
      {
        label: "Creator-side",
        headline: "The Creator Studio",
        body: "Creators generate their own AI twin through a guided ten-step onboarding. The twin learns voice, tone, and conversation patterns from material the creator approves. Profiles surface to members through the browse view.",
        learning: "The ten-step onboarding is built so the friction is the feature. The depth of capture is what produces a twin that passes the 'sounds like me' test. A shorter form would be easier to finish and would produce a weaker persona.",
        imageGroups: [
          {
            layout: "pair",
            caption: "Twin generation and the published creator profile",
            images: [
              { src: "/projects/follow-this-model/webapp-images/mobile-generate-ai-twin-persona-dark-v1.png", alt: "Generate AI twin persona, dark mode", theme: "dark" },
              { src: "/projects/follow-this-model/webapp-images/mobile-model-profile1-dark-v1.png", alt: "Creator profile view, dark mode", theme: "dark" },
            ],
          },
        ],
      },
      {
        label: "Admin",
        headline: "Operations",
        body: "Authentication via Google sign-in. An admin dashboard tracks creator approvals, active sessions, and revenue tiers.",
        learning: "The simplest decision with the highest leverage was Google sign-in. Eliminating password friction removed the entire 'forgot my password' support surface before the product launched.",
        imageGroups: [
          {
            layout: "single",
            caption: "Messages inbox",
            images: [
              { src: "/projects/follow-this-model/webapp-images/mobile-messages-dark-v1.png", alt: "Messages inbox, dark mode", theme: "dark" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "push-coach",
    title: "Push Coach",
    description:
      "AI accountability coach that texts you a personalized task every morning and follows up if you don't respond. No app download needed — just SMS.",
    category: "AI Coaching",
    color: "#22D3EE",
    gallery: [
      { src: "/projects/push-coach/mobile-home.png", caption: "Home", inCard: true },
    ],
    tech: ["React", "TypeScript", "Supabase", "Claude API", "Twilio"],
    stats: [
      { value: "SMS", label: "No App Needed" },
      { value: "6", label: "Auto Workflows" },
      { value: "Daily", label: "Task Cadence" },
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
    slug: "aws-infrastructure",
    title: "AWS Infrastructure",
    description:
      "Migrated a production automation server off a cloud subscription onto self-hosted AWS. Provisioned and secured an EC2 instance, containerized n8n with Docker, and cut monthly cost roughly in half.",
    category: "Cloud Infrastructure",
    color: "#FF9900",
    gallery: [
      { src: "/projects/aws/aws-ec2-instance.png", caption: "EC2 t3.micro running, 3/3 status checks passed", inCard: true },
      { src: "/projects/aws/aws-security-group.png", caption: "Inbound rules: SSH locked to my IP, app ports open by design", inCard: false },
      { src: "/projects/aws/aws-docker-ps.png", caption: "n8n container up eight days, port 5678 mapped", inCard: false },
      { src: "/projects/aws/aws-n8n-workflows.png", caption: "Production workflows running on the migrated instance", inCard: false },
    ],
    tech: ["AWS EC2", "Docker", "Ubuntu", "n8n", "IAM"],
    stats: [
      { value: "~50%", label: "Monthly Cost Cut" },
      { value: "30+", label: "Workflows Migrated" },
      { value: "8+ days", label: "Continuous Uptime" },
    ],
    hero: {
      headline: "From a monthly cloud bill to self-hosted AWS infrastructure, secured and running.",
      role: "Solo Infrastructure Build",
      timeline: "Provisioned and migrated, ongoing",
      status: "Live in production",
    },
    problem: {
      headline: "A cloud automation subscription costing more than it should, with no infrastructure to show for it.",
      body: "An automation server ran on a paid cloud subscription. The cost climbed as workflows grew, and the setup taught me nothing about the infrastructure underneath. I wanted hands-on AWS experience toward a Solutions Architect path, and a cheaper, fully owned home for the same workloads. The catch: I had no prior AWS infrastructure experience. Provisioning, networking, security groups, and Linux administration were all new.",
      userStory:
        "Every guide made it look like one click. The reality was IAM users, MFA, CIDR notation, security group rules, and a Linux box I had to secure myself. The learning was the point.",
      imageGroups: [
        {
          layout: "single",
          caption: "The automation workflows that were running on a paid cloud subscription.",
          images: [
            { src: "/projects/aws/aws-n8n-workflows.png", alt: "n8n workflows list running on the migrated instance" },
          ],
        },
      ],
    },
    solution: {
      headline: "A secured EC2 instance running a containerized server, locked down where it counts and open only where it must be.",
      body: "I provisioned an EC2 t3.micro on Ubuntu, created a dedicated IAM user with MFA, and locked the root account away. I designed a security group on the least-privilege principle: SSH restricted to my own IP via /32 CIDR, application ports open only because an external service needs them. n8n runs in Docker with a persistent volume and restart-on-boot, so a reboot never loses state. An Elastic IP gives a stable address for webhooks across stop/start cycles.",
      valueProposition:
        "Least-privilege access where exposure is risk; deliberate openness only where an external caller genuinely requires it.",
      imageGroups: [
        {
          layout: "single",
          caption: "A self-provisioned EC2 instance on Ubuntu, the new home for the stack.",
          images: [
            { src: "/projects/aws/aws-ec2-instance.png", alt: "EC2 t3.micro running, 3/3 status checks passed" },
          ],
        },
      ],
    },
    architecture: {
      description:
        "EC2 t3.micro (us-east-2) on Ubuntu 24.04 LTS, 20GB EBS SSD. A dedicated IAM user with MFA replaces root for daily operations. A custom security group enforces least-privilege inbound rules. n8n runs as a Docker container with a persistent volume and automatic restart-on-boot. An Elastic IP provides static public addressing for stable webhook URLs.",
      techStack: [
        { category: "Compute", items: ["EC2 t3.micro", "Ubuntu 24.04 LTS"] },
        { category: "Security", items: ["IAM + MFA", "Security Groups", "CIDR /32"] },
        { category: "Runtime", items: ["Docker", "n8n"] },
        { category: "Network", items: ["Elastic IP", "EBS persistent volume"] },
      ],
      imageGroups: [
        {
          layout: "single",
          caption: "n8n containerized with Docker, running with a persistent volume.",
          images: [
            { src: "/projects/aws/aws-docker-ps.png", alt: "docker ps showing the n8n container up and port mapped" },
          ],
        },
      ],
    },
    decisions: [
      {
        title: "Least-privilege security group, not open-by-default",
        decision: "Lock SSH to a single /32 IP; open application ports only where an external service requires reach.",
        why: "An open SSH port on a public box is an invitation. The discipline is to open exactly what the system needs and nothing more.",
        result: "SSH reachable only from a known address, with EC2 Instance Connect as a never-locked-out fallback.",
      },
      {
        title: "Containerized with restart-on-boot, not a bare install",
        decision: "Run n8n in Docker with a persistent volume and automatic restart.",
        why: "A bare install dies on reboot and loses state. A container with a mounted volume survives restarts and moves cleanly between hosts.",
        result: "The server self-heals on reboot. Eight-plus days of continuous uptime with zero manual intervention.",
      },
    ],
    results: [
      { value: "~50%", label: "Cost Reduction", description: "From a paid cloud subscription to roughly ten dollars a month" },
      { value: "$0", label: "First-Year Cost", description: "AWS free tier covers twelve months" },
      { value: "30+", label: "Workflows Migrated", description: "Moved from cloud to self-hosted with full feature parity" },
      { value: "8+ days", label: "Continuous Uptime", description: "Auto-restart on boot, persistent Docker volume" },
    ],
    features: [
      "EC2 t3.micro provisioned on Ubuntu 24.04 with a dedicated IAM user and MFA",
      "Least-privilege security group: SSH locked to a /32 IP, app ports open by design",
      "n8n containerized with Docker, persistent volume, and restart-on-boot",
      "Elastic IP for stable webhook URLs across instance stop/start cycles",
      "Workflows migrated from a paid cloud subscription at near-zero cost",
      "Mapped directly to AWS Solutions Architect Associate exam domains",
    ],
    versions: [
      {
        label: "Provisioning and Hardening",
        headline: "Securing the box and proving the container runs.",
        body: "With the instance live, the work was locking it down and confirming the workload. I designed the security group on least-privilege rules, SSH restricted to my own IP. Then I verified the n8n container was running with its port correctly mapped, and confirmed the migrated workflows were live on the new instance.\n\nThese are the three artifacts that prove the build: the inbound rules, the running container, and the workflow load.",
        learning: "Provisioning a server is the easy part. The real work is the security posture and verifying every layer actually does what you think it does.",
        imageGroups: [
          {
            layout: "single",
            caption: "Security group locked to a single IP, part of the hardening pass.",
            images: [
              { src: "/projects/aws/aws-security-group.png", alt: "Security group inbound rules, SSH locked to a single IP" },
            ],
          },
        ],
      },
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
