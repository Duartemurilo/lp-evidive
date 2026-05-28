"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import {
  sectionTitleBase,
  sectionTitleDisplay,
  sectionTitleSans,
  sectionWaveWrapOnLight,
} from "@/lib/typography";
import { WaveDivider } from "@/components/wave-divider";
import { formacaoCourses, type FormacaoCourse } from "@/lib/formacao-courses";
import {
  especializacoesCourses,
  especializacoesPageHref,
  especializacoesSectionHref,
  especializacoesSectionId,
} from "@/lib/especializacoes-courses";
import { ArrowRight, Star } from "lucide-react";
import { reducedMotionVariants, useReducedMotion } from "@/lib/motion";
import { motion, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

const cardTrackStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.06,
    },
  },
};

const cardRevealFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

function CourseCard({
  course,
  variants,
  ctaLabel = "Descobrir experiência",
}: {
  course: FormacaoCourse;
  variants: Variants;
  ctaLabel?: string;
}): ReactNode {
  const isFeatured = course.featured === true;
  const hasFeatures = course.features.length > 0;

  return (
    <motion.article
      variants={variants}
      className={`formacao-course-card group/card relative flex h-[min(34rem,72vh)] w-[min(82vw,22rem)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl md:h-[min(36rem,68vh)] md:w-[min(42vw,21.5rem)] lg:w-[min(38vw,20.5rem)] xl:w-[21.5rem] ${
        isFeatured
          ? "order-first border-2 border-primary shadow-[0_16px_48px_rgba(30,196,180,0.22)] lg:order-none"
          : "border border-white/10"
      }`}
    >
      <Image
        src={course.image}
        alt=""
        fill
        sizes="(max-width: 768px) 82vw, 344px"
        className="object-cover transition-transform duration-700 group-hover/card:scale-[1.03]"
      />
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[rgba(4,24,32,0.92)] via-[rgba(4,24,32,0.58)] to-[rgba(4,24,32,0.28)]"
      />

      <div className="relative z-10 flex h-full flex-col p-5 md:p-6">
        <span className="inline-flex w-fit rounded-sm bg-white/14 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm md:text-[0.68rem]">
          {course.duration}
        </span>

        <div className="mt-auto flex flex-col pt-10 md:pt-12">
          {isFeatured && hasFeatures ? (
            <span className="mb-3 inline-flex w-fit items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary md:text-xs">
              <Star className="h-3.5 w-3.5 fill-primary" strokeWidth={0} />
              Mais escolhido
            </span>
          ) : null}

          <h3 className="font-display text-[clamp(1.45rem,3vw,1.85rem)] font-bold leading-[1.05] tracking-tight text-white">
            {course.title}
          </h3>
          <p className="mt-4 max-w-[18rem] text-sm leading-relaxed text-white/88 md:mt-5 md:text-[0.95rem]">
            {course.description}
          </p>

          {hasFeatures ? (
            <ul className="mt-5 space-y-2.5 text-sm text-white/82 md:mt-6 md:text-[0.9rem]">
              {course.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <span
                    aria-hidden
                    className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <Link
          href={course.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:text-primary md:text-xs"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/card:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  );
}

function FormacaoCards({
  courses,
  ctaLabel,
}: {
  courses: FormacaoCourse[];
  ctaLabel?: string;
}): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const cardVariants = prefersReducedMotion ? reducedMotionVariants : cardRevealFromLeft;

  return (
    <div className="relative -mx-6 min-w-0 md:-mx-10 lg:mx-0 lg:overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={cardTrackStagger}
        className="formacao-cards-track scrollbar-hide flex touch-pan-x snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-6 pb-1 [-webkit-overflow-scrolling:touch] [scroll-padding-inline:1.5rem] md:gap-5 md:px-10 lg:pointer-events-auto lg:overflow-visible lg:px-0"
      >
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            variants={cardVariants}
            {...(ctaLabel ? { ctaLabel } : {})}
          />
        ))}
      </motion.div>
    </div>
  );
}

function FormacaoIntroBanner(): ReactNode {
  return (
    <div
      id="explore-mergulhadores"
      data-depth-label="Mergulhadores"
      data-depth="-50m"
      className="bg-background px-6 py-20 text-center md:py-28 lg:py-36"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="mx-auto max-w-3xl"
      >
        <SectionEyebrow className="text-foreground/55">Explore</SectionEyebrow>
        <div className={`mt-4 flex justify-center ${sectionWaveWrapOnLight}`}>
          <WaveDivider />
        </div>
        <p className={`mx-auto mt-5 max-w-[18ch] md:mt-6 ${sectionTitleBase}`}>
          <span className={`block ${sectionTitleDisplay} text-foreground`}>Mergulhadores</span>
          <span className={`mt-1 block ${sectionTitleSans} text-black`}>
            Sua jornada começa aqui.
          </span>
        </p>
      </motion.div>
    </div>
  );
}

type FormacaoBlockProps = {
  chessboardRow: 1 | 2;
  imageCorner: "top-left" | "bottom-right";
  imageSrc: string;
  imageObjectPosition?: string;
  eyebrow: string;
  headingId: string;
  titleSans: string;
  titleDisplay: string;
  pageHref: string;
  pageAriaLabel: string;
  pageLinkLabel?: string;
  openPageInNewTab?: boolean;
  courses: FormacaoCourse[];
  ctaLabel?: string;
  footerNote?: string;
  glued?: "top" | "bottom" | "none";
  alignArrowWithThirdCard?: boolean;
  contentId?: string;
  contentDepthLabel?: string;
  contentDepth?: string;
};

function FormacaoBlock({
  chessboardRow,
  imageCorner,
  imageSrc,
  imageObjectPosition = "center 22%",
  eyebrow,
  headingId,
  titleSans,
  titleDisplay,
  pageHref,
  pageAriaLabel,
  pageLinkLabel = "Ver mais cursos",
  openPageInNewTab = true,
  courses,
  ctaLabel,
  footerNote,
  glued = "none",
  alignArrowWithThirdCard = false,
  contentId,
  contentDepthLabel,
  contentDepth,
}: FormacaoBlockProps): ReactNode {
  const isTopLeftImage = imageCorner === "top-left";
  const imageGridClass =
    chessboardRow === 1
      ? "lg:col-start-1 lg:row-start-1"
      : "lg:col-start-2 lg:row-start-2";
  const contentGridClass =
    chessboardRow === 1
      ? "lg:col-start-2 lg:row-start-1"
      : "lg:col-start-1 lg:row-start-2";

  const contentPadding =
    glued === "top"
      ? "px-6 pt-12 pb-0 md:px-10 md:pt-16 md:pb-0 lg:min-h-[min(64vh,52rem)] lg:px-12 lg:pt-20 lg:pb-10 xl:px-14 xl:pt-24 xl:pb-12"
      : glued === "bottom"
        ? "px-6 pt-0 pb-12 md:px-10 md:pt-0 md:pb-16 lg:min-h-[min(64vh,52rem)] lg:px-12 lg:pb-20 lg:pt-20 xl:px-14 xl:pb-24 xl:pt-24"
        : "px-6 py-12 md:px-10 md:py-16 lg:px-12 lg:py-20 xl:px-14 xl:py-24";

  const pageLinkClass =
    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition-transform group-hover/page-link:scale-105 md:h-14 md:w-14";

  const pageLink = (
    <Link
      href={pageHref}
      {...(openPageInNewTab
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      aria-label={pageAriaLabel}
      className="group/page-link inline-flex shrink-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:gap-4"
    >
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-black transition-colors group-hover/page-link:text-black/75 md:text-xs">
        {pageLinkLabel}
      </span>
      <span aria-hidden className={pageLinkClass}>
        <ArrowRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
      </span>
    </Link>
  );

  return (
    <>
      <motion.div
        className={`relative hidden min-h-[min(64vh,52rem)] lg:block lg:h-full lg:min-h-0 ${imageGridClass}`}
        initial={{ opacity: 0, scale: 1.02 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          priority={false}
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-cover"
          style={{ objectPosition: imageObjectPosition }}
        />
        <div
          aria-hidden
          className={
            isTopLeftImage
              ? "absolute inset-0 bg-[linear-gradient(180deg,rgba(242,239,233,0.08)_0%,rgba(242,239,233,0)_28%,rgba(242,239,233,0.18)_100%)] lg:bg-[linear-gradient(90deg,rgba(242,239,233,0)_0%,rgba(242,239,233,0.2)_86%,rgba(242,239,233,0.95)_100%)]"
              : "absolute inset-0 bg-[linear-gradient(180deg,rgba(242,239,233,0.08)_0%,rgba(242,239,233,0)_28%,rgba(242,239,233,0.18)_100%)] lg:bg-[linear-gradient(270deg,rgba(242,239,233,0)_0%,rgba(242,239,233,0.2)_14%,rgba(242,239,233,0.95)_100%)]"
          }
        />
      </motion.div>

      <div
        id={contentId}
        data-depth-label={contentDepthLabel}
        data-depth={contentDepth}
        className={`flex flex-col ${
          glued === "bottom"
            ? "justify-center lg:justify-start"
            : "justify-center"
        } ${contentGridClass} ${contentPadding}`}
      >
        <div className="flex w-full flex-col gap-8 md:gap-10 lg:gap-12">
          <motion.header
            className={
              alignArrowWithThirdCard
                ? "flex flex-col gap-6"
                : "flex items-start justify-between gap-6"
            }
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: easeOut }}
          >
            <div
              className={`flex min-w-0 ${
                alignArrowWithThirdCard
                  ? "w-full"
                  : "items-start justify-between gap-6"
              }`}
            >
              <div className={`min-w-0 ${alignArrowWithThirdCard ? "w-full" : ""}`}>
                <SectionEyebrow className="text-muted-foreground">{eyebrow}</SectionEyebrow>
                <div className={`mt-4 ${sectionWaveWrapOnLight}`}>
                  <WaveDivider />
                </div>
                <h2
                  id={headingId}
                  className={`mt-4 ${sectionTitleBase} ${
                    alignArrowWithThirdCard ? "" : "max-w-[16ch]"
                  }`}
                >
                  <span
                    className={`${sectionTitleSans} text-black ${
                      alignArrowWithThirdCard ? "block max-w-[16ch]" : "block"
                    }`}
                  >
                    {titleSans}
                  </span>
                  {alignArrowWithThirdCard ? (
                    <span className="mt-1 flex w-full items-center justify-between gap-6 lg:gap-8">
                      <span className={`max-w-[16ch] ${sectionTitleDisplay} text-foreground`}>
                        {titleDisplay}
                      </span>
                      <span className="hidden shrink-0 lg:inline-flex">
                        {pageLink}
                      </span>
                    </span>
                  ) : (
                    <span className={`mt-1 block ${sectionTitleDisplay} text-foreground`}>
                      {titleDisplay}
                    </span>
                  )}
                </h2>
              </div>

              {!alignArrowWithThirdCard ? (
                <span className="mt-1 shrink-0">{pageLink}</span>
              ) : null}
            </div>

            {alignArrowWithThirdCard ? (
              <div className="flex w-full justify-end lg:hidden">{pageLink}</div>
            ) : null}
          </motion.header>

          <div className="min-w-0">
            <FormacaoCards
              courses={courses}
              {...(ctaLabel ? { ctaLabel } : {})}
            />
          </div>

          {footerNote ? (
            <motion.p
              className="max-w-xl text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground md:text-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.14, ease: easeOut }}
            >
              {footerNote}
            </motion.p>
          ) : null}
        </div>
      </div>
    </>
  );
}

export function Formacao(): ReactNode {
  return (
    <section
      className="relative w-full overflow-hidden bg-background"
      aria-labelledby="formacao-heading"
    >
      <FormacaoIntroBanner />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:grid-rows-[auto_auto] lg:items-stretch lg:gap-0">
        <FormacaoBlock
          chessboardRow={1}
          imageCorner="top-left"
          imageSrc="/assets/hero/G0025436.JPG.png"
          eyebrow="Gateway Experience · Evidive"
          headingId="formacao-heading"
          titleSans="Onde a exploração"
          titleDisplay="se torna realidade."
          pageHref={especializacoesSectionHref}
          pageAriaLabel="Ir para Aperfeiçoe sua técnica"
          openPageInNewTab={false}
          courses={formacaoCourses}
          footerNote="Formação completa com certificação reconhecida no mercado."
          glued="top"
          alignArrowWithThirdCard
          contentId="formacao"
          contentDepthLabel="Gateway Experience"
          contentDepth="-55m"
        />

        <FormacaoBlock
          chessboardRow={2}
          imageCorner="bottom-right"
          imageSrc="/assets/hero/POSTS_EVIDIVE (7).png"
          imageObjectPosition="center 35%"
          eyebrow="Especializações e Carreira · Evidive"
          headingId="especializacoes-heading"
          titleSans="Aperfeiçoe"
          titleDisplay="sua técnica."
          pageHref={especializacoesPageHref}
          pageAriaLabel="Explorar especializações Evidive"
          courses={especializacoesCourses}
          ctaLabel="Ver curso"
          glued="bottom"
          alignArrowWithThirdCard
          contentId={especializacoesSectionId}
          contentDepthLabel="Especializações"
          contentDepth="-60m"
          footerNote="A verdadeira jornada começa após a certificação. Descubra especializações que vão elevar sua segurança, domínio e confiança para mergulhar nos cenários mais incríveis do mundo."
        />
      </div>
    </section>
  );
}
