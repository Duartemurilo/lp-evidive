import { rescueDiverCourseConfig } from "@/lib/config";
import type { CursoPageContent } from "@/lib/types/curso-page";

const infoCta = {
  label: "Saiba mais incluindo preços e datas",
  href: rescueDiverCourseConfig.infoWhatsAppUrl,
  external: true,
  variant: "schedule",
} as const;

const contactCta = {
  label: "Fale agora com nosso time sobre preços e datas",
  href: rescueDiverCourseConfig.contactWhatsAppUrl,
  external: true,
  variant: "schedule",
} as const;

export const resgatePageContent: CursoPageContent = {
  slug: "resgate",
  title: "Resgate",
  categoryLabel: "Já sou mergulhador",
  metaDescription:
    "Curso PADI Rescue Diver na Evidive: prevenção e resgate em mergulho, certificação, material e equipamento no Concept Dive Center, São Paulo.",
  hero: {
    lead: "PADI RESCUE DIVER",
    leadHighlight: "Curso de Resgate",
    supporting:
      "Aprenda a prevenir e lidar com problemas na água se tornando um melhor dupla!\n\nO curso PADI Rescue Diver é conhecido por ser desafiador e recompensador para os mergulhadores. Você aprende atos de prevenção e segurança durante o mergulho, além de desenvolver habilidades para ajudar outros mergulhadores caso necessário.",
    cta: infoCta,
  },
  blocks: [
    {
      type: "split-media",
      id: "como-funciona-rescue",
      titleSans: "Como funciona?",
      paragraphs: [
        "Com o curso PADI Rescue Diver você desenvolve habilidades de resolução de problemas imediatos e ainda assim conquista amigos e momentos de diversão, mesmo mantendo a atenção no conteúdo instruído.",
        "Todas as abordagens são centradas em técnicas de emergência para diferentes níveis e padrões de mergulho, de forma que você exercite suas habilidades e conhecimentos. O curso é apoiado por material didático composto de manual e vídeos PADI para uma melhor aprendizagem.",
      ],
      video: {
        videoId: "YNdo9tcgzpM",
        title: "Curso PADI Rescue Diver — Evidive",
      },
      mediaPosition: "right",
      surface: "sand",
    },
    {
      type: "icon-cards",
      id: "certificacao-rescue",
      titleSans: "O mais desafiador e gratificante",
      titleDisplay: "curso de especialização PADI",
      cards: [
        {
          iconSrc: "/cursos/icone-cilindro-de-mergulho.svg",
          iconAlt: "",
          title: "Rescue Diver: prevenção e confiança",
          description:
            "Porque você aprende a prevenir e gerir problemas na água e tornar-se mais confiante em suas habilidades como mergulhador, sabendo que pode ajudar os outros se necessário. Durante o curso, você aprende a se tornar um melhor dupla.",
        },
        {
          iconSrc: "/cursos/icone-mascara-de-mergulho.svg",
          iconAlt: "",
          title: "Pré-requisitos",
          description:
            "Para participar deste curso é necessário ter idade mínima de 12 anos e ter concluído algumas especialidades:",
          bullets: [
            "Certificação em Navegação Subaquática.",
            "Certificação Emergency First Response.",
            "Tudo incluso: material didático, equipamento e certificação.",
          ],
        },
        {
          iconSrc: "/cursos/icone-nadadeira-de-mergulho.svg",
          iconAlt: "",
          title: "Benefícios do curso",
          description:
            "Este curso ensina-lhe os passos e técnicas para lidar com situações de resgate, fazendo com que você:",
          bullets: [
            "Aprenda a prevenir e gerir problemas na água.",
            "Torne-se um mergulhador mais confiante.",
            "Torne-se um melhor dupla — e muito mais.",
          ],
        },
      ],
      cta: contactCta,
      surface: "default",
    },
    {
      type: "steps",
      id: "o-que-voce-aprende-rescue",
      title: "O que você irá aprender?",
      steps: [
        {
          stepNumber: "01",
          title: "Objetivo do PADI Rescue Diver",
          description:
            "O curso PADI Rescue Diver prepara você para lidar com emergências de mergulho, pequenas e grandes, usando uma variedade de técnicas. Através do desenvolvimento de conhecimentos e exercícios de salvamento, você aprende o que procurar e como responder durante situações de resgate, colocando em prática o conhecimento e as habilidades adquiridos.",
        },
        {
          stepNumber: "02",
          title: "Qualificação PADI Rescue Diver",
          description: "Os tópicos que serão abordados são:",
          highlights: [
            "Resgate de mergulhadores em estado de pânico.",
            "Reconhecimento de estresse durante o mergulho.",
            "Auto salvamento.",
            "Resgate de mergulhadores que não respondem.",
            "Equipamentos de emergências.",
          ],
        },
        {
          stepNumber: "03",
          title: "Equipamentos necessários",
          description:
            "Serão necessários equipamentos básicos de mergulho, como oxigênio, flutuadores, bóias de marcação e, talvez, manequins RCP e itens específicos para esta qualificação — máscara de bolso para a prática de ressuscitação em água e seu próprio kit de primeiros socorros.",
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
