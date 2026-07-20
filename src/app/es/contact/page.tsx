import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactChefPage from '@/components/site/pages/ContactChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('es', 'contact', {
  title: 'Contacto - Chef İlhamə',
  description: 'Contacte con Chef İlhamə para catering, chef privado y reservas.',
});

export default function SpanishContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Inicio', href: '/es' },
    { name: 'Contacto', href: '/es/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactChefPage breadcrumbs={[
        { name: 'Inicio', href: '/es' },
        { name: 'Contacto', href: '/es/contact' },
      ]} />
    </>
  );
}
