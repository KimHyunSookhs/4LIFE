import Image from "next/image";
import Link from "next/link";
import type { RepresentativeProduct } from "./representative-products";

type RepresentativeProductPanelProps = {
  product: RepresentativeProduct;
  priority?: boolean;
};

export function RepresentativeProductPanel({
  product,
  priority = false,
}: RepresentativeProductPanelProps) {
  return (
    <Link
      href={product.actionLink}
      className="group relative isolate flex min-h-[72svh] overflow-hidden bg-[#d8dbe0] text-white focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-white/80 lg:min-h-[78svh]"
      aria-label={`${product.title} 자세히 보기`}
    >
      <Image
        src={product.imageUrl}
        alt={`${product.title} 이미지`}
        fill
        className="object-cover object-center grayscale-[18%] transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        sizes="(min-width: 1024px) 33vw, 100vw"
        priority={priority}
      />

      <div className="absolute inset-0 bg-black/22 transition-colors duration-500 group-hover:bg-black/12" />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,11,24,0.02)_0%,rgba(6,11,24,0.08)_42%,rgba(6,11,24,0.62)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_12%_100%,rgba(255,255,255,0.18),transparent_46%)] opacity-80"
        aria-hidden
      />

      <div className="relative z-10 mt-auto w-full px-7 pb-9 sm:px-10 sm:pb-12 lg:px-8 xl:px-10">
        <p className="text-sm font-semibold tracking-tight text-white/88 sm:text-base">
          {product.category}
        </p>
        <h3 className="mt-3 text-[clamp(2.5rem,10vw,4.25rem)] leading-[0.9] font-black tracking-[-0.08em] text-white sm:text-[clamp(3.25rem,8vw,5.25rem)] lg:text-[clamp(3rem,4.9vw,5.5rem)]">
          {product.title}
        </h3>
        <p className="mt-5 max-w-md text-sm leading-7 text-white/78 opacity-0 translate-y-3 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:text-base">
          {product.description}
        </p>
      </div>
    </Link>
  );
}
