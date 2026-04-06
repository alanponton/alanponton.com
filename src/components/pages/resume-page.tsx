import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, CheckCircle2, Clock, Github } from "lucide-react";
import { Link } from "wouter";
import { Container } from "@/components/ui/container";
import { projects } from "@/data/projects";

// ── Resume-specific one-line project summaries ───────────────────────────────

const resumeSummaries: Record<string, string> = {
  "metroplex-match":
    "AI-powered dating platform with 6 specialized coaches guiding DFW singles to real compatibility. 205+ users.",
  "trip-buddy":
    "AI travel companion that plans the trip, keeps family updated in real-time, and provides a travel agent dashboard.",
  "follow-this-model":
    "Creator economy platform with AI-powered personas trained on real model personalities. Token payments, Stripe payouts.",
  "push-coach":
    "AI accountability coach that texts a personalized task every morning and follows up if you don't respond. No app needed.",
  "2100-security":
    "Operations platform for a 24/7 security team at a 33-floor high-rise. Replaced manual scheduling and modernized comms.",
  "sophia-ai":
    "Voice AI assistant with long-term memory and real-time web awareness. Achieved 94% token cost reduction and 70% latency improvement through systematic optimization.",
};

// ── Animation helper ─────────────────────────────────────────────────────────

function FadeUp({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Section label + rule ─────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="font-mono text-xs uppercase tracking-widest text-[#6366F1] mb-3">
        {children}
      </p>
      <div className="h-px bg-border" />
    </div>
  );
}

// ── Static resume data ───────────────────────────────────────────────────────

const skills = [
  {
    category: "Frontend",
    items: [
      "React", "TypeScript", "Next.js", "Tailwind CSS",
      "Framer Motion", "GSAP", "HTML/CSS", "Responsive Design",
    ],
  },
  {
    category: "Backend & APIs",
    items: [
      "Node.js", "Express", "Supabase", "PostgreSQL",
      "REST APIs", "Edge Functions", "Webhooks", "JSONB",
    ],
  },
  {
    category: "AI & ML",
    items: [
      "OpenAI API", "Claude API", "Prompt Engineering", "AI Agents",
      "RAG", "Vector Search", "AI Coaching Systems", "n8n AI Workflows",
    ],
  },
  {
    category: "Infrastructure",
    items: [
      "Cloudflare Pages", "Supabase Auth & Storage", "DNS Management",
      "CI/CD", "GitHub", "Vercel",
    ],
  },
  {
    category: "Design",
    items: [
      "Figma", "UI/UX Design", "Wireframing", "Prototyping",
      "Design Systems", "Accessibility",
    ],
  },
];

const experience = [
  {
    role: "AI Solutions Engineer",
    company: "Independent",
    period: "2025–Present",
    description:
      "Architecting and shipping AI-powered production platforms end-to-end. Built MetroPlex Match (AI dating platform, 205+ users, 6 AI coaches), Trip Buddy (AI travel companion with real-time family dashboard), Sophia AI (voice assistant with 94% token cost reduction, 70% latency improvement), Push Coach (SMS-based AI accountability coach), and FollowThisModel (creator economy platform with Stripe payouts). 9+ apps shipped, 50+ database tables designed, 15+ AI integrations in production.",
  },
  {
    role: "Security Operations Lead",
    company: "Guard Texas — 2100 Security",
    period: "2019–Present",
    description:
      "Leading security operations for a 24/7 team at a 33-floor high-rise while simultaneously building production software. Developed and deployed 2100Security.com — an AI-powered scheduling and communication platform approved for company-wide use.",
  },
  {
    role: "UX Design Consultant",
    company: "Independent",
    period: "2021–Present",
    description:
      "Managing live client websites with ongoing optimization. Applied user-centered design methodology to AI interface development. Client relationships provided the foundation for AI agent testing and deployment.",
  },
  {
    role: "Network Administrator",
    company: "State of New Jersey",
    period: "2005–2019",
    description:
      "Managed enterprise infrastructure with security clearance for fourteen years. Maintained critical government systems, implemented security protocols, and coordinated technical projects across departments.",
  },
  {
    role: "Application Developer",
    company: "Experian / Direct Tech Marketing",
    period: "1998–2003",
    description:
      "Processed and transformed large-scale client data files for direct marketing campaigns using JCL, SQL, and proprietary tools. Served major clients like Land's End on a 12-person production team — appending, segmenting, and optimizing customer databases.",
  },
];

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
  "IBM AI Engineering Professional Certificate",
  "Microsoft AI-900 Azure AI Fundamentals",
  "AWS Solutions Architect",
  "AWS Machine Learning Specialty",
];

// ── Page ─────────────────────────────────────────────────────────────────────

