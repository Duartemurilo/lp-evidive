import type { TripPageSection } from "@/lib/types/trip-page-section";
import { createEmptyTripPageSection } from "@/lib/types/trip-page-section";

export type LegacyTripContent = {
  title: string;
  shortDescription: string;
  heroImageUrl: string | null;
  pageSubtitle?: string | null;
  introText?: string | null;
  ctaLabel?: string | null;
  ctaUrl?: string | null;
  experienceTitle?: string | null;
  experienceText?: string | null;
  experienceImageUrl?: string | null;
  whyDiveTitle?: string | null;
  whyDiveText?: string | null;
  highlights?: string[];
  packageTitle?: string | null;
  packageDescription?: string | null;
  includedItems?: string[];
  notIncludedItems?: string[];
  paymentCondition?: string | null;
  hasTransportSection?: boolean;
  transportTitle?: string | null;
  transportDescription?: string | null;
  transportNotes?: string | null;
  hasAccommodationSection?: boolean;
  accommodationName?: string | null;
  accommodationImageUrl?: string | null;
  accommodationDescription?: string | null;
  accommodationItems?: string[];
  hasDiveInfoSection?: boolean;
  diveInfoTitle?: string | null;
  diveInfoDescription?: string | null;
  waterTemperature?: string | null;
  visibility?: string | null;
  depth?: string | null;
  diveSites?: string[];
  underwaterAttractions?: string[];
  partnerOperator?: string | null;
};

function isTripPageSection(value: unknown): value is TripPageSection {
  if (!value || typeof value !== "object") return false;
  const section = value as TripPageSection;
  return (
    typeof section.id === "string" &&
    typeof section.title === "string" &&
    typeof section.subtitle === "string" &&
    typeof section.hasButton === "boolean"
  );
}

export function parseTripPageSections(value: unknown): TripPageSection[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isTripPageSection).map((section) => ({
    id: section.id,
    title: section.title,
    subtitle: section.subtitle,
    imageUrl: section.imageUrl?.trim() || null,
    hasButton: section.hasButton,
    buttonLabel: section.buttonLabel?.trim() || null,
    buttonUrl: section.buttonUrl?.trim() || null,
  }));
}

export function legacyContentToPageSections(
  record: LegacyTripContent,
): TripPageSection[] {
  const sections: TripPageSection[] = [];

  const push = (partial: Partial<TripPageSection> & Pick<TripPageSection, "title">) => {
    sections.push({
      ...createEmptyTripPageSection(),
      ...partial,
      id: crypto.randomUUID(),
    });
  };

  if (record.pageSubtitle || record.introText) {
    push({
      title: record.title,
      subtitle: record.pageSubtitle || record.introText || "",
      imageUrl: record.heroImageUrl,
      hasButton: Boolean(record.ctaLabel && record.ctaUrl),
      buttonLabel: record.ctaLabel ?? null,
      buttonUrl: record.ctaUrl ?? null,
    });
  }

  if (record.experienceTitle || record.experienceText || record.experienceImageUrl) {
    push({
      title: record.experienceTitle || "Experiência no destino",
      subtitle: record.experienceText || "",
      imageUrl: record.experienceImageUrl ?? null,
      hasButton: false,
      buttonLabel: null,
      buttonUrl: null,
    });
  }

  if (record.whyDiveTitle || record.whyDiveText || (record.highlights?.length ?? 0) > 0) {
    const subtitle = [record.whyDiveText, ...(record.highlights ?? [])]
      .filter(Boolean)
      .join("\n\n");
    push({
      title: record.whyDiveTitle || "Por que mergulhar nesse destino?",
      subtitle,
      imageUrl: null,
      hasButton: false,
      buttonLabel: null,
      buttonUrl: null,
    });
  }

  if (
    record.packageTitle ||
    record.packageDescription ||
    (record.includedItems?.length ?? 0) > 0
  ) {
    const subtitle = [
      record.packageDescription,
      (record.includedItems?.length ?? 0) > 0
        ? `Incluso: ${record.includedItems!.join("; ")}`
        : null,
      (record.notIncludedItems?.length ?? 0) > 0
        ? `Não incluso: ${record.notIncludedItems!.join("; ")}`
        : null,
      record.paymentCondition,
    ]
      .filter(Boolean)
      .join("\n\n");
    push({
      title: record.packageTitle || "Pacote da viagem",
      subtitle,
      imageUrl: null,
      hasButton: false,
      buttonLabel: null,
      buttonUrl: null,
    });
  }

  if (record.hasTransportSection) {
    push({
      title: record.transportTitle || "Transporte",
      subtitle: [record.transportDescription, record.transportNotes]
        .filter(Boolean)
        .join("\n\n"),
      imageUrl: null,
      hasButton: false,
      buttonLabel: null,
      buttonUrl: null,
    });
  }

  if (record.hasAccommodationSection) {
    push({
      title: record.accommodationName || "Hospedagem",
      subtitle: [
        record.accommodationDescription,
        (record.accommodationItems?.length ?? 0) > 0
          ? record.accommodationItems!.join("\n")
          : null,
      ]
        .filter(Boolean)
        .join("\n\n"),
      imageUrl: record.accommodationImageUrl ?? null,
      hasButton: false,
      buttonLabel: null,
      buttonUrl: null,
    });
  }

  if (record.hasDiveInfoSection) {
    push({
      title: record.diveInfoTitle || "Informações de mergulho",
      subtitle: [
        record.diveInfoDescription,
        record.waterTemperature ? `Temperatura: ${record.waterTemperature}` : null,
        record.visibility ? `Visibilidade: ${record.visibility}` : null,
        record.depth ? `Profundidade: ${record.depth}` : null,
        ...(record.diveSites ?? []),
        ...(record.underwaterAttractions ?? []),
        record.partnerOperator ? `Operadora: ${record.partnerOperator}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
      imageUrl: null,
      hasButton: false,
      buttonLabel: null,
      buttonUrl: null,
    });
  }

  if (sections.length === 0 && record.shortDescription) {
    push({
      title: record.title,
      subtitle: record.shortDescription,
      imageUrl: record.heroImageUrl,
      hasButton: false,
      buttonLabel: null,
      buttonUrl: null,
    });
  }

  return sections;
}

export function deriveCardFieldsFromSections(sections: TripPageSection[]): {
  shortDescription: string;
  heroImageUrl: string | null;
} {
  const first = sections[0];
  const firstWithImage = sections.find((section) => section.imageUrl?.trim());

  return {
    shortDescription: first?.subtitle.trim() || first?.title.trim() || "",
    heroImageUrl: firstWithImage?.imageUrl?.trim() || first?.imageUrl?.trim() || null,
  };
}
