import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { TechPill } from "@/components/ui/tech-pill";
import { ExternalLink } from "lucide-react";

const secondaryProjects = [
  {
    title: "AWS Study Quest",
    description: "Turned the 200-hour certification grind into a game with XP, achievements, and streaks.",
    tech: ["React", "Supabase", "Cloudflare Pages"],
    url: "learn.alanponton.com",
  },
  {
    title: "Lonnie's Locations",
    description: "Complete digital platform for a travel agency — website, trip planner, admin CRM — all under $3/month.",
    tech: ["React", "Supabase", "n8n", "Cloudflare"],
    url: "lonnieslocations.com",
  },
  {
    title: "Xoe Designs",
    description: "Website redesign for a web design agency. Full UX process from research to prototype.",
    tech: ["UX Design", "Wireframing", "Prototyping"],
    url: null,
  },
  {
    title: "Gymwork Training",
    description: "Brand identity and website for a youth basketball nonprofit promoting sportsmanship.",
    tech: ["UX Design", "Research", "Usability Testing"],
    url: null,
  },
];

export function SecondaryProjects() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.3 });

  return (
    <section className="py-20">
      <Container>
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center gap-6 mb-10"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary whitespace-nowrap">
            More Work
          </h2>
          <div
            className="flex-1 h-px max-w-xs"
            style={{ background: "linear-gradient(to right, #6366F1, transparent)" }}
          />
        </motion.div>

        {/* Horizontal scroll container */}
        <div className="relative">
          {/* Left fade edge */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, var(--background), transparent)" }}
          />
          {/* Right fade edge */}
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, var(--background), transparent)" }}
          />

          {/* Cards row */}
          <div
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
          >
            {secondaryProjects.map((project, i) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                className="group flex-none w-[300px] snap-start flex flex-col p-6 rounded-xl bg-surface border border-border hover:border-[#6366F1]/50 cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:shadow-none"
                style={{ transition: "all 0.3s ease-out" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-heading font-semibold text-lg text-text-primary group-hover:text-text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.url && (
                    <a
                      href={`https://${project.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-[#6366F1] transition-colors ml-2 flex-none mt-0.5"
                      aria-label={`Visit ${project.title}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                {project.url && (
                  <a
                    href={`https://${project.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6366F1] text-xs font-mono mb-2 truncate hover:underline block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.url}
                  </a>
                )}

                <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <TechPill key={t} label={t} />
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
