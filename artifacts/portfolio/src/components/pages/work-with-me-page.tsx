import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Zap, Layout, Bot, TrendingUp, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

// TODO: Set showTestimonials to true and replace placeholder content when testimonials are collected
const showTestimonials = false;

// ── Animation helper ─────────────────────────────────────────────────────────

function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Section 1: Hero ──────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-32 md:py-40 bg-background text-center" ref={ref}>
      <Container variant="narrow">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-5"
        >
          Work With Me
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight mb-6"
        >
          I build smart tools that make your business run better.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
          className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          You don't need to understand the technology — you just need it to work. I build custom
          apps, automations, and AI-powered tools tailored to how your business actually operates.
          You tell me the problem. I build the solution.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.42 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 h-12 px-8 text-base font-medium rounded-lg bg-[#6366F1] text-white hover:bg-[#818cf8] transition-all duration-200 shadow-lg shadow-[#6366F1]/20 hover:shadow-[#6366F1]/40 hover:scale-[1.02] group"
          >
            Start a Conversation
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

// ── Section 2: What I Can Help With ─────────────────────────────────────────

const services = [
  {
    Icon: Zap,
    title: "Automate the busywork",
    description:
      "If your team is doing the same task over and over, I can build a system that handles it automatically. Scheduling, notifications, data entry, follow-ups — the repetitive stuff disappears.",
  },
  {
    Icon: Layout,
    title: "A custom app for your team",
    description:
      "Need a tool that does exactly what your business needs and nothing it doesn't? I build clean, simple apps your team will actually use — no bloated software, no learning curve.",
  },
  {
    Icon: Bot,
    title: "AI that works for you",
    description:
      "An AI assistant that knows your business, answers your customers, or coaches your team. Not a gimmick — a real tool that saves time and makes people's jobs easier.",
  },
  {
    Icon: TrendingUp,
    title: "A platform your customers love",
    description:
      "Whether it's a client portal, a booking system, or a community platform — I build the kind of experience that makes people want to come back.",
  },
];

function ServicesSection() {
  return (
    <section className="py-24 bg-surface">
      <Container>
        <FadeUp className="mb-12 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-text-primary">
            What I can help with
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map(({ Icon, title, description }, i) => (
            <FadeUp key={title} delay={i * 0.1}>
              <div className="h-full bg-surface border border-border rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-[#6366F1]/40 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-[#6366F1]/10 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-[#6366F1]" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
                  {title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ── Section 3: How It Works ──────────────────────────────────────────────────

const steps = [
  {
    number: "1",
    title: "We talk",
    body: "You tell me what's not working, what you wish you had, or what's eating up your team's time. No jargon, no pressure.",
  },
  {
    number: "2",
    title: "I build",
    body: "I design and build your solution — keeping you in the loop with real progress, not vague updates. You'll see it take shape.",
  },
  {
    number: "3",
    title: "You launch",
    body: "Your tool goes live. I make sure everything works, your team is comfortable, and you know how to get the most out of it.",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-24 bg-background">
      <Container>
        <FadeUp className="mb-14 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-text-primary">
            How it works
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {steps.map(({ number, title, body }, i) => (
            <FadeUp key={number} delay={i * 0.12}>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="font-heading font-bold text-7xl text-[#6366F1] leading-none mb-4 select-none opacity-90">
                  {number}
                </span>
                <h3 className="font-heading font-semibold text-xl text-text-primary mb-3">
                  {title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ── Section 4: Results That Speak ────────────────────────────────────────────

const results = [
  {
    title: "A matchmaking platform with 205+ users",
    description:
      "Built an AI-powered dating platform for the Dallas–Fort Worth area with 6 specialized coaching features that guide singles to real compatibility. Grew to over 205 active users.",
  },
  {
    title: "A security team's manual process — automated",
    description:
      "A 24/7 security team at a 33-floor high-rise was running on paper schedules and group texts. Built them a custom operations platform. Now approved for company-wide use.",
  },
  {
    title: "A personal AI coach that texts you every morning",
    description:
      "Built an AI accountability coach that sends a personalized task every morning and follows up if you don't respond. No app to download — it works through text messages.",
  },
];

function ResultsSection() {
  return (
    <section className="py-24 bg-surface">
      <Container>
        <FadeUp className="mb-3 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-text-primary">
            Results that speak
          </h2>
        </FadeUp>
        <FadeUp delay={0.1} className="mb-12 text-center">
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            A few things I've built for real people and real businesses.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {results.map(({ title, description }, i) => (
            <FadeUp key={title} delay={i * 0.1}>
              <div className="h-full bg-surface border border-border rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-[#6366F1]/40 transition-all duration-300">
                <h3 className="font-heading font-semibold text-base text-text-primary mb-3 leading-snug">
                  {title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ── Section 5: Testimonials (Hidden) ─────────────────────────────────────────

const testimonials = [
  { quote: "Testimonial coming soon.", name: "First Last", role: "Role, Company" },
  { quote: "Testimonial coming soon.", name: "First Last", role: "Role, Company" },
  { quote: "Testimonial coming soon.", name: "First Last", role: "Role, Company" },
];

function TestimonialsSection() {
  return (
    <section className="py-24 bg-background">
      <Container>
        <FadeUp className="mb-12 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-text-primary">
            What clients say
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map(({ quote, name, role }, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="h-full bg-surface border border-border rounded-2xl p-8 shadow-sm">
                <p className="text-text-secondary text-sm leading-relaxed italic mb-6">
                  "{quote}"
                </p>
                <div>
                  <p className="font-semibold text-sm text-text-primary">{name}</p>
                  <p className="text-text-secondary text-xs">{role}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ── Section 6: CTA ───────────────────────────────────────────────────────────

function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-24 bg-surface">
      <Container>
        <div className="max-w-3xl mx-auto" ref={ref}>
          {/* Animated gradient border — same pattern as homepage contact CTA */}
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

            <div className="relative rounded-[calc(1rem-1px)] bg-surface p-12 md:p-16 text-center">
              {/* Subtle top glow bar */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #6366F1, #22D3EE, transparent)",
                }}
              />

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-heading font-bold text-4xl md:text-5xl text-text-primary leading-tight mb-5"
              >
                Let's build something that works.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-text-secondary text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto"
              >
                Tell me what you're working on. Even if you're not sure what you need yet — that's
                fine. Let's figure it out together.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 h-12 px-7 text-base font-medium rounded-lg bg-[#6366F1] text-white hover:bg-[#818cf8] transition-all duration-200 shadow-lg shadow-[#6366F1]/20 hover:shadow-[#6366F1]/40 hover:scale-[1.02] group"
                >
                  Start a Conversation
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export function WorkWithMePage() {
  return (
    <main className="min-h-screen pt-16">
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <ResultsSection />
      {/* TODO: Set showTestimonials to true and replace placeholder content when testimonials are collected */}
      {showTestimonials && <TestimonialsSection />}
      <CTASection />
    </main>
  );
}
