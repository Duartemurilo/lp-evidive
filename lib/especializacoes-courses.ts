import type { FormacaoCourse } from "@/lib/formacao-courses";

export const especializacoesSectionId = "aperfeicoe-sua-tecnica";

export const especializacoesSectionHref = `#${especializacoesSectionId}`;

export const especializacoesPageHref =
  "https://www.evidive.com.br/ja-sou-mergulhador/";

export const especializacoesCourses: FormacaoCourse[] = [
  {
    id: "curso-avancado",
    duration: "O PRÓXIMO NÍVEL",
    title: "Curso Avançado de Mergulho",
    description:
      "Aprofunde sua experiência com novos ambientes, especialidades práticas e mais repertório técnico.",
    features: [],
    href: "https://www.evidive.com.br/ja-sou-mergulhador/",
    image: "/assets/hero/DCIM_101GOPRO_GOPR5836.JPG.png",
    featured: true,
  },
  {
    id: "performance-flutuabilidade",
    duration: "FUNDAÇÃO TÉCNICA",
    title: "Performance em Flutuabilidade",
    description:
      "A especialização que melhora tudo o que vem depois. Mais controle, foco e conforto absoluto no mergulho.",
    features: [],
    href: "https://www.evidive.com.br/ja-sou-mergulhador/",
    image: "/assets/hero/DCIM_100GOPRO_GOPR3378.JPG.png",
  },
  {
    id: "ar-enriquecido-nitrox",
    duration: "ESPECIALIDADE POPULAR",
    title: "Ar Enriquecido Nitrox",
    description:
      "Aumente seu tempo de fundo e reduza o cansaço. A especialidade indispensável para quem quer mergulhar mais.",
    features: [],
    href: "https://www.evidive.com.br/ja-sou-mergulhador/",
    image: "/assets/hero/POSTS_EVIDIVE (6).png",
  },
];
