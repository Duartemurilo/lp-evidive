import { revalidatePath } from "next/cache";

/** Atualiza catálogo e páginas públicas após criar, editar ou remover viagens no admin. */
export function revalidatePublicTripCache(...slugs: string[]): void {
  revalidatePath("/viagens");
  revalidatePath("/api/viagens");

  const uniqueSlugs = [...new Set(slugs.map((slug) => slug.trim()).filter(Boolean))];
  for (const slug of uniqueSlugs) {
    revalidatePath(`/viagens/${slug}`);
  }
}
