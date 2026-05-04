"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

/**
 * 전역 헤더: 로고 + 주요 내비게이션.
 *
 * - `lg` 미만: **햄버거**로 오른쪽에서 왼쪽으로 밀려 들어오는 **드로어**(Material `Drawer.end` / Flutter `endDrawer` 느낌).
 * - `lg` 이상: 가로 한 줄 내비 (`hidden lg:flex`).
 * - 헤더 바는 `fixed` + 상단 높이만큼 spacer로 레이아웃을 유지한다.
 * - 드로어는 `position: fixed` + `translate-x` 전환으로 구현한다. 헤더 바는 `z-[60]`으로 두어
 *   햄버거는 항상 눌리고, 패널·딤은 그 아래 레이어(`z-40`~`z-50`)에 둔다.
 *
 * 접근성:
 * - 햄버거: `aria-expanded`, `aria-controls` ↔ 패널 `id`
 * - 드로어: `role="dialog"`, `aria-modal="true"` (열릴 때만 배경과 상호작용 분리)
 * - `Escape`·딤 클릭·각 링크/로고 클릭으로 닫기
 * - 열림 시 `body` 스크롤 잠금(배경 콘텐츠가 뒤에서 움직이지 않게)
 */

const NAV_ITEMS = [
  { href: "/about", label: "대표소개" },
  { href: "/featured-products", label: "대표상품" },
  { href: "/reviews", label: "고객후기" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "문의하기" },
] as const;

export default function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-7 h-7">
      {/* 위 */}
      <span
        className={`absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-current transition-all duration-300
        ${open ? "rotate-45" : "-translate-y-2"}`}
      />

      <span
        className={`absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-current transition-all duration-300
        ${open ? "opacity-0" : ""}`}
      />

      {/* 아래 */}
      <span
        className={`absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-current transition-all duration-300
        ${open ? "-rotate-45" : "translate-y-2"}`}
      />
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  /** sticky 대신 fixed일 때 메인 영역에 동일 높이를 맞춰 레이아웃이 밀리지 않게 한다 */
  const [headerBandHeight, setHeaderBandHeight] = useState(0);
  const mobileMenuId = useId();
  const headerBandRef = useRef<HTMLElement>(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobile = useCallback(() => {
    setMobileOpen((v) => !v);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMobile]);

  /** 화면을 넓혀 `lg`가 되면 드로어 상태 초기화 */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /** 드로어 열린 동안 본문 스크롤 방지 */
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useLayoutEffect(() => {
    const el = headerBandRef.current;
    if (!el) return;

    const update = () => {
      const h = el.offsetHeight;
      setHeaderBandHeight((prev) => (prev === h ? prev : h));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onDrawerKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") closeMobile();
  };

  return (
    <>
      {/* fixed 시 본문이 헤더 밑으로 깔리지 않도록 높이만큼 블록 유지 */}
      <div
        className="shrink-0"
        style={{ height: headerBandHeight || undefined }}
        aria-hidden
      />
      <header
        ref={headerBandRef}
        className="fixed inset-x-0 top-0 z-60 border-b border-border bg-card/95 shadow-sm shadow-primary/5 backdrop-blur supports-backdrop-filter:bg-card/80"
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-120 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-card"
        >
          본문으로 건너뛰기
        </a>

        <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:py-4 lg:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center">
              <Link
                href="/"
                className="relative block h-9 w-28 shrink-0 transition-opacity hover:opacity-90 sm:h-10 sm:w-32"
                onClick={closeMobile}
              >
                <Image
                  src="/images/logo/4Life_LOGO_BLUE.png"
                  alt="4Life 로고, 홈으로 이동"
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 640px) 7rem, 8rem"
                  priority
                />
              </Link>
            </div>

            <nav
              className="hidden items-center gap-1 lg:flex lg:gap-2"
              aria-label="주요 메뉴"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="min-h-[44px] min-w-[44px] content-center rounded-md px-3 py-2 text-sm font-medium text-deep-blue/90 transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/40"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              className="flex min-h-12 min-w-12 items-center justify-center text-deep-blue  lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls={mobileMenuId}
              aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
              onClick={toggleMobile}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </header>

      {/*
        모바일 전용 오버레이: `lg:hidden`으로 데스크톱에서는 DOM에 있어도 보이지 않음.
        닫힌 상태: 화면 밖(`translate-x-full`) + 딤 투명 + 포인터 무시 — 애니메이션만 유지.
      */}
      <div className="lg:hidden" aria-hidden={!mobileOpen}>
        <div
          role="presentation"
          className={`fixed inset-0 z-40 bg-deep-blue/25 backdrop-blur-[2px] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
            mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={closeMobile}
        />

        <div
          id={mobileMenuId}
          role="dialog"
          aria-modal="true"
          aria-label="주요 메뉴"
          tabIndex={-1}
          data-open={mobileOpen}
          onKeyDown={onDrawerKeyDown}
          className={`fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] max-w-[100vw] flex-col border-l border-border bg-card shadow-2xl shadow-deep-blue/20 transition-transform duration-300 ease-out motion-reduce:transition-none ${
            mobileOpen
              ? "translate-x-0"
              : "pointer-events-none translate-x-full"
          }`}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-semibold text-deep-blue">메뉴</p>
            <button
              type="button"
              className="rounded-md p-2 text-deep-blue transition-colors hover:bg-secondary"
              aria-label="메뉴 닫기"
              tabIndex={mobileOpen ? 0 : -1}
              onClick={closeMobile}
            >
              <MenuIcon open />
            </button>
          </div>
          <nav
            className="min-h-0 flex-1 overflow-y-auto py-2"
            aria-label="주요 메뉴"
          >
            <ul className="flex flex-col gap-0.5 px-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    tabIndex={mobileOpen ? 0 : -1}
                    className="block rounded-md px-3 py-3 text-base font-medium text-deep-blue/90 transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/40"
                    onClick={closeMobile}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
