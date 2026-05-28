"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import { emotionDiveConfig } from "@/lib/config";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

function WhatsAppIcon({ className }: { className?: string }): ReactNode {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type ExperienceStep = {
  number: string;
  title: string;
  description: string;
  image: string;
};

const experienceSteps: ExperienceStep[] = [
  {
    number: "01",
    title: "Briefing e Introdução",
    description:
      "Em um ambiente acolhedor, você vai entender como a água funciona, os princípios básicos e vestir os equipamentos. Aqui, a ansiedade começa a virar curiosidade.",
    image: "/assets/hero/POSTS_EVIDIVE (1).png",
  },
  {
    number: "02",
    title: "Adaptação Progressiva",
    description:
      "Antes da imersão real, você dará suas primeiras respirações controladas na superfície da piscina aquecida. No seu tempo, com o instrutor ao seu lado.",
    image: "/assets/hero/DCIM_101GOPRO_GOPR5891.JPG.png",
  },
  {
    number: "03",
    title: "O Mergulho no EviLago",
    description:
      "O momento mais aguardado: descer para o ambiente aquático imersivo do lago. É aqui que você vai sentir como é respirar debaixo d'água no meio da natureza urbana.",
    image: "/assets/hero/DCIM_107GOPRO_GOPR3018.JPG.png",
  },
];

function StepCard({
  step,
  index,
}: {
  step: ExperienceStep;
  index: number;
}): ReactNode {
  return (
    <motion.article
      className="overflow-hidden rounded-2xl border border-border/50 bg-muted/70 transition-colors duration-300 hover:bg-muted"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: easeOut,
      }}
    >
      <div className="grid min-h-[12.5rem] grid-cols-1 sm:min-h-[13.5rem] sm:grid-cols-[14rem_minmax(0,1fr)] md:min-h-[18rem] md:grid-cols-[18rem_minmax(0,1fr)] lg:min-h-[21rem] lg:grid-cols-[20rem_minmax(0,1fr)]">
        <div className="relative aspect-[4/3] min-h-[11rem] w-full sm:aspect-auto sm:min-h-full md:min-h-[18rem] lg:min-h-[21rem]">
          <Image
            src={step.image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 224px, 320px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-8 md:px-9 md:py-12 lg:px-10 lg:py-14">
          <span className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
            {step.number}
          </span>
          <h3 className="font-display mb-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
            {step.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed md:text-[0.95rem]">
            {step.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function PrimeiroMergulho(): ReactNode {
  return (
    <section
      id="primeiro-mergulho"
      data-depth-label="Primeiro Mergulho"
      data-depth="-30m"
      className="shore-destino-section relative -mt-px overflow-visible scroll-mt-6 px-6 pt-8 pb-16 md:pb-24 md:pt-24 lg:pb-28 lg:pt-32"
    >
      <div
        aria-hidden
        className="section-shore-bridge pointer-events-none absolute inset-x-0 bottom-full z-[5] h-[min(14vh,9rem)]"
      />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 md:gap-14 lg:flex-row-reverse lg:items-start lg:gap-16">
        <motion.div
          className="lg:sticky lg:top-60 lg:w-[min(100%,22rem)] lg:shrink-0"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <div className="mb-5 flex flex-col md:mb-6 lg:mb-6 lg:items-end">
            <SectionEyebrow className="text-foreground/80 lg:text-right">
              Primeiro Mergulho
            </SectionEyebrow>
            <div className="mb-5 mt-4 flex justify-start text-foreground/75 sm:mb-6 sm:mt-5 lg:justify-end">
              <WaveDivider />
            </div>
          </div>
          <SectionTitle
            sans="Faça seu primeiro"
            display="mergulho com cilindro de ar."
            sansClassName="text-black"
            displayClassName="text-foreground"
            className="lg:text-right"
          />
          <p className="text-muted-foreground mt-6 text-sm leading-relaxed md:text-base lg:text-right">
            O Emotion Dive é mais que uma aventura: é o começo de uma nova relação
            com a água. Esqueça a rotina, o trânsito e o estresse. Você está a
            minutos de São Paulo, mas prestes a entrar em outro universo.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
            <a
              href={emotionDiveConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display bg-foreground group inline-flex w-full items-center justify-center gap-3 rounded-md py-3 pr-3 pl-5 font-medium text-background transition-all duration-500 ease-out hover:rounded-[50px] sm:w-auto"
            >
              <span>Agendar Emotion Dive</span>
              <span className="bg-background text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
                <ChevronRight className="relative left-px h-4 w-4" aria-hidden />
              </span>
            </a>
            <a
              href={emotionDiveConfig.instructorWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display group inline-flex w-full items-center justify-center gap-3 rounded-md border border-foreground/20 bg-background/60 py-3 pr-3 pl-5 font-medium text-foreground transition-all duration-500 ease-out hover:rounded-[50px] hover:border-foreground/35 hover:bg-background sm:w-auto"
            >
              <span>Falar com instrutor</span>
              <span className="bg-[#25D366] text-white flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
                <WhatsAppIcon className="h-5 w-5" />
              </span>
            </a>
          </div>
        </motion.div>

        <div className="flex min-w-0 flex-1 flex-col gap-6 md:gap-8">
          <motion.h3
            className="font-display text-[clamp(1.35rem,3vw,2rem)] font-bold leading-snug tracking-tight text-foreground"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: easeOut }}
          >
            Como vai funcionar
            <span className="mt-1 block font-normal text-foreground/88">
              o seu dia com a gente.
            </span>
          </motion.h3>

          <div className="flex flex-col gap-8 md:gap-16 lg:gap-20 xl:gap-24">
            {experienceSteps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
