import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { PrismaClient } from '@prisma/client'

type LocalizedRecipe = {
  name: string
  origin: string
  region: string
  category: string
  prepTime: string
  difficulty: string
  servings: string
  history: string
  servingSuggestions: string
  ingredients: string[]
  instructions: string[]
}

type SeedRecipe = {
  slug: string
  az: LocalizedRecipe
  en: LocalizedRecipe
  image: {
    author?: string
    credit?: string
    sourceUrl: string
    license: string
    licenseUrl?: string | null
  }
  sources: Array<{ title?: string; url: string }>
  research: { opportunityScore: number }
}

type ImageManifest = {
  slug: string
  path: string
  width: number
  height: number
  bytes: number
}

async function main() {
  const prisma = new PrismaClient()
  const apply = process.argv.includes('--apply')
  const root = process.cwd()
  const seed = JSON.parse(await readFile(path.join(root, 'content', 'global-recipes.generated.json'), 'utf8')) as { recipes: SeedRecipe[] }
  const manifest = JSON.parse(await readFile(path.join(root, 'research', 'global-recipe-images.json'), 'utf8')) as { images: ImageManifest[] }
  const imageBySlug = new Map(manifest.images.map((image) => [image.slug, image]))

  function assertSeed() {
  const problems: string[] = []
  const slugs = new Set<string>()
  for (const recipe of seed.recipes) {
    if (slugs.has(recipe.slug)) problems.push(`${recipe.slug}: duplicate slug`)
    slugs.add(recipe.slug)
    if (!imageBySlug.has(recipe.slug)) problems.push(`${recipe.slug}: image missing from manifest`)
    if (recipe.az.ingredients.length !== recipe.en.ingredients.length) problems.push(`${recipe.slug}: ingredient locale mismatch`)
    if (recipe.az.instructions.length !== recipe.en.instructions.length) problems.push(`${recipe.slug}: instruction locale mismatch`)
    if (!recipe.image.sourceUrl || !recipe.image.license) problems.push(`${recipe.slug}: image attribution missing`)
  }
  if (seed.recipes.length !== 50 || slugs.size !== 50) problems.push(`Expected 50 unique recipes, got ${seed.recipes.length}/${slugs.size}`)
  if (problems.length) throw new Error(problems.join('\n'))
  }

assertSeed()

const slugs = seed.recipes.map((recipe) => recipe.slug)
const [beforeCount, alreadyPresent] = await Promise.all([
  prisma.recipe.count(),
  prisma.recipe.count({ where: { slug: { in: slugs } } }),
])

console.log(JSON.stringify({
  mode: apply ? 'apply' : 'dry-run',
  currentRecipeCount: beforeCount,
  selectedRecipes: seed.recipes.length,
  selectedAlreadyPresent: alreadyPresent,
  expectedRecipeCountAfterApply: beforeCount + seed.recipes.length - alreadyPresent,
  localImageBytes: manifest.images.reduce((sum, image) => sum + (image.bytes || 0), 0),
}, null, 2))

if (!apply) {
  console.log('Dry-run passed. Re-run with --apply to write the selected recipes.')
  await prisma.$disconnect()
  process.exit(0)
}

const featuredSlugs = new Set(
  [...seed.recipes]
    .sort((left, right) => right.research.opportunityScore - left.research.opportunityScore)
    .slice(0, 6)
    .map((recipe) => recipe.slug),
)

for (let index = 0; index < seed.recipes.length; index += 1) {
  const recipe = seed.recipes[index]
  const image = imageBySlug.get(recipe.slug)!
  const credit = [recipe.image.author, recipe.image.credit].filter(Boolean).join(' — ')

  await prisma.$transaction(async (tx) => {
    const category = await tx.category.upsert({
      where: { ad: recipe.az.category },
      update: { adEn: recipe.en.category },
      create: { ad: recipe.az.category, adEn: recipe.en.category },
    })
    const origin = await tx.mense.upsert({
      where: { ad: recipe.az.origin },
      update: { adEn: recipe.en.origin },
      create: { ad: recipe.az.origin, adEn: recipe.en.origin },
    })
    const region = await tx.bolge.upsert({
      where: { ad: recipe.az.region },
      update: { adEn: recipe.en.region },
      create: { ad: recipe.az.region, adEn: recipe.en.region },
    })

    const row = await tx.recipe.upsert({
      where: { slug: recipe.slug },
      update: {
        yemeyinAdi: recipe.az.name,
        yemeyinAdiEn: recipe.en.name,
        hazirlanmaMuddeti: recipe.az.prepTime,
        hazirlanmaMuddetiEn: recipe.en.prepTime,
        cetinlikDerecesi: recipe.az.difficulty,
        cetinlikDerecesiEn: recipe.en.difficulty,
        porsiyaSayi: recipe.az.servings,
        porsiyaSayiEn: recipe.en.servings,
        tarixiMelumat: recipe.az.history,
        tarixiMelumatEn: recipe.en.history,
        teqdimTeklifleri: recipe.az.servingSuggestions,
        teqdimTeklifleriEn: recipe.en.servingSuggestions,
        featured: featuredSlugs.has(recipe.slug),
        kateqoriyaId: category.id,
        menseId: origin.id,
        bolgeId: region.id,
      },
      create: {
        slug: recipe.slug,
        yemeyinAdi: recipe.az.name,
        yemeyinAdiEn: recipe.en.name,
        hazirlanmaMuddeti: recipe.az.prepTime,
        hazirlanmaMuddetiEn: recipe.en.prepTime,
        cetinlikDerecesi: recipe.az.difficulty,
        cetinlikDerecesiEn: recipe.en.difficulty,
        porsiyaSayi: recipe.az.servings,
        porsiyaSayiEn: recipe.en.servings,
        tarixiMelumat: recipe.az.history,
        tarixiMelumatEn: recipe.en.history,
        teqdimTeklifleri: recipe.az.servingSuggestions,
        teqdimTeklifleriEn: recipe.en.servingSuggestions,
        featured: featuredSlugs.has(recipe.slug),
        kateqoriyaId: category.id,
        menseId: origin.id,
        bolgeId: region.id,
      },
    })

    await tx.ingredient.deleteMany({ where: { recipeId: row.id } })
    await tx.step.deleteMany({ where: { recipeId: row.id } })
    await tx.recipeImage.deleteMany({ where: { recipeId: row.id } })
    await tx.recipeSource.deleteMany({ where: { recipeId: row.id } })

    await tx.ingredient.createMany({
      data: recipe.az.ingredients.map((ingredient, order) => ({
        recipeId: row.id,
        ad: ingredient,
        adEn: recipe.en.ingredients[order],
        sira: order + 1,
      })),
    })
    await tx.step.createMany({
      data: recipe.az.instructions.map((instruction, order) => ({
        recipeId: row.id,
        metn: instruction,
        metnEn: recipe.en.instructions[order],
        sira: order + 1,
      })),
    })
    await tx.recipeImage.create({
      data: {
        recipeId: row.id,
        url: image.path,
        isMain: true,
        altAz: `${recipe.az.name} — ${recipe.az.origin} mətbəxi`,
        altEn: `${recipe.en.name} — ${recipe.en.origin} cuisine`,
        credit,
        sourceUrl: recipe.image.sourceUrl,
        license: recipe.image.license,
        licenseUrl: recipe.image.licenseUrl || null,
        width: image.width,
        height: image.height,
      },
    })
    await tx.recipeSource.createMany({
      data: recipe.sources.map((source) => ({ recipeId: row.id, title: source.title, url: source.url })),
      skipDuplicates: true,
    })
  }, { timeout: 20_000 })

  console.log(`Imported ${index + 1}/${seed.recipes.length}: ${recipe.slug}`)
}

const [afterCount, importedCount, importedImages, importedSources] = await Promise.all([
  prisma.recipe.count(),
  prisma.recipe.count({ where: { slug: { in: slugs } } }),
  prisma.recipeImage.count({ where: { recipe: { slug: { in: slugs } } } }),
  prisma.recipeSource.count({ where: { recipe: { slug: { in: slugs } } } }),
])

console.log(JSON.stringify({ afterCount, importedCount, importedImages, importedSources }, null, 2))
if (importedCount !== 50 || importedImages !== 50 || importedSources < 50) throw new Error('Post-import verification failed')
  await prisma.$disconnect()
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
