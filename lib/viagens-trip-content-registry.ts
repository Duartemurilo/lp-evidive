import { bonaireTripPage } from "@/lib/data/viagens-trip-content/bonaire";
import { buziosTripPage } from "@/lib/data/viagens-trip-content/buzios";
import { enterpriseTripPage } from "@/lib/data/viagens-trip-content/enterprise";
import { fernandoDeNoronhaTripPage } from "@/lib/data/viagens-trip-content/fernando-de-noronha";
import { ilhaGrandeTripPage } from "@/lib/data/viagens-trip-content/ilha-grande";
import { lajeDeSantosTripPage } from "@/lib/data/viagens-trip-content/laje-de-santos";
import { paratyTripPage } from "@/lib/data/viagens-trip-content/paraty";
import type { ViagemTripPageContent } from "@/lib/types/viagem-trip-page";

const tripPagesBySlug: Record<string, ViagemTripPageContent> = {
  [fernandoDeNoronhaTripPage.slug]: fernandoDeNoronhaTripPage,
  [buziosTripPage.slug]: buziosTripPage,
  [enterpriseTripPage.slug]: enterpriseTripPage,
  [lajeDeSantosTripPage.slug]: lajeDeSantosTripPage,
  [ilhaGrandeTripPage.slug]: ilhaGrandeTripPage,
  [bonaireTripPage.slug]: bonaireTripPage,
  [paratyTripPage.slug]: paratyTripPage,
};

/** Conteúdo estático legado — páginas públicas usam `pageSections` da API. */
export function getViagemTripPageContent(
  slug: string,
): ViagemTripPageContent | undefined {
  return tripPagesBySlug[slug];
}
