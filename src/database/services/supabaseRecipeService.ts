// Supabase-based Recipe Service for Chef İlhamə - v2 (normalized schema)
import { PrismaClient, Prisma } from '@prisma/client'
import type { Recipe } from '../../types/recipe'
import { recipeMatchesCategory } from '../../utils/categoryUtils'

// Singleton Prisma client
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
  log: process.env.NODE_ENV === 'development' ? ['error'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Prisma include shape for full recipe
const recipeInclude = {
  kateqoriya: true,
  mense: true,
  bolge: true,
  terkibHisseleri: { 
    orderBy: { sira: 'asc' as const },
    include: { miqdar: true }
  },
  addimlar: { orderBy: { sira: 'asc' as const } },
  sekiller: true,
} satisfies Prisma.RecipeInclude

type RecipeWithRelations = Prisma.RecipeGetPayload<{ include: typeof recipeInclude }>

function getLocalizedField(obj: any, baseField: string, locale?: string): string {
  if (!obj) return '';
  const isAz = !locale || locale === 'az';
  if (isAz) return obj[baseField] ?? '';

  // E.g. yemeyinAdi -> yemeyinAdi + Locale (capitalized: En, Ru, Tr, etc.)
  const capLocale = locale.charAt(0).toUpperCase() + locale.slice(1);
  const localizedKey = `${baseField}${capLocale}`;

  // If the localized field exists and is not empty, use it
  if (obj[localizedKey] !== undefined && obj[localizedKey] !== null && obj[localizedKey] !== '') {
    return obj[localizedKey];
  }

  // Fallback to English (En suffix)
  const enKey = `${baseField}En`;
  if (obj[enKey] !== undefined && obj[enKey] !== null && obj[enKey] !== '') {
    return obj[enKey];
  }

  // Fallback to Azerbaijani (base field)
  return obj[baseField] ?? '';
}

function transform(r: RecipeWithRelations, locale?: string): Recipe {
  return {
    id: r.id,
    name: getLocalizedField(r, 'yemeyinAdi', locale),
    slug: r.slug,
    origin: getLocalizedField(r.mense, 'ad', locale),
    region: getLocalizedField(r.bolge, 'ad', locale),
    category: getLocalizedField(r.kateqoriya, 'ad', locale),
    ingredients: r.terkibHisseleri.map(i => {
      const ingName = getLocalizedField(i, 'ad', locale);
      if (i.miqdar) {
        const qtyVal = i.miqdar.miqdar;
        const unitName = getLocalizedField(i.miqdar, 'ad', locale);
        return qtyVal ? `${ingName} – ${qtyVal} ${unitName}` : `${ingName} – ${unitName}`;
      }
      return ingName;
    }),
    instructions: r.addimlar.map(s => getLocalizedField(s, 'metn', locale)),
    prepTime: getLocalizedField(r, 'hazirlanmaMuddeti', locale),
    difficulty: getLocalizedField(r, 'cetinlikDerecesi', locale) as any,
    servings: getLocalizedField(r, 'porsiyaSayi', locale),
    history: getLocalizedField(r, 'tarixiMelumat', locale),
    servingSuggestions: getLocalizedField(r, 'teqdimTeklifleri', locale),
    image: r.sekiller.find(s => s.isMain)?.url ?? r.sekiller[0]?.url ?? '',
    tags: [],
    featured: r.featured,
  }
}

export class SupabaseRecipeService {
  async getAllRecipes(options?: {
    limit?: number
    offset?: number
    category?: string
    difficulty?: string
    region?: string
    featured?: boolean
    searchQuery?: string
    locale?: string
  }): Promise<{ recipes: Recipe[]; total: number }> {
    try {
      const { limit = 50, offset = 0, category, difficulty, region, featured, searchQuery, locale } = options ?? {}

      const where: Prisma.RecipeWhereInput = {}

      if (category) {
        where.kateqoriya = {
          OR: [
            { ad: { contains: category, mode: 'insensitive' } },
            { adEn: { contains: category, mode: 'insensitive' } }
          ]
        }
      }
      if (difficulty) {
        where.cetinlikDerecesi = difficulty
      }
      if (region) {
        where.OR = [
          { mense: { ad: { contains: region, mode: 'insensitive' } } },
          { mense: { adEn: { contains: region, mode: 'insensitive' } } },
          { bolge: { ad: { contains: region, mode: 'insensitive' } } },
          { bolge: { adEn: { contains: region, mode: 'insensitive' } } },
        ]
      }
      if (featured !== undefined) where.featured = featured

      if (searchQuery) {
        where.OR = [
          { yemeyinAdi: { contains: searchQuery, mode: 'insensitive' } },
          { yemeyinAdiEn: { contains: searchQuery, mode: 'insensitive' } },
          { tarixiMelumat: { contains: searchQuery, mode: 'insensitive' } },
          { tarixiMelumatEn: { contains: searchQuery, mode: 'insensitive' } },
          { kateqoriya: { ad: { contains: searchQuery, mode: 'insensitive' } } },
          { kateqoriya: { adEn: { contains: searchQuery, mode: 'insensitive' } } },
          { mense: { ad: { contains: searchQuery, mode: 'insensitive' } } },
          { mense: { adEn: { contains: searchQuery, mode: 'insensitive' } } },
          { bolge: { ad: { contains: searchQuery, mode: 'insensitive' } } },
          { bolge: { adEn: { contains: searchQuery, mode: 'insensitive' } } },
          { terkibHisseleri: { some: { ad: { contains: searchQuery, mode: 'insensitive' } } } },
          { terkibHisseleri: { some: { adEn: { contains: searchQuery, mode: 'insensitive' } } } },
        ]
      }

      const [rows, total] = await Promise.all([
        prisma.recipe.findMany({ where, include: recipeInclude, orderBy: { createdAt: 'desc' }, take: limit, skip: offset }),
        prisma.recipe.count({ where }),
      ])

      return { recipes: rows.map(r => transform(r, locale)), total }
    } catch (error) {
      console.error('Error fetching recipes:', error)
      return { recipes: [], total: 0 }
    }
  }

  async getRecipeBySlug(slug: string, locale?: string): Promise<Recipe | null> {
    try {
      const r = await prisma.recipe.findUnique({ where: { slug }, include: recipeInclude })
      return r ? transform(r, locale) : null
    } catch (error) {
      console.error('Error fetching recipe by slug:', error)
      return null
    }
  }

  async getFeaturedRecipes(limit = 6, locale?: string): Promise<Recipe[]> {
    const result = await this.getAllRecipes({ featured: true, limit, locale })
    return result.recipes
  }

  async getRecipesByCategory(category: string, limit = 10, locale?: string): Promise<Recipe[]> {
    try {
      const all = await prisma.recipe.findMany({ include: recipeInclude, orderBy: { createdAt: 'desc' } })
      return all
        .map(r => transform(r, locale))
        .filter(r => recipeMatchesCategory(r.category, category))
        .slice(0, limit)
    } catch (error) {
      console.error('Error fetching recipes by category:', error)
      return []
    }
  }

  async getRecipesByRegion(region: string, limit = 10, locale?: string): Promise<Recipe[]> {
    const result = await this.getAllRecipes({ region, limit, locale })
    return result.recipes
  }

  async searchRecipes(query: string, limit = 20, locale?: string): Promise<Recipe[]> {
    const result = await this.getAllRecipes({ searchQuery: query, limit, locale })
    return result.recipes
  }

  async getCategories(locale?: string): Promise<string[]> {
    try {
      const cats = await prisma.category.findMany({ orderBy: { ad: 'asc' } })
      return cats.map(c => getLocalizedField(c, 'ad', locale))
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  async getRegions(locale?: string): Promise<string[]> {
    try {
      const [menseler, bolgeler] = await Promise.all([
        prisma.mense.findMany({ orderBy: { ad: 'asc' } }),
        prisma.bolge.findMany({ orderBy: { ad: 'asc' } }),
      ])
      const all = new Set([
        ...menseler.map(m => getLocalizedField(m, 'ad', locale)),
        ...bolgeler.map(b => getLocalizedField(b, 'ad', locale))
      ])
      return Array.from(all).sort()
    } catch (error) {
      console.error('Error fetching regions:', error)
      return []
    }
  }

  async getStats(): Promise<{ totalRecipes: number; featuredRecipes: number; categories: number; regions: number }> {
    try {
      const [totalRecipes, featuredRecipes, catCount, regionCount] = await Promise.all([
        prisma.recipe.count(),
        prisma.recipe.count({ where: { featured: true } }),
        prisma.category.count(),
        prisma.mense.count(),
      ])
      return { totalRecipes, featuredRecipes, categories: catCount, regions: regionCount }
    } catch (error) {
      console.error('Error fetching recipe stats:', error)
      return { totalRecipes: 0, featuredRecipes: 0, categories: 0, regions: 0 }
    }
  }

  async recordInteraction(recipeId: string, type: 'VIEW' | 'SHARE' | 'PRINT'): Promise<void> {
    console.log(`Recipe interaction: ${recipeId} - ${type}`)
  }
}

export const supabaseRecipeService = new SupabaseRecipeService()
export default supabaseRecipeService
