import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

function parseValue(raw: string) {
  const match = raw.match(/^(\d+\.?\d*)(.*)/);
  if (!match) return null;
  return { num: parseFloat(match[1]), suffix: match[2] };
}

export function CountUpStat({
  value,
  color,
  className = "text-lg font-bold font-heading",
}: {
  value: string;
  color: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(parsed ? `0${parsed.suffix}` : value);

  useEffect(() => {
    if (!parsed || !isInView) return;
    const { num, suffix } = parsed;
    const steps = 36;
    const duration = 1500;
    let step = 0;
    const id = setInterval(() => {
      step++;
      const t = step / steps;
      const eased = 1 - Math.pow(1 - t, 3);
      const cur = num * eased;
      const str = Number.isInteger(num) ? Math.round(cur).toString() : cur.toFixed(1);
      setDisplay(str + suffix);
      if (step >= steps) clearInterval(id);
    }, duration / steps);
    return () => clearInterval(id);
  }, [isInView]); // eslint-disable-line

  return (
    <div ref={ref} className={className} style={{ color }}>
      {display}
    </div>
  );
}
