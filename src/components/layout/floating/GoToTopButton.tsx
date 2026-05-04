"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const SLOT_CLASS = "flex h-12 w-12 shrink-0 items-center justify-center";

const SCROLL_SHOW_THRESHOLD = 8;

export function GoToTopButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const el = document.scrollingElement ?? document.documentElement;

    const update = () => {
      setShowScrollTop(el.scrollTop > SCROLL_SHOW_THRESHOLD);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`pointer-events-none ${SLOT_CLASS}`}
      aria-hidden={!showScrollTop}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className={`pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white border border-primary/50 text-zinc-800 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none ${
          showScrollTop
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
        aria-label="페이지 맨 위로 이동"
        tabIndex={showScrollTop ? 0 : -1}
      >
        <ChevronUp className="h-6 w-6" strokeWidth={2} aria-hidden />
      </button>
    </div>
  );
}
