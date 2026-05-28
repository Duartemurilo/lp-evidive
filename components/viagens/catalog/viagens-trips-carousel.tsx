"use client";

import { ViagensTripCard } from "@/components/viagens/catalog/viagens-trip-card";
import type { Viagem } from "@/lib/types/viagens";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type ViagensTripsCarouselProps = {
  trips: readonly Viagem[];
  className?: string;
};

export function ViagensTripsCarousel({
  trips,
  className,
}: ViagensTripsCarouselProps): ReactNode {
  if (trips.length === 0) {
    return null;
  }

  return (
    <motion.div
      className={cn("relative -mx-6 lg:hidden", className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent"
      />

      <div
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-6 pb-2 [-webkit-overflow-scrolling:touch] [scroll-padding-inline:1.5rem]"
        role="list"
        aria-label="Viagens disponíveis"
      >
        {trips.map((trip) => (
          <div
            key={trip.id}
            role="listitem"
            className="w-[min(82vw,18.5rem)] shrink-0 snap-center"
          >
            <ViagensTripCard trip={trip} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
