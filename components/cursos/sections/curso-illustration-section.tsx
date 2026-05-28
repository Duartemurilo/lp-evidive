"use client";

import { CursoBookingCta } from "@/components/cursos/shared/curso-booking-cta";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import type { CursoIllustrationBlock } from "@/lib/types/curso-page";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

type CursoIllustrationSectionProps = {
  block: CursoIllustrationBlock;
};

function IllustrationCopy({
  block,
  isDark,
  centered,
}: {
  block: CursoIllustrationBlock;
  isDark: boolean;
  centered?: boolean;
}): ReactNode {
  return (
    <>
      {block.eyebrow ? (
        <>
          <SectionEyebrow
            className={cn(
              centered ? "text-center" : undefined,
              isDark ? "text-white/72" : "text-foreground/75",
            )}
          >
            {block.eyebrow}
          </SectionEyebrow>
          <div
            className={cn(
              "mb-5 flex text-primary md:mb-6",
              centered ? "justify-center" : "justify-start",
            )}
          >
            <WaveDivider className="h-2.5 w-[min(10rem,36vw)]" />
          </div>
        </>
      ) : null}
      {block.title ? (
        <SectionTitle
          {...(block.id ? { id: `${block.id}-heading` } : {})}
          sans={block.title}
          {...(block.titleDisplay ? { display: block.titleDisplay } : {})}
          sansClassName={isDark ? "text-white" : "text-black"}
          displayClassName={isDark ? "text-white/88" : "text-foreground"}
          className={cn("text-pretty", centered && "text-center")}
        />
      ) : null}
      <div
        className={cn(
          "space-y-4",
          block.title ? "mt-6" : "mt-0",
          centered && "mx-auto max-w-2xl text-center",
        )}
      >
        {block.paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className={cn(
              "text-[0.98rem] leading-[1.75] md:text-base",
              isDark ? "text-white/85" : "text-foreground/88",
            )}
          >
            {paragraph}
          </p>
        ))}
      </div>
      {block.bullets && block.bullets.length > 0 ? (
        <ul
          className={cn(
            "mt-6 space-y-3",
            centered && "mx-auto max-w-xl text-left",
          )}
        >
          {block.bullets.map((item) => (
            <li
              key={item}
              className={cn(
                "flex gap-3 text-[0.95rem] leading-relaxed",
                isDark ? "text-white/85" : "text-foreground/88",
              )}
            >
              <span
                aria-hidden
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {block.cta ? (
        <div className="mt-8">
          <CursoBookingCta cta={block.cta} />
        </div>
      ) : null}
    </>
  );
}

function CursoIllustrationStacked({ block }: CursoIllustrationSectionProps): ReactNode {
  return (
    <section
      id={block.id}
      {...(block.title && block.id
        ? { "aria-labelledby": `${block.id}-heading` }
        : { "aria-label": block.illustrationAlt })}
      className="relative scroll-mt-6 overflow-visible bg-background px-6 py-16 md:py-24 lg:py-28"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-foreground px-6 py-12 text-white md:rounded-3xl md:px-10 md:py-16 lg:px-12 lg:py-20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: easeOut }}
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          {block.illustrationSrc ? (
            <motion.div
              className="relative mb-8 w-full max-w-md md:mb-10 md:max-w-lg"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: easeOut }}
            >
              <Image
                src={block.illustrationSrc}
                alt={block.illustrationAlt ?? ""}
                width={560}
                height={420}
                className="mx-auto h-auto w-full object-contain"
              />
            </motion.div>
          ) : null}

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.06, ease: easeOut }}
          >
            <IllustrationCopy block={block} isDark centered />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function CursoIllustrationSplit({ block }: CursoIllustrationSectionProps): ReactNode {
  const isSand = block.surface === "sand";
  const isDark = block.surface === "dark";

  return (
    <section
      id={block.id}
      {...(block.title && block.id
        ? { "aria-labelledby": `${block.id}-heading` }
        : { "aria-label": block.illustrationAlt })}
      className={cn(
        "px-6 py-16 md:py-24 lg:py-28",
        isSand && "shore-destino-section",
        isDark && "bg-foreground text-background",
        !isSand && !isDark && "bg-background",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl",
          block.illustrationSrc
            ? "grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14"
            : "max-w-3xl",
        )}
      >
        {block.illustrationSrc ? (
          <motion.div
            className="relative mx-auto w-full max-w-md lg:max-w-none"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <Image
              src={block.illustrationSrc}
              alt={block.illustrationAlt ?? ""}
              width={560}
              height={420}
              className="h-auto w-full object-contain"
            />
          </motion.div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: easeOut }}
        >
          <IllustrationCopy block={block} isDark={isDark} />
        </motion.div>
      </div>
    </section>
  );
}

export function CursoIllustrationSection({
  block,
}: CursoIllustrationSectionProps): ReactNode {
  if (block.layout === "stacked") {
    return <CursoIllustrationStacked block={block} />;
  }

  return <CursoIllustrationSplit block={block} />;
}
