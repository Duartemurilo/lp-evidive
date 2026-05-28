"use client";

import { AnimatedHeadlineChars } from "@/components/hero-text-reveal";
import { useReducedMotion } from "@/lib/motion";
import {
  sectionTitleAccentOnLight,
  sectionTitleLargeBase,
  sectionTitleSans,
  subpagePresenceTitleDisplay,
  subpagePresenceTitleDisplayInline,
} from "@/lib/typography";
import { useScrollRootRef } from "@/lib/use-scroll-root";
import { cn } from "@/lib/utils";
import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

export type SubpagePresenceTitleProps = {
  line1: string;
  line2Sans: string;
  line2Display: string;
  /** Quebra extra só no mobile (ex.: legado Freedive). Ignorado se `twoLineLayout`. */
  line2Mid?: string;
  /** Duas linhas fixas em todos os breakpoints (Divemaster). */
  twoLineLayout?: boolean;
  /** Com `line2Mid`: mobile em frases curtas; desktop (`lg+`) em duas linhas fixas. */
  twoLineOnDesktop?: boolean;
  /** @deprecated Use `twoLineLayout` com `line1` como primeira linha completa. */
  desktopLine1?: string;
  /** Cor do trecho em display (ex.: `text-primary` na Freedive). */
  displayAccentClassName?: string;
  className?: string;
};

const lineBlockClass =
  "mx-auto block max-w-[min(100%,40rem)] hyphens-none break-normal leading-[1.12]";

const phraseLineClass =
  "mx-auto block max-w-[min(100%,40rem)] hyphens-none break-normal leading-[1.12]";

const desktopLineBlockClass =
  "mx-auto block max-w-none hyphens-none whitespace-nowrap leading-[1.12] lg:max-w-none";

