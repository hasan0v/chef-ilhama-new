import { notFound } from 'next/navigation';
import { getRecipeBySlug, getRecipes } from '@/lib/recipes';
import ModernRecipePage from './ModernRecipePage';
import type { Metadata } from 'next';

interface RecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate dynamic metadata for each recipe
export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: 'Resept tapılmadı - Chef İlhamə',
      description: 'Axtardığınız resept tapılmadı. Digər ənənəvi Azərbaycan reseptlərini görmək üçün əsas səhifəyə qayıdın.',
    };
  }

  const title = `${recipe.name} Resepti | Ənənəvi ${recipe.origin} Mətbəxi - Chef İlhamə`;
  const description = `${recipe.name} reseptini öyrənin. ${recipe.origin} bölgəsinin ənənəvi dadı. ${recipe.difficulty} çətinlik, ${recipe.prepTime} hazırlanma müddəti. Tərkib və hazırlanma qaydası.`;

  return {
    title,
    description,
    keywords: `${recipe.name} resepti, ${recipe.origin} mətbəxi, azərbaycan yeməkləri, ${recipe.category}, ${recipe.name} necə hazırlanır, ənənəvi reseptlər, chef İlhamə`,
    authors: [{ name: 'Chef İlhamə' }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'az_AZ',
      url: `https://chef-ilhama.food/resept/${recipe.slug}`,
      siteName: 'Chef İlhamə',
      images: [
        {
          url: recipe.image || 'https://chef-ilhama.food/placeholder-food.svg',
          width: 1200,
          height: 630,
          alt: `${recipe.name} - ${recipe.origin} mətbəxi`,
        },
      ],
      publishedTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
      section: 'Recipes',
      tags: recipe.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: description.substring(0, 160),
      images: [recipe.image || 'https://chef-ilhama.food/placeholder-food.svg'],
    },
    alternates: {
      canonical: `https://chef-ilhama.food/resept/${recipe.slug}`,
    },
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return <ModernRecipePage recipe={recipe} />;
}

// Generate static params for all recipes
export async function generateStaticParams() {
  const recipes = await getRecipes();
  
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}