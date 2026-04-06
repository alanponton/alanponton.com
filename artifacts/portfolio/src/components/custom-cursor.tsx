import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const ringX = useSpring(rawX, { damping: 25, stiffness: 250 });
  const ringY = useSpring(rawY, { damping: 25, stiffness: 250 });

  const isTouch = useRef(false);

  useEffect(() => {
    // Don't show on touch devices
    if ("ontouchstart" in window) {
      isTouch.current = true;
      return;
    }

    const handleMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], [data-cursor-hover]");
      setIsHovering(!!interactive);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible]);

  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      {/* Dot — follows instantly */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-[#111827] dark:bg-[#6366F1]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          opacity: visible && !isHovering ? 1 : 0,
        }}
        transition={{ duration: 0 }}
      />

      {/* Ring — follows with spring lag */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border border-[#111827] dark:border-[#6366F1]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          opacity: visible ? (isHovering ? 0.7 : 0.5) : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
