import { ApiError, requireAuthUserId } from "@/lib/admin/require-auth";
import { getCloudinary, withCloudinaryAutoDelivery } from "@/lib/cloudinary";
import { handleApiError } from "@/lib/api/response";
import { NextResponse } from "next/server";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const folderByContext = {
  hero: "evidive/trips/hero",
  section: "evidive/trips/sections",
  accommodation: "evidive/trips/accommodation",
  general: "evidive/trips/general",
} as const;

type UploadContext = keyof typeof folderByContext;

function sanitizeBaseName(filename: string): string {
  const withoutExtension = filename.replace(/\.[^.]+$/, "");
  const normalized = withoutExtension
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
  return normalized || "trip-image";
}

function parseContext(raw: FormDataEntryValue | null): UploadContext {
  const input = typeof raw === "string" ? raw : "";
  if (!input) return "general";
  if (input in folderByContext) return input as UploadContext;
  throw new ApiError("Contexto de upload inválido.", 400);
}

export async function POST(request: Request): Promise<Response> {
  try {
    await requireAuthUserId();
    const formData = await request.formData();
    const fileEntry = formData.get("file");
    if (!(fileEntry instanceof File)) {
      throw new ApiError("Arquivo de imagem é obrigatório.", 400);
    }

    if (!ALLOWED_IMAGE_TYPES.has(fileEntry.type)) {
      throw new ApiError("Selecione uma imagem JPG, PNG ou WEBP.", 415);
    }

    if (fileEntry.size > MAX_UPLOAD_BYTES) {
      throw new ApiError("A imagem deve ter no máximo 5MB.", 413);
    }

    const context = parseContext(formData.get("context") ?? formData.get("folder"));
    const folder = folderByContext[context];
    const baseName = sanitizeBaseName(fileEntry.name);
    const publicId = `${baseName}-${crypto.randomUUID().slice(0, 8)}`;
    const fileBuffer = Buffer.from(await fileEntry.arrayBuffer());
    const cloudinary = getCloudinary();

    const uploadResult = await new Promise<{
      secure_url?: string;
      public_id: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: publicId,
          resource_type: "image",
          overwrite: false,
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Falha no upload da imagem."));
            return;
          }
          resolve(result);
        },
      );

      stream.end(fileBuffer);
    });

    const secureUrl = uploadResult.secure_url;
    if (!secureUrl) {
      throw new ApiError("Não foi possível obter a URL pública da imagem.", 502);
    }

    return NextResponse.json({
      url: withCloudinaryAutoDelivery(secureUrl),
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
