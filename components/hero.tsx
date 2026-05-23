"use client";

import { ChevronRight as ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { WaveDivider } from "@/components/wave-divider";
import { usePageRevealReady } from "@/lib/use-page-reveal";
import { type ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;
const headlineLine1 = "Respire debaixo d'água e";
const headlineLine2 = "descubra ";
const headlineLine2Accent = "um novo mundo.";
const subtitleLine1 = "Uma experiência imersiva para quem quer";
const subtitleLine2 = "conhecer, aprender e evoluir no mergulho.";

function AnimatedHeadlineChars({
  text,
  startIndex,
  className,
  ready,
}: {
  text: string;
  startIndex: number;
  className?: string;
  ready: boolean;
}): ReactNode {
  return text.split("").map((char, index) => (
    <motion.span
      key={`${startIndex}-${index}`}
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={
        ready
          ? { opacity: 1, filter: "blur(0px)" }
          : { opacity: 0, filter: "blur(8px)" }
      }
      transition={{
        duration: 0.38,
        delay: ready ? 0.05 + (startIndex + index) * 0.018 : 0,
        ease: "easeOut",
      }}
      className={className ? `inline-block ${className}` : "inline-block"}
      style={{ whiteSpace: char === " " ? "pre" : "normal" }}
    >
      {char}
    </motion.span>
  ));
}

export function Hero(): ReactNode {
  const animReady = usePageRevealReady();

  return (
    <section
      id="superficie"
      data-depth-label="Superfície"
      data-depth="0m"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pb-10 pt-28 sm:pt-32 md:pt-36"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[min(100%,52rem)] flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={animReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/70 sm:text-xs"
        >
          Concept Dive Center
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={
            animReady ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.6 }
          }
          transition={{ duration: 0.5, delay: animReady ? 0.04 : 0, ease: easeOut }}
          className="mb-6 mt-4 text-primary sm:mb-7 sm:mt-5"
        >
          <WaveDivider className="text-primary" />
        </motion.div>

        <h1 className="font-display mx-auto mb-6 text-[clamp(1.35rem,3.8vw,3.35rem)] font-bold leading-[1.08] tracking-tight sm:mb-7">
          <span className="block whitespace-nowrap">
            <AnimatedHeadlineChars
              text={headlineLine1}
              startIndex={0}
              className="text-white"
              ready={animReady}
            />
          </span>
          <span className="block whitespace-nowrap">
            <AnimatedHeadlineChars
              text={headlineLine2}
              startIndex={headlineLine1.length}
              className="text-white"
              ready={animReady}
            />
            <span className="text-primary">
              <AnimatedHeadlineChars
                text={headlineLine2Accent}
                startIndex={headlineLine1.length + headlineLine2.length}
                ready={animReady}
              />
            </span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={animReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: 0.6,
            delay: animReady ? 0.18 : 0,
            ease: easeOut,
          }}
          className="mx-auto mb-10 text-[clamp(0.82rem,2.2vw,1.05rem)] leading-relaxed text-white/82 sm:mb-11"
        >
          <p className="whitespace-nowrap">{subtitleLine1}</p>
          <p className="mt-1 whitespace-nowrap">{subtitleLine2}</p>
        </motion.div>

        <motion.div
          className="flex w-full justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={animReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{
            duration: 0.6,
            delay: animReady ? 0.28 : 0,
            ease: easeOut,
          }}
        >
          <a
            href="#escolha-experiencia"
            className="font-display group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_12px_36px_rgba(30,196,180,0.38)] transition-all duration-300 hover:bg-[#1ad4c3] hover:shadow-[0_16px_44px_rgba(30,196,180,0.45)] sm:w-auto"
          >
            <span>Escolher minha experiência</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:scale-105">
              <ChevronRightIcon className="h-4 w-4" aria-hidden />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
