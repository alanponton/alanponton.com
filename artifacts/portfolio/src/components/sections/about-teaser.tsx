import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TechPill } from "@/components/ui/tech-pill";
import { ArrowRight } from "lucide-react";

const coreSkills = [
  "React", "TypeScript", "Node.js", "Python", "PostgreSQL",
  "Next.js", "OpenAI", "Docker", "GraphQL", "AWS",
];

export function AboutTeaser() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#141416]">
      <Container variant="narrow">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            title="About Me"
            subtitle="Engineer by training, builder by nature."
          />

          <div className="space-y-4 text-[#8E8E93] text-base leading-relaxed mb-8">
            <p>
              I'm a full-stack developer and AI builder focused on creating software that
              genuinely improves how people work. I care deeply about product thinking,
              clean architecture, and the craft of writing great code.
            </p>
            <p>
              Over the years I've built everything from real-time collaboration tools
              and AI-powered platforms to developer productivity dashboards and
              mobile apps. I thrive at the intersection of design and engineering.
            </p>
          </div>

          <div className="mb-8">
            <p className="text-[#F5F5F7] text-sm font-medium mb-3">Core Skills</p>
            <div className="flex flex-wrap gap-2">
              {coreSkills.map((skill) => (
                <TechPill key={skill} label={skill} />
              ))}
            </div>
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-[#6366F1] font-medium hover:gap-3 transition-all duration-200 group"
          >
            Work with me
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
