"use client";

import {
  buildCursosCatalogUrl,
  getCursoCatalogHashForSlug,
  stashCursosPendingHash,
} from "@/lib/cursos-catalog-navigation";
import { CURSOS_CATALOG_HREF } from "@/lib/cursos-routes";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

type CursoDetailBackLinkProps = {
  courseTitle?: string;
  courseSlug?: string;
  heroSentinelRef?: React.RefObject<HTMLDivElement | null>;
  className?: string;
};

export function CursoDetailBackLink({
  courseTitle,
  courseSlug,
  heroSentinelRef,
  className,
}: CursoDetailBackLinkProps): ReactNode {
  const router = useRouter();
  const [onLightSurface, setOnLightSurface] = useState(false);

  const backHash = courseSlug ? getCursoCatalogHashForSlug(courseSlug) : "#cursos-catalog";
  const backHref = courseSlug ? buildCursosCatalogUrl(backHash) : CURSOS_CATALOG_HREF;

  useEffect(() => {
    const sentinel = heroSentinelRef?.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setOnLightSurface(entry ? !entry.isIntersecting : false);
      },
      { rootMargin: "-12% 0px 0px 0px", threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [heroSentinelRef]);

  const surfaceStyles = onLightSurface
    ? "border-border/55 bg-background/92 text-foreground hover:border-primary/30 hover:bg-background hover:shadow-[0_10px_32px_rgba(8,32,42,0.12)]"
    : "border-white/22 bg-black/30 text-white hover:border-white/35 hover:bg-black/45 hover:shadow-[0_10px_32px_rgba(0,0,0,0.28)]";

  const handleBack = (): void => {
    stashCursosPendingHash(backHash);
    router.push(backHref, { scroll: false });
  };

  return (
    <div
      className={cn(
        "pointer-events-none fixed left-0 z-[60] flex items-center pl-4 sm:top-4 sm:h-[3.25rem] sm:pl-5 md:pl-6",
        "top-[calc(1rem+3.25rem+0.625rem)]",
        className,
      )}
    >
      <button
        type="button"
        onClick={handleBack}
        className={cn(
          "pointer-events-auto group inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border font-semibold shadow-[0_8px_28px_rgba(0,0,0,0.18)] backdrop-blur-md transition-[background-color,border-color,color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/70 sm:size-auto sm:gap-2 sm:px-3.5 sm:py-2 sm:text-[0.8rem] md:px-4 md:text-sm",
          surfaceStyles,
        )}
        aria-label={
          courseTitle
            ? `Voltar para a lista de cursos. Curso atual: ${courseTitle}`
            : "Voltar para a lista de cursos"
        }
      >
        <ArrowLeft
          className="size-[1.125rem] shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5 sm:size-4"
          aria-hidden
        />
        <span className="hidden truncate sm:inline">Voltar para cursos</span>
      </button>
    </div>
  );
}
