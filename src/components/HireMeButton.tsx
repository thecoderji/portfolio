"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Sticky "Hire Me" button — always visible on every page (desktop + mobile).
 * Performs a hard route change to /contact (never in-page anchor scrolling).
 */
export default function HireMeButton() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <Link
      href="/contact"
      data-cursor="magnetic"
      className="fixed bottom-24 right-5 z-50 rounded-full border-2 border-ink bg-vermilion px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-paper shadow-card-sm transition-transform hover:-translate-y-0.5 md:bottom-6 md:right-[18rem]"
      aria-label="Hire Me — go to contact page"
    >
      Hire Me
    </Link>
  );
}
