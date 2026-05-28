"use client";

import { isCursoDetailPath } from "@/lib/cursos-routes";
import { useLenis } from "@/lib/lenis-context";
import { scrollPageToTop } from "@/lib/scroll-page-to-top";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/**
 * Ao abrir ou trocar de página de curso (`/cursos/[slug]`), inicia no hero.
 * Necessário com Lenis: o App Router não restaura o scroll do container customizado.
 */
export function CursoDetailScrollToTop(): ReactNode {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (!isCursoDetailPath(pathname)) {
      return;
    }

    if (window.location.hash) {
      history.replaceState(history.state, "", pathname);
    }

    const scrollToTop = (): void => {
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
      scrollPageToTop(true);
    };

    requestAnimationFrame(scrollToTop);
    const timeoutIds = [0, 50, 120, 280, 500].map((delay) =>
      window.setTimeout(scrollToTop, delay),
    );

    return () => {
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [pathname, lenis]);

  return null;
}
