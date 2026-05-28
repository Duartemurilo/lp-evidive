import { requireAuthUserId } from "@/lib/admin/require-auth";
import { handleApiError, jsonOk } from "@/lib/api/response";
import { revalidatePublicTripCache } from "@/lib/trips/revalidate-public-trips";
import { createTrip, listAdminTrips } from "@/lib/trips/trip-service";

export async function GET(): Promise<Response> {
  try {
    await requireAuthUserId();
    const trips = await listAdminTrips();
    return jsonOk(trips);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const userId = await requireAuthUserId();
    const body: unknown = await request.json();
    const trip = await createTrip(body, userId);
    if (trip.status === "publicado") {
      revalidatePublicTripCache(trip.slug);
    }
    return jsonOk(trip, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
