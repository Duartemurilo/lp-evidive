import type { ViagemTripPageContent } from "@/lib/types/viagem-trip-page";

export const bonaireTripPage: ViagemTripPageContent = {
  slug: "bonaire",
  title: "Bonaire – Caribe",
  scopeLabel: "Internacional",
  metaDescription:
    "Viagem internacional de mergulho em Bonaire com a Evidive: 7 noites, shore dive ilimitado, nitrox, hotel Buddy Dive e voo desde Guarulhos.",
  intro: {
    lead: "Venha fazer uma viagem de mergulho na ilha de Bonaire!",
    paragraphs: [
      "Mergulhe em águas internacionais e descubra uma nova cultura. Crie novas memórias e amizades ao lado da nossa equipe e outros apaixonados por mergulho!",
    ],
    ctaLabel: "Saiba mais: incluído, preços e datas",
    ctaHref: "#pacote",
  },
  highlight: {
    title: "Como vai funcionar?",
    paragraphs: [
      "Bonaire é uma pequena e deslumbrante ilha situada no mar do Caribe, a poucos quilômetros da costa da Venezuela. Conhecida por uma linda costa repleta de recifes, abriga extensa vida marinha e fauna tropical rodeada de praias, lagoas, cavernas e montanhas.",
      "Você poderá visitar esse paraíso tropical fora do país junto com a Evidive! Prepare-se para muito sol, diversão e mergulhos incríveis em uma viagem internacional inesquecível!",
    ],
  },
  package: {
    id: "pacote",
    title: "O que está incluso?",
    intro: "Confira o que está incluso e o que não está no pacote para Bonaire:",
    included: [
      "Parte aérea com Avianca Internacional / Copa Airlines desde Guarulhos — 1 bagagem de até 23 kg para despachar + 1 bagagem de mão de até 10 kg",
      "Traslado de chegada e saída em Bonaire",
      "07 noites de acomodação no Hotel Buddy Dive Bonaire — estilo apartamento, 2 quartos, quatro pessoas por acomodação",
      "Café da manhã",
      "Locação de uma pick-up truck com seguro CDW e km livre — 1 para cada 4 mergulhadores",
      "06 dias de mergulhos ilimitados de praia (shore dive)",
      "Nitrox free",
      "Imposto governo — IRRF — 6,38%",
      "Seguro viagem e bagagem",
      "Taxas hoteleiras",
    ],
    excluded: [
      "Taxa de conexão aeroporto Curaçao",
      "Parque Marinho de Bonaire",
    ],
    excludedTitle: "Não incluso",
    priceLabel: "Consulte valores e datas",
    priceNote: "Fale com nosso time sobre disponibilidade e documentação.",
  },
  important: {
    title: "Importante",
    items: [
      "É obrigatória a vacina contra febre amarela.",
      "Passaporte com validade mínima de 06 meses.",
    ],
  },
  relatedTripSlugs: ["laje-de-santos", "enterprise", "paraty"],
};
