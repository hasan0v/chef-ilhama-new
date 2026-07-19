'use client';

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
import { useTranslation } from '@/hooks/useTranslation';
import { getLocalizedServicesPath } from '@/lib/localeRoutes';

export default function ContactStudioPage({ breadcrumbs }: { breadcrumbs?: import('@/lib/seo').BreadcrumbItem[] } = {}) {
  const { t, locale } = useTranslation();
  const isEn = locale === 'en';

  const getServicesUrl = () => getLocalizedServicesPath(locale);

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-12 lg:space-y-16">
        <PageHero
          eyebrow={<SectionLabel>{t.nav.contact}</SectionLabel>}
          title={<>{t.contact.contactHeroTitle}</>}
          description={t.contact.contactHeroDesc}
          actions={
            <>
              <Button asChild className="rounded-full bg-[rgba(141,58,36,0.96)] px-6 text-white hover:bg-[rgba(141,58,36,0.9)]">
                <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">{t.contact.contactBtnWhatsApp}</a>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-6 hover:bg-white">
                <a href={siteConfig.phoneHref}>{t.contact.contactBtnCall}</a>
              </Button>
            </>
          }
          stats={[
            { value: '24/7', label: t.contact.msgInboxLabel },
            { value: '15+', label: isEn ? 'years exp' : 'il təcrübə' },
            { value: '1 ' + (isEn ? 'day' : 'gün'), label: t.contact.responseTimeLabel },
          ]}
          aside={
            <EditorialPanel className="p-6 sm:p-7">
              <div className="space-y-4 text-left">
                <SectionLabel className="bg-[rgba(53,84,65,0.1)]">{t.contact.contactPriorityLabel}</SectionLabel>
                <h3 className="display-title text-4xl leading-[0.96] text-foreground">{t.contact.contactPriorityTitle}</h3>
                <div className="rounded-[1.4rem] border border-[rgba(98,67,45,0.1)] bg-white/72 p-4 text-sm leading-7 text-[rgba(57,44,35,0.76)]">
                  {t.contact.contactPriorityDesc}
                </div>
              </div>
            </EditorialPanel>
          }
        />

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <SectionHeading
              eyebrow={<SectionLabel>{t.contact.mainChannelsLabel}</SectionLabel>}
              title={<>{t.contact.mainChannelsTitle}</>}
            />
            <div className="grid gap-5 lg:grid-cols-3">
              <InfoCard icon={<MessageCircle className="h-5 w-5" />} title="WhatsApp" description={siteConfig.phoneDisplay} meta={t.contact.channelWhatsAppMeta} className="bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(237,248,240,0.76))]" />
              <InfoCard icon={<Mail className="h-5 w-5" />} title="Email" description={siteConfig.email} meta={t.contact.channelEmailMeta} />
              <InfoCard icon={<MapPin className="h-5 w-5" />} title={isEn ? "Service Areas" : "Xidmət sahələri"} description={isEn ? siteConfig.serviceAreas.map(area => area === 'Bakı' ? 'Baku' : area).join(', ') : siteConfig.serviceAreas.join(', ')} meta={t.contact.channelAreasMeta} />
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.92fr] lg:items-start">
            <EditorialPanel className="p-6 sm:p-8">
              <div className="space-y-6 text-left">
                <SectionLabel>{t.contact.formLabel}</SectionLabel>
                <div>
                  <h2 className="display-title text-4xl leading-[0.96] text-foreground sm:text-5xl">{t.contact.formTitleEmail}</h2>
                </div>
                <ContactForm />
              </div>
            </EditorialPanel>

            <div className="space-y-5 text-left">
              <EditorialPanel className="mesh-surface p-6 sm:p-7">
                <div className="space-y-5">
                  <SectionLabel>{t.contact.formSummaryLabel}</SectionLabel>
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
                      <span>{isEn ? 'Daily 08:00 - 22:00' : siteConfig.hours}</span>
                    </div>
                  </div>
                  <Button asChild className="w-full rounded-full bg-[rgba(53,84,65,0.96)] text-white hover:bg-[rgba(53,84,65,0.88)] cursor-pointer">
                    <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">{t.contact.formSummaryBtnWhatsApp}</a>
                  </Button>
                </div>
              </EditorialPanel>

              <div className="space-y-3">
                {t.contact.faqItems.map((item, index) => (
                  <div key={index} className="rounded-[1.5rem] border border-white/60 bg-white/78 px-5 py-4 text-sm leading-7 text-[rgba(57,44,35,0.76)] shadow-[0_20px_56px_rgba(52,34,22,0.08)] backdrop-blur-sm sm:text-base">
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
              eyebrow={<SectionLabel className="border-white/20 bg-white/10 text-white">{isEn ? "One step further" : "Bir addım sonra"}</SectionLabel>}
              title={<>{isEn ? "If you have already set a date for your event, go directly to the service planning page." : "Tədbirinizə artıq tarix qoymusunuzsa, birbaşa xidmət planlama səhifəsinə keçin."}</>}
              description={isEn ? "For detailed inquiry and service selection." : "Detallı sorğu və xidmət seçimi üçün."}
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
