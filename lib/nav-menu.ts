import { cursosPagePath } from "@/lib/cursos-routes";
import { emotionDiveConfig, finalCtaConfig } from "@/lib/config";
import { especializacoesSectionHref } from "@/lib/especializacoes-courses";

export type NavMenuLink = {
  label: string;
  href: string;
  badge?: string | null;
  external?: boolean;
};

export type NavMenuGroup = {
  label: string;
  links: NavMenuLink[];
};

export type NavMenuCard = {
  id: string;
  title: string;
  links?: NavMenuLink[];
  groups?: NavMenuGroup[];
  variant?: "contact" | "default";
};

export const headerMenuCards: NavMenuCard[] = [
  {
    id: "experiencias",
    title: "Experiências",
    links: [
      { label: "Primeiro mergulho", href: "/#primeiro-mergulho" },
      { label: "Freedive", href: "/freedive" },
      { label: "Divemaster", href: "/divemaster" },
      { label: "Viagens", href: "/viagens" },
    ],
  },
  {
    id: "cursos",
    title: "Cursos",
    links: [
      { label: "Todos os cursos", href: cursosPagePath },
      { label: "Para iniciantes", href: "/#explore-mergulhadores" },
      { label: "Para quem já mergulha", href: `/${especializacoesSectionHref}` },
    ],
  },
  {
    id: "evidive",
    title: "Evidive",
    links: [{ label: "Carreira", href: "/divemaster" }],
    variant: "contact",
  },
];

export const headerMenuContact = {
  ctaLabel: "Falar com a Evidive",
  ctaHref: finalCtaConfig.cta.href,
  bookingLabel: "Agendar Emotion Dive",
  bookingHref: emotionDiveConfig.bookingUrl,
} as const;

export function isExternalNavHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

/** Grupos de links do footer — mesma fonte do menu do header. */
export const footerNavGroups = headerMenuCards.map((card) => ({
  title: card.title,
  links: [
    ...(card.links ?? []),
    ...(card.groups?.flatMap((group) => group.links) ?? []),
  ],
}));

export const footerLegalLinks: NavMenuLink[] = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
];
