// Supabase-based Recipe Service for Chef İlhamə
import { PrismaClient, Prisma } from '@prisma/client'
import type { Recipe } from '../../types/recipe'
import { splitCategories, recipeMatchesCategory } from '../../utils/categoryUtils'

// Optimize Prisma client with connection pooling
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
  log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
})

export class SupabaseRecipeService {
  // Parse ingredients from the CSV text format
  private parseIngredients(ingredientsText: string): string[] {
    if (!ingredientsText) return []
    return ingredientsText.split(';').map(ingredient => ingredient.trim()).filter(Boolean)
  }

  // Parse instructions from the CSV text format
  private parseInstructions(instructionsText: string): string[] {
    if (!instructionsText) return []
    return instructionsText.split(/\d+\)/).slice(1).map(step => step.trim()).filter(Boolean)
  }

  // Get all recipes with optional filtering and pagination
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
      const {
        limit = 50,
        offset = 0,
        category,
        difficulty,
        region,
        featured,
        searchQuery
      } = options || {}

      // Build where clause
      const where: Prisma.RecipeWhereInput = {}
      
      if (category) where.kateqoriya = category
      if (difficulty) where.cetinlikDerecesi = difficulty
      if (region) where.mense = region
      if (featured !== undefined) where.featured = featured
      
      if (searchQuery) {
        where.OR = [
          { yemeyinAdi: { contains: searchQuery, mode: 'insensitive' } },
          { tarixiMelumat: { contains: searchQuery, mode: 'insensitive' } },
          { kateqoriya: { contains: searchQuery, mode: 'insensitive' } },
          { mense: { contains: searchQuery, mode: 'insensitive' } },
          { bolge: { contains: searchQuery, mode: 'insensitive' } }
        ]
      }

      // Get recipes
      const recipes = await prisma.recipe.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset
      })

      // Get total count
      const total = await prisma.recipe.count({ where })

      // Transform data to match Recipe interface
      const transformedRecipes: Recipe[] = recipes.map(recipe => ({
        id: recipe.id,
        name: recipe.yemeyinAdi,
        slug: recipe.slug,
        origin: recipe.mense || '',
        region: recipe.bolge || '',
        category: recipe.kateqoriya,
        ingredients: this.parseIngredients(recipe.terkibHisseleri),
        instructions: this.parseInstructions(recipe.hazirlanmaQaydasi),
        prepTime: recipe.hazirlanmaMuddeti,
        difficulty: recipe.cetinlikDerecesi as 'Asan' | 'Orta' | 'Çətin',
        servings: recipe.porsiyaSayi,
        history: recipe.tarixiMelumat,
        servingSuggestions: recipe.teqdimTeklifleri,
        image: recipe.sekilLinki,
        tags: [], // No tags in current schema
        featured: recipe.featured
      }))

      return { recipes: transformedRecipes, total }
    } catch (error) {
      console.error('Error fetching recipes:', error)
      return { recipes: [], total: 0 }
    }
  }

  // Get recipe by slug
  async getRecipeBySlug(slug: string): Promise<Recipe | null> {
    try {
      const recipe = await prisma.recipe.findUnique({
        where: { slug }
      })

      if (!recipe) return null

      return {
        id: recipe.id,
        name: recipe.yemeyinAdi,
        slug: recipe.slug,
        origin: recipe.mense || '',
        region: recipe.bolge || '',
        category: recipe.kateqoriya,
        ingredients: this.parseIngredients(recipe.terkibHisseleri),
        instructions: this.parseInstructions(recipe.hazirlanmaQaydasi),
        prepTime: recipe.hazirlanmaMuddeti,
        difficulty: recipe.cetinlikDerecesi as 'Asan' | 'Orta' | 'Çətin',
        servings: recipe.porsiyaSayi,
        history: recipe.tarixiMelumat,
        servingSuggestions: recipe.teqdimTeklifleri,
        image: recipe.sekilLinki,
        tags: [], // No tags in current schema
        featured: recipe.featured
      }
    } catch (error) {
      console.error('Error fetching recipe by slug:', error)
      return null
    }
  }

  // Get featured recipes
  async getFeaturedRecipes(limit = 6): Promise<Recipe[]> {
    const result = await this.getAllRecipes({ 
      featured: true, 
      limit 
    })
    return result.recipes
  }

  // Get recipes by category (supports split categories like "Sıyıq/Tərəvəz yeməyi")
  async getRecipesByCategory(category: string, limit = 10): Promise<Recipe[]> {
    try {
      // Get all recipes and filter client-side to support split categories
      const allRecipes = await prisma.recipe.findMany({
        orderBy: { createdAt: 'desc' }
      })
      
      // Transform to Recipe format and filter by category
      const transformedRecipes: Recipe[] = allRecipes.map(recipe => ({
        id: recipe.id,
        name: recipe.yemeyinAdi,
        slug: recipe.slug,
        origin: recipe.mense || '',
        region: recipe.bolge || '',
        category: recipe.kateqoriya,
        ingredients: this.parseIngredients(recipe.terkibHisseleri),
        instructions: this.parseInstructions(recipe.hazirlanmaQaydasi),
        prepTime: recipe.hazirlanmaMuddeti,
        difficulty: recipe.cetinlikDerecesi as 'Asan' | 'Orta' | 'Çətin',
        servings: recipe.porsiyaSayi,
        history: recipe.tarixiMelumat,
        servingSuggestions: recipe.teqdimTeklifleri,
        image: recipe.sekilLinki,
        tags: [],
        featured: recipe.featured
      }))
      
      // Filter by category using split category logic
      const filteredRecipes = transformedRecipes.filter(recipe => 
        recipeMatchesCategory(recipe.category, category)
      )
      
      return filteredRecipes.slice(0, limit)
    } catch (error) {
      console.error('Error fetching recipes by category:', error)
      return []
    }
  }

  // Get recipes by region
  async getRecipesByRegion(region: string, limit = 10): Promise<Recipe[]> {
    const result = await this.getAllRecipes({ 
      region, 
      limit 
    })
    return result.recipes
  }

  // Search recipes
  async searchRecipes(query: string, limit = 20): Promise<Recipe[]> {
    const result = await this.getAllRecipes({ 
      searchQuery: query, 
      limit 
    })
    return result.recipes
  }

  // Get all categories (splits combined categories like "Sıyıq/Tərəvəz yeməyi")
  async getCategories(): Promise<string[]> {
    try {
      const recipes = await prisma.recipe.findMany({
        select: { kateqoriya: true }
      })
      
      // Extract all split categories
      const allCategories = new Set<string>()
      recipes.forEach(recipe => {
        const categories = splitCategories(recipe.kateqoriya)
        categories.forEach(cat => allCategories.add(cat))
      })
      
      return Array.from(allCategories).sort()
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  // Get all regions
  async getRegions(): Promise<string[]> {
    try {
      const regions = await prisma.recipe.groupBy({
        by: ['mense'],
        _count: { mense: true },
        orderBy: { _count: { mense: 'desc' } }
      })
      
      return regions.map(r => r.mense).filter(Boolean) as string[]
    } catch (error) {
      console.error('Error fetching regions:', error)
      return []
    }
  }

  // Get recipe statistics
  async getStats(): Promise<{
    totalRecipes: number
    featuredRecipes: number
    categories: number
    regions: number
  }> {
    try {
      const [totalRecipes, featuredRecipes, categories, regions] = await Promise.all([
        prisma.recipe.count(),
        prisma.recipe.count({ where: { featured: true } }),
        prisma.recipe.groupBy({ by: ['kateqoriya'] }).then(r => r.length),
        prisma.recipe.groupBy({ by: ['mense'] }).then(r => r.length)
      ])

      return {
        totalRecipes,
        featuredRecipes,
        categories,
        regions
      }
    } catch (error) {
      console.error('Error fetching recipe stats:', error)
      return {
        totalRecipes: 0,
        featuredRecipes: 0,
        categories: 0,
        regions: 0
      }
    }
  }

  // Record recipe interaction (simplified - no separate table)
  async recordInteraction(recipeId: string, type: 'VIEW' | 'SHARE' | 'PRINT'): Promise<void> {
    try {
      // For now, just log the interaction since we don't have the interaction table
      console.log(`Recipe interaction: ${recipeId} - ${type}`)
    } catch (error) {
      console.error('Error recording recipe interaction:', error)
    }
  }
}

// Export singleton instance
export const supabaseRecipeService = new SupabaseRecipeService()
export default supabaseRecipeService