import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('tr', 'services', {
  title: 'Hizmetler - Şef İlhame',
  description: 'Özel şef rezervasyonları, butik yemek davetleri ve premium catering organizasyonları.',
});

export default function TurkishServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Ana Sayfa', href: '/tr' },
    { name: 'Hizmetler', href: '/tr/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesExperience breadcrumbs={[
        { name: 'Ana Sayfa', href: '/tr' },
        { name: 'Hizmetler', href: '/tr/services' },
      ]} />
    </>
  );
}
