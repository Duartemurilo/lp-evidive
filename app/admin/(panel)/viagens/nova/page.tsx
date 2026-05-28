import { LoadingState } from "@/components/admin/loading-state";
import { TripFormWizard } from "@/components/admin/trips/trip-form/trip-form-wizard";
import type { ReactNode } from "react";
import { Suspense } from "react";

export default function NewTripPage(): ReactNode {
  return (
    <Suspense fallback={<LoadingState label="Carregando formulário..." />}>
      <TripFormWizard mode="create" />
    </Suspense>
  );
}
