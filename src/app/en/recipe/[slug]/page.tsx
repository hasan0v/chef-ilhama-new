import { notFound } from 'next/navigation';
import { getRecipeBySlug, getRecipes } from '@/lib/recipes';
import RecipeStoryPage from '@/components/site/pages/RecipeStoryPage';
import type { Metadata } from 'next';

interface RecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug, 'en');

  if (!recipe) {
    return {
      title: 'Recipe not found',
      description: 'The recipe you are looking for was not found. Return to the main page to browse other traditional Azerbaijani recipes.',
      robots: { index: false },
    };
  }

  const title = `${recipe.name} Recipe — ${recipe.origin} Cuisine`;
  const description = `${recipe.name}: traditional ${recipe.origin} dish. ${recipe.difficulty} difficulty, ${recipe.prepTime} preparation time, ${recipe.servings}. Ingredients and step-by-step preparation.`;

  return {
    title,
    description,
    keywords: `${recipe.name} recipe, how to make ${recipe.name}, ${recipe.origin} cuisine, Azerbaijani food, ${recipe.category}, traditional recipes`,
    authors: [{ name: 'Chef İlhamə', url: 'https://chef-ilhama.food/en/about' }],
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
      title: `${recipe.name} — Chef İlhamə Recipe`,
      description,
      type: 'article',
      locale: 'en_US',
      alternateLocale: 'az_AZ',
      url: `https://chef-ilhama.food/en/recipe/${recipe.slug}`,
      siteName: 'Chef İlhamə',
      images: [
        {
          url: recipe.image || 'https://chef-ilhama.food/ilhama.png',
          width: 1200,
          height: 630,
          alt: `${recipe.name} — ${recipe.origin} cuisine recipe`,
        },
      ],
      section: recipe.category,
      tags: [recipe.name, recipe.origin, recipe.category, 'Azerbaijani cuisine', 'Azerbaijani food'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${recipe.name} Recipe — Chef İlhamə`,
      description: description.substring(0, 160),
      images: [recipe.image || 'https://chef-ilhama.food/ilhama.png'],
    },
    alternates: {
      canonical: `https://chef-ilhama.food/en/recipe/${recipe.slug}`,
      languages: {
        az: `https://chef-ilhama.food/resept/${recipe.slug}`,
        en: `https://chef-ilhama.food/en/recipe/${recipe.slug}`,
      },
    },
  };
}

export default async function EnglishRecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug, 'en');

  if (!recipe) {
    notFound();
  }

  return <RecipeStoryPage recipe={recipe} breadcrumbs={[
    { name: 'Home', href: '/en' },
    { name: 'Recipes', href: '/en/recipes' },
    { name: recipe.name, href: `/en/recipe/${recipe.slug}` },
  ]} />;
}

export async function generateStaticParams() {
  try {
    const recipes = await getRecipes('en');
    return recipes.map((recipe) => ({ slug: recipe.slug }));
  } catch (error) {
    console.log('Unable to fetch recipes during build (this is expected locally):', error);
    return [];
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 300;
