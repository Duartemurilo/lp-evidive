import { LoadingState } from "@/components/admin/loading-state";
import { TripsPageClient } from "@/components/admin/trips/trips-page-client";
import type { ReactNode } from "react";
import { Suspense } from "react";

export default function AdminTripsPage(): ReactNode {
  return (
    <Suspense fallback={<LoadingState label="Carregando painel..." />}>
      <TripsPageClient />
    </Suspense>
  );
}
