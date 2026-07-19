import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RecipeCollectionDetailPage from '@/components/site/pages/RecipeCollectionDetailPage';
import { getBreadcrumbSchema, getRecipeCollectionSchema } from '@/lib/seo';
import { getCollectionPath, getRecipeCollection, recipeCollections } from '@/lib/recipeCollections';
import { getRecipes } from '@/lib/recipes';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 300;

export function generateStaticParams() {
  return recipeCollections.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getRecipeCollection(slug);
  if (!collection) return {};
  const canonical = `https://chef-ilhama.food${getCollectionPath('en', slug)}`;

  return {
    title: collection.title.en,
    description: collection.description.en,
    keywords: [collection.searchIntent.en, collection.shortTitle.en, 'global recipes', 'traditional food'],
    alternates: {
      canonical,
      languages: {
        az: `https://chef-ilhama.food${getCollectionPath('az', slug)}`,
        en: canonical,
        'x-default': canonical,
      },
    },
    openGraph: {
      title: `${collection.title.en} — Chef İlhamə`,
      description: collection.description.en,
      type: 'article',
      url: canonical,
      images: [{ url: `/images/recipes/global/${collection.recipeSlugs[0]}.webp`, alt: collection.title.en }],
    },
    twitter: { card: 'summary_large_image', title: collection.title.en, description: collection.description.en, images: [`/images/recipes/global/${collection.recipeSlugs[0]}.webp`] },
  };
}

export default async function EnglishCollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getRecipeCollection(slug);
  if (!collection) notFound();

  const allRecipes = await getRecipes('en');
  const recipesBySlug = new Map(allRecipes.map((recipe) => [recipe.slug, recipe]));
  const recipes = collection.recipeSlugs.map((recipeSlug) => recipesBySlug.get(recipeSlug)).filter((recipe): recipe is NonNullable<typeof recipe> => Boolean(recipe));
  const path = getCollectionPath('en', collection.slug);
  const breadcrumbs = [
    { name: 'Home', href: '/en' },
    { name: 'Collections', href: '/en/collections' },
    { name: collection.shortTitle.en, href: path },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getRecipeCollectionSchema(recipes, collection.title.en, collection.description.en, path)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }} />
      <RecipeCollectionDetailPage locale="en" collection={collection} recipes={recipes} breadcrumbs={breadcrumbs} />
    </>
  );
}
