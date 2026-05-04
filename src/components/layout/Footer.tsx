import Link from "next/link";

/**
 * 전역 푸터 — 연락처는 데모용 예시 값입니다. 실제 운영 시 교체하세요.
 */
export function Footer() {
  return (
    <footer
      className="relative isolate overflow-hidden border-t border-white/10 bg-[#060B18] text-card/90"
      aria-labelledby="footer-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_55%_at_50%_-8%,rgba(255,255,255,0.055),transparent_52%),radial-gradient(circle_at_18%_0%,rgba(111,134,199,0.05),transparent_40%)]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-12">
        <h2 id="footer-heading" className="sr-only">
          사업자 정보
        </h2>
        <p className="text-sm font-semibold text-white sm:text-base">4Life 건강 상담</p>
        <dl className="mt-6 grid gap-4 text-sm leading-7 text-white/76 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-3 sm:text-[0.9375rem]">
          <div>
            <dt className="font-medium text-white/55">대표</dt>
            <dd className="mt-0.5">박연복</dd>
          </div>
          <div>
            <dt className="font-medium text-white/55">이메일</dt>
            <dd className="mt-0.5">
              <Link
                href="mailto:contact@4life-wellness.example"
                className="text-secondary-bright underline-offset-2 hover:text-white hover:underline"
              >
                contact@4life-wellness.example
              </Link>
            </dd>
          </div>
          <div>
            <dt className="font-medium text-white/55">전화</dt>
            <dd className="mt-0.5">
              <Link
                href="tel:+82212345678"
                className="text-secondary-bright underline-offset-2 hover:text-white hover:underline"
              >
                02-1234-5678
              </Link>
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-medium text-white/55">주소</dt>
            <dd className="mt-0.5">
              서울특별시 강남구 테헤란로 123, 4Life 빌딩 10층 (우편번호 06234)
            </dd>
          </div>
        </dl>
        <p className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/45">
          © {new Date().getFullYear()} 4Life. 예시 정보이며 실제와 다를 수 있습니다.
        </p>
      </div>
    </footer>
  );
}
