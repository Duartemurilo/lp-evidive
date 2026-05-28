import { CursoDetailShell } from "@/components/cursos/detail/curso-detail-shell";
import { getCursoPageContent } from "@/lib/cursos-course-registry";
import { getCursoDetailSlugs } from "@/lib/cursos-routes";
import { cursosConfig } from "@/lib/cursos-config";
import { createMetadata } from "@/lib/metadata";
import { isCursoPageWithBlocks } from "@/lib/types/curso-page";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type CursoDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): { slug: string }[] {
  return getCursoDetailSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CursoDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getCursoPageContent(slug);

  if (!content) {
    return createMetadata({ title: "Curso", path: `/cursos/${slug}`, noIndex: true });
  }

  return createMetadata({
    title: content.title,
    description: content.metaDescription,
    path: `/cursos/${slug}`,
    image: cursosConfig.hero.backgroundImage,
    ...(!isCursoPageWithBlocks(content) ? { noIndex: true } : {}),
  });
}

export default async function CursoDetailPage({
  params,
}: CursoDetailPageProps): Promise<ReactNode> {
  const { slug } = await params;
  const content = getCursoPageContent(slug);

  if (!content) {
    notFound();
  }

  return (
    <main id="main-content" className="flex-1">
      <CursoDetailShell content={content} />
    </main>
  );
}
