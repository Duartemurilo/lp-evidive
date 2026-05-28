export type CursoCtaVariant = "primary" | "schedule";

export type CursoCta = {
  label: string;
  href: string;
  external?: boolean;
  /** `schedule` — botão escuro da seção Primeiro Mergulho (home). */
  variant?: CursoCtaVariant;
};

export type CursoHeroContent = {
  logoSrc?: string;
  lead: string;
  leadHighlight?: string;
  supporting: string;
  cta: CursoCta;
};

export type CursoYoutubeVideo = {
  videoId: string;
  title: string;
};

export type CursoDepthRulerIcon = "wind" | "anchor" | "waves";

export type CursoDepthDividerBlock = {
  type: "depth-divider";
  id?: string;
  rulerLabel: string;
  rulerIcon?: CursoDepthRulerIcon;
  depthMeters?: number;
  surface?: "default" | "sand";
};

export type CursoSplitMediaBlock = {
  type: "split-media";
  id?: string;
  eyebrow?: string;
  titleSans: string;
  titleDisplay?: string;
  paragraphs: readonly string[];
  video?: CursoYoutubeVideo;
  cta?: CursoCta;
  mediaPosition: "left" | "right";
  surface?: "default" | "sand";
  /** Coluna única com texto centralizado (ex.: bloco só de copy, sem vídeo). */
  layout?: "split" | "centered";
};

export type CursoIllustrationLayout = "split" | "stacked";

export type CursoIllustrationBlock = {
  type: "illustration";
  id?: string;
  title?: string;
  titleDisplay?: string;
  eyebrow?: string;
  /** `stacked` — painel escuro (tom de “O ecossistema”), imagem em cima e texto centralizado. */
  layout?: CursoIllustrationLayout;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  illustrationSrc?: string;
  illustrationAlt?: string;
  cta?: CursoCta;
  surface?: "default" | "sand" | "dark";
};

export type CursoCopyBlock = {
  type: "copy";
  id?: string;
  eyebrow?: string;
  title?: string;
  titleSans?: string;
  titleDisplay?: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  cta?: CursoCta;
  surface?: "default" | "sand";
};

export type CursoSectionRuleBlock = {
  type: "section-rule";
  id?: string;
};

export type CursoIconCard = {
  iconSrc: string;
  iconAlt?: string;
  title: string;
  description: string;
  bullets?: readonly string[];
};

/** Cards horizontais (layout Primeiro Mergulho) com ícone no lugar da foto. */
export type CursoIconCardsBlock = {
  type: "icon-cards";
  id?: string;
  eyebrow?: string;
  titleSans: string;
  titleDisplay?: string;
  intro?: string;
  cards: readonly CursoIconCard[];
  cta?: CursoCta;
  surface?: "default" | "sand";
};

export type CursoStepsBlock = {
  type: "steps";
  id?: string;
  eyebrow?: string;
  /** Parte regular do título (sans). */
  title: string;
  /** Destaque em display (ex.: “Emotion Dive”). */
  titleDisplay?: string;
  subtitle?: string;
  steps: readonly {
    stepNumber: string;
    title: string;
    description: string;
    duration?: string;
    highlights?: readonly string[];
  }[];
  cta?: CursoCta;
  /** Linha fina abaixo da seção (evita bloco separado). */
  trailingFineRule?: boolean;
};

export type CursoPadiBlock = {
  type: "padi";
  id?: string;
  title: string;
  subtitle: string;
  paragraphs: readonly string[];
  illustrationSrc: string;
  illustrationAlt?: string;
  cta: CursoCta;
};

export type CursoTestimonial = {
  image: string;
  imageAlt?: string;
  /** Print do depoimento — card só com imagem. */
  imageOnly?: boolean;
  name?: string;
  role?: string;
  quote?: string;
};

export type CursoTestimonialsBlock = {
  type: "testimonials";
  id?: string;
  eyebrow?: string;
  title?: string;
  titleSans?: string;
  titleDisplay?: string;
  items: readonly CursoTestimonial[];
};

export type CursoIncludedBlock = {
  type: "included";
  id?: string;
  title: string;
  intro?: string;
  items: readonly string[];
  footer?: string;
};

export type CursoGiftBlock = {
  type: "gift";
  id?: string;
  title: string;
  paragraphs: readonly string[];
};

export type CursoPricingBlock = {
  type: "pricing";
  id?: string;
  title: string;
  installmentLabel: string;
  cashLabel: string;
  cta: CursoCta;
  footnote: string;
};

export type CursoFaqItem = {
  question: string;
  answer: string;
};

export type CursoFaqBlock = {
  type: "faq";
  id?: string;
  eyebrow: string;
  title: string;
  closing?: string;
  items: readonly CursoFaqItem[];
};

export type CursoPresenceDividerBlock = {
  type: "presence-divider";
  line1: string;
  line2Sans: string;
  line2Display: string;
  rulerLabel: string;
  depthMeters?: number;
};

export type CursoContentBlock =
  | CursoSplitMediaBlock
  | CursoDepthDividerBlock
  | CursoIllustrationBlock
  | CursoCopyBlock
  | CursoSectionRuleBlock
  | CursoIconCardsBlock
  | CursoStepsBlock
  | CursoPadiBlock
  | CursoTestimonialsBlock
  | CursoIncludedBlock
  | CursoGiftBlock
  | CursoPricingBlock
  | CursoFaqBlock
  | CursoPresenceDividerBlock;

export type CursoPageAccent = "primary" | "foreground";

export type CursoPageContent = {
  slug: string;
  title: string;
  categoryLabel: string;
  metaDescription: string;
  /** `primary` — destaques e timeline no verde da marca (#1ec4b4). Padrão: tom escuro (`foreground`). */
  themeAccent?: CursoPageAccent;
  hero: CursoHeroContent;
  blocks: readonly CursoContentBlock[];
};

export function isCursoPageWithBlocks(
  content: CursoPageContent | CursoPageStub,
): content is CursoPageContent {
  return "blocks" in content && content.blocks.length > 0;
}

/** Metadados mínimos quando o curso ainda não tem página completa. */
export type CursoPageStub = {
  slug: string;
  title: string;
  categoryLabel: string;
  subtitle?: string;
  metaDescription: string;
};
