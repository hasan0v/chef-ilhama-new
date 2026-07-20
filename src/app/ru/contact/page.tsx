import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactChefPage from '@/components/site/pages/ContactChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('ru', 'contact', {
  title: 'Контакты - Шеф Ильхама',
  description: 'Свяжитесь с кулинарной студией Шефа Ильхамы. Заказы, кейтеринг и услуги личного шеф-повара.',
});

export default function RussianContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Главная', href: '/ru' },
    { name: 'Контакты', href: '/ru/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactChefPage breadcrumbs={[
        { name: 'Главная', href: '/ru' },
        { name: 'Контакты', href: '/ru/contact' },
      ]} />
    </>
  );
}
