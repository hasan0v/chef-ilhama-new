import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactStudioPage from '@/components/site/pages/ContactStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('ar', 'contact', {
  title: 'اتصل بنا - الشيف إلهامة',
  description: 'تواصل مع استوديو الطهي للشيف إلهامة. الحجوزات، كاترينج، وخدمات الشيف الخاص.',
});

export default function ArabicContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'الرئيسية', href: '/ar' },
    { name: 'اتصل بنا', href: '/ar/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactStudioPage breadcrumbs={[
        { name: 'الرئيسية', href: '/ar' },
        { name: 'اتصل بنا', href: '/ar/contact' },
      ]} />
    </>
  );
}
