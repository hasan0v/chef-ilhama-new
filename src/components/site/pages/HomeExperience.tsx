'use client';

import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  BookOpenText,
  ChefHat,
  Clock3,
  MapPin,
  Search,
  Star,
  Users,
  Utensils,
  ChevronDown,
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  CtaBand,
  EditorialPanel,
  SectionHeading,
  SectionLabel,
} from '@/components/site/marketing';
import { getWhatsAppHref } from '@/lib/site';
import {
  getLocalizedAboutPath,
  getLocalizedRecipePath,
  getLocalizedRecipesPath,
  getLocalizedServicesPath,
} from '@/lib/localeRoutes';
import { getCollectionsPath } from '@/lib/recipeCollections';
import type { Recipe } from '@/types/recipe';
import { getValidImageUrl } from '@/utils/imageUtils';
import { getCategoryStats } from '@/utils/categoryUtils';
import { useTranslation } from '@/hooks/useTranslation';
import { trackEvent } from '@/lib/analytics';

interface HomeExperienceProps {
  featuredRecipes: Recipe[];
  allRecipes: Recipe[];
  categories: string[];
  stats: {
    totalRecipes: number;
    totalCategories: number;
    totalRegions: number;
    featuredRecipes: number;
    difficultyBreakdown: {
      easy: number;
      medium: number;
      hard: number;
    };
  };
}

const HOME_NAVBAR_SCROLL_THRESHOLD = 80;
const HOME_HERO_TRANSFORM_END = 420;

function subscribeToMobileViewport(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia('(max-width: 639px)');
  mediaQuery.addEventListener('change', onStoreChange);
  return () => mediaQuery.removeEventListener('change', onStoreChange);
}

function getMobileViewportSnapshot() {
  return window.matchMedia('(max-width: 639px)').matches;
}

