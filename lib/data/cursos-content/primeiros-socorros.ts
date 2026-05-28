import { emergencyFirstResponseCourseConfig } from "@/lib/config";
import type { CursoPageContent } from "@/lib/types/curso-page";

const infoCta = {
  label: "Saiba mais incluindo preços e datas",
  href: emergencyFirstResponseCourseConfig.infoWhatsAppUrl,
  external: true,
  variant: "schedule",
} as const;

export const primeirosSocorrosPageContent: CursoPageContent = {
  slug: "primeiros-socorros",
  title: "Primeiros Socorros",
  categoryLabel: "Já sou mergulhador",
  metaDescription:
    "Curso PADI Emergency First Response na Evidive: primeiros socorros, CPR, AED e certificação em 1 dia no Concept Dive Center, São Paulo.",
  hero: {
    lead: "PADI EMERGENCY FIRST RESPONSE PROVIDER",
    leadHighlight: "Curso de Primeiros Socorros",
    supporting:
      "Aprenda os passos importantes para seguir no atendimento de emergências diversas.\n\nOs primeiros socorros são técnicas amplamente necessárias para todos os aspectos, dentro e fora do mergulho, portanto, este curso vai te qualificar para atuar baseado em ações de segurança mundialmente utilizadas.",
    cta: infoCta,
  },
  blocks: [
    {
      type: "split-media",
      id: "como-funciona-efr",
      titleSans: "Como funciona?",
      paragraphs: [
        "A Formação Emergency First Response concentra-se na construção de confiança dos socorristas leigos, aumentando a sua disponibilidade para responder quando confrontado com uma emergência médica.",
        "Os participantes do curso aprendem os passos simples de seguir para o atendimento de emergência e assim aplicar as habilidades em um ambiente de aprendizado não estressante. Todos os cursos são apoiados por manuais de auto-estudo, vídeos e cartazes de referência rápida para uma melhor aprendizagem.",
      ],
      video: {
        videoId: "YNdo9tcgzpM",
        title: "Curso PADI Emergency First Response — Evidive",
      },
      mediaPosition: "right",
      surface: "sand",
    },
    {
      type: "icon-cards",
      id: "certificacao-efr",
      titleSans: "Certificação Emergency First Response",
      titleDisplay: "PADI em 1 dia!",
      cards: [
        {
          iconSrc: "/cursos/icone-cilindro-de-mergulho.svg",
          iconAlt: "",
          title: "Primeiros Socorros com metodologia PADI",
          description:
            "O curso EFR é ideal para a construção de confiança nos socorristas leigos e aumentar a sua disponibilidade para responder, quando confrontado com uma emergência médica.",
        },
        {
          iconSrc: "/cursos/icone-mascara-de-mergulho.svg",
          iconAlt: "",
          title: "Pré-requisitos",
          description: "Qualquer pessoa pode e deve realizar este curso, que tem diversas aplicações práticas no nosso dia a dia.",
          bullets: [
            "Incluso material didático e certificação.",
            "Você realiza todo o treinamento num só local: o Concept Dive Center.",
            "Idade mínima: 10 anos.",
          ],
        },
        {
          iconSrc: "/cursos/icone-nadadeira-de-mergulho.svg",
          iconAlt: "",
          title: "Benefícios do curso",
          description: "Este curso ensina-lhe os passos e técnicas para lidar com emergências:",
          bullets: [
            "Com risco de vida.",
            "Que aliviam a dor e reduzem o risco de maiores danos.",
            "Específicas para ajudar bebés e crianças.",
            "E muito mais.",
          ],
        },
      ],
      cta: infoCta,
      surface: "default",
    },
    {
      type: "steps",
      id: "o-que-voce-aprende-efr",
      title: "O que você irá aprender?",
      subtitle:
        "Temos um canal exclusivo via WhatsApp — pode nos chamar que adoraremos conversar com você!",
      steps: [
        {
          stepNumber: "01",
          title: "Assistência Primária (CPR)",
          description:
            "Este curso ensina-lhe os passos e técnicas para lidar com emergências com risco de vida. Você vai praticar oito competências para ajudar pacientes que não estão respirando, não têm batimentos cardíacos, com possível lesão na coluna vertebral, que podem estar em choque ou quem pode ter uma hemorragia grave. Você vai aprender a realizar o CPR e continuar a monitorar o paciente, oferecendo todas as chances possíveis de sobrevivência até o serviço de emergência médica chegar.",
        },
        {
          stepNumber: "02",
          title: "Assistência Secundária (Primeiros Socorros)",
          description:
            "Porque muitas condições médicas não são emergências com risco de vida e o atendimento médico pode ser atrasado ou indisponível, este curso ensina como prestar primeiros socorros que aliviam a dor e reduzem o risco de maiores danos. Você vai aprender a avaliar uma variedade de lesões e doenças e a praticar curativos e talas.",
        },
        {
          stepNumber: "03",
          title: "Cuidados para Crianças",
          description:
            "Este curso permite aos participantes aprender, praticar e aplicar habilidades de cuidados de emergência específicos para ajudar bebês e crianças com emergências médicas. Foi projetado para quem trabalha com crianças ou pode responder a emergências envolvendo jovens. Frequentemente integrado aos cursos de Assistência Primária (RCP) e Assistência Secundária (Primeiros Socorros).",
        },
        {
          stepNumber: "04",
          title: "CPR & AED",
          description:
            "Este curso foca o treinamento em RCP e ensina os participantes a usar um DEA (desfibrilador externo automático). No local de trabalho ou em outros contextos onde exigências governamentais especificam essa formação, o curso de CPR & AED atende essa necessidade. Muitas vezes integrado em programas de Primeiros Socorros no trabalho.",
        },
        {
          stepNumber: "05",
          title: "Primeiros Socorros no Trabalho",
          description:
            "Em algumas áreas, como a Grã-Bretanha, Austrália e Canadá, regulamentações governamentais solicitam maior treinamento de CPR e primeiros socorros para o local de trabalho. Programas concebidos para estas áreas incluem temas e habilidades adicionais para atender aos requisitos, seguindo a abordagem EFR de treinamento fácil de aprender.",
        },
      ],
      cta: infoCta,
      trailingFineRule: true,
    },
  ],
};
