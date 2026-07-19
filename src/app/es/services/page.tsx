import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('es', 'services', {
  title: 'Servicios - Chef İlhamə',
  description: 'Servicio de reservas de chef privado a domicilio, catering de marca prémium y banquetes exclusivos en Bakú.',
});

export default function SpanishServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Inicio', href: '/es' },
    { name: 'Servicios', href: '/es/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesExperience breadcrumbs={[
        { name: 'Inicio', href: '/es' },
        { name: 'Servicios', href: '/es/services' },
      ]} />
    </>
  );
}
