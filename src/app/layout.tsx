import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { getWhatsAppHref, siteConfig } from '@/lib/site';
import { getWebSiteSchema, getOrganizationSchema, getFoodEstablishmentSchema, getAuthorSchema } from '@/lib/seo';
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
  getOrganizationSchema(),
  { '@context': 'https://schema.org', ...getAuthorSchema() },
  getFoodEstablishmentSchema(),
];

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
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="format-detection" content="telephone=yes" />
        <script dangerouslySetInnerHTML={{ __html: analyticsScript }} />
        {siteSchemas.map((schema, i) => (
          <script
            key={`schema-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className={`${manrope.variable} ${cormorant.variable} font-sans antialiased`}>
        {children}
        <script dangerouslySetInnerHTML={{ __html: serviceWorkerScript }} />
      </body>
    </html>
  );
}
