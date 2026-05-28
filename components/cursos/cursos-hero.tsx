"use client";

import {
  AnimatedHeadlineChars,
  HeroRevealBlur,
  heroRevealDelay,
} from "@/components/hero-text-reveal";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { WaveDivider } from "@/components/wave-divider";
import { cursosConfig } from "@/lib/cursos-config";
import { useReducedMotion } from "@/lib/motion";
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
import { motion, useMotionValue, useSpring } from "motion/react";
import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";

const PARALLAX_INTENSITY = 20;
const PARALLAX_MIN_WIDTH = 850;

const { hero } = cursosConfig;

const eyebrowText = hero.badge;
const headlineLine1 = hero.headline.line1;
const headlineLine2 = hero.headline.line2;
const subtitleText = hero.subheadline;

const eyebrowCharCount = eyebrowText.length;
const headlineCharCount = headlineLine1.length + headlineLine2.length;
const subtitleCharCount = subtitleText.length;

export function CursosHero(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const hydrated = useHydrated();
  const animReady = usePageRevealReady();
  const skipRevealAnimation = usePageRevealSkipAnimation();
  const prefersReducedMotion = useReducedMotion();
  const instantReveal = prefersReducedMotion || skipRevealAnimation;
  const showMotion = hydrated && (animReady || skipRevealAnimation);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || !sectionRef.current) return;
    if (window.innerWidth < PARALLAX_MIN_WIDTH) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = (e.clientX - centerX) / (rect.width / 2);
    const offsetY = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(offsetX * PARALLAX_INTENSITY);
    mouseY.set(offsetY * PARALLAX_INTENSITY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const waveRevealDelay = heroRevealDelay(eyebrowCharCount) + 0.04;
  const headlineStartIndex = eyebrowCharCount;
  const subtitleStartIndex = eyebrowCharCount + headlineCharCount;
  const buttonRevealDelay =
    heroRevealDelay(eyebrowCharCount + headlineCharCount + subtitleCharCount) + 0.08;

  return (
    <section
      ref={sectionRef}
      id="cursos-hero"
      className="relative flex min-h-[92dvh] flex-col"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat min-[850px]:inset-2.5 min-[850px]:scale-105 min-[850px]:rounded-br-4xl min-[850px]:rounded-bl-4xl"
        style={{
          backgroundImage: `url(${hero.backgroundImage})`,
          ...(prefersReducedMotion ? {} : { x, y }),
        }}
        aria-hidden="true"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/30 to-foreground/10 min-[850px]:rounded-br-4xl min-[850px]:rounded-bl-4xl"
          aria-hidden="true"
        />
      </motion.div>

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
                text={eyebrowText}
                startIndex={0}
                ready={showMotion}
                instant={instantReveal}
              />
            </p>
          ) : (
            <SectionEyebrow className={heroEyebrowColor}>{hero.badge}</SectionEyebrow>
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

          <h1 className={cn(heroTitleWrapperClass, "text-balance")} suppressHydrationWarning>
            {hydrated ? (
              <>
                <span className={heroTitleLineClass}>
                  <AnimatedHeadlineChars
                    text={headlineLine1}
                    startIndex={headlineStartIndex}
                    ready={showMotion}
                    instant={instantReveal}
                  />
                </span>
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
              </>
            ) : (
              <>
                <span className={heroTitleLineClass}>{headlineLine1}</span>
                <span className={cn("mt-1", heroTitleLineClass)}>
                  <span className={heroTitleAccentClass}>{headlineLine2}</span>
                </span>
              </>
            )}
          </h1>

          <div className={cn(heroSubtitleWrapperClass, "max-w-2xl")}>
            {hydrated ? (
              <AnimatedHeadlineChars
                text={subtitleText}
                startIndex={subtitleStartIndex}
                ready={showMotion}
                instant={instantReveal}
              />
            ) : (
              subtitleText
            )}
          </div>

          <HeroRevealBlur
            hydrated={hydrated}
            ready={showMotion}
            delay={buttonRevealDelay}
            instant={instantReveal}
            className="flex w-full justify-center"
          >
            <Link href={hero.cta.href} className={heroCtaPrimaryClass}>
              <span>{hero.cta.text}</span>
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
