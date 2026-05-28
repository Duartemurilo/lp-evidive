import { scubaDiverCourseConfig } from "@/lib/config";
import type { CursoPageContent } from "@/lib/types/curso-page";

const infoCta = {
  label: "Saiba mais incluindo preços e datas",
  href: scubaDiverCourseConfig.infoWhatsAppUrl,
  external: true,
  variant: "schedule",
} as const;

const contactCta = {
  label: "Fale agora com nosso time sobre preços e datas",
  href: scubaDiverCourseConfig.contactWhatsAppUrl,
  external: true,
  variant: "schedule",
} as const;

export const padiScubaDiverPageContent: CursoPageContent = {
  slug: "padi-scuba-diver",
  title: "PADI Scuba Diver",
  categoryLabel: "Quero começar a mergulhar",
  metaDescription:
    "Curso PADI Scuba Diver na Evidive: certificação em 1 final de semana em São Paulo, piscinas, EviLago e treino completo no Concept Dive Center.",
  hero: {
    lead: "PADI SCUBA DIVER",
    leadHighlight: "Curso de Mergulho",
    supporting:
      "Certificação PADI Scuba Diver em São Paulo em apenas 1 final de semana!\n\nCom este curso você estará qualificado para mergulhar até 12 metros / 40 pés com supervisão de um profissional, alugar ou comprar equipamentos de mergulho para participação em atividades de mergulhadores, obter recarga de ar e a continuar os treinamentos, com objetivo de alcançar a certificação PADI Open Water Diver.",
    cta: infoCta,
  },
  blocks: [
    {
      type: "split-media",
      id: "como-funciona-scuba-diver",
      titleSans: "Como funciona?",
      paragraphs: [
        "No curso PADI Scuba Diver, o instrutor apresenta os conceitos básicos necessários para aprender a praticar o mergulho autônomo.",
        "As aulas têm duração de um único final de semana em nossas piscinas (Tanque Noronha e Piscina Paraty) e depois passam para águas abertas em nosso lago de 400 mil litros de água (EVILAGO), com os participantes adquirindo o conhecimento relevante simultaneamente!",
      ],
      video: {
        videoId: "qEzf4MjmowA",
        title: "Curso PADI Scuba Diver — Evidive",
      },
      mediaPosition: "right",
      surface: "sand",
    },
    {
      type: "icon-cards",
      id: "certificacao-scuba-diver",
      titleSans: "Obtenha a certificação",
      titleDisplay: "SCUBA mundial PADI em 2 dias!",
      cards: [
        {
          iconSrc: "/cursos/icone-cilindro-de-mergulho.svg",
          iconAlt: "Cilindro de mergulho",
          title: "O curso ideal para quem não tem muito tempo livre",
          description:
            "O programa Scuba Diver serve para aqueles que querem se tornar mergulhadores, mas não têm muito tempo livre. Esta certificação permite mergulhar com supervisão até 12 metros de profundidade! Você receberá a certificação PADI Scuba Diver.",
        },
        {
          iconSrc: "/cursos/icone-mascara-de-mergulho.svg",
          iconAlt: "Máscara de mergulho",
          title: "Mergulhe Hoje",
          description:
            "A ênfase do curso PADI Scuba Diver é aprender a mergulhar mergulhando. Seu instrutor providenciará para que você mergulhe o mais rápido possível, pois esta é a essência das atividades de mergulho.",
        },
        {
          iconSrc: "/cursos/icone-nadadeira-de-mergulho.svg",
          iconAlt: "Nadadeira de mergulho",
          title: "Tudo incluso no Concept Dive Center",
          description:
            "Material didático, equipamento e certificação. Você realiza todo o treinamento num só local: o Concept Dive Center!",
          bullets: [
            "Benefícios do curso: mergulhar até 12 metros / 40 pés com supervisão de um profissional.",
            "Alugar ou comprar equipamentos de mergulho.",
            "Obter recarga de ar.",
            "Continuar os treinamentos rumo à certificação PADI Open Water Diver com apenas mais um final de semana de curso com aula no mar.",
          ],
        },
      ],
      cta: contactCta,
      surface: "default",
    },
    {
      type: "steps",
      id: "o-que-voce-aprende",
      eyebrow: "1 final de semana · teoria, piscina e EviLago",
      title: "O que você irá aprender?",
      subtitle:
        "Temos um canal exclusivo via WhatsApp — pode nos chamar que adoraremos conversar com você!",
      steps: [
        {
          stepNumber: "01",
          title: "Aulas teóricas de Mergulho",
          description:
            "Nesta etapa você realiza no modelo auto estudo usando o material didático PADI (Manual e o Vídeo PADI Scuba Diver). Usa seu tempo livre para estudar e aprender princípios de física e fisiologia aplicadas ao mergulho. Mais calma! São assuntos fáceis de entender e você vai tirar de letra.",
          highlights: [
            "Material didático incluso.",
            "Método de ensino moderno e divertido!",
          ],
        },
        {
          stepNumber: "02",
          title: "Mergulho em águas confinadas",
          description:
            "A diversão começa com os mergulhos em águas confinadas (piscina). Vamos aprender a usar todo o equipamento de mergulho e treinar as técnicas necessárias e princípios do mergulho durante 3 mergulhos realizados em dia único, dominando na prática os procedimentos e habilidades de mergulho. Você vai ter o acompanhamento de nossos instrutores em cada etapa desse treino e já vai terminar o final de semana pronto para mergulhar no mar.",
          highlights: [
            "100% do equipamento de mergulho incluso.",
            "Time de instrutores supervisionando cada aluno.",
          ],
        },
        {
          stepNumber: "03",
          title: "Aulas no EVILAGO",
          description:
            "Chegou a hora do “check-out”, ou seja, realizar o seu mergulho em águas abertas no lago de 400 mil litros de água e profundidade de até 5 metros (EVILAGO), onde você vai realizar os seus primeiros 2 mergulhos no lago! Todos os seus mergulhos serão acompanhados sob a supervisão e orientação do seu instrutor.",
          highlights: [
            "Todo o equipamento já está incluso!",
            "Seus 2 primeiros mergulhos no lago!",
            "Total infraestrutura do nosso Concept Dive Center.",
          ],
        },
      ],
      cta: contactCta,
      trailingFineRule: true,
    },
  ],
};
