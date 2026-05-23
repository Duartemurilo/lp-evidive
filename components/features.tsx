"use client";

import { WaveDivider } from "@/components/wave-divider";
import { Anchor } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

interface ArchitecturePillar {
  number: string;
  title: string;
  description: string;
  image: string;
}

const architecturePillars: ArchitecturePillar[] = [
  {
    number: "01",
    title: "Captação pluvial",
    description:
      "A reposição do lago vem da água da chuva — zero desperdício de água tratada externa.",
    image: "/assets/hero/DCIM_107GOPRO_GOPR3018.JPG.png",
  },
  {
    number: "02",
    title: "Contêineres oceânicos",
    description:
      "Arquitetura reciclada de alto padrão. Uma estrutura sólida que já cruzou o mundo antes de você.",
    image: "/assets/hero/POSTS_EVIDIVE (2).png",
  },
  {
    number: "03",
    title: "Eficiência térmica",
    description:
      "Telhado verde e integração para conforto natural — dispensa o excesso de climatização artificial.",
    image: "/assets/hero/POSTS_EVIDIVE (5).png",
  },
  {
    number: "04",
    title: "100% Acessível",
    description:
      "Estrutura desenhada para todos. Mergulho e circulação inclusivos desde a porta de entrada.",
    image: "/assets/hero/POSTS_EVIDIVE (8).png",
  },
];

function PillarCard({
  pillar,
  index,
}: {
  pillar: ArchitecturePillar;
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
            src={pillar.image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 224px, 320px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-8 md:px-9 md:py-12 lg:px-10 lg:py-14">
          <span className="text-muted-foreground mb-2 text-xs font-semibold tracking-[0.18em] uppercase">
            {pillar.number}
          </span>
          <h3 className="font-display mb-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
            {pillar.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed md:text-[0.95rem]">
            {pillar.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function Features(): ReactNode {
  return (
    <section
      id="destino"
      data-depth-label="Destino"
      data-depth="-6m"
      className="shore-destino-section relative overflow-visible scroll-mt-6 px-6 pt-12 pb-20 md:pb-36 md:pt-20 lg:pb-40 lg:pt-24"
    >
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 md:gap-14 lg:flex-row lg:items-start lg:gap-16">
        <motion.div
          className="lg:sticky lg:top-60 lg:w-[min(100%,22rem)] lg:shrink-0"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-foreground/80">
            O ecossistema
          </p>
          <div className="mb-5 flex justify-start text-foreground/75 md:mb-6">
            <WaveDivider className="h-2.5 w-[min(10rem,36vw)]" />
          </div>
          <h2 className="font-display text-[clamp(1.85rem,4.5vw,2.75rem)] font-bold leading-[1.08] tracking-tight text-foreground">
            Arquitetura sustentável.
            <span className="mt-2 block text-[clamp(1.35rem,3.2vw,2rem)] font-normal text-foreground/88">
              Design focado no oceano.
            </span>
          </h2>
          <motion.div
            className="mt-8 flex justify-start md:mt-10"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12, ease: easeOut }}
            aria-hidden
          >
            <Anchor
              className="h-10 w-10 stroke-[1.35] text-foreground md:h-12 md:w-12"
              strokeWidth={1.35}
            />
          </motion.div>
        </motion.div>

        <div className="flex min-w-0 flex-1 flex-col gap-8 md:gap-16 lg:gap-20 xl:gap-24">
          {architecturePillars.map((pillar, index) => (
            <PillarCard key={pillar.number} pillar={pillar} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
