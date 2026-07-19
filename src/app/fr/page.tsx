import type { Metadata } from 'next';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import { siteConfig } from '@/lib/site';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';
import HomeExperience from '@/components/site/pages/HomeExperience';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Chef İlhamə — Recettes de cuisine azerbaïdjanaise, Traiteur et Chef Privé à Bakou',
  description:
    'Découvrez la cuisine authentique d\'Azerbaïdjan avec la Chef İlhamə. Recettes traditionnelles de plus de 25 régions, service traiteur premium et chef à domicile à Bakou, Sumgayıt et Abchéron.',
  keywords: 'recettes azerbaïdjanaises, cuisine azerbaïdjanaise, chef à domicile Bakou, traiteur Bakou, chef privé Azerbaïdjan, plats traditionnels',
  openGraph: {
    title: 'Chef İlhamə — Recettes d\'Azerbaïdjan & Chef Privé',
    description: 'Cuisine authentique d\'Azerbaïdjan. Recettes traditionnelles de 25+ régions, service traiteur & chef privé.',
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'az_AZ',
    url: `${siteConfig.url}/fr`,
    siteName: 'Chef İlhamə',
    images: [{ url: `${siteConfig.url}/ilhama.png`, width: 1200, height: 630, alt: 'Chef İlhamə — cuisine azerbaïdjanaise' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef İlhamə — Recettes de cuisine azerbaïdjanaise',
    description: 'Recettes d\'Azerbaïdjan issues de 25+ régions. Service traiteur & chef privé.',
    images: [`${siteConfig.url}/ilhama.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/fr`,
    languages: {
      'az': siteConfig.url,
      'en': `${siteConfig.url}/en`,
      'tr': `${siteConfig.url}/tr`,
      'ru': `${siteConfig.url}/ru`,
      'fr': `${siteConfig.url}/fr`,
    },
  },
};

export default async function FrenchHomePage() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes('fr'),
    getRecipes('fr'),
    getCategories('fr'),
    getRecipeStats('fr'),
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    'Chef İlhamə — Recettes azerbaïdjanaises traditionnelles',
    'Découvrez la cuisine authentique d\'Azerbaïdjan à travers des recettes issues de plus de 25 régions.',
    '/fr'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', href: '/fr' },
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
