/**
 * Títulos — seções 1–3 (hero, jornada, universo) compartilham o mesmo scale.
 * Demais seções usam `sectionTitleBase`.
 * Primeira parte: sans média; destaque: display itálico (~8% maior).
 */
export const heroTitleBase =
  "text-[clamp(2.5rem,5.8vw,4.5rem)] leading-[1.02]";

export const sectionTitleLargeBase =
  "text-[clamp(2.5rem,5.8vw,4.5rem)] leading-[1.02]";

export const sectionTitleBase =
  "text-[clamp(2rem,4.8vw,3.35rem)] leading-[1.02]";

export const sectionTitleSans =
  "font-sans text-[0.72em] font-medium tracking-[0.01em]";

export const sectionTitleDisplay =
  "font-display text-[1.08em] font-bold italic tracking-[-0.04em]";

/** Destaque inline na segunda dobra (mesmo scale do sans, só troca a família). */
export const subpagePresenceTitleDisplay =
  "font-display text-[0.72em] font-bold italic tracking-[-0.03em]";

/** Destaque inline dentro da linha sans (1em do bloco — evita `em` aninhado menor). */
export const subpagePresenceTitleDisplayInline =
  "font-display text-[1em] font-bold italic tracking-[-0.03em]";

/** Destaque de título em fundo claro (tom escuro da marca, como “Como vai funcionar”). */
export const sectionTitleAccentOnLight = "text-foreground";

/** Ondinhas abaixo do eyebrow em fundo claro (mesmo tom que o destaque do título). */
export const sectionWaveWrapOnLight = "text-foreground";

/** Rótulo acima do título (ex.: “Concept Dive Center”, “O ecossistema completo”) */
export const sectionEyebrow =
  "text-sm font-semibold uppercase tracking-[0.28em] sm:text-base";

/** Hero raiz — padrão tipográfico (home, Freedive, Divemaster). */
export const heroContentWidth = "max-w-[min(100%,52rem)]";

export const heroEyebrowColor = "text-white/70";

export const heroWaveWrapClass = "mb-6 mt-4 text-primary sm:mb-7 sm:mt-5";

export const heroTitleWrapperClass = `mx-auto mb-6 ${heroTitleBase} sm:mb-7`;

export const heroTitleLineClass = `block ${sectionTitleSans} text-white`;

export const heroTitleAccentClass = `${sectionTitleDisplay} text-primary`;

export const heroSubtitleWrapperClass =
  "mx-auto mb-10 text-[clamp(0.82rem,2.2vw,1.05rem)] leading-relaxed text-white/82 sm:mb-11";

export const heroCtaPrimaryClass =
  "font-display group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_12px_36px_rgba(30,196,180,0.38)] transition-all duration-300 hover:bg-[#1ad4c3] hover:shadow-[0_16px_44px_rgba(30,196,180,0.45)] sm:w-auto";

export const heroCtaSecondaryClass =
  "inline-flex w-full items-center justify-center rounded-full border border-white/35 bg-white/10 px-7 py-3.5 text-[0.95rem] font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/50 hover:bg-white/18 sm:w-auto";

export const heroCtaIconWrapClass =
  "flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:scale-105";

/** Títulos de seção em páginas de viagem (fundo claro — tom escuro da marca). */
export const viagemDetailSectionTitleClass =
  "font-display text-[clamp(1.35rem,3vw,1.85rem)] font-bold italic tracking-[-0.03em] text-foreground";

export const viagemDetailSectionTitleMdClass =
  "font-display text-[clamp(1.25rem,2.8vw,1.65rem)] font-bold text-foreground";

export const viagemDetailSectionTitleSmClass =
  "font-display text-[clamp(1.25rem,2.6vw,1.55rem)] font-bold text-foreground";
