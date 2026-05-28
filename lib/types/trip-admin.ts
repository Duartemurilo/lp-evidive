import {
  createEmptyTripPageSection,
  type TripPageSection,
} from "@/lib/types/trip-page-section";
import type { TripExperienceType } from "@/lib/trips/trip-experience-types";

export const TRIP_CATEGORIES = ["nacional", "internacional"] as const;
export type TripCategory = (typeof TRIP_CATEGORIES)[number];

export const TRIP_STATUSES = [
  "rascunho",
  "publicado",
  "esgotado",
  "encerrado",
] as const;
export type TripStatus = (typeof TRIP_STATUSES)[number];

export type TripStringList = string[];

export type TripRecord = {
  id: string;
  title: string;
  slug: string;
  category: TripCategory;
  experienceTypes: TripExperienceType[];
  location: string;
  heroImageUrl: string | null;
  shortDescription: string;
  pageSections: TripPageSection[];
  status: TripStatus;
  startDate: string | null;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
  createdById: string | null;
  updatedById: string | null;
};

export type TripFormValues = {
  title: string;
  slug: string;
  category: TripCategory;
  experienceTypes: TripExperienceType[];
  heroImageUrl: string | null;
  startDate: string | null;
  endDate: string | null;
  status: TripStatus;
  pageSections: TripPageSection[];
};

export const emptyTripFormValues = (): TripFormValues => ({
  title: "",
  slug: "",
  category: "nacional",
  experienceTypes: [],
  heroImageUrl: null,
  startDate: null,
  endDate: null,
  status: "publicado",
  pageSections: [createEmptyTripPageSection()],
});

export type TripListItem = Pick<
  TripRecord,
  | "id"
  | "title"
  | "slug"
  | "category"
  | "experienceTypes"
  | "location"
  | "heroImageUrl"
  | "status"
  | "startDate"
  | "endDate"
  | "updatedAt"
>;
