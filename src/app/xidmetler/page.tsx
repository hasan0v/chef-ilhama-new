import ServicesPageClient from './ServicesPageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aşpaz Xidməti Bakı | Şəxsi Aşpaz və Katerinq | Chef İlhamə',
  description: 'Bakının ən yaxşı şəxsi aşpaz xidməti. Toy yeməkləri, katerinq, banket aşpazı və şirkət tədbirləri. 15+ il professional təcrübə. +994 10 379 45 77',
  keywords: 'aşpaz Bakı, şəxsi aşpaz, katerinq xidməti, toy yeməkləri, banket aşpazı, aşpaz evə, catering Baku, personal chef, aşpaz qiyməti, professional aşpaz',
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
    title: 'Aşpaz Xidməti Bakı | Şəxsi Aşpaz və Katerinq | Chef İlhamə',
    description: 'Bakının ən yaxşı şəxsi aşpaz xidməti. Toy yeməkləri, katerinq, banket aşpazı. 15+ il təcrübə.',
    type: 'website',
    locale: 'az_AZ',
    url: 'https://chef-ilhama.food/xidmetler',
    siteName: 'Chef İlhamə',
    images: [
      {
        url: 'https://chef-ilhama.food/ilhama.png',
        width: 1200,
        height: 630,
        alt: 'Chef İlhamə - Aşpaz Xidməti Bakı',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aşpaz Xidməti Bakı | Şəxsi Aşpaz | Chef İlhamə',
    description: 'Bakının ən yaxşı şəxsi aşpaz xidməti. Toy yeməkləri, katerinq, banket aşpazı.',
    images: ['https://chef-ilhama.food/ilhama.png'],
  },
  alternates: {
    canonical: 'https://chef-ilhama.food/xidmetler',
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}