import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('pt', 'services', {
  title: 'Serviços - Chef İlhamə',
  description: 'Estúdio de reservas de chef privado ao domicílio, catering corporativo premium e planeamento de casamentos em Baku.',
});

export default function PortugueseServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Início', href: '/pt' },
    { name: 'Serviços', href: '/pt/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesExperience breadcrumbs={[
        { name: 'Início', href: '/pt' },
        { name: 'Serviços', href: '/pt/services' },
      ]} />
    </>
  );
}
