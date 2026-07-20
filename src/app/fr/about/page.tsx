import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutChefPage from '@/components/site/pages/AboutChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('fr', 'about', {
  title: 'À propos - Chef İlhamə',
  description: 'L\'histoire de Chef İlhamə, ses valeurs et sa vision du service.',
});

export default function FrenchAboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', href: '/fr' },
    { name: 'À propos', href: '/fr/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutChefPage breadcrumbs={[
        { name: 'Accueil', href: '/fr' },
        { name: 'À propos', href: '/fr/about' },
      ]} />
    </>
  );
}
