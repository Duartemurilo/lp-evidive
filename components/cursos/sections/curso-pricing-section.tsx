"use client";

import { CursoBookingCta } from "@/components/cursos/shared/curso-booking-cta";
import { SectionTitle } from "@/components/section-title";
import type { CursoPricingBlock } from "@/lib/types/curso-page";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type CursoPricingSectionProps = {
  block: CursoPricingBlock;
};

export function CursoPricingSection({ block }: CursoPricingSectionProps): ReactNode {
  return (
    <section
      id={block.id}
      aria-labelledby={block.id ? `${block.id}-heading` : undefined}
      className="shore-destino-section px-6 py-16 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: easeOut }}
        >
          <SectionTitle
            {...(block.id ? { id: `${block.id}-heading` } : {})}
            sans={block.title}
            sansClassName="text-black"
            className="text-balance"
          />
          <p className="font-display mt-8 text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight text-primary">
            {block.installmentLabel}
          </p>
          <p className="mt-2 text-lg text-foreground/80 md:text-xl">{block.cashLabel}</p>
          <div className="mt-10 flex justify-center">
            <CursoBookingCta cta={block.cta} size="large" />
          </div>
          <p className="mt-8 text-sm leading-relaxed text-muted-foreground md:text-base">
            {block.footnote.replace(/\*\*/g, "")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
