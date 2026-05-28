import type { TripFormValues, TripListItem, TripRecord } from "@/lib/types/trip-admin";

type ApiSuccess<T> = { ok: true; data: T };
type ApiFailure = {
  ok: false;
  error: string;
  details?: Record<string, string>;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const json = (await response.json()) as ApiSuccess<T> | ApiFailure;
  if (!response.ok || !json.ok) {
    const message =
      !json.ok && "error" in json ? json.error : "Erro ao processar solicitação.";
    const details = !json.ok && "details" in json ? json.details : undefined;
    const error = new Error(message) as Error & {
      details?: Record<string, string> | undefined;
    };
    if (details) error.details = details;
    throw error;
  }
  return json.data;
}

export async function fetchAdminTrips(): Promise<TripListItem[]> {
  const response = await fetch("/api/admin/trips", { cache: "no-store" });
  return parseResponse<TripListItem[]>(response);
}

export async function fetchAdminTrip(id: string): Promise<TripRecord> {
  const response = await fetch(`/api/admin/trips/${id}`, { cache: "no-store" });
  return parseResponse<TripRecord>(response);
}

export async function checkAdminTripSlugAvailability(
  slug: string,
  excludeId?: string,
  signal?: AbortSignal,
): Promise<{ available: boolean }> {
  const params = new URLSearchParams({ slug: slug.trim() });
  if (excludeId) params.set("excludeId", excludeId);

  const response = await fetch(`/api/admin/trips/check-slug?${params.toString()}`, {
    cache: "no-store",
    signal,
  });
  return parseResponse<{ available: boolean }>(response);
}

export async function createAdminTrip(
  values: TripFormValues,
): Promise<TripRecord> {
  const response = await fetch("/api/admin/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return parseResponse<TripRecord>(response);
}

export async function updateAdminTrip(
  id: string,
  values: TripFormValues,
): Promise<TripRecord> {
  const response = await fetch(`/api/admin/trips/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  return parseResponse<TripRecord>(response);
}

export async function deleteAdminTrip(id: string): Promise<void> {
  const response = await fetch(`/api/admin/trips/${id}`, { method: "DELETE" });
  await parseResponse<{ deleted: boolean }>(response);
}

export async function duplicateAdminTrip(id: string): Promise<TripRecord> {
  const response = await fetch(`/api/admin/trips/${id}/duplicate`, {
    method: "POST",
  });
  return parseResponse<TripRecord>(response);
}
