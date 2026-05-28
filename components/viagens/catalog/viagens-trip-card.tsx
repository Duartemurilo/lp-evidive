"use client";

import { formatTripFormDatePreview } from "@/lib/trips/format";
import { ViagemScope, type Viagem } from "@/lib/types/viagens";
import { getViagemDetailHref } from "@/lib/viagens-trip-pages";
import { reducedMotionVariants, useReducedMotion } from "@/lib/motion";
import { motion, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

type ViagensTripCardProps = {
  trip: Viagem;
  variants?: Variants;
};

function showScopeChip(scope: ViagemScope): boolean {
  return scope === ViagemScope.Nacional || scope === ViagemScope.Internacional;
}

export function ViagensTripCard({ trip, variants }: ViagensTripCardProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = prefersReducedMotion ? reducedMotionVariants : (variants ?? cardReveal);
  const destinationHref = getViagemDetailHref(trip);
  const dateLine = formatTripFormDatePreview({ startDate: trip.startDate, endDate: null });
  const scopeChipVisible = showScopeChip(trip.scope);

  const cardBody = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[5/3]">
        <Image
          src={trip.imageSrc}
          alt={trip.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover/trip:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[rgba(4,24,32,0.55)] to-transparent"
        />
        {scopeChipVisible ? (
          <span className="absolute left-4 top-4 z-10 rounded-sm bg-primary/90 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm md:text-[0.68rem]">
            {trip.scopeLabel}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 md:gap-4 md:p-5">
        {dateLine ? (
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground md:text-xs md:tracking-[0.12em]">
            {dateLine}
          </p>
        ) : null}
        <h3 className="font-display text-[clamp(1.2rem,2.4vw,1.45rem)] font-bold leading-tight tracking-tight text-foreground">
          {trip.title}
        </h3>
        <span className="mt-auto inline-flex items-center gap-1 self-end text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary transition-colors group-hover/trip:text-primary/80 md:text-xs">
          Ver destino »
        </span>
      </div>
    </>
  );

  const cardClassName =
    "group/trip flex h-full flex-col overflow-hidden rounded-2xl border border-border/40 bg-[#f4f2ee] shadow-[0_10px_36px_rgba(8,32,42,0.08)] transition-[border-color,box-shadow] duration-300 hover:border-primary/20 hover:shadow-[0_14px_40px_rgba(8,32,42,0.12)]";

  return (
    <motion.div variants={motionVariants} className="h-full">
      <Link
        href={destinationHref}
        className={cardClassName}
        aria-label={`Ver destino ${trip.title}`}
      >
        {cardBody}
      </Link>
    </motion.div>
  );
}
