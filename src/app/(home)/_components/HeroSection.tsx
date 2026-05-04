"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

const HERO_MESSAGE_LINES = ["면역,", "그 이상의 변화"] as const;
const HERO_MESSAGE = HERO_MESSAGE_LINES.join(" ");

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const lightOverlayRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const background = backgroundRef.current;
    const cta = ctaRef.current;
    const lightOverlay = lightOverlayRef.current;

    if (!section || !title || !background || !cta || !lightOverlay) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const kicker = section.querySelector<HTMLElement>(".home-hero-kicker");
      const titleLines = gsap.utils.toArray<HTMLElement>(".home-hero-line-inner", title);
      const orbs = gsap.utils.toArray<HTMLElement>(".home-hero-orb", section);

      if (reduceMotion) {
        gsap.set([kicker, titleLines, cta], {
          opacity: 1,
          y: 0,
          yPercent: 0,
          clearProps: "transform",
        });
        gsap.set(lightOverlay, { opacity: 0.22 });
        return;
      }

      gsap.set(kicker, { y: 16, opacity: 0 });
      gsap.set(titleLines, {
        yPercent: 112,
        opacity: 1,
        transformOrigin: "50% 100%",
      });
      gsap.set(cta, { y: 18, opacity: 0 });
      gsap.set(lightOverlay, { opacity: 0.12 });

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to(kicker, { y: 0, opacity: 1, duration: 0.82 })
        .to(
          titleLines,
          {
            yPercent: 0,
            duration: 1.18,
            stagger: 0.16,
          },
          "-=0.42",
        )
        .to(cta, { y: 0, opacity: 1, duration: 0.78, ease: "power3.out" }, "-=0.62");

      gsap.to(orbs, {
        xPercent: "random(-10, 10)",
        yPercent: "random(-8, 8)",
        scale: (orbIndex: number) => 1.06 + orbIndex * 0.035,
        rotate: "random(-5, 5)",
        duration: 9.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.85,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .to(title, { scale: 1.08, yPercent: -8, letterSpacing: "-0.13em", ease: "none" }, 0)
        .to(background, { scale: 1.08, filter: "brightness(1.16) saturate(1.2)", ease: "none" }, 0)
        .to(lightOverlay, { opacity: 0.32, ease: "none" }, 0)
        .to(cta, { y: -28, opacity: 0, ease: "none" }, 0.12);
    }, section);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-hero-heading"
      className="relative isolate min-h-screen overflow-hidden bg-[#030612] text-white"
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(88,109,180,0.26),transparent_34%),radial-gradient(circle_at_78%_18%,rgba(63,174,140,0.2),transparent_32%),radial-gradient(circle_at_52%_78%,rgba(153,194,255,0.14),transparent_42%),linear-gradient(135deg,#02040d_0%,#071126_48%,#0d1732_100%)]"
        aria-hidden
      />
      <div
        ref={lightOverlayRef}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(238,243,255,0.26),transparent_46%),linear-gradient(180deg,rgba(3,6,18,0)_0%,rgba(3,6,18,0.38)_100%)]"
        aria-hidden
      />

      <span
        className="home-hero-orb pointer-events-none absolute -left-[12%] top-[6%] h-[34rem] w-[42rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(111,145,255,0.36),rgba(63,174,140,0.12)_46%,transparent_70%)] blur-[70px] mix-blend-screen"
        aria-hidden
      />
      <span
        className="home-hero-orb pointer-events-none absolute right-[-14%] top-[16%] h-[32rem] w-[44rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(63,174,140,0.28),rgba(153,194,255,0.13)_48%,transparent_72%)] blur-[78px] mix-blend-screen"
        aria-hidden
      />
      <span
        className="home-hero-orb pointer-events-none absolute bottom-[-18%] left-[22%] h-[30rem] w-[54rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.16),rgba(111,145,255,0.12)_48%,transparent_74%)] blur-[86px] mix-blend-screen"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,transparent_0%,rgba(3,6,18,0.16)_52%,rgba(3,6,18,0.74)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[92rem] flex-col items-center justify-center px-4 py-24 text-center sm:px-5">
        <p className="home-hero-kicker mb-6 text-xs font-semibold tracking-[0.5em] text-secondary-bright/76 uppercase sm:mb-8">
          Immunity Beyond Change
        </p>

        <div className="relative w-full max-w-full px-1 sm:px-2">
          <h1
            ref={titleRef}
            id="home-hero-heading"
            className="relative z-10 flex w-full max-w-full flex-col items-center justify-center text-[clamp(3.85rem,9vw,10rem)] leading-[0.88] font-black tracking-[-0.1em] text-balance text-white drop-shadow-[0_22px_70px_rgba(0,0,0,0.46)] sm:tracking-[-0.105em]"
            aria-label={HERO_MESSAGE}
          >
            {HERO_MESSAGE_LINES.map((line) => (
              <span
                key={line}
                className="home-hero-line block overflow-hidden pb-[0.08em] whitespace-nowrap"
                aria-hidden
              >
                <span className="home-hero-line-inner block will-change-transform">
                  {line}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <Link
          ref={ctaRef}
          href="/contact"
          className="mt-9 inline-flex min-h-12 items-center justify-center rounded-full border border-white/18 bg-white/[0.06] px-7 py-3 text-sm font-semibold text-white/86 backdrop-blur-md transition-[background-color,border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-white/34 hover:bg-white/[0.12] hover:shadow-[0_16px_40px_rgba(153,194,255,0.18)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary-bright sm:mt-10"
        >
          상담 시작하기
        </Link>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-linear-to-b from-transparent via-[#050812]/25 to-background" />
      <button
        type="button"
        onClick={() => {
          const next = sectionRef.current?.nextElementSibling;
          if (next instanceof HTMLElement) {
            next.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 rounded-full px-3 py-2 text-white/70 outline-none transition-opacity hover:opacity-90 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-secondary-bright/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050812] sm:bottom-9"
        aria-label="다음 섹션으로 스크롤"
      >
        {reduceMotion ? (
          <span className="text-[0.68rem] font-semibold tracking-[0.32em] uppercase text-white/52">
            Scroll
          </span>
        ) : (
          <div className="[filter:brightness(0)_invert(1)]">
            <DotLottieReact
              src="/ScrollDown.lottie"
              loop
              autoplay
              className="size-[4.5rem] opacity-90 sm:size-20"
              aria-hidden
            />
          </div>
        )}
      </button>
    </section>
  );
}
