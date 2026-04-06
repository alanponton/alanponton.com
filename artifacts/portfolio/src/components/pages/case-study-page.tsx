import { useEffect, useRef, useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TechPill } from "@/components/ui/tech-pill";
import { CountUpStat } from "@/components/ui/count-up-stat";
import { projects } from "@/data/projects";

// ── Shared primitives ──────────────────────────────────────────────────────────

function SectionLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <p
      className="font-mono text-xs uppercase tracking-[0.25em] font-medium mb-4"
      style={{ color }}
    >
      {children}
    </p>
  );
}

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
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function BodyParagraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((para, i) => (
        <p key={i} className="text-text-secondary text-lg leading-relaxed mb-5 last:mb-0">
          {para}
        </p>
      ))}
    </>
  );
}

// ── Section 1: Hero ────────────────────────────────────────────────────────────

function CaseStudyHero({ project }: { project: (typeof projects)[0] }) {
  return (
    <section
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${project.color}0d 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 40% 40% at 20% 70%, ${project.color}06 0%, transparent 60%)`,
        }}
      />

      <Container className="relative z-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm transition-colors group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            All Projects
          </Link>
        </motion.div>

        {/* Category */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-mono text-xs uppercase tracking-[0.25em] font-medium mb-5"
          style={{ color: project.color }}
        >
          {project.category}
        </motion.p>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.18 }}
          className="font-heading font-bold text-5xl md:text-7xl text-text-primary leading-none tracking-tight mb-5"
        >
          {project.title}
        </motion.h1>

        {/* Headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.28 }}
          className="text-text-secondary text-xl md:text-2xl max-w-3xl leading-relaxed mb-8"
        >
          {project.hero.headline}
        </motion.p>

        {/* Info pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {[
            { label: "Role", value: project.hero.role },
            { label: "Timeline", value: project.hero.timeline },
            { label: "Status", value: project.hero.status },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-surface border border-border"
            >
              <span className="text-text-secondary">{label}</span>
              <span className="text-text-primary font-medium">{value}</span>
            </div>
          ))}
        </motion.div>

        {/* Tech pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.46 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {project.tech.map((t) => (
            <TechPill key={t} label={t} />
          ))}
        </motion.div>

        {/* CTA buttons */}
        {(project.hero.liveUrl || project.hero.githubUrl) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.54 }}
            className="flex flex-wrap gap-3"
          >
            {project.hero.liveUrl && (
              <a
                href={project.hero.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02]"
                style={{
                  background: project.color,
                  boxShadow: `0 4px 20px ${project.color}40`,
                }}
              >
                Live Site
                <ExternalLink size={13} />
              </a>
            )}
            {project.hero.githubUrl && (
              <a
                href={project.hero.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-text-primary border border-border hover:border-[#6366F1] transition-all duration-200 hover:scale-[1.02]"
              >
                View Source
                <Github size={13} />
              </a>
            )}
          </motion.div>
        )}
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-text-secondary text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="text-text-secondary"
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ── Section 2: Problem ─────────────────────────────────────────────────────────

function ProblemSection({ project }: { project: (typeof projects)[0] }) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <SectionLabel color={project.color}>The Problem</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary leading-tight mb-8">
              {project.problem.headline}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <BodyParagraphs text={project.problem.body} />
          </FadeUp>
          {project.problem.userStory && (
            <FadeUp delay={0.2} className="mt-8">
              <blockquote
                className="p-6 rounded-xl bg-surface italic text-text-secondary text-lg leading-relaxed"
                style={{ borderLeft: `3px solid ${project.color}` }}
              >
                "{project.problem.userStory}"
              </blockquote>
            </FadeUp>
          )}
        </div>
      </Container>
    </section>
  );
}

// ── Section 3: Solution ────────────────────────────────────────────────────────

function SolutionSection({ project }: { project: (typeof projects)[0] }) {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <Container>
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <SectionLabel color={project.color}>The Solution</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary leading-tight mb-8">
              {project.solution.headline}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <BodyParagraphs text={project.solution.body} />
          </FadeUp>
          <FadeUp delay={0.2} className="mt-12">
            <div
              className="relative px-8 py-10 rounded-2xl text-center"
              style={{
                background: `linear-gradient(135deg, ${project.color}0a 0%, transparent 60%)`,
                border: `1px solid ${project.color}30`,
              }}
            >
              <div
                className="absolute -top-px left-1/2 -translate-x-1/2 w-32 h-px"
                style={{
                  background: `linear-gradient(to right, transparent, ${project.color}, transparent)`,
                }}
              />
              <p
                className="font-heading font-bold text-2xl md:text-3xl leading-snug"
                style={{ color: project.color }}
              >
                "{project.solution.valueProposition}"
              </p>
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}

// ── Section 4: Architecture ────────────────────────────────────────────────────

function ArchitectureSection({ project }: { project: (typeof projects)[0] }) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <SectionLabel color={project.color}>Architecture</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary leading-tight mb-6">
              How it's built
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-12 max-w-3xl">
              {project.architecture.description}
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.architecture.techStack.map((group, i) => (
              <FadeUp key={group.category} delay={i * 0.07}>
                <div className="p-5 rounded-xl bg-surface border border-border h-full shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-none">
                  <p
                    className="text-xs uppercase tracking-[0.18em] font-medium font-mono mb-3"
                    style={{ color: project.color }}
                  >
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <TechPill key={item} label={item} />
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Section 5: Key Decisions ───────────────────────────────────────────────────

function DecisionsSection({ project }: { project: (typeof projects)[0] }) {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <Container>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-12">
            <SectionLabel color={project.color}>Key Decisions</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary leading-tight">
              The choices that shaped it
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {project.decisions.map((d, i) => (
              <FadeUp key={d.title} delay={i * 0.1}>
                <div className="p-6 rounded-xl bg-background border border-border h-full flex flex-col gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-none">
                  <h3 className="font-heading font-bold text-xl text-text-primary">{d.title}</h3>
                  <div className="flex flex-col gap-3 flex-1">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-text-secondary font-mono">Decision</span>
                      <p className="text-text-primary text-sm leading-relaxed mt-1">{d.decision}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-text-secondary font-mono">Why</span>
                      <p className="text-text-secondary text-sm leading-relaxed mt-1">{d.why}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest font-mono" style={{ color: project.color }}>
                        Result
                      </span>
                      <p className="text-sm leading-relaxed mt-1" style={{ color: project.color }}>
                        {d.result}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Section 6: Results ─────────────────────────────────────────────────────────

function ResultsSection({ project }: { project: (typeof projects)[0] }) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="max-w-5xl mx-auto">
          <FadeUp className="mb-12">
            <SectionLabel color={project.color}>Results</SectionLabel>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary leading-tight">
              Impact by the numbers
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {project.results.map((result, i) => (
              <FadeUp key={result.label} delay={i * 0.08}>
                <div
                  className="p-6 rounded-xl bg-surface border border-border flex flex-col gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-none"
                  style={{ borderTopColor: project.color, borderTopWidth: 2 }}
                >
                  <CountUpStat
                    value={result.value}
                    color={project.color}
                    className="text-4xl font-bold font-heading"
                  />
                  <p className="text-text-primary font-medium text-sm">{result.label}</p>
                  {result.description && (
                    <p className="text-text-secondary text-xs leading-relaxed">{result.description}</p>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Section 7: Features Deep Dive ─────────────────────────────────────────────

function FeaturesSection({ project }: { project: (typeof projects)[0] }) {
  const [expanded, setExpanded] = useState(false);
  if (!project.features?.length) return null;

  return (
    <section className="py-16 bg-surface">
      <Container>
        <div className="max-w-4xl mx-auto">
          <FadeUp>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="w-full flex items-center justify-between p-5 rounded-xl border border-border text-left hover:border-[#6366F1]/50 transition-colors group"
            >
              <span className="font-heading font-semibold text-lg text-text-primary">
                See All Features
              </span>
              <span className="text-text-secondary group-hover:text-text-primary transition-colors">
                {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </button>
          </FadeUp>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2">
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-3 p-4 rounded-lg bg-background border border-border text-sm text-text-secondary"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-none"
                        style={{ background: project.color }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}

// ── Section 8: Project Navigation ─────────────────────────────────────────────

function ProjectNav({ currentSlug }: { currentSlug: string }) {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const prev = projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <section className="border-t border-border py-8">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Back to all */}
          <div className="text-center mb-8">
            <Link
              href="/#projects"
              className="text-sm text-text-secondary hover:text-[#6366F1] transition-colors"
            >
              ← Back to All Projects
            </Link>
          </div>

          {/* Prev / Next */}
          <div className="grid grid-cols-2 gap-4">
            <Link href={`/projects/${prev.slug}`} className="group block">
              <div className="p-4 rounded-xl border border-border hover:border-border/80 transition-all hover:bg-surface">
                <p className="text-xs text-text-secondary uppercase tracking-widest mb-2 font-mono">
                  ← Previous
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full flex-none"
                    style={{ background: prev.color }}
                  />
                  <p className="font-heading font-semibold text-text-primary text-sm group-hover:text-text-primary transition-colors line-clamp-1">
                    {prev.title}
                  </p>
                </div>
              </div>
            </Link>

            <Link href={`/projects/${next.slug}`} className="group block text-right">
              <div className="p-4 rounded-xl border border-border hover:border-border/80 transition-all hover:bg-surface">
                <p className="text-xs text-text-secondary uppercase tracking-widest mb-2 font-mono">
                  Next →
                </p>
                <div className="flex items-center justify-end gap-2">
                  <p className="font-heading font-semibold text-text-primary text-sm group-hover:text-text-primary transition-colors line-clamp-1">
                    {next.title}
                  </p>
                  <div
                    className="w-2 h-2 rounded-full flex-none"
                    style={{ background: next.color }}
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function CaseStudyPage() {
  const params = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();
  const project = projects.find((p) => p.slug === params.slug);

  useEffect(() => {
    if (!project) setLocation("/");
  }, [project]);

  if (!project) return null;

  return (
    <main>
      <CaseStudyHero project={project} />
      <ProblemSection project={project} />
      <SolutionSection project={project} />
      <ArchitectureSection project={project} />
      <DecisionsSection project={project} />
      <ResultsSection project={project} />
      <FeaturesSection project={project} />
      <ProjectNav currentSlug={project.slug} />
    </main>
  );
}
