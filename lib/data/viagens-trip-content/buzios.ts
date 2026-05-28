import type { ViagemTripPageContent } from "@/lib/types/viagem-trip-page";

export const buziosTripPage: ViagemTripPageContent = {
  slug: "buzios",
  title: "Búzios – RJ",
  scopeLabel: "Nacional",
  metaDescription:
    "Saída de mergulho em Búzios com a Evidive: 4 mergulhos no fim de semana, barco, cilindro, staff e lanche inclusos. Flexibilidade de transporte e hospedagem.",
  intro: {
    lead: "Que tal fazer uma viagem de mergulho para Búzios no Rio de Janeiro?",
    paragraphs: [
      "A Evidive é uma escola de mergulho que organiza saídas de mergulho a partir de São Paulo e vai realizar uma saída de mergulho de 3 a 6 de junho para Búzios, no Rio de Janeiro.",
      "Nossas saídas oferecem total flexibilidade quanto ao transporte e hospedagem — você pode nos encontrar diretamente no ponto de encontro da nossa saída para o mar.",
    ],
    ctaLabel: "Saiba mais: incluído, preços e datas",
    ctaHref: "#pacote",
  },
  highlight: {
    title: "Mergulhe em Búzios com a Evidive!",
    paragraphs: [
      "São 4 mergulhos em um fim de semana (2 no sábado e 2 no domingo), com barco, cilindro, staff e lanche inclusos. Os equipamentos são locados por dia.",
      "Para mais informações, fale com nosso time pelo WhatsApp.",
    ],
  },
  whyDive: {
    title: "Por que mergulhar em Búzios?",
    paragraphs: [
      "Localizada na Região dos Lagos, no estado do Rio de Janeiro, Búzios é uma península de oito quilômetros de extensão, com mais de 20 praias compondo seu litoral.",
      "Apesar da vizinha Arraial do Cabo ser mais famosa para mergulho, Búzios tem algumas ilhas ricas em vida marinha, sendo a principal a Ilha da Âncora, que fica a 11 km da costa — cerca de 30 min do píer da Rua das Pedras.",
      "Lá você encontra vida marinha vasta e diversificada: grandes cardumes de peixes, tartarugas, raias, entre outros. Mergulhar lá é tudo de bom!",
    ],
  },
  audiences: {
    title: "Para quem é esta viagem",
    whatsappCta: "Fale agora com nosso time sobre preços e datas",
    items: [
      {
        title: "Mergulhadores certificados",
        description:
          "Já é um mergulhador certificado e quer uma turma para mergulhar em Búzios? Esta é a grande oportunidade. Disponibilizamos instrutores e divemasters que vão acompanhar seu mergulho!",
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
    title: "Como chegar de São Paulo até Búzios",
    paragraphs: [
      "A distância de São Paulo até Búzios é de cerca de 600 km. Você pode realizar esta viagem de ônibus leito em aproximadamente 10 horas, com saídas às sextas-feiras pela Rodoviária do Tietê, ou de carro em cerca de 7h30.",
      "A turma de viajantes será composta por mergulhadores, alunos, instrutores, divemasters e acompanhantes. Enquanto alguns estarão realizando seus primeiros mergulhos, outros já são mais experientes — essa mistura garante boas conversas e amizades!",
    ],
  },
  accommodation: {
    title: "Nossa hospedagem em Búzios",
    subtitle: "Aroma do Mar",
    paragraphs: [
      "Recomendamos o Aroma do Mar em Búzios — um hotel de design localizado em uma das principais ruas da cidade, com quartos delicadamente decorados para uma estadia de conforto e prazer.",
      "Porém, você terá total flexibilidade para se hospedar onde preferir em Búzios, podendo nos encontrar direto no ponto de encontro da nossa saída para o mar no horário acordado.",
    ],
  },
  dives: {
    title: "Mergulhos em Búzios",
    paragraphs: [
      "São 4 mergulhos em um fim de semana (2 no sábado e 2 no domingo), com barco, cilindro, staff e lanche inclusos. Os equipamentos são locados por dia.",
      "Trabalharemos em parceria com as melhores operadoras de mergulho de Búzios para escolher os pontos com a melhor visibilidade, conforto e segurança — e claro, a diversão e a apreciação da natureza que encontramos em um mergulho na Região dos Lagos.",
    ],
  },
  package: {
    id: "pacote",
    placement: "afterDives",
    title: "O que está incluso na saída",
    locationLabel: "Búzios – RJ",
    included: [
      "4 mergulhos no fim de semana",
      "Barco, cilindro, staff e lanche inclusos",
    ],
    excluded: ["Locação de equipamentos à parte"],
    excludedTitle: "À parte",
    priceLabel: "Consulte valores e datas",
    priceNote: "Fale com nosso time para montar sua saída.",
  },
  relatedTripSlugs: ["bonaire", "ilha-grande", "enterprise"],
};
