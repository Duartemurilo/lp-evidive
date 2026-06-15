"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type CommunityMember = {
  name: string;
  role: string;
  quote: string;
  image: string;
};

const communityMembers: CommunityMember[] = [
  {
    name: "Marina T.",
    role: "Curso Avançado de Mergulho",
    quote:
      "Entrei pra aprender a mergulhar. Fiquei pela comunidade e pelos amigos que fiz aqui.",
    image: "/home/home_aperfeicoe_tecnica.png",
  },
  {
    name: "Rafael S.",
    role: "Divemaster",
    quote:
      "A Evidive mudou minha forma de viver o fim de semana. Hoje mergulho todo sábado com o mesmo grupo.",
    image: "/home/home_conteiners.JPG",
  },
  {
    name: "Camila R.",
    role: "Mergulhadora Open Water",
    quote:
      "Aqui encontrei um lugar seguro para evoluir no meu ritmo, sempre com gente que torce por mim.",
    image: "/home/home_adaptacao_progressiva.JPG",
  },
  {
    name: "Thiago M.",
    role: "Instrutor Assistente",
    quote:
      "O que mais me marcou foi ver alunos virarem amigos e voltarem juntos toda semana.",
    image: "/home/home_direcionamento.JPG",
  },
  {
    name: "Juliana P.",
    role: "Freediver",
    quote:
      "Mais do que treinos, a Evidive virou meu ponto de encontro com o mar e com pessoas incríveis.",
    image: "/home/home_exploracao_realidade.jpg",
  },
];

function MemberCard({ member }: { member: CommunityMember }): ReactNode {
  return (
    <article className="community-member-card flex w-[min(82vw,17.5rem)] shrink-0 flex-col overflow-hidden rounded-2xl border border-border/45 bg-muted/80 md:w-[18.5rem]">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={member.image}
          alt=""
          fill
          sizes="(max-width: 768px) 82vw, 296px"
          className="object-cover transition-transform duration-700 group-hover/community-card:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[rgba(34,93,109,0.55)] via-transparent to-transparent"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 py-5 md:px-6 md:py-6">
        <p className="text-foreground/88 mb-5 text-sm leading-relaxed md:text-[0.95rem]">
          &ldquo;{member.quote}&rdquo;
        </p>
        <div className="mt-auto border-t border-border/40 pt-4">
          <p className="font-display text-lg font-bold tracking-tight text-foreground">
            {member.name}
          </p>
          <p className="text-muted-foreground mt-1 text-sm">{member.role}</p>
        </div>
      </div>
    </article>
  );
}

function CommunityCarousel(): ReactNode {
  const loopTrack = [...communityMembers, ...communityMembers];

  return (
    <div className="community-carousel relative -mx-6 md:mx-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-background to-transparent md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-r from-transparent to-background md:block"
      />

      <div className="community-carousel-track group/track flex w-max gap-5 px-6 md:gap-6 md:px-0">
        {loopTrack.map((member, index) => (
          <div
            key={`${member.name}-${index}`}
            className="group/community-card shrink-0"
          >
            <MemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Community(): ReactNode {
  return (
    <section
      id="comunidade"
      data-depth-label="Comunidade"
      data-depth="-75m"
      className="bg-background overflow-hidden py-20 text-foreground md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.header
          className="mb-10 text-center md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <SectionEyebrow className="mb-3 text-foreground/75">Comunidade</SectionEyebrow>
          <div className="mb-6 flex justify-center text-foreground/70">
            <WaveDivider className="h-2.5 w-[min(10rem,36vw)]" />
          </div>
          <SectionTitle
            sans="Mais do que mergulho."
            display="Uma comunidade."
            sansClassName="text-black"
            displayClassName="text-foreground"
          />
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.08, ease: easeOut }}
        >
          <CommunityCarousel />
        </motion.div>
      </div>
    </section>
  );
}
