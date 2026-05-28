"use client";

import { ViagemDetailBackLink } from "@/components/viagens/detail/viagem-detail-back-link";
import { ViagemDetailHero } from "@/components/viagens/detail/viagem-detail-hero";
import { ViagemDetailPageSections } from "@/components/viagens/detail/viagem-detail-page-sections";
import { ViagemDetailRelatedTrips } from "@/components/viagens/detail/viagem-detail-related-trips";
import { ViagemDetailScrollToTop } from "@/components/viagens/detail/viagem-detail-scroll-to-top";
import { formatTripFormDatePreview } from "@/lib/trips/format";
import type { PublicTrip } from "@/lib/types/trip-public";
import type { Viagem } from "@/lib/types/viagens";
import { buildViagemWhatsAppUrl } from "@/lib/viagens-whatsapp";
import { useRef, type ReactNode } from "react";

type ViagemDetailShellProps = {
  trip: PublicTrip;
  relatedTrips?: readonly Viagem[];
};

export function ViagemDetailShell({
  trip,
  relatedTrips = [],
}: ViagemDetailShellProps): ReactNode {
  const heroSentinelRef = useRef<HTMLDivElement>(null);
  const scopeLabel = trip.category === "nacional" ? "Nacional" : "Internacional";
  const dateLine = formatTripFormDatePreview({
    startDate: trip.startDate,
    endDate: trip.endDate,
  });
  const whatsappHref = buildViagemWhatsAppUrl({
    title: trip.title,
    slug: trip.slug,
    scopeLabel,
    startDate: trip.startDate,
    endDate: trip.endDate,
  });

  return (
    <>
      <ViagemDetailScrollToTop />
      <ViagemDetailBackLink
        destinationTitle={trip.title}
        heroSentinelRef={heroSentinelRef}
      />
      <div ref={heroSentinelRef}>
        <ViagemDetailHero
          title={trip.title}
          scopeLabel={scopeLabel}
          backgroundImageUrl={trip.heroImageUrl}
          dateLine={dateLine}
          ctaHref={whatsappHref}
        />
      </div>
      <ViagemDetailPageSections sections={trip.pageSections} />
      <ViagemDetailRelatedTrips trips={relatedTrips} />
    </>
  );
}
