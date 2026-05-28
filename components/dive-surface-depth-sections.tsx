import { Hero } from "@/components/hero";
import { HeroJourneyPaths } from "@/components/hero-journey-paths";
import { HowItWorks } from "@/components/how-it-works";
import diveSurfaceBg from "../public/backgrounds/bg-hero-2.png";
import diveSurfaceBgMobile from "../public/backgrounds/bg-hero-2-mobile.png";
import Image from "next/image";
import type { ReactNode } from "react";

/** Filtro alinhado à imagem — tons suaves */
const SURFACE_GRADIENT = [
  "radial-gradient(ellipse 80% 62% at 50% 28%, rgba(4,18,26,0.42) 0%, rgba(4,18,26,0.14) 55%, transparent 82%)",
  "linear-gradient(180deg, rgba(4,16,22,0.32) 0%, rgba(4,16,22,0.06) 42%, transparent 72%)",
  "linear-gradient(90deg, rgba(4,16,22,0.26) 0%, transparent 24%, transparent 76%, rgba(4,16,22,0.26) 100%)",
].join(", ");

function SurfaceOverlays({ mobileHero = false }: { mobileHero?: boolean }): ReactNode {
  return (
    <>
      <div
        className={
          mobileHero
            ? "absolute inset-0 bg-[#041820]/32"
            : "absolute inset-0 bg-[#041820]/18"
        }
      />
      <div
        className="absolute inset-0"
        style={{ background: SURFACE_GRADIENT }}
      />
      {mobileHero ? (
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#041820]/55 to-transparent" />
      ) : null}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-[#041820]/12 to-[#041820]/38" />
    </>
  );
}

export function DiveSurfaceDepthSections(): ReactNode {
  return (
    <div className="relative isolate bg-[#061f28]">
      {/* Hero + Sua jornada + O ecossistema completo: mesma imagem e mesmo filtro */}
      <div className="relative">
        {/* Mobile: imagem só na hero, enquadrada na linha d&apos;água */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-dvh min-h-[32rem] overflow-hidden md:hidden"
        >
          <Image
            src={diveSurfaceBgMobile}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-[50%_20%]"
          />
          <SurfaceOverlays mobileHero />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent via-[#041820]/35 to-[#061f28]" />
        </div>
        {/* Mobile: continuidade abaixo da hero sem esticar a foto no céu */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-dvh bottom-0 z-0 bg-gradient-to-b from-[#061f28] via-[#072e3a] to-[#061f28] md:hidden"
        />
        {/* Desktop: mesma imagem em hero + jornada + ecossistema */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 hidden md:block"
        >
          <Image
            src={diveSurfaceBg}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-top"
          />
          <SurfaceOverlays />
        </div>
        <div className="relative z-10">
          <Hero />
          <HeroJourneyPaths />
          <HowItWorks />
        </div>
      </div>
    </div>
  );
}
