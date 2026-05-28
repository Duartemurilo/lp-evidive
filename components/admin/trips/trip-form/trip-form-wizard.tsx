"use client";

import { AdminLayout } from "@/components/admin/admin-layout";
import { useAdminToast } from "@/components/admin/admin-toast-provider";
import { LoadingState } from "@/components/admin/loading-state";
import {
  AdminImageUpload,
} from "@/components/admin/trips/trip-form/admin-image-upload";
import { TripFormDateRange } from "@/components/admin/trips/trip-form/trip-form-date-range";
import { TripFormExperienceTypes } from "@/components/admin/trips/trip-form/trip-form-experience-types";
import {
  TripFormField,
  TripFormSelect,
  TripFormTextField,
} from "@/components/admin/trips/trip-form/trip-form-field";
import { TripPagePreviewDialog } from "@/components/admin/trips/trip-form/trip-page-preview-dialog";
import { TripPageSectionFields } from "@/components/admin/trips/trip-form/trip-page-section-fields";
import { TripPageSectionsEditor } from "@/components/admin/trips/trip-form/trip-page-sections-editor";
import {
  createAdminTrip,
  fetchAdminTrip,
  updateAdminTrip,
} from "@/lib/trips/api-client";
import { formatTripFormDatePreview } from "@/lib/trips/format";
import { formatTripExperienceTypesLabel } from "@/lib/trips/trip-experience-types";
import { recordToFormValues } from "@/lib/trips/trip-mappers";
import {
  EDIT_TRIP_FORM_STEPS,
  TRIP_FORM_STEPS,
  type TripFormStepId,
} from "@/lib/trips/trip-form-steps";
import { slugifyTitle } from "@/lib/trips/slug";
import {
  clearTripFormDraft,
  loadTripFormDraft,
  saveTripPreviewPayload,
  tripFormDraftMatchesRoute,
} from "@/lib/trips/trip-preview-storage";
import { useTripSlugAvailability } from "@/lib/hooks/use-trip-slug-availability";
import {
  getFirstTripFormStepWithErrors,
  isValidTripSlug,
  validateTripForm,
  validateTripFormStep,
  validateTripPageSectionAtIndex,
} from "@/lib/trips/trip-validation";
import { uploadAdminImage, validateAdminImageFile } from "@/lib/trips/upload-admin-image";
import {
  emptyTripFormValues,
  TRIP_CATEGORIES,
  TRIP_STATUSES,
  type TripFormValues,
} from "@/lib/types/trip-admin";
import {
  createEmptyTripPageSection,
  type TripPageSection,
} from "@/lib/types/trip-page-section";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import Alert from "@mui/material/Alert";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";

type TripFormWizardProps = {
  mode: "create" | "edit";
  tripId?: string;
};

const categoryOptions = TRIP_CATEGORIES.map((value) => ({
  value,
  label: value === "nacional" ? "Nacional" : "Internacional",
  flag: value === "nacional" ? "🇧🇷" : "🌍",
}));

const statusOptions = TRIP_STATUSES.map((value) => ({
  value,
  label:
    value === "rascunho"
      ? "Rascunho"
      : value === "publicado"
        ? "Publicado"
        : value === "esgotado"
          ? "Esgotado"
          : "Encerrado",
}));

const statusLabels: Record<TripFormValues["status"], string> = {
  rascunho: "Rascunho",
  publicado: "Publicado",
  esgotado: "Esgotado",
  encerrado: "Encerrado",
};

function editSectionPanelId(sectionId: string): string {
  return `section:${sectionId}`;
}

const editAccordionSx = {
  width: "100%",
  minWidth: 0,
  margin: 0,
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 1,
  bgcolor: "background.paper",
  overflow: "hidden",
  boxShadow: "none",
  "&:before": { display: "none" },
  "&.Mui-expanded": { margin: 0 },
  "& .MuiAccordionSummary-root": {
    borderBottom: "none",
  },
  "& .MuiAccordionSummary-root.Mui-expanded": {
    borderBottom: "none",
  },
  "& .MuiAccordionDetails-root": {
    borderTop: "none",
  },
} as const;

const editAccordionSummarySx = {
  px: { xs: 2, md: 2.5 },
  py: 1.25,
  borderBottom: "none",
  "&.Mui-expanded": {
    borderBottom: "none",
  },
  "& .MuiAccordionSummary-content": { my: 0.5 },
} as const;

const editAccordionDetailsSx = {
  px: { xs: 2, md: 2.5 },
  pb: { xs: 2, md: 2.5 },
  pt: 0,
  borderTop: "none",
} as const;

/** Blocos que precisam de largura total no grid de edição. */
function getHeroMainImageSummaryCopy(
  heroImageFile: File | null,
  heroImagePreviewUrl: string | null,
  heroImageUrl: string | null,
): string {
  if (heroImageFile || heroImagePreviewUrl) {
    return "Imagem selecionada";
  }
  if (heroImageUrl?.trim()) {
    return "Imagem principal adicionada";
  }
  return "Nenhuma imagem";
}

function sectionHasSummaryImage(
  section: TripPageSection,
  sectionImageFiles: Record<string, File | undefined>,
  sectionImagePreviewUrls: Record<string, string>,
): boolean {
  return Boolean(
    sectionImageFiles[section.id] ||
      sectionImagePreviewUrls[section.id] ||
      section.imageUrl?.trim(),
  );
}

function getSectionButtonSummaryCopy(section: TripPageSection): string {
  if (!section.hasButton) return "Não";
  const label = section.buttonLabel?.trim();
  const url = section.buttonUrl?.trim();
  if (label && url) return `Sim — label: ${label} · link: ${url}`;
  if (label) return `Sim — label: ${label} (link pendente)`;
  if (url) return `Sim — link: ${url} (label pendente)`;
  return "Sim (label e link pendentes)";
}

function SummarySectionCard({
  section,
  index,
  sectionImageFiles,
  sectionImagePreviewUrls,
}: {
  section: TripPageSection;
  index: number;
  sectionImageFiles: Record<string, File | undefined>;
  sectionImagePreviewUrls: Record<string, string>;
}): ReactNode {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        p: 2,
        bgcolor: "rgba(34, 93, 109, 0.03)",
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.25 }}>
        Seção {index + 1}
      </Typography>
      <Stack spacing={0.75}>
        <SummaryRow label="Título" value={section.title} />
        <SummaryRow label="Subtítulo" value={section.subtitle} clampLines={1} />
        <SummaryRow
          label="Imagem"
          value={
            sectionHasSummaryImage(section, sectionImageFiles, sectionImagePreviewUrls)
              ? "Imagem adicionada"
              : "Não"
          }
        />
        <SummaryRow label="Botão" value={getSectionButtonSummaryCopy(section)} />
      </Stack>
    </Box>
  );
}

