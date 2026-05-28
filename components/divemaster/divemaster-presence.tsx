"use client";

import { DepthRuler } from "@/components/depth-transition-section";
import { SubpagePresenceTitle } from "@/components/subpage-presence-title";
import { divemasterConfig } from "@/lib/divemaster-config";
import { Anchor, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const { presence, depthTransition } = divemasterConfig;

const rulerIcons = {
  anchor: Anchor,
} as const satisfies Record<typeof depthTransition.rulerIcon, LucideIcon>;

export function DivemasterPresence(): ReactNode {
  return (
    <section
      id="divemaster-presenca"
      data-depth-label={depthTransition.eyebrow}
      data-depth={`-${depthTransition.depthMeters}m`}
      className="shore-destino-section px-6 pt-28 md:pt-36 lg:pt-44"
    >
      <div className="mx-auto max-w-3xl lg:max-w-[52rem]">
        <SubpagePresenceTitle
          line1={presence.titleLine1}
          line2Mid={presence.titleLine2Mid}
          line2Sans={presence.titleLine2Sans}
          line2Display={presence.titleLine2Display}
          twoLineOnDesktop
          displayAccentClassName="text-primary"
        />
      </div>

      <DepthRuler
        centerIcon={rulerIcons[depthTransition.rulerIcon]}
        label={depthTransition.rulerLabel}
        centerIconClassName="text-primary"
      />
    </section>
  );
}
