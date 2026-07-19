import type { Metadata } from 'next';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Servizi - Chef İlhamə',
  description: 'Prenotazione chef personale a domicilio, cene private e servizi di catering d\'eccellenza.',
};

export default function ItalianServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/it' },
    { name: 'Servizi', href: '/it/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesExperience breadcrumbs={[
        { name: 'Home', href: '/it' },
        { name: 'Servizi', href: '/it/services' },
      ]} />
    </>
  );
}
