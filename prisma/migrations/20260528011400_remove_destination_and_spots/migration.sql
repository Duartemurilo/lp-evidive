-- Preserve location text before removing legacy destination field.
UPDATE "Trip"
SET "location" = COALESCE(NULLIF("location", ''), "destinationName")
WHERE "destinationName" IS NOT NULL;

ALTER TABLE "Trip"
DROP COLUMN "destinationName",
DROP COLUMN "spots";
