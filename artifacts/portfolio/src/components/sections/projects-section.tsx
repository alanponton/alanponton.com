import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechPill } from "@/components/ui/tech-pill";
import { ExternalLink, Github } from "lucide-react";

const placeholderProjects = [
  {
    id: 1,
    title: "Project Alpha",
    description: "An AI-powered platform that automates complex workflows and saves teams hours every week.",
    tech: ["React", "TypeScript", "OpenAI", "PostgreSQL"],
    gradient: "from-[#6366F1]/20 to-[#22D3EE]/10",
  },
  {
    id: 2,
    title: "Project Beta",
    description: "Real-time collaboration tool with live cursors, presence indicators, and conflict-free sync.",
    tech: ["Next.js", "WebSockets", "Redis", "Tailwind"],
    gradient: "from-[#F97316]/20 to-[#6366F1]/10",
  },
  {
    id: 3,
    title: "Project Gamma",
    description: "Developer productivity dashboard aggregating metrics from GitHub, Jira, and CI pipelines.",
    tech: ["Node.js", "GraphQL", "React", "Drizzle"],
    gradient: "from-[#22D3EE]/20 to-[#22C55E]/10",
  },
  {
    id: 4,
    title: "Project Delta",
    description: "Generative AI content pipeline with custom fine-tuning and multi-modal output support.",
    tech: ["Python", "FastAPI", "LangChain", "Docker"],
    gradient: "from-[#22C55E]/20 to-[#6366F1]/10",
  },
  {
    id: 5,
    title: "Project Epsilon",
    description: "E-commerce platform with personalized recommendations and real-time inventory management.",
    tech: ["React", "Stripe", "PostgreSQL", "Redis"],
    gradient: "from-[#6366F1]/20 to-[#F97316]/10",
  },
  {
    id: 6,
    title: "Project Zeta",
    description: "Mobile-first fitness tracking app with computer vision form analysis and AI coaching.",
    tech: ["React Native", "TensorFlow", "Node.js", "Expo"],
    gradient: "from-[#22D3EE]/20 to-[#F97316]/10",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <Container>
        <SectionHeading
          title="Featured Work"
          subtitle="A selection of projects I've built — from AI platforms to developer tools."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {placeholderProjects.map((project, i) => (
            <motion.article
              key={project.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="group relative flex flex-col rounded-xl bg-[#141416] border border-[#2A2A2E] overflow-hidden hover:border-[#6366F1]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#6366F1]/5"
            >
              <div className={`h-2 w-full bg-gradient-to-r ${project.gradient}`} />

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading font-semibold text-lg text-[#F5F5F7] group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="text-[#8E8E93] hover:text-[#F5F5F7] p-1 rounded transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={15} />
                    </button>
                    <button
                      className="text-[#8E8E93] hover:text-[#F5F5F7] p-1 rounded transition-colors"
                      aria-label="Live demo"
                    >
                      <ExternalLink size={15} />
                    </button>
                  </div>
                </div>

                <p className="text-[#8E8E93] text-sm leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <TechPill key={t} label={t} />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
