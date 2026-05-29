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

export const formacaoPageHref = "/cursos#cursos-category-iniciante";

export const formacaoCourses: FormacaoCourse[] = [
  {
    id: "emotion-dive",
    duration: "Primeira experiência",
    title: "Emotion Dive",
    description:
      "Viva seu primeiro mergulho com cilindro em Cotia, com briefing prático, adaptação na piscina e experiência guiada no lago da Evidive.",
    features: [
      "Ideal para quem quer testar o mergulho antes da certificação",
      "Experiência completa com instrutor do início ao fim",
      "A apenas 30 minutos de Sao Paulo",
    ],
    href: "/cursos/emotion-dive",
    image: "/backgrounds/hero-cursos-exploracao-submarina.png",
    featured: true,
  },
  {
    id: "padi-scuba-diver",
    duration: "1 final de semana",
    title: "PADI Scuba Diver",
    description:
      "Conquiste sua certificacao PADI Scuba Diver com teoria, piscina e aguas abertas no EviLago para mergulhar com mais seguranca.",
    features: [
      "Certificacao internacional para mergulhos supervisionados",
      "Treino completo no Concept Dive Center",
      "Proximo passo para evoluir ao Open Water Diver",
    ],
    href: "/cursos/padi-scuba-diver",
    image: "/backgrounds/hero-cursos-exploracao-submarina.png",
  },
  {
    id: "curso-basico-de-mergulho-com-cilindro",
    duration: "2 finais de semana",
    title: "Curso Básico de Mergulho com Cilindro",
    description:
      "Faça a formação Open Water Diver com aulas teóricas, piscina, EviLago e saída no mar para construir base técnica completa.",
    features: [
      "Certificação internacional para mergulhar até 18m",
      "Treinamento completo no Concept Dive Center",
      "Saída em Paraty para concluir sua formação no mar",
    ],
    href: "/cursos/curso-basico-de-mergulho-com-cilindro",
    image: "/backgrounds/hero-cursos-exploracao-submarina.png",
  },
];
