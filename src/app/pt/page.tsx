import type { Metadata } from 'next';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import { siteConfig } from '@/lib/site';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';
import HomeExperience from '@/components/site/pages/HomeExperience';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Chef İlhamə — Receitas da gastronomia do Azerbaijão, catering premium e chef privado (Baku)',
  description:
    'Descubra a autêntica cozinha do Azerbaijão com a Chef İlhamə. Mais de 25 regiões de receitas tradicionais, catering premium e serviços de chef privado em Baku, Sumqayıt e Abşeron.',
  keywords: 'receitas do Azerbaijão, cozinha do Azerbaijão, chef privado Baku, catering Baku, receitas tradicionais',
  openGraph: {
    title: 'Chef İlhamə — Receitas do Azerbaijão e chef privado',
    description: 'Sabores regionais e receitas tradicionais do Azerbaijão. Catering premium e chef privado.',
    type: 'website',
    locale: 'pt_PT',
    alternateLocale: 'az_AZ',
    url: `${siteConfig.url}/pt`,
    siteName: 'Chef İlhamə',
    images: [{ url: `${siteConfig.url}/ilhama.png`, width: 1200, height: 630, alt: 'Chef İlhamə — Cozinha do Azerbaijão' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef İlhamə — Receitas do Azerbaijão',
    description: 'Receitas do Azerbaijão de 25+ regiões. Catering e chef privado.',
    images: [`${siteConfig.url}/ilhama.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/pt`,
    languages: {
      'az': siteConfig.url,
      'en': `${siteConfig.url}/en`,
      'tr': `${siteConfig.url}/tr`,
      'ru': `${siteConfig.url}/ru`,
      'fr': `${siteConfig.url}/fr`,
      'it': `${siteConfig.url}/it`,
      'ar': `${siteConfig.url}/ar`,
      'zh': `${siteConfig.url}/zh`,
      'hi': `${siteConfig.url}/hi`,
      'es': `${siteConfig.url}/es`,
      'pt': `${siteConfig.url}/pt`,
    },
  },
};

export default async function PortugueseHomePage() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes('pt'),
    getRecipes('pt'),
    getCategories('pt'),
    getRecipeStats('pt'),
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    'Chef İlhamə — Receitas tradicionais do Azerbaijão',
    'Explore o arquivo de receitas tradicionais do Azerbaijão com mais de 25 regiões.',
    '/pt'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Início', href: '/pt' },
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
