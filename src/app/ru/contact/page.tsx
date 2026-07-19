import type { Metadata } from 'next';
import ContactStudioPage from '@/components/site/pages/ContactStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Контакты - Шеф Ильхама',
  description: 'Свяжитесь с кулинарной студией Шефа Ильхамы. Заказы, кейтеринг и услуги личного шеф-повара.',
};

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
      <ContactStudioPage breadcrumbs={[
        { name: 'Главная', href: '/ru' },
        { name: 'Контакты', href: '/ru/contact' },
      ]} />
    </>
  );
}
