import Link from "next/link";
import type { ReactNode } from "react";

/**
 * 404 global do site.
 *
 * Segue as diretrizes clássicas de mensagem de erro (NN/g e afins): diz em
 * linguagem simples o que aconteceu e oferece caminhos de volta concretos em
 * vez de um "volte para a home" solitário.
 *
 * A linha final (sitemap/llms.txt) é pro agente/crawler de IA, que não segue
 * os cards como uma pessoa seguiria — mesma orientação que a versão em
 * markdown deste 404 devolve pra quem pede `Accept: text/markdown`
 * (`lib/markdown-not-found.ts`).
 */
const DESTINATIONS = [
  {
    href: "/cursos",
    title: "Cursos",
    description:
      "Duas portas de entrada, duas intensidades, um único impacto: certificações PADI e formação.",
  },
  {
    href: "/freedive",
    title: "Freedive",
    description: "Mergulho sem cilindro, baseado em apneia, respiração e controle corporal.",
  },
  {
    href: "/divemaster",
    title: "Divemaster",
    description: "O primeiro passo para transformar sua experiência em carreira profissional.",
  },
  {
    href: "/viagens",
    title: "Viagens",
    description: "Expedições de mergulho para destinos selecionados, com operação completa.",
  },
] as const;

export default function NotFound(): ReactNode {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="w-full max-w-2xl">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Erro 404
        </p>
        <h1 className="font-display mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Essa página está fora d&apos;água.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          O endereço que você tentou acessar não existe, ou mudou de lugar.
          Nada de errado do seu lado, o link é que ficou pra trás.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="font-display bg-foreground group inline-flex items-center justify-center gap-3 rounded-md py-3 pr-3 pl-5 font-medium text-background transition-all duration-500 ease-out hover:rounded-[50px]"
          >
            Ir para a página inicial
          </Link>
        </div>

        <div className="mt-12 border-t border-border/50 pt-8 text-left">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Talvez você esteja procurando
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {DESTINATIONS.map((destination) => (
              <li key={destination.href}>
                <Link
                  href={destination.href}
                  className="block h-full rounded-2xl border border-border/50 bg-muted/50 px-4 py-4 transition-colors hover:bg-muted"
                >
                  <p className="font-display text-sm font-bold text-foreground">
                    {destination.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {destination.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-xs leading-5 text-muted-foreground/80">
          Para agentes e crawlers: mapa do site em{" "}
          <Link href="/sitemap.xml" className="underline underline-offset-2">
            /sitemap.xml
          </Link>{" "}
          e resumo em{" "}
          <Link href="/llms.txt" className="underline underline-offset-2">
            /llms.txt
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
