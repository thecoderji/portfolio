import Reveal from "./Reveal";

/**
 * Editorial section heading with a large Fraunces section number.
 */
export default function SectionHeading({
  num,
  title,
  kicker,
}: {
  num: string;
  title: string;
  kicker?: string;
}) {
  return (
    <Reveal className="mb-10 md:mb-14">
      <div className="flex items-end gap-4 border-b-2 border-ink pb-4">
        <span className="font-display text-5xl font-black italic leading-none text-ink/15 md:text-7xl">
          {num}
        </span>
        <div className="flex-1">
          {kicker && (
            <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.25em] text-vermilion">
              {kicker}
            </p>
          )}
          <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
            {title}
          </h2>
        </div>
      </div>
    </Reveal>
  );
}
