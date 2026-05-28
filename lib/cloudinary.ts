import { ApiError } from "@/lib/admin/require-auth";
import { v2 as cloudinary } from "cloudinary";

let isConfigured = false;

function requireEnv(name: "CLOUDINARY_CLOUD_NAME" | "CLOUDINARY_API_KEY" | "CLOUDINARY_API_SECRET"): string {
  const value = process.env[name];
  if (!value) {
    throw new ApiError(`Variável de ambiente obrigatória ausente: ${name}.`, 500);
  }
  return value;
}

export function getCloudinary() {
  if (!isConfigured) {
    cloudinary.config({
      cloud_name: requireEnv("CLOUDINARY_CLOUD_NAME"),
      api_key: requireEnv("CLOUDINARY_API_KEY"),
      api_secret: requireEnv("CLOUDINARY_API_SECRET"),
      secure: true,
    });
    isConfigured = true;
  }
  return cloudinary;
}

export function withCloudinaryAutoDelivery(url: string): string {
  if (!url.includes("/upload/")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto/");
}

function extractCloudinaryPublicId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  if (parsed.hostname !== "res.cloudinary.com") return null;
  const segments = parsed.pathname.split("/").filter(Boolean);
  const uploadIndex = segments.findIndex((segment) => segment === "upload");
  if (uploadIndex < 0) return null;

  let publicPath = segments.slice(uploadIndex + 1);
  const versionIndex = publicPath.findIndex((segment) => /^v\d+$/.test(segment));
  if (versionIndex >= 0) {
    publicPath = publicPath.slice(versionIndex + 1);
  }
  if (publicPath.length === 0) return null;

  const last = publicPath[publicPath.length - 1] ?? "";
  publicPath[publicPath.length - 1] = last.replace(/\.[^.]+$/, "");
  const publicId = publicPath.join("/").trim();
  return publicId || null;
}

export async function deleteCloudinaryImages(imageUrls: readonly string[]): Promise<void> {
  const cloudinary = getCloudinary();
  const uniquePublicIds = Array.from(
    new Set(
      imageUrls
        .map((url) => extractCloudinaryPublicId(url))
        .filter((publicId): publicId is string => Boolean(publicId)),
    ),
  );

  for (const publicId of uniquePublicIds) {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  }
}
