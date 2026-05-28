import { TRIP_PAGE_SECTION_TITLE_MAX_LENGTH } from "@/lib/types/trip-page-section";
import { TRIP_FORM_STEPS, type TripFormStepId } from "@/lib/trips/trip-form-steps";
import { TRIP_EXPERIENCE_TYPES } from "@/lib/trips/trip-experience-types";
import { z } from "zod";
import {
  TRIP_CATEGORIES,
  TRIP_STATUSES,
  type TripFormValues,
} from "@/lib/types/trip-admin";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidTripSlug(slug: string): boolean {
  return slugPattern.test(slug.trim());
}

const optionalImageUrlSchema = z
  .string()
  .nullable()
  .transform((value) => value?.trim() || null)
  .refine(
    (value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    { message: "URL da imagem inválida." },
  );

const tripPageSectionSchema = z.object({
  id: z.string().min(1),
  title: z
    .string()
    .trim()
    .min(1, "Título da seção é obrigatório.")
    .max(
      TRIP_PAGE_SECTION_TITLE_MAX_LENGTH,
      `O título da seção deve ter no máximo ${TRIP_PAGE_SECTION_TITLE_MAX_LENGTH} caracteres.`,
    ),
  subtitle: z.string().trim().min(1, "Subtítulo da seção é obrigatório."),
  imageUrl: optionalImageUrlSchema,
  hasButton: z.boolean(),
  buttonLabel: z.string().nullable(),
  buttonUrl: z
    .string()
    .nullable()
    .refine(
      (value) => {
        if (!value?.trim()) return true;
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      },
      { message: "URL do botão inválida." },
    ),
});

const tripFormSchema = z
  .object({
    title: z.string().trim().min(1, "Título é obrigatório."),
    slug: z
      .string()
      .trim()
      .min(1, "Slug é obrigatório.")
      .regex(slugPattern, "Slug deve conter apenas letras minúsculas, números e hífens."),
    category: z.enum(TRIP_CATEGORIES),
    experienceTypes: z
      .array(z.enum(TRIP_EXPERIENCE_TYPES))
      .min(1, "Selecione pelo menos um tipo de experiência."),
    heroImageUrl: optionalImageUrlSchema,
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
    status: z.enum(TRIP_STATUSES),
    pageSections: z.array(tripPageSectionSchema),
  })
  .superRefine((data, ctx) => {
    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);
      if (end < start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "A data de término não pode ser anterior à data de início.",
          path: ["endDate"],
        });
      }
    }

    if (data.status !== "rascunho" && data.pageSections.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Adicione pelo menos uma seção de conteúdo.",
        path: ["pageSections"],
      });
    }

    data.pageSections.forEach((section, index) => {
      if (section.hasButton) {
        if (!section.buttonLabel?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Informe o texto do botão.",
            path: ["pageSections", index, "buttonLabel"],
          });
        }
        if (!section.buttonUrl?.trim()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Informe a URL do botão.",
            path: ["pageSections", index, "buttonUrl"],
          });
        }
      }
    });
  });

export type TripValidationResult =
  | { success: true; data: TripFormValues }
  | { success: false; errors: Record<string, string> };

function validateBasicsStep(values: TripFormValues): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!values.title.trim()) errors.title = "Título é obrigatório.";
  if (values.heroImageUrl?.trim()) {
    const parsed = optionalImageUrlSchema.safeParse(values.heroImageUrl);
    if (!parsed.success) {
      errors.heroImageUrl =
        parsed.error.issues[0]?.message ?? "URL da imagem inválida.";
    }
  }
  return errors;
}

function validateDestinationStep(values: TripFormValues): Record<string, string> {
  const errors: Record<string, string> = {};
  if (values.experienceTypes.length === 0) {
    errors.experienceTypes = "Selecione pelo menos um tipo de experiência.";
  }
  if (!values.slug.trim()) {
    errors.slug = "Slug é obrigatório.";
  } else if (!isValidTripSlug(values.slug)) {
    errors.slug = "Slug deve conter apenas letras minúsculas, números e hífens.";
  }
  return errors;
}

