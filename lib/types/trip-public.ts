import type { TripRecord } from "@/lib/types/trip-admin";

/** Viagem publicada exposta em `/api/trips` e `/api/trips/[slug]`. */
export type PublicTrip = Omit<TripRecord, "createdById" | "updatedById">;
