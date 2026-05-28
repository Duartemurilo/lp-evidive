import { DepthTransitionSection } from "@/components/depth-transition-section";
import type { ReactNode } from "react";

export const depthTransitionSectionId = "profundidade-transicao";
export const depthTransitionMeters = 60;

export function DepthTransitionDivider(): ReactNode {
  return (
    <DepthTransitionSection
      id={depthTransitionSectionId}
      depthMeters={depthTransitionMeters}
      depthLabel="de profundidade"
      eyebrow="Profundidade"
      headline="mais abaixo."
    />
  );
}
