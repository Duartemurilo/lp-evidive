import {
  cursosCatalogFlat,
  type CursoCatalogItem,
} from "@/lib/data/cursos-catalog";

/** Página hub de todos os cursos. */
export const cursosPagePath = "/cursos";

export const CURSO_CATALOG_ITEM_ID_PREFIX = "curso-catalog-item";

export const CURSOS_CATALOG_HREF = `${cursosPagePath}#cursos-catalog`;

export function getCursoCatalogItemId(slug: string): string {
  return `${CURSO_CATALOG_ITEM_ID_PREFIX}-${slug}`;
}

export function getCursoCatalogItemHref(slug: string): string {
  return `${cursosPagePath}#${getCursoCatalogItemId(slug)}`;
}

export function isCursoCatalogItemHash(hash: string): boolean {
  return hash.startsWith(`#${CURSO_CATALOG_ITEM_ID_PREFIX}-`);
}

export function getCursoCatalogBackHref(slug: string): string {
  return getCursoCatalogItemHref(slug);
}

export function getCursoDetailPath(slug: string): string {
  return `${cursosPagePath}/${slug}`;
}

/** Página interna de um curso (ex.: `/cursos/nitrox`). */
export function isCursoDetailPath(pathname: string): boolean {
  return /^\/cursos\/[^/]+$/.test(pathname);
}

export function getCursoDetailHref(course: Pick<CursoCatalogItem, "slug" | "href">): string {
  return course.href ?? getCursoDetailPath(course.slug);
}

export function isInternalCursoDetailPath(href: string): boolean {
  return href.startsWith(`${cursosPagePath}/`);
}

export function getCursoBySlug(slug: string) {
  return cursosCatalogFlat.find((course) => course.slug === slug);
}

export function getCursoDetailSlugs(): string[] {
  return cursosCatalogFlat
    .filter((course) => !course.href || isInternalCursoDetailPath(getCursoDetailHref(course)))
    .map((course) => course.slug);
}
