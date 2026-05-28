"use client";

import RevealSection from "@/components/RevealSection";
import SectionHeader from "@/components/SectionHeader";
import { education, personalInfo, stats } from "@/lib/data";
import { animate, motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate(latest) {
        setDisplay(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <RevealSection id="about" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader index="01 / About" title="Why I Build What I Build" />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <motion.div
            whileHover={{ scale: 1.02, rotate: 1 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-3xl bg-gradient-to-br from-primary/50 to-primary/20 p-[1px]"
          >
            <div className="rounded-3xl bg-card p-8">
              <div className="relative w-full aspect-[4/5] max-h-[420px] overflow-hidden rounded-2xl bg-background">
                <Image
                  src="/profile.png"
                  alt="Kishlay Choudhary"
                  fill
                  className="object-cover object-[center_15%]"
                  priority
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full border border-green-400/40 bg-green-400/10 px-4 py-1 text-sm text-green-300">
                  {personalInfo.availableText}
                </span>
                <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1 text-sm text-emerald-300">
                  {personalInfo.location}
                </span>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-primary/20 blur-2xl" />
          </motion.div>

          <div>
            <p className="text-lg leading-relaxed text-[#f1f5f9]">
              {personalInfo.journey}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {stats.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-white/10 bg-card p-5"
                >
                  <div className="mb-3 h-1 w-10 rounded-full bg-emerald-400" />
                  <p className="text-3xl font-bold text-emerald-400">
                    <CountUp value={item.value} suffix={item.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-slate-300">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/15 bg-surface px-4 py-2 text-sm text-textMuted">
                📍 {personalInfo.locationShort} → {personalInfo.openToShort}
              </div>
              <div className="rounded-full border border-white/15 bg-surface px-4 py-2 text-sm text-textMuted">
                🎓 {education.short}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
