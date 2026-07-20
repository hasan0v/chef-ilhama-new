import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactChefPage from '@/components/site/pages/ContactChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('de', 'contact', {
  title: 'Kontakt - Chef İlhamə',
  description: 'Kontaktieren Sie Chef İlhamə für Catering, Privatkoch-Service und Buchungen.',
});

export default function GermanContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Startseite', href: '/de' },
    { name: 'Kontakt', href: '/de/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactChefPage breadcrumbs={[
        { name: 'Startseite', href: '/de' },
        { name: 'Kontakt', href: '/de/contact' },
      ]} />
    </>
  );
}
