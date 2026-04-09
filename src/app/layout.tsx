import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { getWhatsAppHref, siteConfig } from '@/lib/site';
import './globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords:
    'aşpaz Bakı, şəxsi aşpaz, katerinq xidməti, aşpaz evə, toy yeməkləri, banket aşpazı, azərbaycan mətbəxi, chef İlhamə, aşpaz qiyməti, katerinq Baku, personal chef',
  authors: [{ name: siteConfig.name }],
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
    title: siteConfig.title,
    description: siteConfig.description,
    type: 'website',
    locale: 'az_AZ',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/ilhama.png`,
        width: 1200,
        height: 630,
        alt: 'Chef İlhamə - Professional Aşpaz Xidməti Bakı',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/ilhama.png`],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteConfig.url}/#business`,
  name: siteConfig.name,
  description: 'Professional şəxsi aşpaz və katerinq xidməti Bakıda',
  url: siteConfig.url,
  telephone: siteConfig.phoneDisplay,
  email: siteConfig.email,
  logo: `${siteConfig.url}/ilhama.png`,
  image: [
    `${siteConfig.url}/ilhama.png`,
    `${siteConfig.url}/images/katerinq-1.jpg`,
    `${siteConfig.url}/images/chef-cooking.jpg`,
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bakı',
    addressCountry: 'AZ',
    addressRegion: 'Bakı şəhəri',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.4093,
    longitude: 49.8671,
  },
  areaServed: [
    { '@type': 'City', name: 'Bakı' },
    { '@type': 'City', name: 'Sumqayıt' },
    { '@type': 'AdministrativeArea', name: 'Abşeron rayonu' },
  ],
  serviceType: [
    'Personal Chef Services',
    'Katerinq Services',
    'Private Dining',
    'Event Katerinq',
    'Corporate Katerinq',
  ],
  cuisine: ['Azerbaijani', 'Turkish', 'Middle Eastern', 'International'],
  priceRange: '$$-$$$',
  openingHours: 'Mo-Su 08:00-22:00',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  currenciesAccepted: 'AZN',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Chef İlhamə Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Şəxsi Aşpaz Xidməti',
          description: 'Professional şəxsi aşpaz evə çağırın',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Katerinq Xidməti',
          description: 'Toy və tədbirlər üçün professional katerinq',
        },
      },
    ],
  },
  sameAs: [siteConfig.instagram, siteConfig.facebook, getWhatsAppHref()],
};

const analyticsScript = `
  window.addEventListener('load', function() {
    setTimeout(function() {
      var script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-0DZ2LRYK9J';
      script.async = true;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-0DZ2LRYK9J', { send_page_view: true });
    }, 100);
  });
`;

const serviceWorkerScript = `
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      var isLocalHost =
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';

      if (isLocalHost) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
          registrations.forEach(function(registration) {
            registration.unregister();
          });
        });

        if ('caches' in window) {
          caches.keys().then(function(keys) {
            keys.forEach(function(key) {
              caches.delete(key);
            });
          });
        }

        return;
      }

      navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
          console.log('SW registered');
        })
        .catch(function() {
          console.log('SW registration failed');
        });
    });
  }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#8d3a24" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="format-detection" content="telephone=yes" />
        <script dangerouslySetInnerHTML={{ __html: analyticsScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
      </head>
      <body className={`${manrope.variable} ${cormorant.variable} font-sans antialiased`}>
        {children}
        <script dangerouslySetInnerHTML={{ __html: serviceWorkerScript }} />
      </body>
    </html>
  );
}
