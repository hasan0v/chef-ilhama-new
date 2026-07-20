import type { Metadata } from 'next';
import ChefBookingLanding from '@/components/site/pages/ChefBookingLanding';
import { chefSearchAliases } from '@/lib/chefSearchAliases';
import { getBreadcrumbSchema, getFAQSchema } from '@/lib/seo';

const pageUrl = 'https://www.chef-ilhama.food/aspaz-xidmeti-baki';
const heroImage = 'https://www.chef-ilhama.food/images/chef-ilhama-social.jpg';

export const metadata: Metadata = {
  title: 'Aşpaz Axtarırsınız? Şəxsi Aşpaz və Katerinq Bakı',
  description: 'Bakıda şəxsi aşpaz, ev qonaqlığı, toy və katerinq xidməti axtarırsınız? Chef İlhamə ilə menyu, porsiya və tədbir süfrəsini birbaşa planlayın.',
  keywords: [
    'aşpaz axtarıram',
    'aşpaz axtarırsınız',
    'aşpaz xidməti Bakı',
    'şəxsi aşpaz Bakı',
    'evə aşpaz',
    'katerinq Bakı',
    'toy aşpazı',
    'aşpaz sifarişi',
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    type: 'website',
    locale: 'az_AZ',
    url: pageUrl,
    siteName: 'Chef İlhamə',
    title: 'Aşpaz Axtarırsınız? Şəxsi Aşpaz və Katerinq Bakı',
    description: 'Evdə qonaqlıqdan böyük tədbirə qədər aşpaz xidməti. Chef İlhamə ilə birbaşa planlayın.',
    images: [{ url: heroImage, width: 1200, height: 630, alt: 'Chef İlhamə — Bakı şəxsi aşpaz və katerinq xidməti' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aşpaz Axtarırsınız? | Chef İlhamə',
    description: 'Bakı, Sumqayıt və Abşeronda şəxsi aşpaz və katerinq xidməti.',
    images: [heroImage],
  },
};

const faqs = [
  { question: '“Aşpaz”, “aspaz” və ya “asbaz” axtarıram — bu xidmət mənim üçündür?', answer: 'Bəli. Bu sözlər eyni ehtiyacı ifadə edir: ev qonaqlığı, ailə şənliyi və ya tədbir üçün peşəkar aşpaz sifarişi. Tədbir növünü və qonaq sayını yazın, uyğun formatı birlikdə planlayaq.' },
  { question: 'Toy yeməkləri və ya “toy yemekleri” üçün aşpaz sifariş etmək olar?', answer: 'Bəli. Toy, nişan və ailə mərasimi üçün menyu, porsiya, hazırlıq və servis axını qonaq sayınıza uyğun qurulur.' },
  { question: '“Evə aşpaz”, “eve aspaz” və “şəxsi aşpaz” eyni xidmətdir?', answer: 'Bəli. Ev qonaqlığı və private dinner üçün yerində hazırlıq, menyu və servis planı şəxsi aşpaz formatında təqdim olunur.' },
  { question: 'Katerinq, keyterinq və katering xidməti üçün müraciət edə bilərəm?', answer: 'Bəli. Fərqli yazılışlardan asılı olmayaraq, qonaq sayı, məkan, tarix və tədbir formatı ilə yazın; uyğun katerinq planı hazırlanacaq.' },
  { question: 'Aşpaz xidməti hansı ərazilərdə göstərilir?', answer: 'Chef İlhamə Bakı, Sumqayıt və Abşeron üzrə şəxsi aşpaz, katerinq və tədbir xidməti planlayır. Məkan və logistika sorğu zamanı dəqiqləşdirilir.' },
  { question: 'Qiymət necə müəyyənləşir?', answer: 'Qiymət qonaq sayı, tədbir tarixi, menyu, məkan və servis formatına görə hazırlanır. Qısa brif göndərin, sizə uyğun plan qurulsun.' },
  { question: 'Kiçik ev qonaqlığı üçün də sifariş mümkündür?', answer: 'Bəli. Şəxsi aşpaz formatı ev qonaqlığı və private dinner üçün də uyğundur; qonaq sayı və istədiyiniz dad istiqaməti ilə yazın.' },
  { question: 'Nə qədər əvvəldən əlaqə saxlamaq lazımdır?', answer: 'Tarixiniz bəllidirsə, mümkün qədər tez yazın. Beləliklə menyu, alış-veriş və mətbəx planı daha rahat koordinasiya olunur.' },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Bakı Şəxsi Aşpaz və Katerinq Xidməti',
  description: 'Chef İlhamə ilə Bakıda ev qonaqlığı, private dinner, toy, ailə şənliyi və korporativ tədbir üçün şəxsi aşpaz və katerinq xidməti.',
  url: pageUrl,
  image: heroImage,
  alternateName: chefSearchAliases,
  provider: { '@id': 'https://www.chef-ilhama.food/#person' },
  areaServed: [
    { '@type': 'City', name: 'Bakı' },
    { '@type': 'City', name: 'Sumqayıt' },
    { '@type': 'AdministrativeArea', name: 'Abşeron' },
  ],
  availableChannel: [
    { '@type': 'ServiceChannel', servicePhone: '+994 77 614 11 74', availableLanguage: ['az', 'en', 'ru', 'tr'] },
  ],
  serviceType: ['Şəxsi aşpaz', 'Katerinq', 'Toy və tədbir süfrəsi'],
};

export default function ChefServiceSearchPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Ana Səhifə', href: '/' },
    { name: 'Aşpaz xidməti', href: '/aspaz-xidmeti-baki' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqs)) }} />
      <ChefBookingLanding />
    </>
  );
}