function validateScheduleStep(values: TripFormValues): Record<string, string> {
  const errors: Record<string, string> = {};
  if (values.startDate && values.endDate) {
    const start = new Date(values.startDate);
    const end = new Date(values.endDate);
    if (end < start) {
      errors.endDate = "A data de término não pode ser anterior à data de início.";
    }
  }
  return errors;
}

function validateSectionsStep(values: TripFormValues): Record<string, string> {
  const errors: Record<string, string> = {};

  if (values.status !== "rascunho" && values.pageSections.length === 0) {
    errors.pageSections = "Adicione pelo menos uma seção de conteúdo.";
    return errors;
  }

  values.pageSections.forEach((section, index) => {
    const parsed = tripPageSectionSchema.safeParse(section);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = `pageSections.${index}.${String(issue.path[0] ?? "form")}`;
        if (!errors[key]) errors[key] = issue.message;
      }
    }

    if (section.hasButton) {
      if (!section.buttonLabel?.trim() && !errors[`pageSections.${index}.buttonLabel`]) {
        errors[`pageSections.${index}.buttonLabel`] = "Informe o texto do botão.";
      }
      if (!section.buttonUrl?.trim() && !errors[`pageSections.${index}.buttonUrl`]) {
        errors[`pageSections.${index}.buttonUrl`] = "Informe a URL do botão.";
      }
    }
  });

  return errors;
}

export function validateTripPageSectionAtIndex(
  values: TripFormValues,
  index: number,
): Record<string, string> {
  const errors: Record<string, string> = {};
  const section = values.pageSections[index];
  if (!section) return errors;

  const parsed = tripPageSectionSchema.safeParse(section);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = `pageSections.${index}.${String(issue.path[0] ?? "form")}`;
      if (!errors[key]) errors[key] = issue.message;
    }
  }

  if (section.hasButton) {
    if (!section.buttonLabel?.trim() && !errors[`pageSections.${index}.buttonLabel`]) {
      errors[`pageSections.${index}.buttonLabel`] = "Informe o texto do botão.";
    }
    if (!section.buttonUrl?.trim() && !errors[`pageSections.${index}.buttonUrl`]) {
      errors[`pageSections.${index}.buttonUrl`] = "Informe a URL do botão.";
    }
  }

  return errors;
}

export function validateTripFormStep(
  stepId: TripFormStepId,
  values: TripFormValues,
): Record<string, string> {
  switch (stepId) {
    case "basics":
      return validateBasicsStep(values);
    case "destination":
      return validateDestinationStep(values);
    case "schedule":
      return validateScheduleStep(values);
    case "sections":
      return validateSectionsStep(values);
    case "summary":
      return {};
    default:
      return {};
  }
}

function stepOwnsFieldError(stepId: TripFormStepId, fieldKey: string): boolean {
  if (stepId === "sections") {
    return fieldKey === "pageSections" || fieldKey.startsWith("pageSections.");
  }
  if (stepId === "summary") return false;

  const fieldsByStep: Record<
    Exclude<TripFormStepId, "sections" | "summary">,
    string[]
  > = {
    basics: ["title", "category", "heroImageUrl"],
    destination: ["slug", "status", "experienceTypes"],
    schedule: ["startDate", "endDate"],
  };

  return fieldsByStep[stepId as Exclude<TripFormStepId, "sections" | "summary">].includes(
    fieldKey,
  );
}

export function getFirstTripFormStepWithErrors(
  errors: Record<string, string>,
): number {
  const index = TRIP_FORM_STEPS.findIndex(
    (formStep) =>
      formStep.id !== "summary" &&
      Object.keys(errors).some((key) => stepOwnsFieldError(formStep.id, key)),
  );
  return index >= 0 ? index : 0;
}

export function validateTripForm(
  input: unknown,
): TripValidationResult {
  const parsed = tripFormSchema.safeParse(input);
  if (parsed.success) {
    return { success: true, data: parsed.data as TripFormValues };
  }

  const errors: Record<string, string> = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path.join(".") || "form";
    if (!errors[key]) {
      errors[key] = issue.message;
    }
  }
  return { success: false, errors };
}
