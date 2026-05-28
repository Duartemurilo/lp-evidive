"use client";

import { CursoBookingCta } from "@/components/cursos/shared/curso-booking-cta";
import { CursoYoutubeEmbed } from "@/components/cursos/shared/curso-youtube-embed";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import {
  useCursoTitleDisplayClassName,
  useCursoWaveWrapClassName,
} from "@/lib/curso-page-accent-context";
import type { CursoSplitMediaBlock } from "@/lib/types/curso-page";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type CursoSplitMediaSectionProps = {
  block: CursoSplitMediaBlock;
};

export function CursoSplitMediaSection({ block }: CursoSplitMediaSectionProps): ReactNode {
  const displayClassName = useCursoTitleDisplayClassName();
  const waveWrapClassName = useCursoWaveWrapClassName();
  const isCentered = block.layout === "centered";
  const mediaFirst = block.mediaPosition === "left";
  const isSand = block.surface === "sand";

  const content = (
    <motion.div
      className={cn(
        "flex flex-col justify-center",
        isCentered && "mx-auto max-w-3xl items-center text-center",
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: easeOut }}
    >
      {block.eyebrow ? (
        <>
          <SectionEyebrow className="text-muted-foreground">{block.eyebrow}</SectionEyebrow>
          <div
            className={cn(
              "mt-4",
              waveWrapClassName,
              isCentered && "flex justify-center",
            )}
          >
            <WaveDivider />
          </div>
        </>
      ) : null}
      <SectionTitle
        {...(block.id ? { id: `${block.id}-heading` } : {})}
        sans={block.titleSans}
        {...(block.titleDisplay ? { display: block.titleDisplay } : {})}
        sansClassName="text-black"
        displayClassName={displayClassName}
        className={cn("text-pretty", block.eyebrow && "mt-4", isCentered && "text-balance")}
      />
      <div className={cn("mt-6 space-y-4", isCentered && "max-w-2xl")}>
        {block.paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="text-[0.98rem] leading-[1.75] text-foreground/88 md:text-base"
          >
            {paragraph}
          </p>
        ))}
      </div>
      {block.cta ? (
        <div className={cn("mt-8", isCentered && "flex justify-center")}>
          <CursoBookingCta cta={block.cta} />
        </div>
      ) : null}
    </motion.div>
  );

  const media = block.video ? (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: 0.06, ease: easeOut }}
    >
      <CursoYoutubeEmbed video={block.video} />
    </motion.div>
  ) : null;

  return (
    <section
      id={block.id}
      aria-labelledby={block.id ? `${block.id}-heading` : undefined}
      className={cn(
        "px-6 py-16 md:py-24 lg:py-28",
        isSand ? "shore-destino-section" : "bg-background",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl",
          isCentered
            ? "flex justify-center px-0"
            : "grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16",
        )}
      >
        {isCentered ? (
          content
        ) : (
          <>
            <div className={cn(mediaFirst ? "lg:order-1" : "lg:order-2")}>{media}</div>
            <div className={cn(mediaFirst ? "lg:order-2" : "lg:order-1")}>{content}</div>
          </>
        )}
      </div>
    </section>
  );
}
