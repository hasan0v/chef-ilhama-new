'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
import type { Recipe } from '@/types/recipe';
import { getValidImageUrl } from '@/utils/imageUtils';
import { useTranslation } from '@/hooks/useTranslation';

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

export default function HomeExperience({ featuredRecipes, allRecipes, categories, stats }: HomeExperienceProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { t, locale } = useTranslation();
  const isEn = locale === 'en';
  
  const getRecipeUrl = (slug: string) => isEn ? `/en/recipe/${slug}` : `/resept/${slug}`;
  const getRecipesUrl = () => isEn ? `/en/recipes` : `/reseptler`;
  
  const highlightedRecipes = featuredRecipes.slice(0, 6);

  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const recipe of allRecipes) {
      if (recipe.category) {
        counts[recipe.category] = (counts[recipe.category] || 0) + 1;
      }
    }
    return categories
      .map((cat) => ({ name: cat, count: counts[cat] || 0 }))
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [allRecipes, categories]);

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

  return (
    <PageLayout>
      <div className="space-y-10 sm:space-y-14 lg:space-y-16">

        {/* ── Hero: Recipe discovery focus with background video ── */}
        <section className="px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-black shadow-[0_24px_70px_rgba(32,22,14,0.18)] min-h-[500px] sm:min-h-[550px] lg:min-h-[620px] flex items-center justify-center px-6 py-12 sm:px-12 lg:px-16">
              
              {/* Background Video */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover opacity-85 select-none pointer-events-none"
              >
                <source src="/video/bg-video.mp4" type="video/mp4" />
              </video>

              {/* Dark cinematic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />

              {/* Content overlay */}
              <div className="relative z-10 mx-auto max-w-3xl space-y-6 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                  {t.home.subtitle}
                </span>
                
                <h1 className="display-title text-[clamp(2.4rem,6.5vw,5.2rem)] font-extrabold leading-[0.92] text-white whitespace-pre-line tracking-[-0.04em] drop-shadow-md">
                  {t.home.title}
                </h1>
                
                <p className="mx-auto max-w-xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8 drop-shadow-sm">
                  {t.home.description}
                </p>

                {/* Premium Glassmorphic Search bar */}
                <div className="relative mx-auto max-w-lg">
                  <Search className="pointer-events-none absolute left-4.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t.home.searchPlaceholder}
                    className="h-12 rounded-full border-white/20 bg-white/12 text-white placeholder:text-white/55 pl-11 pr-4 shadow-inner backdrop-blur-md transition-all duration-300 focus:border-white/40 focus:bg-white/18 focus:ring-0"
                  />
                  {searchResults.length > 0 && (
                    <div className="absolute left-0 right-0 top-full z-20 mt-2.5 overflow-hidden rounded-2xl border border-white/10 bg-black/90 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl">
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
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-sm text-white/70">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                    <BookOpenText className="h-4 w-4 text-[rgba(255,220,181,0.92)]" />
                    {stats.totalRecipes}+ {t.home.recipesStat}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                    <MapPin className="h-4 w-4 text-[rgba(255,220,181,0.92)]" />
                    {stats.totalRegions} {t.home.regionsStat}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 backdrop-blur-sm">
                    <Utensils className="h-4 w-4 text-[rgba(255,220,181,0.92)]" />
                    {stats.totalCategories} {t.home.categoriesStat}
                  </span>
                </div>
              </div>
            </div>
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
                <Link
                  key={cat.name}
                  href={`${getRecipesUrl()}?category=${encodeURIComponent(cat.name)}`}
                  className="rounded-full border border-[rgba(98,67,45,0.1)] bg-white/80 px-4 py-2 text-sm font-medium text-[rgba(57,44,35,0.82)] transition-colors hover:border-transparent hover:bg-[rgba(141,58,36,0.96)] hover:text-white"
                >
                  {cat.name} <span className="ml-1 text-xs opacity-60">({cat.count})</span>
                </Link>
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
                <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-5 hover:bg-white">
                  <Link href={getRecipesUrl()}>
                    {t.home.ctaBtn}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
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
                  <Link key={recipe.id} href={getRecipeUrl(recipe.slug)} className="group">
                    <div className="flex items-center gap-3 rounded-2xl border border-[rgba(98,67,45,0.08)] bg-white/72 p-3 transition-colors hover:bg-white/90">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                        <Image src={getValidImageUrl(recipe.image)} alt={recipe.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm font-semibold text-foreground text-left">{recipe.name}</h3>
                        <p className="mt-0.5 text-xs text-[rgba(57,44,35,0.6)] text-left">{recipe.category} · {recipe.prepTime}</p>
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
                    <Link href={isEn ? "/en/about" : "/haqqinda"}>{t.nav.about}</Link>
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