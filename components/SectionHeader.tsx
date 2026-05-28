"use client";

import { motion } from "framer-motion";

type SectionHeaderProps = {
  index: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ index, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-12">
      <p className="mb-2 font-mono text-sm" style={{ color: "rgba(100,116,139,0.8)" }}>{index}</p>
      <h2 className="text-3xl font-bold text-textPrimary md:text-5xl">{title}</h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 60 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-4 h-[2px] bg-primary"
      />
      {subtitle ? <p className="mt-4 max-w-2xl text-textMuted">{subtitle}</p> : null}
    </div>
  );
}
