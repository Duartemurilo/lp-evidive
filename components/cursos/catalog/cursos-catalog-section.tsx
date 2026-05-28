"use client";

import { CursoCatalogItemRow } from "@/components/cursos/catalog/curso-catalog-item";
import { cursosConfig } from "@/lib/cursos-config";
import { cursosCatalogCategories } from "@/lib/data/cursos-catalog";
import { reducedMotionVariants, useReducedMotion } from "@/lib/motion";
import {
  sectionTitleBase,
  sectionTitleSans,
  subpagePresenceTitleDisplayInline,
} from "@/lib/typography";
import { cn } from "@/lib/utils";
import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

const listStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
};

const courseCount = cursosCatalogCategories.reduce(
  (total, category) => total + category.courses.length,
  0,
);

export function CursosCatalogSection(): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const cardVariants = prefersReducedMotion ? reducedMotionVariants : undefined;
  const { catalog } = cursosConfig;

  return (
    <section
      id={catalog.sectionId}
      aria-labelledby="cursos-catalog-heading"
      className="scroll-mt-24 bg-background px-6 py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-[minmax(13.5rem,17rem)_minmax(0,1fr)] lg:gap-x-12 xl:gap-x-16">
          <nav
            aria-label="Categorias de cursos"
            className="hidden lg:block lg:pt-3"
          >
            <ul className="flex flex-col gap-2">
              {cursosCatalogCategories.map((category) => (
                <li key={category.id}>
                  <a
                    href={`#cursos-category-${category.id}`}
                    className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                  >
                    {category.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0">
            <motion.header
              className="flex flex-col gap-6 border-b border-border/40 pb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, ease: easeOut }}
            >
              <h2
                id="cursos-catalog-heading"
                className={cn(
                  sectionTitleBase,
                  "mx-auto max-w-[20ch] text-center text-balance lg:mx-0 lg:max-w-none lg:text-left",
                )}
              >
                <span className={cn(sectionTitleSans, "text-black")}>
                  {catalog.headingSans}
                  <span
                    className={cn(
                      subpagePresenceTitleDisplayInline,
                      "text-primary",
                    )}
                  >
                    {catalog.headingDisplay}
                  </span>
                </span>
              </h2>
              <p className="text-center text-sm text-muted-foreground lg:text-left">
                {courseCount === 1 ? "1 curso" : `${courseCount} cursos`}
              </p>
            </motion.header>

            <div className="mt-8 space-y-14 lg:mt-12 lg:space-y-16">
              {cursosCatalogCategories.map((category) => (
                <motion.section
                  key={category.id}
                  id={`cursos-category-${category.id}`}
                  aria-labelledby={`cursos-category-heading-${category.id}`}
                  className="scroll-mt-28"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.12 }}
                  variants={listStagger}
                >
                  <h3
                    id={`cursos-category-heading-${category.id}`}
                    className="font-display text-[clamp(1.35rem,2.6vw,1.85rem)] font-bold tracking-tight text-foreground"
                  >
                    {category.title}
                  </h3>
                  <motion.ul className="mt-5 flex flex-col gap-3 md:mt-6 md:gap-4">
                    {category.courses.map((course) => (
                      <CursoCatalogItemRow
                        key={course.slug}
                        course={course}
                        {...(cardVariants ? { variants: cardVariants } : {})}
                      />
                    ))}
                  </motion.ul>
                </motion.section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
