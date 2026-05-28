import type { ViagemTripPageContent } from "@/lib/types/viagem-trip-page";

export const lajeDeSantosTripPage: ViagemTripPageContent = {
  slug: "laje-de-santos",
  title: "Laje de Santos – SP",
  scopeLabel: "Nacional",
  metaDescription:
    "Saída de mergulho na Laje de Santos com a Evidive: Pedra Mágica do litoral paulista, pontos 4 e 5 estrelas, para mergulhadores certificados.",
  intro: {
    lead: "Venha fazer uma viagem de mergulho inesquecível na Laje de Santos",
    paragraphs: [
      "A Evidive é uma escola de mergulho que realiza saídas de mergulho para Laje de Santos.",
      "Nossas saídas oferecem total flexibilidade quanto ao transporte e hospedagem — você nos encontra diretamente na Marina de São Vicente.",
    ],
    ctaLabel: "Saiba mais: incluído, preços e datas",
    ctaHref: "#publico-alvo",
  },
  highlight: {
    title: "Mergulhe na Laje de Santos com a Evidive",
    paragraphs: [
      "Também conhecida como a “Pedra Mágica”, a Laje de Santos é um dos destinos mais celebrados do litoral paulista para quem já é mergulhador certificado.",
      "Um dia de mergulho neste local pode significar a certeza da paixão pela atividade.",
    ],
  },
  whyDive: {
    title: "Por que mergulhar na Laje de Santos?",
    paragraphs: [
      "Não é exagero citar esse lugar como o paraíso do nosso litoral paulista: é um ponto de mergulho classificado como 4 e 5 estrelas, com flora e fauna marinhas abundantes durante todo o ano, além de perfis de mergulho variados.",
      "A Laje de Santos oferece condições ideais para mergulhadores que buscam biodiversidade, boa visibilidade e experiências memoráveis em águas do litoral de São Paulo.",
    ],
    whatsappCta: "Fale agora com nosso time sobre preços e datas",
  },
  audiences: {
    id: "publico-alvo",
    title: "Apenas para mergulhadores certificados",
    items: [
      {
        title: "Mergulhadores certificados",
        description:
          "Já é um mergulhador certificado e quer uma turma para mergulhar na Laje de Santos? Disponibilizamos instrutores e divemasters que vão acompanhar o seu mergulho!",
        bullets: [
          "Você paga pela saída de mergulho + locação dos equipamentos",
          "Cilindro, lastros e lanche inclusos",
        ],
      },
    ],
  },
  relatedTripSlugs: ["paraty", "fernando-de-noronha", "ilha-grande"],
};
