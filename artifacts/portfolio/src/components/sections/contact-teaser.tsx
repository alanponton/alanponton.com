import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Mail, ArrowRight } from "lucide-react";

export function ContactTeaser() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-[#141416]">
      <Container variant="narrow">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/20 mb-6">
            <Mail size={20} className="text-[#6366F1]" />
          </div>

          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F5F7] mb-4">
            Let's build something{" "}
            <span className="bg-gradient-to-r from-[#6366F1] via-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent">
              together.
            </span>
          </h2>

          <p className="text-[#8E8E93] text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Have a project in mind, an opportunity to discuss, or just want to
            connect? My inbox is always open.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:alan@example.com"
              className="inline-flex items-center gap-2 h-12 px-7 text-base font-medium rounded-lg bg-[#6366F1] text-white hover:bg-[#818cf8] transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#6366F1]/20 group"
            >
              Say Hello
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-7 text-base font-medium rounded-lg border border-[#2A2A2E] text-[#F5F5F7] hover:bg-[#1C1C1F] hover:border-[#6366F1]/50 transition-all duration-200 active:scale-[0.97]"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
