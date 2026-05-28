import { CursosScrollToTop } from "@/components/cursos/cursos-scroll-to-top";
import { CursosSiteFrame } from "@/components/cursos/cursos-site-frame";
import type { ReactNode } from "react";

export default function CursosLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <div className="cursos-page relative">
      <CursosScrollToTop />
      <CursosSiteFrame />
      {children}
    </div>
  );
}
