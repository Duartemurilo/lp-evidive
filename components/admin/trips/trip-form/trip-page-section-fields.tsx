"use client";

import {
  AdminImageUpload,
} from "@/components/admin/trips/trip-form/admin-image-upload";
import {
  TripFormField,
  TripFormTextField,
} from "@/components/admin/trips/trip-form/trip-form-field";
import {
  TRIP_PAGE_SECTION_TITLE_MAX_LENGTH,
  type TripPageSection,
} from "@/lib/types/trip-page-section";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import type { ReactNode } from "react";

function fieldError(
  fieldErrors: Record<string, string>,
  index: number,
  key: keyof TripPageSection,
): string | undefined {
  return fieldErrors[`pageSections.${index}.${key}`];
}

type TripPageSectionFieldsProps = {
  section: TripPageSection;
  index: number;
  fieldErrors: Record<string, string>;
  sectionImageFiles: Record<string, File | undefined>;
  sectionImagePreviewUrls: Record<string, string>;
  sectionImageErrors: Record<string, string | undefined>;
  imageVariant?: "default" | "compact";
  layout?: "default" | "edit";
  onChange: (patch: Partial<TripPageSection>) => void;
  onSectionImageFileChange: (file: File | null) => void;
  onSectionImageFileClear: () => void;
};

export function TripPageSectionFields({
  section,
  index,
  fieldErrors,
  sectionImageFiles,
  sectionImagePreviewUrls,
  sectionImageErrors,
  imageVariant = "default",
  layout = "default",
  onChange,
  onSectionImageFileChange,
  onSectionImageFileClear,
}: TripPageSectionFieldsProps): ReactNode {
  const isCompactImage = imageVariant === "compact";

  const titleField = (
    <TripFormTextField
      label="Título da seção"
      required
      placeholder="Ex.: Por que mergulhar em Fernando de Noronha?"
      value={section.title}
      error={Boolean(fieldError(fieldErrors, index, "title"))}
      helperText={
        fieldError(fieldErrors, index, "title") ||
        `Máximo de ${TRIP_PAGE_SECTION_TITLE_MAX_LENGTH} caracteres.`
      }
      onChange={(e) => onChange({ title: e.target.value })}
      slotProps={{
        htmlInput: { maxLength: TRIP_PAGE_SECTION_TITLE_MAX_LENGTH },
      }}
    />
  );

  const subtitleField = (
    <TripFormTextField
      label="Subtítulo"
      required
      multiline
      minRows={3}
      maxRows={6}
      placeholder="Texto principal desta seção."
      value={section.subtitle}
      error={Boolean(fieldError(fieldErrors, index, "subtitle"))}
      helperText={fieldError(fieldErrors, index, "subtitle")}
      onChange={(e) => onChange({ subtitle: e.target.value })}
      sx={{
        "& .MuiInputBase-inputMultiline": {
          maxHeight: 220,
          overflowY: "auto",
        },
      }}
    />
  );

  const imageField = (
    <TripFormField
      label="Imagem da seção"
      helperText={fieldError(fieldErrors, index, "imageUrl")}
      error={Boolean(fieldError(fieldErrors, index, "imageUrl"))}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: isCompactImage ? { xs: "100%", md: 360 } : "none",
        }}
      >
        <AdminImageUpload
          valueUrl={section.imageUrl}
          previewUrl={sectionImagePreviewUrls[section.id] ?? section.imageUrl}
          file={sectionImageFiles[section.id] ?? null}
          variant={imageVariant}
          onFileChange={onSectionImageFileChange}
          onValueUrlChange={(url) => {
            onChange({ imageUrl: url });
            if (!url) onSectionImageFileClear();
          }}
          {...(sectionImageErrors[section.id]
            ? { error: sectionImageErrors[section.id] as string }
            : {})}
        />
      </Box>
    </TripFormField>
  );

  const buttonToggleField = (
    <TripFormField label="Botão nesta seção">
      <FormControlLabel
        control={
          <Switch
            checked={section.hasButton}
            onChange={(e) =>
              onChange({
                hasButton: e.target.checked,
                buttonLabel: e.target.checked ? section.buttonLabel : null,
                buttonUrl: e.target.checked ? section.buttonUrl : null,
              })
            }
          />
        }
        label="Adicionar botão"
      />
    </TripFormField>
  );

  const buttonFields = section.hasButton ? (
    <Stack spacing={2}>
      <TripFormTextField
        label="Texto do botão"
        required
        placeholder="Ex.: Fale com a Evidive"
        value={section.buttonLabel ?? ""}
        error={Boolean(fieldError(fieldErrors, index, "buttonLabel"))}
        helperText={fieldError(fieldErrors, index, "buttonLabel")}
        onChange={(e) => onChange({ buttonLabel: e.target.value || null })}
      />
      <TripFormTextField
        label="URL do botão"
        required
        placeholder="https://wa.me/..."
        value={section.buttonUrl ?? ""}
        error={Boolean(fieldError(fieldErrors, index, "buttonUrl"))}
        helperText={fieldError(fieldErrors, index, "buttonUrl")}
        onChange={(e) => onChange({ buttonUrl: e.target.value || null })}
      />
    </Stack>
  ) : null;

  if (layout === "edit") {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "280px 1fr" },
          columnGap: { xs: 0, md: 3 },
          rowGap: 2,
          alignItems: { xs: "stretch", md: "flex-start" },
        }}
      >
        <Box sx={{ gridColumn: { xs: "1 / -1", md: "1 / 2" } }}>{imageField}</Box>

        <Stack
          spacing={2}
          sx={{
            gridColumn: { xs: "1 / -1", md: "2 / 3" },
            minWidth: 0,
          }}
        >
          {titleField}
          {buttonToggleField}
          {buttonFields}
        </Stack>

        <Box sx={{ gridColumn: "1 / -1" }}>{subtitleField}</Box>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {titleField}
      {subtitleField}
      {imageField}
      {buttonToggleField}
      {buttonFields}
    </Stack>
  );
}
