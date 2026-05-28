"use client";

import { personalInfo } from "@/lib/data";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="border-t border-white/10 bg-surface px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between">
          <Link
            href="#"
            className="group relative flex items-center justify-center select-none"
            style={{ textDecoration: "none" }}
          >
            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #38bdf8, #818cf8, #0ea5e9, #38bdf8)",
                padding: "2px",
                borderRadius: "50%"
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Main circle container */}
            <div
              className="relative flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-105"
              style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(145deg, #0f2744 0%, #0a1929 40%, #050b14 100%)",
                border: "2px solid transparent",
                backgroundClip: "padding-box",
                boxShadow: `
        0 0 0 2px rgba(56,189,248,0.5),
        0 4px 15px rgba(0,0,0,0.5),
        0 0 20px rgba(56,189,248,0.2),
        inset 0 1px 0 rgba(255,255,255,0.1),
        inset 0 -1px 0 rgba(0,0,0,0.3)
      `
              }}
            >
              {/* 3D inner gradient overlay */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(56,189,248,0.15) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)",
                  borderRadius: "50%"
                }}
              />

              {/* KC Text */}
              <span
                className="relative z-10 font-black tracking-tight leading-none"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.1rem",
                  letterSpacing: "-0.05em",
                  background: "linear-gradient(180deg, #e0f2fe 0%, #38bdf8 50%, #0ea5e9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
                  textShadow: "none"
                }}
              >
                KC
              </span>

              {/* Bottom reflection */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                style={{
                  width: "60%",
                  height: "4px",
                  background: "radial-gradient(ellipse, rgba(56,189,248,0.4) 0%, transparent 70%)",
                  bottom: "4px"
                }}
              />
            </div>
          </Link>

          <div className="flex flex-wrap items-center justify-center gap-5">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-textMuted transition-colors hover:text-primary">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 text-lg">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-textMuted transition-all hover:scale-110 hover:text-primary">
              <FiGithub />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-textMuted transition-all hover:scale-110 hover:text-primary">
              <FiLinkedin />
            </a>
            <a href={personalInfo.leetcode} target="_blank" rel="noreferrer" className="text-textMuted transition-all hover:scale-110 hover:text-primary">
              <SiLeetcode />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="text-textMuted transition-all hover:scale-110 hover:text-primary">
              <FiMail />
            </a>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6 text-center text-sm text-textMuted">
          <p>Built by {personalInfo.name} with Next.js, Tailwind & ❤️</p>
          <p className="mt-1">© 2025 {personalInfo.name}</p>
        </div>
      </div>

      {showTop ? (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="glow-green fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-background"
          aria-label="Back to top"
        >
          <FiArrowUp />
        </motion.button>
      ) : null}
    </footer>
  );
}
