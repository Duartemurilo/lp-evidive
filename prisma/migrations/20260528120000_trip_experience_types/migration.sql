-- CreateEnum
CREATE TYPE "TripExperienceType" AS ENUM (
  'OPEN_WATER_PLUS',
  'ADVANCED_PLUS',
  'LIVEABOARD',
  'RESORT',
  'EXPEDICAO',
  'FOTOGRAFIA',
  'VIDA_MARINHA'
);

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN "experienceTypes" "TripExperienceType"[] NOT NULL DEFAULT ARRAY[]::"TripExperienceType"[];
