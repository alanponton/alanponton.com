import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/context/theme-context";

const stats = [
  { value: 9,  suffix: "+", label: "Production Apps"         },
  { value: 50, suffix: "+", label: "Database Tables Designed" },
  { value: 15, suffix: "+", label: "AI Integrations"          },
  { value: 1,  suffix: "",  label: "Developer"                },
];

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const steps = 28;
    const duration = 1000;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function StatsCard() {
  const { theme } = useTheme();
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 10;
    setRotate({ x, y });
  }

  function handleMouseLeave() {
    setRotate({ x: 0, y: 0 });
  }

  const cardStyle =
    theme === "dark"
      ? {
          background: "linear-gradient(135deg, #141416 0%, #1C1C1F 100%)",
          border: "1px solid rgba(99,102,241,0.3)",
          boxShadow: "0 24px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
        }
      : {
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        };

  return (
    <motion.div
      ref={ref}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      className="relative"
    >
      <div className="rounded-2xl p-8" style={cardStyle}>
        {/* Subtle top glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px"
          style={{ background: "linear-gradient(to right, transparent, #6366F1, transparent)" }}
        />

        <p className="text-xs uppercase tracking-widest text-[#6366F1] mb-8">
          By the Numbers
        </p>

        <div className="grid grid-cols-2 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-heading font-bold text-4xl md:text-5xl text-text-primary">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-text-secondary text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function AboutTeaser() {
  const leftRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(leftRef, { once: true, amount: 0.2 });

  const rightRef = useRef<HTMLDivElement>(null);
  const rightInView = useInView(rightRef, { once: true, amount: 0.2 });

  return (
    <section id="about" className="py-28 bg-surface">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <div ref={leftRef}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-xs uppercase tracking-[0.2em] font-medium text-[#6366F1] mb-4"
            >
              About
            </motion.p>

            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-6">
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
              >
                Engineer by curiosity.
              </motion.span>
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.35 }}
              >
                Builder by obsession.
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.55 }}
              className="text-text-secondary text-lg leading-relaxed mb-8"
            >
              I went from a UX design certificate to shipping 9 production apps in under a year
              — most of them solo, all of them powered by AI-augmented development. I build
              things that work for real people: a dating platform with 205+ users, a travel
              companion my family actually used, and an SMS coach that texts you daily.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[#6366F1] font-medium hover:underline transition-all duration-200 group"
              >
                Read my story
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </div>

          {/* Right: stats card */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 40 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          >
            <StatsCard />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
