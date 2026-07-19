import { siteConfig, getWhatsAppHref } from './site';
import type { Recipe } from '@/types/recipe';
import { getLocalizedRecipePath, SEO_LOCALE_CONFIG } from '@/lib/seoLocales';
import { normalizeSiteLocale, SITE_LOCALES } from '@/lib/localeRoutes';

const BASE_URL = siteConfig.url;

// ─── Time parsing ────────────────────────────────────────────────────────────

/** Convert Azerbaijani time string to ISO 8601 duration */
export function parseIsoDuration(timeStr: string): string {
  if (!timeStr) return 'PT30M';
  const nums = timeStr.match(/\d+/g);
  if (!nums) return 'PT30M';

  const lower = timeStr.toLowerCase();
  const hasHours = /saat|hour|hr\b|heure|stunde|ora\b|hora|uur|час|小时|時間|jam\b|घंट|ঘণ্টা|ساعة/.test(lower);
  const hasMinutes = /dəqiqə|minute|min\b|dakika|minuto|minuut|мину|分钟|分\b|menit|मिनट|মিনিট|دقيقة/.test(lower);
  if (hasHours && hasMinutes) {
    return `PT${nums[0]}H${nums[1] || 0}M`;
  }
  if (hasHours) return `PT${nums[0]}H`;
  if (hasMinutes) return `PT${nums[0]}M`;
  return `PT${nums[0]}M`;
}

/** Add two ISO durations and return ISO duration */
function addDurations(a: string, b: string): string {
  const parse = (d: string) => {
    const h = d.match(/(\d+)H/);
    const m = d.match(/(\d+)M/);
    return (h ? parseInt(h[1]) * 60 : 0) + (m ? parseInt(m[1]) : 0);
  };
  const total = parse(a) + parse(b);
  const hours = Math.floor(total / 60);
  const mins = total % 60;
  if (hours && mins) return `PT${hours}H${mins}M`;
  if (hours) return `PT${hours}H`;
  return `PT${mins}M`;
}

// ─── Person / Author schema ──────────────────────────────────────────────────

export function getAuthorSchema() {
  return {
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: 'Chef İlhamə',
    url: `${BASE_URL}/haqqinda`,
    image: `${BASE_URL}/ilhama.png`,
    jobTitle: 'Professional Chef',
    description:
      'Azərbaycan mətbəxinin bölgəvi dadlarını müasir yanaşma ilə təqdim edən peşəkar aşpaz. 15+ il təcrübə ilə Bakı, Sumqayıt və Abşeron bölgəsində fəaliyyət göstərir.',
    knowsAbout: [
      'Azerbaijani cuisine',
      'Traditional Azerbaijani recipes',
      'Catering services',
      'Private chef services',
      'Event menu curation',
    ],
    sameAs: [siteConfig.instagram, siteConfig.facebook],
  };
}

// ─── WebSite schema ──────────────────────────────────────────────────────────

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: siteConfig.name,
    alternateName: 'Chef Ilhama',
    url: BASE_URL,
    description: siteConfig.description,
    publisher: { '@id': `${BASE_URL}/#organization` },
    inLanguage: [...SITE_LOCALES],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/reseptler?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ─── Organization schema ─────────────────────────────────────────────────────

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: siteConfig.name,
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/ilhama.png`,
      width: 512,
      height: 512,
    },
    image: `${BASE_URL}/ilhama.png`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phoneDisplay,
    founder: { '@id': `${BASE_URL}/#person` },
    areaServed: [
      { '@type': 'City', name: 'Bakı' },
      { '@type': 'City', name: 'Sumqayıt' },
      { '@type': 'AdministrativeArea', name: 'Abşeron rayonu' },
    ],
    sameAs: [siteConfig.instagram, siteConfig.facebook],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phoneDisplay,
      contactType: 'customer service',
      availableLanguage: ['Azerbaijani', 'English', 'Russian', 'Turkish'],
      areaServed: 'AZ',
    },
  };
}

// ─── FoodEstablishment schema (for layout) ───────────────────────────────────

export function getFoodEstablishmentSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['FoodEstablishment', 'LocalBusiness'],
    '@id': `${BASE_URL}/#business`,
    name: siteConfig.name,
    description: 'Professional şəxsi aşpaz və katerinq xidməti Bakıda. Azərbaycan mətbəxinin bölgəvi dadlarını peşəkar servis ilə təqdim edirik.',
    url: BASE_URL,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    logo: `${BASE_URL}/ilhama.png`,
    image: [
      `${BASE_URL}/ilhama.png`,
    ],
    founder: { '@id': `${BASE_URL}/#person` },
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
    servesCuisine: ['Azerbaijani', 'Turkish', 'Middle Eastern'],
    priceRange: '$$-$$$',
    openingHours: 'Mo-Su 08:00-22:00',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    currenciesAccepted: 'AZN',
    sameAs: [siteConfig.instagram, siteConfig.facebook, getWhatsAppHref()],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Chef İlhamə Xidmətləri',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Şəxsi Aşpaz Xidməti',
            description: 'Evdə və ya xüsusi məkanda private dining və butik servis.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Premium Katerinq',
            description: 'Brend tədbiri, təqdimat və qapalı məclislər üçün catering.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Toy Masası Planlaması',
            description: 'Klassik Azərbaycan süfrəsini daha zərif axınla qururuq.',
          },
        },
      ],
    },
  };
}

// ─── BreadcrumbList schema ───────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : `${BASE_URL}${item.href}`,
    })),
  };
}

// ─── Recipe schema ───────────────────────────────────────────────────────────

