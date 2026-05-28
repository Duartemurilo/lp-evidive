"use client";

import { getCursoCatalogItemId } from "@/lib/cursos-routes";
import type { CursoCatalogItem } from "@/lib/data/cursos-catalog";
import { getCursoDetailHref } from "@/lib/cursos-routes";
import { reducedMotionVariants, useReducedMotion } from "@/lib/motion";
import { motion, type Variants } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

const itemReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

type CursoCatalogItemRowProps = {
  course: CursoCatalogItem;
  variants?: Variants;
};

export function CursoCatalogItemRow({
  course,
  variants,
}: CursoCatalogItemRowProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = prefersReducedMotion ? reducedMotionVariants : (variants ?? itemReveal);
  const href = getCursoDetailHref(course);

  return (
    <motion.li
      id={getCursoCatalogItemId(course.slug)}
      variants={motionVariants}
      className="scroll-mt-[7.5rem] list-none sm:scroll-mt-28"
    >
      <Link
        href={href}
        className="group/curso flex items-center justify-between gap-4 rounded-xl border border-border/35 bg-[#f4f2ee] px-5 py-4 transition-[border-color,box-shadow] duration-300 hover:border-primary/25 hover:shadow-[0_10px_32px_rgba(8,32,42,0.08)] md:px-6 md:py-5"
        aria-label={`Saiba mais sobre ${course.title}`}
      >
        <div className="min-w-0">
          <h4 className="font-display text-[clamp(1.05rem,2vw,1.25rem)] font-bold leading-tight tracking-tight text-foreground">
            {course.title}
          </h4>
          {course.subtitle ? (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {course.subtitle}
            </p>
          ) : null}
        </div>
        <span className="shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary transition-colors group-hover/curso:text-primary/80 md:text-xs">
          Saiba mais »
        </span>
      </Link>
    </motion.li>
  );
}
