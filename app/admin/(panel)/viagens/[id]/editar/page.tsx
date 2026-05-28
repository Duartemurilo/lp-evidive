import { LoadingState } from "@/components/admin/loading-state";
import { TripFormWizard } from "@/components/admin/trips/trip-form/trip-form-wizard";
import type { ReactNode } from "react";
import { Suspense } from "react";

type EditTripPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditTripPage({
  params,
}: EditTripPageProps): Promise<ReactNode> {
  const { id } = await params;
  return (
    <Suspense fallback={<LoadingState label="Carregando formulário..." />}>
      <TripFormWizard mode="edit" tripId={id} />
    </Suspense>
  );
}
