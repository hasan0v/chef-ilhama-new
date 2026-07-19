import type { Metadata } from 'next';
import ContactStudioPage from '@/components/site/pages/ContactStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact - Chef İlhamə',
  description: 'Neem contact op met de culinaire studio van Chef İlhamə. Catering, privéchef-services en boekingen.',
};

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
      <ContactStudioPage breadcrumbs={[
        { name: 'Home', href: '/nl' },
        { name: 'Contact', href: '/nl/contact' },
      ]} />
    </>
  );
}
