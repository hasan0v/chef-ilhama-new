import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Chef İlhamə - Professional Aşpaz Xidməti Bakı | Azərbaycan Mətbəxi",
  description: "Bakının ən yaxşı şəxsi aşpazı. Katerinq xidməti, toy yeməkləri, şirkət tədbirləri. Professional aşpaz xidməti evə çağırın. +994 10 379 45 77",
  keywords: "aşpaz Bakı, şəxsi aşpaz, katerinq xidməti, aşpaz evə, toy yeməkləri, banket aşpazı, azərbaycan mətbəxi, chef İlhamə, aşpaz qiyməti, catering Baku, personal chef",
  authors: [{ name: "Chef İlhamə" }],
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
    title: "Chef İlhamə - Professional Aşpaz Xidməti Bakı",
    description: "Bakının ən yaxşı şəxsi aşpazı. Katerinq xidməti, toy yeməkləri, şirkət tədbirləri. Professional aşpaz xidməti evə çağırın.",
    type: "website",
    locale: "az_AZ",
    url: "https://chef-ilhama.food",
    siteName: "Chef İlhamə",
    images: [
      {
        url: "https://chef-ilhama.food/ilhama.png",
        width: 1200,
        height: 630,
        alt: "Chef İlhamə - Professional Aşpaz Xidməti Bakı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chef İlhamə - Professional Aşpaz Xidməti Bakı",
    description: "Bakının ən yaxşı şəxsi aşpazı. Katerinq xidməti, toy yeməkləri, şirkət tədbirləri.",
    images: ["https://chef-ilhama.food/ilhama.png"],
  },
  alternates: {
    canonical: "https://chef-ilhama.food",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#dc2626" />
        
        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Preconnect to critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/ilhama.png" as="image" type="image/png" />
        <link rel="preload" href="/placeholder-food.svg" as="image" type="image/svg+xml" />
        
        {/* PWA Configuration */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        
        {/* Optimize resource loading */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="format-detection" content="telephone=yes" />
        
        {/* Google Analytics 4 - Note: Replace G-YOUR-GA4-ID with actual ID */}
        
        {/* Business Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://chef-ilhama.food/#business",
              "name": "Chef İlhamə",
              "description": "Professional şəxsi aşpaz və katerinq xidməti Bakıda",
              "url": "https://chef-ilhama.food",
              "telephone": "+994 10 379 45 77",
              "email": "info@chef-ilhama.food",
              "logo": "https://chef-ilhama.food/ilhama.png",
              "image": [
                "https://chef-ilhama.food/ilhama.png",
                "https://chef-ilhama.food/images/catering-1.jpg",
                "https://chef-ilhama.food/images/chef-cooking.jpg"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Bakı",
                "addressCountry": "AZ",
                "addressRegion": "Bakı şəhəri"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.4093,
                "longitude": 49.8671
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Bakı"
                },
                {
                  "@type": "City", 
                  "name": "Sumqayıt"
                },
                {
                  "@type": "AdministrativeArea",
                  "name": "Abşeron rayonu"
                }
              ],
              "serviceType": [
                "Personal Chef Services",
                "Catering Services", 
                "Private Dining",
                "Event Catering",
                "Corporate Catering"
              ],
              "cuisine": [
                "Azerbaijani",
                "Turkish",
                "Middle Eastern",
                "International"
              ],
              "priceRange": "$$-$$$",
              "openingHours": "Mo-Su 08:00-22:00",
              "paymentAccepted": "Cash, Credit Card, Bank Transfer",
              "currenciesAccepted": "AZN",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Chef İlhamə Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Şəxsi Aşpaz Xidməti",
                      "description": "Professional şəxsi aşpaz evə çağırın"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Katerinq Xidməti",
                      "description": "Toy və tədbirlər üçün professional katerinq"
                    }
                  }
                ]
              },
              "sameAs": [
                "https://www.instagram.com/chef.ilhama",
                "https://www.facebook.com/chef.ilhama.baku",
                "https://wa.me/994103794577"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${openSans.variable} font-sans antialiased`}
      >
        {children}
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.register('/sw.js')
                    .then(() => console.log('SW registered'))
                    .catch(() => console.log('SW registration failed'));
                }
              `
            }}
          />
        )}
      </body>
    </html>
  );
}
