import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

/**
 * Só rotas públicas e indexáveis. `/niveis-avancados` tem `noIndex: true`
 * (ver `app/niveis-avancados/page.tsx`) e fica de fora de propósito: listar
 * no sitemap uma página que a própria `<meta name="robots">` pede pra não
 * indexar é o tipo de inconsistência que os crawlers penalizam.
 */
const ROUTES: readonly { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/cursos", changeFrequency: "weekly", priority: 0.9 },
  { path: "/divemaster", changeFrequency: "monthly", priority: 0.8 },
  { path: "/freedive", changeFrequency: "monthly", priority: 0.8 },
  { path: "/viagens", changeFrequency: "weekly", priority: 0.8 },
  { path: "/politica-de-privacidade", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
