'use client';

import Link from 'next/link';
import { Compass, Home, MessageCircle, Search } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { CtaBand, EditorialPanel, PageHero, SectionLabel } from '@/components/site/marketing';
import { getWhatsAppHref } from '@/lib/site';
import { useTranslation } from '@/hooks/useTranslation';

export default function NotFoundExperience() {
  const { t, locale } = useTranslation();
  const isEn = locale === 'en';

  const getHomeUrl = () => isEn ? '/en' : '/';
  const getRecipesUrl = () => isEn ? '/en/recipes' : '/reseptler';
  const getServicesUrl = () => isEn ? '/en/services' : '/xidmetler';
  const getContactUrl = () => isEn ? '/en/contact' : '/elaqe';

  return (
    <PageLayout>
      <div className="space-y-12 lg:space-y-16">
        <PageHero
          eyebrow={<SectionLabel>{t.notFound.eyebrow}</SectionLabel>}
          title={<>{isEn ? "The page you are looking for does not exist, but the main sections of the website are still within your reach." : "Axtardığınız səhifə yoxdur, amma saytın əsas trayektoriyası hələ də əlinizin altındadır."}</>}
          description={isEn ? "From here, you can directly access the most commonly used sections." : "Buradan ən çox istifadə olunan istiqamətlərə birbaşa keçmək olur."}
          stats={[
            { value: '404', label: 'status' },
          ]}
          aside={
            <EditorialPanel className="p-6 sm:p-7">
              <div className="space-y-5">
                <SectionLabel className="bg-[rgba(141,58,36,0.08)]">{isEn ? "Navigation panel" : "Yönləndirmə paneli"}</SectionLabel>
                <div className="space-y-3">
                  <h3 className="display-title text-4xl leading-[0.96] text-foreground">{isEn ? "Let's guide you back." : "Doğru nöqtəyə qaytaraq."}</h3>
                </div>
              </div>
            </EditorialPanel>
          }
        />

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            <EditorialPanel className="p-6 text-left">
              <Compass className="h-6 w-6 text-[rgba(141,58,36,0.96)]" />
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground">{isEn ? "Home Page" : "Ana istiqamət"}</h2>
              <p className="mt-3 text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base">{isEn ? "The main home page of Chef İlhamə." : "Chef İlhamənin ana səhifəsi."}</p>
              <Button asChild className="mt-5 rounded-full bg-[rgba(141,58,36,0.96)] text-white hover:bg-[rgba(141,58,36,0.9)] cursor-pointer">
                <Link href={getHomeUrl()}>
                  <Home className="h-4 w-4" />
                  {t.notFound.btnHome}
                </Link>
              </Button>
            </EditorialPanel>

            <EditorialPanel className="p-6 text-left">
              <Search className="h-6 w-6 text-[rgba(53,84,65,0.96)]" />
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground">{isEn ? "Recipe Catalog" : "Resept kataloqu"}</h2>
              <p className="mt-3 text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base">{isEn ? "Filtered and editorial recipe catalog collection." : "Filtrli və editorial görünüşlü resept siyahısı."}</p>
              <Button asChild variant="outline" className="mt-5 rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 hover:bg-white cursor-pointer">
                <Link href={getRecipesUrl()}>{t.home.ctaBtn}</Link>
              </Button>
            </EditorialPanel>

            <EditorialPanel className="p-6 text-left">
              <MessageCircle className="h-6 w-6 text-[rgba(201,150,69,0.96)]" />
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground">{isEn ? "Direct Contact" : "Birbaşa əlaqə"}</h2>
              <p className="mt-3 text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base">{isEn ? "The shortest way for planning events and quick briefing." : "Tədbir planlama və sürətli brif üçün ən qısa yol."}</p>
              <Button asChild variant="outline" className="mt-5 rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 hover:bg-white cursor-pointer">
                <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">{t.contact.formSummaryBtnWhatsApp}</a>
              </Button>
            </EditorialPanel>
          </div>
        </section>

        <section className="px-4 pb-2 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <CtaBand
              eyebrow={<SectionLabel className="border-white/20 bg-white/10 text-white">{isEn ? "Shortcut" : "Qısa yol"}</SectionLabel>}
              title={<>{isEn ? "Go to home page or services section." : "Ana səhifəyə və ya xidmətlərə keçin."}</>}
              actions={
                <>
                  <Button asChild className="rounded-full bg-white px-6 text-[rgba(34,27,23,0.94)] hover:bg-white/90">
                    <Link href={getServicesUrl()}>{t.nav.services}</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-white/24 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white">
                    <Link href={getContactUrl()}>{t.nav.contact}</Link>
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
