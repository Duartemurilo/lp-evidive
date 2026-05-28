"use client";

import { scrollPageToTop } from "@/lib/scroll-page-to-top";
import { useLenis } from "@/lib/lenis-context";
import { useEffect, type ReactNode } from "react";

/** Ao abrir uma página de destino, inicia no hero (não preserva scroll da listagem). */
export function ViagemDetailScrollToTop(): ReactNode {
  const lenis = useLenis();

  useEffect(() => {
    const scrollToTop = (): void => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      scrollPageToTop(true);
    };

    requestAnimationFrame(scrollToTop);
    const timeoutId = window.setTimeout(scrollToTop, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [lenis]);

  return null;
}
