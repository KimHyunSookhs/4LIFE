"use client";

import { motion, useScroll } from "framer-motion";

export function AboutCeoScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-linear-to-r from-primary via-secondary-bright to-deep-blue"
      style={{ scaleX: scrollYProgress }}
      aria-hidden
    />
  );
}
