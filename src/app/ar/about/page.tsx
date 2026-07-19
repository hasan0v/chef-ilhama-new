import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('ar', 'about', {
  title: 'عن الشيف - الشيف إلهامة',
  description: 'قصة استوديو الطهي للشيف إلهامة، وقيمنا ورؤيتنا للضيافة الفاخرة.',
});

export default function ArabicAboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'الرئيسية', href: '/ar' },
    { name: 'عن الشيف', href: '/ar/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutStudioPage breadcrumbs={[
        { name: 'الرئيسية', href: '/ar' },
        { name: 'عن الشيف', href: '/ar/about' },
      ]} />
    </>
  );
}
