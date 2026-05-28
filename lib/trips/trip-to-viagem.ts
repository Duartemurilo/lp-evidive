import {
  tripExperienceTypesToViagemCategories,
  type TripExperienceType,
} from "@/lib/trips/trip-experience-types";
import type { TripRecord } from "@/lib/types/trip-admin";
import {
  ViagemCategory,
  ViagemRegion,
  ViagemScope,
  type Viagem,
} from "@/lib/types/viagens";
import { resolveViagemHeroImageUrl } from "@/lib/viagens-config";

function scopeFromCategory(category: TripRecord["category"]): {
  scope: ViagemScope;
  scopeLabel: string;
} {
  if (category === "nacional") {
    return { scope: ViagemScope.Nacional, scopeLabel: "Nacional" };
  }
  return { scope: ViagemScope.Internacional, scopeLabel: "Internacional" };
}

/** Mapeia viagem do admin/DB para o card do catálogo público. */
export function tripRecordToViagem(
  trip: TripRecord,
  options?: { dateSlotIds?: readonly string[] },
): Viagem {
  const { scope, scopeLabel } = scopeFromCategory(trip.category);
  const imageSrc =
    resolveViagemHeroImageUrl(trip.heroImageUrl) ?? "/backgrounds/bg-viagens-hero.jpg";

  const experienceCategories = tripExperienceTypesToViagemCategories(
    trip.experienceTypes,
  );

  return {
    id: trip.id,
    slug: trip.slug,
    title: trip.title,
    scope,
    scopeLabel,
    description: trip.shortDescription,
    region: trip.category === "nacional" ? ViagemRegion.Brasil : ViagemRegion.Caribe,
    regionLabel: trip.category === "nacional" ? "Brasil" : "Caribe",
    startDate: trip.startDate ?? new Date().toISOString().slice(0, 10),
    categories: experienceCategories,
    imageSrc,
    imageAlt: trip.title,
    dateSlotIds: options?.dateSlotIds ?? [],
  };
}

export function isTripExperienceType(value: string): value is TripExperienceType {
  return (
    value === "open-water-plus" ||
    value === "advanced-plus" ||
    value === "liveaboard" ||
    value === "resort" ||
    value === "expedicao" ||
    value === "fotografia" ||
    value === "vida-marinha"
  );
}

/** Categorias de filtro do catálogo (sem “Todos” e “Próximas datas”). */
export function getCatalogExperienceCategories(): {
  id: ViagemCategory;
  label: string;
}[] {
  return [
    { id: ViagemCategory.OpenWaterPlus, label: "Open Water+" },
    { id: ViagemCategory.AdvancedPlus, label: "Advanced+" },
    { id: ViagemCategory.Liveaboard, label: "Liveaboard" },
    { id: ViagemCategory.Resort, label: "Resort" },
    { id: ViagemCategory.Expedicao, label: "Expedição" },
    { id: ViagemCategory.Fotografia, label: "Fotografia" },
    { id: ViagemCategory.VidaMarinha, label: "Vida marinha" },
  ];
}
