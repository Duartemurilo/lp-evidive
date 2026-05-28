import type { TripFormValues } from "@/lib/types/trip-admin";

export const TRIP_PREVIEW_STORAGE_KEY = "evidive-admin-trip-preview";
export const TRIP_FORM_DRAFT_STORAGE_KEY = "evidive-admin-trip-form-draft";

export type TripPreviewPayload = {
  values: TripFormValues;
  returnTo: string;
  previewImages?: {
    heroImageUrl?: string | null;
    sectionImageUrlsById?: Record<string, string>;
  };
};

export type TripFormDraft = {
  values: TripFormValues;
  activeStep: number;
  slugTouched: boolean;
  draftImages?: {
    heroImageUrl?: string | null;
    sectionImageUrlsById?: Record<string, string>;
  };
  returnTo: string;
  mode: "create" | "edit";
  tripId?: string;
};

function isQuotaExceededError(error: unknown): boolean {
  if (!(error instanceof DOMException)) return false;
  return (
    error.name === "QuotaExceededError" ||
    error.name === "NS_ERROR_DOM_QUOTA_REACHED"
  );
}

/** Preview opens in a new tab; use localStorage (sessionStorage is per-tab). */
function getPreviewStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export function saveTripPreviewPayload(payload: TripPreviewPayload): void {
  const storage = getPreviewStorage();
  if (!storage) return;
  const persist = (value: TripPreviewPayload) => {
    storage.setItem(TRIP_PREVIEW_STORAGE_KEY, JSON.stringify(value));
  };

  try {
    persist(payload);
    return;
  } catch (error) {
    if (!isQuotaExceededError(error)) throw error;
  }

  // Primeiro fallback: mantém apenas a prévia da hero, remove seções.
  if (payload.previewImages?.heroImageUrl) {
    try {
      persist({
        ...payload,
        previewImages: { heroImageUrl: payload.previewImages.heroImageUrl },
      });
      return;
    } catch (error) {
      if (!isQuotaExceededError(error)) throw error;
    }
  }

  // Último fallback: salva sem nenhuma imagem de prévia.
  try {
    persist({ values: payload.values, returnTo: payload.returnTo });
  } catch {
    // Ignora: a página de prévia exibirá mensagem de indisponibilidade.
  }
}

export function loadTripPreviewPayload(): TripPreviewPayload | null {
  const storage = getPreviewStorage();
  if (!storage) return null;
  try {
    const raw = storage.getItem(TRIP_PREVIEW_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TripPreviewPayload;
  } catch {
    return null;
  }
}

export function saveTripFormDraft(draft: TripFormDraft): void {
  if (typeof window === "undefined") return;
  const persist = (value: TripFormDraft) => {
    sessionStorage.setItem(TRIP_FORM_DRAFT_STORAGE_KEY, JSON.stringify(value));
  };

  try {
    persist(draft);
    return;
  } catch (error) {
    if (!isQuotaExceededError(error)) throw error;
  }

  // Fallback: remove imagens da sessão do draft.
  try {
    const { draftImages: _dropDraftImages, ...draftWithoutImages } = draft;
    persist(draftWithoutImages);
  } catch {
    // Ignora: draft pode não caber no storage.
  }
}

export function loadTripFormDraft(): TripFormDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(TRIP_FORM_DRAFT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as TripFormDraft;
  } catch {
    return null;
  }
}

export function clearTripFormDraft(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(TRIP_FORM_DRAFT_STORAGE_KEY);
}

export function tripFormDraftMatchesRoute(
  draft: TripFormDraft,
  pathname: string,
  mode: "create" | "edit",
  tripId?: string,
): boolean {
  if (draft.returnTo !== pathname) return false;
  if (draft.mode !== mode) return false;
  if (mode === "edit" && draft.tripId !== tripId) return false;
  return true;
}
