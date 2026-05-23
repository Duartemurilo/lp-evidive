"use client";

import { EcosystemModuleCard } from "@/components/universe/ecosystem-module-card";
import { JourneyConnector } from "@/components/universe/journey-connector";
import { RisingBubbles } from "@/components/universe/rising-bubbles";
import { WaveDivider } from "@/components/wave-divider";
import {
  DEFAULT_MODULE_ID,
  getModulesByTier,
  JOURNEY_TIERS,
  type JourneyTier,
  type UniverseModule,
} from "@/lib/universe-modules";
import { useScrollRootRef } from "@/lib/use-scroll-root";
import { motion, useInView } from "motion/react";
import { useState, type ReactNode } from "react";
import { useRef } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

const TIER_GRID: Record<JourneyTier, string> = {
  entrada:
    "mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:max-w-3xl md:justify-items-center md:gap-x-6 md:gap-y-8",
  exploracao:
    "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 md:justify-items-center md:gap-x-5 md:gap-y-8",
  expansao:
    "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 md:justify-items-center md:gap-x-5 md:gap-y-8",
};

function JourneyRow({
  tier,
  modules,
  activeId,
  onSelect,
  startIndex,
}: {
  tier: JourneyTier;
  modules: UniverseModule[];
  activeId: string;
  onSelect: (id: string) => void;
  startIndex: number;
}): ReactNode {
  const meta = JOURNEY_TIERS.find((item) => item.id === tier)!;

  return (
    <div className="relative">
      <div className="mb-4 flex items-end justify-between gap-4 px-1 sm:mb-5 md:hidden">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#9af5ec]/80 sm:text-xs">
            {meta.label}
          </p>
        </div>
        <span
          aria-hidden
          className="hidden h-px flex-1 max-w-[8rem] bg-gradient-to-r from-transparent via-[#9af5ec]/35 to-transparent sm:block"
        />
      </div>

      <div className={TIER_GRID[tier]}>
        {modules.map((module, index) => (
          <EcosystemModuleCard
            key={module.id}
            module={module}
            index={startIndex + index}
            isActive={activeId === module.id}
            isFeatured={module.id === DEFAULT_MODULE_ID}
            onSelect={() => onSelect(module.id)}
          />
        ))}
      </div>
    </div>
  );
}

export function HowItWorks(): ReactNode {
  const headerRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef<HTMLDivElement>(null);
  const scrollRootRef = useScrollRootRef();
  const [activeId, setActiveId] = useState(DEFAULT_MODULE_ID);

  const isHeaderInView = useInView(headerRef, {
    root: scrollRootRef,
    once: true,
    amount: 0.5,
  });

  const isClosingInView = useInView(closingRef, {
    root: scrollRootRef,
    once: true,
    amount: 0.45,
  });

  const entrada = getModulesByTier("entrada");
  const exploracao = getModulesByTier("exploracao");
  const expansao = getModulesByTier("expansao");

  return (
    <section
      id="universo"
      data-depth-label="Universo"
      data-depth="0m"
      className="relative isolate min-h-dvh overflow-hidden px-6 pt-20 pb-0 md:pt-32"
    >
      <RisingBubbles className="z-[1] opacity-90" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.header
          ref={headerRef}
          className="relative mb-10 text-center md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-white/90 sm:text-base">
            O ecossistema completo
          </p>
          <div className="mb-6 flex justify-center text-white/85 sm:mb-8">
            <WaveDivider />
          </div>
          <h2 className="font-display text-[clamp(2rem,5.2vw,3.85rem)] font-bold leading-[1.04] tracking-tight text-white">
            O Universo Evidive
          </h2>
          <motion.p
            className="mx-auto mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-white sm:text-base md:text-lg [text-shadow:0_1px_14px_rgba(4,18,26,0.72),0_0_1px_rgba(0,0,0,0.9)]"
            initial={{ opacity: 0, y: 16 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
          >
            Uma constelação de modalidades pensada para abraçar cada etapa da sua
            jornada — do momento de hesitação antes do primeiro mergulho até a
            vida profissional.
          </motion.p>
          <motion.p
            className="mx-auto mt-4 max-w-lg text-sm font-semibold text-[#b8fff8] sm:text-base [text-shadow:0_1px_12px_rgba(4,18,26,0.65),0_0_1px_rgba(0,0,0,0.85)]"
            initial={{ opacity: 0, y: 12 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.6, delay: 0.18, ease: easeOut }}
          >
            Escolha um caminho para começar sua jornada.
          </motion.p>
        </motion.header>

        <div className="relative">
          <JourneyConnector />

          <div className="relative z-10 flex flex-col gap-10 md:gap-12">
            <JourneyRow
              tier="entrada"
              modules={entrada}
              activeId={activeId}
              onSelect={setActiveId}
              startIndex={0}
            />
            <JourneyRow
              tier="exploracao"
              modules={exploracao}
              activeId={activeId}
              onSelect={setActiveId}
              startIndex={2}
            />
            <JourneyRow
              tier="expansao"
              modules={expansao}
              activeId={activeId}
              onSelect={setActiveId}
              startIndex={5}
            />
          </div>
        </div>

        <motion.div
          ref={closingRef}
          className="relative z-10 mt-12 pb-12 text-center md:mt-16 md:pb-32 lg:pb-40"
          initial={{ opacity: 0, y: 18 }}
          animate={isClosingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.65, ease: easeOut }}
        >
          <p className="mx-auto max-w-xl text-[0.95rem] font-medium leading-relaxed tracking-[0.04em] text-white/88 sm:text-base md:text-lg">
            Abaixo da superfície, cada detalhe foi pensado para o oceano.
          </p>
          <motion.div
            className="mt-6 flex justify-center text-white/82 sm:mt-8"
            initial={{ opacity: 0, scaleX: 0.7 }}
            animate={isClosingInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.7 }}
            transition={{ duration: 0.55, delay: 0.08, ease: easeOut }}
          >
            <WaveDivider />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
