import { CursosCatalogSection } from "@/components/cursos/catalog/cursos-catalog-section";
import { CursosHero } from "@/components/cursos/cursos-hero";
import { CursosPresence } from "@/components/cursos/cursos-presence";
import { cursosConfig } from "@/lib/cursos-config";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Cursos",
  description: cursosConfig.hero.subheadline,
  path: "/cursos",
  image: cursosConfig.hero.backgroundImage,
});

export default function CursosPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1">
      <CursosHero />
      <CursosPresence />
      <CursosCatalogSection />
    </main>
  );
}
