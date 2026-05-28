export function slugifyTitle(title: string): string {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildDuplicateSlug(baseSlug: string): string {
  const suffix = Date.now().toString(36);
  return `${baseSlug}-copia-${suffix}`;
}
