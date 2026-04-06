import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "lucide-react";

export function ContactTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="contact" className="py-32 bg-surface">
      <Container>
        <div className="max-w-3xl mx-auto" ref={ref}>
          {/* Animated gradient border — always rotating */}
          <div className="relative rounded-2xl p-px overflow-hidden">
            <motion.div
              className="absolute w-[300%] h-[300%] -left-full -top-full"
              style={{
                background:
                  "conic-gradient(from 0deg at 50% 50%, transparent 0deg, #6366F1 60deg, #22D3EE 180deg, #A855F7 270deg, #6366F1 300deg, transparent 360deg)",
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Inner content surface */}
            <div className="relative rounded-[calc(1rem-1px)] bg-surface p-12 md:p-16 text-center">
              {/* Subtle inner top glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #6366F1, #22D3EE, transparent)",
                }}
              />

              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                <motion.span
                  className="block text-text-primary"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  Let's build something
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-[#6366F1] via-[#818cf8] to-[#22D3EE] bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                >
                  together.
                </motion.span>
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-text-secondary text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto"
              >
                Have a project in mind, an opportunity to discuss, or just want to connect?
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 h-12 px-7 text-base font-medium rounded-lg bg-[#6366F1] text-white hover:bg-[#818cf8] transition-all duration-200 shadow-lg shadow-[#6366F1]/20 hover:shadow-[#6366F1]/40 hover:scale-[1.02] group"
                >
                  Say Hello
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <a
                  href="https://linkedin.com/in/alan-ponton-375147187"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-7 text-base font-medium rounded-lg border border-border text-text-primary hover:border-[#6366F1] hover:bg-[#6366F1]/10 transition-all duration-200 hover:scale-[1.02]"
                >
                  LinkedIn
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
