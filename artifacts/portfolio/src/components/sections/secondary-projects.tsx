import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechPill } from "@/components/ui/tech-pill";
import { Github } from "lucide-react";

const moreProjects = [
  {
    id: 1,
    title: "CLI Toolkit",
    description: "Developer CLI for scaffolding and automating repetitive project setups.",
    tech: ["Node.js", "CLI", "TypeScript"],
  },
  {
    id: 2,
    title: "Design System",
    description: "Accessible, themeable component library used across multiple products.",
    tech: ["React", "Storybook", "CSS"],
  },
  {
    id: 3,
    title: "Data Pipeline",
    description: "ETL pipeline processing millions of records per day with fault tolerance.",
    tech: ["Python", "Airflow", "BigQuery"],
  },
  {
    id: 4,
    title: "API Gateway",
    description: "Lightweight gateway handling authentication, rate limiting and caching.",
    tech: ["Go", "Redis", "Docker"],
  },
];

export function SecondaryProjects() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          title="More Work"
          subtitle="Open source tools, experiments, and side projects."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {moreProjects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className="group flex flex-col p-5 rounded-xl bg-[#141416] border border-[#2A2A2E] hover:border-[#6366F1]/40 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-heading font-semibold text-[#F5F5F7] group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <Github
                  size={15}
                  className="text-[#2A2A2E] group-hover:text-[#8E8E93] transition-colors mt-0.5 shrink-0"
                />
              </div>
              <p className="text-[#8E8E93] text-sm leading-relaxed mb-4 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <TechPill key={t} label={t} />
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
