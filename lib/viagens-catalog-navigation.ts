export const VIAGENS_PAGE_PATH = "/viagens";

export const VIAGENS_CATALOG_SECTION_ID = "viagens-catalog";

export const VIAGENS_CATALOG_HASH = `#${VIAGENS_CATALOG_SECTION_ID}`;

export const VIAGENS_CATALOG_HREF = `${VIAGENS_PAGE_PATH}${VIAGENS_CATALOG_HASH}`;

export const VIAGENS_PENDING_HASH_STORAGE_KEY = "evidive:viagens-pending-hash";

export function buildViagensCatalogUrl(hash: string = VIAGENS_CATALOG_HASH): string {
  return `${VIAGENS_PAGE_PATH}${hash}`;
}

export function isViagensCatalogHash(hash: string): boolean {
  return hash === VIAGENS_CATALOG_HASH;
}

export function stashViagensPendingHash(hash: string): void {
  if (typeof window === "undefined" || !hash) {
    return;
  }
  sessionStorage.setItem(VIAGENS_PENDING_HASH_STORAGE_KEY, hash);
}

export function consumeViagensPendingHash(): string {
  if (typeof window === "undefined") {
    return "";
  }
  const hash = sessionStorage.getItem(VIAGENS_PENDING_HASH_STORAGE_KEY) ?? "";
  sessionStorage.removeItem(VIAGENS_PENDING_HASH_STORAGE_KEY);
  return hash;
}

export function resolveViagensCatalogHash(): string {
  if (typeof window === "undefined") {
    return "";
  }
  const hash = window.location.hash;
  if (isViagensCatalogHash(hash)) {
    return hash;
  }
  return consumeViagensPendingHash();
}
