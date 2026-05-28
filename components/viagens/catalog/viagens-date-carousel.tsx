"use client";

import type { ViagemDateSlot } from "@/lib/types/viagens";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, type RefObject, type ReactNode } from "react";

type ViagensDateCarouselProps = {
  dateSlots: readonly ViagemDateSlot[];
  selectedDateSlotId: string | null;
  onSelect: (slotId: string | null) => void;
  trackRef?: RefObject<HTMLDivElement | null>;
  onTrackMount?: (node: HTMLDivElement | null) => void;
};

const dateCarouselCardClass =
  "shrink-0 cursor-pointer rounded-2xl border px-5 py-4 transition-colors min-w-[7.25rem] sm:min-w-[8.5rem] md:px-6 md:py-5 md:min-w-[9.5rem]";

const dateCarouselSlotCardClass = cn(dateCarouselCardClass, "text-left");

const dateCarouselMonthClass =
  "block text-xs font-semibold uppercase tracking-[0.14em] sm:text-sm md:text-base md:tracking-[0.12em]";

const dateCarouselDestinationClass = "mt-1 block text-base sm:text-lg md:mt-1.5 md:text-xl";

export function ViagensDateCarousel({
  dateSlots,
  selectedDateSlotId,
  onSelect,
  trackRef,
  onTrackMount,
}: ViagensDateCarouselProps): ReactNode {
  const setTrackRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (trackRef) {
        trackRef.current = node;
      }
      onTrackMount?.(node);
    },
    [trackRef, onTrackMount],
  );

  return (
    <div className="relative min-w-0">
      <div
        ref={setTrackRef}
        className="scrollbar-hide flex items-stretch gap-3 overflow-x-auto overscroll-x-contain pb-1 md:gap-4 [-webkit-overflow-scrolling:touch]"
        role="tablist"
        aria-label="Datas de viagem"
      >
        <button
          type="button"
          role="tab"
          aria-selected={selectedDateSlotId === null}
          onClick={() => onSelect(null)}
          className={cn(
            dateCarouselCardClass,
            "flex items-center justify-center text-center",
            selectedDateSlotId === null
              ? "border-primary/25 bg-primary text-primary-foreground"
              : "border-border/60 bg-shore-sand text-foreground hover:border-primary/30",
          )}
        >
          <span className={dateCarouselMonthClass}>Todas</span>
        </button>

        {dateSlots.map((slot) => {
          const isActive = selectedDateSlotId === slot.id;
          const isEmpty = slot.tripId === null;

          return (
            <button
              key={slot.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(slot.id)}
              className={cn(
                dateCarouselSlotCardClass,
                isActive
                  ? "border-primary/25 bg-primary text-primary-foreground"
                  : "border-border/60 bg-shore-sand text-foreground hover:border-primary/30",
                isEmpty && !isActive && "opacity-60",
              )}
            >
              <span className={dateCarouselMonthClass}>{slot.monthLabel}</span>
              <span
                className={cn(
                  dateCarouselDestinationClass,
                  isActive ? "text-primary-foreground/85" : "text-muted-foreground",
                )}
              >
                {slot.destinationLabel}
              </span>
            </button>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-background to-transparent md:block" />
    </div>
  );
}

const carouselNavButtonClass =
  "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-border/60 bg-white/95 text-foreground transition-colors hover:border-primary/35 hover:text-primary";

export function ViagensDateCarouselNav({
  onPrev,
  onNext,
  canScrollLeft,
  canScrollRight,
}: {
  onPrev: () => void;
  onNext: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}): ReactNode {
  if (!canScrollLeft && !canScrollRight) {
    return null;
  }

  return (
    <div className="flex shrink-0 items-center gap-2">
      {canScrollLeft ? (
        <button
          type="button"
          onClick={onPrev}
          aria-label="Datas anteriores"
          className={carouselNavButtonClass}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
      ) : null}
      {canScrollRight ? (
        <button
          type="button"
          onClick={onNext}
          aria-label="Próximas datas"
          className={carouselNavButtonClass}
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      ) : null}
    </div>
  );
}
