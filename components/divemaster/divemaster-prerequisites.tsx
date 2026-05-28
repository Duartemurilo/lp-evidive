"use client";

import { StepTimelineSection } from "@/components/step-timeline-section";
import { divemasterConfig } from "@/lib/divemaster-config";
import {
  divemasterSidebarAsideClassName,
  divemasterSidebarGridClassName,
} from "@/lib/divemaster-section-layout";
import {
  Award,
  LifeBuoy,
  type LucideIcon,
  User,
  Waves,
} from "lucide-react";
import type { ReactNode } from "react";

const { prerequisites } = divemasterConfig;

const prerequisiteIcons = {
  user: User,
  award: Award,
  "life-buoy": LifeBuoy,
  waves: Waves,
} as const satisfies Record<
  (typeof prerequisites.items)[number]["icon"],
  LucideIcon
>;

export function DivemasterPrerequisites(): ReactNode {
  const steps = prerequisites.items.map((item) => {
    const Icon = prerequisiteIcons[item.icon];
    return {
      icon: Icon,
      title: item.label,
      description: item.detail,
    };
  });

  return (
    <StepTimelineSection
      id={prerequisites.id}
      headingId="divemaster-pre-requisitos-heading"
      eyebrow={prerequisites.eyebrow}
      titleSans={prerequisites.titleSans}
      titleDisplay={prerequisites.titleDisplay}
      items={steps}
      sectionClassName="bg-background"
      gridClassName={divemasterSidebarGridClassName}
      asideClassName={divemasterSidebarAsideClassName}
      subtitleClassName="lg:max-w-none"
      stepDescriptionClassName="lg:max-w-xl"
    />
  );
}
