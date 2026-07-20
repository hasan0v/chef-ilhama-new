import type { Metadata } from 'next';
import RecipeCollectionsPage from '@/components/site/pages/RecipeCollectionsPage';
import { getBreadcrumbSchema } from '@/lib/seo';
import { getRecipes } from '@/lib/recipes';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Global Recipe Collections — Rare Dishes, Cold Noodles & More',
  description: 'Explore editor-curated global recipe trails: rare traditional dishes, world comfort soups, Asian cold noodles, fermented flavours and fast regional cooking.',
  alternates: {
    canonical: 'https://www.chef-ilhama.food/en/collections',
    languages: {
      az: 'https://www.chef-ilhama.food/kolleksiyalar',
      en: 'https://www.chef-ilhama.food/en/collections',
      'x-default': 'https://www.chef-ilhama.food/en/collections',
    },
  },
  openGraph: {
    title: 'Global Recipe Collections — Chef İlhamə',
    description: 'Choose a cooking trail by flavour, technique and curiosity—not only by country.',
    type: 'website',
    url: 'https://www.chef-ilhama.food/en/collections',
    images: [{ url: '/images/recipes/global/vori-vori-paraguayan-chicken-soup.webp', width: 1200, height: 900, alt: 'Global recipe discovery collections' }],
  },
};

export default async function EnglishCollectionsPage() {
  const recipes = await getRecipes('en');
  const breadcrumbs = [
    { name: 'Home', href: '/en' },
    { name: 'Collections', href: '/en/collections' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }} />
      <RecipeCollectionsPage locale="en" recipes={recipes} breadcrumbs={breadcrumbs} />
    </>
  );
}
