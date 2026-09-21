/**
 * Tilted black marquee band — used in the hero background and the footer.
 * Pure CSS animation (respects prefers-reduced-motion via globals.css).
 */
export default function Marquee({
  items,
  reverse = false,
  className = "",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden bg-ink py-2.5 ${className}`}
    >
      <div className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}>
        {[...doubled, ...doubled].map((t, i) => (
          <span
            key={i}
            className="mx-5 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-paper"
          >
            {t} <span className="mx-3 text-vermilion">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
