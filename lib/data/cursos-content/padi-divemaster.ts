import { divemasterCourseConfig } from "@/lib/config";
import type { CursoPageContent } from "@/lib/types/curso-page";

const infoCta = {
  label: "Saiba mais incluindo preços e datas",
  href: divemasterCourseConfig.infoWhatsAppUrl,
  external: true,
  variant: "schedule",
} as const;

const contactCta = {
  label: "Fale agora com nosso time sobre preços e datas",
  href: divemasterCourseConfig.contactWhatsAppUrl,
  external: true,
  variant: "schedule",
} as const;

export const padiDivemasterPageContent: CursoPageContent = {
  slug: "padi-divemaster",
  title: "PADI Divemaster",
  categoryLabel: "Carreira Profissional",
  metaDescription:
    "Curso PADI Divemaster na Evidive: primeiro passo na carreira profissional do mergulho, liderança, supervisão e formação no Concept Dive Center.",
  hero: {
    lead: "PADI DIVEMASTER",
    leadHighlight: "Curso Divemaster",
    supporting:
      "Entre no nível profissional de mergulho!\n\nSua aventura nos níveis profissionais do mergulho recreativo começa com o programa PADI Divemaster.",
    cta: infoCta,
  },
  blocks: [
    {
      type: "copy",
      id: "conheca-o-curso-dm",
      title: "Conheça o curso",
      paragraphs: [
        "O Curso Divemaster PADI permite que você ganhe conhecimento sobre mergulhos com instrução de um profissional e aprimore suas habilidades. Você se desenvolverá como líder e como supervisor de outras atividades de mergulho, assim se tornando apto para auxiliar outros instrutores quando necessário, adquirindo experiência e podendo, eventualmente, tornar-se um instrutor de mergulho.",
        "Venha viver esta experiência no nível profissional de mergulho!",
      ],
      surface: "sand",
    },
    {
      type: "icon-cards",
      id: "carreira-divemaster",
      titleSans: "O primeiro passo para",
      titleDisplay: "sua carreira no mergulho",
      cards: [
        {
          iconSrc: "/cursos/icone-cilindro-de-mergulho.svg",
          iconAlt: "",
          title: "O papel do Divemaster",
          description:
            "O divemaster é um mergulhador que atua em conjunto com o instrutor e participa da realização dos mergulhos, desde os bastidores até a atividade em si. Por isso, o divemaster participa de muitas saídas de mergulho, adquirindo experiência e podendo, eventualmente, tornar-se instrutor.",
        },
        {
          iconSrc: "/cursos/icone-mascara-de-mergulho.svg",
          iconAlt: "",
          title: "Pré-requisitos",
          description:
            "Para participar deste curso é necessário ter idade mínima de 18 anos e ter concluído algumas etapas e especialidades:",
          bullets: [
            "PADI Advanced Open Water Diver (Mergulhador Avançado) ou similar.",
            "Rescue Diver PADI ou certificações similares de outra organização.",
            "Pelo menos 40 mergulhos registrados.",
          ],
        },
        {
          iconSrc: "/cursos/icone-nadadeira-de-mergulho.svg",
          iconAlt: "",
          title: "Benefícios do curso",
          description:
            "Você se desenvolverá como líder e supervisor de outras atividades de mergulho:",
          bullets: [
            "Resistência física.",
            "Capacidade de organização.",
            "Situações e resolução de problemas.",
            "Treinamento prático.",
            "Habilidades subaquáticas.",
          ],
        },
      ],
      cta: contactCta,
      surface: "default",
    },
    {
      type: "copy",
      id: "o-que-e-divemaster",
      title: "O que é um divemaster",
      paragraphs: [
        "O divemaster é um mergulhador que atua em conjunto com o instrutor e participa da realização dos mergulhos, desde os bastidores até a atividade em si. Por isso, o divemaster acaba participando de muitas saídas de mergulho, adquirindo experiência e podendo, eventualmente, tornar-se instrutor.",
        "Durante os mergulhos, o divemaster funciona como uma espécie de supervisor dos alunos dos cursos. Ele auxilia na organização das saídas, cuidando dos equipamentos que serão usados. Também presta assistência aos mergulhadores durante a prática e ao instrutor, sempre que for necessário.",
      ],
      surface: "sand",
    },
    {
      type: "copy",
      id: "o-que-voce-aprende-dm",
      title: "O que você irá aprender",
      paragraphs: [
        "Durante o programa PADI Divemaster, você aprenderá habilidades de liderança no mergulho na sala de aula e em estudos independentes.",
        "Você concluirá exercícios de demonstração de habilidades aquáticas e resistência física, bem como exercícios de treinamento que ampliam sua capacidade de organização e resolução de problemas.",
        "Você colocará este conhecimento em prática em um estágio ou uma série de exercícios práticos de treinamento.",
      ],
      surface: "default",
    },
    {
      type: "copy",
      id: "importancia-divemaster",
      title: "Qual a importância do divemaster",
      paragraphs: [
        "Além de desempenhar um importante papel na organização e na condução dos mergulhos, o divemaster pode atuar como instrutor de alguns cursos, como o de Reciclagem de Mergulhadores (para aqueles que desejam renovar seus conhecimentos) e de cursos de snorkeling para adultos e crianças.",
        "Além de todas as responsabilidades, atuar como divemaster é de grande importância para quem planeja tornar-se instrutor futuramente, porque oferece um maior conhecimento dos bastidores do mergulho e permite aprimorar as habilidades necessárias para a prática e o ensino da modalidade.",
      ],
      surface: "sand",
    },
    {
      type: "split-media",
      id: "programa-divemaster-video",
      titleSans: "Programa PADI",
      titleDisplay: "Divemaster",
      paragraphs: [
        "Conheça a formação profissional que abre caminho para liderar mergulhos, apoiar instrutores e evoluir na carreira no mergulho.",
      ],
      video: {
        videoId: "TdV3gNVUj1Y",
        title: "Curso PADI Divemaster — Evidive",
      },
      cta: contactCta,
      mediaPosition: "right",
      surface: "default",
    },
  ],
};
