/**
 * Rotas da API — centralize aqui ao integrar o backend.
 * Paths são relativos a `getApiBaseUrl()` quando definido; senão, same-origin (`/api/...`).
 */
export const API_ENDPOINTS = {
  viagens: {
    list: "/api/viagens",
    detail: (slug: string) => `/api/viagens/${slug}`,
  },
  trips: {
    list: "/api/trips",
    detail: (slug: string) => `/api/trips/${slug}`,
  },
} as const;
