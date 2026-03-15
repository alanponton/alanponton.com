import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { ArrowDown } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export function HeroSection() {
  function scrollToProjects() {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden pt-16"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.12) 0%, transparent 70%)",
        }}
      />

      <Container className="py-24 md:py-32">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-mono text-[#6366F1] text-sm mb-4 tracking-widest uppercase"
        >
          Full-Stack Developer & AI Builder
        </motion.p>

        <motion.h1
          custom={0.12}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="font-heading text-6xl sm:text-7xl md:text-8xl font-bold text-[#F5F5F7] leading-[0.95] tracking-tight mb-6"
        >
          ALAN
          <br />
          <span className="bg-gradient-to-r from-[#6366F1] via-[#22D3EE] to-[#6366F1] bg-clip-text text-transparent">
            PONTON
          </span>
        </motion.h1>

        <motion.p
          custom={0.24}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-[#8E8E93] text-lg md:text-xl max-w-xl leading-relaxed mb-10"
        >
          I build AI-powered platforms that solve real problems for real people.
          Focused on product, performance, and craft.
        </motion.p>

        <motion.div
          custom={0.36}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4"
        >
          <button
            onClick={scrollToProjects}
            className="inline-flex items-center gap-2 h-12 px-7 text-base font-medium rounded-lg bg-[#6366F1] text-white hover:bg-[#818cf8] transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#6366F1]/20"
          >
            View My Work
          </button>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 h-12 px-7 text-base font-medium rounded-lg bg-transparent border border-[#2A2A2E] text-[#F5F5F7] hover:bg-[#1C1C1F] hover:border-[#6366F1]/50 transition-all duration-200 active:scale-[0.97]"
          >
            Get In Touch
          </a>
        </motion.div>
      </Container>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={scrollToProjects}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8E8E93] hover:text-[#F5F5F7] transition-colors group"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  );
}
