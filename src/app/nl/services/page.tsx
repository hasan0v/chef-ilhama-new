import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('nl', 'services', {
  title: 'Diensten - Chef İlhamə',
  description: 'Boek Chef İlhamə voor privéchef-service aan huis, premium catering en bruiloftsbanketten in Bakoe.',
});

export default function DutchServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/nl' },
    { name: 'Diensten', href: '/nl/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesExperience breadcrumbs={[
        { name: 'Home', href: '/nl' },
        { name: 'Diensten', href: '/nl/services' },
      ]} />
    </>
  );
}
