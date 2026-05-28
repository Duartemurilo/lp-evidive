"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import { freediveConfig } from "@/lib/freedive-config";
import { subpagePresenceTitleDisplayInline } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;
const { profile } = freediveConfig;

function ProfileItem({
  text,
  index,
}: {
  text: string;
  index: number;
}): ReactNode {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.li
      className="flex gap-5 border-foreground/10 border-b py-6 last:border-b-0 md:gap-6 md:py-7"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: easeOut,
      }}
    >
      <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-primary md:text-sm">
        {number}
      </span>
      <p className="text-base leading-relaxed text-foreground md:text-lg">{text}</p>
    </motion.li>
  );
}

export function FreediveProfile(): ReactNode {
  return (
    <section
      id={profile.id}
      aria-labelledby="freedive-perfil-heading"
      className="px-6 py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <motion.header
          className="mb-10 text-center md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <SectionEyebrow className="text-foreground/70">{profile.eyebrow}</SectionEyebrow>
          <div className="mt-4 flex justify-center text-primary">
            <WaveDivider />
          </div>
          <SectionTitle
            id="freedive-perfil-heading"
            size="large"
            sans={profile.titleSans}
            display={profile.titleDisplay}
            displayInline
            sansClassName="text-black"
            displayClassName={cn(subpagePresenceTitleDisplayInline, "text-primary")}
            className="mt-5 text-balance"
          />
        </motion.header>

        <motion.ul
          className="rounded-2xl border border-border/50 bg-muted/60 px-6 md:rounded-3xl md:px-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          {profile.items.map((text, index) => (
            <ProfileItem key={text} text={text} index={index} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
