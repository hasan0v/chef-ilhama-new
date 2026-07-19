import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'О шефе - Шеф Ильхама',
  description: 'История кулинарной студии Шефа Ильхамы, ценности и видение сервиса.',
};

export default function RussianAboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Главная', href: '/ru' },
    { name: 'О шефе', href: '/ru/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutStudioPage breadcrumbs={[
        { name: 'Главная', href: '/ru' },
        { name: 'О шефе', href: '/ru/about' },
      ]} />
    </>
  );
}
