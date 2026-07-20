import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutChefPage from '@/components/site/pages/AboutChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('de', 'about', {
  title: 'Über mich - Chef İlhamə',
  description: 'Die Geschichte von Chef İlhamə, ihre Werte und ihre Vision erlesener Gastfreundschaft.',
});

export default function GermanAboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Startseite', href: '/de' },
    { name: 'Über mich', href: '/de/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutChefPage breadcrumbs={[
        { name: 'Startseite', href: '/de' },
        { name: 'Über mich', href: '/de/about' },
      ]} />
    </>
  );
}
