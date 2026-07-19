import type { Metadata } from 'next';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import { siteConfig } from '@/lib/site';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';
import HomeExperience from '@/components/site/pages/HomeExperience';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Chef İlhamə — Recetas de cocina azerbaiyana, catering prémium y chef privado (Bakú)',
  description:
    'Descubra la auténtica gastronomía azerbaiyana de la mano de la Chef İlhamə. Más de 25 regiones de recetas tradicionales, catering prémium y servicios de chef privado a domicilio.',
  keywords: 'recetas azerbaiyanas, cocina azerbaiyana, chef privado Baku, catering Baku, recetas de cocina',
  openGraph: {
    title: 'Chef İlhamə — Recetas de cocina azerbaiyana y chef privado',
    description: 'Sabores regionales y recetas tradicionales de Azerbaiyán. Catering prémium y chef privado.',
    type: 'website',
    locale: 'es_ES',
    alternateLocale: 'az_AZ',
    url: `${siteConfig.url}/es`,
    siteName: 'Chef İlhamə',
    images: [{ url: `${siteConfig.url}/ilhama.png`, width: 1200, height: 630, alt: 'Chef İlhamə — Cocina azerbaiyana' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef İlhamə — Recetas de cocina azerbaiyana',
    description: 'Recetas de cocina azerbaiyana de 25+ regiones. Catering y chef privado.',
    images: [`${siteConfig.url}/ilhama.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/es`,
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
    },
  },
};

export default async function SpanishHomePage() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes('es'),
    getRecipes('es'),
    getCategories('es'),
    getRecipeStats('es'),
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    'Chef İlhamə — Recetas tradicionales azerbaiyanas',
    'Explore la colección de recetas tradicionales de Azerbaiyán de más de 25 regiones.',
    '/es'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Inicio', href: '/es' },
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
