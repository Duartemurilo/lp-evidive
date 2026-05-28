"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import { viagensConfig } from "@/lib/viagens-config";
import { motion } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;
const { communityGallery } = viagensConfig;

type GalleryImage = (typeof communityGallery.images)[number];

function GalleryImageCard({ image }: { image: GalleryImage }): ReactNode {
  return (
    <article className="viagens-gallery-card flex w-[min(82vw,17.5rem)] shrink-0 overflow-hidden rounded-2xl border border-border/45 bg-muted/80 md:w-[18.5rem]">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 82vw, 296px"
          className="object-cover transition-transform duration-700 group-hover/viagens-gallery:scale-[1.03]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[rgba(34,93,109,0.35)] via-transparent to-transparent"
        />
      </div>
    </article>
  );
}

function ViagensGalleryCarousel(): ReactNode {
  const loopTrack = [...communityGallery.images, ...communityGallery.images];

  return (
    <div className="community-carousel relative -mx-6 md:mx-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-16 bg-gradient-to-r from-background to-transparent md:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-16 bg-gradient-to-l from-transparent to-background md:block"
      />

      <div className="community-carousel-track group/track flex w-max gap-5 px-6 md:gap-6 md:px-0">
        {loopTrack.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="group/viagens-gallery shrink-0"
          >
            <GalleryImageCard image={image} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ViagensCommunityGallery(): ReactNode {
  return (
    <section
      id={communityGallery.id}
      aria-labelledby="viagens-comunidade-heading"
      className="overflow-hidden bg-background py-20 text-foreground md:py-40 lg:py-48"
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.header
          className="mb-10 text-center md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <SectionEyebrow className="mb-3 text-foreground/75">
            {communityGallery.eyebrow}
          </SectionEyebrow>
          <div className="mb-6 flex justify-center text-foreground/70">
            <WaveDivider className="h-2.5 w-[min(10rem,36vw)]" />
          </div>
          <SectionTitle
            id="viagens-comunidade-heading"
            sans={communityGallery.titleSans}
            display={communityGallery.titleDisplay}
            sansClassName="text-black"
            displayClassName="text-foreground"
            className="mx-auto max-w-4xl text-balance"
          />
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.08, ease: easeOut }}
        >
          <ViagensGalleryCarousel />
        </motion.div>
      </div>
    </section>
  );
}
