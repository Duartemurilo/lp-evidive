import { actionCameraCourseConfig } from "@/lib/config";
import type { CursoPageContent } from "@/lib/types/curso-page";

const infoCta = {
  label: "Saiba mais incluindo preços e datas",
  href: actionCameraCourseConfig.infoWhatsAppUrl,
  external: true,
  variant: "schedule",
} as const;

const contactCta = {
  label: "Fale agora com nosso time sobre preços e datas",
  href: actionCameraCourseConfig.contactWhatsAppUrl,
  external: true,
  variant: "schedule",
} as const;

export const cameraDeAcaoPageContent: CursoPageContent = {
  slug: "camera-de-acao",
  title: "Câmera de Ação",
  categoryLabel: "Já sou mergulhador",
  metaDescription:
    "Curso Eviaction Câmera de Ação na Evidive: GoPro e câmeras de ação, fotos e vídeos subaquáticos com Saulo Marcondes — piscina e EviLago em Cotia.",
  hero: {
    lead: "GOPRO",
    leadHighlight: "Curso Câmera de Ação",
    supporting:
      "Descubra como usar sua Câmera de Ação ou GoPro para fazer fotos e vídeos incríveis dos seus mergulhos!",
    cta: infoCta,
  },
  blocks: [
    {
      type: "copy",
      id: "conheca-o-curso",
      title: "Conheça o curso",
      paragraphs: [
        "Aprenda como aproveitar ao máximo os recursos da sua câmera de ação para tirar fotos e vídeos maravilhosas dos seus mergulhos.",
        "Com o curso Eviaction — Câmera de Ação, você será capaz de produzir memórias subaquáticas incríveis! São dois dias de curso em nossa escola em Cotia, com aulas práticas e teóricas na piscina e no EviLago.",
      ],
      surface: "sand",
    },
    {
      type: "copy",
      id: "conheca-o-instrutor",
      titleSans: "Conheça o instrutor",
      titleDisplay: "Saulo Marcondes",
      paragraphs: [
        "Instrutor MSDT PADI · Fotógrafo profissional",
      ],
      bullets: [
        "Profissionalizou-se na Tailândia, onde trabalhou como fotógrafo de mergulho por 3 anos.",
        "Mergulha há quase 10 anos, atingindo a marca de 2 mil mergulhos.",
        "Sempre busca tornar a experiência de cada pessoa inesquecível, capturando registros fantásticos para recordarem.",
        "Traz seu conhecimento e técnicas irreverentes para, junto com a Evidive, formar um curso único e completo.",
      ],
      cta: contactCta,
      surface: "default",
    },
    {
      type: "steps",
      id: "o-que-voce-aprende-camera",
      title: "O que você irá aprender?",
      steps: [
        {
          stepNumber: "01",
          title: "Teoria",
          description:
            "Fundamentos das câmeras de ação, equipamento, luz e configurações para mergulhos seguros e criativos.",
          highlights: [
            "Conceitos das câmeras de ação e sua história.",
            "Equipamentos para utilizar no mergulho.",
            "Como usar a luz para ter mais cor.",
            "Luz artificial e luz natural.",
            "Entenda as cores embaixo da água.",
            "Configurações da câmera: use para melhorar seu desempenho.",
            "Atenção e perigos durante o mergulho com uma câmera na mão.",
            "Melhor forma de flutuabilidade e posicionamento.",
          ],
        },
        {
          stepNumber: "02",
          title: "Pré-mergulho",
          description: "Prepare equipamento, roteiro e plano antes de entrar na água.",
          highlights: [
            "Monte seu equipamento.",
            "Monte seu script.",
            "Revise tudo e tenha um plano B.",
          ],
        },
        {
          stepNumber: "03",
          title: "Pós-mergulho",
          description: "Cuidados com o equipamento e fluxo de edição do material capturado.",
          highlights: [
            "Tratamento do equipamento.",
            "Revisão e exportação do conteúdo.",
            "Edite no celular.",
            "Conheça edição avançada.",
          ],
        },
        {
          stepNumber: "04",
          title: "Prática",
          description:
            "Treinamento dos conceitos na piscina e no EviLago, com exercícios de flutuabilidade, enquadramento e uso de luz.",
          highlights: [
            "Treinamento dos conceitos na piscina e no EviLago.",
            "Flutuabilidade.",
            "Nadando de ré parado e se aproximando da vida marinha.",
            "Evitando tocar em corais.",
            "Exercícios de batida de perna.",
            "Montando script e executando.",
            "Movimento de câmera e enquadramento.",
            "Aprender a utilizar luz natural e luz artificial.",
          ],
        },
      ],
      cta: contactCta,
      trailingFineRule: true,
    },
  ],
};
