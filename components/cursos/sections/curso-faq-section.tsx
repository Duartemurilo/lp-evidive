"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import type { CursoFaqBlock } from "@/lib/types/curso-page";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

function FaqItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}): ReactNode {
  return (
    <motion.div
      className="border-foreground/10 border-b last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: easeOut }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full cursor-pointer items-center justify-between py-6 text-left"
      >
        <span className="pr-8 text-lg font-medium text-foreground md:text-xl">
          {question}
        </span>
        <motion.div
          className="shrink-0 text-foreground/50"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: easeOut }}
        >
          <ChevronDown className="h-5 w-5" aria-hidden />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base leading-relaxed text-muted-foreground">
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

type CursoFaqSectionProps = {
  block: CursoFaqBlock;
};

export function CursoFaqSection({ block }: CursoFaqSectionProps): ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section
      id={block.id}
      aria-labelledby={block.id ? `${block.id}-heading` : undefined}
      className="bg-background px-6 py-16 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          ref={headerRef}
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <SectionEyebrow className="text-foreground/70">{block.eyebrow}</SectionEyebrow>
          <h2
            id={block.id ? `${block.id}-heading` : undefined}
            className="font-display mt-4 text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-foreground"
          >
            {block.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          {block.items.map((item, index) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>

        {block.closing ? (
          <motion.p
            className="mt-12 text-center text-base leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
          >
            {block.closing}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
