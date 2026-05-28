import { SectionEyebrow } from "@/components/section-eyebrow";
import { WaveDivider } from "@/components/wave-divider";
import { resolveViagemHeroImageUrl, viagensConfig } from "@/lib/viagens-config";
import {
  heroContentWidth,
  heroCtaIconWrapClass,
  heroCtaPrimaryClass,
  heroEyebrowColor,
  heroSubtitleWrapperClass,
  heroTitleLineClass,
  heroTitleWrapperClass,
  heroWaveWrapClass,
} from "@/lib/typography";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type ViagemDetailHeroProps = {
  title: string;
  scopeLabel: string;
  backgroundImageUrl?: string | null;
  variant?: "page" | "embedded";
  dateLine?: string | null;
  ctaHref?: string | null;
  ctaLabel?: string;
};

export function ViagemDetailHero({
  title,
  scopeLabel,
  backgroundImageUrl,
  variant = "page",
  dateLine,
  ctaHref,
  ctaLabel = viagensConfig.detailHero.ctaLabel,
}: ViagemDetailHeroProps): ReactNode {
  const heroBackgroundImage = resolveViagemHeroImageUrl(backgroundImageUrl);
  const isEmbedded = variant === "embedded";
  const trimmedDateLine = dateLine?.trim();
  const trimmedCtaHref = ctaHref?.trim();

  return (
    <section
      id="viagem-detail-hero"
      className={cn(
        "relative isolate flex flex-col overflow-hidden",
        isEmbedded ? "min-h-[min(70vh,32rem)]" : "min-h-[92dvh]",
      )}
      aria-labelledby="viagem-detail-hero-heading"
    >
      <div
        className={cn(
          "absolute inset-0 z-0 bg-cover bg-center bg-no-repeat",
          !isEmbedded &&
            "min-[850px]:inset-2.5 min-[850px]:scale-105 min-[850px]:rounded-br-4xl min-[850px]:rounded-bl-4xl",
        )}
        style={{ backgroundImage: `url(${heroBackgroundImage})` }}
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-foreground/55 via-foreground/30 to-foreground/10",
          !isEmbedded && "min-[850px]:rounded-br-4xl min-[850px]:rounded-bl-4xl",
        )}
        aria-hidden
      />

      <div
        className={cn(
          "relative z-10 flex flex-1 items-center justify-center px-6",
          isEmbedded
            ? "pb-10 pt-20 max-[850px]:pt-16"
            : "pb-16 pt-32 max-[850px]:pt-28 md:pt-36",
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-full flex-col items-center text-center",
            heroContentWidth,
          )}
        >
          <SectionEyebrow className={heroEyebrowColor}>{scopeLabel}</SectionEyebrow>
          <div className={heroWaveWrapClass}>
            <WaveDivider className="text-primary" />
          </div>
          <h1
            id="viagem-detail-hero-heading"
            className={cn(heroTitleWrapperClass, "max-w-[18ch] text-balance text-white")}
          >
            <span className={cn(heroTitleLineClass, "text-white")}>{title}</span>
          </h1>
          {trimmedDateLine ? (
            <p
              className={cn(
                heroSubtitleWrapperClass,
                "mb-0 mt-4 max-w-xl text-[0.92rem] font-medium tracking-[0.06em] text-white/90 sm:mt-5",
              )}
            >
              {trimmedDateLine}
            </p>
          ) : null}
          {trimmedCtaHref ? (
            <div className={cn("flex w-full justify-center", trimmedDateLine ? "mt-8" : "mt-10")}>
              <Link
                href={trimmedCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className={heroCtaPrimaryClass}
              >
                <span>{ctaLabel}</span>
                <span className={heroCtaIconWrapClass}>
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
