"use client";

import { ViagemCategory, type ViagemCategoryMeta, type ViagemDateSlot } from "@/lib/types/viagens";
import {
  viagemScopeFilterOptions,
  type ViagemScopeFilterId,
} from "@/lib/viagens-catalog-filters-ui";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

type ViagensCatalogFiltersProps = {
  dateSlots: readonly ViagemDateSlot[];
  categories: readonly ViagemCategoryMeta[];
  selectedDateSlotId: string | null;
  selectedScopeId: ViagemScopeFilterId;
  selectedCategoryId: ViagemCategory;
  onDateSlotChange: (slotId: string | null) => void;
  onScopeChange: (scopeId: ViagemScopeFilterId) => void;
  onCategoryChange: (categoryId: ViagemCategory) => void;
  className?: string;
};

function FilterGroup({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}): ReactNode {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border/50 pb-5 last:border-b-0 last:pb-0 lg:pb-7">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full cursor-pointer items-center justify-between gap-3 text-left"
        aria-expanded={open}
      >
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground lg:text-base lg:tracking-[0.18em]">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 lg:h-5 lg:w-5",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {open ? <div className="mt-4 space-y-1.5 lg:mt-5 lg:space-y-2">{children}</div> : null}
    </div>
  );
}

export function ViagensCatalogFilters({
  dateSlots,
  categories,
  selectedDateSlotId,
  selectedScopeId,
  selectedCategoryId,
  onDateSlotChange,
  onScopeChange,
  onCategoryChange,
  className,
}: ViagensCatalogFiltersProps): ReactNode {
  return (
    <aside className={cn("min-w-0", className)} aria-label="Filtros de viagens">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground lg:text-lg lg:tracking-[0.16em]">
        Filtros
      </p>

      <div className="mt-6 space-y-6 lg:mt-8 lg:space-y-8">
        <FilterGroup title="Datas">
          <button
            type="button"
            onClick={() => onDateSlotChange(null)}
            className={cn(
              "flex w-full flex-col rounded-lg px-3 py-2.5 text-left transition-colors lg:rounded-xl lg:px-4 lg:py-3.5",
              selectedDateSlotId === null
                ? "bg-primary text-primary-foreground"
                : "text-foreground/80 hover:bg-muted/80",
            )}
          >
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] lg:text-base lg:tracking-[0.12em]">
              Todas
            </span>
          </button>
          {dateSlots.map((slot) => {
            const isActive = selectedDateSlotId === slot.id;
            const isEmpty = slot.tripId === null;

            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => onDateSlotChange(slot.id)}
                className={cn(
                  "flex w-full flex-col rounded-lg px-3 py-2.5 text-left transition-colors lg:rounded-xl lg:px-4 lg:py-3.5",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-muted/80",
                  isEmpty && !isActive && "opacity-55",
                )}
              >
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] lg:text-base lg:tracking-[0.12em]">
                  {slot.monthLabel}
                </span>
                <span
                  className={cn(
                    "mt-0.5 text-sm lg:mt-1 lg:text-lg",
                    isActive ? "text-primary-foreground/85" : "text-muted-foreground",
                  )}
                >
                  {slot.destinationLabel}
                </span>
              </button>
            );
          })}
        </FilterGroup>

        <FilterGroup title="Destino" defaultOpen>
          {viagemScopeFilterOptions.map((option) => {
            const isActive = selectedScopeId === option.id;

            return (
              <button
                key={option.id ?? "todos"}
                type="button"
                onClick={() => onScopeChange(option.id)}
                className={cn(
                  "w-full rounded-lg px-3 py-2.5 text-left text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-colors lg:rounded-xl lg:px-4 lg:py-3.5 lg:text-base lg:tracking-[0.12em]",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-muted/80",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </FilterGroup>

        <FilterGroup title="Tipo" defaultOpen>
          {categories.map((category) => {
            const isActive = selectedCategoryId === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "w-full rounded-lg px-3 py-2.5 text-left text-[0.68rem] font-semibold uppercase tracking-[0.14em] transition-colors lg:rounded-xl lg:px-4 lg:py-3.5 lg:text-base lg:tracking-[0.12em]",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-muted/80",
                )}
              >
                {category.label}
              </button>
            );
          })}
        </FilterGroup>
      </div>
    </aside>
  );
}
