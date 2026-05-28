"use client";

import RevealSection from "@/components/RevealSection";
import SectionHeader from "@/components/SectionHeader";
import { skillCategories } from "@/lib/data";
import { getIcon } from "@/utils/getIcon";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <RevealSection id="skills" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="02 / Skills"
          title="The Tech Arsenal"
          subtitle="Tools I actually use — not just ticked on a checklist"
        />

        <div className="space-y-10">
          {skillCategories.map((group) => (
            <div key={group.category}>
              <div className="mb-5 flex items-center gap-3">
                <span className="text-2xl" style={{ color: "#a78bfa" }}>{group.emoji}</span>
                <h3 className="text-xl font-semibold" style={{ color: "#a78bfa" }}>{group.category}</h3>
                <span className="h-px flex-1 bg-purple-400/20" />
              </div>

              <motion.div
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05 } }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5"
              >
                {group.skills.map((skill) => {
                  const Icon = getIcon(skill.icon);
                  return (
                    <motion.div
                      key={skill.name}
                      variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                      whileHover={{
                        y: -4,
                        borderColor: "rgba(167, 139, 250, 0.5)",
                        boxShadow: "0 0 12px rgba(167, 139, 250, 0.2)"
                      }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl border border-white/10 bg-card p-5 text-center"
                    >
                      <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.3 }} className="mx-auto mb-3 flex justify-center text-[32px]" style={{ color: skill.color }}>
                        <Icon />
                      </motion.div>
                      <p className="text-sm font-medium text-textPrimary">{skill.name}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
