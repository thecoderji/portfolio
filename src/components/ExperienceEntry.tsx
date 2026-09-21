"use client";

/**
 * Expandable experience row — collapsed shows role/company/period/location,
 * expanded reveals the full bullet list with tech-tag chips.
 */
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ExperienceEntryData } from "@/lib/data";

export default function ExperienceEntry({
  entry,
  defaultOpen = false,
}: {
  entry: ExperienceEntryData;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg border-2 border-ink bg-paper-card shadow-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-cursor="magnetic"
        className="grid w-full grid-cols-1 items-center gap-2 p-6 text-left md:grid-cols-[2.2fr_1.6fr_1.2fr_auto] md:gap-6 md:p-8"
      >
        <div>
          <h3 className="font-display text-2xl font-bold italic md:text-3xl">
            {entry.role}
          </h3>
          <p className="mt-1 font-mono text-sm text-vermilion">
            {entry.company}
            {entry.type && (
              <span className="text-ink/45"> · {entry.type}</span>
            )}
          </p>
        </div>
        <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
          {entry.period}
        </p>
        <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
          {entry.location}
        </p>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          className="justify-self-end flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink font-display text-xl leading-none"
          aria-hidden="true"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink/15 px-6 py-8 md:px-8">
              {entry.stackTags && entry.stackTags.length > 0 && (
                <ul className="mb-6 flex flex-wrap gap-2">
                  {entry.stackTags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border-2 border-ink bg-paper px-3 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              <ol className="space-y-6">
                {entry.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.045, duration: 0.35 }}
                    className="flex gap-4"
                  >
                    <span className="mt-1 font-mono text-[11px] text-cobalt">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="leading-relaxed text-ink-soft">{b.text}</p>
                      {b.tags.length > 0 && (
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {b.tags.map((t) => (
                            <li
                              key={t}
                              className="rounded-full border border-cobalt/40 bg-cobalt/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-cobalt"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
