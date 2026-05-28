"use client";

import { SectionTitle } from "@/components/section-title";
import type { CursoIncludedBlock } from "@/lib/types/curso-page";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type CursoIncludedSectionProps = {
  block: CursoIncludedBlock;
};

export function CursoIncludedSection({ block }: CursoIncludedSectionProps): ReactNode {
  return (
    <section
      id={block.id}
      aria-labelledby={block.id ? `${block.id}-heading` : undefined}
      className="shore-destino-section px-6 py-16 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: easeOut }}
        >
          <SectionTitle
            {...(block.id ? { id: `${block.id}-heading` } : {})}
            sans={block.title}
            sansClassName="text-black"
            className="text-balance"
          />
          {block.intro ? (
            <p className="mt-6 text-[0.98rem] leading-[1.75] text-foreground/88 md:text-base">
              {block.intro}
            </p>
          ) : null}
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            São eles:
          </p>
          <ul className="mt-5 space-y-3">
            {block.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[0.95rem] leading-relaxed text-foreground/88"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {block.footer ? (
            <p className="mt-8 text-[0.98rem] leading-[1.75] text-foreground/88 md:text-base">
              {block.footer}
            </p>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
