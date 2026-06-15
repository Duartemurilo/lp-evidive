"use client";

import {
  AnimatedHeadlineChars,
  HeroRevealBlur,
  heroRevealDelay,
} from "@/components/hero-text-reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { WaveDivider } from "@/components/wave-divider";
import { toCssBackgroundImageUrl } from "@/lib/cursos-capa-images";
import { useReducedMotion } from "@/lib/motion";
import type { CursoHeroContent } from "@/lib/types/curso-page";
import {
  heroContentWidth,
  heroCtaIconWrapClass,
  heroCtaPrimaryClass,
  heroEyebrowColor,
  heroSubtitleWrapperClass,
  heroTitleAccentClass,
  heroTitleLineClass,
  heroTitleWrapperClass,
  heroWaveWrapClass,
  sectionEyebrow,
} from "@/lib/typography";
import { useHydrated } from "@/lib/use-hydrated";
import {
  usePageRevealReady,
  usePageRevealSkipAnimation,
} from "@/lib/use-page-reveal";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";

type CursoDetailHeroProps = {
  title: string;
  categoryLabel: string;
  hero: CursoHeroContent;
  backgroundImage: string;
};

function splitSupporting(supporting: string): readonly [string, string?] {
  const parts = supporting.split("\n\n").map((part) => part.trim()).filter(Boolean);
  if (parts.length <= 1) {
    return [supporting.trim()];
  }
  return [parts[0]!, parts.slice(1).join("\n\n")];
}

