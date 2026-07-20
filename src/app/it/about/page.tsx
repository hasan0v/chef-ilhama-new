import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutChefPage from '@/components/site/pages/AboutChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('it', 'about', {
  title: 'Chi Siamo - Chef İlhamə',
  description: 'La storia di Chef İlhamə, i suoi valori e la sua visione del servizio.',
});

export default function ItalianAboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/it' },
    { name: 'Chi Siamo', href: '/it/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutChefPage breadcrumbs={[
        { name: 'Home', href: '/it' },
        { name: 'Chi Siamo', href: '/it/about' },
      ]} />
    </>
  );
}
