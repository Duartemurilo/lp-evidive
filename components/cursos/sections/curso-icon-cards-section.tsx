"use client";

import { CursoBookingCta } from "@/components/cursos/shared/curso-booking-cta";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import type { CursoIconCard, CursoIconCardsBlock } from "@/lib/types/curso-page";
import { sectionWaveWrapOnLight } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

function IconCard({ card, index }: { card: CursoIconCard; index: number }): ReactNode {
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
      <div className="grid min-h-[12.5rem] grid-cols-1 sm:min-h-[13.5rem] sm:grid-cols-[14rem_minmax(0,1fr)] md:min-h-[18rem] md:grid-cols-[18rem_minmax(0,1fr)] lg:min-h-[21rem] lg:grid-cols-[20rem_minmax(0,1fr)]">
        <div className="relative flex min-h-[11rem] items-center justify-center bg-primary/10 sm:min-h-full md:min-h-[18rem] lg:min-h-[21rem]">
          <Image
            src={card.iconSrc}
            alt={card.iconAlt ?? ""}
            width={88}
            height={88}
            className="h-16 w-16 object-contain sm:h-20 sm:w-20 md:h-24 md:w-24"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-8 md:px-9 md:py-12 lg:px-10 lg:py-14">
          <h3 className="font-display mb-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
            {card.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed md:text-[0.95rem]">
            {card.description}
          </p>
          {card.bullets && card.bullets.length > 0 ? (
            <ul className="text-muted-foreground mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed md:text-[0.95rem]">
              {card.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

type CursoIconCardsSectionProps = {
  block: CursoIconCardsBlock;
};

export function CursoIconCardsSection({ block }: CursoIconCardsSectionProps): ReactNode {
  const isSand = block.surface === "sand";
  const sectionCta = block.cta
    ? { ...block.cta, variant: "schedule" as const }
    : undefined;

  return (
    <section
      id={block.id}
      className={cn(
        "relative -mt-px scroll-mt-6 px-6 py-16 md:pb-24 md:pt-24 lg:pb-28 lg:pt-32",
        isSand ? "shore-destino-section" : "bg-background",
      )}
    >
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 md:gap-14 lg:flex-row-reverse lg:items-start lg:gap-16">
        <motion.div
          className="lg:sticky lg:top-60 lg:w-[min(100%,22rem)] lg:shrink-0"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {block.eyebrow ? (
              <>
                <SectionEyebrow className="text-foreground/80">{block.eyebrow}</SectionEyebrow>
                <div
                  className={cn(
                    "mb-5 mt-4 flex justify-center sm:mb-6 sm:mt-5 lg:justify-start",
                    sectionWaveWrapOnLight,
                  )}
                >
                  <WaveDivider />
                </div>
              </>
            ) : null}
            <SectionTitle
              sans={block.titleSans}
              {...(block.titleDisplay ? { display: block.titleDisplay } : {})}
              sansClassName="text-black"
              displayClassName="text-foreground"
            />
            {block.intro ? (
              <p className="text-muted-foreground mt-5 max-w-md text-sm leading-relaxed md:text-base">
                {block.intro}
              </p>
            ) : null}
            {sectionCta ? (
              <div className="mt-8 flex w-full justify-center lg:justify-start">
                <CursoBookingCta cta={sectionCta} className="max-w-md" />
              </div>
            ) : null}
          </div>
        </motion.div>

        <div className="flex min-w-0 flex-1 flex-col gap-5 md:gap-6">
          {block.cards.map((card, index) => (
            <IconCard key={card.title} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
