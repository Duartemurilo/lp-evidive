"use client";

import { DepthRuler } from "@/components/depth-transition-section";
import { SubpagePresenceTitle } from "@/components/subpage-presence-title";
import { freediveConfig } from "@/lib/freedive-config";
import { Wind, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

const { presence, depthTransition } = freediveConfig;

const rulerIcons = {
  wind: Wind,
} as const satisfies Record<typeof depthTransition.rulerIcon, LucideIcon>;

export function FreedivePresence(): ReactNode {
  return (
    <section
      id="freedive-presenca"
      data-depth-label={depthTransition.eyebrow}
      data-depth={`-${depthTransition.depthMeters}m`}
      className="shore-destino-section px-6 pt-28 md:pt-36 lg:pt-44"
    >
      <div className="mx-auto max-w-3xl">
        <SubpagePresenceTitle
          line1={presence.titleLine1}
          line2Sans={presence.titleLine2Sans}
          line2Display={presence.titleLine2Display}
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
