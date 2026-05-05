"use client";

import { Search } from "lucide-react";
import { useId, useRef, useState } from "react";

const TABS = [
  { id: "all", label: "ALL" },
  { id: "transfer-factor", label: "트랜스퍼펙터제품" },
  { id: "healthcare", label: "헬스케어제품" },
  { id: "aqua", label: "믈 아쿠아제품" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ProductsTab() {
  const [activeId, setActiveId] = useState<TabId>("all");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const uid = useId();
  const searchFieldId = `${uid}-search`;

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
      </div>
    </section>
  );
}
