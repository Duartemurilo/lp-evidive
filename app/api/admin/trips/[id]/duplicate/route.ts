import { requireAuthUserId } from "@/lib/admin/require-auth";
import { handleApiError, jsonOk } from "@/lib/api/response";
import { duplicateTrip } from "@/lib/trips/trip-service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  try {
    const userId = await requireAuthUserId();
    const { id } = await context.params;
    const trip = await duplicateTrip(id, userId);
    return jsonOk(trip, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
