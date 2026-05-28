import { cursoBasicoMergulhoPageContent } from "@/lib/data/cursos-content/curso-basico-de-mergulho-com-cilindro";
import { emotionDivePageContent } from "@/lib/data/cursos-content/emotion-dive";
import { padiScubaDiverPageContent } from "@/lib/data/cursos-content/padi-scuba-diver";
import { primeirosSocorrosPageContent } from "@/lib/data/cursos-content/primeiros-socorros";
import { flutuabilidadePageContent } from "@/lib/data/cursos-content/flutuabilidade";
import { cameraDeAcaoPageContent } from "@/lib/data/cursos-content/camera-de-acao";
import { padiDivemasterPageContent } from "@/lib/data/cursos-content/padi-divemaster";
import { mergulhoLivreBasicoPageContent } from "@/lib/data/cursos-content/mergulho-livre-basico";
import { nitroxPageContent } from "@/lib/data/cursos-content/nitrox";
import { resgatePageContent } from "@/lib/data/cursos-content/resgate";
import { getCursoBySlug } from "@/lib/cursos-routes";
import type { CursoPageContent, CursoPageStub } from "@/lib/types/curso-page";

const CURSO_PAGES: Record<string, CursoPageContent> = {
  [emotionDivePageContent.slug]: emotionDivePageContent,
  [cursoBasicoMergulhoPageContent.slug]: cursoBasicoMergulhoPageContent,
  [padiScubaDiverPageContent.slug]: padiScubaDiverPageContent,
  [primeirosSocorrosPageContent.slug]: primeirosSocorrosPageContent,
  [resgatePageContent.slug]: resgatePageContent,
  [flutuabilidadePageContent.slug]: flutuabilidadePageContent,
  [nitroxPageContent.slug]: nitroxPageContent,
  [cameraDeAcaoPageContent.slug]: cameraDeAcaoPageContent,
  [padiDivemasterPageContent.slug]: padiDivemasterPageContent,
  [mergulhoLivreBasicoPageContent.slug]: mergulhoLivreBasicoPageContent,
};

export function getCursoPageContent(slug: string): CursoPageContent | CursoPageStub | undefined {
  const full = CURSO_PAGES[slug];
  if (full) return full;

  const course = getCursoBySlug(slug);
  if (!course || course.href) return undefined;

  const description =
    course.subtitle ??
    `Formação ${course.title} na Evidive — ${course.categoryTitle}.`;

  return {
    slug: course.slug,
    title: course.title,
    categoryLabel: course.categoryTitle,
    ...(course.subtitle ? { subtitle: course.subtitle } : {}),
    metaDescription: description,
  };
}

export function getCursoFullPageContent(slug: string): CursoPageContent | undefined {
  return CURSO_PAGES[slug];
}
