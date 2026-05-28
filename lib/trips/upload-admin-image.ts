export const ADMIN_UPLOAD_MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export type AdminUploadContext = "hero" | "section" | "accommodation" | "general";

type UploadResponse = {
  url: string;
  publicId: string;
};

export function validateAdminImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return "Selecione uma imagem JPG, PNG ou WEBP.";
  }
  if (file.size > ADMIN_UPLOAD_MAX_BYTES) {
    return "A imagem deve ter no máximo 5MB.";
  }
  return null;
}

export async function uploadAdminImage(
  file: File,
  context: AdminUploadContext,
): Promise<UploadResponse> {
  const validationError = validateAdminImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("context", context);

  const response = await fetch("/api/admin/uploads", {
    method: "POST",
    body: formData,
  });

  const json = (await response.json()) as
    | UploadResponse
    | { ok?: boolean; error?: string; message?: string };

  if (!response.ok) {
    const message =
      "error" in json && json.error
        ? json.error
        : "Não foi possível enviar a imagem. Tente novamente.";
    throw new Error(message);
  }

  if (!("url" in json) || typeof json.url !== "string" || !json.url) {
    throw new Error("Upload concluído sem URL válida.");
  }

  return {
    url: json.url,
    publicId: "publicId" in json && typeof json.publicId === "string" ? json.publicId : "",
  };
}
