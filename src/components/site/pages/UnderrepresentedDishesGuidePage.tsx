'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Check,
  Compass,
  MapPin,
  Search,
  Share2,
  Sparkles,
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { EditorialPanel, SectionHeading, SectionLabel } from '@/components/site/marketing';
import { trackEvent } from '@/lib/analytics';
import {
  getGuidePath,
  getGuideRegionForRecipe,
  guideRegions,
  type GuideLocale,
} from '@/lib/underrepresentedDishesGuide';
import { getLocalizedRecipePath } from '@/lib/localeRoutes';
import type { Recipe } from '@/types/recipe';
import { getValidImageUrl } from '@/utils/imageUtils';

interface UnderrepresentedDishesGuidePageProps {
  locale: GuideLocale;
  recipes: Recipe[];
  breadcrumbs: import('@/lib/seo').BreadcrumbItem[];
}

export default function UnderrepresentedDishesGuidePage({
  locale,
  recipes,
  breadcrumbs,
}: UnderrepresentedDishesGuidePageProps) {
  const isAz = locale === 'az';
  const [activeRegion, setActiveRegion] = useState('all');
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const countries = new Set(recipes.map((recipe) => recipe.origin)).size;
  const heroRecipes = recipes.slice(0, 4);

  const visibleRecipes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return recipes.filter((recipe) => {
      const region = getGuideRegionForRecipe(recipe.slug);
      const matchesRegion = activeRegion === 'all' || region?.key === activeRegion;
      const matchesQuery = !normalizedQuery || [
        recipe.name,
        recipe.origin,
        recipe.region,
        recipe.category,
        recipe.history,
        ...recipe.ingredients,
      ].some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesRegion && matchesQuery;
    });
  }, [activeRegion, query, recipes]);

  const handleRegionChange = (key: string) => {
    setActiveRegion(key);
    trackEvent('guide_region_filter', { region: key, locale });
  };

  const handleShare = async () => {
    const title = isAz
      ? 'Kəşf etməyə dəyər 50 nadir regional yemək'
      : '50 underrepresented regional dishes worth discovering';
    const url = `${window.location.origin}${getGuidePath(locale)}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        trackEvent('guide_share', { method: 'native', locale });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
    trackEvent('guide_share', { method: 'copy', locale });
  };

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <article className="space-y-14 lg:space-y-20">
        <section className="px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.8rem] bg-[rgba(31,25,22,0.99)] text-white shadow-[0_38px_120px_rgba(31,25,22,0.3)] sm:rounded-[3rem]">
            <div className="pointer-events-none absolute -left-10 -top-24 select-none font-serif text-[18rem] leading-none text-white/[0.035] sm:text-[28rem]">50</div>
            <div className="relative grid min-h-[680px] lg:grid-cols-[1.02fr_0.98fr]">
              <div className="flex flex-col justify-between p-7 sm:p-11 lg:p-16">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/66">
                    <Compass className="h-3.5 w-3.5" /> {isAz ? 'Qlobal dad sahə bələdçisi' : 'A global flavour field guide'}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(227,173,100,0.9)]">2026 edition</span>
                </div>

                <div className="my-12 max-w-3xl">
                  <div className="display-title text-[clamp(6.5rem,17vw,13rem)] leading-[0.58] text-[rgba(227,173,100,0.96)]">50</div>
                  <h1 className="display-title mt-8 text-[clamp(3.2rem,7.2vw,7.2rem)] leading-[0.82] tracking-[-0.03em] text-white">
                    {isAz ? 'Görünməyən mətbəxlərin dad atlası.' : 'A taste atlas of overlooked kitchens.'}
                  </h1>
                  <p className="mt-8 max-w-2xl text-base leading-8 text-white/66 sm:text-lg sm:leading-9">
                    {isAz
                      ? 'Eyni məşhur on yeməyi təkrarlamayan, 39 ölkə və 6 böyük mətbəx marşrutunu birləşdirən bişirilə bilən regional resept bələdçisi.'
                      : 'A cookable guide spanning 39 countries and six culinary routes—without repeating the same ten famous dishes found everywhere else.'}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-6 sm:gap-5">
                  {[
                    { value: recipes.length, label: isAz ? 'resept' : 'recipes' },
                    { value: countries, label: isAz ? 'ölkə' : 'countries' },
                    { value: guideRegions.length, label: isAz ? 'marşrut' : 'routes' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="display-title text-3xl text-white sm:text-5xl">{item.value}</div>
                      <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/42 sm:text-xs">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid min-h-[480px] grid-cols-2 gap-px bg-white/10 p-px lg:min-h-full">
                {heroRecipes.map((recipe, index) => (
                  <Link
                    key={recipe.slug}
                    href={getLocalizedRecipePath(locale, recipe.slug)}
                    className={`group relative min-h-[240px] overflow-hidden ${index === 0 ? 'col-span-2 sm:col-span-1' : ''}`}
                    onClick={() => trackEvent('guide_recipe_open', { slug: recipe.slug, position: index + 1, locale })}
                  >
                    <Image
                      src={getValidImageUrl(recipe.image)}
                      alt={recipe.imageAlt || recipe.name}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.05] group-hover:saturate-[1.12]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/5 to-transparent" />
                    <div className="absolute inset-x-5 bottom-5">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/58">{recipe.origin}</div>
                      <div className="display-title mt-1 text-3xl leading-none text-white">{recipe.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionLabel>{isAz ? 'Seçim metodumuz' : 'How the list was built'}</SectionLabel>
              <h2 className="display-title mt-5 text-5xl leading-[0.92] text-foreground sm:text-6xl">
                {isAz ? 'Populyarlıq siyahısı deyil. Faydalı kəşf xəritəsidir.' : 'Not a popularity chart. A useful discovery map.'}
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  n: '01',
                  title: isAz ? 'Bölgəvi kimlik' : 'Regional identity',
                  text: isAz ? 'Yemək konkret məkan, icma və ya mərasimlə bağlı olmalıdır.' : 'The dish must belong to a specific place, community or ritual.',
                },
                {
                  n: '02',
                  title: isAz ? 'Bişirilə bilən format' : 'Cookable format',
                  text: isAz ? 'İnqrediyent, ölçü və addımlar real mətbəxdə tətbiq edilə bilməlidir.' : 'Ingredients, measures and steps must work in a real home kitchen.',
                },
                {
                  n: '03',
                  title: isAz ? 'Mənbə izi' : 'A source trail',
                  text: isAz ? 'Hər resept şəkil lisenziyası və əlavə oxu mənbələri ilə açıq iz buraxır.' : 'Every recipe keeps an open trail through image licensing and further-reading sources.',
                },
                {
                  n: '04',
                  title: isAz ? 'Az təkrarlanan mövzu' : 'Less-repeated subject',
                  text: isAz ? 'Məşhur klassiklərin növbəti surəti yox, internetdə keyfiyyətli izahı az olan yemək.' : 'Not another copy of a global classic, but a dish with a thinner high-quality web footprint.',
                },
              ].map((item) => (
                <div key={item.n} className="rounded-[1.6rem] border border-[rgba(98,67,45,0.1)] bg-white/66 p-6 shadow-[0_18px_55px_rgba(52,34,22,0.05)]">
                  <div className="text-xs font-bold tracking-[0.24em] text-[rgba(141,58,36,0.82)]">{item.n}</div>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[rgba(57,44,35,0.7)] sm:text-base">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="atlas" className="scroll-mt-24 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <SectionHeading
              eyebrow={<SectionLabel>{isAz ? '50 yemək atlası' : 'The 50-dish atlas'}</SectionLabel>}
              title={<>{isAz ? 'Bir dadla başla, qitələrlə davam et.' : 'Start with one flavour. Keep crossing borders.'}</>}
              description={isAz
                ? 'Ad, ölkə, bölgə, kateqoriya və hətta inqrediyentlə axtarın; sonra marşrutu daraldın.'
                : 'Search by dish, country, region, category or even an ingredient, then narrow the route.'}
            />

            <div className="sticky top-20 z-20 rounded-[1.5rem] border border-white/70 bg-[rgba(247,239,226,0.88)] p-3 shadow-[0_18px_55px_rgba(52,34,22,0.1)] backdrop-blur-xl sm:p-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgba(112,83,59,0.58)]" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={isAz ? 'Yemək, ölkə və ya inqrediyent axtar…' : 'Search a dish, country or ingredient…'}
                  aria-label={isAz ? 'Bələdçidə axtar' : 'Search within the guide'}
                  className="h-12 rounded-full border-[rgba(98,67,45,0.12)] bg-white/84 pl-11 shadow-none"
                />
              </div>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <button
                  type="button"
                  onClick={() => handleRegionChange('all')}
                  aria-pressed={activeRegion === 'all'}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${activeRegion === 'all' ? 'bg-[rgba(36,28,24,0.96)] text-white' : 'bg-white/76 text-[rgba(57,44,35,0.72)] hover:bg-white'}`}
                >
                  {isAz ? `Hamısı · ${recipes.length}` : `All · ${recipes.length}`}
                </button>
                {guideRegions.map((region) => (
                  <button
                    key={region.key}
                    type="button"
                    onClick={() => handleRegionChange(region.key)}
                    aria-pressed={activeRegion === region.key}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${activeRegion === region.key ? 'bg-[rgba(141,58,36,0.96)] text-white' : 'bg-white/76 text-[rgba(57,44,35,0.72)] hover:bg-white'}`}
                  >
                    {region.label[locale]} · {region.recipeSlugs.length}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="display-title text-5xl text-foreground">{visibleRecipes.length}</div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(112,83,59,0.62)]">{isAz ? 'görünən yemək' : 'dishes in view'}</div>
              </div>
              {activeRegion !== 'all' ? (
                <p className="hidden max-w-xl text-right text-sm leading-6 text-[rgba(57,44,35,0.62)] sm:block">
                  {guideRegions.find((region) => region.key === activeRegion)?.note[locale]}
                </p>
              ) : null}
            </div>

            {visibleRecipes.length ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visibleRecipes.map((recipe) => {
                  const originalPosition = recipes.findIndex((candidate) => candidate.slug === recipe.slug) + 1;
                  const region = getGuideRegionForRecipe(recipe.slug);
                  return (
                    <Link
                      key={recipe.slug}
                      href={getLocalizedRecipePath(locale, recipe.slug)}
                      className="group block"
                      onClick={() => trackEvent('guide_recipe_open', { slug: recipe.slug, position: originalPosition, region: region?.key, locale })}
                    >
                      <Card className="h-full overflow-hidden border-white/60 bg-white/78 shadow-[0_22px_62px_rgba(52,34,22,0.07)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_30px_78px_rgba(52,34,22,0.15)]">
                        <div className="relative min-h-[270px] overflow-hidden">
                          <Image
                            src={getValidImageUrl(recipe.image)}
                            alt={recipe.imageAlt || `${recipe.name} — ${recipe.origin}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover transition duration-700 group-hover:scale-[1.045]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/5 to-black/10" />
                          <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/24 bg-black/18 font-serif text-xl text-white backdrop-blur-sm">
                            {String(originalPosition).padStart(2, '0')}
                          </div>
                          <div className="absolute inset-x-5 bottom-5 text-white">
                            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/62"><MapPin className="h-3.5 w-3.5" />{recipe.origin}</div>
                            <h2 className="display-title mt-2 text-4xl leading-[0.92]">{recipe.name}</h2>
                          </div>
                        </div>
                        <CardContent className="flex min-h-[210px] flex-col justify-between p-6">
                          <div>
                            <div className="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[rgba(112,83,59,0.68)]">
                              <span>{recipe.category}</span><span>·</span><span>{recipe.region}</span>
                            </div>
                            <p className="mt-4 line-clamp-3 text-sm leading-7 text-[rgba(57,44,35,0.7)]">{recipe.history}</p>
                          </div>
                          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[rgba(141,58,36,0.96)]">
                            {isAz ? 'Resepti aç' : 'Open recipe'} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <EditorialPanel className="flex min-h-[260px] flex-col items-center justify-center p-8 text-center">
                <BookOpen className="h-8 w-8 text-[rgba(141,58,36,0.72)]" />
                <h2 className="display-title mt-4 text-4xl">{isAz ? 'Bu axtarışda yemək tapılmadı.' : 'No dish matches this search.'}</h2>
                <button type="button" onClick={() => { setQuery(''); setActiveRegion('all'); }} className="mt-4 text-sm font-semibold text-[rgba(141,58,36,0.96)] underline underline-offset-4">
                  {isAz ? 'Atlası sıfırla' : 'Reset the atlas'}
                </button>
              </EditorialPanel>
            )}
          </div>
        </section>

        <section className="px-4 pb-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <EditorialPanel className="mesh-surface overflow-hidden p-7 sm:p-10 lg:p-14">
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(201,150,69,0.18)] text-[rgba(141,58,36,0.96)]"><Sparkles className="h-5 w-5" /></div>
                  <h2 className="display-title mt-6 max-w-3xl text-5xl leading-[0.92] text-foreground sm:text-6xl">
                    {isAz ? 'Bir dostunun heç eşitmədiyi yeməyi ona göndər.' : 'Send someone a dish they have never heard of.'}
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-[rgba(57,44,35,0.7)]">
                    {isAz ? 'Bu səhifə canlı bələdçidir: yeni reseptlər test və mənbə yoxlamasından keçdikcə kolleksiya dərinləşəcək.' : 'This is a living field guide: the collection will deepen as new recipes pass recipe and source review.'}
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:items-end">
                  <Button onClick={handleShare} className="h-12 rounded-full bg-[rgba(141,58,36,0.96)] px-6 text-white hover:bg-[rgba(141,58,36,0.9)]">
                    {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                    {copied ? (isAz ? 'Link kopyalandı' : 'Link copied') : (isAz ? 'Bələdçini paylaş' : 'Share the guide')}
                  </Button>
                  <Link href={locale === 'az' ? '/kolleksiyalar' : '/en/collections'} className="inline-flex items-center gap-2 px-4 text-sm font-semibold text-[rgba(141,58,36,0.96)]">
                    {isAz ? 'Dad kolleksiyalarına keç' : 'Explore taste collections'} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </EditorialPanel>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
