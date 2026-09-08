import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { appendVaryAccept, preferredResponseType } from "@/lib/accept-negotiation";

const isAdminArea = createRouteMatcher(["/admin(.*)", "/api/admin(.*)", "/__clerk/(.*)"]);
const isPublicAdminRoute = createRouteMatcher(["/admin/login(.*)"]);
const isProtectedRoute = createRouteMatcher([
  "/admin(.*)",
  "/api/admin(.*)",
]);

/**
 * O wrapper do Clerk faz handshake/refresh de sessão a cada request que ele
 * processa, mesmo fora de `/admin` (visto na prática: virou redirect pro
 * `clerk.accounts.dev` em request sem cookie de dev-browser). Por isso ele só
 * roda pra área logada; páginas públicas passam direto pela função de baixo,
 * sem tocar em Clerk.
 */
const withClerk = clerkMiddleware(async (auth, req) => {
  if (isPublicAdminRoute(req)) {
    const { userId } = await auth();
    if (userId) {
      const dashboardUrl = new URL("/admin/viagens", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
  }
  if (isProtectedRoute(req)) {
    const loginUrl = new URL("/admin/login", req.url).toString();
    await auth.protect({
      unauthenticatedUrl: loginUrl,
      unauthorizedUrl: loginUrl,
    });
  }
  return NextResponse.next();
});

/**
 * Só rotas de PÁGINA pública participam da negociação `Accept: text/markdown`
 * (acceptmarkdown.com): `/api/*` são endpoints de verdade e qualquer caminho
 * com extensão de arquivo (`/robots.txt`, `/sitemap.xml`, imagens, o próprio
 * `/llms.txt`) já tem o Content-Type dele resolvido.
 */
function isEligibleForMarkdownNegotiation(pathname: string): boolean {
  if (pathname.startsWith("/api/")) return false;
  const lastSegment = pathname.split("/").pop() ?? "";
  return !lastSegment.includes(".");
}

export default async function proxy(req: NextRequest, event: NextFetchEvent) {
  if (isAdminArea(req)) {
    return withClerk(req, event);
  }

  const pathname = req.nextUrl.pathname;
  if (!isEligibleForMarkdownNegotiation(pathname)) {
    return NextResponse.next();
  }

  const acceptHeader = req.headers.get("accept");
  const chosen = preferredResponseType(acceptHeader);

  // Cliente pediu markdown: reescreve pro handler dedicado
  // (`app/api/markdown/[[...slug]]`), que devolve a versão em markdown da
  // home ou um 404 honesto com links pra sitemap/llms.txt.
  if (chosen === "text/markdown") {
    const url = req.nextUrl.clone();
    url.pathname = pathname === "/" ? "/api/markdown" : `/api/markdown${pathname}`;
    const rewritten = NextResponse.rewrite(url);
    appendVaryAccept(rewritten.headers);
    return rewritten;
  }

  // Accept presente mas não aceita nem html nem markdown: 406, como o
  // protocolo pede. Sem Accept (a imensa maioria do tráfego) ou com
  // Accept: text/html/*/*, `chosen` é "text/html" e cai no fluxo normal.
  if (chosen === null && acceptHeader) {
    return new Response("Not Acceptable\n\nFormatos aceitos: text/html, text/markdown\n", {
      status: 406,
      headers: { "Content-Type": "text/plain; charset=utf-8", Vary: "Accept" },
    });
  }

  const response = NextResponse.next();
  appendVaryAccept(response.headers);
  return response;
}

export const config = {
  matcher: ["/((?!_next/).*)"],
};
