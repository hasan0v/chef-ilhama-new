'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChefHat,
  Clock3,
  History,
  MapPin,
  Printer,
  Share2,
  Sparkles,
  Users,
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import RecipeStructuredData from '@/components/recipe/RecipeStructuredData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  CtaBand,
  EditorialPanel,
  SectionHeading,
  SectionLabel,
} from '@/components/site/marketing';
import { getWhatsAppHref, siteConfig } from '@/lib/site';
import type { Recipe } from '@/types/recipe';
import { getValidImageUrl } from '@/utils/imageUtils';
import { useTranslation } from '@/hooks/useTranslation';

interface RecipeStoryPageProps {
  recipe: Recipe;
  breadcrumbs?: import('@/lib/seo').BreadcrumbItem[];
}

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

export default function RecipeStoryPage({ recipe, breadcrumbs }: RecipeStoryPageProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const { t, locale } = useTranslation();
  const isEn = locale === 'en';

  const getRecipesUrl = () => isEn ? '/en/recipes' : '/reseptler';
  const getServicesUrl = () => isEn ? '/en/services' : '/xidmetler';

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
      return next;
    });
  }

  async function handleShare() {
    const url = window.location.href;
    const title = isEn ? `${recipe.name} recipe` : `${recipe.name} resepti`;
    const text = isEn 
      ? `I want to share the recipe for ${recipe.name} from the ${recipe.origin} region.` 
      : `${recipe.origin} bölgəsindən ${recipe.name} reseptini paylaşmaq istəyirəm.`;

    if (navigator.share) {
      await navigator.share({ title, text, url });
      return;
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return;
    }

    window.prompt(isEn ? 'Copy link' : 'Linki kopyalayın', url);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <RecipeStructuredData recipe={recipe} />
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
                    <SectionLabel>{recipe.category || (isEn ? 'Azerbaijani cuisine' : 'Azərbaycan mətbəxi')}</SectionLabel>
                    <h1 className="display-title text-[clamp(2rem,6vw,5rem)] leading-[0.92] text-foreground">{recipe.name}</h1>
                    <p className="max-w-2xl text-base leading-8 text-[rgba(57,44,35,0.76)] sm:text-lg">
                      {recipe.history || (isEn 
                        ? `This recipe from the ${recipe.origin} region is presented with a cleaner and more convenient preparation flow while preserving its traditional taste character.`
                        : `${recipe.origin} bölgəsindən gələn bu resept ənənəvi dad xarakterini qoruyaraq daha oxunaqlı və rahat hazırlanma axını ilə təqdim olunur.`)}
                    </p>
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
                    alt={recipe.name}
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
              </div>
            </EditorialPanel>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
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
                            <span className={`flex h-8 w-8 items-center justify-center rounded-full ${checked ? 'bg-[rgba(53,84,65,0.96)] text-white' : 'bg-white text-[rgba(112,83,59,0.72)]'}`}>
                              {checked ? <Check className="h-4 w-4" /> : index + 1}
                            </span>
                            <span className={`text-sm leading-7 sm:text-base ${checked ? 'text-[rgba(53,84,65,0.96)] line-through' : 'text-[rgba(57,44,35,0.82)]'}`}>
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
                                className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                                  completed
                                    ? 'bg-[rgba(53,84,65,0.96)] text-white'
                                    : 'bg-[rgba(141,58,36,0.96)] text-white hover:bg-[rgba(141,58,36,0.9)]'
                                }`}
                              >
                                {completed ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
                              </button>
                              <div className="space-y-2">
                                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgba(112,83,59,0.72)]">{isEn ? 'Step' : 'Addım'} {index + 1}</div>
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
                        {recipe.servingSuggestions || (isEn 
                          ? `${recipe.name} is best presented with a simple, light service and balanced side options.`
                          : `${recipe.name} sadə, işıqlı servis və balanslı yan əlavələrlə təqdim edildikdə daha yaxşı açılır.`)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-2 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <CtaBand
              eyebrow={<SectionLabel className="border-white/20 bg-white/10 text-white">Chef service</SectionLabel>}
              title={<>{isEn ? "If you wish to experience these flavors with professional service, the next step is event planning." : "Bu dadları peşəkar servis ilə yaşamaq istəyirsinizsə, növbəti addım tədbir planlamasıdır."}</>}
              description={isEn ? "Bring these flavors to your event with our culinary services." : "Xidmətlərimizlə bu dadları tədbirinizdə yaşadın."}
              actions={
                <>
                  <Button asChild className="rounded-full bg-white px-6 text-[rgba(34,27,23,0.94)] hover:bg-white/90">
                    <Link href={getServicesUrl()}>{isEn ? "View Services" : "Xidmətləri gör"}</Link>
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
