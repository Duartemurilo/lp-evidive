"use client";

import {
  depthSections as sections,
  formatDepth,
  PRIMEIRO_MERGULHO_DEPTH_METERS,
  SURFACE_DEPTH_METERS,
  SURFACE_ZONE_IDS,
} from "@/lib/depth-sections";
import { usePageRevealReady } from "@/lib/use-page-reveal";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;
const INTERMEDIATE_TICKS = 2;

function getScrollRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>("[data-scroll-root]");
}

function getElementDistanceToFocus(
  element: HTMLElement,
  focusY: number,
): number {
  const rect = element.getBoundingClientRect();
  const sectionCenter = rect.top + rect.height / 2;
  return Math.abs(sectionCenter - focusY);
}

function getSurfaceZoneDistance(focusY: number): number {
  let best = Number.POSITIVE_INFINITY;

  for (const id of SURFACE_ZONE_IDS) {
    const element = document.getElementById(id);
    if (!element) {
      continue;
    }

    best = Math.min(best, getElementDistanceToFocus(element, focusY));
  }

  return best;
}

function getSurfaceZoneBottom(focusRoot: HTMLElement): number | null {
  let maxBottom = Number.NEGATIVE_INFINITY;
  let found = false;

  for (const id of SURFACE_ZONE_IDS) {
    const element = document.getElementById(id);
    if (!element) {
      continue;
    }

    found = true;
    maxBottom = Math.max(maxBottom, element.getBoundingClientRect().bottom);
  }

  if (!found) {
    return null;
  }

  return maxBottom - focusRoot.getBoundingClientRect().top;
}

