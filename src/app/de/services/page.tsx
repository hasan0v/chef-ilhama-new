import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('de', 'services', {
  title: 'Dienstleistungen - Chef İlhamə',
  description: 'Reservierungsstudio für Privatköche zu Hause, Business-Premium-Catering und Hochzeitstafeln in Baku.',
});

export default function GermanServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Startseite', href: '/de' },
    { name: 'Dienstleistungen', href: '/de/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesExperience breadcrumbs={[
        { name: 'Startseite', href: '/de' },
        { name: 'Dienstleistungen', href: '/de/services' },
      ]} />
    </>
  );
}
