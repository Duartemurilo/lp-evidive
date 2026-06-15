import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const divemasterWhatsAppMessages = {
  heroPrimary:
    "Olá! Vi a página de Divemaster da Evidive e quero dar o próximo passo para virar profissional no mergulho. Podem me orientar sobre o programa, pré-requisitos e investimento?",
  fase1:
    "Olá! Quero iniciar minha jornada profissional e tenho interesse na Fase 1 do Divemaster na Evidive. Podem me passar datas, valores e pré-requisitos?",
  fase2:
    "Olá! Quero concluir minha formação Divemaster e tenho interesse na Fase 2 na Evidive. Podem me orientar sobre turmas, valores e o que preciso para avançar?",
  intro:
    "Olá! Quero fazer o Divemaster na Evidive. Podem me passar informações sobre o programa, pré-requisitos e próximas turmas?",
  careerInstructor:
    "Olá! Vi a página de Divemaster da Evidive e tenho interesse em me tornar instrutor(a) da própria Evidive. Podem me orientar sobre o caminho de formação, pré-requisitos, turmas e próximos passos?",
} as const;

export function buildDivemasterWhatsAppUrl(
  message: (typeof divemasterWhatsAppMessages)[keyof typeof divemasterWhatsAppMessages],
): string {
  return buildWhatsAppUrl(message);
}

