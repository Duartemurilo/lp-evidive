"use client";

import {
  defaultViagensCatalogFilters,
  viagemScopeFilterOptions,
  type ViagensCatalogFilterState,
} from "@/lib/viagens-catalog-filters-ui";
import type { ViagemCategoryMeta, ViagemDateSlot } from "@/lib/types/viagens";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type ViagensCatalogFiltersSheetProps = {
  open: boolean;
  onClose: () => void;
  dateSlots: readonly ViagemDateSlot[];
  categories: readonly ViagemCategoryMeta[];
  appliedFilters: ViagensCatalogFilterState;
  onApply: (filters: ViagensCatalogFilterState) => void;
};

function SheetOption({
  label,
  detail,
  isActive,
  onSelect,
}: {
  label: string;
  detail?: string;
  isActive: boolean;
  onSelect: () => void;
}): ReactNode {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full cursor-pointer flex-col rounded-xl px-4 py-3.5 text-left transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-muted/60 text-foreground hover:bg-muted",
      )}
    >
      <span className="text-sm font-semibold uppercase tracking-[0.12em]">{label}</span>
      {detail ? (
        <span
          className={cn(
            "mt-1 text-base",
            isActive ? "text-primary-foreground/85" : "text-muted-foreground",
          )}
        >
          {detail}
        </span>
      ) : null}
    </button>
  );
}

export function ViagensCatalogFiltersSheet({
  open,
  onClose,
  dateSlots,
  categories,
  appliedFilters,
  onApply,
}: ViagensCatalogFiltersSheetProps): ReactNode {
  const [draft, setDraft] = useState<ViagensCatalogFilterState>(appliedFilters);

  useEffect(() => {
    if (open) {
      setDraft(appliedFilters);
    }
  }, [open, appliedFilters]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  const handleClear = () => {
    setDraft(defaultViagensCatalogFilters);
  };

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] lg:hidden" role="presentation">
          <motion.button
            type="button"
            aria-label="Fechar filtros"
            className="absolute inset-0 cursor-default bg-foreground/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="viagens-filtros-sheet-title"
            className="absolute inset-x-0 bottom-0 flex max-h-[min(88dvh,640px)] flex-col overflow-hidden rounded-t-3xl bg-background shadow-[0_-24px_80px_rgba(8,32,42,0.22)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.38, ease: easeOut }}
          >
            <div className="flex shrink-0 items-center justify-between border-b border-border/50 px-5 py-4">
              <h3
                id="viagens-filtros-sheet-title"
                className="font-display text-xl font-bold tracking-tight text-foreground"
              >
                Filtros
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border/60 text-foreground/70 transition-colors hover:bg-muted"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
              <div className="space-y-8">
                <div>
                  <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Datas
                  </p>
                  <div className="space-y-2">
                    <SheetOption
                      label="Todas"
                      isActive={draft.dateSlotId === null}
                      onSelect={() => setDraft((prev) => ({ ...prev, dateSlotId: null }))}
                    />
                    {dateSlots.map((slot) => (
                      <SheetOption
                        key={slot.id}
                        label={slot.monthLabel}
                        detail={slot.destinationLabel}
                        isActive={draft.dateSlotId === slot.id}
                        onSelect={() =>
                          setDraft((prev) => ({ ...prev, dateSlotId: slot.id }))
                        }
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Destino
                  </p>
                  <div className="space-y-2">
                    {viagemScopeFilterOptions.map((option) => (
                      <SheetOption
                        key={option.id ?? "todos"}
                        label={option.label}
                        isActive={draft.scopeId === option.id}
                        onSelect={() =>
                          setDraft((prev) => ({ ...prev, scopeId: option.id }))
                        }
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Tipo
                  </p>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <SheetOption
                        key={category.id}
                        label={category.label}
                        isActive={draft.categoryId === category.id}
                        onSelect={() =>
                          setDraft((prev) => ({ ...prev, categoryId: category.id }))
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-border/50 bg-background px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleClear}
                  className="cursor-pointer rounded-full border border-border/70 px-4 py-3.5 text-sm font-semibold text-foreground/80 transition-colors hover:bg-muted"
                >
                  Limpar
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="cursor-pointer rounded-full bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_28px_rgba(30,196,180,0.28)] transition-colors hover:bg-[#1ad4c3]"
                >
                  Aplicar filtros
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
