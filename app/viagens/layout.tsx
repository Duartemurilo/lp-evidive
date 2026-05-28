import { ViagensScrollToTop } from "@/components/viagens/viagens-scroll-to-top";
import { ViagensSiteFrame } from "@/components/viagens/viagens-site-frame";
import type { ReactNode } from "react";

export default function ViagensLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <div className="viagens-page relative">
      <ViagensScrollToTop />
      <ViagensSiteFrame />
      {children}
    </div>
  );
}
