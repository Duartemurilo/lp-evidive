"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import { divemasterConfig } from "@/lib/divemaster-config";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;
const { careerHorizons } = divemasterConfig;

export function DivemasterCareerHorizons(): ReactNode {
  return (
    <section
      id={careerHorizons.id}
      aria-labelledby="divemaster-horizontes-heading"
      className="shore-destino-section px-6 py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <motion.header
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65, ease: easeOut }}
        >
          <SectionEyebrow className="text-foreground/75">
            {careerHorizons.eyebrow}
          </SectionEyebrow>
          <div className="mt-4 flex justify-center text-primary lg:justify-start">
            <WaveDivider />
          </div>
          <SectionTitle
            id="divemaster-horizontes-heading"
            sans={careerHorizons.titleSans}
            display={careerHorizons.titleDisplay}
            sansClassName="text-black"
            displayClassName="text-primary"
            className="mt-5 text-balance"
          />
        </motion.header>

        <motion.div
          className="mx-auto mt-6 max-w-xl space-y-4 text-center text-sm leading-relaxed text-muted-foreground md:text-base lg:mx-0 lg:text-left"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.06, ease: easeOut }}
        >
          {careerHorizons.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </motion.div>

        <motion.ul
          className="mt-8 flex flex-wrap justify-center gap-2 md:mt-10 lg:justify-start"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: 0.1, ease: easeOut }}
        >
          {careerHorizons.pillars.map((pillar) => (
            <li
              key={pillar}
              className="rounded-sm border border-border/50 bg-muted/70 px-3 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-foreground/75 md:text-[0.62rem]"
            >
              {pillar}
            </li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-8 flex justify-center lg:mt-10 lg:justify-start"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.14, ease: easeOut }}
        >
          <Link
            href={careerHorizons.cta.href}
            className="group inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-primary md:text-xs"
          >
            {careerHorizons.cta.text}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
