export type FormacaoCourse = {
  id: string;
  duration: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  image: string;
  featured?: boolean;
};

export const formacaoPageHref =
  "https://www.evidive.com.br/quero-comecar-a-mergulhar/";

export const formacaoCourses: FormacaoCourse[] = [
  {
    id: "certificacao-rapida",
    duration: "1 fim de semana",
    title: "Certificação Rápida",
    description:
      "Para quem quer iniciar sua formação com uma proposta mais leve, prática e possível em um único fim de semana intensivo.",
    features: [
      "Menor carga horária inicial",
      "Rápido e objetivo para ganhar confiança",
      "Excelente base para futuros upgrades",
    ],
    href: "https://www.evidive.com.br/quero-comecar-a-mergulhar/",
    image: "/assets/hero/DCIM_101GOPRO_GOPR5892.JPG.png",
    featured: true,
  },
  {
    id: "certificacao-completa",
    duration: "2 finais de semana + saída Paraty",
    title: "Certificação Completa",
    description:
      "A formação mais robusta. Para quem deseja uma base impecável, independência total e possibilidades ilimitadas no oceano.",
    features: [
      "Formação completa com certificação livre",
      "Alto nível técnico e autonomia",
      "Acesso direto às especialidades globais",
    ],
    href: "https://www.evidive.com.br/quero-comecar-a-mergulhar/curso-basico-de-mergulho-com-cilindro/",
    image: "/assets/hero/DCIM_100GOPRO_GOPR3378.JPG.png",
  },
  {
    id: "especialidades",
    duration: "Sob medida",
    title: "Especialidades PADI",
    description:
      "Nitrox, flutuabilidade, mergulho profundo e muito mais. Evolua com trilhas pensadas para cada objetivo no oceano.",
    features: [
      "Certificações reconhecidas globalmente",
      "Instrutores experientes e acompanhamento próximo",
      "Integração com saídas e viagens Evidive",
    ],
    href: "https://www.evidive.com.br/ja-sou-mergulhador/",
    image: "/assets/hero/POSTS_EVIDIVE (7).png",
  },
];
