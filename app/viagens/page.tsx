import { ViagensCatalogSection } from "@/components/viagens/catalog/viagens-catalog-section";
import { ViagensExperienceTypes } from "@/components/viagens/viagens-experience-types";
import { ViagensCommunityGallery } from "@/components/viagens/viagens-community-gallery";
import { ViagensOperationTimeline } from "@/components/viagens/viagens-operation-timeline";
import { ViagensHero } from "@/components/viagens/viagens-hero";
import { ViagensUniverse } from "@/components/viagens/viagens-universe";
import { viagensConfig } from "@/lib/viagens-config";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Viagens",
  description: viagensConfig.hero.subheadline,
  path: "/viagens",
});

export default function ViagensPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1">
      <ViagensHero />
      <ViagensUniverse />
      <ViagensCatalogSection />
      <ViagensExperienceTypes />
      <ViagensOperationTimeline />
      <ViagensCommunityGallery />
    </main>
  );
}
