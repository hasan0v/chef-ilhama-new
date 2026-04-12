import { getRecipeSchema, getBreadcrumbSchema } from '@/lib/seo';
import type { Recipe } from '@/types/recipe';

interface RecipeStructuredDataProps {
  recipe: Recipe;
}

export default function RecipeStructuredData({ recipe }: RecipeStructuredDataProps) {
  const recipeSchema = getRecipeSchema(recipe);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Ana Səhifə', href: '/' },
    { name: 'Reseptlər', href: '/reseptler' },
    { name: recipe.category, href: `/reseptler?category=${encodeURIComponent(recipe.category)}` },
    { name: recipe.name, href: `/resept/${recipe.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}