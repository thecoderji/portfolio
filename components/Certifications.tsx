"use client";

import RevealSection from "@/components/RevealSection";
import SectionHeader from "@/components/SectionHeader";
import { certifications } from "@/lib/data";
import { getIcon } from "@/utils/getIcon";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

export default function Certifications() {
  return (
    <RevealSection id="certifications" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader index="05 / Certifications" title="Proof of Learning" />

        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {certifications.map((cert) => {
            const Icon = getIcon(cert.icon);

            return (
              <motion.div
                key={cert.name}
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(56, 189, 248, 0.4)",
                  boxShadow: "0 0 16px rgba(56, 189, 248, 0.15)"
                }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-white/10 bg-background/60 p-5 backdrop-blur-xl"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="text-[32px]" style={{ color: cert.color }}>
                    <Icon />
                  </div>
                  {cert.link &&
                  cert.link !== "ADD_YOUR_CERT_LINK_HERE" ? (
                    <motion.a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all duration-300"
                      style={{
                        background: "rgba(167,139,250,0.08)",
                        border: "1px solid rgba(167,139,250,0.3)",
                        color: "#a78bfa"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(167,139,250,0.16)";
                        e.currentTarget.style.boxShadow =
                          "0 0 12px rgba(167,139,250,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(167,139,250,0.08)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                      title="View Certificate"
                    >
                      <FiExternalLink className="h-3 w-3" />
                      <span>Verify</span>
                    </motion.a>
                  ) : null}
                </div>
                <p className="text-base font-bold text-white">{cert.name}</p>
                <p className="mt-1 text-sm" style={{ color: "#a78bfa" }}>{cert.issuer}</p>
                {cert.instructor ? (
                  <p className="mt-2 text-xs text-textMuted">{cert.instructor}</p>
                ) : null}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </RevealSection>
  );
}
