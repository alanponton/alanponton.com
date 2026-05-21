import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { TechPill } from "@/components/ui/tech-pill";
import { ArrowUpRight } from "lucide-react";

const clientWork = [
  {
    name: "Trained Touch Muscle Therapy",
    url: "https://trainedtouch.com",
    tagline:
      "First client. Built to his vision, iterated together, still serving real clients five years on.",
    stats: ["Live since 2020", "4.9★ / 358 Google reviews", "WordPress"],
    image: "/clients/trained-touch.png",
  },
  {
    name: "Trineice Robinson",
    url: "https://trineicerobinson.com",
    tagline:
      "Artist + clinician site for a working musician. Built 2022, still her live presence.",
    stats: ["Live since 2022", "Music artist platform", "WordPress"],
    image: "/clients/trineice-robinson.png",
  },
];

function ClientCard({ client, index }: { client: (typeof clientWork)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="group flex flex-col rounded-xl bg-surface border border-border overflow-hidden
        shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:shadow-none
        hover:border-[#6366F1]/50
        hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)]"
      style={{
        transition: "transform 0.3s ease-out, border-color 0.3s ease-out, box-shadow 0.3s ease-out",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* Screenshot */}
      <div className="aspect-video w-full overflow-hidden bg-[#F3F4F6] dark:bg-[#141416] flex-none">
        <img
          src={client.image}
          alt={`${client.name} website screenshot`}
          className="w-full h-full object-cover object-top"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-heading font-bold text-xl text-text-primary mb-2 leading-tight">
          {client.name}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
          {client.tagline}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {client.stats.map((stat) => (
            <TechPill key={stat} label={stat} />
          ))}
        </div>
        <a
          href={client.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366F1]
            hover:text-[#818cf8] transition-colors duration-200 group/link self-start"
        >
          Visit live site
          <ArrowUpRight
            size={14}
            className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          />
        </a>
      </div>
    </motion.div>
  );
}

export function ClientWork() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.3 });

  return (
    <section className="py-24 bg-surface">
      <Container>
        {/* Heading row */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center gap-6 mb-4"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary whitespace-nowrap">
            Client Work
          </h2>
          <div
            className="flex-1 h-px max-w-xs"
            style={{ background: "linear-gradient(to right, #6366F1, transparent)" }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          className="text-text-secondary text-base mb-12 max-w-xl"
        >
          Long-running client sites — built, shipped, still serving real businesses.
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {clientWork.map((client, i) => (
            <ClientCard key={client.name} client={client} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
