import { MetadataRoute } from 'next'
import { getRecipes } from '@/lib/recipes'
import { Recipe } from '@/types/recipe'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://chef-ilhama.food'
  
  // Get all recipes for dynamic pages
  let recipes: Recipe[] = [];
  try {
    recipes = await getRecipes();
  } catch (error) {
    console.log('Unable to fetch recipes for sitemap (this is expected during local build):', error);
  }
  
  // Static pages — Azerbaijani
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          az: baseUrl,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/reseptler`,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          az: `${baseUrl}/reseptler`,
          en: `${baseUrl}/en/recipes`,
        },
      },
    },
    {
      url: `${baseUrl}/xidmetler`,
      lastModified: new Date('2026-04-01'),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          az: `${baseUrl}/xidmetler`,
          en: `${baseUrl}/en/services`,
        },
      },
    },
    {
      url: `${baseUrl}/haqqinda`,
      lastModified: new Date('2026-04-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          az: `${baseUrl}/haqqinda`,
          en: `${baseUrl}/en/about`,
        },
      },
    },
    {
      url: `${baseUrl}/elaqe`,
      lastModified: new Date('2026-04-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          az: `${baseUrl}/elaqe`,
          en: `${baseUrl}/en/contact`,
        },
      },
    },
  ]

  // English static pages
  const enStaticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/en`,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/recipes`,
      lastModified: new Date('2026-04-12'),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/services`,
      lastModified: new Date('2026-04-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/about`,
      lastModified: new Date('2026-04-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date('2026-04-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Recipe pages with image sitemap data
  const recipePages: MetadataRoute.Sitemap = recipes.map((recipe: Recipe) => ({
    url: `${baseUrl}/resept/${recipe.slug}`,
    lastModified: new Date('2026-04-12'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    images: recipe.image ? [recipe.image] : undefined,
    alternates: {
      languages: {
        az: `${baseUrl}/resept/${recipe.slug}`,
        en: `${baseUrl}/en/recipe/${recipe.slug}`,
      },
    },
  }))

  return [...staticPages, ...enStaticPages, ...recipePages]
}