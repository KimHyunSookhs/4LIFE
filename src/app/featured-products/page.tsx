import type { Metadata } from "next";
import { SectionHero } from "@/src/components/common/SectionHero";
import { FeaturedProductsContent } from "./_components/FeaturedProductsContent";

/**
 * /featured-products — 대표상품
 */

export const metadata: Metadata = {
  title: "대표상품",
  description: "면역·건강 대표 제품을 소개합니다.",
};

export default function FeaturedProductsPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-secondary">
      <SectionHero
        label="PRODUCT"
        title="대표상품"
        description="면역을 중심으로 일상의 활력과 균형을 돕는 4Life 대표 제품을 소개합니다."
      />
      <div className="px-4 py-16 sm:py-20">
        <FeaturedProductsContent />
      </div>
    </div>
  );
}
