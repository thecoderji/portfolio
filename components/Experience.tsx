"use client";

import RevealSection from "@/components/RevealSection";
import SectionHeader from "@/components/SectionHeader";
import { experiences } from "@/lib/data";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <RevealSection id="experience" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader index="03 / Experience" title="Where I&apos;ve Worked" />

        <div className="relative space-y-8 pl-6 md:pl-10">
          <div className="absolute bottom-0 left-2 top-0 w-px bg-primary/30 md:left-4" />
          {experiences.map((exp, idx) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative rounded-2xl border border-white/10 bg-card p-6"
            >
              <div className="glow-green absolute -left-[26px] top-7 h-3 w-3 rounded-full bg-primary md:-left-[34px]" />

              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-semibold">{exp.role}</h3>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs text-primary">{exp.type}</span>
              </div>
              <p className="mb-4 text-sm text-slate-300">
                <span className="font-medium" style={{ color: "#2dd4bf" }}>{exp.company}</span> · {exp.location} · {exp.duration}
              </p>

              <div className="mb-4 flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-surface px-2.5 py-1 text-xs text-textMuted">
                    {tag}
                  </span>
                ))}
              </div>

              <ul className="space-y-2">
                {exp.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-[#f1f5f9]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
