import type { TripStatus } from "@/lib/types/trip-admin";
import type { Viagem } from "@/lib/types/viagens";

export function getViagemDetailPath(slug: string): string {
  return `/viagens/${slug}`;
}

/** Public detail page exists only for published trips. */
export function getPublishedTripPublicPageHref(trip: {
  status: TripStatus;
  slug: string;
}): string | null {
  if (trip.status !== "publicado" || !trip.slug.trim()) {
    return null;
  }
  return getViagemDetailPath(trip.slug.trim());
}

export function getViagemDetailHref(trip: Pick<Viagem, "slug">): string {
  return getViagemDetailPath(trip.slug);
}

/** Todas as viagens publicadas no catálogo têm página de detalhe em `/viagens/[slug]`. */
export function hasViagemDetailPage(_slug: string): boolean {
  return true;
}
