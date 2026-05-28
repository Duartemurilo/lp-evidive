import { handleApiError, jsonOk } from "@/lib/api/response";
import { listPublishedTrips, toPublicTrip } from "@/lib/trips/trip-service";

export async function GET(): Promise<Response> {
  try {
    const trips = await listPublishedTrips();
    return jsonOk(trips.map(toPublicTrip));
  } catch (error) {
    return handleApiError(error);
  }
}
