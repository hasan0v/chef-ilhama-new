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
  terkibHisseleri: { orderBy: { sira: 'asc' as const } },
  addimlar: { orderBy: { sira: 'asc' as const } },
  sekiller: true,
} satisfies Prisma.RecipeInclude

type RecipeWithRelations = Prisma.RecipeGetPayload<{ include: typeof recipeInclude }>

function transform(r: RecipeWithRelations): Recipe {
  return {
    id: r.id,
    name: r.yemeyinAdi,
    slug: r.slug,
    origin: r.mense?.ad ?? '',
    region: r.bolge?.ad ?? '',
    category: r.kateqoriya.ad,
    ingredients: r.terkibHisseleri.map(i => i.miqdar ? `${i.ad} – ${i.miqdar}` : i.ad),
    instructions: r.addimlar.map(s => s.metn),
    prepTime: r.hazirlanmaMuddeti,
    difficulty: r.cetinlikDerecesi as 'Asan' | 'Orta' | 'Çətin',
    servings: r.porsiyaSayi,
    history: r.tarixiMelumat ?? '',
    servingSuggestions: r.teqdimTeklifleri ?? '',
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
  }): Promise<{ recipes: Recipe[]; total: number }> {
    try {
      const { limit = 50, offset = 0, category, difficulty, region, featured, searchQuery } = options ?? {}

      const where: Prisma.RecipeWhereInput = {}

      if (category) where.kateqoriya = { ad: { contains: category, mode: 'insensitive' } }
      if (difficulty) where.cetinlikDerecesi = difficulty
      if (region) where.OR = [
        { mense: { ad: { contains: region, mode: 'insensitive' } } },
        { bolge: { ad: { contains: region, mode: 'insensitive' } } },
      ]
      if (featured !== undefined) where.featured = featured

      if (searchQuery) {
        where.OR = [
          { yemeyinAdi: { contains: searchQuery, mode: 'insensitive' } },
          { tarixiMelumat: { contains: searchQuery, mode: 'insensitive' } },
          { kateqoriya: { ad: { contains: searchQuery, mode: 'insensitive' } } },
          { mense: { ad: { contains: searchQuery, mode: 'insensitive' } } },
          { bolge: { ad: { contains: searchQuery, mode: 'insensitive' } } },
          { terkibHisseleri: { some: { ad: { contains: searchQuery, mode: 'insensitive' } } } },
        ]
      }

      const [rows, total] = await Promise.all([
        prisma.recipe.findMany({ where, include: recipeInclude, orderBy: { createdAt: 'desc' }, take: limit, skip: offset }),
        prisma.recipe.count({ where }),
      ])

      return { recipes: rows.map(transform), total }
    } catch (error) {
      console.error('Error fetching recipes:', error)
      return { recipes: [], total: 0 }
    }
  }

  async getRecipeBySlug(slug: string): Promise<Recipe | null> {
    try {
      const r = await prisma.recipe.findUnique({ where: { slug }, include: recipeInclude })
      return r ? transform(r) : null
    } catch (error) {
      console.error('Error fetching recipe by slug:', error)
      return null
    }
  }

  async getFeaturedRecipes(limit = 6): Promise<Recipe[]> {
    const result = await this.getAllRecipes({ featured: true, limit })
    return result.recipes
  }

  async getRecipesByCategory(category: string, limit = 10): Promise<Recipe[]> {
    try {
      const all = await prisma.recipe.findMany({ include: recipeInclude, orderBy: { createdAt: 'desc' } })
      return all
        .map(transform)
        .filter(r => recipeMatchesCategory(r.category, category))
        .slice(0, limit)
    } catch (error) {
      console.error('Error fetching recipes by category:', error)
      return []
    }
  }

  async getRecipesByRegion(region: string, limit = 10): Promise<Recipe[]> {
    const result = await this.getAllRecipes({ region, limit })
    return result.recipes
  }

  async searchRecipes(query: string, limit = 20): Promise<Recipe[]> {
    const result = await this.getAllRecipes({ searchQuery: query, limit })
    return result.recipes
  }

  async getCategories(): Promise<string[]> {
    try {
      const cats = await prisma.category.findMany({ orderBy: { ad: 'asc' } })
      return cats.map(c => c.ad)
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  async getRegions(): Promise<string[]> {
    try {
      const [menseler, bolgeler] = await Promise.all([
        prisma.mense.findMany({ orderBy: { ad: 'asc' } }),
        prisma.bolge.findMany({ orderBy: { ad: 'asc' } }),
      ])
      const all = new Set([...menseler.map(m => m.ad), ...bolgeler.map(b => b.ad)])
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