export function getRecipeSchema(recipe: Recipe, locale = 'az') {
  const normalizedLocale = normalizeSiteLocale(locale);
  const localeConfig = SEO_LOCALE_CONFIG[normalizedLocale];
  const prepDuration = parseIsoDuration(recipe.prepTime);
  // Estimate cook time as roughly equal to prep or 30min default
  const cookDuration = 'PT30M';
  const totalDuration = addDurations(prepDuration, cookDuration);

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    image: [recipe.image || `${BASE_URL}/placeholder-food.svg`],
    author: { '@id': `${BASE_URL}/#person` },
    description: recipe.history?.trim() || localeConfig.recipeDescription(recipe.name, recipe.origin),
    recipeCuisine: recipe.cuisine || recipe.origin,
    recipeCategory: recipe.category,
    keywords: [recipe.name, recipe.origin, recipe.category, ...(recipe.tags ?? [])].filter(Boolean),
    recipeYield: recipe.servings,
    prepTime: prepDuration,
    cookTime: cookDuration,
    totalTime: totalDuration,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.instructions.map((instruction, index) => ({
      '@type': 'HowToStep',
      name: `${localeConfig.stepLabel} ${index + 1}`,
      text: instruction,
      position: index + 1,
    })),
    url: `${BASE_URL}${getLocalizedRecipePath(normalizedLocale, recipe.slug)}`,
    inLanguage: normalizedLocale,
    isPartOf: { '@id': `${BASE_URL}/#website` },
  };
}

// ─── CollectionPage / ItemList schema ────────────────────────────────────────

export function getRecipeCollectionSchema(recipes: Recipe[], title: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url: url.startsWith('http') ? url : `${BASE_URL}${url}`,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: recipes.length,
      itemListElement: recipes.slice(0, 50).map((recipe, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${BASE_URL}/resept/${recipe.slug}`,
        name: recipe.name,
      })),
    },
  };
}

// ─── AboutPage schema ────────────────────────────────────────────────────────

export function getAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Chef İlhamə haqqında',
    description:
      'Chef İlhamə — 15+ il təcrübəsi olan professional Azərbaycan aşpazı. Bakı, Sumqayıt və Abşeronda şəxsi aşpaz və katerinq xidməti.',
    url: `${BASE_URL}/haqqinda`,
    mainEntity: { '@id': `${BASE_URL}/#person` },
    isPartOf: { '@id': `${BASE_URL}/#website` },
  };
}

// ─── ContactPage schema ─────────────────────────────────────────────────────

export function getContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Əlaqə — Chef İlhamə',
    description: 'Chef İlhamə ilə əlaqə saxlayın. WhatsApp, telefon və ya email.',
    url: `${BASE_URL}/elaqe`,
    mainEntity: { '@id': `${BASE_URL}/#business` },
    isPartOf: { '@id': `${BASE_URL}/#website` },
  };
}

// ─── Service schema ──────────────────────────────────────────────────────────

export function getServicePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Xidmətlər — Chef İlhamə',
    description:
      'Bakı, Sumqayıt və Abşeronda şəxsi aşpaz, katerinq, toy masası planlaması, korporativ tədbir servisi.',
    url: `${BASE_URL}/xidmetler`,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Service',
            name: 'Şəxsi Aşpaz Xidməti',
            description: 'Evdə və ya xüsusi məkanda private dining və butik servis.',
            provider: { '@id': `${BASE_URL}/#business` },
            areaServed: [
              { '@type': 'City', name: 'Bakı' },
              { '@type': 'City', name: 'Sumqayıt' },
              { '@type': 'AdministrativeArea', name: 'Abşeron' },
            ],
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'Service',
            name: 'Premium Katerinq',
            description: 'Brend tədbiri, təqdimat və qapalı məclislər üçün catering.',
            provider: { '@id': `${BASE_URL}/#business` },
            areaServed: [
              { '@type': 'City', name: 'Bakı' },
              { '@type': 'City', name: 'Sumqayıt' },
              { '@type': 'AdministrativeArea', name: 'Abşeron' },
            ],
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'Service',
            name: 'Toy Masası Planlaması',
            description: 'Klassik Azərbaycan süfrəsini daha zərif axınla qururuq.',
            provider: { '@id': `${BASE_URL}/#business` },
            areaServed: [
              { '@type': 'City', name: 'Bakı' },
              { '@type': 'City', name: 'Sumqayıt' },
              { '@type': 'AdministrativeArea', name: 'Abşeron' },
            ],
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'Service',
            name: 'Korporativ Tədbirlər',
            description: 'İşgüzar gathering və lounge servis üçün yığcam menyular.',
            provider: { '@id': `${BASE_URL}/#business` },
          },
        },
        {
          '@type': 'ListItem',
          position: 5,
          item: {
            '@type': 'Service',
            name: 'Nişan və Ailə Şənlikləri',
            description: 'Ev atmosferi ilə peşəkar servis intizamını birləşdirir.',
            provider: { '@id': `${BASE_URL}/#business` },
          },
        },
        {
          '@type': 'ListItem',
          position: 6,
          item: {
            '@type': 'Service',
            name: 'Master-klass və Workshop',
            description: 'Brend tədbirləri və qapalı öyrənmə sessiyaları üçün format.',
            provider: { '@id': `${BASE_URL}/#business` },
          },
        },
      ],
    },
  };
}

// ─── FAQPage schema ──────────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
}

export function getFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ─── JSON-LD renderer helper ─────────────────────────────────────────────────

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]): string {
  return JSON.stringify(data);
}
