import type { Metadata } from 'next';
import RecipeCollectionsPage from '@/components/site/pages/RecipeCollectionsPage';
import { getBreadcrumbSchema } from '@/lib/seo';
import { getRecipes } from '@/lib/recipes';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Qlobal Resept Kolleksiyaları — Nadir Yeməklər və Yeni Dadlar',
  description: 'Redaktor seçimi qlobal resept marşrutları: nadir ənənəvi yeməklər, dünya şorbaları, Asiya soyuq əriştələri, ferment dadları və sürətli reseptlər.',
  alternates: {
    canonical: 'https://www.chef-ilhama.food/kolleksiyalar',
    languages: {
      az: 'https://www.chef-ilhama.food/kolleksiyalar',
      en: 'https://www.chef-ilhama.food/en/collections',
      'x-default': 'https://www.chef-ilhama.food/en/collections',
    },
  },
  openGraph: {
    title: 'Qlobal Resept Kolleksiyaları — Chef İlhamə',
    description: 'Bişirmə marşrutunu ölkəyə görə yox, dad, texnika və marağa görə seçin.',
    type: 'website',
    url: 'https://www.chef-ilhama.food/kolleksiyalar',
    images: [{ url: '/images/recipes/global/vori-vori-paraguayan-chicken-soup.webp', width: 1200, height: 900, alt: 'Qlobal resept kolleksiyaları' }],
  },
};

export default async function AzerbaijaniCollectionsPage() {
  const recipes = await getRecipes('az');
  const breadcrumbs = [
    { name: 'Ana səhifə', href: '/' },
    { name: 'Kolleksiyalar', href: '/kolleksiyalar' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }} />
      <RecipeCollectionsPage locale="az" recipes={recipes} breadcrumbs={breadcrumbs} />
    </>
  );
}
