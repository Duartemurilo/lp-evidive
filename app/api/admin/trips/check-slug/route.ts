import { requireAuthUserId } from "@/lib/admin/require-auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api/response";
import { isTripSlugAvailable } from "@/lib/trips/trip-service";
import { isValidTripSlug } from "@/lib/trips/trip-validation";

export async function GET(request: Request): Promise<Response> {
  try {
    await requireAuthUserId();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug")?.trim() ?? "";
    const excludeId = searchParams.get("excludeId")?.trim() || undefined;

    if (!slug) {
      return jsonError("Informe o slug.", 400);
    }

    if (!isValidTripSlug(slug)) {
      return jsonError("Slug inválido.", 400);
    }

    const available = await isTripSlugAvailable(slug, excludeId);
    return jsonOk({ available });
  } catch (error) {
    return handleApiError(error);
  }
}
