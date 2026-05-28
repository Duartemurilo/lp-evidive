import { requireAuthUserId } from "@/lib/admin/require-auth";
import { handleApiError, jsonOk } from "@/lib/api/response";
import {
  deleteTrip,
  getAdminTripById,
  updateTrip,
} from "@/lib/trips/trip-service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  try {
    await requireAuthUserId();
    const { id } = await context.params;
    const trip = await getAdminTripById(id);
    return jsonOk(trip);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
  request: Request,
  context: RouteContext,
): Promise<Response> {
  try {
    const userId = await requireAuthUserId();
    const { id } = await context.params;
    const body: unknown = await request.json();
    const trip = await updateTrip(id, body, userId);
    return jsonOk(trip);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  try {
    await requireAuthUserId();
    const { id } = await context.params;
    await deleteTrip(id);
    return jsonOk({ deleted: true });
  } catch (error) {
    return handleApiError(error);
  }
}
