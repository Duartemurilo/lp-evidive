"use client";

import { CursoBookingCta } from "@/components/cursos/shared/curso-booking-cta";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import {
  useCursoTitleDisplayClassName,
  useCursoWaveWrapClassName,
} from "@/lib/curso-page-accent-context";
import type { CursoCopyBlock } from "@/lib/types/curso-page";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type CursoCopySectionProps = {
  block: CursoCopyBlock;
};

export function CursoCopySection({ block }: CursoCopySectionProps): ReactNode {
  const displayClassName = useCursoTitleDisplayClassName();
  const waveWrapClassName = useCursoWaveWrapClassName();
  const isSand = block.surface === "sand";
  const headingId = block.id ? `${block.id}-heading` : undefined;

  return (
    <section
      id={block.id}
      {...(headingId ? { "aria-labelledby": headingId } : {})}
      className={cn(
        "px-6 py-16 md:py-24 lg:py-28",
        isSand ? "shore-destino-section" : "bg-background",
      )}
    >
      <motion.div
        className="mx-auto max-w-3xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.65, ease: easeOut }}
      >
        {block.eyebrow ? (
          <>
            <SectionEyebrow className="text-foreground/75">{block.eyebrow}</SectionEyebrow>
            <div className={`mt-4 ${waveWrapClassName}`}>
              <WaveDivider />
            </div>
          </>
        ) : null}

        {block.title && !block.titleSans ? (
          <h2
            id={headingId}
            className="font-display mt-5 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-foreground text-balance"
          >
            {block.title}
          </h2>
        ) : block.titleSans || block.titleDisplay ? (
          <SectionTitle
            {...(headingId ? { id: headingId } : {})}
            sans={block.titleSans ?? block.title ?? ""}
            {...(block.titleDisplay ? { display: block.titleDisplay } : {})}
            sansClassName="text-black"
            displayClassName={displayClassName}
            className={cn("mt-5 text-balance", !block.eyebrow && "mt-0")}
          />
        ) : null}

        {block.paragraphs && block.paragraphs.length > 0 ? (
          <div className="mt-6 space-y-4">
            {block.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-[0.98rem] leading-[1.75] text-foreground/88 md:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}

        {block.bullets && block.bullets.length > 0 ? (
          <ul className="mt-8 space-y-3">
            {block.bullets.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[0.95rem] leading-relaxed text-foreground/88 md:text-base"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {block.cta ? (
          <div className="mt-10">
            <CursoBookingCta cta={block.cta} />
          </div>
        ) : null}
      </motion.div>
    </section>
  );
}
