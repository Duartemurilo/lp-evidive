import { handleApiError, jsonOk } from "@/lib/api/response";
import { listPublishedTrips } from "@/lib/trips/trip-service";
import { buildViagensCatalogResponse } from "@/lib/viagens-catalog-build";

export async function GET(): Promise<Response> {
  try {
    const records = await listPublishedTrips();
    return jsonOk(buildViagensCatalogResponse(records));
  } catch (error) {
    return handleApiError(error);
  }
}
