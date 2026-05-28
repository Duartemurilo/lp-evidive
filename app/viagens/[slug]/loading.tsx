import { ViagemDetailLoading } from "@/components/viagens/detail/viagem-detail-loading";
import type { ReactNode } from "react";

export default function ViagemDetailRouteLoading(): ReactNode {
  return (
    <main id="main-content" className="flex-1">
      <ViagemDetailLoading />
    </main>
  );
}