export function CursoDetailHero({
  categoryLabel,
  hero,
  backgroundImage,
}: CursoDetailHeroProps): ReactNode {
  const hydrated = useHydrated();
  const animReady = usePageRevealReady();
  const skipRevealAnimation = usePageRevealSkipAnimation();
  const prefersReducedMotion = useReducedMotion();
  const instantReveal = prefersReducedMotion || skipRevealAnimation;
  const showMotion = hydrated && (animReady || skipRevealAnimation);

  const [subtitleLine1, subtitleLine2] = splitSupporting(hero.supporting);
  const useInlineHeadline = Boolean(hero.logoSrc);
  const headlineLine1 = hero.lead;
  const headlineLine2 = hero.leadHighlight ?? "";

  const eyebrowCharCount = categoryLabel.length;
  const headlineCharCount = useInlineHeadline
    ? headlineLine1.length + headlineLine2.length
    : headlineLine1.length + headlineLine2.length;
  const subtitleCharCount = subtitleLine1.length + (subtitleLine2?.length ?? 0);

  const waveRevealDelay = heroRevealDelay(eyebrowCharCount) + 0.04;
  const headlineStartIndex = eyebrowCharCount;
  const subtitleStartIndex = eyebrowCharCount + headlineCharCount;
  const buttonRevealDelay =
    heroRevealDelay(eyebrowCharCount + headlineCharCount + subtitleCharCount) + 0.08;

  return (
    <section
      id="curso-detail-hero"
      className="relative flex min-h-[92dvh] flex-col"
      aria-labelledby="curso-detail-hero-heading"
    >
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat min-[850px]:inset-2.5 min-[850px]:scale-105 min-[850px]:rounded-br-4xl min-[850px]:rounded-bl-4xl"
        style={{ backgroundImage: toCssBackgroundImageUrl(backgroundImage) }}
        aria-hidden
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/30 to-foreground/10 min-[850px]:rounded-br-4xl min-[850px]:rounded-bl-4xl"
          aria-hidden
        />
      </div>

      <div className="flex flex-1 items-center justify-center px-6 pb-16 pt-32 max-[850px]:pt-28 md:pt-36">
        <div
          className={cn(
            "relative z-10 mx-auto flex w-full flex-col items-center text-center",
            heroContentWidth,
          )}
        >
          {hydrated ? (
            <p className={cn(sectionEyebrow, heroEyebrowColor)}>
              <AnimatedHeadlineChars
                text={categoryLabel}
                startIndex={0}
                ready={showMotion}
                instant={instantReveal}
              />
            </p>
          ) : (
            <SectionEyebrow className={heroEyebrowColor}>{categoryLabel}</SectionEyebrow>
          )}

          <HeroRevealBlur
            hydrated={hydrated}
            ready={showMotion}
            delay={waveRevealDelay}
            instant={instantReveal}
            className={heroWaveWrapClass}
          >
            <WaveDivider className="text-primary" />
          </HeroRevealBlur>

          {hero.logoSrc ? (
            <Image
              src={hero.logoSrc}
              alt=""
              width={280}
              height={120}
              priority
              className="mb-6 h-auto w-[min(72vw,17.5rem)] object-contain md:mb-8 md:w-[20rem]"
            />
          ) : null}

          <h1
            id="curso-detail-hero-heading"
            className={cn(heroTitleWrapperClass, "text-balance")}
            suppressHydrationWarning
          >
            {useInlineHeadline ? (
              <span className={cn(heroTitleLineClass, "max-w-3xl")}>
                {hydrated ? (
                  <>
                    <AnimatedHeadlineChars
                      text={headlineLine1}
                      startIndex={headlineStartIndex}
                      ready={showMotion}
                      instant={instantReveal}
                    />
                    {headlineLine2 ? (
                      <span className={heroTitleAccentClass}>
                        <AnimatedHeadlineChars
                          text={headlineLine2}
                          startIndex={headlineStartIndex + headlineLine1.length}
                          ready={showMotion}
                          instant={instantReveal}
                        />
                      </span>
                    ) : null}
                  </>
                ) : (
                  <>
                    {headlineLine1}
                    {headlineLine2 ? (
                      <span className={heroTitleAccentClass}>{headlineLine2}</span>
                    ) : null}
                  </>
                )}
              </span>
            ) : hydrated ? (
              <>
                <span className={heroTitleLineClass}>
                  <AnimatedHeadlineChars
                    text={headlineLine1}
                    startIndex={headlineStartIndex}
                    ready={showMotion}
                    instant={instantReveal}
                  />
                </span>
                {headlineLine2 ? (
                  <span className={cn("mt-1", heroTitleLineClass)}>
                    <span className={heroTitleAccentClass}>
                      <AnimatedHeadlineChars
                        text={headlineLine2}
                        startIndex={headlineStartIndex + headlineLine1.length}
                        ready={showMotion}
                        instant={instantReveal}
                      />
                    </span>
                  </span>
                ) : null}
              </>
            ) : (
              <>
                <span className={heroTitleLineClass}>{headlineLine1}</span>
                {headlineLine2 ? (
                  <span className={cn("mt-1", heroTitleLineClass)}>
                    <span className={heroTitleAccentClass}>{headlineLine2}</span>
                  </span>
                ) : null}
              </>
            )}
          </h1>

          <div className={cn(heroSubtitleWrapperClass, "max-w-2xl")}>
            {hydrated ? (
              <>
                <p>
                  <AnimatedHeadlineChars
                    text={subtitleLine1}
                    startIndex={subtitleStartIndex}
                    ready={showMotion}
                    instant={instantReveal}
                  />
                </p>
                {subtitleLine2 ? (
                  <p className="mt-1">
                    <AnimatedHeadlineChars
                      text={subtitleLine2}
                      startIndex={subtitleStartIndex + subtitleLine1.length}
                      ready={showMotion}
                      instant={instantReveal}
                    />
                  </p>
                ) : null}
              </>
            ) : (
              <>
                <p>{subtitleLine1}</p>
                {subtitleLine2 ? <p className="mt-1">{subtitleLine2}</p> : null}
              </>
            )}
          </div>

          <HeroRevealBlur
            hydrated={hydrated}
            ready={showMotion}
            delay={buttonRevealDelay}
            instant={instantReveal}
            className="flex w-full justify-center"
          >
            <Link
              href={hero.cta.href}
              {...(hero.cta.external !== false
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={heroCtaPrimaryClass}
            >
              <span>{hero.cta.label}</span>
              <span className={heroCtaIconWrapClass}>
                <ChevronRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          </HeroRevealBlur>
        </div>
      </div>
    </section>
  );
}
