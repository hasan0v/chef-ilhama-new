import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Sobre - Chef İlhamə',
  description: 'A história por trás do estúdio culinário da Chef İlhamə, os nossos valores e visão sobre a hospitalidade de excelência.',
};

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
      <AboutStudioPage breadcrumbs={[
        { name: 'Início', href: '/pt' },
        { name: 'Sobre', href: '/pt/about' },
      ]} />
    </>
  );
}
