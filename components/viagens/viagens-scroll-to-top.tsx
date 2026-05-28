"use client";

import {
  isViagensCatalogHash,
  resolveViagensCatalogHash,
  VIAGENS_PAGE_PATH,
} from "@/lib/viagens-catalog-navigation";
import { scrollPageToTop } from "@/lib/scroll-page-to-top";
import { scrollToHashElement } from "@/lib/scroll-to-hash";
import { useLenis } from "@/lib/lenis-context";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, type ReactNode } from "react";

function syncUrlHash(hash: string): void {
  if (!hash || window.location.hash === hash) {
    return;
  }
  history.replaceState(history.state, "", `${VIAGENS_PAGE_PATH}${hash}`);
}

/**
 * Ao entrar em /viagens: com `#viagens-catalog` (ou hash pendente ao voltar do
 * detalhe), rola para a listagem; sem hash, inicia no hero.
 */
export function ViagensScrollToTop(): ReactNode {
  const pathname = usePathname();
  const lenis = useLenis();

  const scrollToCatalogHash = useCallback(
    (hash: string, immediate = true): boolean => {
      syncUrlHash(hash);
      return scrollToHashElement(hash, lenis, { immediate });
    },
    [lenis],
  );

  useEffect(() => {
    if (pathname !== VIAGENS_PAGE_PATH) {
      return;
    }

    const hash = resolveViagensCatalogHash();

    if (isViagensCatalogHash(hash)) {
      const attemptScroll = (): void => {
        scrollToCatalogHash(hash, true);
      };

      requestAnimationFrame(attemptScroll);
      const timeoutIds = [0, 50, 120, 280, 500, 800].map((delay) =>
        window.setTimeout(attemptScroll, delay),
      );

      return () => {
        timeoutIds.forEach((id) => window.clearTimeout(id));
      };
    }

    if (window.location.hash) {
      history.replaceState(history.state, "", VIAGENS_PAGE_PATH);
    }

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
  }, [pathname, lenis, scrollToCatalogHash]);

  useEffect(() => {
    if (pathname !== VIAGENS_PAGE_PATH) {
      return;
    }

    const onHashChange = (): void => {
      const hash = window.location.hash;
      if (isViagensCatalogHash(hash)) {
        scrollToCatalogHash(hash, false);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname, scrollToCatalogHash]);

  return null;
}
