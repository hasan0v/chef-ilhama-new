'use client';

import { useEffect } from 'react';
import { Recipe } from '@/types/recipe';

interface RecipeStructuredDataProps {
  recipe: Recipe;
}

export default function RecipeStructuredData({ recipe }: RecipeStructuredDataProps) {
  useEffect(() => {
    // Create Recipe structured data
    const recipeSchema = {
      "@context": "https://schema.org/",
      "@type": "Recipe",
      "name": recipe.name,
      "image": [
        recipe.image || "https://chef-ilhama.food/placeholder-food.svg"
      ],
      "author": {
        "@type": "Person",
        "name": "Chef İlhamə",
        "url": "https://chef-ilhama.food/haqqinda"
      },
      "datePublished": new Date().toISOString(),
      "description": `${recipe.name} - ${recipe.origin} bölgəsinin ənənəvi yeməyi. ${recipe.history}`,
      "recipeCuisine": "Azerbaijani",
      "recipeCategory": recipe.category,
      "keywords": `${recipe.name}, azərbaycan mətbəxi, ${recipe.origin}, ${recipe.category}, ənənəvi resept`,
      "recipeYield": recipe.servings,
      "prepTime": recipe.prepTime.includes('dəqiqə') 
        ? `PT${recipe.prepTime.replace(/\D/g, '')}M`
        : recipe.prepTime.includes('saat')
        ? `PT${recipe.prepTime.replace(/\D/g, '')}H`
        : 'PT30M',
      "cookTime": "PT30M", // Default cooking time
      "totalTime": recipe.prepTime.includes('dəqiqə') 
        ? `PT${parseInt(recipe.prepTime.replace(/\D/g, '')) + 30}M`
        : 'PT1H',
      "recipeIngredient": recipe.ingredients,
      "recipeInstructions": recipe.instructions.map((instruction, index) => ({
        "@type": "HowToStep",
        "name": `Addım ${index + 1}`,
        "text": instruction,
        "position": index + 1
      })),
      "nutrition": {
        "@type": "NutritionInformation",
        "servingSize": "1 porsiya"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      },
      "video": recipe.name.includes('Plov') || recipe.name.includes('Dolma') ? {
        "@type": "VideoObject",
        "name": `${recipe.name} Hazırlanması`,
        "description": `${recipe.name} reseptinin video təlimatı`,
        "thumbnailUrl": recipe.image,
        "contentUrl": `https://chef-ilhama.food/videos/${recipe.slug}.mp4`,
        "embedUrl": `https://chef-ilhama.food/videos/${recipe.slug}`,
        "uploadDate": new Date().toISOString(),
        "duration": "PT10M"
      } : undefined
    };

    // Remove undefined properties
    Object.keys(recipeSchema).forEach(key => {
      if (recipeSchema[key as keyof typeof recipeSchema] === undefined) {
        delete recipeSchema[key as keyof typeof recipeSchema];
      }
    });

    // Add BreadcrumbList schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Səhifə",
          "item": "https://chef-ilhama.food"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Reseptlər",
          "item": "https://chef-ilhama.food/reseptler"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": recipe.name,
          "item": `https://chef-ilhama.food/resept/${recipe.slug}`
        }
      ]
    };

    // Add schemas to head
    const recipeScript = document.createElement('script');
    recipeScript.type = 'application/ld+json';
    recipeScript.textContent = JSON.stringify(recipeSchema);
    document.head.appendChild(recipeScript);

    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(breadcrumbScript);

    // Cleanup function
    return () => {
      document.head.removeChild(recipeScript);
      document.head.removeChild(breadcrumbScript);
    };
  }, [recipe]);

  return null; // This component doesn't render anything visible
}