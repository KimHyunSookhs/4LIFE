import Image from "next/image";

import { Button } from "@/src/components/common/Button";

/**
 * 홈 브랜드 + 제품 신뢰 섹션.
 *
 * 흐름:
 * 1. "많은 분들이 선택하는 이유"로 섹션 목적을 먼저 안내
 * 2. `면역은 포라이프` 슬로건 이미지로 브랜드 메시지 각인
 * 3. "전 세계적으로 사용되는 건강 관리 제품" 문구로 제품 신뢰 연결
 * 4. 제품 모음 이미지 + CTA 버튼으로 다음 행동 유도
 *
 * 디자인 방향:
 * - 노년층 타겟을 고려해 과한 애니메이션 없이, 큰 글자·넉넉한 여백·차분한 색을 사용한다.
 *
 * Flutter 비유:
 * - `Column` 안에 `Text`, `ClipRRect(Image.asset)`, `Text`, `ClipRRect(Image.asset)`, `Row(Button...)`
 *   를 순서대로 배치한 섹션과 비슷합니다. 이미지 카드의 `rounded-2xl`은 Flutter의
 *   `ClipRRect(borderRadius: ...)` + `Container(decoration: BoxDecoration(boxShadow: ...))` 조합에 가깝습니다.
 */

const PRODUCT_IMAGE = {
  slogan: {
    src: "/images/slogan.png",
    alt: "면역은 포라이프 슬로건 이미지",
  },
  products: {
    src: "/images/products/products.png",
    alt: "포라이프 건강 관리 제품 모음 이미지",
  },
} as const;

export function HomeProductSection() {
  return (
    <section
      className="bg-linear-to-b from-background via-white to-secondary/70 px-4 py-12 sm:px-5 sm:py-16"
      aria-labelledby="home-product-heading"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="text-2xl font-semibold text-primary sm:text-2xl">
            믿고 선택하는 건강 관리
          </h3>
          <h2
            id="home-product-heading"
            className="mt-2 text-4xl font-bold tracking-tight text-deep-blue sm:text-4xl"
          >
            오직 면역만을 연구해온 <br /> 글로벌 브랜드
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            미국 본사의 글로벌 건강 관리 브랜드 포라이프(4Life)의 다양한 제품
            중,
            <br />
            고객의 건강 상태와 목적에 맞춰 가장 적합한 제품을 추천드립니다.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl sm:mt-10 ">
          <div className="relative aspect-[2.4/1] overflow-hidden rounded-xl ">
            <Image
              src={PRODUCT_IMAGE.slogan.src}
              alt={PRODUCT_IMAGE.slogan.alt}
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="mx-auto mt-18 max-w-3xl text-center sm:mt-18">
          <h3 className="text-2xl font-semibold tracking-tight text-deep-blue sm:text-3xl ">
            어제보다 더 활기찬 내일을 만드는 습관
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            포라이프의 수많은 제품 중, 무엇을 먹어야 할지 더 이상 고민하지
            마세요. <br />
            전문가와 함께 현재 나에게 가장 시급한 영양소부터 차근차근
            채워드립니다.
          </p>
        </div>
        <div className="mx-auto  max-w-7xl ">
          <div className="relative aspect-4/3 overflow-hidden  sm:aspect-16/10">
            <Image
              src={PRODUCT_IMAGE.products.src}
              alt={PRODUCT_IMAGE.products.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </div>
        <div className="mt-8 flex w-full flex-col items-stretch gap-6 sm:flex-row sm:items-center sm:justify-center">
          <Button href="/featured-products" text="추천 제품 확인하기" />
          <Button
            href="/contact"
            variant="secondary"
            text="나에게 맞는 제품 상담받기"
          />
        </div>
      </div>
    </section>
  );
}
