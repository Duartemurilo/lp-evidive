"use client";

import { CursoBookingCta } from "@/components/cursos/shared/curso-booking-cta";
import { SectionFineRule } from "@/components/section-fine-rule";
import { StepTimelineSection } from "@/components/step-timeline-section";
import {
  useCursoTimelineAccent,
  useCursoTitleDisplayClassName,
  useCursoWaveWrapClassName,
} from "@/lib/curso-page-accent-context";
import type { CursoStepsBlock } from "@/lib/types/curso-page";
import type { ReactNode } from "react";

type CursoStepsSectionProps = {
  block: CursoStepsBlock;
};

export function CursoStepsSection({ block }: CursoStepsSectionProps): ReactNode {
  const displayClassName = useCursoTitleDisplayClassName();
  const waveWrapClassName = useCursoWaveWrapClassName();
  const timelineAccent = useCursoTimelineAccent();

  return (
    <>
      <StepTimelineSection
        {...(block.id ? { id: block.id, headingId: `${block.id}-heading` } : {})}
        {...(block.eyebrow ? { eyebrow: block.eyebrow } : {})}
        titleSans={block.title}
        {...(block.titleDisplay ? { titleDisplay: block.titleDisplay } : {})}
        displayClassName={displayClassName}
        {...(block.subtitle ? { subtitle: block.subtitle } : {})}
        items={block.steps.map((step) => ({
          stepNumber: step.stepNumber,
          title: step.title,
          description: step.description,
          ...(step.duration ? { duration: step.duration } : {}),
          ...(step.highlights ? { highlights: step.highlights } : {}),
        }))}
        sectionClassName="bg-background"
        className="px-6 py-16 md:pb-12 md:pt-24 lg:pb-14 lg:pt-28"
        waveWrapClassName={waveWrapClassName}
        timelineAccent={timelineAccent}
      />
      {block.cta ? (
        <div className="mx-auto flex max-w-6xl justify-center px-6 pb-16 md:pb-20 lg:pb-24">
          <CursoBookingCta cta={block.cta} />
        </div>
      ) : null}
      {block.trailingFineRule ? <SectionFineRule /> : null}
    </>
  );
}
