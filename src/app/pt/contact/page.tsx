import type { Metadata } from 'next';
import ContactStudioPage from '@/components/site/pages/ContactStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contacto - Chef İlhamə',
  description: 'Entre em contacto com o atelier culinário da Chef İlhamə. Catering, chef privado e reservas.',
};

export default function PortugueseContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Início', href: '/pt' },
    { name: 'Contacto', href: '/pt/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactStudioPage breadcrumbs={[
        { name: 'Início', href: '/pt' },
        { name: 'Contacto', href: '/pt/contact' },
      ]} />
    </>
  );
}
