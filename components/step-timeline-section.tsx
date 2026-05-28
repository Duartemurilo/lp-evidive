"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import { useScrollRootRef } from "@/lib/use-scroll-root";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

export type StepTimelineItem = {
  title: string;
  description: string;
  icon?: LucideIcon;
  /** Ex.: "01" — exibido no lugar do ícone quando informado. */
  stepNumber?: string;
  duration?: string;
  highlights?: readonly string[];
};

export type StepTimelineSectionProps = {
  id?: string;
  headingId?: string;
  eyebrow?: string;
  titleSans: string;
  titleDisplay?: string;
  subtitle?: string;
  items: StepTimelineItem[];
  /** Espaço entre passos (timeline vertical). */
  stepSpacingClassName?: string;
  className?: string;
  sectionClassName?: string;
  /** Sobrescreve o grid (ex.: coluna do título mais larga). */
  gridClassName?: string;
  asideClassName?: string;
  subtitleClassName?: string;
  stepDescriptionClassName?: string;
  /** Cor da ondinha abaixo do eyebrow (padrão: primary). */
  waveWrapClassName?: string;
  /** Destaque da timeline (círculos, barra, duração). */
  timelineAccent?: "primary" | "foreground";
  displayClassName?: string;
};

const timelineAccentStyles = {
  primary: {
    circle: "bg-primary/12 ring-primary/20",
    marker: "text-primary",
    line: "bg-primary",
    duration: "text-primary",
  },
  foreground: {
    circle: "bg-foreground/10 ring-foreground/20",
    marker: "text-foreground",
    line: "bg-foreground",
    duration: "text-foreground",
  },
} as const;

function TimelineStep({
  step,
  isLast,
  spacingClassName,
  descriptionClassName,
  accent,
}: {
  step: StepTimelineItem;
  isLast: boolean;
  spacingClassName: string;
  descriptionClassName?: string;
  accent: keyof typeof timelineAccentStyles;
}): ReactNode {
  const Icon = step.icon;
  const accentStyle = timelineAccentStyles[accent];

  return (
    <div className={cn("relative flex gap-5", !isLast && spacingClassName)}>
      <div
        className={cn(
          "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1",
          accentStyle.circle,
        )}
        aria-hidden
      >
        {step.stepNumber ? (
          <span
            className={cn(
              "font-display text-[0.72rem] font-bold tracking-tight sm:text-xs",
              accentStyle.marker,
            )}
          >
            {step.stepNumber}
          </span>
        ) : Icon ? (
          <Icon className={cn("h-5 w-5", accentStyle.marker)} strokeWidth={1.75} />
        ) : null}
      </div>

      <div className="min-w-0 pt-1">
        <h3 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {step.title}
        </h3>
        <p
          className={cn(
            "mt-2 max-w-md text-base leading-relaxed text-muted-foreground",
            descriptionClassName,
          )}
        >
          {step.description}
        </p>
        {step.highlights && step.highlights.length > 0 ? (
          <ul className="mt-4 max-w-md list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
            {step.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
        {step.duration ? (
          <p
            className={cn(
              "mt-2 text-sm font-semibold uppercase tracking-[0.16em]",
              accentStyle.duration,
            )}
          >
            Duração: {step.duration}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/** Timeline vertical com barra de progresso (padrão copiado do template saas). */
export function StepTimelineSection({
  id,
  headingId,
  eyebrow,
  titleSans,
  titleDisplay,
  subtitle,
  items,
  stepSpacingClassName = "pb-20 md:pb-28",
  className,
  sectionClassName,
  gridClassName,
  asideClassName,
  subtitleClassName,
  stepDescriptionClassName,
  waveWrapClassName,
  timelineAccent = "primary",
  displayClassName = "text-primary",
}: StepTimelineSectionProps): ReactNode {
  const accentStyle = timelineAccentStyles[timelineAccent];
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRootRef = useScrollRootRef();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollRootRef,
    offset: ["start 0.25", "end 0.75"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      id={id}
      aria-labelledby={headingId}
      className={cn("relative w-full", sectionClassName)}
    >
      <div
        className={cn(
          "mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:gap-16 lg:py-32",
          gridClassName,
          className,
        )}
      >
        <div
          className={cn(
            "text-center lg:sticky lg:top-60 lg:h-fit lg:self-start lg:text-left",
            asideClassName,
          )}
        >
          {eyebrow ? (
            <SectionEyebrow className="text-foreground/70">{eyebrow}</SectionEyebrow>
          ) : null}
          <div
            className={cn(
              "flex justify-center lg:justify-start",
              eyebrow ? "mt-4" : "mt-0",
              waveWrapClassName ?? "text-primary",
            )}
          >
            <WaveDivider />
          </div>
          <SectionTitle
            {...(headingId ? { id: headingId } : {})}
            sans={titleSans}
            {...(titleDisplay ? { display: titleDisplay } : {})}
            sansClassName="text-black"
            displayClassName={displayClassName}
            className="mt-5 text-balance"
          />
          {subtitle ? (
            <p
              className={cn(
                "mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground lg:mx-0",
                subtitleClassName,
              )}
            >
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="relative min-w-0">
          <div
            className="absolute left-6 top-6 h-[calc(100%-3rem)] w-0.5 -translate-x-1/2 bg-foreground/10"
            aria-hidden
          >
            <motion.div
              style={{ height: lineHeight, willChange: "height" }}
              className={cn("w-full origin-top", accentStyle.line)}
            />
          </div>

          <ol className="relative m-0 list-none p-0">
            {items.map((step, index) => (
              <li key={step.title}>
                <TimelineStep
                  step={step}
                  isLast={index === items.length - 1}
                  spacingClassName={stepSpacingClassName}
                  accent={timelineAccent}
                  {...(stepDescriptionClassName
                    ? { descriptionClassName: stepDescriptionClassName }
                    : {})}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
