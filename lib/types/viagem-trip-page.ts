export type ViagemTripAudience = {
  title: string;
  description: string;
  bullets: readonly string[];
};

export type ViagemTripPackageSection = {
  id: string;
  title: string;
  /** Onde renderizar na página; padrão: após público-alvo. */
  placement?: "afterAudiences" | "afterDives";
  locationLabel?: string;
  intro?: string;
  included: readonly string[];
  excluded?: readonly string[];
  excludedTitle?: string;
  priceLabel?: string;
  priceNote?: string;
};

export type ViagemTripTravelSection = {
  title: string;
  paragraphs: readonly string[];
  footnotes?: readonly string[];
};

export type ViagemTripAccommodationSection = {
  title: string;
  subtitle?: string;
  paragraphs: readonly string[];
  included?: readonly string[];
  includedLabel?: string;
};

export type ViagemTripScheduleDay = {
  day: string;
  description: string;
};

export type ViagemTripDivesSection = {
  title: string;
  paragraphs: readonly string[];
  included?: readonly string[];
  schedule?: readonly ViagemTripScheduleDay[];
  priceNote?: string;
};

export type ViagemTripPageContent = {
  slug: string;
  title: string;
  scopeLabel: string;
  metaDescription: string;
  intro: {
    lead: string;
    paragraphs: readonly string[];
    ctaLabel: string;
    ctaHref: string;
  };
  highlight?: {
    title: string;
    paragraphs: readonly string[];
  };
  whyDive?: {
    title: string;
    subtitle?: string;
    paragraphs: readonly string[];
    whatsappCta?: string;
  };
  audiences?: {
    id?: string;
    title: string;
    items: readonly ViagemTripAudience[];
    whatsappCta?: string;
  };
  important?: {
    title: string;
    items: readonly string[];
  };
  package?: ViagemTripPackageSection;
  travel?: ViagemTripTravelSection;
  /** @deprecated Use `travel`. Mantido só para compatibilidade com dados antigos. */
  flight?: ViagemTripTravelSection;
  accommodation?: ViagemTripAccommodationSection;
  dives?: ViagemTripDivesSection;
  relatedTripSlugs: readonly string[];
};
