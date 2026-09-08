import { siteConfig } from "@/lib/config";
import { siteConfig as metaConfig } from "@/lib/metadata";
import { EVIDIVE_WHATSAPP_PHONE } from "@/lib/whatsapp";
import type { ReactNode } from "react";

/**
 * Dados estruturados (schema.org/Organization) na home. Ajuda uma busca pelo
 * nome da marca ("Evidive") a resolver pro domínio certo e a mostrar logo,
 * telefone e redes direto no resultado — em vez de depender só de meta tags,
 * que motor de busca trata como sugestão, não como fato estruturado.
 *
 * Só afirmação que já está no site (mesmos dados de `lib/config.ts` e
 * `lib/whatsapp.ts`, cidade citada em `lib/formacao-courses.ts`): sem
 * endereço completo inventado, porque o site não publica um.
 */
export function OrganizationSchema(): ReactNode {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: metaConfig.name,
    alternateName: siteConfig.tagline,
    url: metaConfig.url,
    logo: `${metaConfig.url}/icon.png`,
    description: metaConfig.description,
    telephone: `+${EVIDIVE_WHATSAPP_PHONE}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cotia",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    sameAs: Object.values(siteConfig.social),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
