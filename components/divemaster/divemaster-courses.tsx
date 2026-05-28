"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { WaveDivider } from "@/components/wave-divider";
import { divemasterConfig } from "@/lib/divemaster-config";
import { sectionTitleBase, sectionTitleDisplay } from "@/lib/typography";
import {
  EVI_LAGO_SECTION_HEIGHT_VH,
  useEviLagoScrollExpand,
} from "@/lib/use-evilago-scroll-expand";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { LiquidCardImage } from "@/components/liquid-card-image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;
const CONTENT_PARALLAX_Y_START = 12;
const { courses } = divemasterConfig;

type DivemasterCourseCard = (typeof courses.cards)[number];

type CourseCardProps = {
  course: DivemasterCourseCard;
  layout: "featured" | "wide";
  variant: "stacked" | "immersive";
  index: number;
  className?: string;
};

function CourseCard({
  course,
  layout,
  variant,
  index,
  className,
}: CourseCardProps): ReactNode {
  const isFeatured = layout === "featured";
  const isStacked = variant === "stacked";

  return (
    <motion.article
      className={`group/card relative z-10 flex min-h-0 w-full flex-col overflow-hidden rounded-2xl bg-background ${
        isFeatured
          ? "border-2 border-primary shadow-[0_16px_48px_rgba(30,196,180,0.22)]"
          : "border border-border/45"
      } ${className ?? ""}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: easeOut }}
    >
      <div
        className={`relative isolate w-full shrink-0 overflow-hidden ${
          isStacked
            ? "aspect-[16/10]"
            : isFeatured
              ? "aspect-[4/5] sm:aspect-[5/6] lg:aspect-auto lg:min-h-0 lg:flex-[1.2]"
              : "aspect-[16/10] min-h-[11rem] lg:aspect-[16/10] lg:min-h-[12rem]"
        }`}
      >
        <LiquidCardImage
          key={course.id}
          src={course.image}
          sizes={
            isStacked
              ? "100vw"
              : isFeatured
                ? "(max-width: 1024px) 100vw, 42vw"
                : "(max-width: 1024px) 100vw, 58vw"
          }
          className="absolute inset-0 z-0"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[rgba(4,24,32,0.42)] via-transparent to-transparent"
        />
        <span className="pointer-events-none absolute left-4 top-4 z-[2] inline-flex w-fit rounded-sm bg-white/14 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm md:left-5 md:top-5 md:text-[0.68rem]">
          {course.label}
        </span>
      </div>

      <div
        className={`flex flex-col bg-background ${
          isFeatured
            ? "shrink-0 px-5 py-6 md:px-6 md:py-7 lg:px-7 lg:py-8"
            : "min-h-0 flex-1 px-5 py-5 md:px-6 md:py-6 lg:px-7 lg:py-7"
        }`}
      >
        <h3
          className={`font-display font-bold tracking-tight text-foreground ${
            isFeatured
              ? "text-[clamp(1.35rem,2.4vw,1.85rem)] leading-[1.08]"
              : "text-[clamp(1.2rem,2vw,1.55rem)] leading-[1.1]"
          }`}
        >
          {course.title}
        </h3>

        <p
          className={`mt-3 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem] ${
            isFeatured ? "max-w-md" : "max-w-2xl"
          }`}
        >
          {course.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2 md:mt-5">
          {course.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-sm border border-border/50 bg-muted/70 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-foreground/70 md:text-[0.62rem]"
            >
              {tag}
            </li>
          ))}
        </ul>

        <Link
          href={course.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 self-start text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary md:mt-6 md:text-xs"
        >
          {course.cta.text}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/card:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}

function DivemasterCoursesHeader({
  headingId,
  className,
  eyebrowClassName,
  titleClassName,
  subtitleClassName,
}: {
  headingId?: string;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}): ReactNode {
  return (
    <motion.header
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.65, ease: easeOut }}
    >
      <div className="flex w-full flex-col items-center lg:items-start">
        <SectionEyebrow className={eyebrowClassName ?? ""}>{courses.eyebrow}</SectionEyebrow>
        <div className="mt-4 flex w-full justify-center text-primary lg:justify-start">
          <WaveDivider />
        </div>
      </div>
      <h2
        {...(headingId ? { id: headingId } : {})}
        className={`mt-5 max-w-[18ch] ${sectionTitleBase} ${titleClassName ?? ""}`}
      >
        <span className={`block ${sectionTitleDisplay}`}>{courses.title}</span>
      </h2>
      <p className={`mt-5 max-w-xl text-sm leading-relaxed md:text-base ${subtitleClassName ?? ""}`}>
        {courses.subtitle}
      </p>
    </motion.header>
  );
}

function DivemasterCoursesMobile({
  nivel1,
  nivel2,
}: {
  nivel1: DivemasterCourseCard;
  nivel2: DivemasterCourseCard;
}): ReactNode {
  return (
    <div className="px-6 py-20 md:py-28 lg:hidden">
      <div className="mx-auto flex max-w-2xl flex-col gap-10 md:max-w-3xl md:gap-12">
        <DivemasterCoursesHeader
          headingId="divemaster-cursos-heading"
          className="text-center"
          eyebrowClassName="text-foreground/70"
          titleClassName="text-foreground"
          subtitleClassName="mx-auto text-muted-foreground"
        />

        <div className="flex flex-col gap-6 md:gap-8">
          <CourseCard course={nivel1} layout="featured" variant="stacked" index={0} />
          <CourseCard course={nivel2} layout="wide" variant="stacked" index={1} />
        </div>
      </div>
    </div>
  );
}

function DivemasterCoursesDesktop({
  nivel1,
  nivel2,
}: {
  nivel1: DivemasterCourseCard;
  nivel2: DivemasterCourseCard;
}): ReactNode {
  const stickyRef = useRef<HTMLDivElement>(null);
  const mediaShellRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const desktopSectionRef = useRef<HTMLDivElement>(null);

  useEviLagoScrollExpand({
    sectionRef: desktopSectionRef,
    stickyRef,
    mediaShellRef,
    mediaRef,
    contentRef,
    expandSides: "both",
  });

  return (
    <div
      ref={desktopSectionRef}
      className="relative z-[1] hidden w-full overflow-hidden lg:block"
      style={{ height: `${EVI_LAGO_SECTION_HEIGHT_VH}vh` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 flex h-dvh w-full flex-col overflow-hidden px-[1.5vw]"
      >
        <div
          ref={mediaShellRef}
          className="relative min-h-0 flex-1 overflow-hidden rounded-3xl bg-foreground text-background"
        >
          <div className="mx-auto grid h-full min-h-0 w-full max-w-[90rem] grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] grid-rows-[auto_minmax(0,1fr)] items-stretch gap-10 px-12 py-16 xl:gap-12 xl:px-16">
            <motion.header
              ref={contentRef}
              className="relative z-0 col-start-2 row-start-1 flex will-change-transform flex-col items-start text-left"
              style={{ transform: `translateY(${CONTENT_PARALLAX_Y_START}px)` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, ease: easeOut }}
            >
              <DivemasterCoursesHeader
                eyebrowClassName="text-background/65"
                titleClassName="text-background"
                subtitleClassName="text-background/72"
              />
            </motion.header>

            <CourseCard
              course={nivel1}
              layout="featured"
              variant="immersive"
              index={0}
              className="col-start-1 row-span-2 row-start-1 h-full min-h-0"
            />

            <CourseCard
              course={nivel2}
              layout="wide"
              variant="immersive"
              index={1}
              className="col-start-2 row-start-2 h-full min-h-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DivemasterCourses(): ReactNode {
  const [nivel1, nivel2] = courses.cards;

  if (!nivel1 || !nivel2) return null;

  return (
    <section
      id={courses.id}
      aria-labelledby="divemaster-cursos-heading"
      className="relative w-full overflow-hidden bg-background"
    >
      <DivemasterCoursesMobile nivel1={nivel1} nivel2={nivel2} />
      <DivemasterCoursesDesktop nivel1={nivel1} nivel2={nivel2} />
    </section>
  );
}
