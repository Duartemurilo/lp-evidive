"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { WaveDivider } from "@/components/wave-divider";
import { divemasterConfig } from "@/lib/divemaster-config";
import {
  sectionTitleLargeBase,
  sectionTitleSans,
  subpagePresenceTitleDisplay,
  subpagePresenceTitleDisplayInline,
} from "@/lib/typography";
import { cn } from "@/lib/utils";
import {
  EVI_LAGO_SECTION_HEIGHT_VH,
  useEviLagoScrollExpand,
} from "@/lib/use-evilago-scroll-expand";
import {
  ChevronRight,
  Globe,
  GraduationCap,
  Leaf,
  type LucideIcon,
  Presentation,
  Ship,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;
const CONTENT_PARALLAX_Y_START = 12;
const { career } = divemasterConfig;

type CareerCard = (typeof career.cards)[number];

const cardIcons = {
  users: Users,
  presentation: Presentation,
  ship: Ship,
  leaf: Leaf,
  "graduation-cap": GraduationCap,
  globe: Globe,
} as const satisfies Record<CareerCard["icon"], LucideIcon>;

const careerBackgroundSrc = `${career.backgroundImage}?v=${career.backgroundImageVersion}`;

function CareerBackdrop(): ReactNode {
  return (
    <>
      <Image
        src={careerBackgroundSrc}
        alt=""
        fill
        unoptimized
        priority={false}
        sizes="100vw"
        className="object-cover object-[center_35%] sm:object-[18%_center] lg:object-[12%_center]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[rgba(4,24,32,0.88)] via-[rgba(4,24,32,0.72)] to-[rgba(4,24,32,0.92)] lg:bg-gradient-to-r lg:from-[rgba(4,24,32,0.94)] lg:via-[rgba(4,24,32,0.78)] lg:to-[rgba(4,24,32,0.42)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_50%,rgba(4,24,32,0.15),rgba(4,24,32,0.75))] lg:hidden"
      />
    </>
  );
}

function CareerCardItem({
  card,
  index,
  compact,
}: {
  card: CareerCard;
  index: number;
  compact?: boolean;
}): ReactNode {
  const Icon = cardIcons[card.icon];

  return (
    <motion.article
      className={cn(
        "rounded-xl border border-white/12 bg-[rgba(6,32,42,0.55)] backdrop-blur-[2px]",
        compact
          ? "flex gap-3.5 p-3.5 sm:flex-col sm:gap-0 sm:p-4 md:p-5"
          : "flex flex-col p-4 md:p-5",
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.05, ease: easeOut }}
    >
      <Icon
        className={cn(
          "shrink-0 text-primary",
          compact ? "mt-0.5 h-5 w-5" : "h-5 w-5 md:h-[1.35rem] md:w-[1.35rem]",
        )}
        strokeWidth={1.75}
        aria-hidden
      />
      <div className={compact ? "min-w-0 flex-1" : undefined}>
        <h3
          className={cn(
            "font-display font-bold leading-snug text-white",
            compact ? "text-[0.95rem]" : "mt-3 text-base md:text-[1.05rem]",
          )}
        >
          {card.title}
        </h3>
        <div aria-hidden className={cn("h-px bg-primary/80", compact ? "mt-1.5 w-6" : "mt-2 w-8")} />
        <p
          className={cn(
            "leading-relaxed text-white/72",
            compact ? "mt-1.5 text-[0.8rem]" : "mt-2 text-sm md:text-[0.9rem]",
          )}
        >
          {card.description}
        </p>
      </div>
    </motion.article>
  );
}

function CareerCopy({
  className,
  headingId,
}: {
  className?: string;
  headingId?: string;
}): ReactNode {
  return (
    <div className={cn("text-center lg:text-left", className)}>
      <SectionEyebrow className="text-primary/90">{career.eyebrow}</SectionEyebrow>
      <div className="mt-4 flex justify-center text-primary lg:justify-start">
        <WaveDivider />
      </div>
      <h2
        {...(headingId ? { id: headingId } : {})}
        className={cn(
          "mx-auto mt-5 text-balance text-white lg:mx-0",
          sectionTitleLargeBase,
          "max-w-none lg:max-w-[20ch] lg:text-[clamp(2rem,4.8vw,3.35rem)]",
        )}
      >
        <span className="lg:hidden">
          <span className={cn("block text-pretty", sectionTitleSans)}>
            {career.titleSans.trim()}
          </span>
          <span className={cn("mt-1 block text-pretty", sectionTitleSans)}>
            <span className={cn(subpagePresenceTitleDisplayInline, "text-primary")}>
              {career.titleAccent}
            </span>{" "}
            {career.titleSuffix}
          </span>
        </span>
        <span className="hidden lg:inline">
          <span className={sectionTitleSans}>{career.titleSans}</span>
          <span className={cn(subpagePresenceTitleDisplay, "text-primary")}>{career.titleAccent}</span>
          <span className={sectionTitleSans}> {career.titleSuffix}</span>
        </span>
      </h2>
      <div className="mx-auto mt-5 max-w-xl space-y-4 text-sm leading-relaxed text-white/80 md:text-[0.95rem] lg:mx-0">
        {career.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-8 flex justify-center lg:justify-start">
        <Link
          href={career.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display group inline-flex w-full max-w-md items-center justify-center gap-3 rounded-md bg-primary py-3 pr-3 pl-5 font-medium text-primary-foreground shadow-[0_12px_36px_rgba(30,196,180,0.32)] transition-all duration-500 ease-out hover:rounded-[50px] hover:bg-[#1ad4c3] sm:w-auto lg:max-w-none"
        >
          <span>{career.cta.text}</span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground text-primary transition-all duration-300 group-hover:scale-110">
            <ChevronRight className="relative left-px h-4 w-4" aria-hidden />
          </span>
        </Link>
      </div>
    </div>
  );
}

function DivemasterCareerMobile(): ReactNode {
  return (
    <div className="relative overflow-hidden lg:hidden">
      <div className="absolute inset-0">
        <CareerBackdrop />
      </div>
      <div className="relative z-10 px-6 py-14 pb-20 sm:py-16 sm:pb-24">
        <CareerCopy headingId="divemaster-carreira-heading" />
        <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-3.5">
          {career.cards.map((card, index) => (
            <CareerCardItem key={card.title} card={card} index={index} compact />
          ))}
        </div>
      </div>
    </div>
  );
}

function DivemasterCareerDesktop(): ReactNode {
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
    mediaTransformOrigin: "left center",
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
          className="relative min-h-0 flex-1 overflow-hidden rounded-3xl"
        >
          <div
            ref={mediaRef}
            className="absolute inset-0 origin-left will-change-transform"
          >
            <CareerBackdrop />
          </div>

          <div className="relative z-10 mx-auto grid h-full min-h-0 w-full max-w-[90rem] grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] items-center gap-8 px-12 py-12 xl:gap-10 xl:px-16 xl:py-14">
            <motion.div
              ref={contentRef}
              className="will-change-transform"
              style={{ transform: `translateY(${CONTENT_PARALLAX_Y_START}px)` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, ease: easeOut }}
            >
              <CareerCopy />
            </motion.div>

            <div className="grid min-h-0 grid-cols-2 gap-3 xl:gap-4">
              {career.cards.map((card, index) => (
                <CareerCardItem key={card.title} card={card} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DivemasterCareer(): ReactNode {
  return (
    <section
      id={career.id}
      aria-labelledby="divemaster-carreira-heading"
      className="relative w-full overflow-hidden bg-background"
    >
      <DivemasterCareerMobile />
      <DivemasterCareerDesktop />
    </section>
  );
}
