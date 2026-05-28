/** Rola o container principal (Lenis ou data-scroll-root) para o topo. */
export function scrollPageToTop(immediate = true): void {
  const wrapper = document.querySelector<HTMLElement>("[data-scroll-root]");

  if (wrapper) {
    wrapper.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
  }
}
