import type Lenis from "lenis";

/** Compensa header fixo ao rolar para âncoras na listagem. */
export const CATALOG_HASH_SCROLL_OFFSET = -120;

export function scrollToHashElement(
  hash: string,
  lenis: Lenis | null,
  options?: { immediate?: boolean; offset?: number },
): boolean {
  const id = hash.replace(/^#/, "");
  if (!id) {
    return false;
  }

  const element = document.getElementById(id);
  if (!element) {
    return false;
  }

  const offset = options?.offset ?? CATALOG_HASH_SCROLL_OFFSET;
  const immediate = options?.immediate ?? true;

  if (lenis) {
    lenis.scrollTo(element, { offset, immediate });
  } else {
    const top =
      element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({
      top: Math.max(0, top),
      behavior: immediate ? "auto" : "smooth",
    });
  }

  return true;
}
