import { cursosPagePath, getCursoCatalogItemId } from "@/lib/cursos-routes";

export const CURSOS_PENDING_HASH_STORAGE_KEY = "evidive:cursos-pending-hash";

export function getCursoCatalogHashForSlug(slug: string): string {
  return `#${getCursoCatalogItemId(slug)}`;
}

export function buildCursosCatalogUrl(hash: string): string {
  return `${cursosPagePath}${hash}`;
}

export function stashCursosPendingHash(hash: string): void {
  if (typeof window === "undefined" || !hash) {
    return;
  }
  sessionStorage.setItem(CURSOS_PENDING_HASH_STORAGE_KEY, hash);
}

export function consumeCursosPendingHash(): string {
  if (typeof window === "undefined") {
    return "";
  }
  const hash = sessionStorage.getItem(CURSOS_PENDING_HASH_STORAGE_KEY) ?? "";
  sessionStorage.removeItem(CURSOS_PENDING_HASH_STORAGE_KEY);
  return hash;
}

export function resolveCursosCatalogHash(): string {
  if (typeof window === "undefined") {
    return "";
  }
  return window.location.hash || consumeCursosPendingHash();
}
