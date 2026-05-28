import { LegalDocumentTocMobile } from "@/components/legal/legal-document-toc-mobile";
import { SectionEyebrow } from "@/components/section-eyebrow";
import { SectionTitle } from "@/components/section-title";
import { WaveDivider } from "@/components/wave-divider";
import type { LegalSection } from "@/lib/politica-privacidade-content";
import { sectionEyebrow, sectionWaveWrapOnLight } from "@/lib/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

type LegalDocumentPageProps = {
  title: string;
  display?: string;
  updatedAt?: string;
  sections: LegalSection[];
};

function LegalParagraphs({ paragraphs }: { paragraphs: string[] }): ReactNode {
  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-[0.98rem] leading-[1.75] text-foreground/88"
        >
          {paragraph}
        </p>
      ))}
    </>
  );
}

function LegalSectionBlock({ section }: { section: LegalSection }): ReactNode {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="scroll-mt-28 border-t border-border/70 pt-10 first:border-t-0 first:pt-0"
    >
      <h2
        id={`${section.id}-heading`}
        className="font-sans text-[clamp(1.35rem,3vw,1.75rem)] font-bold tracking-[-0.02em] text-foreground"
      >
        {section.title}
      </h2>

      {section.paragraphs?.length ? (
        <div className="mt-5 space-y-4">
          <LegalParagraphs paragraphs={section.paragraphs} />
        </div>
      ) : null}

      {section.subsections?.map((subsection) => (
        <div key={subsection.title} className="mt-8">
          <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {subsection.title}
          </h3>
          <div className="mt-4 space-y-4">
            <LegalParagraphs paragraphs={subsection.paragraphs} />
          </div>
        </div>
      ))}
    </section>
  );
}

export function LegalDocumentPage({
  title,
  display,
  updatedAt,
  sections,
}: LegalDocumentPageProps): ReactNode {
  const toc = sections.map((section) => ({
    id: section.id,
    label: section.title,
  }));

  return (
    <main
      id="main-content"
      className="relative flex-1 bg-[#f7f2ec] pb-24 pt-[calc(var(--header-offset,5.5rem)+2rem)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-background to-[#f7f2ec]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow className="text-muted-foreground">Institucional</SectionEyebrow>
          <div className={cn("mt-4 flex justify-center", sectionWaveWrapOnLight)}>
            <WaveDivider className="h-2.5 w-[min(10rem,36vw)]" />
          </div>
          <SectionTitle
            as="h1"
            sans={title}
            {...(display
              ? {
                  display,
                  displayClassName: "text-primary",
                }
              : {})}
            className="mt-5 text-foreground"
            sansClassName="text-foreground"
            size="large"
          />
          {updatedAt ? (
            <p className={cn(sectionEyebrow, "mt-6 text-muted-foreground/90")}>
              Atualizado em {updatedAt}
            </p>
          ) : null}
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,13.5rem)_minmax(0,1fr)] lg:gap-14">
          <nav
            aria-label="Índice do documento"
            className="hidden lg:sticky lg:block lg:top-28 lg:self-start"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground sm:text-sm">
              Neste documento
            </p>
            <ol className="space-y-3 border-l border-border/80 pl-4">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="block text-base leading-snug text-foreground/75 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
            <Link
              href="/"
              className="mt-8 inline-flex text-base font-medium text-foreground/70 underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Voltar ao início
            </Link>
          </nav>

          <div className="min-w-0">
            <LegalDocumentTocMobile items={toc} />
            <article
              className="rounded-3xl border border-border/60 bg-background/75 px-6 py-10 shadow-[0_24px_64px_rgba(34,93,109,0.06)] backdrop-blur-sm md:px-10 md:py-12 lg:px-12"
              aria-label={title}
            >
              <div className="space-y-10">
                {sections.map((section) => (
                  <LegalSectionBlock key={section.id} section={section} />
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>
  );
}
