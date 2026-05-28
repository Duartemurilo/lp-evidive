import { TripFormWizard } from "@/components/admin/trips/trip-form/trip-form-wizard";
import type { ReactNode } from "react";

export default function NewTripPage(): ReactNode {
  return <TripFormWizard mode="create" />;
}
