import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Container } from "@/components/ui/container";
import { TechPill } from "@/components/ui/tech-pill";
import { CountUpStat } from "@/components/ui/count-up-stat";
import { ArrowUpRight } from "lucide-react";
import { projects as allProjects, type ProjectData } from "@/data/projects";
import { useTheme } from "@/context/theme-context";

export function RotatingCardImage({ images, color, title, hovered, transparent = false }: { images: { src: string; caption: string; theme?: "light" | "dark" }[]; color: string; title: string; hovered: boolean; transparent?: boolean; }) {
  if (images.length === 0) {
    return (
      <div className="w-full h-full" style={transparent ? undefined : { background: `linear-gradient(135deg, ${color}22 0%, ${color}08 100%)` }} />
    );
  }

  // Single phone: centered with hover lift
  if (images.length === 1) {
    const primary = images[0];
    return (
      <div
        className="relative w-full h-full overflow-hidden flex items-center justify-center p-8"
        style={transparent ? undefined : { background: `linear-gradient(135deg, ${color}22 0%, ${color}08 100%)` }}
      >
        <motion.img
          src={primary.src}
          alt={primary.caption || title}
          loading="lazy"
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full w-auto max-w-full object-contain rounded-xl"
          style={{ boxShadow: `0 20px 50px ${color}40, 0 8px 20px rgba(0,0,0,0.15)` }}
        />
      </div>
    );
  }

  // Two phones: primary forward, secondary behind-right
  if (images.length === 2) {
    const back = images[0];
    const front = images[1];
    return (
      <div
        className="relative w-full h-full overflow-hidden flex items-center justify-center p-8"
        style={transparent ? undefined : { background: `linear-gradient(135deg, ${color}22 0%, ${color}08 100%)` }}
      >
        <motion.img
          src={back.src}
          alt={back.caption || title}
          loading="lazy"
          animate={{ x: hovered ? 12 : 0, rotate: hovered ? 10 : 8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute h-[82%] w-auto object-contain rounded-xl"
          style={{
            right: "22%",
            boxShadow: `0 12px 30px ${color}30, 0 4px 10px rgba(0,0,0,0.12)`,
            zIndex: 1,
          }}
        />
        <motion.img
          src={front.src}
          alt={front.caption || title}
          loading="lazy"
          animate={{ y: hovered ? -8 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative h-full w-auto max-w-full object-contain rounded-xl"
          style={{
            boxShadow: `0 20px 50px ${color}40, 0 8px 20px rgba(0,0,0,0.15)`,
            zIndex: 2,
          }}
        />
      </div>
    );
  }

  // Multiple phones: cascade — first left-back, second center-front, third right-back
  const left = images[0];
  const center = images[1] ?? images[0];
  const right = images[2] ?? images[0];

  return (
    <div
      className="relative w-full h-full overflow-hidden flex items-center justify-center p-8"
      style={transparent ? undefined : { background: `linear-gradient(135deg, ${color}22 0%, ${color}08 100%)` }}
    >
      <motion.img
        src={left.src}
        alt={left.caption || title}
        loading="lazy"
        animate={{ x: hovered ? -8 : 0, rotate: hovered ? -10 : -8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute h-[78%] w-auto object-contain rounded-xl"
        style={{
          left: "18%",
          boxShadow: `0 12px 30px ${color}30, 0 4px 10px rgba(0,0,0,0.12)`,
          zIndex: 1,
        }}
      />
      <motion.img
        src={right.src}
        alt={right.caption || title}
        loading="lazy"
        animate={{ x: hovered ? 8 : 0, rotate: hovered ? 10 : 8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute h-[78%] w-auto object-contain rounded-xl"
        style={{
          right: "18%",
          boxShadow: `0 12px 30px ${color}30, 0 4px 10px rgba(0,0,0,0.12)`,
          zIndex: 1,
        }}
      />
      <motion.img
        src={center.src}
        alt={center.caption || title}
        loading="lazy"
        animate={{ y: hovered ? -8 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative h-full w-auto max-w-full object-contain rounded-xl"
        style={{
          boxShadow: `0 20px 50px ${color}40, 0 8px 20px rgba(0,0,0,0.15)`,
          zIndex: 2,
        }}
      />
    </div>
  );
}

// First 7 projects for the bento grid
const featuredProjects = allProjects.slice(0, 6);

// Desktop 12-col bento layout
const gridLayout = [
  { colStart: 1, colSpan: 7, rowSpan: 2 },  // Lonnie's Locations — flagship large
  { colStart: 8, colSpan: 5, rowSpan: 2 },  // 2100 Security — flagship medium
  { colStart: 1, colSpan: 3, rowSpan: 1 },  // MetroPlex Match
  { colStart: 4, colSpan: 3, rowSpan: 1 },  // Trip Buddy
  { colStart: 7, colSpan: 3, rowSpan: 1 },  // FollowThisModel
  { colStart: 10, colSpan: 3, rowSpan: 1 }, // Push Coach
];

function ProjectCardInner({
  project,
  hovered,
  isFlagship,
  isFullWidth,
  cardNumber,
}: {
  project: ProjectData;
  hovered: boolean;
  isFlagship: boolean;
  isFullWidth: boolean;
  cardNumber: number;
}) {
  const { theme } = useTheme();
  const padding = isFlagship ? "p-8" : "p-6";
  const titleSize = isFlagship ? "text-3xl md:text-4xl tracking-tight" : isFullWidth ? "text-2xl md:text-3xl" : "text-xl md:text-2xl";
  const baseBorder = theme === "dark" ? "#2A2A2E" : "#E5E7EB";
  const baseBoxShadow =
    theme === "dark" ? "none" : "0 1px 3px rgba(0,0,0,0.08)";

  return (
    <motion.div
      animate={{
        y: hovered ? -6 : 0,
        borderColor: hovered ? project.color : baseBorder,
        boxShadow: hovered ? `0 8px 30px ${project.color}25` : baseBoxShadow,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex border rounded-xl overflow-hidden h-full ${isFullWidth ? "flex-row" : "flex-col"}`}
      style={{ borderColor: baseBorder }}
    >
      {/* Ghost number — flagship and full-width only */}
      {(isFlagship || isFullWidth) && (
        <div
          aria-hidden="true"
          className="absolute pointer-events-none select-none font-heading font-bold leading-none"
          style={{
            top: isFullWidth ? "50%" : "-0.15em",
            right: "0.05em",
            transform: isFullWidth ? "translateY(-50%)" : "none",
            fontSize: isFullWidth ? "180px" : "260px",
            color: project.color,
            opacity: 0.06,
            zIndex: 0,
          }}
        >
          {String(cardNumber).padStart(2, "0")}
        </div>
      )}

      {!isFullWidth && (
        <div className={`relative w-full overflow-hidden ${isFlagship ? "flex-1 min-h-[280px] max-h-[420px]" : "flex-none"}`} style={!isFlagship ? { aspectRatio: "16 / 10" } : undefined}>
          <RotatingCardImage
            images={(project.gallery ?? []).filter((g) => g.inCard)}
            color={project.color}
            title={project.title}
            hovered={hovered}
          />
        </div>
      )}

      {/* Accent bar */}
      <div
        className={isFullWidth ? "w-1 flex-none" : "h-1 w-full flex-none"}
        style={{ background: project.color }}
      />

      {/* Persistent ambient corner wash */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: (isFlagship || isFullWidth)
            ? `radial-gradient(ellipse 70% 50% at 85% 0%, ${project.color}0F 0%, transparent 60%)`
            : "none",
          zIndex: 0,
        }}
      />
      {/* Hover intensifier */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${project.color}11 0%, transparent 70%)`,
        }}
      />

      {isFullWidth ? (
        /* Full-width horizontal layout — Sophia AI */
        <div className={`relative z-10 ${padding} flex flex-col lg:flex-row lg:items-start lg:gap-12 flex-1`}>
          <div className="flex flex-col flex-1">
            <p className="text-xs uppercase tracking-[0.2em] font-medium mb-3" style={{ color: project.color }}>
              {project.category}
            </p>
            <div className="flex items-start justify-between mb-3">
              <h3 className={`font-heading font-bold ${titleSize} text-text-primary`}>{project.title}</h3>
              <motion.div
                animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 4 }}
                transition={{ duration: 0.2 }}
                className="text-text-secondary ml-2 flex-none"
              >
                <ArrowUpRight size={18} />
              </motion.div>
            </div>
            <p className="text-text-secondary text-base leading-relaxed">{project.description}</p>
          </div>

          <div className="flex flex-col lg:w-72 flex-none mt-5 lg:mt-0">
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((t) => (
                <TechPill key={t} label={t} />
              ))}
            </div>
            <div className="flex gap-6 pt-4 border-t border-border">
              {project.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <CountUpStat value={stat.value} color={project.color} />
                  <div className="text-xs text-text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Regular vertical layout */
        <div className={`relative z-10 ${padding} flex flex-col${isFlagship ? "" : " flex-1"}`}>
          <p className="text-xs uppercase tracking-[0.2em] font-medium mb-3" style={{ color: project.color }}>
            {project.category}
          </p>
          <div className="flex items-start justify-between mb-3">
            <h3 className={`font-heading font-bold ${titleSize} text-text-primary`}>{project.title}</h3>
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 4 }}
              transition={{ duration: 0.2 }}
              className="text-text-secondary ml-2 flex-none"
            >
              <ArrowUpRight size={18} />
            </motion.div>
          </div>
          <p className="text-text-secondary text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
            {project.description}
          </p>
          <div className="flex gap-4 pt-4 border-t border-border">
            {project.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <CountUpStat value={stat.value} color={project.color} />
                <div className="text-xs text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  isFlagship,
  isFullWidth,
  cardNumber,
}: {
  project: ProjectData;
  index: number;
  isFlagship: boolean;
  isFullWidth: boolean;
  cardNumber: number;
}) {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);
  const layout = gridLayout[index];
  const baseBorder = theme === "dark" ? "#2A2A2E" : "#E5E7EB";

  return (
    <Link
      href={`/projects/${project.slug}`}
      onClick={() => sessionStorage.setItem("projectsScrollY", String(window.scrollY))}
      style={{
        gridColumnStart: layout.colStart,
        gridColumnEnd: `span ${layout.colSpan}`,
        gridRowEnd: `span ${layout.rowSpan}`,
        minHeight: isFlagship ? 320 : undefined,
      }}
      className="hidden lg:flex flex-col cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex flex-col rounded-xl bg-surface border overflow-hidden group h-full shadow-[0_1px_3px_rgba(0,0,0,0.08)] dark:shadow-none"
        style={{ borderColor: baseBorder }}
      >
        <ProjectCardInner
          project={project}
          hovered={hovered}
          isFlagship={isFlagship}
          isFullWidth={isFullWidth}
          cardNumber={cardNumber}
        />
      </motion.div>
    </Link>
  );
}

function MobileCard({ project, index }: { project: ProjectData; index: number }) {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);
  const baseBorder = theme === "dark" ? "#2A2A2E" : "#E5E7EB";
  const baseBoxShadow =
    theme === "dark" ? "none" : "0 1px 3px rgba(0,0,0,0.08)";

  return (
    <Link href={`/projects/${project.slug}`} onClick={() => sessionStorage.setItem("projectsScrollY", String(window.scrollY))} className="block">
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group flex flex-col rounded-xl bg-surface border overflow-hidden cursor-pointer"
        style={{
          borderColor: hovered ? project.color : baseBorder,
          boxShadow: hovered ? `0 8px 30px ${project.color}25` : baseBoxShadow,
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          transition: "all 0.3s ease-out",
        }}
      >
        <div className="relative w-full overflow-hidden flex-none" style={{ aspectRatio: "16 / 10" }}>
          <RotatingCardImage
            images={(project.gallery ?? []).filter((g) => g.inCard)}
            color={project.color}
            title={project.title}
            hovered={hovered}
          />
        </div>
        <div className="h-1 w-full flex-none" style={{ background: project.color }} />
        <div className="p-5 flex flex-col flex-1">
          <p className="text-xs uppercase tracking-[0.2em] font-medium mb-2" style={{ color: project.color }}>
            {project.category}
          </p>
          <h3 className="font-heading font-bold text-xl text-text-primary mb-2">{project.title}</h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
            {project.description}
          </p>
          <div className="flex gap-4 pt-3 border-t border-border">
            {project.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <CountUpStat
                  value={stat.value}
                  color={project.color}
                  className="text-base font-bold font-heading"
                />
                <div className="text-xs text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export function ProjectsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const saved = sessionStorage.getItem("projectsScrollY");
    if (saved) {
      window.scrollTo({ top: Number(saved), behavior: "instant" });
      sessionStorage.removeItem("projectsScrollY");
    }
  }, []);

  return (
    <section id="projects" className="pt-24 pb-40">
      <Container variant="wide">
        {/* Section heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-3">
            Featured Work
          </h2>
          <div
            className="h-[2px] w-20 mb-4"
            style={{ background: "linear-gradient(to right, #6366F1, #22D3EE)" }}
          />
          <p className="text-text-secondary text-lg">
            AI platforms, client projects, and production systems I've built.
          </p>
        </motion.div>

        {/* Desktop bento grid */}
        <div
          className="hidden lg:grid gap-6"
          style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
        >
          {featuredProjects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              isFlagship={i < 2}
              isFullWidth={i === 6}
              cardNumber={i + 1}
            />
          ))}
        </div>

        {/* Mobile / tablet stack */}
        <div className="grid lg:hidden grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredProjects.map((project, i) => (
            <MobileCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
