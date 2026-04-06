import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";

const ALAN = "ALAN".split("");
const PONTON = "PONTON".split("");

const particles = [
  { left: "8%",  top: "18%", size: 4, dx: 14,  dy: -18, dur: 8  },
  { left: "82%", top: "12%", size: 3, dx: -9,  dy:  22, dur: 11 },
  { left: "22%", top: "72%", size: 5, dx: 18,  dy: -13, dur: 13 },
  { left: "68%", top: "58%", size: 3, dx: -12, dy: -18, dur: 9  },
  { left: "48%", top: "28%", size: 4, dx:  9,  dy:  14, dur: 10 },
  { left: "14%", top: "48%", size: 3, dx: 22,  dy:   8, dur: 14 },
  { left: "88%", top: "68%", size: 5, dx: -18, dy:  -9, dur: 7  },
  { left: "38%", top: "82%", size: 3, dx:  -9, dy: -22, dur: 12 },
  { left: "58%", top: "8%",  size: 4, dx: 13,  dy:  18, dur: 9  },
  { left: "28%", top: "38%", size: 3, dx: -13, dy:  12, dur: 11 },
];

function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setOffset({ x, y });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={ref}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </motion.div>
  );
}

const letterVariants = {
  hidden: { opacity: 0, y: 80, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: i },
  }),
};

export function HeroSection() {
  const [, navigate] = useLocation();

  function scrollToProjects() {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Breathing gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,102,241,0.14) 0%, transparent 70%)",
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(34,211,238,0.09) 0%, transparent 65%)",
          }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: i % 3 === 0 ? "#22D3EE" : "#6366F1",
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.08,
            x: [0, p.dx, p.dx / 2, -p.dx / 3, 0],
            y: [0, p.dy, p.dy / 3, p.dy * 0.7, 0],
          }}
          transition={{
            opacity: { duration: 1.2, delay: i * 0.18 },
            x: { duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
            y: { duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
          }}
        />
      ))}

      <Container className="py-32 flex flex-col items-center text-center relative z-10">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
          className="font-mono text-text-secondary text-xs sm:text-sm tracking-[0.25em] uppercase mb-8 max-w-[280px] sm:max-w-none mx-auto"
        >
          AI Solutions Engineer &amp; Full-Stack Developer
        </motion.p>

        {/* Heading */}
        <div className="font-heading font-bold leading-none tracking-tighter overflow-hidden">
          {/* ALAN */}
          <div className="flex justify-center text-text-primary text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem]">
            {ALAN.map((letter, i) => (
              <motion.span
                key={i}
                custom={0.15 + i * 0.05}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* PONTON */}
          <div className="flex justify-center text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem]">
            {PONTON.map((letter, i) => (
              <motion.span
                key={i}
                custom={0.38 + i * 0.05}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="bg-gradient-to-r from-[#6366F1] via-[#818cf8] to-[#22D3EE] bg-clip-text text-transparent"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="text-text-secondary text-lg md:text-xl max-w-[320px] md:max-w-xl mx-auto leading-relaxed mt-8"
        >
          I build AI-powered platforms that solve real problems for real people.
          <br />
          <span className="text-text-secondary">Focused on product, performance, and craft.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="flex flex-wrap gap-4 justify-center mt-8"
        >
          <MagneticButton
            className="inline-flex items-center gap-2 px-8 py-3 text-base font-medium rounded-lg bg-[#6366F1] text-white hover:bg-[#818cf8] transition-all duration-200 shadow-lg shadow-[#6366F1]/40 hover:shadow-[#6366F1]/60 hover:scale-[1.02]"
            onClick={scrollToProjects}
          >
            View My Work
          </MagneticButton>
          <MagneticButton
            className="inline-flex items-center gap-2 px-8 py-3 text-base font-medium rounded-lg bg-transparent border border-border text-text-primary hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-200 hover:scale-[1.02]"
            onClick={() => navigate("/contact")}
          >
            Get In Touch
          </MagneticButton>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-text-secondary text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="text-text-secondary"
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
