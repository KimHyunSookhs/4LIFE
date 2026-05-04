import type { Metadata } from "next";
import { SectionHero } from "@/src/components/common/SectionHero";
import { ContactContent } from "./_components/ContactContent";

/**
 * /contact — 문의하기
 */

export const metadata: Metadata = {
  title: "문의하기",
  description: "상품 및 건강 상담 문의는 여기로 연락 주세요.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-secondary">
      <SectionHero
        label="CONTACT"
        title="나에게 맞는 면역 상담을 시작하세요"
        description="건강 고민과 생활 패턴에 맞춰 필요한 정보를 차분하게 안내해 드립니다."
      />
      <div className="px-4 py-16 sm:py-20">
        <ContactContent />
      </div>
    </div>
  );
}
