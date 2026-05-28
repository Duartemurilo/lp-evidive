"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import {
  useCursoTitleDisplayClassName,
  useCursoWaveWrapClassName,
} from "@/lib/curso-page-accent-context";
import type { CursoTestimonial, CursoTestimonialsBlock } from "@/lib/types/curso-page";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

function TestimonialImageCard({ member }: { member: CursoTestimonial }): ReactNode {
  return (
    <article className="flex w-[min(88vw,20rem)] shrink-0 overflow-hidden rounded-2xl border border-border/40 bg-[#f4f2ee] shadow-[0_10px_36px_rgba(8,32,42,0.08)] md:w-[22rem]">
      <Image
        src={member.image}
        alt={member.imageAlt ?? "Depoimento"}
        width={440}
        height={560}
        className="h-auto w-full object-contain"
      />
    </article>
  );
}

function TestimonialQuoteCard({ member }: { member: CursoTestimonial }): ReactNode {
  return (
    <article className="community-member-card flex w-[min(82vw,17.5rem)] shrink-0 flex-col overflow-hidden rounded-2xl border border-border/45 bg-muted/80 md:w-[18.5rem]">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={member.image}
          alt=""
          fill
          sizes="(max-width: 768px) 82vw, 296px"
          className="object-cover transition-transform duration-700 group-hover/testimonial:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[rgba(34,93,109,0.55)] via-transparent to-transparent"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 py-5 md:px-6 md:py-6">
        <p className="mb-5 text-sm leading-relaxed text-foreground/88 md:text-[0.95rem]">
          &ldquo;{member.quote}&rdquo;
        </p>
        <div className="mt-auto border-t border-border/40 pt-4">
          <p className="font-display text-lg font-bold tracking-tight text-foreground">
            {member.name}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
        </div>
      </div>
    </article>
  );
}

type CursoTestimonialsSectionProps = {
  block: CursoTestimonialsBlock;
};

export function CursoTestimonialsSection({
  block,
}: CursoTestimonialsSectionProps): ReactNode {
  const displayClassName = useCursoTitleDisplayClassName();
  const waveWrapClassName = useCursoWaveWrapClassName();
  const loopTrack = [...block.items, ...block.items];
  const headingId = block.id ? `${block.id}-heading` : undefined;

  return (
    <section
      id={block.id}
      {...(headingId ? { "aria-labelledby": headingId } : {})}
      className="overflow-hidden bg-background py-20 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.header
          className="mb-10 text-center md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          {block.eyebrow ? (
            <SectionEyebrow className="mb-3 text-foreground/75">
              {block.eyebrow}
            </SectionEyebrow>
          ) : null}
          <div className={cn("mb-6 flex justify-center", waveWrapClassName)}>
            <WaveDivider className="h-2.5 w-[min(10rem,36vw)]" />
          </div>
          {block.title && !block.titleSans ? (
            <h2
              id={headingId}
              className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold tracking-tight text-black text-balance"
            >
              {block.title}
            </h2>
          ) : (
            <SectionTitle
              {...(headingId ? { id: headingId } : {})}
              sans={block.titleSans ?? ""}
              display={block.titleDisplay ?? ""}
              sansClassName="text-black"
              displayClassName={displayClassName}
            />
          )}
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.08, ease: easeOut }}
        >
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
                  key={`${member.image}-${index}`}
                  className="group/testimonial shrink-0"
                >
                  {member.imageOnly ? (
                    <TestimonialImageCard member={member} />
                  ) : (
                    <TestimonialQuoteCard member={member} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
