import { nitroxCourseConfig } from "@/lib/config";
import type { CursoPageContent } from "@/lib/types/curso-page";

const infoCta = {
  label: "Saiba mais incluindo preços e datas",
  href: nitroxCourseConfig.infoWhatsAppUrl,
  external: true,
  variant: "schedule",
} as const;

const contactCta = {
  label: "Fale agora com nosso time sobre preços e datas",
  href: nitroxCourseConfig.contactWhatsAppUrl,
  external: true,
  variant: "schedule",
} as const;

export const nitroxPageContent: CursoPageContent = {
  slug: "nitrox",
  title: "NITROX",
  categoryLabel: "Já sou mergulhador",
  metaDescription:
    "Curso PADI Enriched Air Diver (NITROX) na Evidive: mergulho com ar enriquecido, certificação em 1 dia e material incluso no Concept Dive Center, São Paulo.",
  hero: {
    lead: "PADI ENRICHED AIR DIVER — NITROX",
    leadHighlight: "Curso NITROX",
    supporting:
      "Aumente o tempo de mergulho não descompressivo com ar enriquecido e fique mais tempo embaixo d'água.\n\nO curso Enriched Air Diver PADI permite mergulhar com ar enriquecido (nitrox), aumentando o tempo de mergulho não descompressivo além dos limites descompressivos do mergulho com ar.",
    cta: infoCta,
  },
  blocks: [
    {
      type: "split-media",
      id: "como-funciona-nitrox",
      titleSans: "Como funciona?",
      paragraphs: [
        "Para a realização do mergulho com ar enriquecido (nitrox) é necessário um certificado de mergulhador especializado neste tipo de mergulho, que você pode obter participando de um dos cursos mais populares da PADI — o Enriched Air Diver — e assim ter permissão de obter recargas com ar enriquecido.",
      ],
      video: {
        videoId: "gnjOODLvkqo",
        title: "Curso PADI Enriched Air Diver (NITROX) — Evidive",
      },
      mediaPosition: "right",
      surface: "sand",
    },
    {
      type: "icon-cards",
      id: "certificacao-nitrox",
      titleSans: "Obtenha a certificação",
      titleDisplay: "Enriched Air Diver PADI em 1 dia!",
      cards: [
        {
          iconSrc: "/cursos/icone-cilindro-de-mergulho.svg",
          iconAlt: "",
          title: "O mais popular curso da PADI",
          description:
            "Quão divertida pode ser sua experiência de mergulho se você puder passar mais tempo embaixo d'água? Se você quer saber a resposta, basta realizar o curso Enriched Air Diver. Aproveite melhor os seus mergulhos permanecendo mais tempo submerso.",
        },
        {
          iconSrc: "/cursos/icone-mascara-de-mergulho.svg",
          iconAlt: "",
          title: "Pré-requisitos",
          description:
            "Para participar deste curso é necessário ter idade mínima de 12 anos e ter a certificação PADI Open Water Diver ou certificação qualificadora de outra organização.",
          bullets: ["Tudo incluso: material didático, equipamento e certificação."],
        },
        {
          iconSrc: "/cursos/icone-nadadeira-de-mergulho.svg",
          iconAlt: "",
          title: "Benefícios do curso",
          description:
            "Este curso garante o certificado de mergulhador com ar enriquecido, permitindo que você:",
          bullets: [
            "Aumente o tempo de mergulho não descompressivo.",
            "Permaneça mais tempo submerso.",
            "Obtenha recargas com ar enriquecido.",
          ],
        },
      ],
      cta: contactCta,
      surface: "default",
    },
    {
      type: "steps",
      id: "o-que-voce-aprende-nitrox",
      title: "O que você irá aprender?",
      steps: [
        {
          stepNumber: "01",
          title: "Aprendizados do Enriched Air Diver PADI",
          description:
            "Durante este curso você aprenderá a fazer análise do conteúdo dos cilindros, entendendo sua quantidade, desenvolverá habilidade em planejar os mergulhos tanto com tabelas ou equipamento digital para um melhor proveito do mergulho e entenderá como manter a segurança com um maior tempo de mergulho.",
        },
        {
          stepNumber: "02",
          title: "Vantagens do Curso Enriched Air Diver PADI",
          description:
            "Para aqueles que praticam atividades submarinas como realização de fotos digitais subaquáticas ou exploração de naufrágios, este tipo de mergulho permite que você passe mais tempo embaixo d'água, melhorando sua experiência de lazer e exploração.",
          highlights: [
            "Tudo incluso: material didático, equipamento e certificação.",
          ],
        },
      ],
      cta: contactCta,
      trailingFineRule: true,
    },
  ],
};
