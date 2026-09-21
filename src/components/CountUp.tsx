"use client";

/**
 * Count-up stat — animates from 0 to value when scrolled into view.
 */
import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import type { Stat } from "@/lib/data";

function AnimatedNumber({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 30, stiffness: 120 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) mv.set(stat.value);
  }, [inView, mv, stat.value]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      setDisplay(
        Number(v).toFixed(stat.decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    });
    return unsub;
  }, [spring, stat.decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {stat.suffix}
    </span>
  );
}

export default function CountUp({ stat }: { stat: Stat }) {
  return (
    <div className="border-l-2 border-ink/20 pl-5">
      <p className="font-display text-4xl font-bold italic text-ink md:text-5xl">
        <AnimatedNumber stat={stat} />
      </p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
        {stat.label}
      </p>
    </div>
  );
}