export function ResumePage() {
  function handleDownload() {
    // TODO: Wire up actual PDF download — link to hosted PDF or trigger generation
    console.log("Download PDF clicked");
  }

  return (
    <main className="min-h-screen pt-24 pb-20">
      <Container>
        <div className="max-w-[860px] mx-auto">

          {/* ── Header ──────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex items-start justify-between gap-6 mb-8"
          >
            {/* Identity */}
            <div>
              <h1 className="font-heading font-bold text-4xl md:text-5xl text-text-primary leading-tight mb-1">
                Alan Ponton
              </h1>
              <p className="font-mono text-sm text-[#6366F1] tracking-wide mb-2">
                AI Solutions Engineer &amp; Full-Stack Developer
              </p>
              <p className="text-text-secondary text-sm mb-3">Dallas–Fort Worth, TX</p>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-text-secondary">
                <a
                  href="mailto:alan@alanponton.com"
                  className="hover:text-[#6366F1] transition-colors duration-200"
                >
                  alan@alanponton.com
                </a>
                <span className="opacity-30 select-none">|</span>
                <a
                  href="https://linkedin.com/in/alan-ponton-375147187/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#6366F1] transition-colors duration-200"
                >
                  linkedin.com/in/alan-ponton-375147187/
                </a>
                <span className="opacity-30 select-none">|</span>
                <a
                  href="/"
                  className="hover:text-[#6366F1] transition-colors duration-200"
                >
                  alanponton.com
                </a>
                <span className="opacity-30 select-none">|</span>
                <a
                  href="https://github.com/alanponton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#6366F1] transition-colors duration-200"
                >
                  <Github size={13} />
                  github.com/alanponton
                </a>
              </div>
            </div>

            {/* Download button */}
            <button
              onClick={handleDownload}
              className="flex-none inline-flex items-center gap-2 h-10 px-5 text-sm font-medium rounded-lg border border-border text-text-primary hover:border-[#6366F1] hover:text-[#6366F1] hover:bg-[#6366F1]/5 transition-all duration-200"
            >
              <Download size={15} />
              Download PDF
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-px bg-border mb-10"
          />

          {/* ── Summary ─────────────────────────────────────────────────── */}
          <FadeUp className="mb-10">
            <SectionLabel>Summary</SectionLabel>
            <p className="text-text-secondary text-base leading-relaxed">
              AI Solutions Engineer with a career spanning enterprise programming, government
              infrastructure, UX design, and security operations. I architect and ship AI-powered
              production platforms — achieving measurable results like 94% cost reduction in AI
              processing and 70% latency improvement through systematic optimization. 9+ applications
              in production, 50+ database tables designed, 15+ AI integrations shipped. I leverage
              AI development tools as a force multiplier to build more, faster, at a higher standard.
            </p>
          </FadeUp>

          {/* ── Technical Skills ─────────────────────────────────────────── */}
          <FadeUp className="mb-10">
            <SectionLabel>Technical Skills</SectionLabel>
            <dl className="flex flex-col gap-2.5">
              {skills.map((skill) => (
                <div key={skill.category} className="flex gap-3 text-sm">
                  <dt className="font-semibold text-text-primary whitespace-nowrap w-[130px] flex-none">
                    {skill.category}:
                  </dt>
                  <dd className="text-text-secondary leading-relaxed">
                    {skill.items.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>

          {/* ── Featured Projects ────────────────────────────────────────── */}
          <FadeUp className="mb-10">
            <SectionLabel>Featured Projects</SectionLabel>
            <div className="flex flex-col gap-4">
              {projects.map((project) => (
                <div key={project.slug}>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="font-semibold text-sm text-text-primary hover:text-[#6366F1] transition-colors duration-200"
                    >
                      {project.title}
                    </Link>
                    <span className="text-text-secondary text-sm">—</span>
                    <span className="text-text-secondary text-sm leading-relaxed">
                      {resumeSummaries[project.slug] ?? project.description}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-text-secondary/60">
                    {project.tech.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* ── Professional Experience ──────────────────────────────────── */}
          <FadeUp className="mb-10">
            <SectionLabel>Professional Experience</SectionLabel>
            <div className="flex flex-col gap-5">
              {experience.map((exp) => (
                <div key={exp.company}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 mb-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-semibold text-sm text-text-primary">{exp.role}</span>
                      <span className="text-text-secondary text-sm">| {exp.company}</span>
                    </div>
                    <span className="font-mono text-xs text-text-secondary">{exp.period}</span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* ── Education & Certifications ───────────────────────────────── */}
          <FadeUp>
            <SectionLabel>Education &amp; Certifications</SectionLabel>
            <div className="flex flex-col gap-2 mb-3">
              {completedCerts.map((cert) => (
                <div key={cert.title} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 size={15} className="text-[#22C55E] flex-none mt-0.5" />
                  <p>
                    <span className="font-medium text-text-primary">{cert.title}</span>
                    <span className="text-text-secondary"> — {cert.issuer}, {cert.year}</span>
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {inProgressCerts.map((cert) => (
                <div key={cert} className="flex items-start gap-2.5 text-sm">
                  <Clock size={15} className="text-[#F97316] flex-none mt-0.5" />
                  <p>
                    <span className="text-text-secondary">{cert}</span>
                    <span className="font-mono text-xs text-text-secondary/50"> — in progress</span>
                  </p>
                </div>
              ))}
            </div>
          </FadeUp>

        </div>
      </Container>
    </main>
  );
}
