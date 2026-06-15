"use client";

import { CursoDetailBackLink } from "@/components/cursos/detail/curso-detail-back-link";
import { CursoDetailContent } from "@/components/cursos/detail/curso-detail-content";
import { CursoDetailHero } from "@/components/cursos/detail/curso-detail-hero";
import { CursoDetailScrollToTop } from "@/components/cursos/detail/curso-detail-scroll-to-top";
import { CursoPageAccentProvider } from "@/lib/curso-page-accent-context";
import { cursosConfig } from "@/lib/cursos-config";
import { getCursoCapaImageOrFallback } from "@/lib/cursos-capa-images";
import type { CursoPageContent, CursoPageStub } from "@/lib/types/curso-page";
import { isCursoPageWithBlocks } from "@/lib/types/curso-page";
import { useRef, type ReactNode } from "react";

type CursoDetailShellProps = {
  content: CursoPageContent | CursoPageStub;
};

export function CursoDetailShell({ content }: CursoDetailShellProps): ReactNode {
  const heroSentinelRef = useRef<HTMLDivElement>(null);
  const hasFullPage = isCursoPageWithBlocks(content);
  const backgroundImage = getCursoCapaImageOrFallback(
    content.slug,
    cursosConfig.hero.backgroundImage,
  );

  return (
    <>
      <CursoDetailScrollToTop />
      <CursoDetailBackLink
        courseTitle={content.title}
        courseSlug={content.slug}
        heroSentinelRef={heroSentinelRef}
      />
      <div ref={heroSentinelRef}>
        {hasFullPage ? (
          <CursoDetailHero
            title={content.title}
            categoryLabel={content.categoryLabel}
            hero={content.hero}
            backgroundImage={backgroundImage}
          />
        ) : (
          <CursoDetailHero
            title={content.title}
            categoryLabel={content.categoryLabel}
            backgroundImage={backgroundImage}
            hero={{
              lead: content.title,
              leadHighlight: "",
              supporting: content.subtitle ?? content.metaDescription,
              cta: {
                label: "Ver catálogo de cursos",
                href: "/cursos#cursos-catalog",
                external: false,
              },
            }}
          />
        )}
      </div>
      <CursoPageAccentProvider
        {...(hasFullPage && isCursoPageWithBlocks(content) && content.themeAccent
          ? { accent: content.themeAccent }
          : {})}
      >
        <CursoDetailContent content={content} />
      </CursoPageAccentProvider>
    </>
  );
}
