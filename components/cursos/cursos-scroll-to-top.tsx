"use client";

import { resolveCursosCatalogHash } from "@/lib/cursos-catalog-navigation";
import { cursosConfig } from "@/lib/cursos-config";
import { cursosPagePath, isCursoCatalogItemHash } from "@/lib/cursos-routes";
import { scrollPageToTop } from "@/lib/scroll-page-to-top";
import { scrollToHashElement } from "@/lib/scroll-to-hash";
import { useLenis } from "@/lib/lenis-context";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, type ReactNode } from "react";

const catalogHash = `#${cursosConfig.catalog.sectionId}`;

function isPreservedCatalogHash(hash: string): boolean {
  return hash === catalogHash || isCursoCatalogItemHash(hash);
}

function syncUrlHash(hash: string): void {
  if (!hash || window.location.hash === hash) {
    return;
  }
  history.replaceState(history.state, "", `${cursosPagePath}${hash}`);
}

/** Ao entrar em /cursos, rola para âncora do catálogo ou do item; sem hash, inicia no hero. */
export function CursosScrollToTop(): ReactNode {
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
    if (pathname !== cursosPagePath) {
      return;
    }

    const hash = resolveCursosCatalogHash();

    if (isPreservedCatalogHash(hash)) {
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
      history.replaceState(history.state, "", cursosPagePath);
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
    if (pathname !== cursosPagePath) {
      return;
    }

    const onHashChange = (): void => {
      const hash = window.location.hash;
      if (isPreservedCatalogHash(hash)) {
        scrollToCatalogHash(hash, false);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname, scrollToCatalogHash]);

  return null;
}
