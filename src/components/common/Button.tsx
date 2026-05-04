import Link, { type LinkProps } from "next/link";

/**
 * 앱 전반에서 재사용할 CTA 링크 버튼.
 * - `text`는 필수이며, 글자 크기·색은 Tailwind 클래스 문자열로 덮어쓸 수 있다.
 * - `variant`로 꺼림(Primary) / **아웃라인+연한 배경**(Secondary)을 고른다. Secondary는
 *   Primary와 같은 들림·그림자 호버만 주고, 평소에는 테두리와 옅은 `bg-secondary`로 대비를 낸다.
 * - `fullWidth`(기본 true): 모바일 `w-full`, `sm` 이상 `w-auto`. 링크는 `flex`로 두어
 *   `inline-flex`일 때 일부 환경에서 `w-full`이 덜 먹는 경우를 줄인다. false면 `w-fit`.

 */

/** 클래스 조각 처리용 (별도 `cn` 유틸 없이 최소 구현) */
function cx(...parts: Array<string | undefined | null | false>): string {
  return parts.filter(Boolean).join(" ");
}

export type ButtonProps = Omit<LinkProps, "className"> & {
  /** 버튼에 표시할 문구 (필수) */
  text: string;
  /** 글자 크기용 Tailwind 클래스. 기본 모바일 `text-base`, 웹(`sm`~) `text-lg` */
  textSizeClassName?: string;
  /** 글자 색용 Tailwind 클래스. variant별 기본값이 다름 */
  textColorClassName?: string;
  /** 시각 스타일 프리셋 */
  variant?: "primary" | "secondary";
  /**
   * true(기본): 모바일 `w-full`, `sm` 이상 `w-auto`(카드형 CTA에 적합).
   * false: 항상 `w-fit` — 라벨 길이에 맞춰 폭이 붙음(히어로 “상담하기” 등).
   */
  fullWidth?: boolean;
  className?: string;
};

const shellPrimaryBase =
  "flex min-h-12 items-center justify-center rounded-xl bg-primary px-6 py-3 text-center font-semibold shadow-md shadow-primary/20 ring-1 ring-primary/90 transition-[box-shadow,opacity,transform] duration-300 hover:-translate-y-0.5 hover:opacity-[0.97] hover:shadow-lg hover:shadow-primary/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/50 sm:min-h-14 sm:rounded-2xl sm:px-9 sm:py-4";

const shellSecondaryBase =
  "flex min-h-12 items-center justify-center rounded-xl border-2 border-primary/40 bg-secondary/30 px-6 py-3 text-center font-semibold shadow-none transition-[box-shadow,opacity,transform,colors,background-color,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/65 hover:bg-secondary/55 hover:text-primary hover:opacity-[0.98] hover:shadow-md hover:shadow-primary/18 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/40 sm:min-h-14 sm:rounded-2xl sm:px-9 sm:py-4";

const widthFull = "w-full sm:w-auto";
const widthFit = "w-fit";

export function Button({
  text,
  textSizeClassName = "text-base sm:text-lg",
  textColorClassName,
  variant = "primary",
  fullWidth = true,
  className,
  ...linkProps
}: ButtonProps) {
  const shellBase =
    variant === "secondary" ? shellSecondaryBase : shellPrimaryBase;
  const widthClass = fullWidth ? widthFull : widthFit;
  const defaultTextColor =
    variant === "secondary" ? "text-deep-blue" : "text-card";

  return (
    <Link
      {...linkProps}
      className={cx(
        shellBase,
        widthClass,
        textSizeClassName,
        textColorClassName ?? defaultTextColor,
        className,
      )}
    >
      {text}
    </Link>
  );
}
