"use client";

import { ViagensTripCard } from "@/components/viagens/catalog/viagens-trip-card";
import { SectionTitle } from "@/components/section-title";
import type {
  ViagemTripPackageSection,
  ViagemTripPageContent,
} from "@/lib/types/viagem-trip-page";
import type { Viagem } from "@/lib/types/viagens";
import {
  sectionTitleAccentOnLight,
  viagemDetailSectionTitleClass,
  viagemDetailSectionTitleMdClass,
  viagemDetailSectionTitleSmClass,
} from "@/lib/typography";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

function ContentBlock({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}): ReactNode {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

function ProseParagraphs({ paragraphs }: { paragraphs: readonly string[] }): ReactNode {
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph.slice(0, 48)}
          className="text-[0.98rem] leading-[1.75] text-foreground/88 md:text-base"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function PageCta({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}): ReactNode {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-center text-sm font-semibold text-white shadow-[0_12px_36px_rgba(30,196,180,0.28)] transition-colors hover:bg-[#1ad4c3]",
        className,
      )}
    >
      {label}
    </Link>
  );
}

function buildWhatsAppUrlFromPageContent(content: ViagemTripPageContent): string {
  return buildWhatsAppUrl(
    [
      `Olá! Vi o destino ${content.title} no site da Evidive e gostaria de saber mais sobre a viagem de mergulho.`,
      "",
      "Podem me enviar valores, o que está incluso e as próximas datas disponíveis?",
    ].join("\n"),
  );
}

function WhatsAppCta({
  content,
  label,
  className,
  hrefOverride,
}: {
  content: ViagemTripPageContent;
  label: string;
  className?: string;
  hrefOverride?: string;
}): ReactNode {
  const href = hrefOverride ?? buildWhatsAppUrlFromPageContent(content);

  if (!href) return null;

  return (
    <PageCta
      href={href}
      label={label}
      {...(className ? { className } : {})}
    />
  );
}

function CheckList({
  items,
  variant,
}: {
  items: readonly string[];
  variant: "included" | "excluded";
}): ReactNode {
  const Icon = variant === "included" ? Check : X;
  const iconClass =
    variant === "included" ? "text-primary" : "text-muted-foreground/70";

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-foreground/88">
          <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconClass)} aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PackageSection({ pkg }: { pkg: ViagemTripPackageSection }): ReactNode {
  return (
    <ContentBlock
      id={pkg.id}
      className="mt-14 scroll-mt-28 border-t border-border/60 pt-14"
    >
      <h2 className={viagemDetailSectionTitleClass}>{pkg.title}</h2>
      {pkg.locationLabel ? (
        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {pkg.locationLabel}
        </p>
      ) : null}
      {pkg.intro ? (
        <p className="mt-6 text-[0.98rem] leading-relaxed text-foreground/88">{pkg.intro}</p>
      ) : null}
      {pkg.included.length > 0 ? (
        <div className={pkg.intro ? "mt-8" : "mt-6"}>
          <CheckList items={pkg.included} variant="included" />
        </div>
      ) : null}
      {pkg.priceLabel ? (
        <p className="mt-8 font-display text-2xl font-bold text-primary">{pkg.priceLabel}</p>
      ) : null}
      {pkg.priceNote ? (
        <p className="mt-1 text-sm text-muted-foreground">{pkg.priceNote}</p>
      ) : null}
      {pkg.excluded && pkg.excluded.length > 0 ? (
        <>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-foreground/75">
            {pkg.excludedTitle ?? "Não incluso"}
          </p>
          <div className="mt-4">
            <CheckList items={pkg.excluded} variant="excluded" />
          </div>
        </>
      ) : null}
    </ContentBlock>
  );
}

type ViagemDetailContentProps = {
  content: ViagemTripPageContent;
  previewCtaHref?: string | null;
  showRelatedTrips?: boolean;
  relatedTrips?: readonly Viagem[];
};

