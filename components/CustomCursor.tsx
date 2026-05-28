"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ringX = useSpring(x, { stiffness: 250, damping: 25 });
  const ringY = useSpring(y, { stiffness: 250, damping: 25 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const desktop = window.innerWidth >= 1024;
    setEnabled(desktop);
    if (!desktop) return;

    const update = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const onMoveOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a,button,input,textarea,[data-cursor-hover='true']");
      setHovering(Boolean(interactive));
    };

    window.addEventListener("mousemove", update);
    window.addEventListener("mouseover", onMoveOver);

    return () => {
      window.removeEventListener("mousemove", update);
      window.removeEventListener("mouseover", onMoveOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{ left: x, top: y }}
        className="glow-green pointer-events-none fixed z-[90] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
      />
      <motion.div
        style={{ left: ringX, top: ringY }}
        animate={
          hovering
            ? {
                width: 60,
                height: 60,
                backgroundColor: "rgba(56, 189, 248, 0.2)",
                borderColor: "rgba(56, 189, 248, 0.8)"
              }
            : {
                width: 40,
                height: 40,
                backgroundColor: "rgba(56, 189, 248, 0.02)",
                borderColor: "rgba(56, 189, 248, 0.5)"
              }
        }
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="pointer-events-none fixed z-[89] -translate-x-1/2 -translate-y-1/2 rounded-full border"
      />
    </>
  );
}
