import { basicFreediverCourseConfig } from "@/lib/config";
import type { CursoPageContent } from "@/lib/types/curso-page";

const infoCta = {
  label: "Saiba mais incluindo preços e datas",
  href: basicFreediverCourseConfig.infoWhatsAppUrl,
  external: true,
  variant: "schedule",
} as const;

const contactCta = {
  label: "Fale agora com nosso time sobre preços e datas",
  href: basicFreediverCourseConfig.contactWhatsAppUrl,
  external: true,
  variant: "schedule",
} as const;

export const mergulhoLivreBasicoPageContent: CursoPageContent = {
  slug: "mergulho-livre-basico",
  title: "Mergulho Livre Básico",
  categoryLabel: "Mergulho livre",
  metaDescription:
    "Curso PADI Basic Freediver na Evidive: mergulho livre e apneia em piscinas, EviLago e estrutura completa em São Paulo — Concept Dive Center.",
  hero: {
    lead: "PADI BASIC FREEDIVER",
    leadHighlight: "Curso Básico de Mergulho Livre",
    supporting:
      "Aprenda a mergulhar sem cilindro em águas confinadas com o Curso PADI Basic Freediver.",
    cta: infoCta,
  },
  blocks: [
    {
      type: "copy",
      id: "introducao-freedive",
      paragraphs: [
        "Aprenda a permanecer sem respirar debaixo d'água com uma técnica especial de apneia. Com o Freediver é possível!",
        "O Freedive, ou mergulho livre, é uma prática de mergulho sem o uso de equipamentos para auxílio de ar comprimido. Dessa forma, é possível mergulhar livremente com a ajuda das técnicas de apneia para o controle da respiração.",
      ],
      surface: "sand",
    },
    {
      type: "copy",
      id: "como-funciona-freedive-basico",
      title: "Como funciona o curso BÁSICO DE MERGULHO LIVRE?",
      paragraphs: [
        "Com o curso básico de mergulho livre (PADI BASIC FREEDIVER) você vai desenvolver conhecimentos sobre os princípios do freediving, com sessões em águas confinadas (piscinas) para aprender técnicas de respiração que vão te deixar apto a realizar mergulhos em lagos, mar e piscina.",
      ],
      surface: "default",
    },
    {
      type: "copy",
      id: "quem-pode-freedive",
      title: "Quem pode fazer este curso?",
      paragraphs: [
        "Para se inscrever em um curso de Basic PADI Freediver você deve:",
      ],
      bullets: [
        "Ter pelo menos 12 anos de idade.",
        "Ter habilidades de natação adequadas.",
        "Estar em boa saúde física.",
        "Não precisa de experiência prévia em snorkeling.",
        "A partir de 8 anos de idade podem se inscrever no Curso PADI Skin Diver.",
      ],
      surface: "sand",
    },
    {
      type: "split-media",
      id: "onde-fara-o-curso",
      titleSans: "Onde você fará",
      titleDisplay: "este curso?",
      paragraphs: [
        "Assista ao vídeo e conheça o centro de mergulho da Evidive — tudo isso sem sair de São Paulo!",
      ],
      video: {
        videoId: "vM8ogYpDg9U",
        title: "Centro de mergulho Evidive — São Paulo",
      },
      cta: contactCta,
      mediaPosition: "right",
      surface: "default",
    },
    {
      type: "icon-cards",
      id: "estrutura-evidive-freedive",
      titleSans: "EviLago e",
      titleDisplay: "EviBoat",
      cards: [
        {
          iconSrc: "/cursos/icone-cilindro-de-mergulho.svg",
          iconAlt: "",
          title: "EviLago",
          description:
            "Você precisa conhecer o EviLago, uma piscina natural com profundidade de 5 m e 440 mil litros de água doce, plantas aquáticas e mais de 10.000 peixes ornamentais de várias espécies. Sua entrada é feita com passo de gigante através do EviBoat.",
        },
        {
          iconSrc: "/cursos/icone-mascara-de-mergulho.svg",
          iconAlt: "",
          title: "EviBoat",
          description:
            "É o nosso barco para simulações próximas da realidade encontrada nas aulas práticas de mergulho em alto mar. É possível treinar equipagem e técnicas apropriadas de entrada e saída de mergulho embarcado. Neste ambiente também se aprende a como se comportar em uma embarcação de mergulho.",
        },
        {
          iconSrc: "/cursos/icone-nadadeira-de-mergulho.svg",
          iconAlt: "",
          title: "Piscina Paraty",
          description:
            "Na Piscina Paraty, com 1,5 m de profundidade e dimensão de 10 m x 10 m, realizamos algumas aulas, especialmente a experiência do Emotion Dive, onde os alunos podem ser vistos em ação por amigos através de grandes visores.",
        },
        {
          iconSrc: "/cursos/icone-cilindro-de-mergulho.svg",
          iconAlt: "",
          title: "Piscina Noronha",
          description:
            "O Tanque Noronha tem dimensão 10 m x 10 m e três patamares de profundidade (1,5 m, 3,0 m e 4,5 m). Nele realizamos inúmeras atividades de mergulho dos cursos de entrada, educação continuada e especializações — como fotos subaquáticas e mergulho de naufrágio.",
        },
      ],
      cta: contactCta,
      surface: "sand",
    },
  ],
};
