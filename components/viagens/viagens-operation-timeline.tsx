"use client";

import { StepTimelineSection } from "@/components/step-timeline-section";
import { viagensConfig } from "@/lib/viagens-config";
import type { ReactNode } from "react";

const { operation } = viagensConfig;

export function ViagensOperationTimeline(): ReactNode {
  const steps = operation.items.map((item) => ({
    stepNumber: item.number,
    title: item.title,
    description: item.description,
  }));

  return (
    <StepTimelineSection
      id={operation.id}
      headingId="viagens-operacao-heading"
      eyebrow={operation.eyebrow}
      titleSans={operation.titleSans}
      titleDisplay={operation.titleDisplay}
      subtitle={operation.subtitle}
      items={steps}
      sectionClassName="bg-background"
      stepSpacingClassName="pb-16 md:pb-24"
      gridClassName="lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-16"
      asideClassName="lg:w-[22rem] lg:max-w-[22rem]"
      subtitleClassName="lg:max-w-none"
    />
  );
}
