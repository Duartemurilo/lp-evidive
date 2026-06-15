import { CURSO_CAPA_HERO_SLIDESHOW } from "@/lib/cursos-capa-images";

export const cursosConfig = {
  hero: {
    badge: "Gateway Experience · Evidive",
    headline: {
      line1: "Onde a exploração",
      line2: "se torna realidade.",
    },
    subheadline:
      "Na Evidive, o mergulho não é apenas um esporte — é um passaporte para um novo mundo. Duas portas de entrada. Duas intensidades. Um único impacto.",
    cta: {
      text: "Quero Iniciar Minha Formação",
      href: "#cursos-catalog",
    },
    backgroundImages: CURSO_CAPA_HERO_SLIDESHOW,
    backgroundImage: CURSO_CAPA_HERO_SLIDESHOW[0]!,
  },
  presence: {
    titleLine1: "Sua jornada",
    titleLine2Sans: "começa ",
    titleLine2Display: "aqui.",
  },
  depthTransition: {
    id: "cursos-profundidade",
    rulerIcon: "compass",
    rulerLabel: "escolha seu caminho",
    depthMeters: 12,
    eyebrow: "Profundidade",
  },
  catalog: {
    sectionId: "cursos-catalog",
    headingSans: "Encontre seu próximo ",
    headingDisplay: "curso",
  },
} as const;
