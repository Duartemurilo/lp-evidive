import { handleApiError, jsonOk } from "@/lib/api/response";
import {
  getPublishedTripBySlug,
  toPublicTrip,
} from "@/lib/trips/trip-service";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<Response> {
  try {
    const { slug } = await context.params;
    const trip = await getPublishedTripBySlug(slug);
    return jsonOk(toPublicTrip(trip));
  } catch (error) {
    return handleApiError(error);
  }
}
