import type { ViagemTripPageContent } from "@/lib/types/viagem-trip-page";

export const enterpriseTripPage: ViagemTripPageContent = {
  slug: "enterprise",
  title: "Enterprise – RJ",
  scopeLabel: "Nacional",
  metaDescription:
    "Liveaboard no catamarã Atlantis Enterprise com a Evidive: até 7 mergulhos no fim de semana entre Paraty e Ilha Grande, alimentação e hospedagem a bordo.",
  intro: {
    lead: "Que tal fazer uma viagem de mergulho no Enterprise?",
    paragraphs: [
      "A Evidive é uma escola de mergulho que organiza saídas de mergulho a partir de São Paulo para o litoral do Rio de Janeiro, incluindo Angra dos Reis e Ilha Grande.",
      "Nossas saídas oferecem total flexibilidade quanto ao transporte e hospedagem — você pode nos encontrar diretamente no ponto de encontro da nossa saída para o mar.",
    ],
    ctaLabel: "Saiba mais: incluído, preços e datas",
    ctaHref: "#pacote",
  },
  highlight: {
    title: "Mini cruzeiro – Live Aboard Enterprise",
    paragraphs: [
      "O programa inclui 4 mergulhos no sábado e 3 no domingo. Nos intervalos de superfície, a alimentação preparada por nossa equipe é um show à parte.",
      "Aproveite esses momentos para relaxar no solarium, recarregar as baterias (suas e do equipamento fotográfico) e apreciar a brisa!",
      "Todas as cabines têm banheiro próprio com chuveiro quente e ar-condicionado individual.",
    ],
  },
  whyDive: {
    title: "Por que viajar com o Enterprise?",
    paragraphs: [
      "Aos finais de semana, o catamarã Atlantis Enterprise deixa a cidade de Paraty/RJ rumo à Ilha Grande, deixando para trás uma bela e exclusiva vista e pela frente a expectativa de ótimos mergulhos.",
      "O passeio oferece aos mergulhadores e simpatizantes uma experiência de liveaboard com muito conforto. Já no sábado pela manhã, prepare-se para tomar o café da manhã na varanda de frente para Ilha Grande/RJ — aqui são feitos os primeiros mergulhos.",
    ],
  },
  audiences: {
    title: "Para quem é esta viagem",
    whatsappCta: "Fale agora com nosso time sobre preços e datas",
    items: [
      {
        title: "Mergulhadores certificados",
        description:
          "Já é um mergulhador certificado e quer uma turma para mergulhar em Angra dos Reis e Ilha Grande? Disponibilizamos instrutores e divemasters que vão acompanhar o seu mergulho!",
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
      "O embarque é em Paraty/RJ na sexta-feira, a partir das 20h. Nossa equipe orienta o melhor deslocamento a partir de São Paulo ou do Rio de Janeiro conforme sua origem.",
    ],
  },
  package: {
    id: "pacote",
    title: "O que está incluso?",
    intro: "Confira o que está incluso e o que não está no programa liveaboard:",
    included: [
      "Até 7 mergulhos",
      "Alimentação",
      "Bebidas não alcoólicas",
      "Lastro",
      "Cilindros",
    ],
    excluded: [
      "Jantar na noite do embarque",
      "Equipamento de mergulho (colete, regulador, roupa, máscara, nadadeiras, snorkel, lanterna)",
      "Bebidas alcoólicas (venda a bordo)",
    ],
    excludedTitle: "O que não está incluso",
    priceLabel: "Consulte valores e datas",
    priceNote: "Fale com nosso time para reservar sua vaga no Enterprise.",
  },
  accommodation: {
    title: "Atlantis Enterprise",
    paragraphs: [
      "Todas as cabines têm banheiro próprio com chuveiro quente e ar-condicionado individual.",
      "Experiência de liveaboard com conforto, solarium e refeições preparadas a bordo entre um mergulho e outro.",
    ],
  },
  dives: {
    title: "Mergulhos e programação",
    paragraphs: [
      "O programa inclui 4 mergulhos no sábado e 3 no domingo, com pontos escolhidos conforme visibilidade, conforto e segurança.",
    ],
    schedule: [
      {
        day: "Sexta-feira",
        description: "Embarque a partir das 20h em Paraty.",
      },
      {
        day: "Sábado",
        description:
          "Navegação para Ilha Grande; café da manhã; 2 mergulhos; almoço; 1 mergulho; jantar; 1 mergulho noturno.",
      },
      {
        day: "Domingo",
        description:
          "Café da manhã; 3 mergulhos; navegação para Paraty; almoço; término dos nossos serviços.",
      },
    ],
  },
  relatedTripSlugs: ["fernando-de-noronha", "paraty", "buzios"],
};
