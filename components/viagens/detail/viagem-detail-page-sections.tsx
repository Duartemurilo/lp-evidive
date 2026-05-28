"use client";

import type { TripPageSection } from "@/lib/types/trip-page-section";
import { viagemDetailSectionTitleClass } from "@/lib/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

type ViagemDetailPageSectionsProps = {
  sections: TripPageSection[];
};

const sectionBodyClass =
  "text-[0.98rem] leading-[1.75] text-foreground/88 md:text-base whitespace-pre-line";

export function ViagemDetailPageSections({
  sections,
}: ViagemDetailPageSectionsProps): ReactNode {
  const visible = sections.filter(
    (section) => section.title.trim() || section.subtitle.trim(),
  );

  if (visible.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-hidden bg-[#f7f2ec]">
      <div className="mx-auto max-w-3xl px-6 py-16 text-left md:py-20">
        {visible.map((section, index) => (
          <section
            key={section.id}
            className={cn(
              index > 0 && "mt-14 border-t border-border/60 pt-14 scroll-mt-28",
            )}
          >
            <h2 className={viagemDetailSectionTitleClass}>{section.title}</h2>
            <div className="mt-6 max-w-2xl space-y-4">
              {section.subtitle.split(/\n{2,}/).map((paragraph) => (
                <p key={`${section.id}-${paragraph.slice(0, 32)}`} className={sectionBodyClass}>
                  {paragraph}
                </p>
              ))}
            </div>
            {section.imageUrl ? (
              <div className="mt-8 max-w-2xl overflow-hidden rounded-2xl">
                <img
                  src={section.imageUrl}
                  alt={section.title}
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
            ) : null}
            {section.hasButton && section.buttonLabel && section.buttonUrl ? (
              <div className="mt-8 flex justify-start">
                <Link
                  href={section.buttonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-[0_12px_36px_rgba(30,196,180,0.28)] transition-colors hover:bg-[#1ad4c3]"
                >
                  {section.buttonLabel}
                </Link>
              </div>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}
