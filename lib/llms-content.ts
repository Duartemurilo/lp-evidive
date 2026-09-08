/**
 * Fonte única do resumo do site em markdown para modelos de linguagem e
 * agentes. Usada por `/llms.txt` e pela negociação `Accept: text/markdown`
 * da home (`/api/markdown`) — um teor só, para nunca divergir entre os dois
 * canais.
 *
 * Existe porque crawler de IA (GPTBot, ClaudeBot, PerplexityBot,
 * OAI-SearchBot) não executa JS: ele lê o HTML cru de uma landing cheia de
 * WebGL e animação e precisa deduzir o que a Evidive faz. Aqui a resposta
 * vem pronta e sem ambiguidade.
 *
 * Regra deste arquivo: só afirmação que já está escrita no site (mesma
 * copy usada nas páginas reais, ver `lib/*-config.ts`), nunca invenção.
 */

import { siteConfig } from "@/lib/metadata";
import { siteConfig as socialConfig } from "@/lib/config";

export function buildLlmsContent(): string {
  return `# ${siteConfig.name}

> ${siteConfig.description}

## O que é

A Evidive é um concept dive center localizado em Cotia, a cerca de 30 minutos
de São Paulo. É um hub imersivo de educação e comunidade de mergulho, com
piscina aquecida e o EviLago, um ambiente aquático imersivo construído em
container reaproveitado.

## Para quem é

Serve tanto quem nunca mergulhou (primeira experiência guiada, sem
certificação) quanto quem já mergulha e quer evoluir (cursos PADI,
especializações, carreira profissional e freedive).

## Páginas do site

- [Página inicial](${siteConfig.url}/) — visão geral da Evidive, primeiro
  mergulho (Emotion Dive) e formação.
- [Cursos](${siteConfig.url}/cursos) — Na Evidive, o mergulho não é apenas um
  esporte, é um passaporte para um novo mundo. Duas portas de entrada, duas
  intensidades, um único impacto.
- [Divemaster](${siteConfig.url}/divemaster) — transforma a experiência como
  mergulhador em liderança, supervisão, mentoria e presença profissional
  dentro do universo do mergulho.
- [Freedive](${siteConfig.url}/freedive) — mergulho sem cilindro, baseado em
  apneia, respiração, relaxamento e controle corporal; apresentado como
  experiência, técnica e evolução.
- [Viagens](${siteConfig.url}/viagens) — viagens de mergulho para destinos
  selecionados, com operação, logística e experiência pensadas para quem quer
  mergulhar melhor, com mais segurança e mais profundidade.
- [Política de Privacidade](${siteConfig.url}/politica-de-privacidade)

## Redes e contato

${Object.entries(socialConfig.social)
  .map(([label, url]) => `- ${label}: ${url}`)
  .join("\n")}
`;
}
