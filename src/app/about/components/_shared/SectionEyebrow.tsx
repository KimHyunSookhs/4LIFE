"use client";

import type { ReactNode } from "react";

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm font-semibold tracking-[0.28em] text-primary uppercase">
      {children}
    </p>
  );
}
