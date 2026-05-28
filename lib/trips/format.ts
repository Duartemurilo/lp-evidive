import type { TripFormValues, TripListItem } from "@/lib/types/trip-admin";

function formatDateBr(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day}/${month}/${year}`;
}

export function formatTripDateRange(
  trip: Pick<TripListItem, "startDate" | "endDate">,
): string {
  if (trip.startDate && trip.endDate) {
    return `${formatDateBr(trip.startDate)} – ${formatDateBr(trip.endDate)}`;
  }
  if (trip.startDate) return formatDateBr(trip.startDate);
  return "A definir";
}

export function formatTripFormDatePreview(
  values: Pick<TripFormValues, "startDate" | "endDate">,
): string | null {
  if (values.startDate && values.endDate) {
    return `${formatDateBr(values.startDate)} – ${formatDateBr(values.endDate)}`;
  }
  if (values.startDate) return formatDateBr(values.startDate);
  return null;
}
