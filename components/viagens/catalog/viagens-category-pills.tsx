"use client";

import { ViagemCategory, type ViagemCategoryMeta } from "@/lib/types/viagens";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ViagensCategoryPillsProps = {
  categories: readonly ViagemCategoryMeta[];
  selectedCategoryId: ViagemCategory;
  onSelect: (categoryId: ViagemCategory) => void;
};

export function ViagensCategoryPills({
  categories,
  selectedCategoryId,
  onSelect,
}: ViagensCategoryPillsProps): ReactNode {
  return (
    <div
      className="scrollbar-hide flex gap-2 overflow-x-auto overscroll-x-contain pb-1 lg:hidden [-webkit-overflow-scrolling:touch]"
      role="tablist"
      aria-label="Tipo de viagem"
    >
      {categories.map((category) => {
        const isActive = selectedCategoryId === category.id;

        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(category.id)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.14em] transition-colors",
              isActive
                ? "border-primary/25 bg-primary text-primary-foreground"
                : "border-border/60 bg-white/90 text-foreground/80 hover:border-primary/30",
            )}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
