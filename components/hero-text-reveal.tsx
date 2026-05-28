"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export const HERO_REVEAL_CHAR_DELAY = 0.018;
export const HERO_REVEAL_BASE_DELAY = 0.05;

export function heroRevealDelay(charIndex: number): number {
  return HERO_REVEAL_BASE_DELAY + charIndex * HERO_REVEAL_CHAR_DELAY;
}

function AnimatedHeadlineChar({
  char,
  charIndex,
  className,
  ready,
  instant,
}: {
  char: string;
  charIndex: number;
  className?: string;
  ready: boolean;
  instant?: boolean;
}): ReactNode {
  return (
    <motion.span
      key={charIndex}
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={
        ready
          ? { opacity: 1, filter: "blur(0px)" }
          : { opacity: 0, filter: "blur(8px)" }
      }
      transition={{
        duration: instant ? 0.01 : 0.38,
        delay: ready && !instant ? heroRevealDelay(charIndex) : 0,
        ease: "easeOut",
      }}
      className={className ? `inline-block ${className}` : "inline-block"}
      aria-hidden={char === " "}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

/** Revelação por caractere; quebras de linha só entre palavras (nunca no meio). */
export function AnimatedHeadlineChars({
  text,
  startIndex,
  className,
  ready,
  instant,
}: {
  text: string;
  startIndex: number;
  className?: string;
  ready: boolean;
  instant?: boolean;
}): ReactNode {
  const segments = text.split(/(\s+)/);

  return segments.map((segment, segmentIndex) => {
    if (!segment) return null;

    const segmentStart =
      startIndex +
      segments.slice(0, segmentIndex).reduce((sum, part) => sum + part.length, 0);

    if (/^\s+$/.test(segment)) {
      return segment.split("").map((char, index) => (
        <AnimatedHeadlineChar
          key={`${segmentStart}-space-${index}`}
          char={char}
          charIndex={segmentStart + index}
          {...(className ? { className } : {})}
          ready={ready}
          {...(instant !== undefined ? { instant } : {})}
        />
      ));
    }

    return (
      <span
        key={`${segmentStart}-word`}
        className="inline-block whitespace-nowrap"
      >
        {segment.split("").map((char, index) => (
          <AnimatedHeadlineChar
            key={`${segmentStart}-${index}`}
            char={char}
            charIndex={segmentStart + index}
            {...(className ? { className } : {})}
            ready={ready}
            {...(instant !== undefined ? { instant } : {})}
          />
        ))}
      </span>
    );
  });
}

export function HeroRevealBlur({
  children,
  ready,
  hydrated,
  delay,
  instant,
  className,
}: {
  children: ReactNode;
  ready: boolean;
  hydrated: boolean;
  delay: number;
  instant?: boolean;
  className?: string;
}): ReactNode {
  const visible = !hydrated || ready;

  return (
    <motion.div
      className={className}
      initial={false}
      animate={
        visible
          ? { opacity: 1, filter: "blur(0px)", y: 0 }
          : { opacity: 0, filter: "blur(8px)", y: 8 }
      }
      transition={{
        duration: instant ? 0.01 : 0.38,
        delay: ready && !instant ? delay : 0,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
