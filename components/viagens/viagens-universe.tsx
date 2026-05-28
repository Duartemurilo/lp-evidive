"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import { reducedMotionVariants, useReducedMotion } from "@/lib/motion";
import { useScrollRootRef } from "@/lib/use-scroll-root";
import { viagensConfig } from "@/lib/viagens-config";
import {
  ArrowDown,
  ArrowRight,
  Plane,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion, useInView, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;
const { universe } = viagensConfig;

const optionIcons = {
  plane: Plane,
  users: Users,
} as const satisfies Record<(typeof universe.options)[number]["icon"], LucideIcon>;

const headerStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const headerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const cardsStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.22,
    },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

type UniverseOption = (typeof universe.options)[number];

function UniverseOptionCard({
  option,
  index,
  variants,
}: {
  option: UniverseOption;
  index: number;
  variants: Variants;
}): ReactNode {
  const Icon = optionIcons[option.icon];
  const featured = index === 0;
  const isAnchor = option.cta.href.startsWith("#");
  const ActionIcon = isAnchor ? ArrowDown : ArrowRight;

  return (
    <motion.a
      href={option.cta.href}
      variants={variants}
      {...(isAnchor ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className={`group block h-full cursor-pointer rounded-2xl border bg-white/95 p-5 text-left shadow-[0_12px_40px_rgba(8,32,42,0.18)] backdrop-blur-sm transition-[border-color,box-shadow] duration-500 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:p-5 ${
        featured ? "border-primary/35" : "border-white/60"
      }`}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 48px rgba(8,32,42,0.22)",
      }}
      aria-label={`${option.title} — ${option.description}`}
    >
      <div className="flex items-start gap-3.5">
        <div
          className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border shadow-[0_8px_24px_rgba(30,196,180,0.14)] transition-all duration-500 group-hover:scale-105 sm:h-14 sm:w-14 ${
            featured
              ? "border-primary/25 bg-white text-primary"
              : "border-primary/20 bg-[#f7f6f3] text-primary"
          }`}
        >
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.85} aria-hidden />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-[1.02rem] font-bold leading-tight text-foreground sm:text-[1.08rem]">
                {option.title}
              </h3>
              <p className="mt-1 max-w-[18rem] text-[0.82rem] leading-snug text-muted-foreground sm:text-[0.9rem]">
                {option.description}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="font-display text-base font-bold tracking-tight text-primary sm:text-lg">
                {option.cta.label}
              </span>
              <ActionIcon
                className={`h-4 w-4 text-primary/45 transition-all duration-300 group-hover:text-primary ${
                  isAnchor ? "group-hover:translate-y-0.5" : "group-hover:translate-x-0.5"
                }`}
                strokeWidth={2.25}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export function ViagensUniverse(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRootRef = useScrollRootRef();
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(sectionRef, {
    root: scrollRootRef,
    once: true,
    amount: 0.28,
  });

  const headerVariants = prefersReducedMotion ? reducedMotionVariants : headerStagger;
  const headerChildVariants = prefersReducedMotion ? reducedMotionVariants : headerItem;
  const cardsVariants = prefersReducedMotion ? reducedMotionVariants : cardsStagger;
  const cardVariants = prefersReducedMotion ? reducedMotionVariants : cardReveal;

  return (
    <section
      ref={sectionRef}
      id={universe.id}
      aria-labelledby="viagens-universo-heading"
      className="shore-destino-section px-6 pt-28 pb-24 md:pt-36 md:pb-32 lg:pt-44 lg:pb-40"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          className="mb-8 flex flex-col items-center text-center md:mb-10"
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={headerChildVariants}>
            <SectionEyebrow className="text-foreground/75">{universe.eyebrow}</SectionEyebrow>
          </motion.div>
          <motion.div
            variants={headerChildVariants}
            className="mb-5 mt-4 text-primary sm:mb-6 sm:mt-5"
          >
            <WaveDivider />
          </motion.div>
          <motion.div variants={headerChildVariants}>
            <SectionTitle
              id="viagens-universo-heading"
              sans={universe.titleSans}
              display={universe.titleDisplay}
              sansClassName="text-black"
              displayClassName="text-primary"
              className="text-balance"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-4xl grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-4"
          variants={cardsVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {universe.options.map((option, index) => (
            <UniverseOptionCard
              key={option.id}
              option={option}
              index={index}
              variants={cardVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
