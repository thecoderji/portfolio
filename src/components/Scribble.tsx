"use client";

/**
 * Animated hand-drawn cobalt-blue scribble under the hero name.
 * SVG stroke-draw animation; static under prefers-reduced-motion.
 */
import { motion } from "framer-motion";

export default function Scribble({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 46"
      fill="none"
      className={className}
    >
      <motion.path
        d="M6 30 C 60 8, 110 40, 165 22 S 275 6, 330 26 S 400 34, 414 16"
        stroke="#1E4FD8"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, delay: 0.7, ease: "easeInOut" }}
      />
      <motion.path
        d="M22 38 C 85 20, 150 44, 215 28 S 330 14, 402 32"
        stroke="#1E4FD8"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 1.0, ease: "easeInOut" }}
      />
    </svg>
  );
}
