import { peakPerformanceBuoyancyCourseConfig } from "@/lib/config";
import type { CursoPageContent } from "@/lib/types/curso-page";

const infoCta = {
  label: "Saiba mais incluindo preços e datas",
  href: peakPerformanceBuoyancyCourseConfig.infoWhatsAppUrl,
  external: true,
  variant: "schedule",
} as const;

const contactCta = {
  label: "Fale agora com nosso time sobre preços e datas",
  href: peakPerformanceBuoyancyCourseConfig.contactWhatsAppUrl,
  external: true,
  variant: "schedule",
} as const;

export const flutuabilidadePageContent: CursoPageContent = {
  slug: "flutuabilidade",
  title: "Flutuabilidade",
  categoryLabel: "Já sou mergulhador",
  metaDescription:
    "Curso PADI Peak Performance Buoyancy (PPB) na Evidive: domínio da flutuabilidade, piscina, EviLago e certificação no Concept Dive Center, São Paulo.",
  hero: {
    lead: "PADI PEAK PERFORMANCE BUOYANCY",
    leadHighlight: "Curso de Flutuabilidade",
    supporting:
      "Consiga um controle de flutuabilidade dos grandes mergulhadores com o curso PPB da PADI.\n\nPara aqueles que buscam domínio máximo da flutuabilidade, olhar clínico para organismos submarinos e capacidade de chegar próximo do fundo com total controle.",
    cta: infoCta,
  },
  blocks: [
    {
      type: "split-media",
      id: "como-funciona-ppb",
      titleSans: "Como funciona?",
      paragraphs: [
        "Neste curso de especialidade PPB — Peak Performance Buoyancy, que significa Máximo Desempenho em Flutuação, você irá aprender a usar a quantidade certa de lastro para ter controle, postura e equilíbrio absolutos, aprendendo a subir e a descer com pouco esforço.",
        "Ao dominar a flutuabilidade, será possível se movimentar embaixo d'água com mais rapidez, eficiência e próximo de ecossistemas frágeis sem danificá-los e sem se machucar.",
      ],
      video: {
        videoId: "zudpzCUKt-Y",
        title: "Curso PADI Peak Performance Buoyancy — Evidive",
      },
      mediaPosition: "right",
      surface: "sand",
    },
    {
      type: "icon-cards",
      id: "certificacao-ppb",
      titleSans: "O curso ideal para quem busca",
      titleDisplay: "domínio máximo da flutuabilidade",
      cards: [
        {
          iconSrc: "/cursos/icone-cilindro-de-mergulho.svg",
          iconAlt: "",
          title: "Programa PPB",
          description:
            "O programa PPB é o curso ideal para aqueles que desejam ter um olhar clínico para organismos submarinos e capacidade de chegar próximo do fundo com total controle.",
        },
        {
          iconSrc: "/cursos/icone-mascara-de-mergulho.svg",
          iconAlt: "",
          title: "Pré-requisitos",
          description:
            "Ter certificação PADI Open Water Diver, Junior Open Water Diver, ou certificação qualificadora de outra organização e, no mínimo, 10 anos de idade.",
          bullets: [
            "Tudo incluso: material didático, equipamento e certificação.",
            "Você realiza todo o treinamento num só local: o Concept Dive Center!",
          ],
        },
        {
          iconSrc: "/cursos/icone-nadadeira-de-mergulho.svg",
          iconAlt: "",
          title: "Benefícios do curso",
          description:
            "Este curso oferece ao mergulhador os procedimentos para que sua movimentação subaquática seja mais rápida e eficaz.",
          bullets: [
            "Métodos para conhecer a vida marinha mais frágil e ecossistemas com segurança.",
            "Preservação do ambiente durante a aproximação dos organismos.",
          ],
        },
      ],
      cta: contactCta,
      surface: "default",
    },
    {
      type: "steps",
      id: "o-que-voce-aprende-ppb",
      title: "O que você irá aprender?",
      steps: [
        {
          stepNumber: "01",
          title: "Aulas teóricas",
          description:
            "Nesta etapa você realiza no modelo auto estudo usando o material didático PADI (Manual e o Vídeo PADI Peak Performance Buoyancy). Usa seu tempo livre para estudar e aprender tudo sobre PPB com o material PADI “Máximo Desempenho em Flutuação (Peak Performance Buoyancy)”.",
          highlights: [
            "Material didático incluso.",
            "Método de ensino moderno e divertido!",
          ],
        },
        {
          stepNumber: "02",
          title: "Águas confinadas e EVILAGO",
          description:
            "A diversão começa com os mergulhos em águas confinadas (piscina) e depois passa para águas abertas no nosso EVILAGO. Você vai aprender técnicas de postura e equilíbrio que permitem a melhor experiência de flutuação, além de controle do lastro e domínio de métodos de resistência às águas no equipamento, facilitando o ato de subir e descer.",
          highlights: [
            "100% do equipamento de mergulho incluso.",
            "Time de instrutores supervisionando cada aluno.",
          ],
        },
      ],
      cta: contactCta,
      trailingFineRule: true,
    },
  ],
};
