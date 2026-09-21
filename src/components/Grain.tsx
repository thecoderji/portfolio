"use client";

/**
 * Animated film-grain overlay. The `grain-strong` class can be applied
 * via the useGrain hook (Blog page) to intensify the texture.
 */
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STRONG_GRAIN_ROUTES = ["/blog"];

export default function Grain() {
  const pathname = usePathname();
  const [strong, setStrong] = useState(false);

  useEffect(() => {
    setStrong(STRONG_GRAIN_ROUTES.some((r) => pathname?.startsWith(r)));
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className={`grain-overlay ${strong ? "grain-strong" : ""}`}
    />
  );
}
