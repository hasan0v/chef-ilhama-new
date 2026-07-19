import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactStudioPage from '@/components/site/pages/ContactStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('de', 'contact', {
  title: 'Kontakt - Chef İlhamə',
  description: 'Treten Sie mit dem kulinarischen Atelier von Chef İlhamə in Verbindung. Catering, Privatkoch und Buchungen.',
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
      <ContactStudioPage breadcrumbs={[
        { name: 'Startseite', href: '/de' },
        { name: 'Kontakt', href: '/de/contact' },
      ]} />
    </>
  );
}
