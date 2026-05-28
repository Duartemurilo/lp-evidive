-- CreateEnum
CREATE TYPE "TripCategory" AS ENUM ('NACIONAL', 'INTERNACIONAL');

-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('RASCUNHO', 'PUBLICADO', 'ESGOTADO', 'ENCERRADO');

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" "TripCategory" NOT NULL,
    "destinationName" TEXT NOT NULL,
    "location" TEXT NOT NULL DEFAULT '',
    "heroImageUrl" TEXT,
    "shortDescription" TEXT NOT NULL,
    "status" "TripStatus" NOT NULL DEFAULT 'RASCUNHO',
    "pageSubtitle" TEXT,
    "introText" TEXT,
    "ctaLabel" TEXT,
    "ctaUrl" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "dateText" TEXT,
    "price" TEXT,
    "priceText" TEXT,
    "spots" INTEGER,
    "commercialNote" TEXT,
    "experienceTitle" TEXT,
    "experienceText" TEXT,
    "experienceImageUrl" TEXT,
    "whyDiveTitle" TEXT,
    "whyDiveText" TEXT,
    "highlights" JSONB NOT NULL DEFAULT '[]',
    "packageTitle" TEXT,
    "packageDescription" TEXT,
    "includedItems" JSONB NOT NULL DEFAULT '[]',
    "notIncludedItems" JSONB NOT NULL DEFAULT '[]',
    "paymentCondition" TEXT,
    "hasTransportSection" BOOLEAN NOT NULL DEFAULT false,
    "transportTitle" TEXT,
    "transportDescription" TEXT,
    "transportNotes" TEXT,
    "hasAccommodationSection" BOOLEAN NOT NULL DEFAULT false,
    "accommodationName" TEXT,
    "accommodationImageUrl" TEXT,
    "accommodationDescription" TEXT,
    "accommodationItems" JSONB NOT NULL DEFAULT '[]',
    "hasDiveInfoSection" BOOLEAN NOT NULL DEFAULT false,
    "diveInfoTitle" TEXT,
    "diveInfoDescription" TEXT,
    "waterTemperature" TEXT,
    "visibility" TEXT,
    "depth" TEXT,
    "diveSites" JSONB NOT NULL DEFAULT '[]',
    "underwaterAttractions" JSONB NOT NULL DEFAULT '[]',
    "partnerOperator" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trip_slug_key" ON "Trip"("slug");

-- CreateIndex
CREATE INDEX "Trip_status_isFeatured_sortOrder_idx" ON "Trip"("status", "isFeatured", "sortOrder");

-- CreateIndex
CREATE INDEX "Trip_slug_idx" ON "Trip"("slug");
