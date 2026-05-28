import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Níveis avançados · Evidive",
  description: "Trilhas e especializações para mergulhadores de nível avançado.",
  path: "/niveis-avancados",
  noIndex: true,
});

export default function NiveisAvancadosPage(): ReactNode {
  return (
    <main
      id="main-content"
      className="flex min-h-[70vh] flex-1 flex-col items-center justify-center px-6 py-24 text-center"
    >
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground md:text-xs">
        Em breve
      </p>
      <h1 className="font-display mt-4 max-w-lg text-[clamp(2rem,5vw,3rem)] font-bold italic tracking-[-0.03em] text-foreground">
        Níveis avançados
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Esta página está em construção. Enquanto isso, explore as especializações na
        landing.
      </p>
      <Link
        href="/#aperfeicoe-sua-tecnica"
        className="mt-8 inline-flex items-center rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
      >
        Voltar para especializações
      </Link>
    </main>
  );
}
