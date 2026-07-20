import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactChefPage from '@/components/site/pages/ContactChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('nl', 'contact', {
  title: 'Contact - Chef İlhamə',
  description: 'Neem contact op met Chef İlhamə voor catering, privéchef-services en boekingen.',
});

export default function DutchContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/nl' },
    { name: 'Contact', href: '/nl/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactChefPage breadcrumbs={[
        { name: 'Home', href: '/nl' },
        { name: 'Contact', href: '/nl/contact' },
      ]} />
    </>
  );
}
