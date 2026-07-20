import type { Metadata } from 'next';
import ChefBookingLanding from '@/components/site/pages/ChefBookingLanding';
import { chefSearchAliases } from '@/lib/chefSearchAliases';
import { getBreadcrumbSchema, getFAQSchema } from '@/lib/seo';

const pageUrl = 'https://www.chef-ilhama.food/aspaz-xidmeti-baki';
const heroImage = 'https://www.chef-ilhama.food/images/chef-ilhama-social.jpg';

export const metadata: Metadata = {
  title: 'Bakı Aşpaz — Şəxsi Aşpaz və Katerinq | Chef İlhamə',
  description: 'Bakı aşpaz axtarışında ev qonaqlığı, toy və tədbir üçün Chef İlhamə ilə birbaşa planlayın. Şəxsi aşpaz, menyu, porsiya və servis bir yerdə.',
  keywords: [
    'Bakı aşpaz',
    'Bakı aşbaz',
    'Baki aspaz',
    'Baki asbaz',
    'aşpaz Bakı',
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
    title: 'Bakı Aşpaz — Şəxsi Aşpaz və Katerinq | Chef İlhamə',
    description: 'Bakı aşpaz axtarışında ev qonaqlığı, toy və tədbir üçün birbaşa planlama.',
    images: [{ url: heroImage, width: 1200, height: 630, alt: 'Chef İlhamə — Bakı şəxsi aşpaz və katerinq xidməti' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bakı Aşpaz | Chef İlhamə',
    description: 'Bakı, Sumqayıt və Abşeronda şəxsi aşpaz və katerinq xidməti.',
    images: [heroImage],
  },
};

const faqs = [
  { question: '“Bakı aşpaz”, “baki aspaz” və ya “aşpaz Bakı” axtarıram — bu xidmət mənim üçündür?', answer: 'Bəli — əgər iş elanı deyil, ev qonaqlığı, ailə şənliyi və ya tədbir üçün peşəkar aşpaz sifarişi axtarırsınızsa. Tədbir növünü və qonaq sayını yazın, uyğun formatı birlikdə planlayaq.' },
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
  name: 'Bakı Aşpaz — Şəxsi Aşpaz və Katerinq Xidməti',
  description: 'Bakı aşpaz axtarışında ev qonaqlığı, private dinner, toy, ailə şənliyi və korporativ tədbir üçün Chef İlhamənin şəxsi aşpaz və katerinq xidməti.',
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
  serviceType: ['Bakı aşpaz xidməti', 'Şəxsi aşpaz', 'Katerinq', 'Toy və tədbir süfrəsi'],
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
