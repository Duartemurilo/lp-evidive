/** Limite ao salvar / editar o título da seção. */
export const TRIP_PAGE_SECTION_TITLE_MAX_LENGTH = 80;

/** Limite exibido no cabeçalho do accordion (card fechado). */
export const TRIP_PAGE_SECTION_TITLE_SUMMARY_MAX_LENGTH = 42;

export function truncateTripPageSectionTitle(
  title: string,
  maxLength = TRIP_PAGE_SECTION_TITLE_SUMMARY_MAX_LENGTH,
): string {
  const trimmed = title.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength - 1)}…`;
}

export type TripPageSection = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string | null;
  hasButton: boolean;
  buttonLabel: string | null;
  buttonUrl: string | null;
};

export function createEmptyTripPageSection(): TripPageSection {
  return {
    id: crypto.randomUUID(),
    title: "",
    subtitle: "",
    imageUrl: null,
    hasButton: false,
    buttonLabel: null,
    buttonUrl: null,
  };
}
