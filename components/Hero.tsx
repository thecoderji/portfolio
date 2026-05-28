"use client";

import { personalInfo } from "@/lib/data";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiArrowDown, FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    const particles: Particle[] = [];
    const count = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.max(window.innerHeight, 700);
    };

    const createParticles = () => {
      particles.length = 0;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35
        });
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const angle = Math.atan2(dy, dx);
          const force = (120 - distance) / 120;
          p.vx += Math.cos(angle) * force * 0.08;
          p.vy += Math.sin(angle) * force * 0.08;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));
      });

      for (let i = 0; i < particles.length; i += 1) {
        const p1 = particles[i];
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56, 189, 248, 0.4)";
        ctx.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const opacity = 1 - dist / 150;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.15})`;
            ctx.stroke();
          }
        }
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full" />;
}

function useTypewriter(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const activeWord = words[wordIndex % words.length];
    const speed = deleting ? 40 : 90;

    const timeout = window.setTimeout(() => {
      if (!deleting && text.length < activeWord.length) {
        setText(activeWord.slice(0, text.length + 1));
        return;
      }

      if (!deleting && text.length === activeWord.length) {
        setTimeout(() => setDeleting(true), 1000);
        return;
      }

      if (deleting && text.length > 0) {
        setText(activeWord.slice(0, text.length - 1));
        return;
      }

      if (deleting && text.length === 0) {
        setDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }, speed);

    return () => window.clearTimeout(timeout);
  }, [deleting, text, wordIndex, words]);

  return text;
}

export default function Hero() {
  const [typedCode, setTypedCode] = useState("");
  const typeText = useTypewriter(personalInfo.taglines);
  const socials = useMemo(
    () => [
      { href: personalInfo.github, icon: <FiGithub />, label: "GitHub" },
      { href: personalInfo.linkedin, icon: <FiLinkedin />, label: "LinkedIn" },
      { href: personalInfo.leetcode, icon: <SiLeetcode />, label: "LeetCode" },
      { href: `mailto:${personalInfo.email}`, icon: <FiMail />, label: "Email" }
    ],
    []
  );

  useEffect(() => {
    const terminalSnippet = `from langchain.agents import AgentExecutor
from groq import Groq
import fastapi

# Initializing AI Engineer...
engineer = {
    "name": "${personalInfo.name}",
    "role": "${personalInfo.role}",
    "skills": ["RAG", "LangChain", "Agents", "FastAPI"],
    "status": "Available 🚀",
    "location": "India · Remote OK"
}

# Ready to build production AI systems
print("Let's build something great!")`;

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTypedCode(terminalSnippet.slice(0, index));
      if (index >= terminalSnippet.length) {
        window.clearInterval(timer);
      }
    }, 16);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-28 md:px-8">
      <HeroParticles />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.18),transparent_45%)]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-5 lg:items-center">
        <motion.div
          className="lg:col-span-3"
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-green-400/40 bg-green-400/10 px-4 py-2 text-sm text-green-300"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="h-2.5 w-2.5 rounded-full bg-green-400"
            />
            Available for opportunities
          </motion.div>

          <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
            <span className="block font-medium text-textMuted">Hi, I&apos;m</span>
            <span className="text-glow text-primary">{personalInfo.name}</span>
          </motion.h1>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="mt-6 flex items-center gap-2 text-lg font-medium md:text-2xl">
            <span style={{ color: "rgba(255,255,255,0.5)" }}>I build [</span>
            <span style={{ color: "#a78bfa" }}>{typeText}</span>
            <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} style={{ color: "#a78bfa" }}>
              |
            </motion.span>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>]</span>
          </motion.div>

          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="mt-6 max-w-2xl text-base leading-relaxed text-[#f1f5f9] md:text-lg">
            {personalInfo.bio}
          </motion.p>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="mt-8 flex flex-wrap gap-4">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #7f0df1, #c608f5)",
                color: "#0a0f1a",
                boxShadow: "0 0 20px rgba(16,185,129,0.4)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 30px rgba(16,185,129,0.65), 0 8px 24px rgba(0,0,0,0.35)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(16,185,129,0.4)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              View Projects
              <motion.span className="inline-block" whileHover={{ x: 4 }}>
                <FiArrowRight />
              </motion.span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={personalInfo.resume}
              download
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-300"
              style={{
                background: "transparent",
                border: "1px solid rgba(52,211,153,0.4)",
                color: "#34d399"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(52,211,153,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(52,211,153,0.4)";
              }}
            >
              Download Resume
              <FiDownload />
            </motion.a>
          </motion.div>

          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="mt-8 flex items-center gap-5">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
                whileHover={{ scale: 1.1 }}
                className="rounded-full border border-white/10 bg-card p-3 text-xl text-textMuted transition-colors hover:border-white/30 hover:text-white"
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glow-green overflow-hidden rounded-2xl border border-primary/20 bg-surface"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-1.5">
                {/* Red — close */}
                <div
                  className="group relative h-3 w-3 rounded-full transition-all duration-200 hover:brightness-125"
                  style={{
                    background: "#ff5f57",
                    boxShadow: "0 0 4px rgba(255,95,87,0.6)"
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 text-[7px] font-bold text-[#7a1f1a] group-hover:opacity-100">
                    ✕
                  </span>
                </div>
                {/* Yellow — minimize */}
                <div
                  className="group relative h-3 w-3 rounded-full transition-all duration-200 hover:brightness-125"
                  style={{
                    background: "#febc2e",
                    boxShadow: "0 0 4px rgba(254,188,46,0.6)"
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 text-[7px] font-bold text-[#7a5a00] group-hover:opacity-100">
                    −
                  </span>
                </div>
                {/* Green — maximize */}
                <div
                  className="group relative h-3 w-3 rounded-full transition-all duration-200 hover:brightness-125"
                  style={{
                    background: "#28c840",
                    boxShadow: "0 0 4px rgba(40,200,64,0.6)"
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 text-[7px] font-bold text-[#0a4a1a] group-hover:opacity-100">
                    +
                  </span>
                </div>
              </div>
              <span className="ml-3 text-xs text-green-300">{personalInfo.name.split(" ")[0].toLowerCase()}@ai-engineer: ~</span>
            </div>
            <pre
              className="max-h-[430px] overflow-auto p-5 font-mono text-[13px] leading-relaxed md:text-sm"
              style={{ color: "#4ade80" }}
            >
              {typedCode}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ color: "#4ade80" }}
              >
                |
              </motion.span>
            </pre>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-primary"
        aria-label="Scroll down"
      >
        <FiArrowDown size={26} />
      </motion.a>
    </section>
  );
}
