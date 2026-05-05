"use client";

import type { ReactNode } from "react";

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg font-semibold tracking-[0.28em] text-white/88 uppercase">
      {children}
    </p>
  );
}
