'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Award, BookOpenText, ChefHat, HeartHandshake, MapPin, UtensilsCrossed } from 'lucide-react';
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
import { useTranslation } from '@/hooks/useTranslation';

export default function AboutStudioPage({ breadcrumbs }: { breadcrumbs?: import('@/lib/seo').BreadcrumbItem[] } = {}) {
  const { t, locale } = useTranslation();
  const isEn = locale === 'en';

  const getRecipesUrl = () => isEn ? '/en/recipes' : '/reseptler';
  const getServicesUrl = () => isEn ? '/en/services' : '/xidmetler';

  const values = [
    {
      icon: <UtensilsCrossed className="h-5 w-5" />,
      title: t.about.value1Title,
      description: t.about.value1Desc,
      meta: t.about.value1Meta,
    },
    {
      icon: <BookOpenText className="h-5 w-5" />,
      title: t.about.value2Title,
      description: t.about.value2Desc,
      meta: t.about.value2Meta,
    },
    {
      icon: <HeartHandshake className="h-5 w-5" />,
      title: t.about.value3Title,
      description: t.about.value3Desc,
      meta: t.about.value3Meta,
    },
  ];

  const timeline = [
    {
      year: '2009',
      title: t.about.timeline1Title,
      description: t.about.timeline1Desc,
    },
    {
      year: '2016',
      title: t.about.timeline2Title,
      description: t.about.timeline2Desc,
    },
    {
      year: '2025',
      title: t.about.timeline3Title,
      description: t.about.timeline3Desc,
    },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-12 lg:space-y-16">
        <PageHero
          eyebrow={<SectionLabel>{t.about.brandStoryLabel}</SectionLabel>}
          title={<>{t.about.heroTitle}</>}
          description={t.about.heroDesc}
          stats={[
            { value: '15+', label: t.about.experienceLabel },
            { value: '50+', label: t.about.selectedRecipesLabel },
            { value: '1000+', label: t.about.clientsLabel },
          ]}
          actions={
            <>
              <Button asChild className="rounded-full bg-[rgba(141,58,36,0.96)] px-6 text-white hover:bg-[rgba(141,58,36,0.9)]">
                <Link href={getRecipesUrl()}>{t.nav.recipes}</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-6 hover:bg-white">
                <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">{t.footer.chatWhatsAppBtn}</a>
              </Button>
            </>
          }
          aside={
            <EditorialPanel className="overflow-hidden p-3 sm:p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem]">
                <Image
                  src="/ilhama.png"
                  alt="Chef İlhamə"
                  fill
                  sizes="(max-width: 1024px) 100vw, 32vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/18 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                  Chef İlhamə atelier
                </div>
              </div>
            </EditorialPanel>
          }
        />

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.05fr_0.95fr]">
            <EditorialPanel className="mesh-surface p-6 sm:p-8">
              <div className="space-y-5 text-left">
                <SectionLabel>{t.about.missionLabel}</SectionLabel>
                <h2 className="display-title text-4xl leading-[0.96] text-foreground sm:text-5xl">{t.about.missionTitle}</h2>
                <p className="text-sm leading-8 text-[rgba(57,44,35,0.76)] sm:text-base">
                  {t.about.missionDesc}
                </p>
              </div>
            </EditorialPanel>
            <div className="grid gap-5 sm:grid-cols-2">
              <MetricCard value="25+" label={t.about.regionMotifsLabel} detail={t.about.regionMotifsDesc} />
              <MetricCard value="3" label={t.about.principlesLabel} detail={t.about.principlesDesc} />
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <SectionHeading
              eyebrow={<SectionLabel>{t.about.valuesHeading}</SectionLabel>}
              title={<>{t.about.valuesTitle}</>}
              description={t.about.valuesDesc}
            />
            <div className="grid gap-5 lg:grid-cols-3">
              {values.map((value) => (
                <InfoCard key={value.title} icon={value.icon} title={value.title} description={value.description} meta={value.meta} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <EditorialPanel className="p-6 sm:p-8">
              <div className="space-y-5 text-left">
                <SectionLabel>{t.about.positioningLabel}</SectionLabel>
                <h2 className="display-title text-4xl leading-[0.96] text-foreground sm:text-5xl">{t.about.positioningTitle}</h2>
                <p className="text-sm leading-8 text-[rgba(57,44,35,0.76)] sm:text-base">
                  {isEn ? siteConfig.serviceAreas.map(area => area === 'Bakı' ? 'Baku' : area).join(', ') : siteConfig.serviceAreas.join(', ')} {t.about.positioningDesc}
                </p>
                <div className="rounded-[1.5rem] border border-[rgba(98,67,45,0.1)] bg-white/72 p-5 text-sm leading-7 text-[rgba(57,44,35,0.76)]">
                  {t.about.positioningHighlight}
                </div>
              </div>
            </EditorialPanel>
            <div className="space-y-4 text-left">
              {timeline.map((item) => (
                <Card key={item.year} className="border-white/60 bg-white/76 shadow-[0_20px_56px_rgba(52,34,22,0.08)] backdrop-blur-sm">
                  <CardContent className="grid gap-4 p-6 sm:grid-cols-[auto_1fr] sm:items-start">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(141,58,36,0.16)] bg-[rgba(141,58,36,0.08)] text-sm font-semibold uppercase tracking-[0.22em] text-[rgba(141,58,36,0.95)]">
                      {item.year}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">{item.title}</h3>
                      <p className="text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

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