/** Segunda dobra — revelação por caractere. */
export function SubpagePresenceTitle({
  line1,
  line2Sans,
  line2Display,
  line2Mid,
  twoLineLayout,
  twoLineOnDesktop,
  desktopLine1,
  displayAccentClassName = sectionTitleAccentOnLight,
  className,
}: SubpagePresenceTitleProps): ReactNode {
  const ref = useRef<HTMLHeadingElement>(null);
  const scrollRootRef = useScrollRootRef();
  const inView = useInView(ref, {
    root: scrollRootRef,
    once: true,
    amount: 0.45,
  });
  const prefersReducedMotion = useReducedMotion();
  const instant = prefersReducedMotion;
  const ready = inView;

  const useTwoLinesEverywhere = twoLineLayout || Boolean(desktopLine1);
  const usePhraseMobileTwoDesktop =
    twoLineOnDesktop && Boolean(line2Mid) && !useTwoLinesEverywhere;
  const firstLine = desktopLine1 ?? line1;
  const desktopFirstLine = line2Mid ? `${line1} ${line2Mid}` : line1;
  const desktopSans = line2Mid ? `${line2Mid}${line2Sans}` : line2Sans;

  const line1Start = 0;
  const line2MidStart = line1.length;
  const line2SansStart = line2MidStart + (line2Mid?.length ?? 0);
  const line2DisplayStart = line2SansStart + line2Sans.length;
  const twoLineSansStart = firstLine.length;
  const twoLineDisplayStart = twoLineSansStart + line2Sans.length;
  const phraseDesktopSansStart = desktopFirstLine.length;
  const phraseDesktopDisplayStart = phraseDesktopSansStart + line2Sans.length;
  const desktopSansStart = line1.length;
  const desktopDisplayStart = desktopSansStart + desktopSans.length;

  const sansClass = cn(sectionTitleSans, "text-black");
  const accentInlineClass = cn(
    subpagePresenceTitleDisplayInline,
    displayAccentClassName,
  );
  const accentSiblingClass = cn(
    subpagePresenceTitleDisplay,
    displayAccentClassName,
  );

  return (
    <h2
      ref={ref}
      className={cn(
        "mx-auto max-w-[min(100%,36rem)] text-center hyphens-none break-normal lg:max-w-[min(100%,56rem)]",
        sectionTitleLargeBase,
        className,
      )}
    >
      {usePhraseMobileTwoDesktop ? (
        <>
          <span className="lg:hidden">
            <span className={cn(phraseLineClass, sansClass)}>
              <AnimatedHeadlineChars
                text={line1}
                startIndex={line1Start}
                ready={ready}
                instant={instant}
              />
            </span>
            <span className={cn(phraseLineClass, "mt-1", sansClass)}>
              <AnimatedHeadlineChars
                text={line2Mid!}
                startIndex={line2MidStart}
                ready={ready}
                instant={instant}
              />
            </span>
            <span className={cn(lineBlockClass, "mt-1", sansClass)}>
              <AnimatedHeadlineChars
                text={line2Sans}
                startIndex={line2SansStart}
                ready={ready}
                instant={instant}
              />
              <span className={accentInlineClass}>
                <AnimatedHeadlineChars
                  text={line2Display}
                  startIndex={line2DisplayStart}
                  ready={ready}
                  instant={instant}
                />
              </span>
            </span>
          </span>

          <span className="hidden lg:block">
            <span className={cn(desktopLineBlockClass, sansClass)}>
              <AnimatedHeadlineChars
                text={desktopFirstLine}
                startIndex={line1Start}
                ready={ready}
                instant={instant}
              />
            </span>
            <span className={cn(desktopLineBlockClass, "mt-1", sansClass)}>
              <AnimatedHeadlineChars
                text={line2Sans}
                startIndex={phraseDesktopSansStart}
                ready={ready}
                instant={instant}
              />
              <span className={accentInlineClass}>
                <AnimatedHeadlineChars
                  text={line2Display}
                  startIndex={phraseDesktopDisplayStart}
                  ready={ready}
                  instant={instant}
                />
              </span>
            </span>
          </span>
        </>
      ) : null}

      {useTwoLinesEverywhere ? (
        <span className="block">
          <span className={cn(lineBlockClass, sansClass)}>
            <AnimatedHeadlineChars
              text={firstLine}
              startIndex={line1Start}
              ready={ready}
              instant={instant}
            />
          </span>
          <span className={cn(lineBlockClass, "mt-1", sansClass)}>
            <AnimatedHeadlineChars
              text={line2Sans}
              startIndex={twoLineSansStart}
              ready={ready}
              instant={instant}
            />
            <span className={accentInlineClass}>
              <AnimatedHeadlineChars
                text={line2Display}
                startIndex={twoLineDisplayStart}
                ready={ready}
                instant={instant}
              />
            </span>
          </span>
        </span>
      ) : usePhraseMobileTwoDesktop ? null : (
        <>
          <span className="lg:hidden">
            <span className={cn("block", lineBlockClass, sansClass)}>
              <AnimatedHeadlineChars
                text={line1}
                startIndex={line1Start}
                ready={ready}
                instant={instant}
              />
            </span>
            {line2Mid ? (
              <span className={cn(lineBlockClass, "mt-1", sansClass)}>
                <AnimatedHeadlineChars
                  text={line2Mid}
                  startIndex={line2MidStart}
                  ready={ready}
                  instant={instant}
                />
              </span>
            ) : null}
            <span
              className={cn(
                lineBlockClass,
                line2Mid ? "mt-0.5" : "mt-1",
                sansClass,
              )}
            >
              <AnimatedHeadlineChars
                text={line2Sans}
                startIndex={line2SansStart}
                ready={ready}
                instant={instant}
              />
              <span className={accentInlineClass}>
                <AnimatedHeadlineChars
                  text={line2Display}
                  startIndex={line2DisplayStart}
                  ready={ready}
                  instant={instant}
                />
              </span>
            </span>
          </span>

          <span className="hidden leading-[1.12] lg:inline">
            <span className={sansClass}>
              <AnimatedHeadlineChars
                text={line1}
                startIndex={line1Start}
                ready={ready}
                instant={instant}
              />
              <AnimatedHeadlineChars
                text={desktopSans}
                startIndex={desktopSansStart}
                ready={ready}
                instant={instant}
              />
            </span>
            <span className={accentSiblingClass}>
              <AnimatedHeadlineChars
                text={line2Display}
                startIndex={desktopDisplayStart}
                ready={ready}
                instant={instant}
              />
            </span>
          </span>
        </>
      )}
    </h2>
  );
}
