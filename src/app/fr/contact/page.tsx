import type { Metadata } from 'next';
import ContactStudioPage from '@/components/site/pages/ContactStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact - Chef İlhamə',
  description: 'Contactez le studio culinaire de la Chef İlhamə. Réservations, traiteur et services de chef privé.',
};

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
      <ContactStudioPage breadcrumbs={[
        { name: 'Accueil', href: '/fr' },
        { name: 'Contact', href: '/fr/contact' },
      ]} />
    </>
  );
}
