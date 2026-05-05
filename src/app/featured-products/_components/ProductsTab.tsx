"use client";

import { ArrowUpRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";

const TABS = [
  { id: "all", label: "ALL" },
  { id: "transfer-factor", label: "트랜스퍼펙터제품" },
  { id: "healthcare", label: "헬스케어제품" },
  { id: "aqua", label: "믈 아쿠아제품" },
] as const;

type TabId = (typeof TABS)[number]["id"];
type ProductCategoryId = Exclude<TabId, "all">;

type BestProduct = {
  id: string;
  name: string;
  imageUrl: string;
  categoryId: ProductCategoryId;
  detailUrl: string;
};

const OFFICIAL_MALL_URL = "https://korea.4life.com/";

const BEST_PRODUCTS_BY_CATEGORY: Record<ProductCategoryId, BestProduct[]> = {
  "transfer-factor": [
    {
      id: "트랜스퍼 팩터 플러스",
      name: "트랜스퍼 팩터 플러스",
      imageUrl: "/images/products/trans1.png",
      categoryId: "transfer-factor",
      detailUrl: OFFICIAL_MALL_URL,
    },
    {
      id: "트랜스퍼 팩터 티에프 씨브이",
      name: "트랜스퍼 팩터 티에프 씨브이",
      imageUrl: "/images/products/trans2.png",
      categoryId: "transfer-factor",
      detailUrl: OFFICIAL_MALL_URL,
    },
    {
      id: "트랜스퍼 팩터 리오비다",
      name: "트랜스퍼 팩터 리오비다",
      imageUrl: "/images/products/trans3.png",
      categoryId: "transfer-factor",
      detailUrl: OFFICIAL_MALL_URL,
    },
  ],
  healthcare: [
    {
      id: "health1",
      name: "health1",
      imageUrl: "/images/products/health1.png",
      categoryId: "healthcare",
      detailUrl: OFFICIAL_MALL_URL,
    },
    {
      id: "health2",
      name: "health2",
      imageUrl: "/images/products/health2.png",
      categoryId: "healthcare",
      detailUrl: OFFICIAL_MALL_URL,
    },
    {
      id: "health3",
      name: "health3",
      imageUrl: "/images/products/health3.png",
      categoryId: "healthcare",
      detailUrl: OFFICIAL_MALL_URL,
    },
  ],
  aqua: [
    {
      id: "aqua1",
      name: "aqua1",
      imageUrl: "/images/products/aqua1.png",
      categoryId: "aqua",
      detailUrl: OFFICIAL_MALL_URL,
    },
    {
      id: "aqua2",
      name: "aqua2",
      imageUrl: "/images/products/aqua2.png",
      categoryId: "aqua",
      detailUrl: OFFICIAL_MALL_URL,
    },
    {
      id: "aqua3",
      name: "aqua3",
      imageUrl: "/images/products/aqua3.png",
      categoryId: "aqua",
      detailUrl: OFFICIAL_MALL_URL,
    },
    {
      id: "aqua4",
      name: "aqua4",
      imageUrl: "/images/products/aqua4.png",
      categoryId: "aqua",
      detailUrl: OFFICIAL_MALL_URL,
    },
  ],
};

const ALL_BEST_PRODUCTS = Object.values(BEST_PRODUCTS_BY_CATEGORY).flat();

export function ProductsTab() {
  const [activeId, setActiveId] = useState<TabId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const uid = useId();
  const searchFieldId = `${uid}-search`;
  const products =
    activeId === "all"
      ? ALL_BEST_PRODUCTS
      : BEST_PRODUCTS_BY_CATEGORY[activeId as ProductCategoryId];
  const normalizedSearchQuery = searchQuery.trim().toLocaleLowerCase();
  const visibleProducts = normalizedSearchQuery
    ? products.filter((product) =>
        product.name.toLocaleLowerCase().includes(normalizedSearchQuery),
      )
    : products;

  return (
    <section
      className="bg-white px-6 py-12 text-neutral-900 sm:px-10 lg:px-12"
      aria-labelledby="products-tab-heading"
    >
      <div className="mx-auto max-w-[1400px]">
        <h2
          id="products-tab-heading"
          className="text-4xl font-bold tracking-tight sm:text-4xl"
        >
          PRODUCT
        </h2>

        <div className="mt-12 flex flex-col gap-6 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <nav aria-label="제품 카테고리" className="min-w-0">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 sm:gap-x-10">
              {TABS.map((tab) => {
                const isActive = activeId === tab.id;
                return (
                  <li key={tab.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      id={`${uid}-tab-${tab.id}`}
                      className={
                        isActive
                          ? "text-xl font-semibold text-neutral-900"
                          : "text-xl font-medium text-neutral-400 transition-colors hover:text-neutral-600"
                      }
                      onClick={() => setActiveId(tab.id)}
                    >
                      {tab.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="shrink-0">
            <div
              className="group relative h-11 w-11 overflow-hidden rounded-md bg-[#EEEEEE] transition-[width] duration-300 ease-out hover:w-64 focus-within:w-64 sm:hover:w-72 sm:focus-within:w-72"
              onMouseEnter={() => searchInputRef.current?.focus()}
            >
              <label htmlFor={searchFieldId} className="sr-only">
                제품 검색
              </label>
              <input
                ref={searchInputRef}
                id={searchFieldId}
                type="search"
                placeholder="검색"
                autoComplete="off"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="absolute inset-y-0 left-0 right-11 z-10 min-w-0 bg-transparent pl-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none pointer-events-none opacity-0 transition-opacity duration-200 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 z-20 flex w-11 items-center justify-center text-neutral-900"
                aria-label="검색"
                tabIndex={-1}
                onClick={() => searchInputRef.current?.focus()}
              >
                <Search className="size-[18px]" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <article key={product.id} className="group">
                <Link
                  href={product.detailUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${product.name} 제품 보러가기`}
                  className="block outline-none transition-transform duration-300 ease-out group-hover:-translate-y-1 group-focus-within:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-white">
                    <Image
                      src={product.imageUrl}
                      alt={`${product.name} 제품 이미지`}
                      fill
                      className="object-contain px-5 py-4 transition-transform duration-500 ease-out group-hover:scale-[1.06] group-focus-within:scale-[1.06]"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <span
                      className="absolute bottom-4 right-4 flex size-11 translate-y-2 items-center justify-center rounded-full bg-neutral-950 text-white opacity-0 shadow-[0_12px_28px_rgba(15,23,42,0.18)] transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
                      aria-hidden
                    >
                      <ArrowUpRight className="size-5" strokeWidth={2.3} />
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-neutral-900">
                    {product.name}
                  </h3>
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-20 flex w-full justify-center pb-24 pt-16 text-center">
            <div className="w-full max-w-3xl">
              <span className="text-lg font-semibold text-neutral-400">
                Official Mall
              </span>
              <h3 className="mt-5 text-4xl font-black tracking-tight text-neutral-950 sm:text-5xl">
                전체 제품 보러가기
              </h3>
              <p className="mt-6 text-lg font-medium leading-7 text-neutral-500">
                4Life 공식몰에서 더 많은 제품을 확인해보세요.
              </p>
              <Link
                href={OFFICIAL_MALL_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-10 inline-flex min-h-15 min-w-60 items-center justify-center gap-3 rounded-lg bg-deep-blue px-8 py-4 text-lg font-bold text-white shadow-[0_14px_32px_rgba(47,62,107,0.22)] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-[0_18px_42px_rgba(91,116,184,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                공식몰 이동
                <ArrowUpRight className="size-5" strokeWidth={2.4} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
