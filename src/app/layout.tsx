import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/src/components/layout/Header";
import "./globals.css";
import { Footer } from "@/src/components/layout/Footer";
import { GoToTopButton } from "../components/layout/floating/GoToTopButton";
import { SiteCtaSection } from "../components/common/SiteCtaSection";

/**
 * 로컬에 둔 Noto Sans KR을 기본(산세리프) 폰트로 사용
 * - `public/fonts`의 파일을 `next/font/local`이 빌드 시 최적화(서브세팅 등)한다.
 * path는 이 파일(`src/app/layout.tsx`) 기준 상대 경로
 */
const notoSansKr = localFont({
  src: [
    {
      path: "../../public/fonts/NotoSansKR-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/fonts/NotoSansKR-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/NotoSansKR-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/NotoSansKR-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NotoSansKR-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/NotoSansKR-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/NotoSansKR-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/NotoSansKR-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/NotoSansKR-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-noto-sans-kr",
  display: "swap",
  // 로딩 전·실패 시: 시스템 한글 폰트 → 일반 sans
  fallback: [
    "Apple SD Gothic Neo",
    "Malgun Gothic",
    "맑은 고딕",
    "system-ui",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: {
    default: "4Life — 면역·건강",
    template: "%s | 4Life",
  },
  description: "면역력 증진에 도움을 줄 수 있는 건강 제품을 안내합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} h-full font-sans antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        <Header />
        <main id="main" className="flex min-h-0 flex-1 flex-col">
          {children}
        </main>
        <SiteCtaSection />
        <Footer />
        <div className="pointer-events-none fixed right-4 bottom-6 z-90 flex flex-col items-center gap-2 sm:right-6">
          <GoToTopButton />
        </div>
      </body>
    </html>
  );
}
