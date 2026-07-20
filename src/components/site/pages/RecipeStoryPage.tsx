'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Check,
  CheckCircle2,
  ChefHat,
  Clock3,
  History,
  ExternalLink,
  Lightbulb,
  MapPin,
  Printer,
  RefreshCw,
  Share2,
  ShieldAlert,
  Utensils,
  Users,
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import {
  getLocalizedAboutPath,
  getLocalizedRecipePath,
  getLocalizedRecipesPath,
  getLocalizedServicesPath,
} from '@/lib/localeRoutes';
import type { SiteLocale } from '@/lib/localeRoutes';
import { trackEvent } from '@/lib/analytics';
import { getRecipeInsight } from '@/lib/recipeInsights';

interface RecipeStoryPageProps {
  recipe: Recipe;
  relatedRecipes?: Recipe[];
  breadcrumbs?: import('@/lib/seo').BreadcrumbItem[];
}

const engagementLabels: Record<SiteLocale, { jump: string; save: string; saved: string; sources: string; photo: string }> = {
  az: { jump: 'Reseptə keç', save: 'Saxla', saved: 'Saxlanıldı', sources: 'Mənbələr', photo: 'Şəkil' },
  en: { jump: 'Jump to recipe', save: 'Save', saved: 'Saved', sources: 'Sources', photo: 'Photo' },
  tr: { jump: 'Tarife geç', save: 'Kaydet', saved: 'Kaydedildi', sources: 'Kaynaklar', photo: 'Fotoğraf' },
  ru: { jump: 'К рецепту', save: 'Сохранить', saved: 'Сохранено', sources: 'Источники', photo: 'Фото' },
  fr: { jump: 'Voir la recette', save: 'Enregistrer', saved: 'Enregistré', sources: 'Sources', photo: 'Photo' },
  it: { jump: 'Vai alla ricetta', save: 'Salva', saved: 'Salvata', sources: 'Fonti', photo: 'Foto' },
  ar: { jump: 'انتقل إلى الوصفة', save: 'حفظ', saved: 'تم الحفظ', sources: 'المصادر', photo: 'الصورة' },
  zh: { jump: '查看食谱', save: '收藏', saved: '已收藏', sources: '来源', photo: '图片' },
  hi: { jump: 'रेसिपी पर जाएँ', save: 'सहेजें', saved: 'सहेजा गया', sources: 'स्रोत', photo: 'फ़ोटो' },
  es: { jump: 'Ir a la receta', save: 'Guardar', saved: 'Guardada', sources: 'Fuentes', photo: 'Foto' },
  pt: { jump: 'Ir para a receita', save: 'Guardar', saved: 'Guardada', sources: 'Fontes', photo: 'Foto' },
  nl: { jump: 'Naar recept', save: 'Bewaren', saved: 'Bewaard', sources: 'Bronnen', photo: 'Foto' },
  de: { jump: 'Zum Rezept', save: 'Speichern', saved: 'Gespeichert', sources: 'Quellen', photo: 'Foto' },
  ja: { jump: 'レシピを見る', save: '保存', saved: '保存済み', sources: '出典', photo: '写真' },
  id: { jump: 'Lihat resep', save: 'Simpan', saved: 'Tersimpan', sources: 'Sumber', photo: 'Foto' },
  bn: { jump: 'রেসিপিতে যান', save: 'সংরক্ষণ', saved: 'সংরক্ষিত', sources: 'উৎস', photo: 'ছবি' },
};

function getDifficultyTone(difficulty: string) {
  switch (difficulty) {
    case 'Asan':
    case 'Easy':
      return 'bg-[rgba(53,84,65,0.12)] text-[rgba(53,84,65,0.96)]';
    case 'Orta':
    case 'Medium':
      return 'bg-[rgba(201,150,69,0.18)] text-[rgba(118,78,24,0.96)]';
    case 'Çətin':
    case 'Hard':
      return 'bg-[rgba(141,58,36,0.12)] text-[rgba(141,58,36,0.96)]';
    default:
      return 'bg-[rgba(57,44,35,0.08)] text-[rgba(57,44,35,0.76)]';
  }
}

