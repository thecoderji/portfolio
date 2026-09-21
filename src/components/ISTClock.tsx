"use client";

/**
 * Live IST (Asia/Kolkata) clock — shared implementation used by the
 * footer and the mobile menu. Updates every second.
 */
import { useEffect, useState } from "react";

export default function ISTClock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => {
      const now = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(now);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`font-mono tabular-nums ${className}`} suppressHydrationWarning>
      {time || "--:--:--"} <span className="opacity-60">IST</span>
    </span>
  );
}
