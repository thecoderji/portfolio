"use client";

/**
 * Interactive tabbed skills section — tabs with count badges,
 * hover-tilt pills.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/lib/data";

function TiltPill({ skill }: { skill: string }) {
  const [tilt, setTilt] = useState<{ rx: number; ry: number } | null>(null);

  const onMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 10, ry: px * 12 });
  };

  return (
    <motion.span
      onMouseMove={onMove}
      onMouseLeave={() => setTilt(null)}
      animate={{
        rotateX: tilt?.rx ?? 0,
        rotateY: tilt?.ry ?? 0,
        scale: tilt ? 1.05 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d" }}
      className="inline-block cursor-default rounded-full border border-ink/30 bg-paper-card px-4 py-2 font-mono text-xs text-ink-soft shadow-card-sm select-none"
    >
      {skill}
    </motion.span>
  );
}

export default function SkillsTabs() {
  const [active, setActive] = useState(0);
  const category = skillCategories[active];

  return (
    <div id="skills" className="scroll-mt-24">
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Skill categories"
        className="flex flex-wrap gap-2 border-b-2 border-ink pb-4"
      >
        {skillCategories.map((c, i) => (
          <button
            key={c.name}
            role="tab"
            type="button"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            data-cursor="magnetic"
            className={`flex items-center gap-2 rounded-full border-2 border-ink px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              i === active
                ? "bg-ink text-paper"
                : "bg-paper text-ink-soft hover:bg-paper-deep"
            }`}
          >
            {c.name}
            <span
              className={`flex h-[1.15rem] min-w-[1.15rem] items-center justify-center rounded-full px-1 text-[10px] ${
                i === active ? "bg-vermilion text-paper" : "bg-ink/10 text-ink"
              }`}
            >
              {c.skills.length}
            </span>
          </button>
        ))}
      </div>

      {/* Panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={category.name}
          role="tabpanel"
          aria-label={category.name}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {category.skills.map((s) => (
            <TiltPill key={s} skill={s} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
