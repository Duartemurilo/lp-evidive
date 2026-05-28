import { TripPagePreviewPageClient } from "@/components/admin/trips/trip-form/trip-page-preview-page-client";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Prévia da viagem | Admin EviDive",
  robots: { index: false, follow: false },
};

export default function TripPreviewPage(): ReactNode {
  return <TripPagePreviewPageClient />;
}
