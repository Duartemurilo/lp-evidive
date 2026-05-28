import { Features } from "@/components/features";
import { DepthTransitionDivider } from "@/components/depth-transition-divider";
import { Formacao } from "@/components/formacao";
import { PrimeiroMergulho } from "@/components/primeiro-mergulho";
import { FinalCTA } from "@/components/final-cta";
import { DepthIndicator } from "@/components/depth-indicator";
import { DiveSurfaceDepthSections } from "@/components/dive-surface-depth-sections";
import { Community } from "@/components/community";
import { HomeViagensTeaser } from "@/components/home-viagens-teaser";
import type { Metadata } from "next";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage(): ReactNode {
  return (
    <main id="main-content" className="flex-1">
      <div className="dive-shore-boundary relative">
        <DiveSurfaceDepthSections />
        <PrimeiroMergulho />
        <Formacao />
        <DepthTransitionDivider />
        <Features />
      </div>
      <Community />
      <HomeViagensTeaser />
      <FinalCTA />
      <DepthIndicator />
    </main>
  );
}
