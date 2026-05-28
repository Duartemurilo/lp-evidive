import { ViagemCategory, type Viagem } from "@/lib/types/viagens";
import type { ViagemScopeFilterId } from "@/lib/viagens-catalog-filters-ui";

export function filterViagens({
  trips,
  categoryId,
  dateSlotId,
  scopeId,
  now = new Date(),
}: {
  trips: readonly Viagem[];
  categoryId: ViagemCategory;
  dateSlotId: string | null;
  scopeId: ViagemScopeFilterId;
  now?: Date;
}): Viagem[] {
  return trips.filter((trip) => {
    if (dateSlotId !== null && !trip.dateSlotIds.includes(dateSlotId)) {
      return false;
    }

    if (scopeId !== null && trip.scope !== scopeId) {
      return false;
    }

    if (categoryId === ViagemCategory.Todos) {
      return true;
    }

    if (categoryId === ViagemCategory.ProximasDatas) {
      const start = new Date(trip.startDate);
      return start >= startOfDay(now);
    }

    return trip.categories.includes(categoryId);
  });
}

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}
