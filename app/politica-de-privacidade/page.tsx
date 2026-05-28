import { LegalDocumentPage } from "@/components/legal/legal-document-page";
import { politicaPrivacidadeSections } from "@/lib/politica-privacidade-content";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Política de Privacidade",
  description:
    "Política de Privacidade e Segurança da Evidive Escola de Mergulho — coleta, uso, guarda e proteção dos seus dados pessoais.",
  path: "/politica-de-privacidade",
});

export default function PoliticaDePrivacidadePage(): ReactNode {
  return (
    <LegalDocumentPage
      title="Política de"
      display="Privacidade"
      sections={politicaPrivacidadeSections}
    />
  );
}
