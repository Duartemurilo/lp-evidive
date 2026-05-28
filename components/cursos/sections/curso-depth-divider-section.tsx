"use client";

import { DepthRuler } from "@/components/depth-transition-section";
import type { CursoDepthDividerBlock, CursoDepthRulerIcon } from "@/lib/types/curso-page";
import { cn } from "@/lib/utils";
import { Anchor, Waves, Wind, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const rulerIcons = {
  wind: Wind,
  anchor: Anchor,
  waves: Waves,
} as const satisfies Record<CursoDepthRulerIcon, LucideIcon>;

type CursoDepthDividerSectionProps = {
  block: CursoDepthDividerBlock;
};

export function CursoDepthDividerSection({
  block,
}: CursoDepthDividerSectionProps): ReactNode {
  const Icon = block.rulerIcon ? rulerIcons[block.rulerIcon] : undefined;
  const isSand = block.surface === "sand";

  return (
    <section
      id={block.id}
      {...(block.rulerLabel
        ? { "data-depth-label": block.rulerLabel }
        : {})}
      {...(block.depthMeters != null
        ? { "data-depth": `-${block.depthMeters}m` }
        : {})}
      aria-label="Transição de profundidade"
      className={cn(
        "px-6 py-14 md:py-20 lg:py-24",
        isSand ? "shore-destino-section" : "bg-background",
      )}
    >
      <DepthRuler
        {...(Icon ? { centerIcon: Icon } : {})}
        label={block.rulerLabel}
        centerIconClassName="text-primary"
      />
    </section>
  );
}
