"use client";

import { CursoBookingCta } from "@/components/cursos/shared/curso-booking-cta";
import { SectionTitle } from "@/components/section-title";
import type { CursoPadiBlock } from "@/lib/types/curso-page";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type CursoPadiSectionProps = {
  block: CursoPadiBlock;
};

function isParagraphSubheading(text: string): boolean {
  return text.length < 48 && text.endsWith("?");
}

export function CursoPadiSection({ block }: CursoPadiSectionProps): ReactNode {
  const headingId = block.id ? `${block.id}-heading` : undefined;

  return (
    <section
      id={block.id}
      {...(headingId ? { "aria-labelledby": headingId } : { "aria-label": block.subtitle })}
      className="relative scroll-mt-6 overflow-visible bg-background"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[45%] bg-[var(--shore-sand)] lg:h-[52%]"
      />

      <div className="relative flex flex-col lg:grid lg:grid-cols-2 lg:items-start">
        <motion.div
          className="relative z-10 flex flex-col justify-center px-6 pb-10 pt-14 sm:px-10 md:pb-12 md:pt-16 lg:sticky lg:top-60 lg:h-fit lg:self-start lg:px-12 lg:pb-24 lg:pt-24 xl:px-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          <figure className="mx-auto w-full max-w-[15rem] sm:max-w-[17rem] lg:mx-0 lg:ml-auto lg:mr-6 lg:max-w-[19rem] xl:max-w-[21rem]">
            <Image
              src={block.illustrationSrc}
              alt={block.illustrationAlt ?? "PADI 5 Star Dive Center"}
              width={640}
              height={480}
              className="h-auto w-full object-contain drop-shadow-[0_20px_48px_rgba(4,24,32,0.1)]"
            />
          </figure>
        </motion.div>

        <motion.aside
          className={cn(
            "relative z-20 w-full bg-foreground text-white",
            "lg:min-h-0 lg:rounded-tl-[1.75rem] xl:rounded-tl-3xl",
          )}
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: easeOut }}
        >
          <div className="flex min-h-full flex-col justify-center px-7 py-10 sm:px-10 md:px-12 md:py-14 lg:px-14 lg:py-16 xl:px-[clamp(3rem,5vw,5rem)] xl:py-20">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-primary md:text-xs">
              {block.subtitle}
            </p>

            <SectionTitle
              {...(headingId ? { id: headingId } : {})}
              sans={block.title}
              sansClassName="text-white"
              className="mt-4 max-w-[26ch] text-balance lg:max-w-[20ch] xl:max-w-[22ch]"
            />

            <div className="mt-8 space-y-5 border-t border-white/12 pt-8">
              {block.paragraphs.map((paragraph) =>
                isParagraphSubheading(paragraph) ? (
                  <h3
                    key={paragraph}
                    className="font-display pt-1 text-lg font-bold tracking-tight text-white md:text-xl"
                  >
                    {paragraph}
                  </h3>
                ) : (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="max-w-2xl text-[0.98rem] leading-[1.8] text-white/82 md:text-base"
                  >
                    {paragraph}
                  </p>
                ),
              )}
            </div>

            <div className="mt-10 border-t border-white/10 pt-8">
              <CursoBookingCta cta={block.cta} size="large" />
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
