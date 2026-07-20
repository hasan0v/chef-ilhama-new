import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';
import { getAboutPageSchema, getAuthorSchema, getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 3600;

export const metadata: Metadata = withLocaleAlternates('az', 'about', {
  title: 'Chef İlhamə haqqında — Peşəkar Azərbaycan Aşpazı',
  description: 'Chef İlhamə — 15+ il təcrübəsi olan professional Azərbaycan aşpazı. Bakı, Sumqayıt və Abşeronda şəxsi aşpaz, katerinq və menyu kurasiya xidməti. Bölgəvi reseptlər və kulinariya sənətkarlığı.',
  keywords: 'Chef İlhamə, Azərbaycan aşpazı, şəxsi aşpaz Bakı, professional chef Baku, Azerbaijani chef, kulinariya məsləhətçisi',
  openGraph: {
    title: 'Chef İlhamə haqqında — Peşəkar Azərbaycan Aşpazı',
    description: 'Chef İlhamə — 15+ il professional təcrübə. Azərbaycan mətbəxinin bölgəvi dadlarını müasir yanaşma ilə təqdim edir.',
    type: 'profile',
    locale: 'az_AZ',
    alternateLocale: 'en_US',
    url: 'https://www.chef-ilhama.food/haqqinda',
    siteName: 'Chef İlhamə',
    images: [
      {
        url: 'https://www.chef-ilhama.food/ilhama.png',
        width: 1200,
        height: 630,
        alt: 'Chef İlhamə — Peşəkar Azərbaycan aşpazı',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef İlhamə haqqında',
    description: '15+ il təcrübəsi olan professional Azərbaycan aşpazı. Bölgəvi reseptlər və katerinq xidməti.',
    images: ['https://www.chef-ilhama.food/ilhama.png'],
  },
  alternates: {
    canonical: 'https://www.chef-ilhama.food/haqqinda',
    languages: {
      'az': 'https://www.chef-ilhama.food/haqqinda',
      'en': 'https://www.chef-ilhama.food/en/about',
    },
  },
});

export default function AboutPage() {
  const aboutSchema = getAboutPageSchema();
  const personSchema = { '@context': 'https://schema.org', ...getAuthorSchema() };
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Ana Səhifə', href: '/' },
    { name: 'Haqqında', href: '/haqqinda' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutStudioPage breadcrumbs={[
        { name: 'Ana Səhifə', href: '/' },
        { name: 'Haqqında', href: '/haqqinda' },
      ]} />
    </>
  );
}
