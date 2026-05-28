export type CursoCatalogItem = {
  slug: string;
  title: string;
  subtitle?: string;
  /** Destino alternativo (ex.: /divemaster). Sem valor → `/cursos/[slug]`. */
  href?: string;
};

export type CursoCatalogCategory = {
  id: string;
  title: string;
  courses: CursoCatalogItem[];
};

export const cursosCatalogCategories: CursoCatalogCategory[] = [
  {
    id: "iniciante",
    title: "Quero começar a mergulhar",
    courses: [
      {
        slug: "emotion-dive",
        title: "Emotion Dive",
        subtitle: "Primeira experiência de mergulho",
      },
      {
        slug: "curso-basico-de-mergulho-com-cilindro",
        title: "Curso básico de mergulho com cilindro",
      },
      { slug: "padi-scuba-diver", title: "PADI Scuba Diver" },
    ],
  },
  {
    id: "mergulhador",
    title: "Já sou mergulhador",
    courses: [
      { slug: "primeiros-socorros", title: "Primeiros Socorros" },
      { slug: "resgate", title: "Resgate" },
      { slug: "flutuabilidade", title: "Flutuabilidade" },
      { slug: "nitrox", title: "NITROX" },
      { slug: "camera-de-acao", title: "Câmera de Ação" },
    ],
  },
  {
    id: "carreira",
    title: "Carreira Profissional",
    courses: [
      {
        slug: "divemaster",
        title: "Divemaster",
        href: "/divemaster",
      },
      { slug: "padi-divemaster", title: "PADI Divemaster" },
    ],
  },
  {
    id: "mergulho-livre",
    title: "Mergulho livre",
    courses: [
      {
        slug: "mergulho-livre-basico",
        title: "Mergulho Livre Básico",
      },
    ],
  },
];

export const cursosCatalogFlat = cursosCatalogCategories.flatMap((category) =>
  category.courses.map((course) => ({
    ...course,
    categoryId: category.id,
    categoryTitle: category.title,
  })),
);
