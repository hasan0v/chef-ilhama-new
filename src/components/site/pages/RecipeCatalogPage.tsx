'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Clock3,
  Grid3X3,
  LayoutList,
  MapPin,
  Search,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  EditorialPanel,
  PageHero,
  SectionHeading,
  SectionLabel,
} from '@/components/site/marketing';
import type { Recipe } from '@/types/recipe';
import { getValidImageUrl } from '@/utils/imageUtils';
import { getCategoryStats, recipeMatchesCategory } from '@/utils/categoryUtils';

interface RecipeCatalogPageProps {
  initialRecipes: Recipe[];
  categories: string[];
  regions: string[];
}

const difficulties = ['Asan', 'Orta', 'Çətin'] as const;

function getDifficultyTone(difficulty: string) {
  switch (difficulty) {
    case 'Asan':
      return 'bg-[rgba(53,84,65,0.12)] text-[rgba(53,84,65,0.96)]';
    case 'Orta':
      return 'bg-[rgba(201,150,69,0.18)] text-[rgba(118,78,24,0.96)]';
    case 'Çətin':
      return 'bg-[rgba(141,58,36,0.12)] text-[rgba(141,58,36,0.96)]';
    default:
      return 'bg-[rgba(57,44,35,0.08)] text-[rgba(57,44,35,0.76)]';
  }
}

