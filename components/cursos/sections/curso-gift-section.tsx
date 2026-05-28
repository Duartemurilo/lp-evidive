"use client";

import { SectionTitle } from "@/components/section-title";
import type { CursoGiftBlock } from "@/lib/types/curso-page";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type CursoGiftSectionProps = {
  block: CursoGiftBlock;
};

export function CursoGiftSection({ block }: CursoGiftSectionProps): ReactNode {
  return (
    <section
      id={block.id}
      aria-labelledby={block.id ? `${block.id}-heading` : undefined}
      className="bg-background px-6 py-16 md:py-24 lg:py-28"
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
          <div className="mt-6 space-y-4">
            {block.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-[0.98rem] leading-[1.75] text-foreground/88 md:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
