import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock3, MapPin, Search, Sparkles, Users } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EditorialPanel, SectionHeading, SectionLabel } from '@/components/site/marketing';
import { getCollectionsPath, type CollectionLocale, type RecipeCollectionDefinition } from '@/lib/recipeCollections';
import { getLocalizedRecipePath, getLocalizedRecipesPath } from '@/lib/localeRoutes';
import type { Recipe } from '@/types/recipe';
import { getValidImageUrl } from '@/utils/imageUtils';

interface RecipeCollectionDetailPageProps {
  locale: CollectionLocale;
  collection: RecipeCollectionDefinition;
  recipes: Recipe[];
  breadcrumbs: import('@/lib/seo').BreadcrumbItem[];
}

export default function RecipeCollectionDetailPage({ locale, collection, recipes, breadcrumbs }: RecipeCollectionDetailPageProps) {
  const isAz = locale === 'az';
  const leadRecipe = recipes[0];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <article className="space-y-12 lg:space-y-16">
        <section className="px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
          <div className="mx-auto max-w-7xl">
            <EditorialPanel className="overflow-hidden p-0">
              <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
                <div className="relative min-h-[360px] overflow-hidden lg:min-h-[640px]">
                  {leadRecipe ? (
                    <Image
                      src={getValidImageUrl(leadRecipe.image)}
                      alt={leadRecipe.imageAlt || leadRecipe.name}
                      fill
                      priority
                      fetchPriority="high"
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      className="object-cover"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white sm:bottom-8 sm:left-8 sm:right-8">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/68">
                      {leadRecipe?.origin} · {leadRecipe?.category}
                    </div>
                    <div className="display-title mt-2 text-4xl">{leadRecipe?.name}</div>
                  </div>
                </div>

                <div className="mesh-surface flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                  <div className="flex flex-wrap items-center gap-3">
                    <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 hover:bg-white">
                      <Link href={getCollectionsPath(locale)}>
                        <ArrowLeft className="h-4 w-4" />
                        {isAz ? 'Kolleksiyalar' : 'Collections'}
                      </Link>
                    </Button>
                    <SectionLabel>{collection.eyebrow[locale]}</SectionLabel>
                  </div>
                  <h1 className="display-title mt-7 text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.84] text-foreground">
                    {collection.title[locale]}
                  </h1>
                  <p className="mt-7 max-w-2xl text-base leading-8 text-[rgba(57,44,35,0.74)] sm:text-lg">
                    {collection.description[locale]}
                  </p>
                  <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
                    {collection.highlights[locale].map((item) => (
                      <div key={item.label} className="rounded-[1.25rem] border border-[rgba(98,67,45,0.1)] bg-white/66 p-3 sm:p-4">
                        <div className="text-lg font-semibold text-foreground sm:text-2xl">{item.value}</div>
                        <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[rgba(112,83,59,0.68)] sm:text-xs">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </EditorialPanel>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionLabel>{isAz ? 'Bu bələdçi haqqında' : 'About this guide'}</SectionLabel>
              <h2 className="display-title mt-5 text-5xl leading-[0.94] text-foreground">
                {isAz ? 'Eyni mövzunun fərqli mətbəxlərdə cavabı.' : 'Different kitchens answering the same appetite.'}
              </h2>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[rgba(98,67,45,0.12)] bg-white/62 px-4 py-2 text-xs font-semibold uppercase tracking-[0.17em] text-[rgba(112,83,59,0.76)]">
                <Search className="h-3.5 w-3.5" /> {collection.searchIntent[locale]}
              </div>
            </div>
            <div className="space-y-5">
              {collection.introduction[locale].map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-lg leading-9 text-[rgba(57,44,35,0.78)] sm:text-xl sm:leading-10">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <SectionHeading
              eyebrow={<SectionLabel>{isAz ? 'Bişirmə marşrutu' : 'The cooking trail'}</SectionLabel>}
              title={<>{isAz ? `${recipes.length} fərqli dayanacaq.` : `${recipes.length} distinct stops.`}</>}
              description={isAz
                ? 'Hər kart yeni reseptə yox, yeni texnikaya və dad quruluşuna açılan qapıdır.'
                : 'Each card opens a new technique and flavour structure—not merely another recipe.'}
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {recipes.map((recipe, index) => (
                <Link key={recipe.id} href={getLocalizedRecipePath(locale, recipe.slug)} className="group block">
                  <Card className="h-full overflow-hidden border-white/60 bg-white/78 shadow-[0_24px_64px_rgba(52,34,22,0.08)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_28px_76px_rgba(52,34,22,0.16)]">
                    <div className="relative min-h-[260px] overflow-hidden">
                      <Image
                        src={getValidImageUrl(recipe.image)}
                        alt={recipe.imageAlt || recipe.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-transparent to-black/8" />
                      <div className="absolute left-5 top-5 rounded-full border border-white/22 bg-black/16 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/68">
                          <MapPin className="h-3.5 w-3.5" /> {recipe.origin}
                        </div>
                        <h2 className="display-title mt-2 text-4xl leading-[0.94]">{recipe.name}</h2>
                      </div>
                    </div>
                    <CardContent className="flex min-h-[220px] flex-col justify-between p-6">
                      <div>
                        <p className="line-clamp-3 text-sm leading-7 text-[rgba(57,44,35,0.72)]">{recipe.history}</p>
                        <div className="mt-5 flex flex-wrap gap-2 text-xs text-[rgba(57,44,35,0.7)]">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(247,239,226,0.9)] px-3 py-1.5"><Clock3 className="h-3.5 w-3.5" />{recipe.prepTime}</span>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(247,239,226,0.9)] px-3 py-1.5"><Users className="h-3.5 w-3.5" />{recipe.servings}</span>
                        </div>
                      </div>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[rgba(141,58,36,0.96)]">
                        {isAz ? 'Resepti bişir' : 'Cook this recipe'} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <EditorialPanel className="p-7 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
                <div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(201,150,69,0.18)] text-[rgba(141,58,36,0.96)]"><Sparkles className="h-5 w-5" /></div>
                  <h2 className="display-title mt-5 text-5xl leading-[0.94] text-foreground">{isAz ? 'Qısa cavablar' : 'Quick answers'}</h2>
                  <p className="mt-4 text-sm leading-7 text-[rgba(57,44,35,0.68)]">
                    {isAz ? 'Bişirməyə başlamazdan əvvəl ən çox yaranan suallar.' : 'The questions most likely to come up before you cook.'}
                  </p>
                </div>
                <div className="space-y-3">
                  {collection.faqs[locale].map((faq) => (
                    <details key={faq.question} className="group rounded-[1.4rem] border border-[rgba(98,67,45,0.1)] bg-white/66 p-5 open:bg-white/84">
                      <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-foreground marker:hidden">{faq.question}</summary>
                      <p className="mt-4 text-sm leading-7 text-[rgba(57,44,35,0.72)] sm:text-base">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </EditorialPanel>
          </div>
        </section>

        <section className="px-4 pb-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[1.5rem] bg-[rgba(36,28,24,0.96)] p-7 text-white shadow-[0_28px_90px_rgba(36,28,24,0.22)] sm:rounded-[2rem] sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/54">{isAz ? 'Növbəti dad' : 'Your next flavour'}</div>
                <h2 className="display-title mt-3 text-4xl sm:text-5xl">{isAz ? 'Bütün reseptlər arasında öz seçimini tap.' : 'Find your own route through every recipe.'}</h2>
              </div>
              <Button asChild className="shrink-0 rounded-full bg-white px-6 text-[rgba(36,28,24,0.96)] hover:bg-white/90">
                <Link href={getLocalizedRecipesPath(locale)}>{isAz ? 'Kataloqu aç' : 'Open the catalog'} <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </section>
      </article>
    </PageLayout>
  );
}
