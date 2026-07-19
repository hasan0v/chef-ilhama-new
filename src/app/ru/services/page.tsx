import type { Metadata } from 'next';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Услуги - Шеф Ильхама',
  description: 'Заказ личного шеф-повара, приватные ужины и премиальный кейтеринг в Баку.',
};

export default function RussianServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Главная', href: '/ru' },
    { name: 'Услуги', href: '/ru/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesExperience breadcrumbs={[
        { name: 'Главная', href: '/ru' },
        { name: 'Услуги', href: '/ru/services' },
      ]} />
    </>
  );
}