export function ViagemDetailContent({
  content,
  previewCtaHref,
  showRelatedTrips = true,
  relatedTrips = [],
}: ViagemDetailContentProps): ReactNode {
  const ctaHref = previewCtaHref?.trim() || content.intro.ctaHref;
  const visibleRelatedTrips = showRelatedTrips ? relatedTrips : [];

  const { package: pkg } = content;
  const packageAfterDives = pkg?.placement === "afterDives";
  const travelSection = content.travel ?? content.flight;

  return (
    <div className="bg-[#f7f2ec]">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <ContentBlock>
          <p className="font-display text-xl font-semibold leading-snug text-foreground md:text-2xl">
            {content.intro.lead}
          </p>
          <div className="mt-6">
            <ProseParagraphs paragraphs={content.intro.paragraphs} />
          </div>
          <Link
            href={ctaHref}
            className="mt-8 inline-flex text-sm font-semibold uppercase tracking-[0.14em] text-primary underline-offset-4 hover:underline"
          >
            {content.intro.ctaLabel}
          </Link>
        </ContentBlock>

        {content.highlight ? (
          <ContentBlock className="mt-14 border-t border-border/60 pt-14">
            <h2 className={viagemDetailSectionTitleClass}>{content.highlight.title}</h2>
            <div className="mt-6">
              <ProseParagraphs paragraphs={content.highlight.paragraphs} />
            </div>
          </ContentBlock>
        ) : null}

        {content.whyDive ? (
          <ContentBlock className="mt-14 border-t border-border/60 pt-14">
            <h2 className={viagemDetailSectionTitleClass}>{content.whyDive.title}</h2>
            {content.whyDive.subtitle ? (
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                {content.whyDive.subtitle}
              </p>
            ) : null}
            <div className="mt-6">
              <ProseParagraphs paragraphs={content.whyDive.paragraphs} />
            </div>
            {content.whyDive.whatsappCta ? (
              <WhatsAppCta
                content={content}
                label={content.whyDive.whatsappCta}
                className="mt-8"
                {...(previewCtaHref?.trim() ? { hrefOverride: previewCtaHref.trim() } : {})}
              />
            ) : null}
          </ContentBlock>
        ) : null}

        {content.audiences ? (
          <ContentBlock
            {...(content.audiences.id ? { id: content.audiences.id } : {})}
            className="mt-14 scroll-mt-28 border-t border-border/60 pt-14"
          >
            <h2 className={viagemDetailSectionTitleMdClass}>{content.audiences.title}</h2>
            <div className="mt-8 grid gap-6">
              {content.audiences.items.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-border/50 bg-white/80 p-6 shadow-[0_8px_28px_rgba(8,32,42,0.06)]"
                >
                  <h3 className="font-display text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-foreground/85">
                    {item.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            {content.audiences.whatsappCta ? (
              <WhatsAppCta
                content={content}
                label={content.audiences.whatsappCta}
                className="mt-8"
                {...(previewCtaHref?.trim() ? { hrefOverride: previewCtaHref.trim() } : {})}
              />
            ) : null}
          </ContentBlock>
        ) : null}

        {pkg && !packageAfterDives ? <PackageSection pkg={pkg} /> : null}

        {content.important ? (
          <ContentBlock className="mt-14 border-t border-border/60 pt-14">
            <h2 className={viagemDetailSectionTitleSmClass}>{content.important.title}</h2>
            <ul className="mt-6 space-y-3">
              {content.important.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-[0.95rem] leading-relaxed text-foreground/88"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </ContentBlock>
        ) : null}

        {travelSection ? (
          <ContentBlock className="mt-14 border-t border-border/60 pt-14">
            <h2 className={viagemDetailSectionTitleSmClass}>{travelSection.title}</h2>
            <div className="mt-6">
              <ProseParagraphs paragraphs={travelSection.paragraphs} />
            </div>
            {travelSection.footnotes && travelSection.footnotes.length > 0 ? (
              <ul className="mt-6 space-y-2 text-sm leading-relaxed text-muted-foreground">
                {travelSection.footnotes.map((note) => (
                  <li key={note}>* {note}</li>
                ))}
              </ul>
            ) : null}
          </ContentBlock>
        ) : null}

        {content.accommodation ? (
          <ContentBlock className="mt-14 border-t border-border/60 pt-14">
            <h2 className={viagemDetailSectionTitleSmClass}>{content.accommodation.title}</h2>
            {content.accommodation.subtitle ? (
              <p className="mt-3 font-display text-lg font-semibold text-primary">
                {content.accommodation.subtitle}
              </p>
            ) : null}
            <div className="mt-6">
              <ProseParagraphs paragraphs={content.accommodation.paragraphs} />
            </div>
            {content.accommodation.included && content.accommodation.included.length > 0 ? (
              <>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-foreground/75">
                  {content.accommodation.includedLabel ?? "O pacote inclui"}
                </p>
                <div className="mt-4">
                  <CheckList items={content.accommodation.included} variant="included" />
                </div>
              </>
            ) : null}
          </ContentBlock>
        ) : null}

        {content.dives ? (
          <ContentBlock className="mt-14 border-t border-border/60 pt-14">
            <h2 className={viagemDetailSectionTitleSmClass}>{content.dives.title}</h2>
            <div className="mt-6">
              <ProseParagraphs paragraphs={content.dives.paragraphs} />
            </div>
            {content.dives.included && content.dives.included.length > 0 ? (
              <div className="mt-8">
                <CheckList items={content.dives.included} variant="included" />
              </div>
            ) : null}
            {content.dives.schedule && content.dives.schedule.length > 0 ? (
              <dl className="mt-8 space-y-5">
                {content.dives.schedule.map((item) => (
                  <div
                    key={item.day}
                    className="rounded-xl border border-border/50 bg-white/70 px-5 py-4"
                  >
                    <dt className="font-display text-base font-bold text-foreground">
                      {item.day}
                    </dt>
                    <dd className="mt-2 text-[0.95rem] leading-relaxed text-foreground/85">
                      {item.description}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {content.dives.priceNote ? (
              <p className="mt-6 text-sm font-medium text-muted-foreground">
                {content.dives.priceNote}
              </p>
            ) : null}
          </ContentBlock>
        ) : null}

        {pkg && packageAfterDives ? <PackageSection pkg={pkg} /> : null}
      </div>

      {visibleRelatedTrips.length > 0 ? (
        <section
          aria-labelledby="viagem-related-heading"
          className="border-t border-border/50 bg-background px-6 py-16 md:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <SectionTitle
              id="viagem-related-heading"
              sans="Veja outros destinos "
              display="de mergulho com a Evidive"
              sansClassName={sectionTitleAccentOnLight}
              displayClassName="text-primary"
            />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleRelatedTrips.map((trip) => (
                <ViagensTripCard key={trip.id} trip={trip} />
              ))}
            </div>
            <p className="mt-8">
              <Link
                href="/viagens"
                className="text-sm font-semibold uppercase tracking-[0.14em] text-primary hover:underline"
              >
                Ver todos os destinos
              </Link>
            </p>
          </div>
        </section>
      ) : null}
    </div>
  );
}
