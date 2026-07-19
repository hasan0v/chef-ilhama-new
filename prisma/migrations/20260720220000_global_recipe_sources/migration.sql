ALTER TABLE "recipe_images"
  ADD COLUMN "altAz" TEXT,
  ADD COLUMN "altEn" TEXT,
  ADD COLUMN "credit" TEXT,
  ADD COLUMN "sourceUrl" TEXT,
  ADD COLUMN "license" TEXT,
  ADD COLUMN "licenseUrl" TEXT,
  ADD COLUMN "width" INTEGER,
  ADD COLUMN "height" INTEGER;

CREATE TABLE "recipe_sources" (
  "id" TEXT NOT NULL,
  "title" TEXT,
  "url" TEXT NOT NULL,
  "recipeId" TEXT NOT NULL,
  CONSTRAINT "recipe_sources_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "recipe_sources_recipeId_idx" ON "recipe_sources"("recipeId");
CREATE UNIQUE INDEX "recipe_sources_recipeId_url_key" ON "recipe_sources"("recipeId", "url");

ALTER TABLE "recipe_sources"
  ADD CONSTRAINT "recipe_sources_recipeId_fkey"
  FOREIGN KEY ("recipeId") REFERENCES "recipes"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
