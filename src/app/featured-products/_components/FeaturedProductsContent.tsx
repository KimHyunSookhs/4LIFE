/**
 * [대표상품] 목록/강조 영역
 * - 실제 쇼핑몰에선 `ListView`/`GridView`에 해당하는 그리드로 상품 카드를 배치한다.
 */

export function FeaturedProductsContent() {
  return (
    <section
      className="mx-auto w-full max-w-5xl"
      aria-labelledby="featured-products-heading"
    >
      <h2
        id="featured-products-heading"
        className="text-2xl font-semibold tracking-tight text-deep-blue sm:text-3xl"
      >
        대표상품
      </h2>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        면역력 증진에 도움을 줄 수 있는 대표 제품을 이 섹션에 정리해 두면
        됩니다. 상품 카드, 가격, 구매/문의 CTA는 추후 연동하면 됩니다.
      </p>
    </section>
  );
}
