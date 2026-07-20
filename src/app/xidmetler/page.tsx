import { withLocaleAlternates } from '@/lib/seoLocales';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import type { Metadata } from 'next';
import { getServicePageSchema, getBreadcrumbSchema, getFAQSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('az', 'services', {
  title: 'Aşpaz Xidməti Bakı — Şəxsi Aşpaz və Katerinq',
  description: 'Bakının ən yaxşı şəxsi aşpaz xidməti. Toy yeməkləri, premium katerinq, banket aşpazı və şirkət tədbirləri. 15+ il professional təcrübə. Bakı, Sumqayıt, Abşeron.',
  keywords: 'aşpaz Bakı, şəxsi aşpaz, katerinq xidməti, toy yeməkləri, banket aşpazı, aşpaz evə, katerinq Baku, personal chef Baku, catering Azerbaijan, private chef Azerbaijan, wedding catering Baku',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Aşpaz Xidməti Bakı — Şəxsi Aşpaz və Katerinq | Chef İlhamə',
    description: 'Bakının ən yaxşı şəxsi aşpaz xidməti. Toy yeməkləri, katerinq, banket aşpazı. 15+ il təcrübə.',
    type: 'website',
    locale: 'az_AZ',
    alternateLocale: 'en_US',
    url: 'https://www.chef-ilhama.food/xidmetler',
    siteName: 'Chef İlhamə',
    images: [
      {
        url: 'https://www.chef-ilhama.food/images/chef-ilhama-social.jpg',
        width: 1200,
        height: 630,
        alt: 'Chef İlhamə - Aşpaz Xidməti Bakı',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aşpaz Xidməti Bakı — Şəxsi Aşpaz | Chef İlhamə',
    description: 'Bakının ən yaxşı şəxsi aşpaz xidməti. Toy yeməkləri, katerinq, banket aşpazı.',
    images: ['https://www.chef-ilhama.food/images/chef-ilhama-social.jpg'],
  },
  alternates: {
    canonical: 'https://www.chef-ilhama.food/xidmetler',
    languages: {
      'az': 'https://www.chef-ilhama.food/xidmetler',
      'en': 'https://www.chef-ilhama.food/en/services',
    },
  },
});

const serviceFaqs = [
  {
    question: 'Chef İlhamə hansı xidmətlər təklif edir?',
    answer: 'Chef İlhamə şəxsi aşpaz xidməti, premium katerinq, toy masası planlaması, korporativ tədbir servisi, nişan və ailə şənlikləri, həmçinin master-klass və workshop formatları təklif edir.',
  },
  {
    question: 'Xidmət hansı əraziləri əhatə edir?',
    answer: 'Xidmətlər Bakı, Sumqayıt və Abşeron rayonunu əhatə edir. Məkan və logistika öncədən planlanır.',
  },
  {
    question: 'Sifariş necə verilir?',
    answer: 'WhatsApp (+994 77 614 11 74), telefon və ya saytdakı sorğu forması vasitəsilə sifariş vermək olar. Ən sürətli cavab WhatsApp ilə gəlir.',
  },
  {
    question: 'Neçə nəfərlik tədbirlər üçün xidmət var?',
    answer: '10 nəfərlik private dinner-dən 300+ nəfərlik toy mərasiminə qədər hər miqyasda xidmət mövcuddur.',
  },
];

export default function ServicesPage() {
  const serviceSchema = getServicePageSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Ana Səhifə', href: '/' },
    { name: 'Xidmətlər', href: '/xidmetler' },
  ]);
  const faqSchema = getFAQSchema(serviceFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicesExperience breadcrumbs={[
        { name: 'Ana Səhifə', href: '/' },
        { name: 'Xidmətlər', href: '/xidmetler' },
      ]} />
    </>
  );
}