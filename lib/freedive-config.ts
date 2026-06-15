import { buildWhatsAppUrl } from "@/lib/whatsapp";

/** Mensagens pré-preenchidas por ponto de conversão (editar copy aqui). */
export const freediveWhatsAppMessages = {
  hero:
    "Olá! Vi a página de Freedive da Evidive e quero saber mais sobre o curso. Podem me ajudar com turmas, valores e como começar?",
  nivel1:
    "Olá! Quero começar no mergulho livre e tenho interesse no Freedive Nível 1 (básico) da Evidive. Podem me passar datas, valores e o que preciso para a primeira aula?",
  nivel2:
    "Olá! Quero evoluir no Freedive e me interesso pelo Nível 2 (avançado) da Evidive. Podem me orientar sobre pré-requisitos, turmas e valores?",
} as const;

export function buildFreediveWhatsAppUrl(
  message: (typeof freediveWhatsAppMessages)[keyof typeof freediveWhatsAppMessages],
): string {
  return buildWhatsAppUrl(message);
}

export const freediveConfig = {
  hero: {
    badge: "Freedive",
    headline: {
      line1: "Uma outra forma de",
      line2: "entrar na água",
    },
    subheadline:
      "Respiração, presença, técnica e profundidade para quem quer viver o mergulho de um jeito mais silencioso, corporal e essencial.",
    cta: {
      text: "Quero fazer o curso de freediver",
      href: buildFreediveWhatsAppUrl(freediveWhatsAppMessages.hero),
    },
    backgroundImage:
      "/cursos-evi/Cursos/Flutuabilidade/curso_flutuabilidade_capa.jpg",
  },
  presence: {
    titleLine1: "No Freedive, ",
    titleLine2Sans: "menos equipamento significa ",
    titleLine2Display: "mais presença",
  },
  depthTransition: {
    id: "freedive-profundidade",
    rulerIcon: "wind",
    rulerLabel: "só o seu fôlego",
    depthMeters: 20,
    eyebrow: "Profundidade",
    headline: "mais abaixo.",
  },
  intro: {
    eyebrow: "O mergulho livre",
    titleSans: "O que é",
    titleDisplay: "Freedive",
    paragraphs: [
      "O Freedive é o mergulho sem cilindro, baseado em técnicas de apneia, respiração, relaxamento e controle corporal.",
      "Na Evidive, essa modalidade é apresentada como experiência, técnica e evolução — para quem quer viver a água de um jeito diferente.",
    ],
    cards: [
      {
        title: "Mais consciência corporal",
        description:
          "Você passa a perceber melhor o corpo, a respiração e o movimento.",
        icon: "heart-pulse",
      },
      {
        title: "Mais presença",
        description:
          "A experiência na água se torna mais silenciosa, precisa e sensorial.",
        icon: "waves",
      },
      {
        title: "Mais controle",
        description:
          "Técnica e apneia se tornam parte da sua relação com o mergulho.",
        icon: "gauge",
      },
      {
        title: "Mais profundidade interna",
        description:
          "O Freedive é também uma forma de presença e conexão.",
        icon: "heart",
      },
    ],
  },
  profile: {
    id: "freedive-perfil",
    eyebrow: "Perfil",
    titleSans: "Para quem o Freedive ",
    titleDisplay: "faz sentido",
    items: [
      "Para quem quer viver a água de outro jeito.",
      "Para quem busca mais presença e consciência corporal.",
      "Para quem se interessa por apneia, respiração e controle.",
      "Para quem quer começar em uma modalidade diferente.",
      "Para quem quer evoluir dentro do mergulho livre.",
      "Para quem quer menos equipamento e mais conexão com a água.",
      "Para quem busca uma experiência mais silenciosa, corporal e essencial.",
    ],
  },
  courses: {
    id: "freedive-cursos",
    eyebrow: "Formação",
    title: "Cursos de Freedive",
    subtitle:
      "Do primeiro mergulho à evolução real. Escolha seu nível e transforme sua relação com o oceano.",
    cards: [
      {
        id: "nivel-1",
        label: "Nível 1",
        title: "Freedive básico",
        description:
          "Mergulhe sem cilindro e aprenda técnicas de apneia, respiração e adaptação em lago, mar e piscina.",
        tags: ["Apneia", "Respiração", "Águas confinadas"],
        cta: {
          text: "Quero começar no Freedive",
          href: buildFreediveWhatsAppUrl(freediveWhatsAppMessages.nivel1),
        },
        image:
          "/cursos-evi/Cursos/Flutuabilidade/curso_flutuabilidade_capa.jpg",
      },
      {
        id: "nivel-2",
        label: "Nível 2",
        title: "Freedive avançado",
        description:
          "Para quem quer evoluir com mais profundidade, técnica e repertório no mergulho livre.",
        tags: ["Mais profundidade", "Mais técnica", "Evolução"],
        cta: {
          text: "Quero evoluir no Freedive",
          href: buildFreediveWhatsAppUrl(freediveWhatsAppMessages.nivel2),
        },
        image:
          "/cursos-evi/Cursos/Flutuabilidade/curso_flutuabilidade_beneficios.png",
      },
    ],
  },
} as const;
