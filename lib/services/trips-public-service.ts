import { fetchJsonApi } from "@/lib/api/fetch-json-api";
import { API_ENDPOINTS } from "@/lib/constants/api-endpoints";
import { getApiBaseUrl } from "@/lib/constants/env";
import type { PublicTrip } from "@/lib/types/trip-public";

function resolveTripsApiUrl(path: string): string {
  const base = getApiBaseUrl();
  if (base) {
    return `${base}${path}`;
  }
  return path;
}

export async function getPublicTripBySlug(
  slug: string,
  init?: { signal?: AbortSignal; next?: NextFetchRequestConfig },
): Promise<PublicTrip> {
  const url = resolveTripsApiUrl(API_ENDPOINTS.trips.detail(slug));
  return fetchJsonApi<PublicTrip>(url, init);
}

export async function listPublicTrips(
  init?: { signal?: AbortSignal; next?: NextFetchRequestConfig },
): Promise<PublicTrip[]> {
  const url = resolveTripsApiUrl(API_ENDPOINTS.trips.list);
  return fetchJsonApi<PublicTrip[]>(url, init);
}
