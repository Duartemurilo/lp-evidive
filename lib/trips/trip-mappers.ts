import type { Trip as PrismaTrip, TripCategory, TripStatus } from "@prisma/client";
import type {
  TripCategory as AppTripCategory,
  TripFormValues,
  TripRecord,
  TripStatus as AppTripStatus,
} from "@/lib/types/trip-admin";
import {
  appExperienceTypesToPrisma,
  prismaExperienceTypesToApp,
} from "@/lib/trips/trip-experience-types";
import {
  deriveCardFieldsFromSections,
  legacyContentToPageSections,
  parseTripPageSections,
  type LegacyTripContent,
} from "@/lib/trips/trip-page-sections";

export function prismaCategoryToApp(
  category: TripCategory,
): AppTripCategory {
  return category === "NACIONAL" ? "nacional" : "internacional";
}

export function appCategoryToPrisma(
  category: AppTripCategory,
): TripCategory {
  return category === "nacional" ? "NACIONAL" : "INTERNACIONAL";
}

export function prismaStatusToApp(status: TripStatus): AppTripStatus {
  const map: Record<TripStatus, AppTripStatus> = {
    RASCUNHO: "rascunho",
    PUBLICADO: "publicado",
    ESGOTADO: "esgotado",
    ENCERRADO: "encerrado",
  };
  return map[status];
}

export function appStatusToPrisma(status: AppTripStatus): TripStatus {
  const map: Record<AppTripStatus, TripStatus> = {
    rascunho: "RASCUNHO",
    publicado: "PUBLICADO",
    esgotado: "ESGOTADO",
    encerrado: "ENCERRADO",
  };
  return map[status];
}

function formatDate(date: Date | null): string | null {
  if (!date) return null;
  return date.toISOString().slice(0, 10);
}

function parseStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function prismaTripToLegacyContent(trip: PrismaTrip): LegacyTripContent {
  const row = trip as PrismaTrip & Record<string, unknown>;

  return {
    title: trip.title,
    shortDescription: trip.shortDescription,
    heroImageUrl: trip.heroImageUrl,
    pageSubtitle: (row.pageSubtitle as string | null) ?? null,
    introText: (row.introText as string | null) ?? null,
    ctaLabel: (row.ctaLabel as string | null) ?? null,
    ctaUrl: (row.ctaUrl as string | null) ?? null,
    experienceTitle: (row.experienceTitle as string | null) ?? null,
    experienceText: (row.experienceText as string | null) ?? null,
    experienceImageUrl: (row.experienceImageUrl as string | null) ?? null,
    whyDiveTitle: (row.whyDiveTitle as string | null) ?? null,
    whyDiveText: (row.whyDiveText as string | null) ?? null,
    highlights: parseStringList(row.highlights),
    packageTitle: (row.packageTitle as string | null) ?? null,
    packageDescription: (row.packageDescription as string | null) ?? null,
    includedItems: parseStringList(row.includedItems),
    notIncludedItems: parseStringList(row.notIncludedItems),
    paymentCondition: (row.paymentCondition as string | null) ?? null,
    hasTransportSection: Boolean(row.hasTransportSection),
    transportTitle: (row.transportTitle as string | null) ?? null,
    transportDescription: (row.transportDescription as string | null) ?? null,
    transportNotes: (row.transportNotes as string | null) ?? null,
    hasAccommodationSection: Boolean(row.hasAccommodationSection),
    accommodationName: (row.accommodationName as string | null) ?? null,
    accommodationImageUrl: (row.accommodationImageUrl as string | null) ?? null,
    accommodationDescription: (row.accommodationDescription as string | null) ?? null,
    accommodationItems: parseStringList(row.accommodationItems),
    hasDiveInfoSection: Boolean(row.hasDiveInfoSection),
    diveInfoTitle: (row.diveInfoTitle as string | null) ?? null,
    diveInfoDescription: (row.diveInfoDescription as string | null) ?? null,
    waterTemperature: (row.waterTemperature as string | null) ?? null,
    visibility: (row.visibility as string | null) ?? null,
    depth: (row.depth as string | null) ?? null,
    diveSites: parseStringList(row.diveSites),
    underwaterAttractions: parseStringList(row.underwaterAttractions),
    partnerOperator: (row.partnerOperator as string | null) ?? null,
  };
}

export function tripToRecord(trip: PrismaTrip): TripRecord {
  const parsed = parseTripPageSections(
    (trip as PrismaTrip & { pageSections?: unknown }).pageSections,
  );
  const pageSections =
    parsed.length > 0 ? parsed : legacyContentToPageSections(prismaTripToLegacyContent(trip));
  const card = deriveCardFieldsFromSections(pageSections);

  return {
    id: trip.id,
    title: trip.title,
    slug: trip.slug,
    category: prismaCategoryToApp(trip.category),
    experienceTypes: prismaExperienceTypesToApp(trip.experienceTypes),
    location: trip.location,
    heroImageUrl: trip.heroImageUrl ?? card.heroImageUrl,
    shortDescription: trip.shortDescription || card.shortDescription,
    pageSections,
    status: prismaStatusToApp(trip.status),
    startDate: formatDate(trip.startDate),
    endDate: formatDate(trip.endDate),
    createdAt: trip.createdAt.toISOString(),
    updatedAt: trip.updatedAt.toISOString(),
    createdById: trip.createdById,
    updatedById: trip.updatedById,
  };
}

export function formValuesToPrismaInput(
  values: TripFormValues,
  userId?: string,
) {
  const card = deriveCardFieldsFromSections(values.pageSections);
  const firstSection = values.pageSections[0];

  return {
    title: values.title.trim(),
    slug: values.slug.trim(),
    category: appCategoryToPrisma(values.category),
    experienceTypes: appExperienceTypesToPrisma(values.experienceTypes),
    location: values.title.trim(),
    heroImageUrl: values.heroImageUrl?.trim() || card.heroImageUrl,
    shortDescription:
      card.shortDescription || firstSection?.subtitle.trim() || values.title.trim(),
    pageSections: values.pageSections,
    status: appStatusToPrisma(values.status),
    startDate: values.startDate ? new Date(values.startDate) : null,
    endDate: values.endDate ? new Date(values.endDate) : null,
    updatedById: userId ?? null,
  };
}

export function recordToFormValues(record: TripRecord): TripFormValues {
  return {
    title: record.title,
    slug: record.slug,
    category: record.category,
    experienceTypes: [...record.experienceTypes],
    heroImageUrl: record.heroImageUrl,
    startDate: record.startDate,
    endDate: record.endDate,
    status: record.status,
    pageSections: record.pageSections,
  };
}
