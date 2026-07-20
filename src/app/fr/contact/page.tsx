import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactChefPage from '@/components/site/pages/ContactChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('fr', 'contact', {
  title: 'Contact - Chef İlhamə',
  description: 'Contactez Chef İlhamə pour les réservations, le traiteur et les services de chef privé.',
});

export default function FrenchContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', href: '/fr' },
    { name: 'Contact', href: '/fr/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactChefPage breadcrumbs={[
        { name: 'Accueil', href: '/fr' },
        { name: 'Contact', href: '/fr/contact' },
      ]} />
    </>
  );
}
