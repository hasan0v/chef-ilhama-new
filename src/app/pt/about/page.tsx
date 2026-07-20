import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutChefPage from '@/components/site/pages/AboutChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('pt', 'about', {
  title: 'Sobre - Chef İlhamə',
  description: 'A história por trás do estúdio culinário da Chef İlhamə, os nossos valores e visão sobre a hospitalidade de excelência.',
});

export default function PortugueseAboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Início', href: '/pt' },
    { name: 'Sobre', href: '/pt/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutChefPage breadcrumbs={[
        { name: 'Início', href: '/pt' },
        { name: 'Sobre', href: '/pt/about' },
      ]} />
    </>
  );
}
