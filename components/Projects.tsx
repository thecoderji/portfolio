"use client";

import RevealSection from "@/components/RevealSection";
import SectionHeader from "@/components/SectionHeader";
import { personalInfo, projects } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import { SiGithub } from "react-icons/si";

export default function Projects() {
  const [toast, setToast] = useState("");

  const showSoonToast = () => {
    setToast("Repo coming soon!");
    window.setTimeout(() => setToast(""), 2000);
  };

  return (
    <RevealSection id="projects" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          index="04 / Projects"
          title="Things I&apos;ve Built"
          subtitle="Click any card to view on GitHub"
        />

        <motion.div
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08 }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2"
        >
          {projects.map((project) => {
            const isComingSoon = project.github === "TODO_REPO_LINK";

            const handleOpen = () => {
              if (isComingSoon) {
                showSoonToast();
                return;
              }
              window.open(project.github, "_blank", "noopener,noreferrer");
            };

            return (
              <motion.article
                key={project.title}
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: `0 0 22px ${project.badgeColor}33`,
                  borderColor: "rgba(56, 189, 248, 0.4)"
                }}
                transition={{ duration: 0.3 }}
                onClick={handleOpen}
                className="cursor-pointer rounded-2xl border border-white/10 bg-card p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: "rgba(52,211,153,0.14)",
                      color: "#34d399"
                    }}
                  >
                    {project.badge}
                  </span>
                  <motion.a
                    href={project.github === "TODO_REPO_LINK" ? "#" : project.github}
                    target={project.github === "TODO_REPO_LINK" ? "_self" : "_blank"}
                    rel="noreferrer"
                    onClick={(e) => {
                      if (project.github === "TODO_REPO_LINK") {
                        e.preventDefault();
                      }
                    }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="group flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300"
                    style={{
                      background: "rgba(45,212,191,0.08)",
                      border: "1px solid rgba(45,212,191,0.3)",
                      color: "#2dd4bf"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(45,212,191,0.18)";
                      e.currentTarget.style.borderColor = "rgba(45,212,191,0.45)";
                      e.currentTarget.style.boxShadow = "0 0 15px rgba(45,212,191,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(45,212,191,0.08)";
                      e.currentTarget.style.borderColor = "rgba(45,212,191,0.3)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    title="View on GitHub"
                  >
                    <SiGithub className="h-3.5 w-3.5 transition-transform group-hover:rotate-12" />
                    <span>GitHub</span>
                    <FiArrowUpRight className="h-3 w-3 -translate-y-0.5 opacity-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:opacity-100" />
                  </motion.a>
                </div>

                <h3 className="mb-2 text-2xl font-semibold">{project.title}</h3>
                <p className="mb-3 font-mono text-sm" style={{ color: "#2dd4bf" }}>{project.stack}</p>
                <p className="line-clamp-3 text-sm leading-relaxed text-[#f1f5f9]">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-surface px-2.5 py-1 text-xs text-textMuted">
                      {tag}
                    </span>
                  ))}
                </div>

                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/40 px-3 py-1.5 text-xs text-primary"
                  >
                    Live Demo <FiExternalLink />
                  </a>
                ) : null}
              </motion.article>
            );
          })}
        </motion.div>

        <div className="mt-10 text-center">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300"
            style={{
              border: "1px solid rgba(45,212,191,0.4)",
              color: "#2dd4bf"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(45,212,191,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            View All on GitHub
            <FiExternalLink />
          </motion.a>
        </div>
      </div>

      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-8 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-primary/30 bg-card px-4 py-2 text-sm text-primary"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </RevealSection>
  );
}
