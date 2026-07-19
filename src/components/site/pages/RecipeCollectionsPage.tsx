import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Compass, MapPin, Search, Sparkles } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EditorialPanel, SectionHeading, SectionLabel } from '@/components/site/marketing';
import {
  getCollectionPath,
  recipeCollections,
  type CollectionLocale,
} from '@/lib/recipeCollections';
import type { Recipe } from '@/types/recipe';
import { getValidImageUrl } from '@/utils/imageUtils';
import { getGuidePath } from '@/lib/underrepresentedDishesGuide';

interface RecipeCollectionsPageProps {
  locale: CollectionLocale;
  recipes: Recipe[];
  breadcrumbs: import('@/lib/seo').BreadcrumbItem[];
}

const accentClasses = {
  terracotta: 'from-[rgba(141,58,36,0.88)] to-[rgba(93,38,27,0.94)]',
  forest: 'from-[rgba(53,84,65,0.9)] to-[rgba(30,54,41,0.96)]',
  saffron: 'from-[rgba(180,119,38,0.9)] to-[rgba(122,73,22,0.96)]',
  ink: 'from-[rgba(50,44,40,0.9)] to-[rgba(28,24,22,0.97)]',
};

export default function RecipeCollectionsPage({ locale, recipes, breadcrumbs }: RecipeCollectionsPageProps) {
  const isAz = locale === 'az';
  const recipesBySlug = new Map(recipes.map((recipe) => [recipe.slug, recipe]));
  const leadCollection = recipeCollections[0];
  const leadRecipe = recipesBySlug.get(leadCollection.recipeSlugs[0]);

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-12 lg:space-y-16">
        <section className="px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
          <div className="mx-auto max-w-7xl">
            <EditorialPanel className="overflow-hidden p-0">
              <div className="grid min-h-[540px] lg:grid-cols-[1.02fr_0.98fr]">
                <div className="relative z-10 flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                  <SectionLabel>{isAz ? 'Dad üzrə kəşf atlası' : 'A taste-led discovery atlas'}</SectionLabel>
                  <h1 className="display-title mt-6 max-w-3xl text-[clamp(3.2rem,7vw,6.8rem)] leading-[0.82] text-foreground">
                    {isAz ? 'Dünyanı bir reseptlə kəşf et.' : 'Explore the world, one recipe at a time.'}
                  </h1>
                  <p className="mt-7 max-w-xl text-base leading-8 text-[rgba(57,44,35,0.74)] sm:text-lg">
                    {isAz
                      ? 'Ölkəyə görə yox, marağınıza görə başlayın: soyuq əriştələr, ferment dadları, sürətli yeməklər və internetdə az görünən regional klassiklər.'
                      : 'Start with an appetite, not a country: cold noodles, fermented flavours, fast regional cooking and traditional dishes the internet has overlooked.'}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild className="rounded-full bg-[rgba(141,58,36,0.96)] px-6 text-white hover:bg-[rgba(141,58,36,0.9)]">
                      <Link href={getCollectionPath(locale, leadCollection.slug)}>
                        <Compass className="h-4 w-4" />
                        {isAz ? 'İlk marşrutu aç' : 'Open the first trail'}
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-6 hover:bg-white">
                      <Link href={locale === 'az' ? '/reseptler' : '/en/recipes'}>
                        <Search className="h-4 w-4" />
                        {isAz ? 'Bütün reseptlər' : 'All recipes'}
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="relative min-h-[340px] overflow-hidden lg:min-h-full">
                  {leadRecipe ? (
                    <Image
                      src={getValidImageUrl(leadRecipe.image)}
                      alt={leadRecipe.imageAlt || leadRecipe.name}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/74 via-black/12 to-transparent lg:bg-gradient-to-r lg:from-[rgba(247,239,226,0.38)] lg:via-transparent lg:to-black/10" />
                  <div className="absolute bottom-6 left-6 right-6 rounded-[1.5rem] border border-white/18 bg-black/24 p-5 text-white backdrop-blur-md">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/68">
                      {isAz ? 'Başlanğıc nöqtəsi' : 'Starting point'}
                    </div>
                    <div className="mt-2 text-xl font-semibold">{leadRecipe?.name || leadCollection.shortTitle[locale]}</div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-white/72">
                      <MapPin className="h-4 w-4" /> {leadRecipe?.origin}
                    </div>
                  </div>
                </div>
              </div>
            </EditorialPanel>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <Link href={getGuidePath(locale)} className="group mx-auto grid max-w-7xl overflow-hidden rounded-[1.5rem] bg-[rgba(36,28,24,0.97)] text-white shadow-[0_28px_90px_rgba(36,28,24,0.2)] sm:rounded-[2rem] lg:grid-cols-[0.22fr_1fr_auto] lg:items-center">
            <div className="relative flex min-h-[150px] items-center justify-center overflow-hidden bg-[rgba(227,173,100,0.92)] text-[rgba(36,28,24,0.96)] lg:min-h-[190px]">
              <span className="display-title text-8xl leading-none transition-transform duration-500 group-hover:scale-105">50</span>
              <BookOpen className="absolute bottom-4 right-4 h-5 w-5 opacity-50" />
            </div>
            <div className="p-6 sm:p-8">
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[rgba(227,173,100,0.9)]">{isAz ? 'Yeni əsas bələdçi' : 'New flagship guide'}</div>
              <h2 className="display-title mt-3 text-4xl leading-[0.94] sm:text-5xl">{isAz ? 'Kəşf etməyə dəyər 50 nadir regional yemək' : '50 underrepresented regional dishes worth discovering'}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/62 sm:text-base">{isAz ? '39 ölkə, 6 marşrut və internetdə az görünən 50 bişirilə bilən resept.' : 'Thirty-nine countries, six routes and 50 cookable recipes the wider web tends to overlook.'}</p>
            </div>
            <div className="flex items-center gap-2 px-6 pb-7 text-sm font-semibold text-[rgba(227,173,100,0.96)] lg:px-9 lg:pb-0">
              {isAz ? 'Atlası aç' : 'Open the atlas'} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <SectionHeading
              eyebrow={<SectionLabel>{isAz ? 'Kolleksiyalar' : 'Curated trails'}</SectionLabel>}
              title={<>{isAz ? 'Nə bişirmək istədiyini hisslə seç.' : 'Choose by the feeling you want to cook.'}</>}
              description={isAz
                ? 'Hər səhifə sadəcə filter deyil — reseptləri texnika, dad və axtarış niyyəti ilə birləşdirən redaksiya bələdçisidir.'
                : 'Each page is an editorial guide—not a thin filter—connecting recipes through technique, flavour and real search intent.'}
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {recipeCollections.map((collection, index) => {
                const imageRecipe = collection.recipeSlugs
                  .map((slug) => recipesBySlug.get(slug))
                  .find(Boolean);

                return (
                  <Link key={collection.slug} href={getCollectionPath(locale, collection.slug)} className="group block">
                    <Card className="h-full overflow-hidden border-white/60 bg-white/78 shadow-[0_24px_64px_rgba(52,34,22,0.08)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_28px_76px_rgba(52,34,22,0.16)]">
                      <div className="relative min-h-[250px] overflow-hidden">
                        {imageRecipe ? (
                          <Image
                            src={getValidImageUrl(imageRecipe.image)}
                            alt={imageRecipe.imageAlt || imageRecipe.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                        ) : null}
                        <div className={`absolute inset-0 bg-gradient-to-t ${accentClasses[collection.accent]} opacity-76 mix-blend-multiply`} />
                        <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3 text-white">
                          <span className="rounded-full border border-white/24 bg-black/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] backdrop-blur-sm">
                            0{index + 1} · {collection.recipeSlugs.length} {isAz ? 'resept' : 'recipes'}
                          </span>
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <div className="absolute bottom-5 left-5 right-5 text-white">
                          <div className="text-[11px] font-semibold uppercase tracking-[0.23em] text-white/68">{collection.eyebrow[locale]}</div>
                          <h2 className="display-title mt-2 text-4xl leading-[0.94]">{collection.shortTitle[locale]}</h2>
                        </div>
                      </div>
                      <CardContent className="flex min-h-[220px] flex-col justify-between p-6">
                        <p className="text-sm leading-7 text-[rgba(57,44,35,0.72)] sm:text-base">{collection.description[locale]}</p>
                        <div className="mt-6 flex items-center justify-between gap-4">
                          <span className="line-clamp-1 text-xs font-semibold uppercase tracking-[0.18em] text-[rgba(112,83,59,0.72)]">
                            {collection.searchIntent[locale]}
                          </span>
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(141,58,36,0.96)] text-white transition-transform group-hover:translate-x-1">
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 pb-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <EditorialPanel className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <div>
                <SectionLabel>{isAz ? 'Redaksiya prinsipi' : 'Editorial principle'}</SectionLabel>
                <h2 className="display-title mt-5 text-5xl leading-[0.94] text-foreground">
                  {isAz ? 'Trendə qaçmırıq. Dəyərli boşluğu tapırıq.' : 'We do not chase a trend. We find the useful gap.'}
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { n: '01', title: isAz ? 'Real maraq' : 'Real interest', text: isAz ? 'İnsanların artıq axtardığı mövzular.' : 'Topics people are already trying to find.' },
                  { n: '02', title: isAz ? 'Aşağı təkrar' : 'Less repetition', text: isAz ? 'Minlərlə eyni reseptin əvəzinə informasiya boşluğu.' : 'Information gaps instead of the thousandth copy.' },
                  { n: '03', title: isAz ? 'Bişirilə bilən' : 'Actually cookable', text: isAz ? 'Ölçü, addım və mənbəsi görünən praktik resept.' : 'Practical recipes with measures, steps and sources.' },
                ].map((item) => (
                  <div key={item.n} className="rounded-[1.5rem] border border-[rgba(98,67,45,0.1)] bg-white/64 p-5">
                    <div className="text-xs font-bold tracking-[0.22em] text-[rgba(141,58,36,0.88)]">{item.n}</div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[rgba(57,44,35,0.68)]">{item.text}</p>
                  </div>
                ))}
              </div>
            </EditorialPanel>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