async function fileToPreviewDataUrl(
  file: File,
  options?: { maxWidth?: number; quality?: number },
): Promise<string> {
  const maxWidth = options?.maxWidth ?? 1280;
  const quality = options?.quality ?? 0.74;

  const fileDataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Falha ao gerar pre-visualizacao da imagem."));
        return;
      }
      resolve(reader.result);
    };
    reader.onerror = () => reject(new Error("Falha ao ler arquivo de imagem."));
    reader.readAsDataURL(file);
  });

  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Falha ao processar imagem."));
    img.src = fileDataUrl;
  });

  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  if (!width || !height) return fileDataUrl;

  const targetWidth = Math.min(width, maxWidth);
  const targetHeight = Math.round((height * targetWidth) / width);

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) return fileDataUrl;

  ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
  return canvas.toDataURL("image/jpeg", quality);
}

export function TripFormWizard({ mode, tripId }: TripFormWizardProps): ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { showError, showSuccess } = useAdminToast();
  const [values, setValues] = useState<TripFormValues>(emptyTripFormValues);
  const [slugTouched, setSlugTouched] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [savingStatus, setSavingStatus] = useState<"idle" | "uploading" | "saving">("idle");
  const [expandedEditPanel, setExpandedEditPanel] = useState<string | null>(null);
  const [savingPanelId, setSavingPanelId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImageFileError, setHeroImageFileError] = useState<string | null>(null);
  const [heroImagePreviewUrl, setHeroImagePreviewUrl] = useState<string | null>(null);
  const [sectionImageFiles, setSectionImageFiles] = useState<Record<string, File | undefined>>({});
  const [sectionImageErrors, setSectionImageErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [sectionImagePreviewUrls, setSectionImagePreviewUrls] = useState<Record<string, string>>(
    {},
  );
  const requestedStep = searchParams.get("step");

  useEffect(() => {
    const draft = loadTripFormDraft();
    const draftMatches =
      draft && tripFormDraftMatchesRoute(draft, pathname, mode, tripId);

    if (mode === "edit" && tripId) {
      const load = async () => {
        setLoading(true);
        try {
          if (draftMatches) {
            setValues(draft.values);
            const draftStep =
              requestedStep === "summary" ? TRIP_FORM_STEPS.length - 1 : draft.activeStep;
            setActiveStep(draftStep);
            setSlugTouched(draft.slugTouched);
            setHeroImageFile(null);
            setHeroImageFileError(null);
            setSectionImageFiles({});
            setSectionImageErrors({});
            setHeroImagePreviewUrl(draft.draftImages?.heroImageUrl ?? null);
            setSectionImagePreviewUrls(draft.draftImages?.sectionImageUrlsById ?? {});
          } else {
            const trip = await fetchAdminTrip(tripId);
            setValues(recordToFormValues(trip));
            if (requestedStep === "summary") {
              setActiveStep(TRIP_FORM_STEPS.length - 1);
            }
            setSlugTouched(true);
            setHeroImageFile(null);
            setHeroImageFileError(null);
            setSectionImageFiles({});
            setSectionImageErrors({});
            setHeroImagePreviewUrl(null);
            setSectionImagePreviewUrls({});
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "Erro ao carregar viagem.");
        } finally {
          setLoading(false);
        }
      };
      void load();
      return;
    }

    if (mode === "create" && draftMatches) {
      setValues(draft.values);
      setActiveStep(draft.activeStep);
      setSlugTouched(draft.slugTouched);
      setHeroImageFile(null);
      setHeroImageFileError(null);
      setSectionImageFiles({});
      setSectionImageErrors({});
      setHeroImagePreviewUrl(draft.draftImages?.heroImageUrl ?? null);
      setSectionImagePreviewUrls(draft.draftImages?.sectionImageUrlsById ?? {});
    }
  }, [mode, tripId, pathname, requestedStep]);

  useEffect(() => {
    setSectionImageFiles((current) => {
      const validIds = new Set(values.pageSections.map((section) => section.id));
      let changed = false;
      const next: Record<string, File | undefined> = {};
      for (const [sectionId, sectionFile] of Object.entries(current)) {
        if (validIds.has(sectionId)) {
          next[sectionId] = sectionFile;
        } else {
          changed = true;
        }
      }
      return changed ? next : current;
    });
    setSectionImageErrors((current) => {
      const validIds = new Set(values.pageSections.map((section) => section.id));
      let changed = false;
      const next: Record<string, string | undefined> = {};
      for (const [sectionId, message] of Object.entries(current)) {
        if (validIds.has(sectionId)) {
          next[sectionId] = message;
        } else {
          changed = true;
        }
      }
      return changed ? next : current;
    });
    setSectionImagePreviewUrls((current) => {
      const validIds = new Set(values.pageSections.map((section) => section.id));
      let changed = false;
      const next: Record<string, string> = {};
      for (const [sectionId, previewUrl] of Object.entries(current)) {
        if (validIds.has(sectionId)) {
          next[sectionId] = previewUrl;
        } else {
          changed = true;
        }
      }
      return changed ? next : current;
    });
  }, [values.pageSections]);

  const step = TRIP_FORM_STEPS[activeStep] ?? TRIP_FORM_STEPS[0];
  const sectionsStepIndex = useMemo(
    () => TRIP_FORM_STEPS.findIndex((formStep) => formStep.id === "sections"),
    [],
  );
  const isOnSectionsStep = activeStep === sectionsStepIndex;
  const progress = useMemo(
    () => ((activeStep + 1) / TRIP_FORM_STEPS.length) * 100,
    [activeStep],
  );

  const slugAvailability = useTripSlugAvailability(values.slug, {
    excludeId: mode === "edit" ? tripId : undefined,
  });

  const slugFieldError =
    fieldErrors.slug ??
    (slugAvailability.taken ? "Este slug já está em uso." : undefined) ??
    (slugAvailability.status === "error"
      ? "Não foi possível verificar o slug. Tente novamente."
      : undefined);

  const slugNeedsAvailabilityCheck =
    Boolean(values.slug.trim()) && isValidTripSlug(values.slug);

  const slugBlocksProgress =
    slugNeedsAvailabilityCheck &&
    (slugAvailability.checking || slugAvailability.taken);

  const heroUploadPreviewUrl = heroImagePreviewUrl ?? values.heroImageUrl ?? null;
  const heroMainImageSummary = getHeroMainImageSummaryCopy(
    heroImageFile,
    heroImagePreviewUrl,
    values.heroImageUrl,
  );

  const updateField = <K extends keyof TripFormValues>(
    key: K,
    value: TripFormValues[K],
  ) => {
    setValues((current) => {
      const next = { ...current, [key]: value };
      if (key === "title" && typeof value === "string") {
        if (!slugTouched) next.slug = slugifyTitle(value);
      }
      return next;
    });
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[key as string];
      return next;
    });
  };

  const handleHeroImageFileChange = (file: File | null) => {
    if (!file) {
      setHeroImageFile(null);
      setHeroImageFileError(null);
      setHeroImagePreviewUrl(null);
      return;
    }
    const validationError = validateAdminImageFile(file);
    if (validationError) {
      setHeroImageFileError(validationError);
      return;
    }
    setHeroImageFileError(null);
    setHeroImageFile(file);
    setValues((current) => ({ ...current, heroImageUrl: null }));
    void fileToPreviewDataUrl(file, { maxWidth: 1280 })
      .then((dataUrl) => {
        setHeroImagePreviewUrl(dataUrl);
      })
      .catch(() => {
        setHeroImageFileError("Não foi possível gerar a prévia da imagem.");
        setHeroImagePreviewUrl(null);
      });
    setFieldErrors((current) => {
      const next = { ...current };
      delete next.heroImageUrl;
      return next;
    });
  };

  const handleSectionImageFileChange = (sectionId: string, file: File | null) => {
    if (!file) {
      setSectionImageFiles((current) => ({ ...current, [sectionId]: undefined }));
      setSectionImageErrors((current) => ({ ...current, [sectionId]: undefined }));
      setSectionImagePreviewUrls((current) => {
        if (!(sectionId in current)) return current;
        const next = { ...current };
        delete next[sectionId];
        return next;
      });
      return;
    }
    const validationError = validateAdminImageFile(file);
    if (validationError) {
      setSectionImageErrors((current) => ({ ...current, [sectionId]: validationError }));
      return;
    }
    setSectionImageFiles((current) => ({ ...current, [sectionId]: file }));
    setSectionImageErrors((current) => ({ ...current, [sectionId]: undefined }));
    void fileToPreviewDataUrl(file, { maxWidth: 1080 })
      .then((dataUrl) => {
        setSectionImagePreviewUrls((current) => ({ ...current, [sectionId]: dataUrl }));
      })
      .catch(() => {
        setSectionImageErrors((current) => ({
          ...current,
          [sectionId]: "Não foi possível gerar a prévia da imagem.",
        }));
      });
  };

  const clearSectionImageFile = (sectionId: string) => {
    setSectionImageFiles((current) => {
      if (!(sectionId in current)) return current;
      const next = { ...current };
      delete next[sectionId];
      return next;
    });
    setSectionImageErrors((current) => {
      if (!(sectionId in current)) return current;
      const next = { ...current };
      delete next[sectionId];
      return next;
    });
    setSectionImagePreviewUrls((current) => {
      if (!(sectionId in current)) return current;
      const next = { ...current };
      delete next[sectionId];
      return next;
    });
  };

  const handleContinue = () => {
    const stepErrors = validateTripFormStep(step.id, values);
    if (step.id === "basics" && heroImageFileError) {
      stepErrors.heroImageUrl = heroImageFileError;
    }
    if (step.id === "sections") {
      const firstSectionFileError = Object.values(sectionImageErrors).find(Boolean);
      if (firstSectionFileError) {
        stepErrors.pageSections = firstSectionFileError;
      }
    }
    if (step.id === "destination" && slugBlocksProgress) {
      if (slugAvailability.checking) {
        stepErrors.slug = "Aguarde a verificação do slug.";
      } else if (slugAvailability.taken) {
        stepErrors.slug = "Este slug já está em uso.";
      }
    }
    if (Object.keys(stepErrors).length > 0) {
      setFieldErrors(stepErrors);
      return;
    }
    setFieldErrors({});
    setActiveStep((current) => Math.min(current + 1, TRIP_FORM_STEPS.length - 1));
  };

  const handleBack = () => {
    setFieldErrors({});
    setActiveStep((current) => Math.max(current - 1, 0));
  };

  const jumpToStep = (targetStepId: "basics" | "destination" | "schedule" | "sections") => {
    const targetIndex = TRIP_FORM_STEPS.findIndex((candidate) => candidate.id === targetStepId);
    if (targetIndex < 0) return;
    setFieldErrors({});
    setActiveStep(targetIndex);
  };

  const handleStepSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (activeStep < TRIP_FORM_STEPS.length - 1) {
      handleContinue();
      return;
    }
    void handleSave();
  };

  const updatePageSection = (index: number, patch: Partial<TripPageSection>) => {
    updateField(
      "pageSections",
      values.pageSections.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, ...patch } : section,
      ),
    );
  };

  const movePageSection = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= values.pageSections.length) return;
    const next = [...values.pageSections];
    const [item] = next.splice(index, 1);
    if (!item) return;
    next.splice(target, 0, item);
    updateField("pageSections", next);
  };

  const removePageSection = (index: number) => {
    if (values.pageSections.length <= 1) return;
    const removed = values.pageSections[index];
    const nextSections = values.pageSections.filter((_, sectionIndex) => sectionIndex !== index);
    updateField("pageSections", nextSections);
    if (removed && expandedEditPanel === editSectionPanelId(removed.id)) {
      setExpandedEditPanel(null);
    }
    if (removed) {
      clearSectionImageFile(removed.id);
    }
  };

  const addPageSection = () => {
    const nextSection = createEmptyTripPageSection();
    updateField("pageSections", [...values.pageSections, nextSection]);
    setExpandedEditPanel(editSectionPanelId(nextSection.id));
  };

  const persistTrip = async (options?: {
    targetStepId?: TripFormStepId;
    targetSectionIndex?: number;
    closeAccordionOnSuccess?: boolean;
  }) => {
    const targetStepId = options?.targetStepId;
    const targetSectionIndex = options?.targetSectionIndex;
    const isBlockSave = targetStepId != null || targetSectionIndex != null;

    if (targetSectionIndex != null) {
      const section = values.pageSections[targetSectionIndex];
      const sectionImageError = section ? sectionImageErrors[section.id] : undefined;
      if (sectionImageError) {
        setFieldErrors({
          [`pageSections.${targetSectionIndex}.imageUrl`]: sectionImageError,
        });
        showError(sectionImageError);
        return false;
      }

      const sectionErrors = validateTripPageSectionAtIndex(values, targetSectionIndex);
      if (Object.keys(sectionErrors).length > 0) {
        setFieldErrors(sectionErrors);
        showError("Revise os campos desta seção antes de salvar.");
        return false;
      }
    } else if (targetStepId === "basics" && heroImageFileError) {
      setFieldErrors({ heroImageUrl: heroImageFileError });
      showError(heroImageFileError);
      return false;
    } else if (!isBlockSave) {
      if (heroImageFileError) {
        setFieldErrors({ heroImageUrl: heroImageFileError });
        setActiveStep(0);
        showError(heroImageFileError);
        return false;
      }

      const firstSectionImageError = Object.values(sectionImageErrors).find(Boolean);
      if (firstSectionImageError) {
        setFieldErrors({ pageSections: firstSectionImageError });
        setActiveStep(3);
        showError(firstSectionImageError);
        return false;
      }
    } else if (targetStepId) {
      const stepErrors = validateTripFormStep(targetStepId, values);
      if (targetStepId === "basics" && heroImageFileError) {
        stepErrors.heroImageUrl = heroImageFileError;
      }
      if (targetStepId === "destination" && slugBlocksProgress) {
        stepErrors.slug = slugAvailability.checking
          ? "Aguarde a verificação do slug."
          : "Este slug já está em uso.";
      }
      if (Object.keys(stepErrors).length > 0) {
        setFieldErrors(stepErrors);
        showError("Revise os campos deste bloco antes de salvar.");
        return false;
      }
    }

    let payloadFromValues: TripFormValues | null = null;

    if (isBlockSave) {
      if (targetStepId === "destination" && slugBlocksProgress) {
        const slugError = slugAvailability.checking
          ? "Aguarde a verificação do slug."
          : "Este slug já está em uso.";
        setFieldErrors({ slug: slugError });
        showError(slugError);
        return false;
      }
      payloadFromValues = {
        ...values,
        pageSections: values.pageSections.map((section) => ({ ...section })),
      };
    } else {
      const validation = validateTripForm(values);
      if (!validation.success) {
        setFieldErrors(validation.errors);
        setActiveStep(getFirstTripFormStepWithErrors(validation.errors));
        showError("Revise os campos destacados antes de salvar.");
        return false;
      }

      if (slugBlocksProgress) {
        const slugError = slugAvailability.checking
          ? "Aguarde a verificação do slug."
          : "Este slug já está em uso.";
        setFieldErrors({ slug: slugError });
        setActiveStep(0);
        showError(slugError);
        return false;
      }

      payloadFromValues = {
        ...validation.data,
        pageSections: validation.data.pageSections.map((section) => ({ ...section })),
      };
    }

    setSaving(true);
    setSavingStatus("uploading");
    setError(null);
    setFieldErrors({});

    try {
      let payload: TripFormValues = payloadFromValues!;

      if (heroImageFile) {
        const heroUpload = await uploadAdminImage(heroImageFile, "hero");
        payload = { ...payload, heroImageUrl: heroUpload.url };
      }

      const sectionIdsToUpload = payload.pageSections
        .map((section) => section.id)
        .filter((sectionId) => Boolean(sectionImageFiles[sectionId]));

      if (sectionIdsToUpload.length > 0) {
        const uploadedSectionUrls: Record<string, string> = {};
        for (const sectionId of sectionIdsToUpload) {
          const sectionFile = sectionImageFiles[sectionId];
          if (!sectionFile) continue;
          const uploadResult = await uploadAdminImage(sectionFile, "section");
          uploadedSectionUrls[sectionId] = uploadResult.url;
        }
        payload = {
          ...payload,
          pageSections: payload.pageSections.map((section) => ({
            ...section,
            imageUrl: uploadedSectionUrls[section.id] ?? section.imageUrl,
          })),
        };
      }

      setSavingStatus("saving");
      if (mode === "create") {
        await createAdminTrip(payload);
        clearTripFormDraft();
        router.push("/admin/viagens?saved=1");
        router.refresh();
      } else if (tripId) {
        const updated = await updateAdminTrip(tripId, payload);
        setValues(recordToFormValues(updated));
        setHeroImageFile(null);
        setHeroImageFileError(null);
        setHeroImagePreviewUrl(null);
        setSectionImageFiles({});
        setSectionImageErrors({});
        setSectionImagePreviewUrls({});
        clearTripFormDraft();
        if (isBlockSave) {
          showSuccess("Alterações salvas com sucesso.");
          if (options?.closeAccordionOnSuccess) {
            setExpandedEditPanel(null);
          }
        } else {
          router.push("/admin/viagens?updated=1");
          router.refresh();
        }
      }
      return true;
    } catch (err) {
      const apiError = err as Error & { details?: Record<string, string> };
      if (apiError.details) setFieldErrors(apiError.details);
      const message = apiError.message || "Erro ao salvar viagem.";
      setError(message);
      showError(message);
      return false;
    } finally {
      setSaving(false);
      setSavingStatus("idle");
    }
  };

  const handleSave = async () => {
    await persistTrip();
  };

  if (loading) {
    return (
      <AdminLayout>
        <LoadingState label="Carregando viagem…" />
      </AdminLayout>
    );
  }

  const datePreview = formatTripFormDatePreview(values);

  const renderSummaryStepContent = (): ReactNode => (
    <Stack spacing={2}>
      <PaperSummary title="Identificação" onEdit={() => jumpToStep("basics")}>
        <SummaryRow label="Imagem principal" value={heroMainImageSummary} />
        <SummaryRow label="Título" value={values.title} />
        <SummaryRow
          label="Categoria"
          value={values.category === "nacional" ? "Nacional" : "Internacional"}
        />
      </PaperSummary>

      <PaperSummary title="Destino" onEdit={() => jumpToStep("destination")}>
        <SummaryRow
          label="Tipos"
          value={formatTripExperienceTypesLabel(values.experienceTypes)}
        />
        <SummaryRow label="Slug" value={values.slug} />
        <SummaryRow label="Status" value={statusLabels[values.status]} />
      </PaperSummary>

      <PaperSummary title="Datas" onEdit={() => jumpToStep("schedule")}>
        <SummaryRow label="Datas" value={datePreview || "Não informado"} />
      </PaperSummary>

      <PaperSummary title="Seções" onEdit={() => jumpToStep("sections")}>
        {values.pageSections.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Nenhuma seção adicionada.
          </Typography>
        ) : (
          <Stack spacing={1.5}>
            <Typography variant="caption" color="text.secondary">
              {values.pageSections.length}{" "}
              {values.pageSections.length === 1 ? "seção configurada" : "seções configuradas"}
            </Typography>
            {values.pageSections.map((section, index) => (
              <SummarySectionCard
                key={section.id}
                section={section}
                index={index}
                sectionImageFiles={sectionImageFiles}
                sectionImagePreviewUrls={sectionImagePreviewUrls}
              />
            ))}
          </Stack>
        )}
      </PaperSummary>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        sx={{
          width: { xs: "100%", sm: "auto" },
          alignSelf: { xs: "stretch", sm: "flex-start" },
          alignItems: { xs: "center", sm: "flex-start" },
        }}
      >
        <Button
          type="button"
          variant="outlined"
          fullWidth
          startIcon={<VisibilityOutlinedIcon />}
          onClick={() => setPreviewOpen(true)}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Prévia da página
        </Button>
        <Button
          type="button"
          variant="text"
          color="inherit"
          fullWidth
          startIcon={<OpenInFullRoundedIcon />}
          onClick={() => {
            void openFullPreview().catch((previewError: unknown) => {
              const message =
                previewError instanceof Error
                  ? previewError.message
                  : "Nao foi possivel abrir a previa em tela cheia.";
              showError(message);
            });
          }}
          sx={{
            width: { xs: "100%", sm: "auto" },
            color: "text.secondary",
            fontWeight: 600,
          }}
        >
          Abrir em tela cheia
        </Button>
      </Stack>
    </Stack>
  );

  const sectionImageUrlsById = Object.fromEntries(
    Object.entries(sectionImagePreviewUrls).filter(([, url]) => Boolean(url)),
  );
  const previewImages =
    !heroImagePreviewUrl && Object.keys(sectionImageUrlsById).length === 0
      ? undefined
      : {
          heroImageUrl: heroImagePreviewUrl,
          sectionImageUrlsById,
        };

  const openFullPreview = async () => {
    const buildSectionImageUrls = async (): Promise<Record<string, string>> => {
      const mergedSectionUrls: Record<string, string> = { ...sectionImagePreviewUrls };
      for (const section of values.pageSections) {
        if (mergedSectionUrls[section.id]) continue;
        if (section.imageUrl?.trim()) {
          mergedSectionUrls[section.id] = section.imageUrl;
        }
      }
      for (const [sectionId, sectionFile] of Object.entries(sectionImageFiles)) {
        if (!sectionFile) continue;
        mergedSectionUrls[sectionId] = await fileToPreviewDataUrl(sectionFile, {
          maxWidth: 1080,
        });
      }
      return mergedSectionUrls;
    };

    const initialPreviewImages = {
      heroImageUrl:
        heroImagePreviewUrl ?? values.heroImageUrl ?? null,
      sectionImageUrlsById: Object.fromEntries(
        values.pageSections.flatMap((section) => {
          const url =
            sectionImagePreviewUrls[section.id] ?? section.imageUrl?.trim() ?? "";
          return url ? [[section.id, url] as const] : [];
        }),
      ),
    };

    saveTripPreviewPayload({
      values,
      returnTo: pathname,
      previewImages: initialPreviewImages,
    });

    const fullPreviewImages: {
      heroImageUrl?: string | null;
      sectionImageUrlsById?: Record<string, string>;
    } = { ...initialPreviewImages };

    if (heroImageFile) {
      fullPreviewImages.heroImageUrl = await fileToPreviewDataUrl(heroImageFile, {
        maxWidth: 1280,
      });
    }

    const mergedSectionUrls = await buildSectionImageUrls();
    if (Object.keys(mergedSectionUrls).length > 0) {
      fullPreviewImages.sectionImageUrlsById = mergedSectionUrls;
    }

    const previewPayloadImages =
      fullPreviewImages.heroImageUrl || fullPreviewImages.sectionImageUrlsById
        ? { previewImages: fullPreviewImages }
        : previewImages
          ? { previewImages }
          : {};

    saveTripPreviewPayload({
      values,
      returnTo: pathname,
      ...previewPayloadImages,
    });

    const previewWindow = window.open("/admin/viagens/preview", "_blank", "noopener,noreferrer");
    if (!previewWindow) {
      throw new Error(
        "Não foi possível abrir a prévia. Permita pop-ups para este site e tente novamente.",
      );
    }

    setPreviewOpen(false);
  };

  const renderStepBody = (stepId: TripFormStepId): ReactNode => {
    if (stepId === "basics") {
      if (mode === "edit") {
        return (
          <Stack spacing={2.5}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 2.5, md: 3 }}
              sx={{ alignItems: { xs: "stretch", md: "flex-start" } }}
            >
              <TripFormField
                label="Imagem principal"
                helperText={fieldErrors.heroImageUrl}
                error={Boolean(fieldErrors.heroImageUrl)}
              >
                <Box
                  sx={{
                    width: { xs: "100%", md: 280 },
                    maxWidth: { xs: "100%", md: 280 },
                  }}
                >
                  <AdminImageUpload
                    valueUrl={values.heroImageUrl}
                    previewUrl={heroUploadPreviewUrl}
                    file={heroImageFile}
                    onFileChange={handleHeroImageFileChange}
                    onValueUrlChange={(url) => {
                      updateField("heroImageUrl", url);
                      if (!url) {
                        setHeroImageFile(null);
                        setHeroImagePreviewUrl(null);
                      }
                      setHeroImageFileError(null);
                    }}
                    {...(heroImageFileError ? { error: heroImageFileError } : {})}
                  />
                </Box>
              </TripFormField>

              <Stack spacing={2.5} sx={{ flex: 1, minWidth: 0, pt: { xs: 0, md: 0.25 } }}>
                <TripFormTextField
                  label="Título da viagem"
                  required
                  placeholder="Ex.: Fernando de Noronha"
                  value={values.title}
                  error={Boolean(fieldErrors.title)}
                  helperText={fieldErrors.title}
                  onChange={(e) => updateField("title", e.target.value)}
                />
                <TripFormSelect
                  label="Categoria"
                  required
                  value={values.category}
                  options={categoryOptions}
                  error={Boolean(fieldErrors.category)}
                  helperText={fieldErrors.category}
                  onChange={(e) =>
                    updateField("category", e.target.value as TripFormValues["category"])
                  }
                />
              </Stack>
            </Stack>
          </Stack>
        );
      }
      return (
        <Stack spacing={2.5}>
          <TripFormField
            label="Imagem principal"
            helperText={fieldErrors.heroImageUrl}
            error={Boolean(fieldErrors.heroImageUrl)}
          >
            <AdminImageUpload
              valueUrl={values.heroImageUrl}
              previewUrl={heroUploadPreviewUrl}
              file={heroImageFile}
              onFileChange={handleHeroImageFileChange}
              onValueUrlChange={(url) => {
                updateField("heroImageUrl", url);
                if (!url) {
                  setHeroImageFile(null);
                  setHeroImagePreviewUrl(null);
                }
                setHeroImageFileError(null);
              }}
              {...(heroImageFileError ? { error: heroImageFileError } : {})}
            />
          </TripFormField>
          <TripFormTextField
            label="Título da viagem"
            required
            placeholder="Ex.: Fernando de Noronha"
            value={values.title}
            error={Boolean(fieldErrors.title)}
            helperText={fieldErrors.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
          <TripFormSelect
            label="Categoria"
            required
            value={values.category}
            options={categoryOptions}
            error={Boolean(fieldErrors.category)}
            helperText={fieldErrors.category}
            onChange={(e) =>
              updateField("category", e.target.value as TripFormValues["category"])
            }
          />
        </Stack>
      );
    }

    if (stepId === "destination") {
      return (
        <Stack spacing={2.5}>
          <TripFormExperienceTypes
            value={values.experienceTypes}
            onChange={(experienceTypes) => updateField("experienceTypes", experienceTypes)}
            error={Boolean(fieldErrors.experienceTypes)}
            helperText={
              fieldErrors.experienceTypes ||
              "Selecione um ou mais tipos. Usado nos filtros do catálogo de viagens."
            }
          />
          <TripFormTextField
            label="Slug"
            required
            placeholder="fernando-de-noronha"
            value={values.slug}
            disabled={slugAvailability.checking}
            error={Boolean(slugFieldError)}
            helperText={
              slugFieldError ||
              (slugAvailability.checking
                ? "Verificando se o slug está disponível…"
                : slugAvailability.status === "available"
                  ? "Slug disponível."
                  : "Usado na URL pública: /viagens/seu-slug")
            }
            onChange={(e) => {
              setSlugTouched(true);
              updateField("slug", e.target.value);
            }}
            slotProps={{
              input: {
                endAdornment: slugAvailability.checking ? (
                  <InputAdornment position="end">
                    <CircularProgress size={20} aria-label="Verificando slug" />
                  </InputAdornment>
                ) : undefined,
              },
            }}
          />
          <TripFormSelect
            label="Status"
            required
            value={values.status}
            options={statusOptions}
            error={Boolean(fieldErrors.status)}
            helperText={
              fieldErrors.status ||
              "Rascunho não exige seções; demais status pedem pelo menos uma seção de conteúdo."
            }
            onChange={(e) => updateField("status", e.target.value as TripFormValues["status"])}
          />
        </Stack>
      );
    }

    if (stepId === "schedule") {
      return (
        <Stack spacing={2.5}>
          <TripFormDateRange
            startDate={values.startDate}
            endDate={values.endDate}
            {...(fieldErrors.startDate ? { startError: fieldErrors.startDate } : {})}
            {...(fieldErrors.endDate ? { endError: fieldErrors.endDate } : {})}
            onStartDateChange={(startDate) => updateField("startDate", startDate)}
            onEndDateChange={(endDate) => updateField("endDate", endDate)}
          />
        </Stack>
      );
    }

    if (stepId === "sections") {
      return (
        <TripPageSectionsEditor
          sections={values.pageSections}
          fieldErrors={fieldErrors}
          sectionImageFiles={sectionImageFiles}
          sectionImagePreviewUrls={sectionImagePreviewUrls}
          sectionImageErrors={sectionImageErrors}
          collapseSectionsTrigger={isOnSectionsStep}
          onChange={(pageSections) => updateField("pageSections", pageSections)}
          onSectionImageFileChange={handleSectionImageFileChange}
          onSectionImageFileClear={clearSectionImageFile}
        />
      );
    }

    return renderSummaryStepContent();
  };

  if (mode === "edit") {
    return (
      <AdminLayout breadcrumbLabel={values.title.trim() || null}>
        <Box sx={{ width: "100%", maxWidth: "100%" }}>
          <Stack spacing={{ xs: 2.5, md: 3 }} sx={{ width: "100%" }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Editar viagem
            </Typography>

            {error ? <Alert severity="error">{error}</Alert> : null}

            <Stack spacing={{ xs: 2, md: 2.5 }} useFlexGap sx={{ width: "100%" }}>
              {EDIT_TRIP_FORM_STEPS.map((formStep) => (
                <Accordion
                  key={formStep.id}
                  expanded={expandedEditPanel === formStep.id}
                  onChange={(_event, expanded) =>
                    setExpandedEditPanel(expanded ? formStep.id : null)
                  }
                  disableGutters
                  sx={editAccordionSx}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon />}
                    sx={editAccordionSummarySx}
                  >
                    <Typography sx={{ fontWeight: 700, pr: 1 }}>{formStep.label}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={editAccordionDetailsSx}>
                    <Stack spacing={2.5}>
                      {renderStepBody(formStep.id)}
                      <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 0.5 }}>
                        <Button
                          variant="contained"
                          disabled={saving}
                          onClick={async () => {
                            setSavingPanelId(formStep.id);
                            await persistTrip({
                              targetStepId: formStep.id,
                              closeAccordionOnSuccess: true,
                            });
                            setSavingPanelId(null);
                          }}
                        >
                          {saving && savingPanelId === formStep.id
                            ? "Salvando..."
                            : "Salvar bloco"}
                        </Button>
                      </Box>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              ))}

              {values.pageSections.map((section, index) => {
                const panelId = editSectionPanelId(section.id);
                const hasFieldError = Object.keys(fieldErrors).some((key) =>
                  key.startsWith(`pageSections.${index}.`),
                );

                return (
                  <Accordion
                    key={section.id}
                    expanded={expandedEditPanel === panelId}
                    onChange={(_event, expanded) =>
                      setExpandedEditPanel(expanded ? panelId : null)
                    }
                    disableGutters
                    sx={{
                      ...editAccordionSx,
                      borderColor: hasFieldError ? "error.main" : editAccordionSx.borderColor,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreRoundedIcon />}
                      sx={{
                        ...editAccordionSummarySx,
                        "& .MuiAccordionSummary-content": {
                          alignItems: "center",
                          minWidth: 0,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          flex: 1,
                          minWidth: 0,
                          pr: 1,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", flexShrink: 0, gap: 0.25 }}
                          onClick={(event) => event.stopPropagation()}
                          onFocus={(event) => event.stopPropagation()}
                        >
                          <IconButton
                            component="span"
                            size="small"
                            aria-label="Mover seção para cima"
                            disabled={index === 0}
                            onClick={() => movePageSection(index, -1)}
                          >
                            <ArrowUpwardIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            component="span"
                            size="small"
                            aria-label="Mover seção para baixo"
                            disabled={index === values.pageSections.length - 1}
                            onClick={() => movePageSection(index, 1)}
                          >
                            <ArrowDownwardIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Typography sx={{ fontWeight: 700, flex: 1, minWidth: 0 }}>
                          Seção {index + 1}
                        </Typography>
                        <Box
                          sx={{ display: "flex", flexShrink: 0 }}
                          onClick={(event) => event.stopPropagation()}
                          onFocus={(event) => event.stopPropagation()}
                        >
                          <IconButton
                            component="span"
                            size="small"
                            color="error"
                            aria-label="Remover seção"
                            disabled={values.pageSections.length <= 1}
                            onClick={() => removePageSection(index)}
                          >
                            <DeleteOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={editAccordionDetailsSx}>
                      <Stack spacing={2.5}>
                        <TripPageSectionFields
                          section={section}
                          index={index}
                          fieldErrors={fieldErrors}
                          sectionImageFiles={sectionImageFiles}
                          sectionImagePreviewUrls={sectionImagePreviewUrls}
                          sectionImageErrors={sectionImageErrors}
                          imageVariant="compact"
                          layout="edit"
                          onChange={(patch) => updatePageSection(index, patch)}
                          onSectionImageFileChange={(file) =>
                            handleSectionImageFileChange(section.id, file)
                          }
                          onSectionImageFileClear={() => clearSectionImageFile(section.id)}
                        />
                        <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 0.5 }}>
                          <Button
                            variant="contained"
                            disabled={saving}
                            onClick={async () => {
                              setSavingPanelId(panelId);
                              await persistTrip({
                                targetSectionIndex: index,
                                closeAccordionOnSuccess: true,
                              });
                              setSavingPanelId(null);
                            }}
                          >
                            {saving && savingPanelId === panelId ? "Salvando..." : "Salvar seção"}
                          </Button>
                        </Box>
                      </Stack>
                    </AccordionDetails>
                  </Accordion>
                );
              })}

              <Button
                type="button"
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addPageSection}
                sx={{ alignSelf: "flex-start" }}
              >
                Adicionar seção
              </Button>

              {fieldErrors.pageSections ? (
                <Typography variant="body2" color="error">
                  {fieldErrors.pageSections}
                </Typography>
              ) : null}
            </Stack>
          </Stack>
        </Box>

        <TripPagePreviewDialog
          open={previewOpen}
          values={values}
          {...(previewImages ? { previewImages } : {})}
          onClose={() => setPreviewOpen(false)}
          onOpenFull={() => {
            void openFullPreview().catch((previewError: unknown) => {
              const message =
                previewError instanceof Error
                  ? previewError.message
                  : "Nao foi possivel abrir a previa em tela cheia.";
              showError(message);
            });
          }}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box
        sx={{
          width: "100%",
          maxWidth: 720,
          mx: "auto",
          pt: { xs: 1, md: 2 },
          pb: { xs: 5, md: 8 },
        }}
      >
          <Stack spacing={3}>
          <Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 6, borderRadius: 3 }}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: step.description ? 0.75 : 0 }}>
              {step.label}
            </Typography>
            {step.description ? (
              <Typography variant="body2" color="text.secondary">
                {step.description}
              </Typography>
            ) : null}
          </Box>

          {error ? <Alert severity="error">{error}</Alert> : null}

          <Stack
            component="form"
            spacing={3}
            noValidate
            onSubmit={handleStepSubmit}
          >
          {step.id === "basics" ? (
            <Stack spacing={2.5}>
              <TripFormField
                label="Imagem principal"
                helperText={fieldErrors.heroImageUrl}
                error={Boolean(fieldErrors.heroImageUrl)}
              >
                <AdminImageUpload
                  valueUrl={values.heroImageUrl}
                  previewUrl={heroUploadPreviewUrl}
                  file={heroImageFile}
                  onFileChange={handleHeroImageFileChange}
                  onValueUrlChange={(url) => {
                    updateField("heroImageUrl", url);
                    if (!url) {
                      setHeroImageFile(null);
                      setHeroImagePreviewUrl(null);
                    }
                    setHeroImageFileError(null);
                  }}
                  {...(heroImageFileError ? { error: heroImageFileError } : {})}
                />
              </TripFormField>
              <TripFormTextField
                label="Título da viagem"
                required
                placeholder="Ex.: Fernando de Noronha"
                value={values.title}
                error={Boolean(fieldErrors.title)}
                helperText={fieldErrors.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
              <TripFormSelect
                label="Categoria"
                required
                value={values.category}
                options={categoryOptions}
                error={Boolean(fieldErrors.category)}
                helperText={fieldErrors.category}
                onChange={(e) =>
                  updateField("category", e.target.value as TripFormValues["category"])
                }
              />
            </Stack>
          ) : null}

          {step.id === "destination" ? (
            <Stack spacing={2.5}>
              <TripFormExperienceTypes
                value={values.experienceTypes}
                onChange={(experienceTypes) =>
                  updateField("experienceTypes", experienceTypes)
                }
                error={Boolean(fieldErrors.experienceTypes)}
                helperText={
                  fieldErrors.experienceTypes ||
                  "Selecione um ou mais tipos. Usado nos filtros do catálogo de viagens."
                }
              />
              <TripFormTextField
                label="Slug"
                required
                placeholder="fernando-de-noronha"
                value={values.slug}
                disabled={slugAvailability.checking}
                error={Boolean(slugFieldError)}
                helperText={
                  slugFieldError ||
                  (slugAvailability.checking
                    ? "Verificando se o slug está disponível…"
                    : slugAvailability.status === "available"
                      ? "Slug disponível."
                      : "Usado na URL pública: /viagens/seu-slug")
                }
                onChange={(e) => {
                  setSlugTouched(true);
                  updateField("slug", e.target.value);
                }}
                slotProps={{
                  input: {
                    endAdornment: slugAvailability.checking ? (
                      <InputAdornment position="end">
                        <CircularProgress size={20} aria-label="Verificando slug" />
                      </InputAdornment>
                    ) : undefined,
                  },
                }}
              />
              <TripFormSelect
                label="Status"
                required
                value={values.status}
                options={statusOptions}
                error={Boolean(fieldErrors.status)}
                helperText={
                  fieldErrors.status ||
                  "Rascunho não exige seções; demais status pedem pelo menos uma seção de conteúdo."
                }
                onChange={(e) =>
                  updateField("status", e.target.value as TripFormValues["status"])
                }
              />
            </Stack>
          ) : null}

          {step.id === "schedule" ? (
            <Stack spacing={2.5}>
              <TripFormDateRange
                startDate={values.startDate}
                endDate={values.endDate}
                {...(fieldErrors.startDate ? { startError: fieldErrors.startDate } : {})}
                {...(fieldErrors.endDate ? { endError: fieldErrors.endDate } : {})}
                onStartDateChange={(startDate) => updateField("startDate", startDate)}
                onEndDateChange={(endDate) => updateField("endDate", endDate)}
              />
            </Stack>
          ) : null}

          {step.id === "sections" ? (
            <TripPageSectionsEditor
              sections={values.pageSections}
              fieldErrors={fieldErrors}
              sectionImageFiles={sectionImageFiles}
              sectionImagePreviewUrls={sectionImagePreviewUrls}
              sectionImageErrors={sectionImageErrors}
              collapseSectionsTrigger={isOnSectionsStep}
              onChange={(pageSections) => updateField("pageSections", pageSections)}
              onSectionImageFileChange={handleSectionImageFileChange}
              onSectionImageFileClear={clearSectionImageFile}
            />
          ) : null}

          {step.id === "summary" ? renderSummaryStepContent() : null}

          <Stack
            direction="row"
            spacing={1.5}
            sx={{ pt: 1, justifyContent: "space-between" }}
          >
            <Button
              type="button"
              variant="text"
              color="inherit"
              disabled={activeStep === 0 || saving}
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
            >
              Voltar
            </Button>

            {activeStep < TRIP_FORM_STEPS.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                disabled={saving || (step.id === "destination" && slugBlocksProgress)}
                endIcon={<ArrowForwardIcon />}
              >
                Continuar
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                disabled={saving || slugBlocksProgress}
                aria-label={
                  saving
                    ? "Salvando viagem"
                    : mode === "create"
                      ? "Criar viagem"
                      : "Salvar alterações"
                }
                sx={{
                  minWidth: saving ? 48 : undefined,
                  minHeight: 40,
                }}
              >
                {saving ? (
                  <CircularProgress size={22} color="inherit" aria-hidden />
                ) : mode === "create" ? (
                  "Criar viagem"
                ) : (
                  "Salvar alterações"
                )}
              </Button>
            )}
          </Stack>
          {saving ? (
            <Typography variant="body2" color="text.secondary">
              {savingStatus === "uploading" ? "Enviando imagens..." : "Salvando viagem..."}
            </Typography>
          ) : null}
          </Stack>
          </Stack>
      </Box>

      <TripPagePreviewDialog
        open={previewOpen}
        values={values}
        {...(previewImages ? { previewImages } : {})}
        onClose={() => setPreviewOpen(false)}
        onOpenFull={() => {
          void openFullPreview().catch((previewError: unknown) => {
            const message =
              previewError instanceof Error
                ? previewError.message
                : "Nao foi possivel abrir a previa em tela cheia.";
            showError(message);
          });
        }}
      />
    </AdminLayout>
  );
}

