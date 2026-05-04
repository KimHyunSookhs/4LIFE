"use client";

/**
 * [애니메이션] 성과 지표 숫자 카운트업
 *
 * - 뷰포트에 한 번 진입(`useInView` once) 시 0 → 목표값으로 올라감.
 * - `toLocaleString`으로 천 단위 쉼표(예: 1,000) 표시 — 한국어 페이지에 맞춤.
 * - `prefers-reduced-motion: reduce`일 때는 애니메이션 없이 즉시 목표값 표시(노년층·시각민감 사용자 배려).
 *
 * Flutter 비유: `ScrollController`로 스크롤 위치를 감지한 뒤, 한 번만 실행되는
 * `TweenAnimationBuilder` 또는 짧은 `AnimationController`로 숫자만 바꿔 주는 위젯과 비슷합니다.
 */

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type MetricCounterProps = {
  /** 목표 숫자(정수 기준, 내부에서 소수 처리 가능) */
  value: number;
  /** 소수 자릿수(기본 0) */
  decimals?: number;
  /** 숫자 뒤에 붙는 문자열(예: "+", "% 이상", "년 이상") */
  suffix?: string;
  /** 숫자 앞 접두어(거의 쓰지 않음) */
  prefix?: string;
  /** true면 `locale`로 천 단위 구분(한국은 쉼표) */
  groupThousands?: boolean;
  /** `toLocaleString` 용 로케일 */
  locale?: string;
  /** 카운트 지속 시간(초). 기본은 조금 여유 있게(과하게 튀지 않는 easeOut) */
  duration?: number;
  className?: string;
};

function formatMetricDisplay(
  n: number,
  decimals: number,
  groupThousands: boolean,
  locale: string,
): string {
  const rounded = decimals > 0 ? n : Math.round(n);
  if (groupThousands) {
    return rounded.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return decimals > 0 ? rounded.toFixed(decimals) : String(rounded);
}

export function MetricCounter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  groupThousands = false,
  locale = "ko-KR",
  duration = 1.4,
  className,
}: MetricCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [display, setDisplay] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, value, {
      duration: reduceMotion ? 0 : duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduceMotion]);

  const text = formatMetricDisplay(display, decimals, groupThousands, locale);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
