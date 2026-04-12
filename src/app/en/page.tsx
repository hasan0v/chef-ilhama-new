import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import { siteConfig, getWhatsAppHref } from '@/lib/site';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { ChefHat, MapPin, Clock3, Users } from 'lucide-react';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Chef İlhamə — Azerbaijani Recipes, Private Chef & Catering in Baku',
  description:
    'Discover authentic Azerbaijani cuisine with Chef İlhamə. Traditional recipes from 25+ regions, private chef services, and premium catering in Baku, Sumqayıt & Abşeron.',
  keywords: 'Azerbaijani recipes, Azerbaijan food, Baku chef, private chef Baku, catering Azerbaijan, traditional Azerbaijani dishes, Azerbaijani cuisine',
  openGraph: {
    title: 'Chef İlhamə — Azerbaijani Recipes & Private Chef',
    description: 'Authentic Azerbaijani cuisine. Traditional recipes from 25+ regions, private chef & catering in Baku.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'az_AZ',
    url: `${siteConfig.url}/en`,
    siteName: 'Chef İlhamə',
    images: [{ url: `${siteConfig.url}/ilhama.png`, width: 1200, height: 630, alt: 'Chef İlhamə — Azerbaijani cuisine' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef İlhamə — Azerbaijani Recipes',
    description: 'Authentic Azerbaijani cuisine from 25+ regions. Private chef & catering in Baku.',
    images: [`${siteConfig.url}/ilhama.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/en`,
    languages: {
      'az': siteConfig.url,
      'en': `${siteConfig.url}/en`,
    },
  },
};

export default async function EnglishHomePage() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes(),
    getRecipes(),
    getCategories(),
    getRecipeStats(),
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    'Chef İlhamə — Traditional Azerbaijani Recipes',
    'Discover authentic Azerbaijani cuisine with traditional recipes from 25+ regions.',
    '/en'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/en' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageLayout>
        <div className="space-y-16 lg:space-y-20">
          {/* Hero */}
          <section className="px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
            <div className="mx-auto max-w-7xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(141,58,36,0.72)]">
                Authentic Azerbaijani Cuisine
              </p>
              <h1 className="display-title mx-auto mt-6 max-w-4xl text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.92] text-foreground">
                Traditional recipes, curated by Chef İlhamə
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[rgba(57,44,35,0.72)] sm:text-lg">
                Explore {stats.totalRecipes}+ authentic Azerbaijani recipes from {stats.totalRegions} regions.
                From hearty plovs to delicate sweets — each recipe preserves regional character
                while making preparation approachable.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild className="rounded-full bg-[rgba(141,58,36,0.96)] px-6 text-white hover:bg-[rgba(141,58,36,0.9)]">
                  <Link href="/reseptler">Browse Recipes</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-6 hover:bg-white">
                  <Link href="/en/services">Services</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* What is Azerbaijani Cuisine */}
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="display-title text-3xl leading-tight text-foreground sm:text-4xl">
                What is Azerbaijani Cuisine?
              </h2>
              <div className="mt-6 space-y-4 text-base leading-8 text-[rgba(57,44,35,0.76)]">
                <p>
                  Azerbaijani cuisine is one of the most diverse and flavorful in the Caucasus and
                  Middle Eastern culinary traditions. Rooted in centuries of regional farming,
                  pastoral culture, and Silk Road influences, it features dishes like plov (pilaf),
                  dolma, kebabs, ash (thick soups), and an extraordinary range of pastries and sweets.
                </p>
                <p>
                  Each of Azerbaijan&apos;s 25+ regions contributes its own unique ingredients, techniques,
                  and flavour profiles — from the saffron-scented pilafs of Şəki to the herb-rich stews
                  of Lənkəran and the smoky kebabs of Qarabağ.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Recipes */}
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="display-title text-3xl text-foreground sm:text-4xl">Featured Recipes</h2>
              <p className="mt-3 max-w-2xl text-base text-[rgba(57,44,35,0.72)]">
                Hand-picked traditional dishes from across Azerbaijan.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {featuredRecipes.slice(0, 6).map((recipe) => (
                  <Link
                    key={recipe.slug}
                    href={`/resept/${recipe.slug}`}
                    className="group rounded-[1.5rem] border border-white/60 bg-white/78 p-5 shadow-[0_20px_56px_rgba(52,34,22,0.08)] backdrop-blur-sm transition-shadow hover:shadow-[0_24px_64px_rgba(52,34,22,0.14)]"
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(141,58,36,0.72)]">
                      <MapPin className="h-3.5 w-3.5" />
                      {recipe.origin}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-foreground group-hover:text-[rgba(141,58,36,0.96)]">
                      {recipe.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-7 text-[rgba(57,44,35,0.68)]">
                      {recipe.history || `Traditional ${recipe.origin} dish — ${recipe.category}`}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-[rgba(57,44,35,0.56)]">
                      <span className="flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{recipe.prepTime}</span>
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{recipe.servings}</span>
                      <span>{recipe.difficulty}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-6 hover:bg-white">
                  <Link href="/reseptler">View All {stats.totalRecipes} Recipes</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* About Chef */}
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/60 bg-white/78 p-8 shadow-[0_24px_64px_rgba(52,34,22,0.08)] backdrop-blur-sm sm:p-10">
              <h2 className="display-title text-3xl text-foreground sm:text-4xl">About Chef İlhamə</h2>
              <p className="mt-4 text-base leading-8 text-[rgba(57,44,35,0.76)]">
                Chef İlhamə is a professional Azerbaijani chef with over 15 years of culinary experience.
                Specializing in regional Azerbaijani cuisine, she combines deep respect for traditional
                recipes with a refined, modern presentation style. Her work spans private dining, premium
                catering, wedding feast planning, and culinary workshops.
              </p>
              <p className="mt-4 text-base leading-8 text-[rgba(57,44,35,0.76)]">
                Based in Baku, she serves clients across Baku, Sumqayıt, and the Abşeron region —
                from intimate 10-person dinners to grand 300+ guest wedding celebrations.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button asChild className="rounded-full bg-[rgba(141,58,36,0.96)] px-6 text-white hover:bg-[rgba(141,58,36,0.9)]">
                  <Link href="/en/about">Read Full Story</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-6 hover:bg-white">
                  <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">Contact via WhatsApp</a>
                </Button>
              </div>
            </div>
          </section>

          {/* Services summary */}
          <section className="px-4 pb-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="display-title text-3xl text-foreground sm:text-4xl">Culinary Services</h2>
              <p className="mt-3 max-w-2xl text-base text-[rgba(57,44,35,0.72)]">
                Professional private chef and catering services in Baku, Azerbaijan.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: 'Private Chef', desc: 'In-home or venue-based private dining with curated Azerbaijani menus.' },
                  { title: 'Premium Catering', desc: 'Full-service catering for brand events, presentations, and private gatherings.' },
                  { title: 'Wedding Planning', desc: 'Traditional Azerbaijani wedding feast (toy) with modern, refined presentation.' },
                  { title: 'Corporate Events', desc: 'Business gatherings and lounge service with compact curated menus.' },
                  { title: 'Family Celebrations', desc: 'Engagement parties and family gatherings with professional home-style service.' },
                  { title: 'Masterclass', desc: 'Culinary workshops and hands-on cooking sessions.' },
                ].map((service) => (
                  <div
                    key={service.title}
                    className="rounded-[1.5rem] border border-white/60 bg-white/78 p-6 shadow-[0_20px_56px_rgba(52,34,22,0.08)] backdrop-blur-sm"
                  >
                    <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[rgba(57,44,35,0.68)]">{service.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button asChild className="rounded-full bg-[rgba(141,58,36,0.96)] px-6 text-white hover:bg-[rgba(141,58,36,0.9)]">
                  <Link href="/en/services">View All Services</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