function PaperSummary({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit?: () => void;
  children: ReactNode;
}): ReactNode {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        p: 2,
      }}
    >
      <Box sx={{ mb: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        {onEdit ? (
          <IconButton
            size="small"
            aria-label={`Editar ${title}`}
            onClick={onEdit}
            sx={{ color: "text.secondary" }}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        ) : null}
      </Box>
      <Stack spacing={1}>{children}</Stack>
    </Box>
  );
}

function SummaryRow({
  label,
  value,
  clampLines,
}: {
  label: string;
  value: string;
  clampLines?: number;
}): ReactNode {
  const displayValue = value.trim() || "Não informado";

  if (clampLines) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 0.5,
          minWidth: 0,
          lineHeight: 1.5,
        }}
      >
        <Typography
          component="span"
          variant="body2"
          sx={{ fontWeight: 600, color: "text.primary", flexShrink: 0 }}
        >
          {label}:
        </Typography>
        <Typography
          component="span"
          variant="body2"
          title={displayValue}
          sx={{
            color: "text.secondary",
            flex: 1,
            minWidth: 0,
            display: "-webkit-box",
            WebkitLineClamp: clampLines,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {displayValue}
        </Typography>
      </Box>
    );
  }

  return (
    <Typography
      variant="body2"
      component="p"
      sx={{
        m: 0,
        lineHeight: 1.5,
        wordBreak: "break-word",
      }}
    >
      <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
        {label}:
      </Box>{" "}
      <Box component="span" sx={{ color: "text.secondary" }}>
        {displayValue}
      </Box>
    </Typography>
  );
}
