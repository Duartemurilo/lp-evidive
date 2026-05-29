"use client";

import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import {
  homeViagensTeaserConfig,
  pickHomeFeaturedTrips,
} from "@/lib/home-viagens-teaser";
import { useViagens } from "@/lib/hooks/use-viagens";
import { reducedMotionVariants, useReducedMotion } from "@/lib/motion";
import type { Viagem } from "@/lib/types/viagens";
import { getViagemDetailHref } from "@/lib/viagens-trip-pages";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, type ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;
const { eyebrow, titleSans, titleDisplay, subtitle, cta, id } = homeViagensTeaserConfig;

const gridStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

function TeaserTripCard({
  trip,
  variants,
}: {
  trip: Viagem;
  variants?: Variants;
}): ReactNode {
  const cardHref = getViagemDetailHref(trip);

  return (
    <motion.article
      className="h-full"
      {...(variants ? { variants } : {})}
    >
      <Link
        href={cardHref}
        className="group/teaser flex h-full flex-col overflow-hidden rounded-2xl border border-border/40 bg-[#f4f2ee] shadow-[0_10px_36px_rgba(8,32,42,0.08)] transition-[border-color,box-shadow] duration-500 hover:border-primary/25 hover:shadow-[0_16px_44px_rgba(8,32,42,0.12)]"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={trip.imageSrc}
            alt={trip.imageAlt}
            fill
            sizes="(max-width: 768px) 82vw, 320px"
            className="object-cover transition-transform duration-700 group-hover/teaser:scale-[1.03]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[rgba(4,24,32,0.55)] to-transparent"
          />
          <span className="absolute left-4 top-4 z-10 rounded-sm bg-primary/90 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            {trip.scopeLabel}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-foreground">
            {trip.title}
          </h3>
          <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {trip.description}
          </p>
          <span className="inline-flex shrink-0 self-end text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-primary">
            Ver destino »
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function TeaserTripsCarousel({ trips }: { trips: readonly Viagem[] }): ReactNode {
  return (
    <div className="relative -mx-6 md:hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent"
      />

      <div
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-6 pb-1 [-webkit-overflow-scrolling:touch] [scroll-padding-inline:1.5rem]"
        role="list"
        aria-label="Destinos em destaque"
      >
        {trips.map((trip) => (
          <div
            key={trip.id}
            role="listitem"
            className="w-[min(82vw,18.5rem)] shrink-0 snap-center"
          >
            <TeaserTripCard trip={trip} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TeaserTripsGrid({
  trips,
  variants,
}: {
  trips: readonly Viagem[];
  variants: Variants;
}): ReactNode {
  return (
    <motion.div
      className="hidden gap-6 md:grid md:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
    >
      {trips.map((trip) => (
        <TeaserTripCard key={trip.id} trip={trip} variants={cardReveal} />
      ))}
    </motion.div>
  );
}

function TeaserSkeleton(): ReactNode {
  return (
    <>
      <div className="scrollbar-hide -mx-6 flex gap-4 overflow-hidden px-6 md:hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-[min(18rem,70vw)] w-[min(82vw,18.5rem)] shrink-0 animate-pulse rounded-2xl bg-muted/60"
          />
        ))}
      </div>
      <div className="hidden gap-6 md:grid md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="aspect-[4/3] animate-pulse rounded-2xl bg-muted/60" />
        ))}
      </div>
    </>
  );
}

export function HomeViagensTeaser(): ReactNode {
  const { data, isLoading } = useViagens();
  const trips = useMemo(
    () => (data ? pickHomeFeaturedTrips(data) : []),
    [data],
  );
  const prefersReducedMotion = useReducedMotion();
  const gridVariants = prefersReducedMotion ? reducedMotionVariants : gridStagger;

  return (
    <section
      id={id}
      data-depth-label="Viagens"
      data-depth="-78m"
      aria-labelledby="home-viagens-teaser-heading"
      className="border-t border-border/35 bg-background px-6 py-20 text-foreground md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <motion.header
          className="mb-8 text-center md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <SectionEyebrow className="mb-3 text-foreground/75">{eyebrow}</SectionEyebrow>
          <div className="mb-6 flex justify-center text-foreground/70">
            <WaveDivider className="h-2.5 w-[min(10rem,36vw)]" />
          </div>
          <SectionTitle
            id="home-viagens-teaser-heading"
            sans={titleSans}
            display={titleDisplay}
            sansClassName="text-black"
            displayClassName="text-primary"
          />
          <p className="mx-auto mt-5 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            {subtitle}
          </p>
        </motion.header>

        {isLoading ? (
          <TeaserSkeleton />
        ) : trips.length > 0 ? (
          <>
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: easeOut }}
            >
              <TeaserTripsCarousel trips={trips} />
            </motion.div>

            <TeaserTripsGrid trips={trips} variants={gridVariants} />
          </>
        ) : null}

        <motion.div
          className="mt-10 flex justify-center md:mt-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12, ease: easeOut }}
        >
          <Link
            href={cta.href}
            className="font-display group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_12px_36px_rgba(30,196,180,0.32)] transition-all duration-300 hover:bg-[#1ad4c3] hover:shadow-[0_16px_44px_rgba(30,196,180,0.4)]"
          >
            {cta.label}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
