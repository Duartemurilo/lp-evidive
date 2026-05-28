import type { ViagemTripPageContent } from "@/lib/types/viagem-trip-page";

export const ilhaGrandeTripPage: ViagemTripPageContent = {
  slug: "ilha-grande",
  title: "Ilha Grande – RJ",
  scopeLabel: "Nacional",
  metaDescription:
    "Viagem de mergulho em Ilha Grande e Angra dos Reis com a Evidive: 4 mergulhos no fim de semana, Pousada Nautilus e flexibilidade de transporte e hospedagem.",
  intro: {
    lead: "Que tal fazer uma viagem de mergulho para Ilha Grande?",
    paragraphs: [
      "A Evidive é uma escola de mergulho que organiza saídas de mergulho a partir de São Paulo para o litoral do Rio de Janeiro, incluindo Angra dos Reis e Ilha Grande.",
      "Nossas saídas oferecem total flexibilidade quanto ao transporte e hospedagem — você pode nos encontrar diretamente no ponto de encontro da nossa saída para o mar.",
    ],
    ctaLabel: "Saiba mais: incluído, preços e datas",
    ctaHref: "#pacote",
  },
  whyDive: {
    title: "Por que mergulhar em Ilha Grande?",
    paragraphs: [
      "Muita diversão, sol e paisagens de cinema — assim é a baía da Ilha Grande, um paraíso na Costa Verde entre Rio de Janeiro e São Paulo. São inúmeras ilhas, baías e praias cobiçadas internacionalmente por suas belezas naturais. A Ilha Grande é a maior das ilhas e a maior ilha costeira da região Sudeste do Brasil.",
      "Ficaremos na Pousada Nautilus, que oferece uma posição excepcional para visitar os melhores pontos de mergulho, além de mergulhos a partir de sua praia ou do deck.",
      "Referência na piscicultura da região, a pousada não deixa nada a desejar na gastronomia, tanto nas refeições inclusas quanto nos petiscos.",
      "As saídas de barco são imperdíveis. Os locais mais visitados incluem Lagoa Azul, Lagoa Verde, Laje Branca, Pinguino, entre uma infinidade de locais excelentes para a prática do mergulho.",
    ],
  },
  audiences: {
    title: "Para quem é esta viagem",
    items: [
      {
        title: "Mergulhadores certificados",
        description:
          "Já é um mergulhador certificado e quer uma turma para mergulhar em Ilha Grande? Disponibilizamos instrutores e divemasters que vão acompanhar o seu mergulho!",
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
    title: "Como chegar em Ilha Grande",
    paragraphs: [
      "A distância de São Paulo até Angra dos Reis é de cerca de 400 km. Você pode realizar esta viagem de ônibus leito em aproximadamente 7h30, com saídas frequentes pela Rodoviária do Tietê, ou de carro em cerca de 6 horas. Chegando em Angra, deve ser feita a travessia até a Ilha Grande de barco.",
      "A turma de viajantes será composta por mergulhadores, alunos, instrutores, divemasters e acompanhantes. Enquanto alguns estarão realizando seus primeiros mergulhos, outros já são mais experientes — essa mistura garante boas conversas e amizades!",
    ],
  },
  accommodation: {
    title: "Nossa hospedagem em Ilha Grande",
    subtitle: "Pousada Nautilus",
    paragraphs: [
      "Ficaremos na Pousada Nautilus, que oferece uma posição excepcional para visitar os melhores pontos de mergulho, além de mergulhos a partir de sua praia ou do deck.",
      "Porém, você terá total flexibilidade para se hospedar onde preferir em Angra dos Reis ou na Ilha Grande, podendo nos encontrar direto no ponto de encontro da nossa saída para o mar no horário acordado.",
      "Nosso ponto de encontro será na Ilha Grande — é lá que pegamos o barco rumo aos melhores pontos de mergulho de Angra dos Reis.",
    ],
  },
  dives: {
    title: "Mergulhos em Ilha Grande",
    paragraphs: [
      "São 4 mergulhos em um fim de semana, com barco, cilindro, staff e lanche inclusos. Os equipamentos são locados por dia.",
      "Trabalharemos em parceria com as melhores operadoras de mergulho de Angra para escolher os pontos de mergulho com a melhor visibilidade, conforto e segurança — e claro, a diversão e a apreciação da natureza que encontramos em um mergulho em Angra dos Reis.",
    ],
  },
  package: {
    id: "pacote",
    placement: "afterDives",
    title: "O que está incluso na saída",
    locationLabel: "Ilha Grande – RJ",
    included: [
      "4 mergulhos no fim de semana",
      "Barco, cilindro, staff e lanche inclusos",
    ],
    excluded: ["Locação de equipamentos à parte"],
    excludedTitle: "À parte",
    priceLabel: "Consulte valores e datas",
    priceNote: "Fale com nosso time para montar sua saída.",
  },
  relatedTripSlugs: ["bonaire", "paraty", "fernando-de-noronha"],
};
