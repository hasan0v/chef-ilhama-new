'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ChefHat,
  Crown,
  GraduationCap,
  MapPin,
  PartyPopper,
  PhoneCall,
  Sparkles,
  Utensils,
  Users,
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { getLocalizedContactPath } from '@/lib/localeRoutes';

export default function ServicesExperience({ breadcrumbs }: { breadcrumbs?: import('@/lib/seo').BreadcrumbItem[] } = {}) {
  const { t, locale } = useTranslation();
  const isEn = locale === 'en';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    location: '',
    services: [] as string[],
    menuPreference: '',
    dietaryRequirements: '',
    budget: '',
    additionalNotes: '',
  });

  const getContactUrl = () => getLocalizedContactPath(locale);

  const serviceOptions = useMemo(() => [
    {
      id: 'personal-chef',
      label: t.services.serviceOptions[0].label,
      icon: ChefHat,
      description: t.services.serviceOptions[0].desc,
    },
    {
      id: 'katerinq',
      label: t.services.serviceOptions[1].label,
      icon: Utensils,
      description: t.services.serviceOptions[1].desc,
    },
    {
      id: 'wedding',
      label: t.services.serviceOptions[2].label,
      icon: Crown,
      description: t.services.serviceOptions[2].desc,
    },
    {
      id: 'corporate',
      label: t.services.serviceOptions[3].label,
      icon: Building2,
      description: t.services.serviceOptions[3].desc,
    },
    {
      id: 'party',
      label: t.services.serviceOptions[4].label,
      icon: PartyPopper,
      description: t.services.serviceOptions[4].desc,
    },
    {
      id: 'masterclass',
      label: t.services.serviceOptions[5].label,
      icon: GraduationCap,
      description: t.services.serviceOptions[5].desc,
    },
  ], [t]);

  const reasons = useMemo(() => [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: t.services.reason1Title,
      description: t.services.reason1Desc,
      meta: t.services.reason1Meta,
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: t.services.reason2Title,
      description: t.services.reason2Desc,
      meta: t.services.reason2Meta,
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: t.services.reason3Title,
      description: t.services.reason3Desc,
      meta: t.services.reason3Meta,
    },
  ], [t]);

  const selectedServices = useMemo(
    () => serviceOptions.filter((service) => formData.services.includes(service.id)),
    [formData.services, serviceOptions],
  );

  const isFormValid =
    Boolean(formData.name) &&
    Boolean(formData.phone) &&
    Boolean(formData.eventType) &&
    Boolean(formData.guestCount) &&
    formData.services.length > 0;

  function handleServiceToggle(serviceId: string) {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }));
  }

  function handleInputChange(field: keyof typeof formData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function generateWhatsAppMessage() {
    const selectedServiceNames = selectedServices.map((service) => service.label).join(', ');
    const details = t.services.whatsappDetails;

    const message = [
      t.services.whatsappMsgHeader,
      '',
      `${details.name}: ${formData.name}`,
      `${details.phone}: ${formData.phone}`,
      formData.email ? `${details.email}: ${formData.email}` : null,
      '',
      `${details.services}: ${selectedServiceNames}`,
      `${details.eventType}: ${formData.eventType}`,
      formData.eventDate ? `${details.eventDate}: ${formData.eventDate}` : null,
      `${details.guestCount}: ${formData.guestCount}`,
      formData.location ? `${details.location}: ${formData.location}` : null,
      formData.menuPreference ? `${details.menuPreference}: ${formData.menuPreference}` : null,
      formData.dietaryRequirements ? `${details.dietaryRequirements}: ${formData.dietaryRequirements}` : null,
      formData.budget ? `${details.budget}: ${formData.budget}` : null,
      formData.additionalNotes ? `${details.additionalNotes}: ${formData.additionalNotes}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(getWhatsAppHref(message), '_blank', 'noopener,noreferrer');
  }

  return (
    <PageLayout breadcrumbs={breadcrumbs}>
      <div className="space-y-12 lg:space-y-16">
        <PageHero
          eyebrow={<SectionLabel>{t.services.heroLabel}</SectionLabel>}
          title={<>{t.services.heroTitle}</>}
          description={t.services.heroDesc}
          stats={[
            { value: '15+', label: isEn ? 'years exp' : 'il təcrübə' },
            { value: '1000+', label: isEn ? 'clients' : 'müştəri' },
            { value: '24/7', label: isEn ? 'contact' : 'əlaqə' },
          ]}
          actions={
            <>
              <Button asChild size="lg" className="rounded-full bg-[rgba(141,58,36,0.96)] px-6 text-white hover:bg-[rgba(141,58,36,0.9)]">
                <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">
                  {t.contact.contactBtnWhatsApp}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-6 hover:bg-white">
                <a href={siteConfig.phoneHref}>{t.contact.contactBtnCall}</a>
              </Button>
            </>
          }
          aside={
            <EditorialPanel className="p-6 sm:p-7">
              <div className="space-y-5 text-left">
                <SectionLabel className="bg-[rgba(53,84,65,0.1)]">{t.services.bookingNoteLabel}</SectionLabel>
                <div className="space-y-3">
                  <h3 className="display-title text-4xl leading-[0.96] text-foreground">{t.services.bookingNoteTitle}</h3>
                  <p className="text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base">
                    {t.services.bookingNoteDesc}
                  </p>
                </div>
                <div className="grid gap-3 text-sm text-[rgba(57,44,35,0.76)]">
                  <div className="rounded-[1.4rem] border border-[rgba(98,67,45,0.1)] bg-white/72 px-4 py-3">
                    <div className="font-semibold text-foreground">{t.services.responseTimeTitle}</div>
                    <div className="mt-1">{t.services.responseTimeDesc}</div>
                  </div>
                  <div className="rounded-[1.4rem] border border-[rgba(98,67,45,0.1)] bg-white/72 px-4 py-3">
                    <div className="font-semibold text-foreground">{t.services.serviceAreaTitle}</div>
                    <div className="mt-1">
                      {isEn ? siteConfig.serviceAreas.map(area => area === 'Bakı' ? 'Baku' : area).join(', ') : siteConfig.serviceAreas.join(', ')}
                    </div>
                  </div>
                </div>
              </div>
            </EditorialPanel>
          }
        />

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <SectionHeading
              eyebrow={<SectionLabel>{t.services.servicesBlocksLabel}</SectionLabel>}
              title={<>{t.services.servicesBlocksTitle}</>}
              description={t.services.servicesBlocksDesc}
            />
            <div className="grid gap-5 lg:grid-cols-3">
              {reasons.map((reason) => (
                <InfoCard key={reason.title} icon={reason.icon} title={reason.title} description={reason.description} meta={reason.meta} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <SectionHeading
              eyebrow={<SectionLabel>{t.services.formTitle}</SectionLabel>}
              title={<>{t.services.formSubtitle}</>}
            />
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <EditorialPanel className="p-6 sm:p-8">
                <div className="space-y-8 text-left">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(141,58,36,0.1)] text-[rgba(141,58,36,0.96)]">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">{t.services.formSection1}</h3>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t.services.formName}</Label>
                        <Input id="name" value={formData.name} onChange={(event) => handleInputChange('name', event.target.value)} placeholder={t.services.formNamePlaceholder} className="h-12 rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t.services.formPhone}</Label>
                        <Input id="phone" value={formData.phone} onChange={(event) => handleInputChange('phone', event.target.value)} placeholder="+994 XX XXX XX XX" className="h-12 rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email">{t.services.formEmail}</Label>
                        <Input id="email" value={formData.email} onChange={(event) => handleInputChange('email', event.target.value)} placeholder="email@example.com" className="h-12 rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(53,84,65,0.1)] text-[rgba(53,84,65,0.96)]">
                        <ChefHat className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">{t.services.formSection2}</h3>
                        <p className="text-sm text-[rgba(57,44,35,0.72)]">{t.services.formSection2Sub}</p>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {serviceOptions.map((service) => {
                        const selected = formData.services.includes(service.id);
                        const Icon = service.icon;

                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => handleServiceToggle(service.id)}
                            className={`rounded-[1.6rem] border p-5 text-left transition-all duration-200 cursor-pointer ${
                              selected
                                ? 'border-[rgba(141,58,36,0.26)] bg-[rgba(141,58,36,0.08)] shadow-[0_18px_42px_rgba(141,58,36,0.12)]'
                                : 'border-white/60 bg-white/72 hover:bg-white/86'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-3">
                                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${selected ? 'bg-[rgba(141,58,36,0.14)] text-[rgba(141,58,36,0.96)]' : 'bg-[rgba(53,84,65,0.08)] text-[rgba(53,84,65,0.96)]'}`}>
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <div className="font-semibold text-foreground">{service.label}</div>
                                  <p className="mt-2 text-sm leading-7 text-[rgba(57,44,35,0.72)]">{service.description}</p>
                                </div>
                              </div>
                              {selected ? <CheckCircle2 className="mt-1 h-5 w-5 text-[rgba(141,58,36,0.96)]" /> : null}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(201,150,69,0.14)] text-[rgba(141,58,36,0.96)]">
                        <CalendarDays className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">{t.services.formSection3}</h3>
                        <p className="text-sm text-[rgba(57,44,35,0.72)]">{t.services.formSection3Sub}</p>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>{t.services.formEventType}</Label>
                        <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                          <SelectTrigger className="h-12 w-full rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80 px-4">
                            <SelectValue placeholder={t.services.formSelectPlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {t.services.eventTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>{t.services.formGuests}</Label>
                        <Select value={formData.guestCount} onValueChange={(value) => handleInputChange('guestCount', value)}>
                          <SelectTrigger className="h-12 w-full rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80 px-4">
                            <SelectValue placeholder={t.services.formSelectPlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {t.services.guestCounts.map((count) => (
                              <SelectItem key={count} value={count}>{count}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eventDate">{t.services.formDate}</Label>
                        <Input id="eventDate" type="date" value={formData.eventDate} onChange={(event) => handleInputChange('eventDate', event.target.value)} className="h-12 rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">{t.services.formLocation}</Label>
                        <Input id="location" value={formData.location} onChange={(event) => handleInputChange('location', event.target.value)} placeholder={t.services.formLocationPlaceholder} className="h-12 rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>{t.services.formMenuTone}</Label>
                        <Select value={formData.menuPreference} onValueChange={(value) => handleInputChange('menuPreference', value)}>
                          <SelectTrigger className="h-12 w-full rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80 px-4">
                            <SelectValue placeholder={t.services.formMenuTonePlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {t.services.eventMoods.map((mood) => (
                              <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dietaryRequirements">{t.services.formDietary}</Label>
                        <Input id="dietaryRequirements" value={formData.dietaryRequirements} onChange={(event) => handleInputChange('dietaryRequirements', event.target.value)} placeholder={t.services.formDietaryPlaceholder} className="h-12 rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget">{t.services.formBudget}</Label>
                        <Input id="budget" value={formData.budget} onChange={(event) => handleInputChange('budget', event.target.value)} placeholder={t.services.formBudgetPlaceholder} className="h-12 rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="additionalNotes">{t.services.formNotes}</Label>
                        <Textarea id="additionalNotes" value={formData.additionalNotes} onChange={(event) => handleInputChange('additionalNotes', event.target.value)} placeholder={t.services.formNotesPlaceholder} className="min-h-36 rounded-[1.5rem] border-[rgba(98,67,45,0.14)] bg-white/80 p-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </EditorialPanel>

              <div className="lg:sticky lg:top-28 text-left">
                <Card className="border-white/60 bg-white/78 shadow-[0_24px_64px_rgba(52,34,22,0.08)] backdrop-blur-sm">
                  <CardContent className="space-y-6 p-6 sm:p-7">
                    <div className="space-y-3">
                      <SectionLabel>{t.services.summaryLabel}</SectionLabel>
                      <h3 className="display-title text-4xl leading-[0.96] text-foreground">{t.services.summaryTitle}</h3>
                      <p className="text-sm leading-7 text-[rgba(57,44,35,0.72)]">{t.services.summaryDesc}</p>
                    </div>

                    <div className="space-y-4 rounded-[1.5rem] border border-[rgba(98,67,45,0.1)] bg-[rgba(247,239,226,0.72)] p-5">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgba(112,83,59,0.72)]">{t.services.summaryServices}</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {selectedServices.length ? (
                            selectedServices.map((service) => (
                              <span key={service.id} className="rounded-full bg-white px-3 py-1 text-sm text-[rgba(57,44,35,0.82)] shadow-sm">
                                {service.label}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-[rgba(57,44,35,0.68)]">{t.services.summaryEmptyServices}</span>
                          )}
                        </div>
                      </div>

                      <div className="section-divider" />

                      <div className="grid gap-3 text-sm text-[rgba(57,44,35,0.76)]">
                        <div className="flex justify-between gap-4">
                          <span>{t.services.summaryEvent}</span>
                          <span className="font-medium text-foreground">{formData.eventType || t.services.summaryEmptyVal}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span>{t.services.formGuests}</span>
                          <span className="font-medium text-foreground">{formData.guestCount || t.services.summaryEmptyVal}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span>{t.services.summaryLocation}</span>
                          <span className="font-medium text-foreground">{formData.location || t.services.summaryNotSetVal}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm leading-7 text-[rgba(57,44,35,0.72)]">
                      <div className="flex items-center gap-2 text-foreground">
                        <PhoneCall className="h-4 w-4 text-[rgba(141,58,36,0.96)]" />
                        <span className="font-medium">{siteConfig.phoneDisplay}</span>
                      </div>
                      <p>{(isEn ? 'Daily 08:00 - 22:00' : siteConfig.hours) + ' ' + t.services.summaryContactDesc}</p>
                    </div>

                    <div className="grid gap-3">
                      <Button className="rounded-full bg-[rgba(141,58,36,0.96)] text-white hover:bg-[rgba(141,58,36,0.9)] cursor-pointer" disabled={!isFormValid} onClick={generateWhatsAppMessage}>
                        {t.services.summaryBtnWhatsApp}
                      </Button>
                      <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 hover:bg-white">
                        <Link href={getContactUrl()}>{t.services.summaryBtnContact}</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-2 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <CtaBand
              eyebrow={<SectionLabel className="border-white/20 bg-white/10 text-white">{isEn ? "Fast decision" : "Sürətli qərar üçün"}</SectionLabel>}
              title={<>{isEn ? "If your date is confirmed, sending the initial inquiry now is the right step." : "Əgər tarixiniz bəllidirsə, ilkin sorğunu indi göndərmək ən düzgün addımdır."}</>}
              description={isEn ? "Getting in touch early guarantees availability." : "Tarixiniz bəllidirsə, əlaqəyə tez keçmək daha düzgündür."}
              actions={
                <>
                  <Button asChild className="rounded-full bg-white px-6 text-[rgba(34,27,23,0.94)] hover:bg-white/90">
                    <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">{t.contact.formSummaryBtnWhatsApp}</a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-white/24 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white">
                    <a href={siteConfig.phoneHref}>{t.contact.contactBtnCall}</a>
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
