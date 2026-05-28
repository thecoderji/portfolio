"use client";

import { motion, useInView } from "framer-motion";
import { PropsWithChildren, useRef } from "react";

type RevealSectionProps = PropsWithChildren<{
  className?: string;
  id?: string;
}>;

export default function RevealSection({ children, className, id }: RevealSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
