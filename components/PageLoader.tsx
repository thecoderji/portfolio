"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const STORAGE_KEY = "kc-portfolio-visited";

export default function PageLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const alreadyVisited = window.localStorage.getItem(STORAGE_KEY);
    if (alreadyVisited) return;

    setShow(true);
    const timeout = window.setTimeout(() => {
      setShow(false);
      window.localStorage.setItem(STORAGE_KEY, "1");
    }, 2000);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <svg width="140" height="80" viewBox="0 0 140 80" fill="none" className="mb-6">
            <motion.path
              d="M20 10V70M20 40L50 10M20 40L50 70M70 10V70M70 10H120M70 70H120"
              stroke="url(#kcGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="kcGradient" x1="20" y1="10" x2="120" y2="70" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" />
                <stop offset="1" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
          </svg>
          <div className="h-1 w-64 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="h-full bg-primary"
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
