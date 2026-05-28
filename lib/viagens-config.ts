import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const viagensWhatsAppMessages = {
  hero: "Olá! Vi a página de Viagens da Evidive e quero saber mais sobre destinos, datas e formatos de viagem. Podem me ajudar?",
  travel:
    "Olá! Quero viajar com a Evidive e gostaria de conhecer destinos, datas, acomodações e experiências disponíveis.",
  staff:
    "Olá! Tenho interesse em ser staff Evidive e gostaria de saber sobre oportunidades para acompanhar viagens e apoiar operações.",
} as const;

export function buildViagensWhatsAppUrl(
  message: (typeof viagensWhatsAppMessages)[keyof typeof viagensWhatsAppMessages],
): string {
  return buildWhatsAppUrl(message);
}

export const viagensConfig = {
  detailHero: {
    ctaLabel: "Saiba mais: incluído, preços e datas",
  },
  hero: {
    badge: "Viagens",
    headline: {
      line1: "Seu próximo mergulho pode estar",
      line2: "do outro lado do mundo",
    },
    subheadline:
      "Viaje com a Evidive para destinos selecionados, com operação, logística e experiência pensadas para quem quer mergulhar melhor, com mais segurança e mais profundidade.",
    cta: {
      text: "Quero viajar com a Evidive",
      href: buildViagensWhatsAppUrl(viagensWhatsAppMessages.hero),
    },
    backgroundImage: "/backgrounds/hero-viagens-destino-mergulho-evidive.png",
  },
  universe: {
    id: "viagens-universo",
    eyebrow: "Viagens Evidive",
    titleSans: "Como você quer ",
    titleDisplay: "viver esse universo?",
    options: [
      {
        id: "viajar",
        title: "Quero viajar com a Evidive",
        description:
          "Explore destinos, datas, formatos de viagem, acomodações e experiências operadas pela Evidive.",
        cta: {
          text: "Ver viagens",
          label: "Ver viagens",
          href: "#viagens-catalog",
        },
        icon: "plane",
      },
      {
        id: "staff",
        title: "Quero ser staff Evidive",
        description:
          "Conheça caminhos para acompanhar viagens, apoiar operações, integrar staff e crescer dentro do ecossistema profissional da Evidive.",
        cta: {
          text: "Quero ser staff",
          label: "Staff",
          href: buildViagensWhatsAppUrl(viagensWhatsAppMessages.staff),
        },
        icon: "users",
      },
    ],
  },
  experienceTypes: {
    id: "viagens-formatos",
    eyebrow: "Formatos de viagem",
    titleSans: "Cada viagem tem um jeito",
    titleDisplay: "de ser vivida.",
    items: [
      {
        number: "01",
        title: "Viagens de grupo",
        description:
          "Grupos curados, pessoas que compartilham a mesma paixão.",
        image: "/assets/hero/POSTS_EVIDIVE (7).png",
      },
      {
        number: "02",
        title: "Expedições",
        description:
          "Itinerários exclusivos em destinos de alta biodiversidade.",
        image: "/assets/hero/G0025436.JPG.png",
      },
      {
        number: "03",
        title: "Liveaboards",
        description: "Embarque, mergulhe, durma, repita. A experiência total.",
        image: "/backgrounds/dive-section-deep-underwater-bg.png",
      },
      {
        number: "04",
        title: "Fotografia subaquática",
        description:
          "Destinos ideais para quem quer registrar o fundo do mar.",
        image: "/assets/hero/DCIM_101GOPRO_GOPR5892.JPG.png",
      },
      {
        number: "05",
        title: "Evolução técnica",
        description:
          "Viagens que combinam destino com formação e aprofundamento.",
        image: "/assets/hero/DCIM_100GOPRO_GOPR3378.JPG.png",
      },
      {
        number: "06",
        title: "Experiências premium",
        description: "Operação completa, estrutura diferenciada, conforto.",
        image: "/assets/hero/POSTS_EVIDIVE (8).png",
      },
    ],
  },
  operation: {
    id: "viagens-operacao",
    eyebrow: "Operação Evidive",
    titleSans: "Mais do que uma viagem. ",
    titleDisplay: "Uma operação pensada para mergulhadores.",
    subtitle:
      "Cada detalhe é planejado para que você mergulhe com tranquilidade, segurança e a melhor experiência possível.",
    items: [
      {
        number: "01",
        title: "Curadoria de destino",
        description:
          "Cada destino é escolhido por critérios de qualidade, segurança e experiência.",
      },
      {
        number: "02",
        title: "Logística orientada",
        description:
          "Roteiro, deslocamento, equipamento e briefings organizados.",
      },
      {
        number: "03",
        title: "Operação de mergulho",
        description:
          "Mergulhos conduzidos por profissionais com plano de imersão.",
      },
      {
        number: "04",
        title: "Hospedagem e estrutura",
        description:
          "Acomodações selecionadas com foco em conforto e conveniência.",
      },
      {
        number: "05",
        title: "Staff e acompanhamento",
        description: "Equipe Evidive presente do embarque ao retorno.",
      },
      {
        number: "06",
        title: "Grupo e comunidade",
        description: "Grupos pequenos, vínculos reais, memórias compartilhadas.",
      },
      {
        number: "07",
        title: "Suporte completo",
        description: "Suporte antes, durante e depois da viagem.",
      },
    ],
  },
  communityGallery: {
    id: "viagens-comunidade",
    eyebrow: "Depois da viagem",
    titleSans: "Destinos reais, grupos reais,",
    titleDisplay: "experiências que continuam depois da viagem.",
    images: [
      { src: "/assets/hero/POSTS_EVIDIVE (7).png", alt: "Grupo de mergulhadores em viagem" },
      { src: "/assets/hero/G0025436.JPG.png", alt: "Destino costeiro" },
      { src: "/assets/hero/DCIM_101GOPRO_GOPR5892.JPG.png", alt: "Mergulho em grupo" },
      { src: "/assets/hero/POSTS_EVIDIVE (4).png", alt: "Experiência no mar" },
      { src: "/assets/hero/POSTS_EVIDIVE (8).png", alt: "Comunidade Evidive" },
      { src: "/backgrounds/dive-section-deep-underwater-bg.png", alt: "Mergulho em destino internacional" },
    ],
  },
} as const;

export function resolveViagemHeroImageUrl(imageUrl?: string | null): string {
  const custom = imageUrl?.trim();
  if (custom) return custom;
  return viagensConfig.hero.backgroundImage;
}
