import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactChefPage from '@/components/site/pages/ContactChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('it', 'contact', {
  title: 'Contatti - Chef İlhamə',
  description: 'Contatta Chef İlhamə per prenotazioni, catering e servizi di chef privato.',
});

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
      <ContactChefPage breadcrumbs={[
        { name: 'Home', href: '/it' },
        { name: 'Contatti', href: '/it/contact' },
      ]} />
    </>
  );
}
