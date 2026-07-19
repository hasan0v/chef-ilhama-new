import type { Metadata } from 'next';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Services - Chef İlhamə',
  description: 'Réservation de chef privé, dîners gastronomiques intimistes et services traiteur premium.',
};

export default function FrenchServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', href: '/fr' },
    { name: 'Services', href: '/fr/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesExperience breadcrumbs={[
        { name: 'Accueil', href: '/fr' },
        { name: 'Services', href: '/fr/services' },
      ]} />
    </>
  );
}
