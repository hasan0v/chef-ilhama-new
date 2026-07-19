import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Chi Siamo - Chef İlhamə',
  description: 'La storia dello studio culinario della Chef İlhamə, i suoi valori e la sua visione del servizio.',
};

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
      <AboutStudioPage breadcrumbs={[
        { name: 'Home', href: '/it' },
        { name: 'Chi Siamo', href: '/it/about' },
      ]} />
    </>
  );
}