export default function RecipeCatalogPage({ initialRecipes, categories, regions }: RecipeCatalogPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categoryStats = useMemo(() => getCategoryStats(initialRecipes), [initialRecipes]);

  const filteredRecipes = useMemo(() => {
    return initialRecipes.filter((recipe) => {
      const query = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !query ||
        recipe.name.toLowerCase().includes(query) ||
        recipe.origin.toLowerCase().includes(query) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(query));
      const matchesCategory = recipeMatchesCategory(recipe.category, selectedCategory);
      const matchesRegion = !selectedRegion || recipe.origin.includes(selectedRegion) || recipe.region.includes(selectedRegion);
      const matchesDifficulty = !selectedDifficulty || recipe.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesRegion && matchesDifficulty;
    });
  }, [initialRecipes, searchTerm, selectedCategory, selectedRegion, selectedDifficulty]);

  function clearFilters() {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedRegion('');
    setSelectedDifficulty('');
  }

  return (
    <PageLayout>
      <div className="space-y-12 lg:space-y-16">
        <PageHero
          eyebrow={<SectionLabel>Azərbaycan resept arxivi</SectionLabel>}
          title={<>Reseptləri sadəcə siyahı kimi yox, mətbəx atlası kimi gəzin.</>}
          description="Axtarış, region, kateqoriya və çətinlik filtresi ilə reseptləri tapın."
          stats={[
            { value: `${initialRecipes.length}+`, label: 'resept' },
            { value: `${categories.length}`, label: 'kateqoriya' },
            { value: `${regions.length}`, label: 'bölgə' },
          ]}
          aside={
            <EditorialPanel className="p-6 sm:p-7">
              <div className="space-y-5">
                <SectionLabel className="bg-[rgba(201,150,69,0.18)]">Kataloq qeydi</SectionLabel>
                <h3 className="display-title text-4xl leading-[0.96] text-foreground">Hər kart bir bölgə və dad hissi daşıyır.</h3>
                <div className="grid gap-3 text-sm text-[rgba(57,44,35,0.76)]">
                  <div className="rounded-[1.4rem] border border-[rgba(98,67,45,0.1)] bg-white/72 p-4">
                    <div className="font-semibold text-foreground">Ən çox kateqoriya</div>
                    <div className="mt-2 line-clamp-2">{categoryStats.slice(0, 3).map((item) => item.name).join(' · ') || 'Kateqoriyalar yüklənir'}</div>
                  </div>
                </div>
              </div>
            </EditorialPanel>
          }
        />

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <SectionHeading
              eyebrow={<SectionLabel>Kataloq nəzarətləri</SectionLabel>}
              title={<>Axtarış və filtr</>}
            />

            <EditorialPanel className="p-5 sm:p-6">
              <div className="grid gap-4 lg:grid-cols-[1.2fr_0.9fr_0.8fr_0.8fr_auto_auto] lg:items-center">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgba(112,83,59,0.72)]" />
                  <Input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Resept adı, bölgə və ya tag axtarın"
                    className="h-12 rounded-full border-[rgba(98,67,45,0.14)] bg-white/84 pl-11"
                  />
                </div>
                <Select value={selectedCategory || 'all'} onValueChange={(value) => setSelectedCategory(value === 'all' ? '' : value)}>
                  <SelectTrigger className="h-12 w-full rounded-full border-[rgba(98,67,45,0.14)] bg-white/84 px-4">
                    <SelectValue placeholder="Kateqoriya" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Hamısı</SelectItem>
                    {categories.filter((category) => category && category.trim()).map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedRegion || 'all'} onValueChange={(value) => setSelectedRegion(value === 'all' ? '' : value)}>
                  <SelectTrigger className="h-12 w-full rounded-full border-[rgba(98,67,45,0.14)] bg-white/84 px-4">
                    <SelectValue placeholder="Bölgə" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Hamısı</SelectItem>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty || 'all'} onValueChange={(value) => setSelectedDifficulty(value === 'all' ? '' : value)}>
                  <SelectTrigger className="h-12 w-full rounded-full border-[rgba(98,67,45,0.14)] bg-white/84 px-4">
                    <SelectValue placeholder="Çətinlik" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Hamısı</SelectItem>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2 rounded-full border border-[rgba(98,67,45,0.1)] bg-white/76 p-1">
                  <Button type="button" variant={viewMode === 'grid' ? 'default' : 'ghost'} className={`rounded-full ${viewMode === 'grid' ? 'bg-[rgba(141,58,36,0.96)] text-white hover:bg-[rgba(141,58,36,0.9)]' : ''}`} onClick={() => setViewMode('grid')}>
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant={viewMode === 'list' ? 'default' : 'ghost'} className={`rounded-full ${viewMode === 'list' ? 'bg-[rgba(141,58,36,0.96)] text-white hover:bg-[rgba(141,58,36,0.9)]' : ''}`} onClick={() => setViewMode('list')}>
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
                <Button type="button" variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/76 px-5 hover:bg-white" onClick={clearFilters}>
                  Təmizlə
                </Button>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(112,83,59,0.72)]">Top kateqoriyalar</span>
                {categoryStats.slice(0, 6).map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSelectedCategory(item.name)}
                    className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                      selectedCategory === item.name
                        ? 'bg-[rgba(141,58,36,0.96)] text-white'
                        : 'bg-white/80 text-[rgba(57,44,35,0.82)] hover:bg-white'
                    }`}
                  >
                    {item.name} ({item.count})
                  </button>
                ))}
              </div>
            </EditorialPanel>
          </div>
        </section>

        <section className="px-4 pb-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgba(112,83,59,0.72)]">Nəticələr</div>
                <h2 className="display-title mt-2 text-4xl text-foreground">{filteredRecipes.length} resept tapıldı</h2>
              </div>
            </div>

            {filteredRecipes.length === 0 ? (
              <EditorialPanel className="p-8 text-center sm:p-12">
                <div className="mx-auto max-w-xl space-y-4">
                  <Sparkles className="mx-auto h-10 w-10 text-[rgba(141,58,36,0.96)]" />
                  <h3 className="display-title text-4xl text-foreground">Bu kombinasiyada resept tapılmadı.</h3>
                  <p className="text-sm leading-7 text-[rgba(57,44,35,0.72)] sm:text-base">
                    Filtrlərdən birini təmizləyin və ya axtarış sözünü daha ümumi yazın.
                  </p>
                  <Button variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/76 px-6 hover:bg-white" onClick={clearFilters}>
                    Filtrləri sıfırla
                  </Button>
                </div>
              </EditorialPanel>
            ) : (
              <div className={viewMode === 'grid' ? 'grid gap-5 md:grid-cols-2 xl:grid-cols-3' : 'space-y-4'}>
                {filteredRecipes.map((recipe, index) => (
                  <Card key={recipe.id} className={`overflow-hidden border-white/60 bg-white/78 shadow-[0_24px_64px_rgba(52,34,22,0.08)] backdrop-blur-sm ${viewMode === 'list' ? 'md:grid md:grid-cols-[280px_1fr]' : ''}`}>
                    <div className={`relative overflow-hidden ${viewMode === 'grid' ? 'min-h-[260px]' : 'min-h-[240px] md:min-h-full'}`}>
                      <Image
                        src={getValidImageUrl(recipe.image)}
                        alt={recipe.name}
                        fill
                        className="object-cover"
                        sizes={viewMode === 'grid' ? '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw' : '(max-width: 768px) 100vw, 280px'}
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${getDifficultyTone(recipe.difficulty)}`}>
                          {recipe.difficulty}
                        </span>
                        {recipe.featured ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(201,150,69,0.92)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                            <Star className="h-3 w-3" />
                            Seçilmiş
                          </span>
                        ) : null}
                      </div>
                      <div className="absolute bottom-5 left-5 right-5">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/16 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                          <MapPin className="h-3.5 w-3.5" />
                          {recipe.origin}
                        </div>
                      </div>
                    </div>
                    <CardContent className="flex flex-col justify-between gap-6 p-6">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(112,83,59,0.72)]">
                          <span>{recipe.category}</span>
                          <span>•</span>
                          <span>{recipe.region}</span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">{recipe.name}</h3>
                          <p className="mt-3 line-clamp-3 text-sm leading-7 text-[rgba(57,44,35,0.72)] sm:text-base">{recipe.history}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm text-[rgba(57,44,35,0.72)]">
                          <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(247,239,226,0.82)] px-3 py-1.5">
                            <Clock3 className="h-4 w-4 text-[rgba(141,58,36,0.96)]" />
                            {recipe.prepTime}
                          </span>
                          <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(247,239,226,0.82)] px-3 py-1.5">
                            <Users className="h-4 w-4 text-[rgba(53,84,65,0.96)]" />
                            {recipe.servings}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <Button asChild className="rounded-full bg-[rgba(141,58,36,0.96)] text-white hover:bg-[rgba(141,58,36,0.9)]">
                          <Link href={`/resept/${recipe.slug}`}>
                            Resepti aç
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
