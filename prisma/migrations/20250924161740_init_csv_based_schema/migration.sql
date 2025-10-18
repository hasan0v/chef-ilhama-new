-- CreateTable
CREATE TABLE "public"."recipes" (
    "id" TEXT NOT NULL,
    "yemeyinAdi" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "mense" TEXT,
    "bolge" TEXT,
    "kateqoriya" TEXT NOT NULL,
    "terkibHisseleri" TEXT NOT NULL,
    "hazirlanmaQaydasi" TEXT NOT NULL,
    "hazirlanmaMuddeti" TEXT NOT NULL,
    "cetinlikDerecesi" TEXT NOT NULL,
    "porsiyaSayi" TEXT NOT NULL,
    "tarixiMelumat" TEXT NOT NULL,
    "teqdimTeklifleri" TEXT NOT NULL,
    "sekilLinki" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipes_slug_key" ON "public"."recipes"("slug");