function WaveFooter({ dark }: { dark: boolean }): ReactNode {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 44 16"
      className={`h-2.5 w-8 ${dark ? "text-[#5ee8dc]" : "text-primary"}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8C5 8 5 3 8 3C11 3 11 13 14 13C17 13 17 3 20 3C23 3 23 13 26 13C29 13 29 3 32 3C35 3 35 8 42 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type DepthScrollState = {
  sectionIndex: number;
  depthMeters: number;
};

function resolveDepthFromScroll(root: HTMLElement): DepthScrollState {
  const rootRect = root.getBoundingClientRect();
  const focusY = rootRect.top + rootRect.height * 0.42;

  let sectionIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  sections.forEach((section, index) => {
    const distance =
      section.id === "superficie"
        ? getSurfaceZoneDistance(focusY)
        : (() => {
            const element = document.getElementById(section.id);
            if (!element) {
              return Number.POSITIVE_INFINITY;
            }
            return getElementDistanceToFocus(element, focusY);
          })();

    if (distance < bestDistance) {
      bestDistance = distance;
      sectionIndex = index;
    }
  });

  const activeSection = sections[sectionIndex] ?? sections[0]!;
  let depthMeters = activeSection.depthMeters;

  const primeiroEl = document.getElementById("primeiro-mergulho");
  const surfaceBottom = getSurfaceZoneBottom(root);

  if (primeiroEl && surfaceBottom !== null) {
    const primeiroRect = primeiroEl.getBoundingClientRect();
    const primeiroTop = primeiroRect.top - rootRect.top;
    const gap = primeiroTop - surfaceBottom;

    if (gap > 0 && focusY > surfaceBottom && focusY < primeiroTop) {
      const progress = Math.min(
        1,
        Math.max(0, (focusY - surfaceBottom) / gap),
      );
      depthMeters = Math.round(
        progress * PRIMEIRO_MERGULHO_DEPTH_METERS,
      );
      sectionIndex = 0;
    } else if (focusY >= primeiroTop + primeiroRect.height * 0.2) {
      depthMeters = Math.max(
        depthMeters,
        PRIMEIRO_MERGULHO_DEPTH_METERS,
      );
    } else if (sectionIndex === 0) {
      depthMeters = SURFACE_DEPTH_METERS;
    }
  } else if (sectionIndex === 0) {
    depthMeters = SURFACE_DEPTH_METERS;
  }

  return { sectionIndex, depthMeters };
}

export function DepthIndicator(): ReactNode {
  const prefersReducedMotion = useReducedMotion();
  const revealReady = usePageRevealReady();
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayDepth, setDisplayDepth] = useState(SURFACE_DEPTH_METERS);
  const [isHovered, setIsHovered] = useState(false);
  const activeSection = sections[activeIndex] ?? sections[0]!;
  const isDarkTone = activeSection.tone === "dark";
  const maxDepth = sections[sections.length - 1]?.depthMeters ?? 0;

  const tickMarks = useMemo(
    () =>
      sections.flatMap((section, index) => {
        const current = section.depthMeters;
        const next = sections[index + 1]?.depthMeters;

        if (typeof next !== "number") {
          return [{ depthMeters: current, kind: "major" as const, section }];
        }

        const gap = next - current;
        const minorPositions = Array.from(
          { length: INTERMEDIATE_TICKS },
          (_, minorIndex) => ({
            depthMeters:
              current + ((minorIndex + 1) * gap) / (INTERMEDIATE_TICKS + 1),
            kind: "minor" as const,
          }),
        );

        return [
          { depthMeters: current, kind: "major" as const, section },
          ...minorPositions,
        ];
      }),
    [],
  );

  const progress = useMemo(() => {
    if (maxDepth <= 0) {
      return 0;
    }

    return displayDepth / maxDepth;
  }, [displayDepth, maxDepth]);

  useEffect(() => {
    const root = getScrollRoot();
    if (!root) {
      return;
    }

    let frame = 0;

    const updateDepth = () => {
      const { sectionIndex, depthMeters } = resolveDepthFromScroll(root);
      setActiveIndex(sectionIndex);
      setDisplayDepth(depthMeters);
    };

    const scheduleUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateDepth();
      });
    };

    updateDepth();
    root.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      root.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const isActiveTick = (tickDepth: number, isMajor: boolean): boolean => {
    if (!isMajor) {
      return false;
    }
    return tickDepth === activeSection.depthMeters && displayDepth >= tickDepth;
  };

  return (
    <aside className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 md:block lg:right-8 xl:right-10">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
        animate={
          prefersReducedMotion || revealReady
            ? { opacity: 1, x: 0 }
            : { opacity: 0, x: 12 }
        }
        transition={{ duration: 0.55, ease: easeOut }}
        className={`pointer-events-auto flex w-[5.5rem] flex-col items-center rounded-2xl px-3 py-4 shadow-[0_10px_40px_rgba(4,20,28,0.28)] backdrop-blur-md ${
          isDarkTone
            ? "bg-[#041820]/72 ring-1 ring-white/14"
            : "bg-white/92 ring-1 ring-foreground/12"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="mb-3 flex flex-col items-center text-center">
          <motion.span
            key={displayDepth}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className={`font-display text-[1.1rem] font-bold leading-none tracking-tight ${
              isDarkTone
                ? "text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
                : "text-primary"
            }`}
          >
            {formatDepth(displayDepth)}
          </motion.span>
          <span
            className={`mt-1.5 text-[0.7rem] font-medium leading-none ${
              isDarkTone ? "text-white/88" : "text-foreground/78"
            }`}
          >
            {activeSection.label}
          </span>
        </div>

        <div className="relative mx-auto h-[18rem] w-10 overflow-visible">
          <div
            className={`absolute left-1/2 top-0 z-0 h-full w-px -translate-x-1/2 rounded-full ${
              isDarkTone ? "bg-white/38" : "bg-foreground/28"
            }`}
          />
          <motion.div
            className={`absolute left-1/2 top-0 z-[1] w-0.5 -translate-x-1/2 rounded-full shadow-[0_0_12px_rgba(30,196,180,0.55)] ${
              isDarkTone ? "bg-[#5ee8dc]" : "bg-primary"
            }`}
            animate={{ height: `${Math.max(progress, 0) * 100}%` }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.45,
              ease: easeOut,
            }}
          />

          {tickMarks.map((tick) => {
            const isMajor = tick.kind === "major";
            const section = isMajor ? tick.section : undefined;
            const isActive = isActiveTick(tick.depthMeters, isMajor);
            const showDot = isMajor && section && (isActive || isHovered);
            const showTick =
              !isMajor || isActive || (isHovered && isMajor);
            const position =
              maxDepth === 0 ? 0 : (tick.depthMeters / maxDepth) * 100;

            return (
              <div
                key={`${tick.kind}-${tick.depthMeters}`}
                className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2"
                style={{ top: `${position}%` }}
              >
                {showTick ? (
                  <span
                    aria-hidden="true"
                    className={`absolute left-1/2 top-1/2 block h-px -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                      isMajor ? "w-6" : "w-3"
                    } ${isDarkTone ? "bg-white/50" : "bg-foreground/45"}`}
                  />
                ) : null}
                {showDot ? (
                  <a
                    href={`#${section.id}`}
                    aria-label={`${section.label}, profundidade ${formatDepth(section.depthMeters)}`}
                    aria-current={isActive ? "true" : undefined}
                    className="group/dot pointer-events-auto absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
                  >
                    <span
                      className={`block h-3.5 w-3.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? isDarkTone
                            ? "bg-[#5ee8dc] ring-2 ring-white/90"
                            : "bg-[#1ec4b4] ring-2 ring-background"
                          : isDarkTone
                            ? "border-2 border-[#5ee8dc] bg-transparent"
                            : "border-2 border-[#1ec4b4] bg-transparent"
                      }`}
                    />
                    <span
                      role="tooltip"
                      className={`pointer-events-none absolute top-1/2 right-[calc(100%+0.625rem)] -translate-y-1/2 whitespace-nowrap rounded-md px-2.5 py-1 text-[0.72rem] font-medium leading-tight opacity-0 shadow-md transition-opacity duration-200 group-hover/dot:opacity-100 group-focus-visible/dot:opacity-100 ${
                        isDarkTone
                          ? "bg-white text-foreground"
                          : "bg-menu-card text-white"
                      }`}
                    >
                      {section.label}
                    </span>
                  </a>
                ) : null}
              </div>
            );
          })}

          <div
            className={`absolute left-1/2 bottom-0 h-4 w-12 -translate-x-1/2 rounded-b-full border-x border-b ${
              isDarkTone
                ? "border-white/28 bg-transparent"
                : "border-foreground/22 bg-transparent"
            }`}
          />
        </div>

        <div className="mt-3 flex flex-col items-center gap-1.5">
          <WaveFooter dark={isDarkTone} />
        </div>
      </motion.div>
    </aside>
  );
}
