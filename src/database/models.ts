// Database models and interfaces
import { Recipe } from '@/types/recipe';

// User model for future implementation
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
}

// Contact message model
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  isReplied: boolean;
}

// Recipe interaction model
export interface RecipeInteraction {
  id: string;
  recipeId: string;
  type: 'view' | 'share' | 'print';
  userAgent?: string;
  ip?: string;
  createdAt: string;
}

// Website statistics model
export interface WebsiteStats {
  totalViews: number;
  totalRecipes: number;
  totalContacts: number;
  popularRecipes: {
    recipeId: string;
    views: number;
    shares: number;
    prints: number;
  }[];
  lastUpdated: string;
}

// Recipe collection model (processed recipes)
export interface RecipeCollection {
  recipes: Recipe[];
  categories: string[];
  regions: string[];
  lastUpdated: string;
  version: string;
}

// Search analytics
export interface SearchQuery {
  id: string;
  query: string;
  resultsCount: number;
  userAgent?: string;
  createdAt: string;
}

// Site content model (for dynamic content)
export interface SiteContent {
  id: string;
  type: 'hero' | 'about' | 'footer' | 'announcement';
  title?: string;
  content: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}