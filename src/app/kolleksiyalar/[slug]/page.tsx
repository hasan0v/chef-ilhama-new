import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RecipeCollectionDetailPage from '@/components/site/pages/RecipeCollectionDetailPage';
import { getBreadcrumbSchema, getRecipeCollectionSchema } from '@/lib/seo';
import { getCollectionPath, getRecipeCollection, recipeCollections } from '@/lib/recipeCollections';
import { getRecipes } from '@/lib/recipes';
import { getRecipeImageVariantUrl } from '@/lib/recipeImageVariants';

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
  const canonical = `https://www.chef-ilhama.food${getCollectionPath('az', slug)}`;
  const coverImage = getRecipeImageVariantUrl(collection.recipeSlugs[0], '16x9');

  return {
    title: collection.title.az,
    description: collection.description.az,
    keywords: [collection.searchIntent.az, collection.shortTitle.az, 'qlobal reseptlər', 'ənənəvi yeməklər'],
    alternates: {
      canonical,
      languages: {
        az: canonical,
        en: `https://www.chef-ilhama.food${getCollectionPath('en', slug)}`,
        'x-default': `https://www.chef-ilhama.food${getCollectionPath('en', slug)}`,
      },
    },
    openGraph: {
      title: `${collection.title.az} — Chef İlhamə`,
      description: collection.description.az,
      type: 'article',
      url: canonical,
      images: [{ url: coverImage, width: 1200, height: 675, alt: collection.title.az }],
    },
    twitter: { card: 'summary_large_image', title: collection.title.az, description: collection.description.az, images: [coverImage] },
  };
}

export default async function AzerbaijaniCollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getRecipeCollection(slug);
  if (!collection) notFound();

  const allRecipes = await getRecipes('az');
  const recipesBySlug = new Map(allRecipes.map((recipe) => [recipe.slug, recipe]));
  const recipes = collection.recipeSlugs.map((recipeSlug) => recipesBySlug.get(recipeSlug)).filter((recipe): recipe is NonNullable<typeof recipe> => Boolean(recipe));
  const path = getCollectionPath('az', collection.slug);
  const breadcrumbs = [
    { name: 'Ana səhifə', href: '/' },
    { name: 'Kolleksiyalar', href: '/kolleksiyalar' },
    { name: collection.shortTitle.az, href: path },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getRecipeCollectionSchema(recipes, collection.title.az, collection.description.az, path, 'az')) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }} />
      <RecipeCollectionDetailPage locale="az" collection={collection} recipes={recipes} breadcrumbs={breadcrumbs} />
    </>
  );
}
