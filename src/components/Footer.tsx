import { footerMarqueeText, profile } from "@/lib/data";
import ISTClock from "./ISTClock";

export default function Footer() {
  const items = Array(8).fill(footerMarqueeText);
  return (
    <footer className="mt-24 border-t border-ink/15 pt-0">
      {/* Tilted marquee band */}
      <div
        aria-hidden="true"
        className="overflow-hidden border-b border-ink/20 bg-ink py-3"
        style={{ transform: "rotate(-1.2deg) scale(1.02)", margin: "3rem 0 0" }}
      >
        <div className="marquee-track marquee-reverse">
          {[...items, ...items].map((t, i) => (
            <span
              key={i}
              className="mx-6 whitespace-nowrap font-display text-lg italic text-paper"
            >
              {t} <span className="mx-4 not-italic text-vermilion">✳</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar — left-aligned so the floating Hire Me / chatbot buttons
          (bottom-right) never cover the clock; extra mobile bottom padding
          gives the fixed buttons clear space when fully scrolled down. */}
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-2 px-5 pb-28 pt-8 md:flex-row md:flex-wrap md:items-center md:gap-x-8 md:px-8 md:pb-12">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">
          © {new Date().getFullYear()} {profile.fullName}
        </p>
        <span className="hidden h-4 w-px bg-ink/20 md:block" aria-hidden="true" />
        <div className="flex items-center gap-2 text-sm text-ink-soft">
          <span>{profile.location}</span>
          <span aria-hidden="true" className="text-ink/25">·</span>
          <ISTClock className="text-xs" />
        </div>
      </div>
    </footer>
  );
}
