import type { FormacaoCourse } from "@/lib/formacao-courses";

export const especializacoesSectionId = "aperfeicoe-sua-tecnica";

export const especializacoesSectionHref = `#${especializacoesSectionId}`;

export const especializacoesPageHref =
  "/cursos#cursos-category-carreira";

export const especializacoesCourses: FormacaoCourse[] = [
  {
    id: "resgate",
    duration: "Especializacao avancada",
    title: "Resgate",
    description:
      "Aprenda prevencao, resposta a emergencias e lideranca na agua com o curso PADI Rescue Diver, um divisor de aguas na sua evolucao.",
    features: [
      "Formacao focada em seguranca e resolucao de problemas",
      "Tecnicas praticas para apoiar seu dupla em situacoes reais",
      "Curso desafiador e recompensador para quem quer evoluir",
    ],
    href: "/cursos/resgate",
    image: "/backgrounds/hero-cursos-exploracao-submarina.png",
    featured: true,
  },
  {
    id: "padi-divemaster",
    duration: "Carreira profissional",
    title: "PADI Divemaster",
    description:
      "Entre no nivel profissional do mergulho e desenvolva habilidades de lideranca para supervisionar atividades e apoiar instrutores.",
    features: [
      "Primeiro passo oficial para atuar profissionalmente",
      "Treinamento pratico em organizacao, conducao e suporte",
      "Base completa para seguir rumo a carreira de instrutor",
    ],
    href: "/cursos/padi-divemaster",
    image: "/backgrounds/hero-cursos-exploracao-submarina.png",
  },
  {
    id: "nitrox",
    duration: "Especialidade em 1 dia",
    title: "NITROX",
    description:
      "Aprenda a mergulhar com ar enriquecido para ampliar seu tempo de fundo e ganhar mais eficiência em mergulhos recreativos.",
    features: [
      "Curso mais popular de especialidade da PADI",
      "Planejamento com nitrox e análise de cilindros",
      "Mais autonomia para explorar melhor cada mergulho",
    ],
    href: "/cursos/nitrox",
    image: "/backgrounds/hero-cursos-exploracao-submarina.png",
  },
];
