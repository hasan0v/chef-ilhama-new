import Link from 'next/link';
import { Compass, Home, MessageCircle, Search } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { CtaBand, EditorialPanel, PageHero, SectionLabel } from '@/components/site/marketing';
import { getWhatsAppHref } from '@/lib/site';

export default function NotFoundExperience() {
  return (
    <PageLayout>
      <div className="space-y-12 lg:space-y-16">
        <PageHero
          eyebrow={<SectionLabel>404 səhifəsi</SectionLabel>}
          title={<>Axtardığınız səhifə yoxdur, amma saytın əsas trayektoriyası hələ də əlinizin altındadır.</>}
          description="Buradan ən çox istifadə olunan istiqamətlərə birbaşa keçmək olur."
          stats={[
            { value: '404', label: 'status' },
          ]}
          aside={
            <EditorialPanel className="p-6 sm:p-7">
              <div className="space-y-5">
                <SectionLabel className="bg-[rgba(141,58,36,0.08)]">Yönləndirmə paneli</SectionLabel>
                <div className="space-y-3">
                  <h3 className="display-title text-4xl leading-[0.96] text-foreground">Doğru nöqtəyə qaytaraq.</h3>
                </div>
              </div>
            </EditorialPanel>
          }
        />

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            <EditorialPanel className="p-6">
              <Compass className="h-6 w-6 text-[rgba(141,58,36,0.96)]" />
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground">Ana istiqamət</h2>
              <p className="mt-3 text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base">Chef İlhamənin ana səhifəsi.</p>
              <Button asChild className="mt-5 rounded-full bg-[rgba(141,58,36,0.96)] text-white hover:bg-[rgba(141,58,36,0.9)]">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Ana səhifə
                </Link>
              </Button>
            </EditorialPanel>

            <EditorialPanel className="p-6">
              <Search className="h-6 w-6 text-[rgba(53,84,65,0.96)]" />
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground">Resept kataloqu</h2>
              <p className="mt-3 text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base">Filtrli və editorial görünüşlü resept siyahısı.</p>
              <Button asChild variant="outline" className="mt-5 rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 hover:bg-white">
                <Link href="/reseptler">Reseptlərə keç</Link>
              </Button>
            </EditorialPanel>

            <EditorialPanel className="p-6">
              <MessageCircle className="h-6 w-6 text-[rgba(201,150,69,0.96)]" />
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground">Birbaşa əlaqə</h2>
              <p className="mt-3 text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base">Tədbir planlama və sürətli brif üçün ən qısa yol.</p>
              <Button asChild variant="outline" className="mt-5 rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 hover:bg-white">
                <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">WhatsApp aç</a>
              </Button>
            </EditorialPanel>
          </div>
        </section>

        <section className="px-4 pb-2 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <CtaBand
              eyebrow={<SectionLabel className="border-white/20 bg-white/10 text-white">Qısa yol</SectionLabel>}
              title={<>Ana səhifəyə və ya xidmətlərə keçin.</>}
              actions={
                <>
                  <Button asChild className="rounded-full bg-white px-6 text-[rgba(34,27,23,0.94)] hover:bg-white/90">
                    <Link href="/xidmetler">Xidmətlər</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-white/24 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white">
                    <Link href="/elaqe">Əlaqə</Link>
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
