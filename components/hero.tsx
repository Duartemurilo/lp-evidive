import { SectionEyebrow } from "@/components/section-eyebrow";
import { WaveDivider } from "@/components/wave-divider";
import {
  heroContentWidth,
  heroCtaIconWrapClass,
  heroCtaPrimaryClass,
  heroEyebrowColor,
  heroSubtitleWrapperClass,
  heroTitleAccentClass,
  heroTitleLineClass,
  heroTitleWrapperClass,
  heroWaveWrapClass,
} from "@/lib/typography";
import { cn } from "@/lib/utils";
import { ChevronRight as ChevronRightIcon } from "lucide-react";
import { type ReactNode } from "react";

const eyebrowText = "Concept Dive Center";
const headlineLine1 = "Respire debaixo d'água e";
const headlineLine2 = "descubra ";
const headlineLine2Accent = "um novo mundo.";
const subtitleLine1 = "Uma experiência imersiva para quem quer";
const subtitleLine2 = "conhecer, aprender e evoluir no mergulho.";

export function Hero(): ReactNode {
  return (
    <section
      id="superficie"
      data-depth-label="Superfície"
      data-depth="0m"
      className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 pb-10 pt-28 sm:pt-32 md:pt-36"
    >
      <div
        className={cn(
          "relative z-10 mx-auto flex w-full flex-col items-center text-center",
          heroContentWidth,
        )}
      >
        <SectionEyebrow className={heroEyebrowColor}>{eyebrowText}</SectionEyebrow>
        <div className={heroWaveWrapClass}>
          <WaveDivider className="text-primary" />
        </div>

        <h1 className={heroTitleWrapperClass}>
          <span className={cn(heroTitleLineClass, "whitespace-nowrap")}>
            {headlineLine1}
          </span>
          <span className={cn("mt-1", heroTitleLineClass, "whitespace-nowrap")}>
            {headlineLine2}
            <span className={heroTitleAccentClass}>{headlineLine2Accent}</span>
          </span>
        </h1>

        <div className={heroSubtitleWrapperClass}>
          <p className="whitespace-nowrap">{subtitleLine1}</p>
          <p className="mt-1 whitespace-nowrap">{subtitleLine2}</p>
        </div>

        <div className="flex w-full justify-center">
          <a href="#escolha-experiencia" className={heroCtaPrimaryClass}>
            <span>Escolher minha experiência</span>
            <span className={heroCtaIconWrapClass}>
              <ChevronRightIcon className="h-4 w-4" aria-hidden />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
