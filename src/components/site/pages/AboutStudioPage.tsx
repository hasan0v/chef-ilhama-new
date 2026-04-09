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

const values = [
  {
    icon: <UtensilsCrossed className="h-5 w-5" />,
    title: 'Regional həssaslıq',
    description: 'Hər bölgənin məhsul xarakteri və süfrə dili qorunur, sadəcə təqdimatı yenilənir.',
    meta: 'Azerbaijani roots',
  },
  {
    icon: <BookOpenText className="h-5 w-5" />,
    title: 'Menyu hekayəsi',
    description: 'Yeməklər ayrı-ayrı nömrələr kimi deyil, tədbirin narrativi kimi seçilir.',
    meta: 'Editorial thinking',
  },
  {
    icon: <HeartHandshake className="h-5 w-5" />,
    title: 'Qonaqpərvərlik intizamı',
    description: 'Səmimiyyət hissi qorunur, amma bütün servis peşəkar ritmlə işləyir.',
    meta: 'Service culture',
  },
];

const timeline = [
  {
    year: '2009',
    title: 'Peşəkar mətbəx təcrübəsinin başlanğıcı',
    description: 'Ənənəvi ailə reseptləri peşəkar istehsalat təcrübəsi ilə kəsişməyə başladı.',
  },
  {
    year: '2016',
    title: 'Event catering və private chef xəttinin qurulması',
    description: 'Kiçik gathering-lərdən böyük toy süfrələrinə qədər xidmət arxitekturası formalaşdı.',
  },
  {
    year: '2025',
    title: 'Resept arxivi və digital atelier',
    description: 'Regional reseptləri və xidmət yanaşmasını vahid digital təcrübədə birləşdirən sayt yarandı.',
  },
];

export default function AboutStudioPage() {
  return (
    <PageLayout>
      <div className="space-y-12 lg:space-y-16">
        <PageHero
          eyebrow={<SectionLabel>Brand hekayəsi</SectionLabel>}
          title={<>Chef İlhamə sadəcə aşpaz adı deyil, zövqlü Azərbaycan süfrəsinin kurasiyasıdır.</>}
          description="Bu studiyanın fərqi ənənəni olduğu kimi təkrar etməkdə deyil. Dadı, ritmi və qonaq hissini daha incə dildə yenidən qurmaqdadır."
          stats={[
            { value: '15+', label: 'il təcrübə' },
            { value: '50+', label: 'seçilmiş resept' },
            { value: '1000+', label: 'müştəri' },
          ]}
          actions={
            <>
              <Button asChild className="rounded-full bg-[rgba(141,58,36,0.96)] px-6 text-white hover:bg-[rgba(141,58,36,0.9)]">
                <Link href="/reseptler">Resept kolleksiyası</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-6 hover:bg-white">
                <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">WhatsApp ilə danış</a>
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
              <div className="space-y-5">
                <SectionLabel>Məram</SectionLabel>
                <h2 className="display-title text-4xl leading-[0.96] text-foreground sm:text-5xl">Ənənəvi yeməkləri yalnız qorumaq yox, onları yenidən dəyərli hiss etdirmək.</h2>
                <p className="text-sm leading-8 text-[rgba(57,44,35,0.76)] sm:text-base">
                  Çox vaxt milli mətbəx ya çox nostalji, ya da çox kommersial görünür. Chef İlhamə bu iki kənarı birləşdirir: ailə dadını saxlayır, amma onu daha seçilmiş, təmiz və müasir təqdim edir.
                </p>
              </div>
            </EditorialPanel>
            <div className="grid gap-5 sm:grid-cols-3">
              <MetricCard value="25+" label="bölgə motivi" detail="Regional məhsul və təqdimat izləri." />
              <MetricCard value="3" label="əsas prinsip" detail="Dad, ritm, vizual harmoniya." />
              <MetricCard value="1" label="vahid studiya dili" detail="Bütün səhifələrdə eyni xarakter." />
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <SectionHeading
              eyebrow={<SectionLabel>Dəyərlər</SectionLabel>}
              title={<>Brendin içində işləyən üç əsas sütun.</>}
              description="Bu saytın yenilənmiş vizual dili də həmin sütunların üzərində qurulub: məhsula hörmət, qonağa qayğı və təqdimatda intizam."
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
              <div className="space-y-5">
                <SectionLabel>Studiyanın mövqeyi</SectionLabel>
                <h2 className="display-title text-4xl leading-[0.96] text-foreground sm:text-5xl">Bakıdan çıxan, amma regional dad xəritəsini bütöv görən mətbəx baxışı.</h2>
                <p className="text-sm leading-8 text-[rgba(57,44,35,0.76)] sm:text-base">
                  {siteConfig.serviceAreas.join(', ')} boyunca fəaliyyət göstərən bu studiya yalnız xidmət vermir. O həm də Azərbaycan mətbəxinin nə qədər zərif, ritmik və çağdaş görünə biləcəyini göstərir.
                </p>
                <div className="rounded-[1.5rem] border border-[rgba(98,67,45,0.1)] bg-white/72 p-5 text-sm leading-7 text-[rgba(57,44,35,0.76)]">
                  Tədbir ölçüsündən asılı olmayaraq hər layihə eyni sualla başlayır: bu süfrə qonağın yaddaşında necə qalmalıdır?
                </div>
              </div>
            </EditorialPanel>
            <div className="space-y-4">
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
              eyebrow={<SectionLabel className="border-white/20 bg-white/10 text-white">Əlaqəyə keçid</SectionLabel>}
              title={<>Əgər süfrənizdə bu studiya dilini hiss etmək istəyirsinizsə, növbəti addım xidməti planlamaqdır.</>}
              description="Menyu kurasiyası, tədbir axını və servis tonu üçün birbaşa əlaqə ən doğru başlanğıcdır."
              actions={
                <>
                  <Button asChild className="rounded-full bg-white px-6 text-[rgba(34,27,23,0.94)] hover:bg-white/90">
                    <Link href="/xidmetler">Xidmət planla</Link>
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
