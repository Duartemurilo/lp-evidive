import { ApiError } from "@/lib/admin/require-auth";
import { deleteCloudinaryImages } from "@/lib/cloudinary";
import { prisma } from "@/lib/db";
import type { TripExperienceType as PrismaTripExperienceType } from "@prisma/client";
import { buildDuplicateSlug } from "@/lib/trips/slug";
import {
  appStatusToPrisma,
  formValuesToPrismaInput,
  recordToFormValues,
  tripToRecord,
} from "@/lib/trips/trip-mappers";
import { validateTripForm } from "@/lib/trips/trip-validation";
import type { TripFormValues, TripListItem, TripRecord } from "@/lib/types/trip-admin";
import type { PublicTrip } from "@/lib/types/trip-public";

function toListItem(trip: {
  id: string;
  title: string;
  slug: string;
  category: "NACIONAL" | "INTERNACIONAL";
  experienceTypes?: PrismaTripExperienceType[];
  location: string;
  heroImageUrl: string | null;
  status: "RASCUNHO" | "PUBLICADO" | "ESGOTADO" | "ENCERRADO";
  startDate: Date | null;
  endDate: Date | null;
  updatedAt: Date;
}): TripListItem {
  const record = tripToRecord(trip as Parameters<typeof tripToRecord>[0]);
  return {
    id: record.id,
    title: record.title,
    slug: record.slug,
    category: record.category,
    experienceTypes: record.experienceTypes,
    location: record.location,
    heroImageUrl: record.heroImageUrl,
    status: record.status,
    startDate: record.startDate,
    endDate: record.endDate,
    updatedAt: record.updatedAt,
  };
}

export async function isTripSlugAvailable(
  slug: string,
  excludeId?: string,
): Promise<boolean> {
  const existing = await prisma.trip.findUnique({ where: { slug } });
  return !existing || existing.id === excludeId;
}

async function assertUniqueSlug(slug: string, excludeId?: string): Promise<void> {
  const available = await isTripSlugAvailable(slug, excludeId);
  if (!available) {
    throw new ApiError("Já existe uma viagem com este slug.", 409, {
      slug: "Este slug já está em uso.",
    });
  }
}

export async function listAdminTrips(): Promise<TripListItem[]> {
  const trips = await prisma.trip.findMany({
    orderBy: [{ updatedAt: "desc" }],
  });
  return trips.map(toListItem);
}

export async function getAdminTripById(id: string): Promise<TripRecord> {
  const trip = await prisma.trip.findUnique({ where: { id } });
  if (!trip) {
    throw new ApiError("Viagem não encontrada.", 404);
  }
  return tripToRecord(trip);
}

export async function createTrip(
  input: unknown,
  userId: string,
): Promise<TripRecord> {
  const validation = validateTripForm(input);
  if (!validation.success) {
    throw new ApiError("Dados inválidos.", 400, validation.errors);
  }

  await assertUniqueSlug(validation.data.slug);

  const data = formValuesToPrismaInput(validation.data, userId);
  const trip = await prisma.trip.create({
    data: {
      ...data,
      createdById: userId,
    },
  });

  return tripToRecord(trip);
}

export async function updateTrip(
  id: string,
  input: unknown,
  userId: string,
): Promise<TripRecord> {
  const existing = await prisma.trip.findUnique({ where: { id } });
  if (!existing) {
    throw new ApiError("Viagem não encontrada.", 404);
  }

  const validation = validateTripForm(input);
  if (!validation.success) {
    throw new ApiError("Dados inválidos.", 400, validation.errors);
  }

  await assertUniqueSlug(validation.data.slug, id);

  const data = formValuesToPrismaInput(validation.data, userId);
  const trip = await prisma.trip.update({
    where: { id },
    data,
  });

  return tripToRecord(trip);
}

export async function deleteTrip(id: string): Promise<void> {
  const existing = await prisma.trip.findUnique({ where: { id } });
  if (!existing) {
    throw new ApiError("Viagem não encontrada.", 404);
  }
  const record = tripToRecord(existing);
  const imageUrls = [
    record.heroImageUrl,
    ...record.pageSections.map((section) => section.imageUrl),
  ].filter((url): url is string => Boolean(url?.trim()));

  await prisma.trip.delete({ where: { id } });
  if (imageUrls.length > 0) {
    try {
      await deleteCloudinaryImages(imageUrls);
    } catch {
      // Falha de limpeza de mídia não deve impedir remoção da viagem no banco.
    }
  }
}

export async function duplicateTrip(
  id: string,
  userId: string,
): Promise<TripRecord> {
  const existing = await prisma.trip.findUnique({ where: { id } });
  if (!existing) {
    throw new ApiError("Viagem não encontrada.", 404);
  }

  const base = recordToFormValues(tripToRecord(existing));
  const slug = buildDuplicateSlug(existing.slug);

  let uniqueSlug = slug;
  let attempt = 0;
  while (attempt < 5) {
    const found = await prisma.trip.findUnique({ where: { slug: uniqueSlug } });
    if (!found) break;
    uniqueSlug = buildDuplicateSlug(existing.slug);
    attempt += 1;
  }

  const copy: TripFormValues = {
    ...base,
    title: `${existing.title} (cópia)`,
    slug: uniqueSlug,
    status: "rascunho",
  };

  const data = formValuesToPrismaInput(copy, userId);
  const trip = await prisma.trip.create({
    data: {
      ...data,
      createdById: userId,
    },
  });

  return tripToRecord(trip);
}

export async function listPublishedTrips(): Promise<TripRecord[]> {
  const trips = await prisma.trip.findMany({
    where: { status: appStatusToPrisma("publicado") },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }, { title: "asc" }],
  });
  return trips.map(tripToRecord);
}

export async function getPublishedTripBySlug(
  slug: string,
): Promise<TripRecord> {
  const trip = await prisma.trip.findFirst({
    where: {
      slug,
      status: appStatusToPrisma("publicado"),
    },
  });
  if (!trip) {
    throw new ApiError("Viagem não encontrada.", 404);
  }
  return tripToRecord(trip);
}

export function toPublicTrip(record: TripRecord): PublicTrip {
  const {
    createdById: _createdById,
    updatedById: _updatedById,
    ...publicFields
  } = record;
  return publicFields;
}
