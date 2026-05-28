"use client";

import { ViagensTripCard } from "@/components/viagens/catalog/viagens-trip-card";
import { SectionTitle } from "@/components/section-title";
import type { Viagem } from "@/lib/types/viagens";
import { sectionTitleAccentOnLight } from "@/lib/typography";
import Link from "next/link";
import type { ReactNode } from "react";

type ViagemDetailRelatedTripsProps = {
  trips: readonly Viagem[];
};

export function ViagemDetailRelatedTrips({
  trips,
}: ViagemDetailRelatedTripsProps): ReactNode {
  if (trips.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="viagem-related-heading"
      className="border-t border-border/50 bg-background px-6 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          id="viagem-related-heading"
          sans="Veja outros destinos "
          display="de mergulho com a Evidive"
          sansClassName={sectionTitleAccentOnLight}
          displayClassName="text-primary"
        />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <ViagensTripCard key={trip.id} trip={trip} />
          ))}
        </div>
        <p className="mt-8">
          <Link
            href="/viagens"
            className="text-sm font-semibold uppercase tracking-[0.14em] text-primary hover:underline"
          >
            Ver todos os destinos
          </Link>
        </p>
      </div>
    </section>
  );
}
