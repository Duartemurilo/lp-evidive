import { TripFormWizard } from "@/components/admin/trips/trip-form/trip-form-wizard";
import type { ReactNode } from "react";

type EditTripPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditTripPage({
  params,
}: EditTripPageProps): Promise<ReactNode> {
  const { id } = await params;
  return <TripFormWizard mode="edit" tripId={id} />;
}