export default function RecipeStoryPage({ recipe, relatedRecipes = [], breadcrumbs }: RecipeStoryPageProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const { t, locale } = useTranslation();
  const labels = engagementLabels[locale];
  const recipeInsight = locale === 'az' || locale === 'en' ? getRecipeInsight(recipe.slug)?.[locale] : undefined;
  const progressKey = `chef-recipe-progress:${recipe.slug}`;

  useEffect(() => {
    let cancelled = false;
    try {
      const storedProgress = JSON.parse(localStorage.getItem(progressKey) ?? '{}') as { ingredients?: number[]; steps?: number[] };
      const savedRecipes = JSON.parse(localStorage.getItem('chef-saved-recipes') ?? '[]') as string[];
      queueMicrotask(() => {
        if (cancelled) return;
        setCheckedIngredients(new Set((storedProgress.ingredients ?? []).filter((index) => index < recipe.ingredients.length)));
        setCompletedSteps(new Set((storedProgress.steps ?? []).filter((index) => index < recipe.instructions.length)));
        setSaved(savedRecipes.includes(recipe.slug));
        setProgressLoaded(true);
      });
    } catch {
      localStorage.removeItem(progressKey);
      queueMicrotask(() => {
        if (!cancelled) setProgressLoaded(true);
      });
    }
    return () => { cancelled = true; };
  }, [progressKey, recipe.ingredients.length, recipe.instructions.length, recipe.slug]);

  useEffect(() => {
    if (!progressLoaded) return;
    localStorage.setItem(progressKey, JSON.stringify({ ingredients: [...checkedIngredients], steps: [...completedSteps] }));
  }, [checkedIngredients, completedSteps, progressKey, progressLoaded]);

  useEffect(() => {
    trackEvent('recipe_view', {
      recipe_slug: recipe.slug,
      recipe_name: recipe.name,
      recipe_origin: recipe.origin,
      locale,
    });
  }, [locale, recipe.name, recipe.origin, recipe.slug]);

  const getRecipesUrl = () => getLocalizedRecipesPath(locale);
  const getServicesUrl = () => getLocalizedServicesPath(locale);
  const quickAnswer = locale === 'az'
    ? `${recipe.name} ${recipe.ingredients.length} ərzaqla, ${recipe.instructions.length} aydın addımda hazırlanır. Ümumi vaxt ${recipe.prepTime}, nəticə isə ${recipe.servings} üçündür. Ərzaqları işarələyin və addımları bişirdikcə tamamlayın.`
    : locale === 'en'
      ? `${recipe.name} uses ${recipe.ingredients.length} ingredients and ${recipe.instructions.length} clear steps. Allow ${recipe.prepTime}; the recipe yields ${recipe.servings}. Check off ingredients and steps as you cook.`
      : null;

  const progress = useMemo(() => {
    const ingredientProgress = recipe.ingredients.length
      ? Math.round((checkedIngredients.size / recipe.ingredients.length) * 100)
      : 0;
    const stepProgress = recipe.instructions.length
      ? Math.round((completedSteps.size / recipe.instructions.length) * 100)
      : 0;

    return { ingredientProgress, stepProgress };
  }, [checkedIngredients.size, completedSteps.size, recipe.ingredients.length, recipe.instructions.length]);

  function toggleIngredient(index: number) {
    setCheckedIngredients((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      trackEvent('ingredient_check', {
        recipe_slug: recipe.slug,
        ingredient_number: index + 1,
        checked: next.has(index),
        locale,
      });
      return next;
    });
  }

  function toggleStep(index: number) {
    setCompletedSteps((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      const completed = next.has(index);
      trackEvent('step_complete', {
        recipe_slug: recipe.slug,
        step_number: index + 1,
        completed,
        locale,
      });
      if (completed && next.size === recipe.instructions.length) {
        trackEvent('recipe_complete', { recipe_slug: recipe.slug, locale });
      }
      return next;
    });
  }

  async function handleShare() {
    const url = window.location.href;
    const title = `${recipe.name} · ${t.nav.recipes}`;
    const text = `${recipe.name} · ${recipe.origin}`;

    if (navigator.share) {
      await navigator.share({ title, text, url });
      trackEvent('recipe_share', { recipe_slug: recipe.slug, method: 'native', locale });
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      trackEvent('recipe_share', { recipe_slug: recipe.slug, method: 'clipboard', locale });
      return;
    }

    window.prompt(t.recipeStory.layoutShare, url);
    trackEvent('recipe_share', { recipe_slug: recipe.slug, method: 'prompt', locale });
  }

  function handlePrint() {
    trackEvent('recipe_print', { recipe_slug: recipe.slug, locale });
    window.print();
  }

  function toggleSaved() {
    const savedRecipes = new Set<string>(JSON.parse(localStorage.getItem('chef-saved-recipes') ?? '[]'));
    if (savedRecipes.has(recipe.slug)) savedRecipes.delete(recipe.slug);
    else savedRecipes.add(recipe.slug);
    localStorage.setItem('chef-saved-recipes', JSON.stringify([...savedRecipes]));
    const isSaved = savedRecipes.has(recipe.slug);
    setSaved(isSaved);
    trackEvent('recipe_save', { recipe_slug: recipe.slug, saved: isSaved, locale });
  }

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-12 lg:space-y-16">
        <section className="px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
          <div className="mx-auto max-w-7xl">
            <EditorialPanel className="mesh-surface px-6 py-8 sm:px-10 sm:py-12">
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div className="space-y-6 text-left">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 hover:bg-white">
                      <Link href={getRecipesUrl()}>
                        <ArrowLeft className="h-4 w-4" />
                        {t.recipeStory.backBtn}
                      </Link>
                    </Button>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${getDifficultyTone(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </span>
                    {recipe.featured ? (
                      <Badge className="rounded-full bg-[rgba(201,150,69,0.92)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white hover:bg-[rgba(201,150,69,0.92)]">
                        {t.recipes.featuredBadge}
                      </Badge>
                    ) : null}
                  </div>

                  <div className="space-y-4">
                    <SectionLabel>{recipe.category || t.nav.recipes}</SectionLabel>
                    <h1 className="display-title text-[clamp(2rem,6vw,5rem)] leading-[0.92] text-foreground">{recipe.name}</h1>
                    <p className="max-w-2xl text-base leading-8 text-[rgba(57,44,35,0.76)] sm:text-lg">
                      {recipe.history || `${recipe.name} · ${recipe.origin}`}
                    </p>
                    {(locale === 'az' || locale === 'en') ? (
                      <Link
                        href={getLocalizedAboutPath(locale)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-[rgba(112,83,59,0.76)] underline decoration-[rgba(141,58,36,0.28)] underline-offset-4 hover:text-[rgba(141,58,36,0.96)]"
                      >
                        <ChefHat className="h-4 w-4" />
                        {locale === 'az' ? 'Chef İlhamənin resept kolleksiyasından' : 'From Chef Ilhama’s recipe collection'}
                      </Link>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap gap-2 text-sm text-[rgba(57,44,35,0.72)]">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/72 px-4 py-2 shadow-sm">
                      <MapPin className="h-4 w-4 text-[rgba(141,58,36,0.96)]" />
                      {recipe.origin}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/72 px-4 py-2 shadow-sm">
                      <Clock3 className="h-4 w-4 text-[rgba(141,58,36,0.96)]" />
                      {recipe.prepTime}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/72 px-4 py-2 shadow-sm">
                      <Users className="h-4 w-4 text-[rgba(53,84,65,0.96)]" />
                      {recipe.servings}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/72 px-4 py-2 shadow-sm">
                      <ChefHat className="h-4 w-4 text-[rgba(53,84,65,0.96)]" />
                      {recipe.ingredients.length} {t.recipeStory.ingredientsSuffix}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="rounded-full bg-[rgba(53,84,65,0.96)] text-white hover:bg-[rgba(53,84,65,0.9)]">
                      <a
                        href="#recipe-content"
                        onClick={() => trackEvent('recipe_jump_to_method', { recipe_slug: recipe.slug, locale, location: 'hero' })}
                      >
                        <BookOpen className="h-4 w-4" />
                        {labels.jump}
                      </a>
                    </Button>
                    <Button onClick={toggleSaved} aria-pressed={saved} variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 hover:bg-white cursor-pointer">
                      {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                      {saved ? labels.saved : labels.save}
                    </Button>
                    <Button onClick={handleShare} className="rounded-full bg-[rgba(141,58,36,0.96)] text-white hover:bg-[rgba(141,58,36,0.9)] cursor-pointer">
                      <Share2 className="h-4 w-4" />
                      {t.recipeStory.layoutShare}
                    </Button>
                    <Button onClick={handlePrint} variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 hover:bg-white cursor-pointer">
                      <Printer className="h-4 w-4" />
                      {t.recipeStory.layoutPrint}
                    </Button>
                  </div>
                </div>

                <div className="relative min-h-[280px] overflow-hidden rounded-[1.25rem] border border-white/60 shadow-[0_24px_64px_rgba(52,34,22,0.12)] sm:min-h-[400px] sm:rounded-[2rem]">
                  <Image
                    src={getValidImageUrl(recipe.image)}
                    alt={recipe.imageAlt || recipe.name}
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 52vw"
                    quality={90}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/12 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] bg-white/12 p-4 text-white backdrop-blur-md text-left">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/72">{t.recipeStory.notesLabel}</div>
                    <div className="mt-2 text-sm leading-7 text-white/92">
                      {t.recipeStory.notesDesc}
                    </div>
                  </div>
                </div>
                {recipe.imageCredit || recipe.imageLicense ? (
                  <p className="text-right text-xs leading-5 text-[rgba(57,44,35,0.62)] lg:col-start-2">
                    {labels.photo}: {recipe.imageCredit || recipe.name}
                    {recipe.imageLicense ? ` · ${recipe.imageLicense}` : ''}
                    {recipe.imageSourceUrl ? (
                      <> · <a className="underline underline-offset-2 hover:text-foreground" href={recipe.imageSourceUrl} target="_blank" rel="noopener noreferrer">{labels.sources}</a></>
                    ) : null}
                  </p>
                ) : null}
              </div>
            </EditorialPanel>
          </div>
        </section>

        {quickAnswer ? (
          <section className="px-4 sm:px-6 lg:px-8" aria-labelledby="recipe-quick-answer">
            <div className="mx-auto max-w-7xl">
              <EditorialPanel className="overflow-hidden p-0">
                <div className="grid md:grid-cols-[0.72fr_1.28fr] md:items-stretch">
                  <div className="flex flex-col justify-center bg-[rgba(36,28,24,0.96)] p-6 text-white sm:p-8">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/54">
                      {locale === 'az' ? 'Qısa cavab' : 'Quick answer'}
                    </div>
                    <h2 id="recipe-quick-answer" className="display-title mt-3 text-4xl leading-[0.96] sm:text-5xl">
                      {locale === 'az' ? `${recipe.name} necə hazırlanır?` : `How do you make ${recipe.name}?`}
                    </h2>
                  </div>
                  <div className="mesh-surface flex flex-col justify-center gap-5 p-6 sm:p-8">
                    <p className="text-base leading-8 text-[rgba(57,44,35,0.78)] sm:text-lg">{quickAnswer}</p>
                    <div>
                      <Button asChild className="rounded-full bg-[rgba(141,58,36,0.96)] text-white hover:bg-[rgba(141,58,36,0.9)]">
                        <a
                          href="#recipe-content"
                          onClick={() => trackEvent('recipe_jump_to_method', { recipe_slug: recipe.slug, locale, location: 'quick_answer' })}
                        >
                          <BookOpen className="h-4 w-4" />
                          {labels.jump}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </EditorialPanel>
            </div>
          </section>
        ) : null}

        {recipeInsight ? (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-7">
              <SectionHeading
                eyebrow={<SectionLabel>{locale === 'az' ? 'Bişirmə bələdçisi' : 'Cook’s brief'}</SectionLabel>}
                title={<>{locale === 'az' ? `${recipe.name} necə dadır və nəyi düzgün etmək lazımdır?` : `What does ${recipe.name} taste like—and what matters most?`}</>}
              />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                <Card className="border-white/60 bg-[rgba(36,28,24,0.96)] text-white shadow-[0_24px_68px_rgba(36,28,24,0.18)] md:col-span-2 xl:col-span-2">
                  <CardContent className="p-6 sm:p-7">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10"><Utensils className="h-5 w-5" /></div>
                    <div className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/52">{locale === 'az' ? 'Dad profili' : 'Taste profile'}</div>
                    <p className="mt-3 text-base leading-8 text-white/88">{recipeInsight.taste}</p>
                  </CardContent>
                </Card>
                <Card className="border-white/60 bg-white/78 shadow-[0_22px_60px_rgba(52,34,22,0.08)] md:col-span-1 xl:col-span-2">
                  <CardContent className="p-6 sm:p-7">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(201,150,69,0.18)] text-[rgba(141,58,36,0.96)]"><Lightbulb className="h-5 w-5" /></div>
                    <div className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(112,83,59,0.66)]">{locale === 'az' ? 'Əsas texnika' : 'Key technique'}</div>
                    <p className="mt-3 text-sm leading-8 text-[rgba(57,44,35,0.78)] sm:text-base">{recipeInsight.technique}</p>
                  </CardContent>
                </Card>
                <Card className="border-white/60 bg-white/78 shadow-[0_22px_60px_rgba(52,34,22,0.08)] md:col-span-1 xl:col-span-2">
                  <CardContent className="p-6 sm:p-7">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(53,84,65,0.12)] text-[rgba(53,84,65,0.96)]"><RefreshCw className="h-5 w-5" /></div>
                    <div className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(112,83,59,0.66)]">{locale === 'az' ? 'Praktik alternativ' : 'Practical substitute'}</div>
                    <p className="mt-3 text-sm leading-8 text-[rgba(57,44,35,0.78)] sm:text-base">{recipeInsight.substitution}</p>
                  </CardContent>
                </Card>
                <Card className="border-white/60 bg-white/78 shadow-[0_22px_60px_rgba(52,34,22,0.08)] md:col-span-1 xl:col-span-3">
                  <CardContent className="flex gap-4 p-6 sm:p-7">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[rgba(141,58,36,0.12)] text-[rgba(141,58,36,0.96)]"><ShieldAlert className="h-5 w-5" /></div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(112,83,59,0.66)]">{locale === 'az' ? 'Bu səhvdən qaçın' : 'Avoid this mistake'}</div>
                      <p className="mt-3 text-sm leading-8 text-[rgba(57,44,35,0.78)] sm:text-base">{recipeInsight.avoid}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-white/60 bg-white/78 shadow-[0_22px_60px_rgba(52,34,22,0.08)] md:col-span-1 xl:col-span-3">
                  <CardContent className="flex gap-4 p-6 sm:p-7">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[rgba(53,84,65,0.12)] text-[rgba(53,84,65,0.96)]"><Clock3 className="h-5 w-5" /></div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(112,83,59,0.66)]">{locale === 'az' ? 'Saxlama və qızdırma' : 'Storage and reheating'}</div>
                      <p className="mt-3 text-sm leading-8 text-[rgba(57,44,35,0.78)] sm:text-base">{recipeInsight.storage}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        ) : null}

        <section id="recipe-content" className="scroll-mt-28 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <SectionHeading
              eyebrow={<SectionLabel>{t.recipeStory.progressLabel}</SectionLabel>}
              title={<>{t.recipeStory.ingredientsLabel} & {t.recipeStory.instructionsLabel}</>}
            />
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="space-y-6 text-left">
                <Card className="border-white/60 bg-white/78 shadow-[0_24px_64px_rgba(52,34,22,0.08)] backdrop-blur-sm">
                  <CardContent className="space-y-5 p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgba(112,83,59,0.72)]">{t.recipeStory.ingredientsLabel}</div>
                        <h2 className="display-title mt-3 text-4xl text-foreground">{recipe.ingredients.length} {t.recipeStory.ingredientsSuffix}</h2>
                      </div>
                      <div className="rounded-full bg-[rgba(53,84,65,0.12)] px-3 py-1 text-sm font-semibold text-[rgba(53,84,65,0.96)]">
                        {progress.ingredientProgress}% {t.recipeStory.checkedIngredientsLabel}
                      </div>
                    </div>
                    <div className="space-y-3">
                      {recipe.ingredients.map((ingredient, index) => {
                        const checked = checkedIngredients.has(index);

                        return (
                          <button
                            key={`${ingredient}-${index}`}
                            type="button"
                            onClick={() => toggleIngredient(index)}
                            className={`flex w-full items-center gap-4 rounded-[1.4rem] border px-4 py-4 text-left transition-colors cursor-pointer ${
                              checked
                                ? 'border-[rgba(53,84,65,0.18)] bg-[rgba(53,84,65,0.08)]'
                                : 'border-[rgba(98,67,45,0.1)] bg-[rgba(247,239,226,0.7)] hover:bg-white/80'
                            }`}
                          >
                            <span className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${checked ? 'bg-[rgba(53,84,65,0.96)] text-white' : 'bg-white text-[rgba(112,83,59,0.72)]'}`}>
                              {checked ? <Check className="h-4 w-4" /> : index + 1}
                            </span>
                            <span className={`text-sm leading-7 sm:text-base min-w-0 flex-1 ${checked ? 'text-[rgba(53,84,65,0.96)] line-through' : 'text-[rgba(57,44,35,0.82)]'}`}>
                              {ingredient}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {recipe.history ? (
                  <Card className="border-white/60 bg-white/76 shadow-[0_20px_56px_rgba(52,34,22,0.08)] backdrop-blur-sm">
                    <CardContent className="space-y-4 p-6 sm:p-7">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[rgba(201,150,69,0.18)] text-[rgba(141,58,36,0.96)]">
                        <History className="h-5 w-5" />
                      </div>
                      <h3 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">{t.recipeStory.historyLabel}</h3>
                      <p className="text-sm leading-8 text-[rgba(57,44,35,0.76)] sm:text-base">{recipe.history}</p>
                    </CardContent>
                  </Card>
                ) : null}
              </div>

              <div className="space-y-6 text-left">
                <Card className="border-white/60 bg-white/78 shadow-[0_24px_64px_rgba(52,34,22,0.08)] backdrop-blur-sm">
                  <CardContent className="space-y-6 p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgba(112,83,59,0.72)]">{t.recipeStory.instructionsLabel}</div>
                        <h2 className="display-title mt-3 text-4xl text-foreground">{recipe.instructions.length} {t.recipeStory.instructionsSuffix}</h2>
                      </div>
                      <div className="rounded-full bg-[rgba(141,58,36,0.12)] px-3 py-1 text-sm font-semibold text-[rgba(141,58,36,0.96)]">
                        {progress.stepProgress}% {t.recipeStory.completedStepsLabel}
                      </div>
                    </div>
                    <div className="space-y-4">
                      {recipe.instructions.map((instruction, index) => {
                        const completed = completedSteps.has(index);

                        return (
                          <div
                            key={`${instruction.slice(0, 24)}-${index}`}
                            id={`step-${index + 1}`}
                            className={`rounded-[1.5rem] border p-5 transition-colors ${
                              completed
                                ? 'border-[rgba(53,84,65,0.18)] bg-[rgba(53,84,65,0.08)]'
                                : 'border-[rgba(98,67,45,0.1)] bg-[rgba(247,239,226,0.7)]'
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <button
                                type="button"
                                onClick={() => toggleStep(index)}
                                className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors cursor-pointer shrink-0 ${
                                  completed
                                    ? 'bg-[rgba(53,84,65,0.96)] text-white'
                                    : 'bg-[rgba(141,58,36,0.96)] text-white hover:bg-[rgba(141,58,36,0.9)]'
                                }`}
                              >
                                {completed ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                              </button>
                              <div className="space-y-2 min-w-0 flex-1">
                                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgba(112,83,59,0.72)]">{t.recipeStory.instructionsLabel} · {index + 1}</div>
                                <p className={`text-sm leading-8 sm:text-base ${completed ? 'text-[rgba(53,84,65,0.96)]' : 'text-[rgba(57,44,35,0.82)]'}`}>
                                  {instruction}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-5 md:grid-cols-2">
                  <Card className="border-white/60 bg-white/76 shadow-[0_20px_56px_rgba(52,34,22,0.08)] backdrop-blur-sm">
                    <CardContent className="space-y-4 p-6">
                      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgba(112,83,59,0.72)]">{t.recipeStory.progressLabel}</div>
                      <div className="space-y-4">
                        <div>
                          <div className="mb-2 flex items-center justify-between text-sm text-[rgba(57,44,35,0.72)]">
                            <span>{t.recipeStory.progressIngredients}</span>
                            <span>{checkedIngredients.size}/{recipe.ingredients.length}</span>
                          </div>
                          <div className="h-2 rounded-full bg-[rgba(98,67,45,0.08)]">
                            <div className="h-2 rounded-full bg-[rgba(53,84,65,0.96)]" style={{ width: `${progress.ingredientProgress}%` }} />
                          </div>
                        </div>
                        <div>
                          <div className="mb-2 flex items-center justify-between text-sm text-[rgba(57,44,35,0.72)]">
                            <span>{t.recipeStory.progressSteps}</span>
                            <span>{completedSteps.size}/{recipe.instructions.length}</span>
                          </div>
                          <div className="h-2 rounded-full bg-[rgba(98,67,45,0.08)]">
                            <div className="h-2 rounded-full bg-[rgba(141,58,36,0.96)]" style={{ width: `${progress.stepProgress}%` }} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-white/60 bg-white/76 shadow-[0_20px_56px_rgba(52,34,22,0.08)] backdrop-blur-sm">
                    <CardContent className="space-y-4 p-6">
                      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgba(112,83,59,0.72)]">{t.recipeStory.servingSuggestionLabel}</div>
                      <p className="text-sm leading-8 text-[rgba(57,44,35,0.76)] sm:text-base">
                        {recipe.servingSuggestions || `${recipe.name} · ${t.recipeStory.servingSuggestionLabel}`}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {relatedRecipes.length ? (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-7">
              <SectionHeading
                eyebrow={<SectionLabel>{locale === 'az' ? 'Növbəti dad' : 'Your next flavour'}</SectionLabel>}
                title={<>{locale === 'az' ? 'Bu resepti sevənlər üçün.' : 'If this recipe caught your eye.'}</>}
                description={locale === 'az'
                  ? 'Bənzər texnika, bölgə və dad quruluşuna görə seçilmiş reseptlər.'
                  : 'Continue with recipes connected by technique, region and flavour structure.'}
              />
              <div className="grid gap-5 md:grid-cols-3">
                {relatedRecipes.map((relatedRecipe) => (
                  <Link
                    key={relatedRecipe.id}
                    href={getLocalizedRecipePath(locale, relatedRecipe.slug)}
                    className="group overflow-hidden rounded-[1.5rem] border border-white/60 bg-white/76 shadow-[0_22px_60px_rgba(52,34,22,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(52,34,22,0.15)] sm:rounded-[2rem]"
                    onClick={() => trackEvent('related_recipe_opened', { from_recipe: recipe.slug, to_recipe: relatedRecipe.slug, locale })}
                  >
                    <div className="relative min-h-[220px] overflow-hidden">
                      <Image
                        src={getValidImageUrl(relatedRecipe.image)}
                        alt={relatedRecipe.imageAlt || relatedRecipe.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-transparent to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/68"><MapPin className="h-3.5 w-3.5" />{relatedRecipe.origin}</div>
                        <h3 className="display-title mt-2 text-3xl leading-none">{relatedRecipe.name}</h3>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 p-5 text-sm">
                      <span className="inline-flex items-center gap-2 text-[rgba(57,44,35,0.68)]"><Clock3 className="h-4 w-4" />{relatedRecipe.prepTime}</span>
                      <span className="font-semibold text-[rgba(141,58,36,0.96)]">{locale === 'az' ? 'Aç' : 'Open'} →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {recipe.sources?.length ? (
          <section className="px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <Card className="border-white/60 bg-white/76 shadow-[0_20px_56px_rgba(52,34,22,0.08)] backdrop-blur-sm">
                <CardContent className="p-6 sm:p-7">
                  <h2 className="text-xl font-semibold tracking-[-0.02em] text-foreground">{labels.sources}</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {recipe.sources.map((source) => (
                      <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 rounded-2xl border border-[rgba(98,67,45,0.1)] bg-[rgba(247,239,226,0.7)] px-4 py-3 text-sm text-[rgba(57,44,35,0.78)] transition-colors hover:bg-white">
                        <span>{source.title || new URL(source.url).hostname}</span>
                        <ExternalLink className="h-4 w-4 shrink-0" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        ) : null}

        <section className="px-4 pb-2 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <CtaBand
              eyebrow={<SectionLabel className="border-white/20 bg-white/10 text-white">{t.about.ctaContactLabel}</SectionLabel>}
              title={<>{t.about.ctaContactTitle}</>}
              description={t.about.ctaContactDesc}
              actions={
                <>
                  <Button asChild className="rounded-full bg-white px-6 text-[rgba(34,27,23,0.94)] hover:bg-white/90">
                    <Link href={getServicesUrl()}>{t.about.ctaContactBtn}</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-white/24 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white">
                    <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                  </Button>
                </>
              }
            />
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
