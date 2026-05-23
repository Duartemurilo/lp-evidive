import {
  Anchor,
  Globe,
  GraduationCap,
  Leaf,
  ShoppingBag,
  Sparkles,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";

export type JourneyTier = "entrada" | "exploracao" | "expansao";

export type UniverseModule = {
  id: string;
  title: string;
  shortDescription: string;
  detailTitle: string;
  detailBody: string;
  ctaLabel: string;
  href: string;
  icon: LucideIcon;
  tier: JourneyTier;
};

export const JOURNEY_TIERS: {
  id: JourneyTier;
  label: string;
}[] = [
  { id: "entrada", label: "Entrada" },
  { id: "exploracao", label: "Exploração" },
  { id: "expansao", label: "Expansão" },
];

export const UNIVERSE_MODULES: UniverseModule[] = [
  {
    id: "primeiro-mergulho",
    title: "Primeiro Mergulho",
    shortDescription:
      "Dê o primeiro passo com segurança e descubra o mundo subaquático.",
    detailTitle: "PRIMEIRO MERGULHO",
    detailBody:
      "Descubra o básico para entrar no mundo subaquático com tranquilidade. Conteúdo prático, suporte especializado e a segurança que você precisa.",
    ctaLabel: "Explorar Primeiro Mergulho",
    href: "#primeiro-mergulho",
    icon: Waves,
    tier: "entrada",
  },
  {
    id: "cursos",
    title: "Cursos",
    shortDescription:
      "Formação completa para evoluir com conhecimento e confiança.",
    detailTitle: "CURSOS",
    detailBody:
      "Trilhas de formação pensadas para cada nível, com instrutores experientes e certificação reconhecida no mercado.",
    ctaLabel: "Explorar Cursos",
    href: "#universo",
    icon: GraduationCap,
    tier: "entrada",
  },
  {
    id: "freedive",
    title: "Freedive",
    shortDescription: "Aprimore técnicas e explore seus limites com liberdade.",
    detailTitle: "FREEDIVE",
    detailBody:
      "Programas focados em respiração, técnica e performance para mergulhar com mais autonomia e presença.",
    ctaLabel: "Explorar Freedive",
    href: "#comunidade",
    icon: Anchor,
    tier: "exploracao",
  },
  {
    id: "sereismo",
    title: "Sereismo",
    shortDescription: "Conecte-se com sua essência e viva o mar de outro jeito.",
    detailTitle: "SEREISMO",
    detailBody:
      "Uma experiência dedicada à conexão feminina com o oceano, bem-estar e pertencimento em comunidade.",
    ctaLabel: "Explorar Sereismo",
    href: "#comunidade",
    icon: Sparkles,
    tier: "exploracao",
  },
  {
    id: "viagens",
    title: "Viagens",
    shortDescription: "Experiências transformadoras em destinos incríveis.",
    detailTitle: "VIAGENS",
    detailBody:
      "Roteiros imersivos que unem mergulho, cultura local e memórias inesquecíveis em destinos selecionados.",
    ctaLabel: "Explorar Viagens",
    href: "#destino",
    icon: Globe,
    tier: "exploracao",
  },
  {
    id: "carreira",
    title: "Carreira",
    shortDescription: "Construa sua trajetória e transforme paixão em profissão.",
    detailTitle: "CARREIRA",
    detailBody:
      "Mentorias, oportunidades e formação avançada para quem deseja viver do mergulho com propósito.",
    ctaLabel: "Explorar Carreira",
    href: "#universo",
    icon: Users,
    tier: "expansao",
  },
  {
    id: "loja",
    title: "Loja",
    shortDescription: "Equipamentos e acessórios para sua jornada no mar.",
    detailTitle: "LOJA",
    detailBody:
      "Curadoria de equipamentos e acessórios com orientação especializada para cada etapa da sua evolução.",
    ctaLabel: "Explorar Loja",
    href: "#chamada-final",
    icon: ShoppingBag,
    tier: "expansao",
  },
  {
    id: "impacto",
    title: "Impacto",
    shortDescription: "Ações que preservam o oceano e inspiram mudanças.",
    detailTitle: "IMPACTO",
    detailBody:
      "Iniciativas de conservação marinha e educação ambiental para mergulhar com responsabilidade.",
    ctaLabel: "Explorar Impacto",
    href: "#fundo",
    icon: Leaf,
    tier: "expansao",
  },
];

export const DEFAULT_MODULE_ID = "primeiro-mergulho";

export function getModuleById(id: string): UniverseModule {
  return (
    UNIVERSE_MODULES.find((module) => module.id === id) ??
    UNIVERSE_MODULES[0]!
  );
}

export function getModulesByTier(tier: JourneyTier): UniverseModule[] {
  return UNIVERSE_MODULES.filter((module) => module.tier === tier);
}
