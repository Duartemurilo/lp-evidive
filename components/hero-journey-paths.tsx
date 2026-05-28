"use client";

import {
  Anchor,
  ArrowDown,
  GraduationCap,
  type LucideIcon,
  Waves,
} from "lucide-react";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { formatDepth, getDepthSection } from "@/lib/depth-sections";
import { useScrollRootRef } from "@/lib/use-scroll-root";

const easeOut = [0.16, 1, 0.3, 1] as const;

type JourneyPathCard = {
  title: string;
  subtitle: string;
  sectionId: string;
  href: string;
  icon: LucideIcon;
  featured?: boolean;
};

export const journeyPathCards: JourneyPathCard[] = [
  {
    title: "Primeira experiência",
    subtitle: "Descubra o mergulho pela primeira vez.",
    sectionId: "primeiro-mergulho",
    href: "#primeiro-mergulho",
    icon: Waves,
    featured: true,
  },
  {
    title: "Formação",
    subtitle: "Aprenda, certifique-se e evolua.",
    sectionId: "explore-mergulhadores",
    href: "#explore-mergulhadores",
    icon: GraduationCap,
  },
  {
    title: "Já sou mergulhador",
    subtitle: "Continue sua jornada no oceano.",
    sectionId: "aperfeicoe-sua-tecnica",
    href: "#aperfeicoe-sua-tecnica",
    icon: Anchor,
  },
] as const;

function JourneyPathCard({
  card,
  index,
  inView,
}: {
  card: JourneyPathCard;
  index: number;
  inView: boolean;
}): ReactNode {
  const Icon = card.icon;
  const section = getDepthSection(card.sectionId);
  const depthLabel = section ? formatDepth(section.depthMeters) : "0m";

  return (
    <motion.a
      href={card.href}
      className={`group block cursor-pointer rounded-2xl border bg-white/95 p-5 text-left shadow-[0_12px_40px_rgba(8,32,42,0.18)] backdrop-blur-sm transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:p-5 ${
        card.featured === true
          ? "border-primary/35"
          : "border-white/60"
      }`}
      initial={false}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: inView ? 0.08 + index * 0.07 : 0,
        ease: easeOut,
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 48px rgba(8,32,42,0.22)",
      }}
      aria-label={`${card.title} — ${card.subtitle}`}
    >
      <div className="flex items-start gap-3.5">
        <div
          className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border shadow-[0_8px_24px_rgba(30,196,180,0.14)] transition-all duration-500 group-hover:scale-105 sm:h-14 sm:w-14 ${
            card.featured === true
              ? "border-primary/25 bg-white text-primary"
              : "border-primary/20 bg-[#f7f6f3] text-primary"
          }`}
        >
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.85} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-[1.02rem] font-bold leading-tight text-foreground sm:text-[1.08rem]">
                {card.title}
              </h3>
              <p className="mt-1 max-w-[18rem] text-[0.82rem] leading-snug text-muted-foreground sm:text-[0.9rem]">
                {card.subtitle}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="font-display text-base font-bold tracking-tight text-primary sm:text-lg">
                {depthLabel}
              </span>
              <ArrowDown
                className="h-4 w-4 text-primary/45 transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-primary"
                strokeWidth={2.25}
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export function HeroJourneyPaths(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRootRef = useScrollRootRef();
  const inView = useInView(sectionRef, {
    root: scrollRootRef,
    once: true,
    amount: 0.25,
  });

  return (
    <section
      ref={sectionRef}
      id="escolha-experiencia"
      data-depth-label="Sua jornada"
      data-depth="-10m"
      aria-labelledby="escolha-experiencia-heading"
      className="relative z-10 scroll-mt-24 px-6 pb-16 pt-4 md:pb-20 md:pt-6 lg:pb-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          className="mb-8 flex flex-col items-center text-center md:mb-10"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          <SectionEyebrow className="text-white/70">Sua jornada</SectionEyebrow>
          <motion.div
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.6 }}
            transition={{ duration: 0.5, delay: inView ? 0.04 : 0, ease: easeOut }}
            className="mb-5 mt-4 text-primary sm:mb-6 sm:mt-5"
          >
            <WaveDivider className="text-primary" />
          </motion.div>
          <SectionTitle
            id="escolha-experiencia-heading"
            sans="Por onde você quer "
            display="começar?"
            displayInline
            size="large"
            sansClassName="text-white"
            displayClassName="text-primary"
          />
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/72 sm:text-base">
            Escolha o caminho que faz mais sentido para o seu momento no mergulho.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-3 md:gap-4">
          {journeyPathCards.map((card, index) => (
            <JourneyPathCard
              key={card.title}
              card={card}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
