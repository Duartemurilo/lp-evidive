"use client";

import { countActiveViagensCatalogFilters } from "@/lib/viagens-catalog-filters-ui";
import type { ViagensCatalogFilterState } from "@/lib/viagens-catalog-filters-ui";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type ViagensCatalogFiltersTriggerProps = {
  filters: ViagensCatalogFilterState;
  onClick: () => void;
  isOpen?: boolean;
  className?: string;
};

export function ViagensCatalogFiltersTrigger({
  filters,
  onClick,
  isOpen = false,
  className,
}: ViagensCatalogFiltersTriggerProps): ReactNode {
  const activeCount = countActiveViagensCatalogFilters(filters);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      className={cn(
        "inline-flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border border-border/80 bg-transparent px-4 py-3.5 text-left transition-colors hover:border-border hover:bg-muted/50 lg:hidden",
        className,
      )}
    >
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground/75">
        Filtros
        {activeCount > 0 ? (
          <span className="ml-2 text-primary">{activeCount}</span>
        ) : null}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-foreground/45" aria-hidden />
    </button>
  );
}
