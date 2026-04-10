import Link from 'next/link';
import { Clock3, Mail, MapPin, MessageCircle, PhoneCall } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import {
  CtaBand,
  EditorialPanel,
  InfoCard,
  PageHero,
  SectionHeading,
  SectionLabel,
} from '@/components/site/marketing';
import { getWhatsAppHref, siteConfig } from '@/lib/site';

const faqItems = [
  'Kiçik private dinner və böyük tədbirlər üçün ayrıca servis planı qurulur.',
  'Sifarişdən əvvəl qonaq sayı, məkan və menyu tonu dəqiqləşdirildikdə daha dəqiq təklif verilir.',
  'Ən rahat əlaqə forması WhatsApp-dır, lakin email və telefon da aktiv saxlanılır.',
];

export default function ContactStudioPage() {
  return (
    <PageLayout>
      <div className="space-y-12 lg:space-y-16">
        <PageHero
          eyebrow={<SectionLabel>Əlaqə studiyası</SectionLabel>}
          title={<>Bizimlə əlaqə saxlamaq üçün əlverişli kanalı seçin.</>}
          description="WhatsApp, telefon və ya email — hansı sizin üçün rahatdırsa."
          actions={
            <>
              <Button asChild className="rounded-full bg-[rgba(141,58,36,0.96)] px-6 text-white hover:bg-[rgba(141,58,36,0.9)]">
                <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">WhatsApp ilə yaz</a>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-6 hover:bg-white">
                <a href={siteConfig.phoneHref}>Birbaşa zəng et</a>
              </Button>
            </>
          }
          stats={[
            { value: '24/7', label: 'mesaj qəbulu' },
            { value: '15+', label: 'il təcrübə' },
            { value: '1 gün', label: 'orta geri dönüş' },
          ]}
          aside={
            <EditorialPanel className="p-6 sm:p-7">
              <div className="space-y-4">
                <SectionLabel className="bg-[rgba(53,84,65,0.1)]">Əlaqə prioriteti</SectionLabel>
                <h3 className="display-title text-4xl leading-[0.96] text-foreground">Ən sürətli kanal həmişə qısa və aydın brifdir.</h3>
                <div className="rounded-[1.4rem] border border-[rgba(98,67,45,0.1)] bg-white/72 p-4 text-sm leading-7 text-[rgba(57,44,35,0.76)]">
                  Ad, tarix, qonaq sayı və tədbir növünü yazmağınız ilkin təklifin keyfiyyətini dərhal artırır.
                </div>
              </div>
            </EditorialPanel>
          }
        />

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <SectionHeading
              eyebrow={<SectionLabel>Əsas kanallar</SectionLabel>}
              title={<>Əlaqə kanalları</>}
            />
            <div className="grid gap-5 lg:grid-cols-3">
              <InfoCard icon={<MessageCircle className="h-5 w-5" />} title="WhatsApp" description={siteConfig.phoneDisplay} meta="Ən sürətli geri dönüş" className="bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(237,248,240,0.76))]" />
              <InfoCard icon={<Mail className="h-5 w-5" />} title="Email" description={siteConfig.email} meta="Təklif və sənədləşmə üçün" />
              <InfoCard icon={<MapPin className="h-5 w-5" />} title="Xidmət sahələri" description={siteConfig.serviceAreas.join(', ')} meta="Şəhər və ətraf zonalar" />
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.92fr] lg:items-start">
            <EditorialPanel className="p-6 sm:p-8">
              <div className="space-y-6">
                <SectionLabel>Sorğu forması</SectionLabel>
                <div>
                  <h2 className="display-title text-4xl leading-[0.96] text-foreground sm:text-5xl">Email sorğusu</h2>
                </div>
                <ContactForm />
              </div>
            </EditorialPanel>

            <div className="space-y-5">
              <EditorialPanel className="mesh-surface p-6 sm:p-7">
                <div className="space-y-5">
                  <SectionLabel>Əlaqə xülasəsi</SectionLabel>
                  <div className="space-y-3 text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base">
                    <div className="flex items-center gap-3">
                      <PhoneCall className="h-4 w-4 text-[rgba(141,58,36,0.96)]" />
                      <a href={siteConfig.phoneHref} className="font-medium text-foreground">{siteConfig.phoneDisplay}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-[rgba(141,58,36,0.96)]" />
                      <a href={`mailto:${siteConfig.email}`} className="font-medium text-foreground">{siteConfig.email}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock3 className="h-4 w-4 text-[rgba(141,58,36,0.96)]" />
                      <span>{siteConfig.hours}</span>
                    </div>
                  </div>
                  <Button asChild className="w-full rounded-full bg-[rgba(53,84,65,0.96)] text-white hover:bg-[rgba(53,84,65,0.88)]">
                    <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">WhatsApp aç</a>
                  </Button>
                </div>
              </EditorialPanel>

              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <div key={item} className="rounded-[1.5rem] border border-white/60 bg-white/78 px-5 py-4 text-sm leading-7 text-[rgba(57,44,35,0.76)] shadow-[0_20px_56px_rgba(52,34,22,0.08)] backdrop-blur-sm sm:text-base">
                    <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(141,58,36,0.1)] text-xs font-semibold text-[rgba(141,58,36,0.96)]">
                      0{index + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-2 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <CtaBand
              eyebrow={<SectionLabel className="border-white/20 bg-white/10 text-white">Bir addım sonra</SectionLabel>}
              title={<>Tədbirinizə artıq tarix qoymusunuzsa, birbaşa xidmət planlama səhifəsinə keçin.</>}
              description="Detallı sorğu və xidmət seçimi üçün."
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
