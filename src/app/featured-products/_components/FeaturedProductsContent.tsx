import { RepresentativeProductPanel } from "./RepresentativeProductPanel";
import { representativeProducts } from "./representative-products";

/**
 * [대표상품] 히어로 이후 대표 제품 섹션.
 * - 태그는 SEO/구조화 데이터 확장용으로 데이터에만 보관하고 화면에는 노출하지 않는다.
 */

export function FeaturedProductsContent() {
  return (
    <section
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-[#d8dbe0] min-h-svh"
      aria-labelledby="featured-products-heading"
    >
      <h2 id="featured-products-heading" className="sr-only">
        대표 제품
      </h2>
      <div className="grid min-h-svh grid-cols-1 grid-rows-3 lg:grid-cols-3 lg:grid-rows-1">
        {representativeProducts.map((product, index) => (
          <RepresentativeProductPanel
            key={product.id}
            product={product}
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
