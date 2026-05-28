"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import { useEcosystemScrollExpand } from "@/lib/use-ecosystem-scroll-expand";
import { Anchor } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRef, type ReactNode } from "react";

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

const pillarCardGlass =
  "border border-white/[0.14] bg-[linear-gradient(180deg,rgba(3,18,24,0.34)_0%,rgba(3,18,24,0.58)_44%,rgba(3,18,24,0.86)_100%)] shadow-[0_24px_80px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-[18px] supports-[backdrop-filter]:bg-[linear-gradient(180deg,rgba(3,18,24,0.28)_0%,rgba(3,18,24,0.52)_44%,rgba(3,18,24,0.8)_100%)] sm:bg-[linear-gradient(90deg,rgba(3,18,24,0.36)_0%,rgba(3,18,24,0.62)_48%,rgba(3,18,24,0.84)_100%)] sm:supports-[backdrop-filter]:bg-[linear-gradient(90deg,rgba(3,18,24,0.3)_0%,rgba(3,18,24,0.56)_48%,rgba(3,18,24,0.78)_100%)]";

function PillarCard({
  pillar,
  index,
}: {
  pillar: ArchitecturePillar;
  index: number;
}): ReactNode {
  return (
    <motion.article
      className={`group overflow-hidden rounded-2xl transition-[border-color,box-shadow] duration-300 hover:border-white/[0.18] hover:shadow-[0_28px_88px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.1)] ${pillarCardGlass}`}
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
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(3,18,24,0.42)_100%)] sm:bg-[linear-gradient(90deg,transparent_52%,rgba(3,18,24,0.5)_100%)]"
          />
        </div>
        <div className="relative flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-8 md:px-9 md:py-12 lg:px-10 lg:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[rgba(3,18,24,0.22)] sm:bg-[linear-gradient(90deg,transparent_0%,rgba(3,18,24,0.38)_100%)]"
          />
          <span className="relative mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {pillar.number}
          </span>
          <h3 className="font-display relative mb-2 text-xl font-bold tracking-tight text-white md:text-2xl">
            {pillar.title}
          </h3>
          <p className="relative text-sm leading-relaxed text-white/85 md:text-[0.95rem]">
            {pillar.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function Features(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEcosystemScrollExpand({ sectionRef, shellRef, bgRef });

  return (
    <section
      ref={sectionRef}
      id="destino"
      data-depth-label="O ecossistema"
      data-depth="-70m"
      className="relative scroll-mt-6 overflow-visible bg-background"
    >
      <div
        ref={shellRef}
        className="relative overflow-visible pt-12 pb-20 text-white md:pb-36 md:pt-20 lg:pb-40 lg:pt-24"
      >
        <div
          ref={bgRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-b-2xl bg-foreground md:rounded-b-3xl"
        />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 md:gap-14 lg:flex-row lg:items-start lg:gap-16">
          <motion.div
            className="lg:sticky lg:top-60 lg:w-[min(100%,22rem)] lg:shrink-0 lg:self-start"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOut }}
          >
          <SectionEyebrow className="mb-3 text-white/72">O ecossistema</SectionEyebrow>
          <div className="mb-5 flex justify-start text-primary md:mb-6">
            <WaveDivider className="h-2.5 w-[min(10rem,36vw)]" />
          </div>
          <SectionTitle
            sans="Arquitetura sustentável."
            display="Design focado no oceano."
            sansClassName="text-white"
            displayClassName="text-white/88"
          />
          <motion.div
            className="mt-8 flex justify-start md:mt-10"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12, ease: easeOut }}
            aria-hidden
          >
            <Anchor
              className="h-10 w-10 stroke-[1.35] text-primary md:h-12 md:w-12"
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
      </div>
    </section>
  );
}
