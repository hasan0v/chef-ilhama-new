import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactStudioPage from '@/components/site/pages/ContactStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('es', 'contact', {
  title: 'Contacto - Chef İlhamə',
  description: 'Póngase en contacto con el atelier culinario de la Chef İlhamə. Catering, chef privado y reservas.',
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
      <ContactStudioPage breadcrumbs={[
        { name: 'Inicio', href: '/es' },
        { name: 'Contacto', href: '/es/contact' },
      ]} />
    </>
  );
}
