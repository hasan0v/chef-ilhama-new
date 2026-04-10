'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpenText,
  CalendarRange,
  ChefHat,
  Crown,
  MapPin,
  PhoneCall,
  Sparkles,
  Star,
  TimerReset,
  Utensils,
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  CtaBand,
  EditorialPanel,
  InfoCard,
  MetricCard,
  PageHero,
  SectionHeading,
  SectionLabel,
} from '@/components/site/marketing';
import { getWhatsAppHref, siteConfig } from '@/lib/site';
import type { Recipe } from '@/types/recipe';
import { getValidImageUrl } from '@/utils/imageUtils';

interface HomeExperienceProps {
  featuredRecipes: Recipe[];
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

const signatureServices = [
  {
    icon: <ChefHat className="h-5 w-5" />,
    title: 'Private chef axşamları',
    description: 'Evdə və ya xüsusi məkanda butik servis, zərif plating və qonaq axınına uyğun menyu planlaması.',
    meta: 'Personal dining',
  },
  {
    icon: <Crown className="h-5 w-5" />,
    title: 'Toy və nişan masaları',
    description: 'Ənənəvi Azərbaycan süfrəsini daha müasir təqdimat və dəqiq istehsalat planı ilə qururuq.',
    meta: 'Event catering',
  },
  {
    icon: <Utensils className="h-5 w-5" />,
    title: 'Korporativ katerinq',
    description: 'Launch, təqdimat və qapalı biznes tədbirləri üçün premium catering formatları.',
    meta: 'Corporate service',
  },
];

const serviceFlow = [
  {
    step: '01',
    title: 'Qısa brifinq',
    description: 'Qonaq sayı, məkan, büdcə və servis tərzi bir neçə sualla aydınlaşdırılır.',
  },
  {
    step: '02',
    title: 'Menyu kurasiyası',
    description: 'Regional dadlar və tədbirin tonu əsasında sizə uyğun süfrə strukturu qurulur.',
  },
  {
    step: '03',
    title: 'İcra və təqdimat',
    description: 'Hazırlıq, servis ritmi və vizual təqdimat vahid standartla idarə olunur.',
  },
];

const faqItems = [
  {
    question: 'Rezervasiya üçün nə qədər əvvəl müraciət etməliyəm?',
    answer:
      'Kiçik private dining axşamları üçün ən azı 48 saat, toy və böyük tədbirlər üçün isə 7-14 gün əvvəl müraciət etməyiniz tövsiyə olunur.',
  },
  {
    question: 'Xüsusi pəhriz və menyu tələbləri nəzərə alınır?',
    answer:
      'Bəli. Vegetarian, halal, şəkərsiz, uşaq menyusu və fərdi qida məhdudiyyətlərinə uyğun menyu ayrıca qurulur.',
  },
  {
    question: 'Hansı ərazilərdə xidmət göstərilir?',
    answer: `${siteConfig.serviceAreas.join(', ')} və yaxın ərazilərdə xidmət göstərilir. Şəhərdən kənar tədbirlər üçün ayrıca logistika planlanır.`,
  },
  {
    question: 'Reseptlər bölməsi nə üçündür?',
    answer:
      'Saytda paylaşdığımız reseptlər Chef İlhamənin kulinariya üslubunu və regional məhsullara yanaşmasını görmək üçündür.',
  },
];

export default function HomeExperience({ featuredRecipes, stats }: HomeExperienceProps) {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const highlightedRecipes = featuredRecipes.slice(0, 6);

  return (
    <PageLayout>
      <div className="space-y-12 lg:space-y-16">
        <PageHero
          eyebrow={<SectionLabel>Bakıda premium private chef və catering</SectionLabel>}
          title={
            <>
              Azərbaycan süfrəsini
              <br />
              yeni nəsil zərifliklə təqdim edirik.
            </>
          }
          description="Chef İlhamə klassik regional dadları müasir servis ritmi, təmiz estetika və tədbir mərkəzli planlama ilə birləşdirir. Nəticə yalnız yemək deyil, tam bir qonaqpərvərlik təcrübəsidir."
          actions={
            <>
              <Button asChild size="lg" className="rounded-full bg-[rgba(141,58,36,0.96)] px-6 text-white shadow-[0_14px_34px_rgba(141,58,36,0.24)] hover:bg-[rgba(141,58,36,0.9)]">
                <Link href="/xidmetler">
                  Xidməti planla
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-6 text-[rgba(57,44,35,0.82)] hover:bg-white">
                <Link href="/reseptler">
                  Reseptləri kəşf et
                  <BookOpenText className="h-4 w-4" />
                </Link>
              </Button>
            </>
          }
          stats={[
            { value: `${stats.totalRecipes}+`, label: 'resept' },
            { value: `${stats.totalRegions}`, label: 'bölgə' },
            { value: '15+', label: 'il təcrübə' },
          ]}
          aside={
            <div className="space-y-4">
              <EditorialPanel className="p-6 sm:p-7">
                <div className="space-y-5">
                  <SectionLabel className="bg-[rgba(141,58,36,0.08)]">Bu həftə açıq tarixlər</SectionLabel>
                  <div className="space-y-3">
                    <h3 className="display-title text-4xl leading-[0.95] text-foreground">Süfrə yalnız yemək deyil, ritmdir.</h3>
                    <p className="text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base">
                      Menyu, servis tempi və qonaq təcrübəsi vahid ssenari kimi qurulur. Kiçik private dinner-dan toy masasına qədər.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <div className="rounded-[1.4rem] border border-[rgba(98,67,45,0.1)] bg-white/72 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(112,83,59,0.72)]">Əlaqə</div>
                      <a href={siteConfig.phoneHref} className="mt-2 block text-lg font-semibold text-foreground">
                        {siteConfig.phoneDisplay}
                      </a>
                    </div>
                    <div className="rounded-[1.4rem] border border-[rgba(98,67,45,0.1)] bg-white/72 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(112,83,59,0.72)]">Xidmət sahələri</div>
                      <div className="mt-2 text-sm leading-7 text-[rgba(57,44,35,0.76)]">{siteConfig.serviceAreas.join(' · ')}</div>
                    </div>
                  </div>
                  <Button asChild className="w-full rounded-full bg-[rgba(53,84,65,0.96)] text-white hover:bg-[rgba(53,84,65,0.88)]">
                    <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">
                      <PhoneCall className="h-4 w-4" />
                      WhatsApp ilə başla
                    </a>
                  </Button>
                </div>
              </EditorialPanel>
            </div>
          }
        />

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-5 md:grid-cols-3">
              <MetricCard value={`${stats.featuredRecipes}`} label="seçilmiş kolleksiya" detail="Hər biri təqdimat və ləzzət balansına görə seçilmiş reseptlər." />
              <MetricCard value={`${stats.difficultyBreakdown.easy}`} label="asan start" detail="Evdə rahat başlamaq üçün daha əlçatan texnikalar." />
              <MetricCard value={`${stats.difficultyBreakdown.hard}`} label="ustalıq səviyyəsi" detail="Daha dərin texnika və daha güclü regional xarakter." />
            </div>
            <EditorialPanel className="mesh-surface flex items-center p-6 sm:p-8">
              <div className="grid gap-6 md:grid-cols-2 md:items-center">
                <div>
                  <SectionLabel>Signature approach</SectionLabel>
                  <h2 className="display-title mt-4 text-4xl leading-[0.96] text-foreground sm:text-5xl">Regional dad, studiovari təqdimat.</h2>
                </div>
                <p className="text-sm leading-8 text-[rgba(57,44,35,0.76)] sm:text-base">
                  Hər tədbirdə regional dad, seçilmiş menyu və zərif təqdimat birləşir.
                </p>
              </div>
            </EditorialPanel>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <SectionHeading
              eyebrow={<SectionLabel>Xidmət konturları</SectionLabel>}
              title={<>Qonağın yaddaşında qalan hissə yalnız dad deyil, bütün quruluşdur.</>}
              description="Menyu, servis və təqdimat birlikdə planlanır."
            />
            <div className="grid gap-5 lg:grid-cols-3">
              {signatureServices.map((service) => (
                <InfoCard key={service.title} icon={service.icon} title={service.title} description={service.description} meta={service.meta} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <SectionHeading
              eyebrow={<SectionLabel>Seçilmiş reseptlər</SectionLabel>}
              title={<>Mətbəxin xarakterini resept kolleksiyası ilə hiss edin.</>}
              description="Bölgə, tarix və təqdimat düşüncəsi hər reseptdə hiss olunur."
              actions={
                <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-5 hover:bg-white">
                  <Link href="/reseptler">Bütün reseptlərə keç</Link>
                </Button>
              }
            />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {highlightedRecipes.map((recipe, index) => (
                <Card key={recipe.id} className={`overflow-hidden border-white/60 bg-white/76 shadow-[0_24px_64px_rgba(52,34,22,0.08)] backdrop-blur-sm ${index === 0 ? 'md:col-span-2 md:grid md:grid-cols-[1.05fr_0.95fr]' : ''}`}>
                  <div className={`relative min-h-[260px] overflow-hidden ${index === 0 ? 'md:min-h-full' : ''}`}>
                    <Image
                      src={getValidImageUrl(recipe.image)}
                      alt={recipe.name}
                      fill
                      className="object-cover"
                      sizes={index === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 1280px) 50vw, 33vw'}
                      priority={index < 2}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/18 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                          <MapPin className="h-3.5 w-3.5" />
                          {recipe.origin}
                        </div>
                        <h3 className="mt-3 max-w-md text-2xl font-semibold tracking-[-0.04em] text-white">{recipe.name}</h3>
                      </div>
                      {recipe.featured ? (
                        <div className="rounded-full bg-[rgba(201,150,69,0.92)] p-2 text-white shadow-lg">
                          <Star className="h-4 w-4" />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <CardContent className="space-y-5 p-6">
                    <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(112,83,59,0.72)]">
                      <span>{recipe.category}</span>
                      <span>•</span>
                      <span>{recipe.prepTime}</span>
                      <span>•</span>
                      <span>{recipe.difficulty}</span>
                    </div>
                    <p className="line-clamp-3 text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base">{recipe.history}</p>
                    <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-transparent hover:bg-[rgba(255,251,246,0.9)]">
                      <Link href={`/resept/${recipe.slug}`}>
                        Resepti aç
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <SectionHeading
              eyebrow={<SectionLabel>İş axını</SectionLabel>}
              title={<>Sifarişdən servis anına qədər proses sadə, amma ciddi qurulur.</>}
              description="Hər layihə eyni ardıcıllıqla idarə olunur."
            />
            <div className="grid gap-5 lg:grid-cols-3">
              {serviceFlow.map((item) => (
                <EditorialPanel key={item.step} className="p-6 sm:p-7">
                  <div className="space-y-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(112,83,59,0.72)]">Mərhələ {item.step}</div>
                    <h3 className="display-title text-3xl text-foreground">{item.title}</h3>
                    <p className="text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base">{item.description}</p>
                  </div>
                </EditorialPanel>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <EditorialPanel className="mesh-surface p-6 sm:p-8">
                <div className="space-y-5">
                  <SectionLabel>Tez cavablar</SectionLabel>
                  <h2 className="display-title text-4xl leading-[0.96] text-foreground sm:text-5xl">Tez-tez verilən suallar</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.4rem] border border-[rgba(98,67,45,0.1)] bg-white/70 p-4">
                      <CalendarRange className="h-5 w-5 text-[rgba(141,58,36,0.96)]" />
                      <div className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-[rgba(112,83,59,0.72)]">Planlama</div>
                      <p className="mt-2 text-sm leading-7 text-[rgba(57,44,35,0.76)]">Məkan, qonaq sayı və servis formatı əsas qərar sütunlarıdır.</p>
                    </div>
                    <div className="rounded-[1.4rem] border border-[rgba(98,67,45,0.1)] bg-white/70 p-4">
                      <TimerReset className="h-5 w-5 text-[rgba(53,84,65,0.96)]" />
                      <div className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-[rgba(112,83,59,0.72)]">Çeviklik</div>
                      <p className="mt-2 text-sm leading-7 text-[rgba(57,44,35,0.76)]">Uyğun olduqda təcili tarixlər üçün də qısa planlama edilir.</p>
                    </div>
                  </div>
                </div>
              </EditorialPanel>
              <div className="space-y-3">
                {faqItems.map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <Card key={faq.question} className="border-white/60 bg-white/76 shadow-[0_18px_52px_rgba(52,34,22,0.08)] backdrop-blur-sm">
                      <CardContent className="p-0">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                          onClick={() => setOpenFaq(isOpen ? -1 : index)}
                        >
                          <span className="text-base font-semibold tracking-[-0.02em] text-foreground sm:text-lg">{faq.question}</span>
                          <span className={`flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(98,67,45,0.12)] text-[rgba(141,58,36,0.96)] transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}>
                            <Sparkles className="h-4 w-4" />
                          </span>
                        </button>
                        {isOpen ? (
                          <div className="px-6 pb-6 text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base">{faq.answer}</div>
                        ) : null}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-2 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <CtaBand
              eyebrow={<SectionLabel className="border-white/20 bg-white/10 text-white">Chef İlhamə atelier</SectionLabel>}
              title={<>Növbəti tədbirinizi standart catering kimi yox, xüsusi təcrübə kimi qurun.</>}
              description="Süfrənizi xüsusi etmək istəyirsinizsə, planlamaya indi başlayın."
              actions={
                <>
                  <Button asChild className="rounded-full bg-white px-6 text-[rgba(34,27,23,0.94)] hover:bg-white/90">
                    <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">
                      WhatsApp rezervasiya
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-white/24 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white">
                    <Link href="/elaqe">Əlaqə səhifəsi</Link>
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
