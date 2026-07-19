import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('fr', 'about', {
  title: 'À propos - Chef İlhamə',
  description: 'L\'histoire du studio culinaire de la Chef İlhamə, ses valeurs et sa vision du service.',
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
      <AboutStudioPage breadcrumbs={[
        { name: 'Accueil', href: '/fr' },
        { name: 'À propos', href: '/fr/about' },
      ]} />
    </>
  );
}
