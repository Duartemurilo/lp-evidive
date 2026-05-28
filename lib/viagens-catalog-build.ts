import {
  getCatalogExperienceCategories,
  tripRecordToViagem,
} from "@/lib/trips/trip-to-viagem";
import type { TripRecord } from "@/lib/types/trip-admin";
import {
  ViagemCategory,
  type Viagem,
  type ViagemDateSlot,
  type ViagensCatalogResponse,
} from "@/lib/types/viagens";

function formatDateSlotMonthLabel(startDate: string | null, title: string): string {
  if (startDate) {
    const date = new Date(`${startDate}T12:00:00`);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("pt-BR", { month: "short" });
    }
  }

  const shortTitle = title.split("–")[0]?.trim() ?? title;
  return shortTitle.length > 14 ? `${shortTitle.slice(0, 14)}…` : shortTitle;
}

export function buildDateSlotsFromTrips(trips: readonly Viagem[]): ViagemDateSlot[] {
  return [...trips]
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .map((trip) => ({
      id: trip.slug,
      monthLabel: formatDateSlotMonthLabel(trip.startDate, trip.title),
      destinationLabel: trip.title,
      tripId: trip.id,
    }));
}

export function buildViagensCatalogResponse(records: readonly TripRecord[]): ViagensCatalogResponse {
  const trips = records.map((trip) =>
    tripRecordToViagem(trip, { dateSlotIds: [trip.slug] }),
  );

  return {
    trips,
    dateSlots: buildDateSlotsFromTrips(trips),
    categories: [
      { id: ViagemCategory.Todos, label: "Todos" },
      { id: ViagemCategory.ProximasDatas, label: "Próximas datas" },
      ...getCatalogExperienceCategories(),
    ],
  };
}
