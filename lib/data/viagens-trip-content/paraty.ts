import type { ViagemTripPageContent } from "@/lib/types/viagem-trip-page";

export const paratyTripPage: ViagemTripPageContent = {
  slug: "paraty",
  title: "Paraty – RJ",
  scopeLabel: "Nacional",
  metaDescription:
    "Saída de mergulho em Paraty com a Evidive: 4 mergulhos no fim de semana, encontro na Marina do Engenho Amyr Klink e flexibilidade de transporte.",
  intro: {
    lead: "Venha fazer uma viagem de mergulho inesquecível em Paraty!",
    paragraphs: [
      "A Evidive é uma escola de mergulho que realiza saídas de mergulho com destino Paraty.",
      "Nossas saídas oferecem total flexibilidade quanto ao transporte e hospedagem — você nos encontra diretamente na Marina do Engenho Amyr Klink, em Paraty.",
    ],
    ctaLabel: "Saiba mais: incluído, preços e datas",
    ctaHref: "#pacote",
  },
  highlight: {
    title: "Venha mergulhar em Paraty com a EVIDIVE!",
    paragraphs: [
      "São 4 mergulhos em um fim de semana (2 no sábado e 2 no domingo), com barco, cilindro, staff e lanche inclusos. Os equipamentos são locados por dia.",
      "Paraty é um dos principais destinos de mergulho do Brasil, com condições de temperatura, clima e vida marinha capazes de agradar até o mergulhador mais exigente!",
    ],
  },
  whyDive: {
    title: "Por que mergulhar em Paraty?",
    subtitle: "Curso Básico de Mergulho com Cilindro",
    paragraphs: [
      "Paraty é um dos principais destinos de mergulho do Brasil.",
      "O mar calmo faz da região um grande atrativo para mergulhadores iniciantes e, ao mesmo tempo, a diversidade de pontos de mergulho e de atrações transformam Paraty em um paraíso para mergulhadores mais experientes.",
      "Paraty conta com uma vida marinha cheia de boas surpresas e formações rochosas bem diversificadas. Quem é apaixonado por natureza e por mergulho não pode deixar de conhecer!",
    ],
  },
  audiences: {
    title: "Para quem é esta viagem",
    items: [
      {
        title: "Mergulhadores certificados",
        description:
          "Já é um mergulhador certificado e quer uma turma para mergulhar em Paraty? Disponibilizamos instrutores e divemasters que vão acompanhar o seu mergulho!",
        bullets: [
          "Você paga pela saída de mergulho + locação dos equipamentos",
          "Cilindro, lastros e lanche inclusos",
        ],
      },
      {
        title: "Não certificados",
        description:
          "Pessoas sem certificação também podem mergulhar realizando uma experiência de mergulho (Batismo ou Discovery) com acompanhamento de um instrutor dedicado. A experiência tem duração de 25 a 40 minutos.",
        bullets: [
          "Você paga por um mergulho acompanhado",
          "Equipamento e lanche inclusos",
        ],
      },
      {
        title: "Acompanhantes",
        description:
          "Não quer ou ainda não se sente confortável para realizar um mergulho? Tudo bem! Você pode só acompanhar nossa operação, fazer um passeio e curtir a paisagem. Aproveite as paradas e realize também o snorkeling.",
        bullets: [
          "Pague apenas pelo passeio",
          "Máscara, snorkel e nadadeiras inclusos",
          "Lanche incluso",
        ],
      },
    ],
  },
  travel: {
    title: "Como chegar em Paraty",
    paragraphs: [
      "Você tem total flexibilidade de escolha no transporte!",
      "De ônibus, a viagem dura cerca de 4 horas, saindo de São Paulo. Na Rodoviária do Tietê, são oferecidas diversas opções.",
      "Se preferir, você pode ir com seu próprio carro!",
      "Uma vez em Paraty, passaremos um fim de semana incrível com uma turma formada por mergulhadores, alunos, instrutores, divemasters e acompanhantes. Trabalhamos para construir uma viagem divertida e confortável.",
    ],
  },
  dives: {
    title: "Mergulhos em Paraty",
    paragraphs: [
      "São 4 mergulhos em um fim de semana (2 no sábado e 2 no domingo), com barco, cilindro, staff e lanche inclusos. Os equipamentos são locados por dia.",
      "Trabalhamos em parceria com as melhores operadoras de mergulho de Paraty para escolher os pontos com a melhor visibilidade, conforto e segurança.",
    ],
  },
  package: {
    id: "pacote",
    placement: "afterDives",
    title: "O que está incluso na saída",
    locationLabel: "Paraty – RJ",
    included: [
      "4 mergulhos no fim de semana",
      "Barco, cilindro, staff e lanche inclusos",
    ],
    excluded: ["Locação de equipamentos à parte"],
    excludedTitle: "À parte",
    priceLabel: "Consulte valores e datas",
    priceNote: "Fale com nosso time para montar sua saída.",
  },
  relatedTripSlugs: ["laje-de-santos", "enterprise", "buzios"],
};
