"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

/**
 * 뷰포트 너비에 따라 모바일 / 태블릿 / PC 구간을 나누는 훅.
 *
 * - Tailwind 기본 breakpoint와 맞춤: `sm` 640px, `lg` 1024px.
 * - SSR·첫 페인트: `react-responsive`는 서버에서 쿼리 결과를 알 수 없어, 마운트 전에는
 *   세 값이 모두 `false`이고 `isReady`도 `false`입니다. **레이아웃(그리드·숨김 등)은
 *   가능하면 `sm:` / `lg:` 유틸로 처리**하고, 이 훅은 `sizes` 같은 보조 값·인터랙션에 쓰면
 *   하이드레이션 불일치를 줄일 수 있습니다.
 *
 * - Flutter 비유: `MediaQuery.of(context).size.width`를 한 번에 해석해
 *   `isMobile / isTablet / isDesktop` 플래그로 만드는 것과 비슷합니다. 다만 웹은
 *   서버 HTML이 먼저 나가므로, “첫 프레임”에는 너비를 모른다고 두는 편이 안전합니다.
 */

export type ResponsiveBreakpoints = {
  /** ~639px (Tailwind `sm` 미만) */
  isMobile: boolean;
  /** 640px ~ 1023px */
  isTablet: boolean;
  /** 1024px 이상 (`lg` 이상) */
  isPc: boolean;
  /**
   * 클라이언트에서 미디어쿼리를 구독하기 시작했는지.
   * `false`일 때는 위 세 값이 아직 의미 없음(모두 false).
   */
  isReady: boolean;
};

const useResponsive = (): ResponsiveBreakpoints => {
  const [isReady, setIsReady] = useState(false);

  // useLayoutEffect: useEffect보다 페인트 직전에 실행되어, 마운트 직후 레이아웃 보정이 조금 빨라짐
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    setIsReady(true);
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 639 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const isPc = useMediaQuery({ minWidth: 1024 });

  if (!isReady) {
    return {
      isMobile: false,
      isTablet: false,
      isPc: false,
      isReady: false,
    };
  }

  return { isMobile, isTablet, isPc, isReady: true };
};

export { useResponsive };
export default useResponsive;
