// Recipe database service
import path from 'path';
import { Recipe } from '@/types/recipe';
import { RecipeCollection, RecipeInteraction } from '../models';
import { dbConfig, readJsonFile, writeJsonFile, createBackup, initializeDatabase } from '../config';
import { processRecipesData } from '@/utils/processRecipes';
import fs from 'fs';

class RecipeService {
  private recipesFile = path.join(dbConfig.dataPath, 'recipes.json');
  private interactionsFile = path.join(dbConfig.dataPath, 'recipe-interactions.json');
  private cache: RecipeCollection | null = null;

  constructor() {
    initializeDatabase();
  }

  // Initialize recipes from CSV
  async initializeFromCSV(): Promise<void> {
    try {
      const csvPath = path.join(process.cwd(), 'recipes', 'recipes.csv');
      if (!fs.existsSync(csvPath)) {
        console.error('CSV file not found');
        return;
      }

      const csvData = fs.readFileSync(csvPath, 'utf-8');
      const recipes = processRecipesData(csvData);
      
      const collection: RecipeCollection = {
        recipes,
        categories: [...new Set(recipes.map(r => r.category))].sort(),
        regions: [...new Set(recipes.flatMap(r => r.origin.split(',').map(o => o.trim())))].sort(),
        lastUpdated: new Date().toISOString(),
        version: '1.0.0'
      };

      await this.saveRecipes(collection);
      console.log(`Initialized ${recipes.length} recipes from CSV`);
    } catch (error) {
      console.error('Error initializing from CSV:', error);
    }
  }

  // Get all recipes
  async getRecipes(): Promise<Recipe[]> {
    const collection = await this.getRecipeCollection();
    return collection ? collection.recipes : [];
  }

  // Get recipe collection with metadata
  async getRecipeCollection(): Promise<RecipeCollection | null> {
    if (this.cache) {
      return this.cache;
    }

    const collection = await readJsonFile<RecipeCollection>(this.recipesFile);
    if (!collection) {
      // Try to initialize from CSV if no data exists
      await this.initializeFromCSV();
      return await readJsonFile<RecipeCollection>(this.recipesFile);
    }

    this.cache = collection;
    return collection;
  }

  // Save recipes
  async saveRecipes(collection: RecipeCollection): Promise<boolean> {
    await createBackup('recipes.json');
    const success = await writeJsonFile(this.recipesFile, collection);
    if (success) {
      this.cache = collection;
    }
    return success;
  }

  // Get recipe by slug
  async getRecipeBySlug(slug: string): Promise<Recipe | null> {
    const recipes = await this.getRecipes();
    return recipes.find(recipe => recipe.slug === slug) || null;
  }

  // Get featured recipes
  async getFeaturedRecipes(): Promise<Recipe[]> {
    const recipes = await this.getRecipes();
    return recipes.filter(recipe => recipe.featured);
  }

  // Get recipes by category
  async getRecipesByCategory(category: string): Promise<Recipe[]> {
    const recipes = await this.getRecipes();
    return recipes.filter(recipe => recipe.category === category);
  }

  // Get recipes by region
  async getRecipesByRegion(region: string): Promise<Recipe[]> {
    const recipes = await this.getRecipes();
    return recipes.filter(recipe => recipe.origin.includes(region));
  }

  // Search recipes
  async searchRecipes(query: string): Promise<Recipe[]> {
    if (!query.trim()) {
      return await this.getRecipes();
    }

    const recipes = await this.getRecipes();
    const searchTerm = query.toLowerCase();

    return recipes.filter(recipe => {
      return (
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.origin.toLowerCase().includes(searchTerm) ||
        recipe.category.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm)) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    });
  }

  // Record recipe interaction
  async recordInteraction(recipeId: string, type: 'view' | 'share' | 'print', userAgent?: string, ip?: string): Promise<void> {
    try {
      const interactions = await readJsonFile<RecipeInteraction[]>(this.interactionsFile) || [];
      
      const interaction: RecipeInteraction = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        recipeId,
        type,
        userAgent,
        ip,
        createdAt: new Date().toISOString()
      };

      interactions.push(interaction);
      await writeJsonFile(this.interactionsFile, interactions);
    } catch (error) {
      console.error('Error recording interaction:', error);
    }
  }

  // Get recipe stats
  async getRecipeStats(recipeId: string) {
    try {
      const interactions = await readJsonFile<RecipeInteraction[]>(this.interactionsFile) || [];
      const recipeInteractions = interactions.filter(i => i.recipeId === recipeId);

      return {
        views: recipeInteractions.filter(i => i.type === 'view').length,
        shares: recipeInteractions.filter(i => i.type === 'share').length,
        prints: recipeInteractions.filter(i => i.type === 'print').length,
        totalInteractions: recipeInteractions.length
      };
    } catch (error) {
      console.error('Error getting recipe stats:', error);
      return { views: 0, shares: 0, prints: 0, totalInteractions: 0 };
    }
  }

  // Clear cache
  clearCache(): void {
    this.cache = null;
  }
}

// Export singleton instance
export const recipeService = new RecipeService();