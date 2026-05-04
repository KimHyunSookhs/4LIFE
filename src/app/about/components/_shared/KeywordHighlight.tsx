"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function KeywordHighlight({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <span className="relative inline-flex px-1 font-semibold text-secondary-bright">
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-x-0 bottom-0 h-3 rounded-full bg-linear-to-r from-white/35 via-secondary-bright/40 to-white/35"
        initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.75, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
        aria-hidden
      />
    </span>
  );
}
