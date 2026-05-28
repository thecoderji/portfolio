"use client";

import { chatStore } from "@/lib/chatStore";
import { personalInfo } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { SiGithub, SiLeetcode } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "border-b border-primary/20 bg-background/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
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

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-textPrimary/80 transition-all duration-300 hover:text-primary"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-full origin-left scale-x-0 rounded-full bg-primary shadow-[0_0_6px_rgba(56,189,248,0.8)] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
          <button
            onClick={() => chatStore.toggle()}
            className="group relative overflow-hidden flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #a855f7 100%)",
              border: "1px solid rgba(168,85,247,0.4)",
              color: "#ffffff",
              boxShadow: "0 0 20px rgba(124,58,237,0.5), 0 4px 15px rgba(0,0,0,0.3)",
              animation: "aiChatGlow 3s ease-in-out infinite"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 35px rgba(168,85,247,0.7), 0 0 60px rgba(124,58,237,0.3), 0 4px 15px rgba(0,0,0,0.3)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 20px rgba(124,58,237,0.5), 0 4px 15px rgba(0,0,0,0.3)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Shine sweep */}
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
              }}
            />
            {/* Robot icon — bounces on hover */}
            <RiRobot2Fill className="relative h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
            <span className="relative font-mono text-xs tracking-wide">
              AI Chat
            </span>
            {/* Pulsing dot */}
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75"
                style={{
                  animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite"
                }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
          </button>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href={personalInfo.leetcode}
            target="_blank"
            rel="noreferrer"
            className="text-lg text-textMuted transition-all duration-300 hover:scale-125 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          >
            <SiLeetcode />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="text-lg text-textMuted transition-all duration-300 hover:scale-125 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          >
            <SiGithub />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-lg text-textMuted transition-all duration-300 hover:scale-125 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          >
            <FaLinkedin />
          </a>
          <a
            href="#contact"
            className="group relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-bold tracking-wide transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
              color: "#ffffff",
              border: "1px solid rgba(239,68,68,0.3)",
              boxShadow: "0 0 20px rgba(239,68,68,0.4), 0 4px 15px rgba(0,0,0,0.3)",
              animation: "hireMeGlow 2.5s ease-in-out infinite"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 35px rgba(239,68,68,0.7), 0 0 60px rgba(220,38,38,0.3), 0 4px 15px rgba(0,0,0,0.3)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 20px rgba(239,68,68,0.4), 0 4px 15px rgba(0,0,0,0.3)";
              e.currentTarget.style.transform = "translateY(0px)";
            }}
          >
            {/* Shine sweep on hover */}
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
              }}
            />
            <span className="relative font-bold">
              Hire Me
            </span>
          </a>
        </div>

        <button className="text-2xl text-textPrimary md:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <FiMenu />
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-[70] bg-background/95 p-8 backdrop-blur-lg md:hidden"
          >
            <div className="mb-12 flex items-center justify-between">
              <span className="text-3xl font-bold text-primary">{personalInfo.initials}</span>
              <button onClick={() => setOpen(false)} className="text-3xl text-textPrimary" aria-label="Close menu">
                <FiX />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-semibold text-textPrimary"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  chatStore.toggle();
                  setOpen(false);
                }}
                className="group relative overflow-hidden flex w-fit items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #a855f7 100%)",
                  border: "1px solid rgba(168,85,247,0.4)",
                  color: "#ffffff",
                  boxShadow: "0 0 20px rgba(124,58,237,0.5), 0 4px 15px rgba(0,0,0,0.3)",
                  animation: "aiChatGlow 3s ease-in-out infinite"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 35px rgba(168,85,247,0.7), 0 0 60px rgba(124,58,237,0.3), 0 4px 15px rgba(0,0,0,0.3)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(124,58,237,0.5), 0 4px 15px rgba(0,0,0,0.3)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Shine sweep */}
                <span
                  className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
                  }}
                />
                {/* Robot icon — bounces on hover */}
                <RiRobot2Fill className="relative h-4 w-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span className="relative font-mono text-xs tracking-wide">
                  AI Chat
                </span>
                {/* Pulsing dot */}
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75"
                    style={{ animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
              </button>
              <a
                href="#contact"
                className="group relative mt-8 inline-flex w-fit overflow-hidden rounded-full px-5 py-2.5 text-sm font-bold tracking-wide transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
                  color: "#ffffff",
                  border: "1px solid rgba(239,68,68,0.3)",
                  boxShadow: "0 0 20px rgba(239,68,68,0.4), 0 4px 15px rgba(0,0,0,0.3)",
                  animation: "hireMeGlow 2.5s ease-in-out infinite"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 35px rgba(239,68,68,0.7), 0 0 60px rgba(220,38,38,0.3), 0 4px 15px rgba(0,0,0,0.3)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(239,68,68,0.4), 0 4px 15px rgba(0,0,0,0.3)";
                  e.currentTarget.style.transform = "translateY(0px)";
                }}
                onClick={() => setOpen(false)}
              >
                {/* Shine sweep on hover */}
                <span
                  className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
                  }}
                />
                <span className="relative font-bold">
                  Hire Me
                </span>
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
