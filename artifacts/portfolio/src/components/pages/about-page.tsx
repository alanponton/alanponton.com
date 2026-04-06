import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Camera,
  CheckCircle2,
  Clock,
  Cloud,
  Monitor,
  Palette,
  Server,
  Shield,
} from "lucide-react";
import { Link } from "wouter";
import { Container } from "@/components/ui/container";
import { TechPill } from "@/components/ui/tech-pill";

// ── Shared animation helpers ────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mb-14"
    >
      <p className="font-mono text-xs uppercase tracking-widest text-[#6366F1] mb-3">{label}</p>
      <h2 className="font-heading font-bold text-4xl md:text-5xl text-text-primary leading-tight mb-3">
        {title}
      </h2>
      <div
        className="h-[2px] w-16 mb-4"
        style={{ background: "linear-gradient(to right, #6366F1, #22D3EE)" }}
      />
      <p className="text-text-secondary text-lg max-w-xl">{subtitle}</p>
    </motion.div>
  );
}

// ── Section 1: Hero / Intro ─────────────────────────────────────────────────

function PhotoPlaceholder() {
  return (
    <div className="relative w-full max-w-[320px] mx-auto lg:mx-0 h-[400px] flex-none">
      <div
        className="w-full h-full rounded-2xl border border-border flex flex-col items-center justify-center gap-3 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(34,211,238,0.06) 100%)",
        }}
      >
        <Camera size={36} className="text-text-secondary opacity-40" />
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-secondary opacity-50">
          Photo coming soon
        </p>
      </div>
      {/* Decorative corner accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#6366F1]/40 rounded-tl-lg pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#22D3EE]/40 rounded-br-lg pointer-events-none" />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="pt-28 pb-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 lg:gap-16 items-start">
          {/* Left: photo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            <PhotoPlaceholder />
          </motion.div>

          {/* Right: text */}
          <div className="flex flex-col">
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4"
            >
              About
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
              className="font-heading font-bold text-5xl md:text-6xl text-text-primary leading-none tracking-tight mb-3"
            >
              Alan Ponton
            </motion.h1>

            {/* Title */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="font-mono text-sm text-[#6366F1] tracking-wide mb-8"
            >
              AI Solutions Engineer &amp; Full-Stack Developer
            </motion.p>

            {/* Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.45 }}
              className="space-y-4 mb-8"
            >
              <p className="text-text-secondary text-lg leading-relaxed">
                I've been writing code since 1998 — long before the frameworks, the cloud,
                or the AI tools that define modern development.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                My path took me from programming at Experian to managing enterprise networks for
                the State of New Jersey, through UX design and security operations, and into what
                I do now: architecting AI-powered platforms that solve real problems for real people.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                Every role taught me something the last one couldn't. The result is an engineer
                who thinks in systems, not just code.
              </p>
            </motion.div>

            {/* AI transparency callout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }}
              className="relative pl-5 py-5 pr-6 rounded-r-xl bg-surface"
              style={{ borderLeft: "3px solid #6366F1" }}
            >
              <p className="text-text-secondary text-base leading-relaxed">
                I architect systems, design databases, integrate APIs, and ship production
                software — leveraging AI development tools as a force multiplier. This isn't
                about shortcuts.{" "}
                <span className="text-text-primary font-medium">
                  It's about building more, faster, at a higher standard.
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Section 2: Career Timeline ──────────────────────────────────────────────

const timelineEntries = [
  {
    period: "1998–2003",
    role: "Application Developer",
    org: "Experian / Direct Tech Marketing",
    description:
      "Processed and transformed large-scale client data files for direct marketing campaigns using JCL, SQL, and proprietary tools. Served major clients like Land's End — appending, segmenting, and optimizing customer databases on a 12-person production team.",
  },
  {
    period: "2005–2019",
    role: "Network Administrator",
    org: "State of New Jersey",
    description:
      "Managed enterprise infrastructure with security clearance. Eleven years of keeping critical government systems running and secure.",
  },
  {
    period: "2021–2022",
    role: "UX Design Pivot",
    org: "Google UX Design Certificate",
    description:
      "Stepped back to understand the user side. Completed the full Google UX Design Professional Certificate and shifted how I think about building products.",
  },
  {
    period: "2024",
    role: "Frontend Engineering",
    org: "Meta Frontend Developer Certificate",
    description:
      "Formalized frontend skills. Modern React, TypeScript, component architecture, and production-grade UI development.",
  },
  {
    period: "2025–Present",
    role: "AI Solutions Engineer",
    org: "Independent",
    description:
      "Building AI-powered production platforms — from dating apps with AI coaches to travel companions with real-time dashboards. 9+ apps shipped, 50+ database tables designed, 15+ AI integrations in production.",
  },
];

function TimelineEntry({
  entry,
  index,
  isLast,
}: {
  entry: (typeof timelineEntries)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isCurrent = entry.period.includes("Present");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.55,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.07,
      }}
      className={`relative pl-10 ${isLast ? "pb-0" : "pb-12"}`}
    >
      {/* Dot — centered on the timeline line (line is at left: 5px, dot is w-2.5=10px → -left-0) */}
      <div className="absolute left-0 top-0.5 w-[22px] h-[22px] flex items-center justify-center">
        {/* Pulse ring — only animates when in view */}
        {isInView && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: isCurrent ? "#6366F1" : "#6366F1" }}
            initial={{ scale: 0.6, opacity: 0.6 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: index * 0.07 + 0.3,
            }}
          />
        )}
        {/* Solid dot */}
        <motion.div
          className="w-2.5 h-2.5 rounded-full z-10 relative"
          style={{
            background: isCurrent ? "#6366F1" : "var(--border)",
            boxShadow: isCurrent ? "0 0 0 2px #6366F1" : undefined,
            outline: isCurrent ? undefined : "2px solid #6366F1",
            outlineOffset: "2px",
          }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
            delay: index * 0.07 + 0.15,
          }}
        />
      </div>

      {/* Content */}
      <div>
        {/* Date */}
        <p className="font-mono text-xs text-[#6366F1] tracking-[0.15em] uppercase mb-1">
          {entry.period}
        </p>

        {/* Role + org */}
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-2">
          <h3 className="font-heading font-bold text-xl text-text-primary leading-tight">
            {entry.role}
          </h3>
          <span className="text-text-secondary text-sm font-mono">
            @ {entry.org}
          </span>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-base leading-relaxed max-w-2xl">
          {entry.description}
        </p>
      </div>
    </motion.div>
  );
}

function TimelineSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.3 });

  return (
    <section className="py-24 bg-surface">
      <Container variant="narrow">
        {/* Section heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 32 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-[#6366F1] mb-3">
            Career
          </p>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-text-primary leading-tight mb-3">
            The Journey
          </h2>
          <div
            className="h-[2px] w-16 mb-4"
            style={{ background: "linear-gradient(to right, #6366F1, #22D3EE)" }}
          />
          <p className="text-text-secondary text-lg max-w-xl">
            Three decades of building, breaking, and learning.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute top-2 bottom-0 w-px pointer-events-none"
            style={{
              left: "10px",
              background:
                "linear-gradient(to bottom, #6366F1 0%, rgba(99,102,241,0.4) 60%, transparent 100%)",
            }}
          />

          {/* Entries */}
          <div>
            {timelineEntries.map((entry, i) => (
              <TimelineEntry
                key={`${entry.period}-${entry.role}`}
                entry={entry}
                index={i}
                isLast={i === timelineEntries.length - 1}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Section 3: Skills Bento Grid ────────────────────────────────────────────

const skillCategories = [
  {
    icon: Monitor,
    title: "Frontend",
    techs: [
      "React", "TypeScript", "Next.js", "Tailwind CSS",
      "Framer Motion", "GSAP", "HTML/CSS", "Responsive Design",
    ],
  },
  {
    icon: Server,
    title: "Backend & APIs",
    techs: [
      "Node.js", "Express", "Supabase", "PostgreSQL",
      "REST APIs", "Edge Functions", "Webhooks", "JSONB",
    ],
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    techs: [
      "OpenAI API", "Claude API", "Prompt Engineering", "AI Agents",
      "RAG", "Vector Search", "AI Coaching Systems", "n8n AI Workflows",
    ],
  },
  {
    icon: Cloud,
    title: "Infrastructure",
    techs: [
      "Cloudflare Pages", "Supabase Auth", "Supabase Storage", "DNS Management",
      "CI/CD", "Replit", "GitHub", "Vercel",
    ],
  },
  {
    icon: Palette,
    title: "Design & UX",
    techs: [
      "Figma", "UI/UX Design", "Wireframing", "Prototyping",
      "Design Systems", "Accessibility", "User Research", "Information Architecture",
    ],
  },
  {
    icon: Shield,
    title: "Security & Systems",
    techs: [
      "Network Administration", "Security Clearance Operations",
      "Enterprise Infrastructure", "System Monitoring",
      "Access Control", "Incident Response",
    ],
  },
];

function SkillCard({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) {
  const Icon = category.icon;
  return (
    <FadeUp delay={index * 0.07} className="h-full">
      <div
        className="
          group h-full p-6 rounded-2xl bg-surface border border-border
          shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:shadow-none
          hover:border-[#6366F1]/40
          hover:shadow-[0_6px_24px_rgba(99,102,241,0.10)]
          dark:hover:shadow-[0_6px_24px_rgba(99,102,241,0.12)]
          transition-all duration-300
        "
      >
        {/* Icon + title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-[#6366F1]/10 flex items-center justify-center flex-none">
            <Icon size={18} className="text-[#6366F1]" />
          </div>
          <h3 className="font-heading font-semibold text-base text-text-primary">
            {category.title}
          </h3>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {category.techs.map((t) => (
            <TechPill key={t} label={t} />
          ))}
        </div>
      </div>
    </FadeUp>
  );
}

function SkillsSection() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          label="Skills"
          title="What I Work With"
          subtitle="The tools and technologies behind the projects."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

// ── Section 4: Credentials ──────────────────────────────────────────────────

const completedCerts = [
  {
    title: "Google UX Design Professional Certificate",
    issuer: "Coursera",
    year: "2022",
  },
  {
    title: "Meta Frontend Developer Professional Certificate",
    issuer: "Coursera",
    year: "2024",
  },
];

const inProgressCerts = [
  {
    title: "IBM AI Engineering Professional Certificate",
    issuer: "Coursera",
  },
  {
    title: "Microsoft AI-900 Azure AI Fundamentals",
    issuer: "Microsoft",
  },
  {
    title: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
  },
  {
    title: "AWS Machine Learning Specialty",
    issuer: "Amazon Web Services (via Study Quest)",
  },
];

const professionalExp = [
  {
    role: "Application Developer",
    org: "Experian / Direct Tech Marketing",
    period: "1998–2003",
  },
  {
    role: "Network Administrator",
    org: "State of New Jersey",
    period: "2005–2019 · Security Clearance",
  },
];

function CredentialsSection() {
  return (
    <section className="py-24 bg-surface">
      <Container variant="narrow">
        <SectionHeading
          label="Credentials"
          title="Credentials"
          subtitle="Formal training that complements hands-on building."
        />

        {/* Completed */}
        <FadeUp className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4">
            Completed
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {completedCerts.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.08 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-none"
              >
                <CheckCircle2
                  size={18}
                  className="text-[#22C55E] flex-none mt-0.5"
                />
                <div>
                  <p className="font-medium text-sm text-text-primary leading-snug">
                    {cert.title}
                  </p>
                  <p className="font-mono text-xs text-text-secondary mt-1">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* In Progress */}
        <FadeUp delay={0.1} className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4">
            In Progress
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {inProgressCerts.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.07 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-none"
              >
                <Clock
                  size={18}
                  className="text-[#F97316] flex-none mt-0.5"
                />
                <div>
                  <p className="font-medium text-sm text-text-primary leading-snug">
                    {cert.title}
                  </p>
                  <p className="font-mono text-xs text-text-secondary mt-1">
                    {cert.issuer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Professional Experience */}
        <FadeUp delay={0.15}>
          <div className="pt-8 border-t border-border">
            <p className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4">
              Professional Experience
            </p>
            <div className="flex flex-col gap-3">
              {professionalExp.map((exp, i) => (
                <motion.div
                  key={exp.org}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.08 }}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 border-b border-border last:border-b-0"
                >
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="font-heading font-semibold text-sm text-text-primary">
                      {exp.role}
                    </span>
                    <span className="text-text-secondary text-sm">— {exp.org}</span>
                  </div>
                  <span className="font-mono text-xs text-text-secondary">{exp.period}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}

// ── Section 5: CTA ──────────────────────────────────────────────────────────

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-32">
      <Container>
        <div className="max-w-3xl mx-auto" ref={ref}>
          {/* Animated gradient border */}
          <div className="relative rounded-2xl p-px overflow-hidden">
            <motion.div
              className="absolute w-[300%] h-[300%] -left-full -top-full"
              style={{
                background:
                  "conic-gradient(from 0deg at 50% 50%, transparent 0deg, #6366F1 60deg, #22D3EE 180deg, #A855F7 270deg, #6366F1 300deg, transparent 360deg)",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner content surface */}
            <div className="relative rounded-[calc(1rem-1px)] bg-background p-12 md:p-16 text-center">
              {/* Subtle top glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #6366F1, #22D3EE, transparent)",
                }}
              />

              <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-5">
                <motion.span
                  className="block text-text-primary"
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  Let's build something
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-[#6366F1] via-[#818cf8] to-[#22D3EE] bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
                >
                  together.
                </motion.span>
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-text-secondary text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto"
              >
                Whether you're hiring, collaborating, or have a project in mind — I'd love to
                hear from you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 h-12 px-7 text-base font-medium rounded-lg bg-[#6366F1] text-white hover:bg-[#818cf8] transition-all duration-200 shadow-lg shadow-[#6366F1]/20 hover:shadow-[#6366F1]/40 hover:scale-[1.02] group"
                >
                  Get In Touch
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  to="/work-with-me"
                  className="inline-flex items-center gap-2 h-12 px-7 text-base font-medium rounded-lg border border-border text-text-primary hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-200 hover:scale-[1.02]"
                >
                  Work With Me
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

export function AboutPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TimelineSection />
      <SkillsSection />
      <CredentialsSection />
      <CTASection />
    </main>
  );
}
