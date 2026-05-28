"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";
import scubaDiverDepthIcon from "../public/assets/scuba-diver-depth-icon.png";

const easeOut = [0.16, 1, 0.3, 1] as const;

export type DepthTransitionSectionProps = {
  id: string;
  depthMeters: number;
  depthLabel: string;
  eyebrow: string;
  headline: string;
  className?: string;
};

export function DepthRuler({
  value,
  label,
  centerIcon: CenterIcon,
  centerIconClassName = "text-foreground",
  className,
}: {
  label: string;
  value?: string;
  centerIcon?: LucideIcon;
  centerIconClassName?: string;
  className?: string;
}): ReactNode {
  return (
    <motion.div
      className={cn(
        "relative mx-auto mt-10 w-full max-w-[min(100%,72rem)] md:mt-12 lg:mt-14",
        className,
      )}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.55, delay: 0.08, ease: easeOut }}
    >
      <div className="flex w-full items-center">
        <span aria-hidden className="h-3 w-px shrink-0 bg-foreground/65" />
        <span
          aria-hidden
          className="h-px min-w-0 flex-1 border-t border-dashed border-foreground/40"
        />

        <div className="mx-4 shrink-0 text-center sm:mx-6 md:mx-8">
          {CenterIcon ? (
            <CenterIcon
              className={`mx-auto h-[clamp(2.5rem,6.5vw,3.5rem)] w-[clamp(2.5rem,6.5vw,3.5rem)] ${centerIconClassName}`}
              strokeWidth={1.5}
              aria-hidden
            />
          ) : (
            <p className="font-display text-[clamp(2.35rem,7vw,3.75rem)] font-bold leading-none tracking-tight text-foreground">
              {value}
            </p>
          )}
          <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.34em] whitespace-nowrap text-foreground/72 md:text-xs">
            {label}
          </p>
        </div>

        <span
          aria-hidden
          className="relative h-px min-w-0 flex-1 border-t border-dashed border-foreground/40"
        >
          <Image
            src={scubaDiverDepthIcon}
            alt=""
            width={scubaDiverDepthIcon.width}
            height={scubaDiverDepthIcon.height}
            unoptimized
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/2 h-12 w-12 -translate-y-[42%] translate-x-1/2 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-[4.5rem] lg:w-[4.5rem]"
          />
        </span>
        <span aria-hidden className="h-3 w-px shrink-0 bg-foreground/65" />
      </div>
    </motion.div>
  );
}

export function DepthTransitionSection({
  id,
  depthMeters,
  depthLabel,
  eyebrow,
  headline,
  className = "bg-background px-6 py-24 md:px-10 md:py-32 lg:px-12 lg:py-40",
}: DepthTransitionSectionProps): ReactNode {
  return (
    <section
      id={id}
      data-depth-label={eyebrow}
      data-depth={`-${depthMeters}m`}
      aria-label="Transição de profundidade"
      className={className}
    >
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.65, ease: easeOut }}
      >
        <SectionEyebrow className="mb-3 text-foreground/55">{eyebrow}</SectionEyebrow>
        <div className="mb-5 flex justify-center text-foreground/70 md:mb-6">
          <WaveDivider className="h-2.5 w-[min(10rem,36vw)]" />
        </div>
        <SectionTitle
          as="p"
          display={headline}
          displayClassName="text-foreground"
          className="mx-auto max-w-[14ch]"
        />
      </motion.div>

      <DepthRuler value={`${depthMeters}m`} label={depthLabel} />
    </section>
  );
}
