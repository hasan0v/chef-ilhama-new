import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { siteConfig } from '@/lib/site';
import { getWebSiteSchema, getChefServiceSchema, getAuthorSchema } from '@/lib/seo';
import LocaleManager from '@/components/layout/LocaleManager';
import GoogleAnalytics from '@/components/Analytics/GoogleAnalytics';
import PrivacyNotice from '@/components/Analytics/PrivacyNotice';
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

const googleMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-0DZ2LRYK9J';
const googleConsentBootstrap = `
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
  (function() {
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('set', 'ads_data_redaction', true);
    window.gtag('js', new Date());
    window.gtag('config', '${googleMeasurementId}', {
      send_page_view: false,
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      restricted_data_processing: true
    });
  })();
`;

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords:
    'aşpaz Bakı, şəxsi aşpaz, katerinq xidməti, aşpaz evə, toy yeməkləri, banket aşpazı, azərbaycan mətbəxi, chef İlhamə, aşpaz qiyməti, katerinq Baku, personal chef, Azerbaijani recipes, Azerbaijani cuisine, Baku catering',
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
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
    alternateLocale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/images/chef-ilhama-social.jpg`,
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
    images: [`${siteConfig.url}/images/chef-ilhama-social.jpg`],
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      'az': siteConfig.url,
      'en': `${siteConfig.url}/en`,
    },
  },
  verification: {
    google: 'zG1SbCc5AcmPN4ZgKknvSSmI-n-9WxagwwFsgzU4WHQ',
  },
  category: 'food',
};

const siteSchemas = [
  getWebSiteSchema(),
  getChefServiceSchema(),
  { '@context': 'https://schema.org', ...getAuthorSchema() },
];

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

const htmlLocaleScript = `
  (function() {
    var path = window.location.pathname;
    if (path.indexOf('/ar/') === 0 || path === '/ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
    } else if (path.indexOf('/en/') === 0 || path === '/en') {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    } else if (path.indexOf('/tr/') === 0 || path === '/tr') {
      document.documentElement.lang = 'tr';
      document.documentElement.dir = 'ltr';
    } else if (path.indexOf('/ru/') === 0 || path === '/ru') {
      document.documentElement.lang = 'ru';
      document.documentElement.dir = 'ltr';
    } else if (path.indexOf('/fr/') === 0 || path === '/fr') {
      document.documentElement.lang = 'fr';
      document.documentElement.dir = 'ltr';
    } else if (path.indexOf('/it/') === 0 || path === '/it') {
      document.documentElement.lang = 'it';
      document.documentElement.dir = 'ltr';
    } else if (path.indexOf('/zh/') === 0 || path === '/zh') {
      document.documentElement.lang = 'zh';
      document.documentElement.dir = 'ltr';
    } else if (path.indexOf('/hi/') === 0 || path === '/hi') {
      document.documentElement.lang = 'hi';
      document.documentElement.dir = 'ltr';
    } else if (path.indexOf('/es/') === 0 || path === '/es') {
      document.documentElement.lang = 'es';
      document.documentElement.dir = 'ltr';
    } else if (path.indexOf('/pt/') === 0 || path === '/pt') {
      document.documentElement.lang = 'pt';
      document.documentElement.dir = 'ltr';
    } else if (path.indexOf('/nl/') === 0 || path === '/nl') {
      document.documentElement.lang = 'nl';
      document.documentElement.dir = 'ltr';
    } else if (path.indexOf('/de/') === 0 || path === '/de') {
      document.documentElement.lang = 'de';
      document.documentElement.dir = 'ltr';
    } else if (path.indexOf('/ja/') === 0 || path === '/ja') {
      document.documentElement.lang = 'ja';
      document.documentElement.dir = 'ltr';
    } else if (path.indexOf('/id/') === 0 || path === '/id') {
      document.documentElement.lang = 'id';
      document.documentElement.dir = 'ltr';
    } else if (path.indexOf('/bn/') === 0 || path === '/bn') {
      document.documentElement.lang = 'bn';
      document.documentElement.dir = 'ltr';
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#8d3a24" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="format-detection" content="telephone=yes" />
        {/* DNS prefetch for all external image hosts to reduce LCP latency */}
        <link rel="dns-prefetch" href="https://axscxlqiwpfxizjgaqsp.supabase.co" />
        <link rel="preconnect" href="https://axscxlqiwpfxizjgaqsp.supabase.co" crossOrigin="" />
        <link rel="dns-prefetch" href="https://v3.fal.media" />
        <link rel="preconnect" href="https://v3.fal.media" crossOrigin="" />
        <link rel="dns-prefetch" href="https://i.imgur.com" />
        <link rel="dns-prefetch" href="https://flavorsofbaku.com" />
        <link rel="dns-prefetch" href="https://azcookbook.com" />
        <script dangerouslySetInnerHTML={{ __html: htmlLocaleScript }} />
        <script dangerouslySetInnerHTML={{ __html: googleConsentBootstrap }} />
        {siteSchemas.map((schema, i) => (
          <script
            key={`schema-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className={`${manrope.variable} ${cormorant.variable} font-sans antialiased`}>
        <GoogleAnalytics />
        <PrivacyNotice />
        <LocaleManager />
        {children}
        <script dangerouslySetInnerHTML={{ __html: serviceWorkerScript }} />
      </body>
    </html>
  );
}
