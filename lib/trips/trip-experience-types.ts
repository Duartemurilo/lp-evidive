import { ViagemCategory } from "@/lib/types/viagens";
import type { TripExperienceType as PrismaTripExperienceType } from "@prisma/client";

export const TRIP_EXPERIENCE_TYPES = [
  "open-water-plus",
  "advanced-plus",
  "liveaboard",
  "resort",
  "expedicao",
  "fotografia",
  "vida-marinha",
] as const;

export type TripExperienceType = (typeof TRIP_EXPERIENCE_TYPES)[number];

export const TRIP_EXPERIENCE_TYPE_LABELS: Record<TripExperienceType, string> = {
  "open-water-plus": "Open Water+",
  "advanced-plus": "Advanced+",
  liveaboard: "Liveaboard",
  resort: "Resort",
  expedicao: "Expedição",
  fotografia: "Fotografia",
  "vida-marinha": "Vida marinha",
};

export const TRIP_EXPERIENCE_TYPE_OPTIONS = TRIP_EXPERIENCE_TYPES.map((value) => ({
  value,
  label: TRIP_EXPERIENCE_TYPE_LABELS[value],
}));

const prismaToAppMap: Record<PrismaTripExperienceType, TripExperienceType> = {
  OPEN_WATER_PLUS: "open-water-plus",
  ADVANCED_PLUS: "advanced-plus",
  LIVEABOARD: "liveaboard",
  RESORT: "resort",
  EXPEDICAO: "expedicao",
  FOTOGRAFIA: "fotografia",
  VIDA_MARINHA: "vida-marinha",
};

const appToPrismaMap: Record<TripExperienceType, PrismaTripExperienceType> = {
  "open-water-plus": "OPEN_WATER_PLUS",
  "advanced-plus": "ADVANCED_PLUS",
  liveaboard: "LIVEABOARD",
  resort: "RESORT",
  expedicao: "EXPEDICAO",
  fotografia: "FOTOGRAFIA",
  "vida-marinha": "VIDA_MARINHA",
};

const viagemCategoryMap: Record<TripExperienceType, ViagemCategory> = {
  "open-water-plus": ViagemCategory.OpenWaterPlus,
  "advanced-plus": ViagemCategory.AdvancedPlus,
  liveaboard: ViagemCategory.Liveaboard,
  resort: ViagemCategory.Resort,
  expedicao: ViagemCategory.Expedicao,
  fotografia: ViagemCategory.Fotografia,
  "vida-marinha": ViagemCategory.VidaMarinha,
};

export function prismaExperienceTypesToApp(
  types: PrismaTripExperienceType[] | null | undefined,
): TripExperienceType[] {
  if (!Array.isArray(types)) return [];
  return types.map((type) => prismaToAppMap[type]);
}

export function appExperienceTypesToPrisma(
  types: TripExperienceType[] | null | undefined,
): PrismaTripExperienceType[] {
  if (!Array.isArray(types)) return [];
  return types.map((type) => appToPrismaMap[type]);
}

export function tripExperienceTypesToViagemCategories(
  types: readonly TripExperienceType[] | null | undefined,
): ViagemCategory[] {
  if (!Array.isArray(types)) return [];
  return types.map((type) => viagemCategoryMap[type]);
}

export function formatTripExperienceTypesLabel(
  types: readonly TripExperienceType[] | null | undefined,
): string {
  if (!types || types.length === 0) return "—";
  return types.map((type) => TRIP_EXPERIENCE_TYPE_LABELS[type]).join(" · ");
}
