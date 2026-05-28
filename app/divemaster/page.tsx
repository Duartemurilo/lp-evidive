import { FinalCTA } from "@/components/final-cta";
import { DivemasterCareer } from "@/components/divemaster/divemaster-career";
import { DivemasterCareerHorizons } from "@/components/divemaster/divemaster-career-horizons";
import { DivemasterHero } from "@/components/divemaster/divemaster-hero";
import { DivemasterIntro } from "@/components/divemaster/divemaster-intro";
import { DivemasterPresence } from "@/components/divemaster/divemaster-presence";
import { DivemasterPrerequisitesTransition } from "@/components/divemaster/divemaster-prerequisites-transition";
import { DivemasterPrerequisites } from "@/components/divemaster/divemaster-prerequisites";
import { DivemasterProfile } from "@/components/divemaster/divemaster-profile";
import { divemasterConfig } from "@/lib/divemaster-config";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Divemaster",
  description: divemasterConfig.hero.subheadline,
  path: "/divemaster",
});

export default function DivemasterPage(): ReactNode {
  return (
    <main id="main-content" className="flex-1">
      <DivemasterHero />
      <DivemasterPresence />
      <DivemasterIntro />
      <DivemasterCareer />
      <DivemasterCareerHorizons />
      <DivemasterPrerequisitesTransition />
      <DivemasterPrerequisites />
      <DivemasterProfile />
      <FinalCTA />
    </main>
  );
}
