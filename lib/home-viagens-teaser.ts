import type { Viagem, ViagensCatalogResponse } from "@/lib/types/viagens";

export const homeViagensTeaserConfig = {
  id: "viagens-teaser",
  eyebrow: "Viagens",
  titleSans: "Seu próximo mergulho",
  titleDisplay: "pode estar longe daqui",
  subtitle:
    "Destinos selecionados, operação Evidive e grupo que mergulha junto — do Brasil ao Caribe e além.",
  cta: {
    label: "Ver todas as viagens",
    href: "/viagens",
  },
  /** Slugs preferidos quando existirem no catálogo publicado. */
  preferredSlugs: ["fernando-de-noronha", "bonaire", "ilha-grande"] as const,
} as const;

export function pickHomeFeaturedTrips(catalog: ViagensCatalogResponse): Viagem[] {
  const { trips, preferredSlugs } = { trips: catalog.trips, preferredSlugs: homeViagensTeaserConfig.preferredSlugs };
  const bySlug = new Map(trips.map((trip) => [trip.slug, trip]));

  const preferred = preferredSlugs
    .map((slug) => bySlug.get(slug))
    .filter((trip): trip is Viagem => trip !== undefined);

  if (preferred.length >= 3) {
    return preferred.slice(0, 3);
  }

  const usedSlugs = new Set(preferred.map((trip) => trip.slug));
  const rest = trips.filter((trip) => !usedSlugs.has(trip.slug));

  return [...preferred, ...rest].slice(0, 3);
}
