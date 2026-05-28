import { openWaterCourseConfig } from "@/lib/config";
import type { CursoPageContent } from "@/lib/types/curso-page";

/** Mesmo estilo do Emotion Dive (botão primário verde, sem variant schedule). */
const bookingCta = {
  label: "Quero comprar meu ingresso",
  href: openWaterCourseConfig.enrollWhatsAppUrl,
  external: true,
} as const;

export const cursoBasicoMergulhoPageContent: CursoPageContent = {
  slug: "curso-basico-de-mergulho-com-cilindro",
  title: "Curso Básico de Mergulho com Cilindro",
  categoryLabel: "Quero começar a mergulhar",
  themeAccent: "primary",
  metaDescription:
    "Curso Básico Open Water Diver na Evidive: certificação PADI, piscina, EviLago e mar em Paraty. O maior centro de mergulho do mundo, a 30 min de São Paulo.",
  hero: {
    lead: "Curso Básico de Mergulho",
    leadHighlight: "com Cilindro",
    supporting:
      "O melhor lugar para você iniciar a sua jornada ao fundo do mar é aqui!",
    cta: bookingCta,
  },
  blocks: [
    {
      type: "split-media",
      id: "centro-conceito-owd",
      eyebrow: "Evidive · Concept Dive Center",
      titleSans: "Tire do papel aquele projeto antigo",
      titleDisplay: "de aprender a mergulhar",
      paragraphs: [
        "Aproveite a estrutura da única escola de mergulho conceito do mundo.",
        "São 3.000m² construídos para que você tenha a maior e melhor experiência possível no mergulho, com segurança, conforto e diversão.",
      ],
      mediaPosition: "right",
      layout: "centered",
      surface: "sand",
    },
    {
      type: "split-media",
      id: "open-water-diver",
      eyebrow: "Certificação PADI",
      titleSans: "O curso Open Water Diver",
      titleDisplay: "é a porta de entrada",
      paragraphs: [
        "Para esse maravilhoso mundo submerso, onde pouquíssimos privilegiados têm o prazer de adentrar e conhecer.",
        "A EVIDIVE é o maior centro de mergulho do mundo e ministra cursos desde o nível básico ao nível profissional, passando por diversas especialidades.",
      ],
      video: {
        videoId: "vM8ogYpDg9U",
        title: "Curso Open Water Diver — Evidive",
      },
      cta: bookingCta,
      mediaPosition: "left",
      surface: "default",
    },
    {
      type: "steps",
      id: "como-funciona-owd",
      eyebrow: "Como funciona?",
      title: "O curso OWD",
      titleDisplay: "(Open Water Diver)",
      subtitle: "Acontece em 2 finais de semana, com material didático em modelo auto-estudo (em casa).",
      steps: [
        {
          stepNumber: "01",
          title: "Auto-estudo em casa",
          description:
            "Você avança no material didático PADI no seu ritmo, antes dos encontros presenciais na Evidive.",
        },
        {
          stepNumber: "02",
          title: "1º final de semana",
          description:
            "Revisão dos conhecimentos na Evidive, aulas práticas na piscina e treinos no nosso EviLago — tudo com instrutores PADI.",
        },
        {
          stepNumber: "03",
          title: "2º final de semana",
          description:
            "Aulas práticas no mar de Paraty/RJ e certificação Open Water Diver para mergulhar em até 18 metros de profundidade.",
        },
      ],
      trailingFineRule: true,
    },
    {
      type: "copy",
      id: "mundo-novo",
      titleSans: "A partir daí, se abre",
      titleDisplay: "um mundo novo",
      paragraphs: [
        "Ao seu alcance, você vai desfrutar das maravilhas e de tudo o que o mergulho pode proporcionar:",
      ],
      bullets: [
        "Conhecer um ambiente totalmente diferente ao que você está acostumado",
        "Contato direto com a natureza",
        "Praticar atividade física",
        'Fazer parte de uma "tribo" onde pouquíssimas pessoas têm acesso',
        "Fazer novas amizades",
        "Conhecer novos lugares",
        "Se divertir",
      ],
      cta: bookingCta,
      surface: "sand",
    },
    {
      type: "testimonials",
      id: "depoimentos-owd",
      eyebrow: "Depoimentos",
      title: "O que os novos mergulhadores estão falando?",
      items: [
        {
          image: "/cursos/depo003.png.webp",
          imageAlt: "Depoimento de mergulhador — Evidive",
          imageOnly: true,
        },
        {
          image: "/cursos/depo004.png.webp",
          imageAlt: "Depoimento de mergulhadora — Evidive",
          imageOnly: true,
        },
        {
          image: "/cursos/depo005.png.webp",
          imageAlt: "Depoimento de aluno Open Water — Evidive",
          imageOnly: true,
        },
      ],
    },
    {
      type: "faq",
      id: "faq-owd",
      eyebrow: "Perguntas frequentes",
      title: "Perguntas frequentes",
      items: [
        {
          question: "O que é a PADI? E qual será a minha Certificação?",
          answer:
            "A PADI é a maior certificadora de mergulho do mundo. Ao concluir o curso Open Water Diver na Evidive, você recebe a certificação internacional PADI que permite mergulhar com buddy em até 18 metros de profundidade, reconhecida em centenas de países.",
        },
        {
          question: "A certificação de mergulho tem validade ou anuidade?",
          answer:
            "A certificação PADI não expira e não possui anuidade obrigatória. Recomendamos manter-se ativo e, após períodos longos sem mergulhar, fazer um programa de reciclagem ou mergulhos orientados com profissional.",
        },
        {
          question: "Não sei nadar, posso fazer o curso?",
          answer:
            "Sim, desde que esteja confortável na água. Saber nadar ajuda, mas o essencial é não ter medo de colocar o rosto na água e seguir as orientações dos instrutores nas aulas de piscina, EviLago e mar.",
        },
        {
          question: "Com uma profundidade limite de 18 metros, consigo fazer um bom mergulho?",
          answer:
            "Com certeza. A maior parte dos mergulhos recreativos acontece entre 8 e 18 metros, onde há mais luz, vida marinha e tempo de fundo. É a profundidade ideal para explorar recifes, naufrágios rasos e costões com segurança.",
        },
        {
          question: "Depois de certificado, como faço para mergulhar?",
          answer:
            "Você pode mergulhar com um buddy certificado em centros PADI pelo mundo, participar de viagens e day trips da Evidive, alugar equipamentos em dive centers e continuar sua formação com cursos avançados e especialidades.",
        },
      ],
    },
  ],
};
