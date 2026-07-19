import type { Metadata } from 'next';
import ContactStudioPage from '@/components/site/pages/ContactStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contatti - Chef İlhamə',
  description: 'Contatta lo studio culinario della Chef İlhamə. Prenotazioni, catering e servizi di chef privato.',
};

export default function ItalianContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/it' },
    { name: 'Contatti', href: '/it/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactStudioPage breadcrumbs={[
        { name: 'Home', href: '/it' },
        { name: 'Contatti', href: '/it/contact' },
      ]} />
    </>
  );
}