export const divemasterConfig = {
  hero: {
    badge: "Divemaster",
    headline: {
      line1: "O primeiro passo para",
      line2: "virar profissional no mergulho",
    },
    subheadline:
      "Transforme sua experiência como mergulhador em liderança, supervisão, mentoria e presença real dentro do universo profissional do mergulho.",
    cta: {
      text: "Quero virar Divemaster",
      href: buildDivemasterWhatsAppUrl(divemasterWhatsAppMessages.heroPrimary),
    },
    backgroundImage:
      "/cursos-evi/Cursos/PADI Divemaster/curso_padi_divemaster_capa.jpeg",
  },
  presence: {
    titleLine1: "Chega um momento",
    titleLine2Mid: "em que mergulhar",
    titleLine2Sans: "deixa de ser ",
    titleLine2Display: "só sobre você",
  },
  depthTransition: {
    id: "divemaster-profundidade",
    rulerIcon: "anchor",
    rulerLabel: "rumo à carreira",
    depthMeters: 40,
    eyebrow: "Profundidade",
    headline: "profissional.",
  },
  intro: {
    eyebrow: "A formação profissional",
    titleSans: "O que você desenvolve no",
    titleDisplay: "Divemaster",
    subtitle:
      "Durante a formação, você constrói repertório técnico, postura profissional e visão de operação — com prática, supervisão e vivência real para liderar mergulhos com segurança e presença.",
    cta: {
      text: "Quero fazer o Divemaster",
      href: buildDivemasterWhatsAppUrl(divemasterWhatsAppMessages.intro),
    },
    cards: [
      {
        title: "Habilidades de liderança",
        description:
          "Conduzir grupos, comunicar com clareza e assumir responsabilidade na água com postura profissional.",
        icon: "users",
      },
      {
        title: "Domínio aquático e resistência",
        description:
          "Demonstração sólida de habilidades aquáticas e preparo físico para sustentar a formação e a operação.",
        icon: "waves",
      },
      {
        title: "Organização e resolução de problemas",
        description:
          "Planejar, coordenar e responder com calma a imprevistos — da logística ao que acontece no mergulho.",
        icon: "clipboard-list",
      },
      {
        title: "Treinamento prático",
        description:
          "Aplicar técnica em cenários reais de ensino, supervisão e acompanhamento de mergulhadores.",
        icon: "graduation-cap",
      },
      {
        title: "Vivência na operação real",
        description:
          "Experiência aplicada no dia a dia da formação, próxima de como você vai atuar como profissional.",
        icon: "compass",
      },
    ],
  },
  prerequisitesTransition: {
    id: "divemaster-transicao-pre-requisitos",
    rulerIcon: "list-checks",
    rulerLabel: "requisitos da formação",
    depthMeters: 45,
  },
  prerequisites: {
    id: "divemaster-pre-requisitos",
    eyebrow: "Pré-requisitos",
    titleSans: "Pré-requisitos para entrar ",
    titleDisplay: "nessa etapa",
    items: [
      {
        icon: "user",
        label: "Idade mínima",
        detail: "18 anos",
      },
      {
        icon: "award",
        label: "Curso Avançado de Mergulho",
        detail: "PADI ou similar",
      },
      {
        icon: "life-buoy",
        label: "Rescue Diver",
        detail: "PADI ou certificações equivalentes",
      },
      {
        icon: "waves",
        label: "Mergulhos registrados",
        detail: "Pelo menos 40",
      },
    ],
  },
  profile: {
    id: "divemaster-perfil",
    eyebrow: "Perfil",
    titleSans: "Para quem o Divemaster ",
    titleDisplay: "faz sentido",
    items: [
      "Para quem quer mais do que mergulhar",
      "Para quem quer virar profissional no mergulho.",
      "Para quem quer atuar mais perto da operação e da instrução.",
      "Para quem quer desenvolver liderança, mentoria e presença.",
      "Para quem quer transformar mergulho em caminho de vida.",
      "Para quem imagina uma carreira com alcance nacional e internacional.",
      "Para quem enxerga no mergulho mais do que um hobby.",
    ],
  },
  career: {
    id: "divemaster-carreira",
    backgroundImage: "/backgrounds/bg-carreira-mergulho-underwater.png",
    backgroundImageVersion: 2,
    eyebrow: "Carreira no mergulho",
    titleSans: "Uma carreira que atravessa ",
    titleAccent: "destinos,",
    titleSuffix: "operações e pessoas",
    paragraphs: [
      "O Divemaster é o primeiro passo real para transformar sua experiência como mergulhador em liderança, mentoria e presença profissional dentro do universo do mergulho.",
      "Aqui começa a transição entre viver o mergulho e ajudar outras pessoas a viverem essa experiência com segurança, técnica e confiança.",
    ],
    cta: {
      text: "Quero ser instrutor Evidive",
      href: buildDivemasterWhatsAppUrl(divemasterWhatsAppMessages.careerInstructor),
    },
    cards: [
      {
        title: "Liderança de grupos",
        description:
          "Conduza, apoie e supervisione experiências de mergulho.",
        icon: "users",
      },
      {
        title: "Apoio a instrutores",
        description:
          "Participe de cursos, aulas práticas e preparação de alunos.",
        icon: "presentation",
      },
      {
        title: "Operações e expedições",
        description:
          "Atue em escolas, barcos, viagens, temporadas e experiências guiadas.",
        icon: "ship",
      },
      {
        title: "Destinos e biomas",
        description:
          "Abra possibilidades em diferentes águas, paisagens e contextos.",
        icon: "leaf",
      },
      {
        title: "Caminho para instrutoria",
        description:
          "Dê o primeiro passo para quem deseja ensinar no mergulho.",
        icon: "graduation-cap",
      },
      {
        title: "Horizonte profissional",
        description:
          "Construa uma carreira conectada ao mergulho, à natureza e às pessoas.",
        icon: "globe",
      },
    ],
  },
  careerHorizons: {
    id: "divemaster-horizontes",
    eyebrow: "Horizonte profissional",
    titleSans: "Uma carreira que pode atravessar ",
    titleDisplay: "operações, destinos e biomas",
    paragraphs: [
      "Virar profissional no mergulho também significa abrir possibilidades de atuação em diferentes contextos, com novas paisagens, novas equipes e novas formas de viver essa profissão.",
      "O Divemaster é a primeira porta real para quem quer construir uma vida conectada ao mergulho com horizonte internacional, atuação em expedições, temporadas, escolas, operações e diferentes biomas ao redor do mundo.",
    ],
    pillars: [
      "Atuação em operações",
      "Expedições e temporadas",
      "Vida profissional no mergulho",
      "Carreira internacional",
      "Biomas e destinos diversos",
    ],
    cta: {
      text: "Conhecer destinos e viagens",
      href: "/viagens",
    },
  },
  courses: {
    id: "divemaster-cursos",
    eyebrow: "Formação",
    title: "Programa Divemaster",
    subtitle:
      "Uma jornada em duas fases para construir liderança, supervisão e repertório profissional dentro da água.",
    cards: [
      {
        id: "fase-1",
        label: "Fase 1",
        title: "Fundamentos profissionais",
        description:
          "Base prática para liderar mergulhos, apoiar formações e desenvolver postura profissional com supervisão real.",
        tags: ["Liderança", "Supervisão", "Mentoria"],
        cta: {
          text: "Quero iniciar a Fase 1",
          href: buildDivemasterWhatsAppUrl(divemasterWhatsAppMessages.fase1),
        },
        image:
          "/cursos-evi/Cursos/PADI Divemaster/curso_padi_divemaster_papel.png",
      },
      {
        id: "fase-2",
        label: "Fase 2",
        title: "Consolidação Divemaster",
        description:
          "Para quem quer concluir a formação com mais profundidade técnica, autonomia e preparo para atuar profissionalmente.",
        tags: ["Carreira", "Autonomia", "Evolução"],
        cta: {
          text: "Quero avançar para a Fase 2",
          href: buildDivemasterWhatsAppUrl(divemasterWhatsAppMessages.fase2),
        },
        image:
          "/cursos-evi/Cursos/PADI Divemaster/curso_padi_divemaster_beneficios.jpeg",
      },
    ],
  },
} as const;
