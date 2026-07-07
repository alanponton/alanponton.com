# Five Questions — Interview Prep
Alan Ponton · Session 10

---

## Q1 — AI-Augmented Development (~50 words)

The ideas and product decisions are mine. I architect, design, debug, and ship. AI is my force multiplier. My Network Admin years made picking up Supabase, Cloudflare, and Figma fast. AI helped me cross from infrastructure into the creative side I'd always wanted.

---

## Q2 — "Only Five Officers" Reframe (2100 Security) (~50 words)

Five officers in nightly production beats fifty in a mockup. Management loves it, guards love it, and a guard at another location asked for his own version. Third shift is the only one with low enough traffic to automate — that's why it's the right scope, not a small one.

---

## Q3 — Walk Me Through a Project (Lonnie's Locations, ~4 min)

**Context (30 sec)**
Lonnie's Locations is a productized group-travel platform I designed and built for an independent travel advisor in Dallas. She runs a thriving business serving 30-plus-person group trips, but had zero digital infrastructure. Every booking, every passport question, every itinerary update happened over email or phone, four times a week per guest.

**The interesting design problem (60-90 sec)**
The interesting design problem wasn't the booking flow. It was a trust defect I caught mid-build. I'd designed a human-escalation banner that said "A team member will follow up with you" — but the system had no mechanism to actually trigger that follow-up. The banner was making a promise the platform couldn't keep. That's the kind of UX bug that doesn't show up in usability testing because it works technically. It just quietly erodes trust over time.

**What I did (90-120 sec)**
I designed the closed loop. The escalation now writes to a real-time admin dashboard with color-coded urgency, full transcript context, and proactive contact capture if the guest hasn't given an email yet. The advisor sees every escalation the moment it fires, with everything she needs to respond. The banner now tells the truth.

**What it taught me (30 sec)**
Trust integrity is a design problem, not an engineering one. The most dangerous UX failures aren't the ones users complain about. They're the ones where the interface promises something the system doesn't deliver, and users quietly stop trusting you. I now treat every promise the UI makes as a contract that has to be backed by real infrastructure.

---

## Q4 — Hardest Design Decision Reversed (~2 min)

Early in the Lonnie's Locations build, I made a designer-imposition mistake I had to catch and reverse on myself.

Lonnie runs group cruises and multi-country tours, and I came in with strong opinions about how a "premium" travel platform should feel. I'd designed an aspirational itinerary view — sophisticated, editorial, the kind of layout you'd see in a high-end travel magazine. I was proud of it.

The problem: it didn't match the trips she actually books. Her real itineraries are practical, family-oriented, with specific dietary notes and accessibility needs woven throughout. The "premium magazine" design I'd built was beautiful for trips she doesn't run.

The reversal: I tore down the aspirational layout and rebuilt the itinerary around her actual content patterns. Same accessibility-first aesthetic, but the structure now matches the trips she sells, not the trips I assumed a premium advisor should sell.

What it taught me: the most dangerous design failure isn't the one that tests badly. It's the one where you've designed for who you assume the user should be, instead of who they actually are. That became a governing principle for the rest of the build, and I now look for it on every project.

---

## Q5 — Why UX After Network Admin (~90 sec)

I spent fourteen years in IT for the State of New Jersey, finishing as an IT Specialist 3 doing network administration, and before that I was an Application Developer at Experian. I've always built things. The honest answer is that infrastructure work taught me what good systems look like, but it never let me design the part users actually touch.

The pivot started during the pandemic. I had time and I had questions I couldn't answer from the back end. Why do some interfaces feel calm and trustworthy and others feel chaotic, even when the underlying systems are identical? That's a design question, not an engineering one.

I got the Google UX Design certificate, then Meta Front-End, then started designing and shipping real products. What I found is that my infrastructure background isn't a detour from UX — it's an unfair advantage. I think about accessibility, performance, security, and data architecture as design decisions, because they shape what users actually experience. Most designers can't talk to a database. I can, and that makes me faster, more honest, and more useful to the engineering team.

So the short answer: I didn't leave network admin. I added design to it. The combination is the work I'm doing now.

---