export default function HomeExperience({ featuredRecipes, allRecipes, stats }: HomeExperienceProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState(false);
  const [shouldLoadHeroVideo, setShouldLoadHeroVideo] = useState(false);
  const isMobile = useSyncExternalStore(subscribeToMobileViewport, getMobileViewportSnapshot, () => false);
  const { t, locale } = useTranslation();
  
  const getRecipeUrl = (slug: string) => getLocalizedRecipePath(locale, slug);
  const getRecipesUrl = () => getLocalizedRecipesPath(locale);
  
  const highlightedRecipes = featuredRecipes.slice(0, 6);

  useEffect(() => {
    let frameId: number | null = null;
    const handleScroll = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        // Only the first 420px affects the hero. Quantizing avoids rerendering
        // the full homepage on every single mobile scroll event.
        const next = Math.round(Math.min(window.scrollY, HOME_HERO_TRANSFORM_END) / 12) * 12;
        setScrollY((current) => current === next ? current : next);
        frameId = null;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const connection = navigator as Navigator & { connection?: { saveData?: boolean } };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || connection.connection?.saveData) return;

    const loadVideo = () => setShouldLoadHeroVideo(true);
    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(loadVideo, { timeout: 1800 });
      return () => window.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(loadVideo, 700);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const categoryStats = useMemo(() => getCategoryStats(allRecipes), [allRecipes]);

  const searchResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return [];
    return allRecipes
      .filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.origin.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      )
      .slice(0, 5);
  }, [allRecipes, searchTerm]);

  const latestRecipes = useMemo(() => {
    return allRecipes.slice(0, 4);
  }, [allRecipes]);

  // Keep the video truly full-bleed for as long as the home navbar is hidden.
  // Starting both transitions at the same threshold prevents the page
  // background from appearing as a thin gold strip above the hero.
  const progress = Math.max(
    0,
    Math.min(
      (scrollY - HOME_NAVBAR_SCROLL_THRESHOLD)
        / (HOME_HERO_TRANSFORM_END - HOME_NAVBAR_SCROLL_THRESHOLD),
      1,
    ),
  );

  // Calculate dynamic dimensions based on screen size
  const heroStyle = {
    width: progress > 0 
      ? `calc(100% - ${progress * (isMobile ? 1 : 3)}rem)` 
      : '100%',
    maxWidth: progress > 0 
      ? `${1280 + (1 - progress) * 600}px` 
      : '100%',
    height: progress > 0 
      ? `calc(100dvh - ${progress * (isMobile ? 35 : 25)}dvh)` 
      : '100dvh',
    minHeight: isMobile ? '460px' : '520px',
    borderRadius: progress > 0 
      ? `${progress * (isMobile ? 1.25 : 2.5)}rem` 
      : '0px',
    marginTop: progress > 0 
      ? `${progress * (isMobile ? 1 : 2.5)}rem` 
      : '0px',
    transition: 'width 0.2s cubic-bezier(0.16, 1, 0.3, 1), max-width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.2s cubic-bezier(0.16, 1, 0.3, 1), margin-top 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  return (
    <PageLayout>
      <div className="space-y-10 sm:space-y-14 lg:space-y-16">

        {/* ── Hero: Dynamic scroll background video ── */}
        <section className="relative w-full flex justify-center z-10">
          <div 
            style={heroStyle}
            className="relative overflow-hidden bg-black shadow-[0_24px_70px_rgba(32,22,14,0.18)] flex items-center justify-center px-6 py-12 sm:px-12 lg:px-16"
          >
            {/* Poster remains visible when mobile autoplay or decoding is unavailable. */}
            <Image
              src="/video/bg-video-poster.webp"
              alt=""
              fill
              priority
              aria-hidden="true"
              className="pointer-events-none select-none object-cover"
              sizes="100vw"
            />

            {/* Background Video */}
            {shouldLoadHeroVideo ? <video
              key={isMobile ? 'mobile-hero-video' : 'desktop-hero-video'}
              src={isMobile ? '/video/bg-video-mobile.mp4' : '/video/bg-video.mp4'}
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              poster="/video/bg-video-poster.webp"
              aria-hidden="true"
              disablePictureInPicture
              onLoadStart={() => setIsHeroVideoPlaying(false)}
              onPlaying={() => setIsHeroVideoPlaying(true)}
              onError={() => setIsHeroVideoPlaying(false)}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 select-none pointer-events-none ${
                isHeroVideoPlaying ? 'opacity-85' : 'opacity-0'
              }`}
            /> : null}

            {/* Dark cinematic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />

            {/* Content overlay */}
            <div className="relative z-10 mx-auto max-w-3xl space-y-5 sm:space-y-6 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                {t.home.subtitle}
              </span>
              
              <h1 className="display-title text-[clamp(2rem,6vw,5rem)] font-extrabold leading-[0.94] text-white whitespace-pre-line tracking-[-0.04em] drop-shadow-md px-2">
                {t.home.title}
              </h1>
              
              <p className="mx-auto max-w-xl text-xs sm:text-base leading-6 sm:leading-8 text-white/80 drop-shadow-sm px-4">
                {t.home.description}
              </p>

              {/* Premium Glassmorphic Search bar */}
              <div className="relative mx-auto max-w-lg px-4 sm:px-0">
                <Search className="pointer-events-none absolute left-8 sm:left-4.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t.home.searchPlaceholder}
                  aria-label={t.home.searchPlaceholder}
                  className="h-11 sm:h-12 rounded-full border-white/20 bg-white/12 text-white placeholder:text-white/55 pl-11 pr-4 shadow-inner backdrop-blur-md transition-all duration-300 focus:border-white/40 focus:bg-white/18 focus:ring-0 text-sm"
                />
                {searchResults.length > 0 && (
                  <div className="absolute left-4 right-4 sm:left-0 sm:right-0 top-full z-20 mt-2.5 overflow-hidden rounded-2xl border border-white/10 bg-black/90 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                    {searchResults.map((recipe) => (
                      <Link
                        key={recipe.id}
                        href={getRecipeUrl(recipe.slug)}
                        className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/10"
                        onClick={() => setSearchTerm('')}
                      >
                        <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                          <Image src={getValidImageUrl(recipe.image)} alt={recipe.name} fill className="object-cover" sizes="40px" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-semibold text-white text-left">{recipe.name}</div>
                          <div className="text-xs text-white/60 text-left">{recipe.category} · {recipe.origin}</div>
                        </div>
                      </Link>
                    ))}
                    <Link
                      href={getRecipesUrl()}
                      className="block border-t border-white/10 px-4 py-3 text-center text-sm font-semibold text-[rgba(255,220,181,0.92)] transition-colors hover:bg-white/5"
                      onClick={() => setSearchTerm('')}
                    >
                      {t.home.viewAllRecipes}
                    </Link>
                  </div>
                )}
              </div>

              {/* Glassmorphic Stats */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-1 sm:pt-2 text-xs sm:text-sm text-white/70 px-2">
                <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/5 px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm text-[11px] sm:text-xs">
                  <BookOpenText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[rgba(255,220,181,0.92)]" />
                  {stats.totalRecipes}+ {t.home.recipesStat}
                </span>
                <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/5 px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm text-[11px] sm:text-xs">
                  <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[rgba(255,220,181,0.92)]" />
                  {stats.totalRegions} {t.home.regionsStat}
                </span>
                <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-white/5 px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm text-[11px] sm:text-xs">
                  <Utensils className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[rgba(255,220,181,0.92)]" />
                  {stats.totalCategories} {t.home.categoriesStat}
                </span>
              </div>
            </div>

            {/* Scroll Down bounces when at top */}
            {scrollY < 40 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/50 select-none animate-bounce">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em]">
                  {locale === 'az' ? 'Aşağı sürüşdürün' : locale === 'tr' ? 'Aşağı kaydırın' : locale === 'ru' ? 'Прокрутите вниз' : 'Scroll Down'}
                </span>
                <ChevronDown className="h-3.5 w-3.5" />
              </div>
            )}
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <EditorialPanel className="overflow-hidden border-[rgba(141,58,36,0.14)] bg-[linear-gradient(112deg,rgba(255,251,246,0.98),rgba(246,231,207,0.84))] p-5 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4 text-left">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[rgba(141,58,36,0.12)] text-[rgba(141,58,36,0.96)]"><ChefHat className="h-6 w-6" /></div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(141,58,36,0.82)]">Chef İlhamə</p>
                    <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-foreground sm:text-2xl">{t.nav.services}</h2>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-[rgba(57,44,35,0.72)]">{locale === 'az' ? 'Tədbir tarixini və qonaq sayını seçin — menyu, hazırlıq və servis planı birbaşa Chef İlhamə ilə qurulsun.' : 'Share your event date and guest count, then plan the menu and service directly with Chef İlhamə.'}</p>
                  </div>
                </div>
                <Button asChild className="shrink-0 rounded-full bg-[rgba(141,58,36,0.96)] px-5 text-white hover:bg-[rgba(141,58,36,0.9)]">
                  <Link href={locale === 'az' ? '/aspaz-xidmeti-baki' : getLocalizedServicesPath(locale)} onClick={() => trackEvent('home_service_cta_opened', { locale })}>
                    {locale === 'az' ? 'Sifarişi planla' : t.nav.services}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </EditorialPanel>
          </div>
        </section>

        {/* ── Category chips ── */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[rgba(112,83,59,0.72)]">{t.home.categoriesHeading}</h2>
              <Link href={getRecipesUrl()} className="text-sm font-medium text-[rgba(141,58,36,0.96)] hover:underline">
                {t.home.categoriesAll}
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {categoryStats.slice(0, 10).map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => router.push(`${getRecipesUrl()}?category=${encodeURIComponent(cat.name)}`)}
                  className="rounded-full border border-[rgba(98,67,45,0.1)] bg-white/80 px-4 py-2 text-sm font-medium text-[rgba(57,44,35,0.82)] transition-colors hover:border-transparent hover:bg-[rgba(141,58,36,0.96)] hover:text-white"
                >
                  {cat.name} <span className="ml-1 text-xs opacity-60">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured recipes ── */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <SectionHeading
              eyebrow={<SectionLabel>{t.home.featuredHeading}</SectionLabel>}
              title={<>{t.home.featuredSubtitle}</>}
              actions={
                <div className="flex flex-wrap gap-2">
                  {(locale === 'az' || locale === 'en') ? (
                    <Button asChild className="rounded-full bg-[rgba(36,28,24,0.96)] px-5 text-white hover:bg-[rgba(36,28,24,0.9)]">
                      <Link href={getCollectionsPath(locale)}>
                        {locale === 'az' ? 'Dad marşrutları' : 'Taste trails'}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  ) : null}
                  <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-5 hover:bg-white">
                    <Link href={getRecipesUrl()}>
                      {t.home.ctaBtn}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              }
            />
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
              {highlightedRecipes.map((recipe, index) => (
                <Link key={recipe.id} href={getRecipeUrl(recipe.slug)} className={`group ${index === 0 ? 'md:col-span-2 xl:col-span-1' : ''}`}>
                  <Card className="h-full overflow-hidden border-white/60 bg-white/76 shadow-[0_18px_48px_rgba(52,34,22,0.08)] backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="relative min-h-[200px] overflow-hidden sm:min-h-[240px]">
                      <Image
                        src={getValidImageUrl(recipe.image)}
                        alt={recipe.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        priority={index < 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                        {recipe.featured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(201,150,69,0.92)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-white">
                            <Star className="h-3 w-3" /> {t.home.featuredBadge}
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/16 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                          <MapPin className="h-3 w-3" /> {recipe.origin}
                        </span>
                      </div>
                    </div>
                    <CardContent className="space-y-3 p-4 sm:p-5">
                      <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(112,83,59,0.72)]">
                        <span>{recipe.category}</span>
                        <span>•</span>
                        <span>{recipe.difficulty}</span>
                      </div>
                      <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground sm:text-xl text-left">{recipe.name}</h3>
                      <div className="flex flex-wrap gap-3 text-xs text-[rgba(57,44,35,0.68)]">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5" /> {recipe.prepTime}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" /> {recipe.servings}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Latest recipes ── */}
        {latestRecipes.length > 0 && (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="display-title text-2xl text-foreground sm:text-3xl">{t.home.latestHeading}</h2>
                <Link href={getRecipesUrl()} className="text-sm font-medium text-[rgba(141,58,36,0.96)] hover:underline">
                  {t.home.latestAll}
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {latestRecipes.map((recipe) => (
                  <Link key={recipe.id} href={getRecipeUrl(recipe.slug)} className="group min-w-0">
                    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-[rgba(98,67,45,0.08)] bg-white/72 p-3 transition-colors hover:bg-white/90">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                        <Image src={getValidImageUrl(recipe.image)} alt={recipe.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold text-foreground text-left">{recipe.name}</h3>
                        <p className="mt-0.5 truncate text-left text-xs text-[rgba(57,44,35,0.6)]">{recipe.category} · {recipe.prepTime}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── About Chef İlhamə (compact) ── */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <EditorialPanel className="mesh-surface p-5 sm:p-8">
              <div className="grid gap-6 sm:gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(141,58,36,0.1)] text-[rgba(141,58,36,0.96)]">
                  <ChefHat className="h-8 w-8" />
                </div>
                <div className="space-y-2 text-left">
                  <h2 className="display-title text-2xl text-foreground sm:text-3xl">{t.home.aboutChefTitle}</h2>
                  <p className="max-w-xl text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base">
                    {t.home.aboutChefDesc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-5 hover:bg-white">
                    <Link href={getLocalizedAboutPath(locale)}>{t.nav.about}</Link>
                  </Button>
                  <Button asChild className="rounded-full bg-[rgba(141,58,36,0.96)] text-white hover:bg-[rgba(141,58,36,0.9)]">
                    <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">
                      {t.nav.contact}
                    </a>
                  </Button>
                </div>
              </div>
            </EditorialPanel>
          </div>
        </section>

        {/* ── CTA: Explore recipes ── */}
        <section className="px-4 pb-2 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <CtaBand
              eyebrow={<SectionLabel className="border-white/20 bg-white/10 text-white">{stats.totalRecipes}+ {t.home.recipesStat}</SectionLabel>}
              title={<>{t.home.ctaTitle}</>}
              description={t.home.ctaDesc}
              actions={
                <Button asChild className="rounded-full bg-white px-6 text-[rgba(34,27,23,0.94)] hover:bg-white/90">
                  <Link href={getRecipesUrl()}>
                    {t.home.ctaBtn}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              }
            />
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
