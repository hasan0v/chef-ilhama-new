import { notFound } from 'next/navigation';
import { getRecipeBySlug, getRecipes } from '@/lib/recipes';
import RecipeStoryPage from '@/components/site/pages/RecipeStoryPage';
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
      title: 'Resept tapılmadı',
      description: 'Axtardığınız resept tapılmadı. Digər ənənəvi Azərbaycan reseptlərini görmək üçün əsas səhifəyə qayıdın.',
      robots: { index: false },
    };
  }

  const title = `${recipe.name} Resepti — ${recipe.origin} Mətbəxi`;
  const description = `${recipe.name}: ənənəvi ${recipe.origin} yeməyi. ${recipe.difficulty} çətinlik, ${recipe.prepTime} hazırlanma müddəti, ${recipe.servings}. Tərkib hissələri və addım-addım hazırlanma qaydası.`;

  return {
    title,
    description,
    keywords: `${recipe.name} resepti, ${recipe.name} necə hazırlanır, ${recipe.origin} mətbəxi, azərbaycan yeməkləri, ${recipe.category}, ənənəvi reseptlər, Azerbaijani ${recipe.name} recipe`,
    authors: [{ name: 'Chef İlhamə', url: 'https://chef-ilhama.food/haqqinda' }],
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
      title: `${recipe.name} — Chef İlhamə Resept`,
      description,
      type: 'article',
      locale: 'az_AZ',
      alternateLocale: 'en_US',
      url: `https://chef-ilhama.food/resept/${recipe.slug}`,
      siteName: 'Chef İlhamə',
      images: [
        {
          url: recipe.image || 'https://chef-ilhama.food/ilhama.png',
          width: 1200,
          height: 630,
          alt: `${recipe.name} — ${recipe.origin} mətbəxi resepti`,
        },
      ],
      section: recipe.category,
      tags: [recipe.name, recipe.origin, recipe.category, 'Azərbaycan mətbəxi', 'Azerbaijani food'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${recipe.name} Resepti — Chef İlhamə`,
      description: description.substring(0, 160),
      images: [recipe.image || 'https://chef-ilhama.food/ilhama.png'],
    },
    alternates: {
      canonical: `https://chef-ilhama.food/resept/${recipe.slug}`,
      languages: {
        'az': `https://chef-ilhama.food/resept/${recipe.slug}`,
        'en': `https://chef-ilhama.food/en/recipe/${recipe.slug}`,
      },
    },
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return <RecipeStoryPage recipe={recipe} breadcrumbs={[
    { name: 'Ana Səhifə', href: '/' },
    { name: 'Reseptlər', href: '/reseptler' },
    { name: recipe.name, href: `/resept/${recipe.slug}` },
  ]} />;
}

// Generate static params for all recipes
export async function generateStaticParams() {
  try {
    const recipes = await getRecipes();
    
    return recipes.map((recipe) => ({
      slug: recipe.slug,
    }));
  } catch (error) {
    console.log('Unable to fetch recipes during build (this is expected locally):', error);
    // Return empty array to skip static generation during local build
    return [];
  }
}

// Force dynamic rendering to avoid build-time database calls
export const dynamic = 'force-dynamic';
export const revalidate = 300; // Revalidate every 5 minutes in production