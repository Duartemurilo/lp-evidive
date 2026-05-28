import { FinalCTA } from "@/components/final-cta";
import { FreediveHero } from "@/components/freedive/freedive-hero";
import { FreediveCourses } from "@/components/freedive/freedive-courses";
import { FreediveIntro } from "@/components/freedive/freedive-intro";
import { FreedivePresence } from "@/components/freedive/freedive-presence";
import { FreediveProfile } from "@/components/freedive/freedive-profile";
import { freediveConfig } from "@/lib/freedive-config";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Freedive",
  description: freediveConfig.intro.paragraphs[0],
  path: "/freedive",
});

export default function FreedivePage(): ReactNode {
  return (
    <main id="main-content" className="flex-1">
      <FreediveHero />
      <FreedivePresence />
      <FreediveIntro />
      <FreediveCourses />
      <FreediveProfile />
      <FinalCTA />
    </main>
  );
}
