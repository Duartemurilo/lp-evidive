/**
 * Destino da rewrite feita pelo `proxy.ts` quando o cliente pede
 * `Accept: text/markdown` (protocolo acceptmarkdown.com). Nunca é chamada
 * direto pelo navegador: o proxy que decide quando reescrever pra cá.
 *
 * Hoje só a home (`slug` vazio) tem markdown dedicado, reaproveitando a
 * mesma fonte do `/llms.txt`. Qualquer outro caminho recebe 404 honesto: a
 * página até pode existir em HTML, só não tem versão em markdown ainda.
 */

import { buildLlmsContent } from "@/lib/llms-content";
import { buildMarkdownNotFound } from "@/lib/markdown-not-found";
import { appendVaryAccept } from "@/lib/accept-negotiation";

export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug = [] } = await params;
  const isHome = slug.length === 0;

  if (!isHome) {
    const pathname = `/${slug.join("/")}`;
    const headers = new Headers({
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "no-store",
    });
    appendVaryAccept(headers);
    return new Response(buildMarkdownNotFound(pathname), { status: 404, headers });
  }

  const headers = new Headers({
    "Content-Type": "text/markdown; charset=utf-8",
    "Cache-Control": "public, max-age=0, s-maxage=86400",
  });
  appendVaryAccept(headers);
  return new Response(buildLlmsContent(), { headers });
}
