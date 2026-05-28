"use client";

import { ViagemDetailHero } from "@/components/viagens/detail/viagem-detail-hero";
import { ViagemDetailPageSections } from "@/components/viagens/detail/viagem-detail-page-sections";
import { formatTripFormDatePreview } from "@/lib/trips/format";
import type { TripFormValues } from "@/lib/types/trip-admin";
import { buildViagemWhatsAppUrl } from "@/lib/viagens-whatsapp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";

type TripPagePreviewProps = {
  values: TripFormValues;
  variant?: "embedded" | "page";
  previewImages?: {
    heroImageUrl?: string | null;
    sectionImageUrlsById?: Record<string, string>;
  };
};

export function TripPagePreview({
  values,
  variant = "page",
  previewImages,
}: TripPagePreviewProps): ReactNode {
  const heroImageUrl = previewImages?.heroImageUrl ?? values.heroImageUrl;
  const sections = values.pageSections.map((section) => ({
    ...section,
    imageUrl: previewImages?.sectionImageUrlsById?.[section.id] ?? section.imageUrl,
  }));

  const hasContent =
    values.title.trim() ||
    Boolean(heroImageUrl?.trim()) ||
    sections.some((section) => section.title.trim() || section.subtitle.trim());

  if (!hasContent) {
    return (
      <Box sx={{ py: 8, px: 3, textAlign: "center", bgcolor: "#f7f2ec" }}>
        <Typography variant="body1" color="text.secondary">
          Preencha os campos da viagem para visualizar a página.
        </Typography>
      </Box>
    );
  }

  const scopeLabel = values.category === "nacional" ? "Nacional" : "Internacional";
  const heroVariant = variant === "embedded" ? "embedded" : "page";
  const dateLine = formatTripFormDatePreview({
    startDate: values.startDate,
    endDate: values.endDate,
  });
  const whatsappHref =
    values.slug.trim() && values.title.trim()
      ? buildViagemWhatsAppUrl({
          title: values.title.trim(),
          slug: values.slug.trim(),
          scopeLabel,
          startDate: values.startDate,
          endDate: values.endDate,
        })
      : null;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <ViagemDetailHero
        title={values.title || "Título da viagem"}
        scopeLabel={scopeLabel}
        backgroundImageUrl={heroImageUrl}
        variant={heroVariant}
        dateLine={dateLine}
        ctaHref={whatsappHref}
      />
      <ViagemDetailPageSections sections={sections} />
    </Box>
  );
}
