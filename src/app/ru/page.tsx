import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import { siteConfig } from '@/lib/site';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';
import HomeExperience from '@/components/site/pages/HomeExperience';

export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('ru', 'home', {
  title: 'Шеф Ильхама — Рецепты азербайджанской кухни, Кейтеринг и Личный Шеф в Баку',
  description:
    'Откройте для себя оригинальную азербайджанскую кухню с шеф-поваром Ильхамой. Традиционные рецепты из 25+ регионов, премиальный кейтеринг и услуги личного шефа в Баку, Сумгаите и на Абшероне.',
  keywords: 'азербайджанские рецепты, азербайджанская кухня, шеф-повар Баку, кейтеринг Баку, услуги личного шефа Баку, национальные блюда',
  openGraph: {
    title: 'Шеф Ильхама — Рецепты азербайджанской кухни & Личный Шеф',
    description: 'Аутентичная азербайджанская кухня. Традиционные рецепты из 25+ регионов, кейтеринг и услуги личного шефа.',
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: 'az_AZ',
    url: `${siteConfig.url}/ru`,
    siteName: 'Шеф Ильхама',
    images: [{ url: `${siteConfig.url}/ilhama.png`, width: 1200, height: 630, alt: 'Шеф Ильхама — азербайджанская кухня' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Шеф Ильхама — Рецепты азербайджанской кухни',
    description: 'Рецепты азербайджанской кухни из 25+ регионов. Кейтеринг и услуги личного шеф-повара.',
    images: [`${siteConfig.url}/ilhama.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/ru`,
    languages: {
      'az': siteConfig.url,
      'en': `${siteConfig.url}/en`,
      'tr': `${siteConfig.url}/tr`,
      'ru': `${siteConfig.url}/ru`,
    },
  },
});

export default async function RussianHomePage() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes('ru'),
    getRecipes('ru'),
    getCategories('ru'),
    getRecipeStats('ru'),
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    'Шеф Ильхама — Традиционные азербайджанские рецепты',
    'Откройте для себя оригинальную азербайджанскую кухню с рецептами из 25+ регионов.',
    '/ru'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Главная', href: '/ru' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HomeExperience 
        featuredRecipes={featuredRecipes}
        allRecipes={allRecipes}
        categories={categories}
        stats={stats}
      />
    </>
  );
}
