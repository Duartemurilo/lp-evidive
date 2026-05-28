import { fetchJsonApi } from "@/lib/api/fetch-json-api";
import { API_ENDPOINTS } from "@/lib/constants/api-endpoints";
import { getApiBaseUrl, isViagensMockEnabled } from "@/lib/constants/env";
import { viagensMockCatalog } from "@/lib/data/viagens-mock";
import type { ViagensCatalogResponse } from "@/lib/types/viagens";

const MOCK_LATENCY_MS = 280;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function resolveViagensCatalogUrl(): string {
  const base = getApiBaseUrl();
  if (base) {
    return `${base}${API_ENDPOINTS.viagens.list}`;
  }
  return API_ENDPOINTS.viagens.list;
}

/**
 * Catálogo de viagens — `/api/viagens` no app ou API externa via `NEXT_PUBLIC_API_BASE_URL`.
 */
export async function getViagensCatalog(
  init?: { signal?: AbortSignal; next?: NextFetchRequestConfig },
): Promise<ViagensCatalogResponse> {
  if (isViagensMockEnabled()) {
    await delay(MOCK_LATENCY_MS);
    if (init?.signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }
    return viagensMockCatalog;
  }

  const url = resolveViagensCatalogUrl();
  return fetchJsonApi<ViagensCatalogResponse>(url, init);
}
