/** Base da API pública (Vercel / backend Evidive). Vazio = rotas `/api/*` do próprio Next.js. */
export function getApiBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!base) return "";
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

/** Quando `true`, `getViagensCatalog` usa mock local (`lib/data/viagens-mock.ts`). */
export function isViagensMockEnabled(): boolean {
  return process.env.NEXT_PUBLIC_VIAGENS_USE_MOCK === "true";
}
