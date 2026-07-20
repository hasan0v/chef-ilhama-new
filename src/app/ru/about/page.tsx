import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutChefPage from '@/components/site/pages/AboutChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('ru', 'about', {
  title: 'О шефе - Шеф Ильхама',
  description: 'История кулинарной студии Шефа Ильхамы, ценности и видение сервиса.',
});

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
      <AboutChefPage breadcrumbs={[
        { name: 'Главная', href: '/ru' },
        { name: 'О шефе', href: '/ru/about' },
      ]} />
    </>
  );
}
