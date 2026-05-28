"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import { freediveConfig } from "@/lib/freedive-config";
import {
  Gauge,
  Heart,
  HeartPulse,
  type LucideIcon,
  Waves,
} from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;
const { intro } = freediveConfig;

const cardIcons = {
  "heart-pulse": HeartPulse,
  waves: Waves,
  gauge: Gauge,
  heart: Heart,
} as const satisfies Record<(typeof intro.cards)[number]["icon"], LucideIcon>;

type FreediveBenefitCard = (typeof intro.cards)[number];

function BenefitCard({
  card,
  index,
}: {
  card: FreediveBenefitCard;
  index: number;
}): ReactNode {
  const Icon = cardIcons[card.icon];

  return (
    <motion.article
      className="overflow-hidden rounded-2xl border border-border/50 bg-muted/70 transition-colors duration-300 hover:bg-muted"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: easeOut,
      }}
    >
      <div className="grid min-h-[10.5rem] grid-cols-1 sm:min-h-0 sm:grid-cols-[7.5rem_minmax(0,1fr)]">
        <div className="flex items-center justify-center bg-primary/10 px-6 py-10 sm:min-h-[10.5rem] sm:py-8">
          <Icon
            className="h-11 w-11 text-primary sm:h-12 sm:w-12"
            strokeWidth={1.65}
            aria-hidden
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-8">
          <h3 className="font-display mb-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
            {card.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed md:text-[0.95rem]">
            {card.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function FreediveIntro(): ReactNode {
  return (
    <section
      id="sobre-freedive"
      className="shore-destino-section px-6 pt-16 pb-24 md:pt-24 md:pb-64 lg:pt-28 lg:pb-80"
    >
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 md:gap-14 lg:flex-row lg:items-start lg:gap-16">
        <motion.div
          className="flex flex-col items-center text-center lg:sticky lg:top-60 lg:w-[min(100%,22rem)] lg:shrink-0 lg:items-start lg:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <div className="mb-5 flex w-full flex-col items-center md:mb-6 lg:items-start">
            <SectionEyebrow className="text-foreground/80">
              {intro.eyebrow}
            </SectionEyebrow>
            <div className="mb-5 mt-4 flex justify-center text-primary sm:mb-6 sm:mt-5 lg:justify-start">
              <WaveDivider />
            </div>
          </div>

          <SectionTitle
            sans={intro.titleSans}
            display={intro.titleDisplay}
            sansClassName="text-black"
            displayClassName="text-primary"
          />

          <div className="mt-6 max-w-xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        <div className="flex min-w-0 flex-1 flex-col gap-6 md:gap-8">
          {intro.cards.map((card, index) => (
            <BenefitCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
