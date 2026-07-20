import { siteConfig, getWhatsAppHref } from './site';
import type { Recipe } from '@/types/recipe';
import { getLocalizedRecipePath, SEO_LOCALE_CONFIG } from '@/lib/seoLocales';
import { normalizeSiteLocale, SITE_LOCALES } from '@/lib/localeRoutes';
import { getRecipeImageObjects } from '@/lib/recipeImageVariants';

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
  const totalDuration = parseIsoDuration(recipe.prepTime);
  const recipeUrl = `${BASE_URL}${getLocalizedRecipePath(normalizedLocale, recipe.slug)}`;
  const imageCaption = recipe.imageAlt || `${recipe.name} — ${recipe.origin}`;
  const recipeImages = getRecipeImageObjects(recipe.slug, imageCaption).map((image) => ({
    ...image,
    ...(recipe.imageCredit ? { creditText: recipe.imageCredit } : {}),
    ...(recipe.imageLicenseUrl ? { license: recipe.imageLicenseUrl } : {}),
    ...(recipe.imageSourceUrl ? { acquireLicensePage: recipe.imageSourceUrl } : {}),
  }));
  const recipeIngredients = recipe.ingredients
    .map((ingredient) => ingredient.replace(/\s+/g, ' ').trim())
    .filter((ingredient) => ingredient.length >= 2);
  const recipeInstructions = recipe.instructions
    .map((instruction) => instruction.replace(/\s+/g, ' ').trim())
    .filter((instruction) => instruction.length >= 2);

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    image: recipeImages,
    author: { '@id': `${BASE_URL}/#person` },
    datePublished: recipe.createdAt,
    dateModified: recipe.updatedAt || recipe.createdAt,
    description: recipe.history?.trim() || localeConfig.recipeDescription(recipe.name, recipe.origin),
    recipeCuisine: recipe.cuisine || recipe.origin,
    recipeCategory: recipe.category,
    keywords: [recipe.name, recipe.origin, recipe.category, ...(recipe.tags ?? [])].filter(Boolean),
    recipeYield: recipe.servings,
    totalTime: totalDuration,
    recipeIngredient: recipeIngredients,
    recipeInstructions: recipeInstructions.map((instruction, index) => ({
      '@type': 'HowToStep',
      name: `${localeConfig.stepLabel} ${index + 1}`,
      text: instruction,
      position: index + 1,
      url: `${recipeUrl}#step-${index + 1}`,
      image: recipeImages[1],
    })),
    url: recipeUrl,
    mainEntityOfPage: recipeUrl,
    ...(recipe.sources?.length ? { citation: recipe.sources.map((source) => source.url) } : {}),
    inLanguage: normalizedLocale,
    isPartOf: { '@id': `${BASE_URL}/#website` },
  };
}

// ─── CollectionPage / ItemList schema ────────────────────────────────────────

export function getRecipeCollectionSchema(
  recipes: Recipe[],
  title: string,
  description: string,
  url: string,
  locale?: 'az' | 'en',
) {
  const firstPathSegment = url.split('/').filter(Boolean)[0];
  const collectionLocale = locale ?? (firstPathSegment === 'az' || !firstPathSegment
    ? 'az'
    : firstPathSegment === 'en'
      ? 'en'
      : 'en');

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
        url: `${BASE_URL}${getLocalizedRecipePath(collectionLocale, recipe.slug)}`,
        name: recipe.name,
        image: getRecipeImageObjects(recipe.slug, recipe.imageAlt || recipe.name)[2].url,
      })),
    },
  };
}

export function getEditorialGuideSchema({
  title,
  description,
  url,
  image,
  locale,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  locale: 'az' | 'en';
  datePublished: string;
  dateModified: string;
}) {
  const absoluteUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const absoluteImage = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: absoluteUrl,
    mainEntityOfPage: absoluteUrl,
    image: {
      '@type': 'ImageObject',
      url: absoluteImage,
      width: 1200,
      height: 630,
    },
    datePublished,
    dateModified,
    inLanguage: locale === 'az' ? 'az-AZ' : 'en-US',
    author: { '@id': `${BASE_URL}/#person` },
    publisher: { '@id': `${BASE_URL}/#organization` },
    isPartOf: { '@id': `${BASE_URL}/#website` },
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
