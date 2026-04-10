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

        {/* ── Hero: Recipe discovery focus ── */}
        <section className="px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pt-10">
          <div className="mx-auto max-w-7xl">
            <EditorialPanel className="mesh-surface px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
              <div className="mx-auto max-w-3xl space-y-6 text-center">
                <SectionLabel>Azərbaycan mətbəxi reseptləri</SectionLabel>
                <h1 className="display-title text-[clamp(2.2rem,6vw,5rem)] leading-[0.94] text-foreground">
                  Dadlı reseptləri<br />kəşf edin və bişirin.
                </h1>
                <p className="mx-auto max-w-xl text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base sm:leading-8">
                  Chef İlhamənin seçilmiş Azərbaycan mətbəxi reseptləri — bölgə, kateqoriya və çətinliyə görə axtarın.
                </p>

                {/* Search bar */}
                <div className="relative mx-auto max-w-lg">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgba(112,83,59,0.72)]" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Resept, bölgə və ya kateqoriya axtarın..."
                    className="h-12 rounded-full border-[rgba(98,67,45,0.14)] bg-white/84 pl-11 pr-4 shadow-sm"
                  />
                  {searchResults.length > 0 && (
                    <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-white/60 bg-white/95 shadow-xl backdrop-blur-lg">
                      {searchResults.map((recipe) => (
                        <Link
                          key={recipe.id}
                          href={`/resept/${recipe.slug}`}
                          className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[rgba(247,239,226,0.7)]"
                          onClick={() => setSearchTerm('')}
                        >
                          <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                            <Image src={getValidImageUrl(recipe.image)} alt={recipe.name} fill className="object-cover" sizes="40px" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-semibold text-foreground">{recipe.name}</div>
                            <div className="text-xs text-[rgba(57,44,35,0.6)]">{recipe.category} · {recipe.origin}</div>
                          </div>
                        </Link>
                      ))}
                      <Link
                        href="/reseptler"
                        className="block border-t border-[rgba(98,67,45,0.08)] px-4 py-3 text-center text-sm font-medium text-[rgba(141,58,36,0.96)] transition-colors hover:bg-[rgba(247,239,226,0.5)]"
                        onClick={() => setSearchTerm('')}
                      >
                        Bütün reseptlərə bax →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Quick stats */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-sm text-[rgba(57,44,35,0.72)]">
                  <span className="inline-flex items-center gap-1.5">
                    <BookOpenText className="h-4 w-4 text-[rgba(141,58,36,0.96)]" />
                    {stats.totalRecipes}+ resept
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[rgba(141,58,36,0.4)]" />
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-[rgba(53,84,65,0.96)]" />
                    {stats.totalRegions} bölgə
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[rgba(141,58,36,0.4)]" />
                  <span className="inline-flex items-center gap-1.5">
                    <Utensils className="h-4 w-4 text-[rgba(201,150,69,0.96)]" />
                    {stats.totalCategories} kateqoriya
                  </span>
                </div>
              </div>
            </EditorialPanel>
          </div>
        </section>

        {/* ── Category chips ── */}
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-[rgba(112,83,59,0.72)]">Kateqoriyalar</h2>
              <Link href="/reseptler" className="text-sm font-medium text-[rgba(141,58,36,0.96)] hover:underline">
                Hamısına bax
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {categoryStats.slice(0, 10).map((cat) => (
                <Link
                  key={cat.name}
                  href={`/reseptler?category=${encodeURIComponent(cat.name)}`}
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
              eyebrow={<SectionLabel>Seçilmiş reseptlər</SectionLabel>}
              title={<>Mətbəxin ən yaxşıları</>}
              actions={
                <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-5 hover:bg-white">
                  <Link href="/reseptler">
                    Bütün reseptlər
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              }
            />
            <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
              {highlightedRecipes.map((recipe, index) => (
                <Link key={recipe.id} href={`/resept/${recipe.slug}`} className={`group ${index === 0 ? 'md:col-span-2 xl:col-span-1' : ''}`}>
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
                            <Star className="h-3 w-3" /> Seçilmiş
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
                      <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground sm:text-xl">{recipe.name}</h3>
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
                <h2 className="display-title text-2xl text-foreground sm:text-3xl">Son əlavə olunanlar</h2>
                <Link href="/reseptler" className="text-sm font-medium text-[rgba(141,58,36,0.96)] hover:underline">
                  Hamısı →
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {latestRecipes.map((recipe) => (
                  <Link key={recipe.id} href={`/resept/${recipe.slug}`} className="group">
                    <div className="flex items-center gap-3 rounded-2xl border border-[rgba(98,67,45,0.08)] bg-white/72 p-3 transition-colors hover:bg-white/90">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                        <Image src={getValidImageUrl(recipe.image)} alt={recipe.name} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-foreground">{recipe.name}</h3>
                        <p className="mt-0.5 text-xs text-[rgba(57,44,35,0.6)]">{recipe.category} · {recipe.prepTime}</p>
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
                <div className="space-y-2">
                  <h2 className="display-title text-2xl text-foreground sm:text-3xl">Chef İlhamə</h2>
                  <p className="max-w-xl text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base">
                    15+ il təcrübə ilə Azərbaycan mətbəxinin bölgəvi dadlarını müasir yanaşma ilə paylaşır. Reseptlər, catering və şəxsi aşpaz xidmətləri.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-5 hover:bg-white">
                    <Link href="/haqqinda">Haqqında</Link>
                  </Button>
                  <Button asChild className="rounded-full bg-[rgba(141,58,36,0.96)] text-white hover:bg-[rgba(141,58,36,0.9)]">
                    <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">
                      Əlaqə
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
              eyebrow={<SectionLabel className="border-white/20 bg-white/10 text-white">{stats.totalRecipes}+ resept</SectionLabel>}
              title={<>Bütün reseptləri kəşf edin.</>}
              description="Bölgələrə, kateqoriyalara görə axtarın və sevimli yeməklərinizi hazırlayın."
              actions={
                <Button asChild className="rounded-full bg-white px-6 text-[rgba(34,27,23,0.94)] hover:bg-white/90">
                  <Link href="/reseptler">
                    Reseptlərə keç
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