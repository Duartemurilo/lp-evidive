/**
 * Corpo em markdown para um recurso sem versão negociável em
 * `Accept: text/markdown` — tanto o caminho que não existe quanto o caminho
 * que existe em HTML mas ainda não tem markdown dedicado. Os dois casos
 * recebem a mesma resposta honesta: 404 com links para onde procurar.
 *
 * Ver `app/api/markdown/[[...slug]]/route.ts` (quem devolve isso com status
 * 404) e `app/not-found.tsx` (a mesma orientação, para quem pede HTML).
 */

import { siteConfig } from "@/lib/metadata";

export function buildMarkdownNotFound(pathname: string): string {
  return `# Não encontrado

> \`${pathname}\` não existe, ou existe só em HTML (ainda sem versão em markdown).

- [Página inicial](${siteConfig.url}/)
- [Mapa do site](${siteConfig.url}/sitemap.xml)
- [Resumo do site para agentes](${siteConfig.url}/llms.txt)
`;
}
