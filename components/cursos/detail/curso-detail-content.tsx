"use client";

import { CursoCopySection } from "@/components/cursos/sections/curso-copy-section";
import { CursoDepthDividerSection } from "@/components/cursos/sections/curso-depth-divider-section";
import { CursoFaqSection } from "@/components/cursos/sections/curso-faq-section";
import { CursoGiftSection } from "@/components/cursos/sections/curso-gift-section";
import { CursoIconCardsSection } from "@/components/cursos/sections/curso-icon-cards-section";
import { CursoIllustrationSection } from "@/components/cursos/sections/curso-illustration-section";
import { CursoIncludedSection } from "@/components/cursos/sections/curso-included-section";
import { CursoPadiSection } from "@/components/cursos/sections/curso-padi-section";
import { CursoPricingSection } from "@/components/cursos/sections/curso-pricing-section";
import { CursoSectionRule } from "@/components/cursos/sections/curso-section-rule";
import { CursoSplitMediaSection } from "@/components/cursos/sections/curso-split-media-section";
import { CursoStepsSection } from "@/components/cursos/sections/curso-steps-section";
import { CursoTestimonialsSection } from "@/components/cursos/sections/curso-testimonials-section";
import type {
  CursoContentBlock,
  CursoPageContent,
  CursoPageStub,
} from "@/lib/types/curso-page";
import { isCursoPageWithBlocks } from "@/lib/types/curso-page";
import type { ReactNode } from "react";

function CursoContentBlockRenderer({ block }: { block: CursoContentBlock }): ReactNode {
  switch (block.type) {
    case "split-media":
      return <CursoSplitMediaSection block={block} />;
    case "depth-divider":
      return <CursoDepthDividerSection block={block} />;
    case "illustration":
      return <CursoIllustrationSection block={block} />;
    case "copy":
      return <CursoCopySection block={block} />;
    case "icon-cards":
      return <CursoIconCardsSection block={block} />;
    case "steps":
      return <CursoStepsSection block={block} />;
    case "section-rule":
      return <CursoSectionRule block={block} />;
    case "padi":
      return <CursoPadiSection block={block} />;
    case "testimonials":
      return <CursoTestimonialsSection block={block} />;
    case "included":
      return <CursoIncludedSection block={block} />;
    case "gift":
      return <CursoGiftSection block={block} />;
    case "pricing":
      return <CursoPricingSection block={block} />;
    case "faq":
      return <CursoFaqSection block={block} />;
    case "presence-divider":
      return null;
    default: {
      const _unhandled: never = block;
      void _unhandled;
      return null;
    }
  }
}

type CursoDetailContentProps = {
  content: CursoPageContent | CursoPageStub;
};

export function CursoDetailContent({ content }: CursoDetailContentProps): ReactNode {
  if (!isCursoPageWithBlocks(content)) {
    return (
      <section
        aria-labelledby="curso-detail-content-heading"
        className="bg-background px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground md:text-xs">
            Em breve
          </p>
          <h2
            id="curso-detail-content-heading"
            className="font-display mt-4 text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-tight text-foreground"
          >
            Conteúdo completo de {content.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Estamos preparando os detalhes desta formação. Enquanto isso, explore o catálogo de
            cursos ou fale com a Evidive.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="flex flex-col">
      {content.blocks.map((block, index) => (
        <CursoContentBlockRenderer
          key={"id" in block && block.id ? block.id : `${block.type}-${index}`}
          block={block}
        />
      ))}
    </div>
  );
}
