"use client";

import { DepthRuler } from "@/components/depth-transition-section";
import { divemasterConfig } from "@/lib/divemaster-config";
import { ListChecks, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const { prerequisitesTransition } = divemasterConfig;

const rulerIcons = {
  "list-checks": ListChecks,
} as const satisfies Record<
  typeof prerequisitesTransition.rulerIcon,
  LucideIcon
>;

export function DivemasterPrerequisitesTransition(): ReactNode {
  const Icon = rulerIcons[prerequisitesTransition.rulerIcon];

  return (
    <section
      id={prerequisitesTransition.id}
      data-depth-label={prerequisitesTransition.rulerLabel}
      data-depth={`-${prerequisitesTransition.depthMeters}m`}
      aria-label="Transição para pré-requisitos"
      className="shore-destino-section px-6 py-14 md:py-20 lg:py-24"
    >
      <DepthRuler
        centerIcon={Icon}
        label={prerequisitesTransition.rulerLabel}
        centerIconClassName="text-primary"
      />
    </section>
  );
}
