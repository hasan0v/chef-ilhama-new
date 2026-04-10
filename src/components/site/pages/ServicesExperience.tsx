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

const serviceOptions = [
  {
    id: 'personal-chef',
    label: 'Şəxsi aşpaz xidməti',
    icon: ChefHat,
    description: 'Evdə və ya xüsusi məkanda private dining və butik servis.',
  },
  {
    id: 'katerinq',
    label: 'Premium katerinq',
    icon: Utensils,
    description: 'Brend tədbiri, təqdimat və qapalı məclislər üçün catering.',
  },
  {
    id: 'wedding',
    label: 'Toy masası planlaması',
    icon: Crown,
    description: 'Klassik Azərbaycan süfrəsini daha zərif axınla qururuq.',
  },
  {
    id: 'corporate',
    label: 'Korporativ tədbirlər',
    icon: Building2,
    description: 'İşgüzar gathering və lounge servis üçün yığcam menyular.',
  },
  {
    id: 'party',
    label: 'Nişan və ailə şənlikləri',
    icon: PartyPopper,
    description: 'Ev atmosferi ilə peşəkar servis intizamını birləşdirir.',
  },
  {
    id: 'masterclass',
    label: 'Master-klass və workshop',
    icon: GraduationCap,
    description: 'Brend tədbirləri və qapalı öyrənmə sessiyaları üçün format.',
  },
] as const;

const eventTypes = [
  'Toy mərasimi',
  'Nişan məclisi',
  'Private dinner',
  'Korporativ tədbir',
  'Ailə şənliyi',
  'Media təqdimatı',
  'Digər',
] as const;

const guestCounts = [
  '10-20 nəfər',
  '20-40 nəfər',
  '40-80 nəfər',
  '80-150 nəfər',
  '150-300 nəfər',
  '300+ nəfər',
] as const;

const eventMoodOptions = [
  'Ənənəvi Azərbaycan süfrəsi',
  'Modern təqdimat',
  'Minimal private dinner',
  'Qarışıq menyu',
] as const;

const reasons = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: 'Brifinqdən sonra kurasiya',
    description: 'Menyu sadəcə siyahı kimi yox, tədbirin ritminə uyğun struktur kimi hazırlanır.',
    meta: 'Curated menus',
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: 'Qonaq axınına uyğun servis',
    description: 'Stasionar masa, passing service və ya qarışıq format öncədən planlanır.',
    meta: 'Guest flow',
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: 'Məkan və logistika uyğunluğu',
    description: 'Bakı və ətraf zonalarda məkan məhdudiyyətlərinə görə ayrıca icra planı verilir.',
    meta: 'On-site planning',
  },
];

export default function ServicesExperience() {
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

  const selectedServices = useMemo(
    () => serviceOptions.filter((service) => formData.services.includes(service.id)),
    [formData.services],
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

    const message = [
      'Salam Chef İlhamə, yeni tədbir üçün xidmət sorğusu göndərirəm.',
      '',
      `Ad Soyad: ${formData.name}`,
      `Telefon: ${formData.phone}`,
      formData.email ? `Email: ${formData.email}` : null,
      '',
      `Xidmətlər: ${selectedServiceNames}`,
      `Tədbir növü: ${formData.eventType}`,
      formData.eventDate ? `Tarix: ${formData.eventDate}` : null,
      `Qonaq sayı: ${formData.guestCount}`,
      formData.location ? `Məkan: ${formData.location}` : null,
      formData.menuPreference ? `Menyu tonu: ${formData.menuPreference}` : null,
      formData.dietaryRequirements ? `Dietik qeyd: ${formData.dietaryRequirements}` : null,
      formData.budget ? `Büdcə aralığı: ${formData.budget}` : null,
      formData.additionalNotes ? `Əlavə qeyd: ${formData.additionalNotes}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(getWhatsAppHref(message), '_blank');
  }

  return (
    <PageLayout>
      <div className="space-y-12 lg:space-y-16">
        <PageHero
          eyebrow={<SectionLabel>Private chef booking studio</SectionLabel>}
          title={<>Tədbirinizi hazır paketlə yox, sizə uyğun ssenari ilə planlayın.</>}
          description="Tədbirin məkanı, qonaq sayı və menyu intonasiyasını bir yerdə planlayın."
          stats={[
            { value: '15+', label: 'il təcrübə' },
            { value: '1000+', label: 'müştəri' },
            { value: '24/7', label: 'əlaqə' },
          ]}
          actions={
            <>
              <Button asChild size="lg" className="rounded-full bg-[rgba(141,58,36,0.96)] px-6 text-white hover:bg-[rgba(141,58,36,0.9)]">
                <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">
                  WhatsApp ilə yaz
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 px-6 hover:bg-white">
                <a href={siteConfig.phoneHref}>Zəng et</a>
              </Button>
            </>
          }
          aside={
            <EditorialPanel className="p-6 sm:p-7">
              <div className="space-y-5">
                <SectionLabel className="bg-[rgba(53,84,65,0.1)]">Rezervasiya qeydi</SectionLabel>
                <div className="space-y-3">
                  <h3 className="display-title text-4xl leading-[0.96] text-foreground">Dəqiq brifinq, daha güclü servis.</h3>
                  <p className="text-sm leading-7 text-[rgba(57,44,35,0.76)] sm:text-base">
                    Ən yaxşı nəticə üçün sadəcə tarix yox, tədbirin tonu da əhəmiyyətlidir.
                  </p>
                </div>
                <div className="grid gap-3 text-sm text-[rgba(57,44,35,0.76)]">
                  <div className="rounded-[1.4rem] border border-[rgba(98,67,45,0.1)] bg-white/72 px-4 py-3">
                    <div className="font-semibold text-foreground">Cavab müddəti</div>
                    <div className="mt-1">Əksər sorğulara gün ərzində geri dönüş edilir.</div>
                  </div>
                  <div className="rounded-[1.4rem] border border-[rgba(98,67,45,0.1)] bg-white/72 px-4 py-3">
                    <div className="font-semibold text-foreground">Əhatə zonası</div>
                    <div className="mt-1">{siteConfig.serviceAreas.join(', ')}</div>
                  </div>
                </div>
              </div>
            </EditorialPanel>
          }
        />

        <section className="px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <SectionHeading
              eyebrow={<SectionLabel>Xidmət blokları</SectionLabel>}
              title={<>Hazır paket yox, tədbir kontekstinə uyğun format seçimi.</>}
              description="Menyu, servis, logistika və təqdimat birlikdə işləyən sistemdir."
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
              eyebrow={<SectionLabel>Sorğu forması</SectionLabel>}
              title={<>Tədbirin konturunu burada qurun, biz onu servisa çevirək.</>}
            />
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <EditorialPanel className="p-6 sm:p-8">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(141,58,36,0.1)] text-[rgba(141,58,36,0.96)]">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">1. Əlaqə və tədbir məlumatı</h3>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Ad Soyad</Label>
                        <Input id="name" value={formData.name} onChange={(event) => handleInputChange('name', event.target.value)} placeholder="Adınızı daxil edin" className="h-12 rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input id="phone" value={formData.phone} onChange={(event) => handleInputChange('phone', event.target.value)} placeholder="+994 XX XXX XX XX" className="h-12 rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email">Email</Label>
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
                        <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">2. Xidmət seçimi</h3>
                        <p className="text-sm text-[rgba(57,44,35,0.72)]">Birdən çox xidmət seçə bilərsiniz.</p>
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
                            className={`rounded-[1.6rem] border p-5 text-left transition-all duration-200 ${
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
                        <h3 className="text-xl font-semibold tracking-[-0.03em] text-foreground">3. Tədbirin konteksti</h3>
                        <p className="text-sm text-[rgba(57,44,35,0.72)]">Qərar üçün ən vacib blok budur.</p>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Tədbir növü</Label>
                        <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                          <SelectTrigger className="h-12 w-full rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80 px-4">
                            <SelectValue placeholder="Seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {eventTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Qonaq sayı</Label>
                        <Select value={formData.guestCount} onValueChange={(value) => handleInputChange('guestCount', value)}>
                          <SelectTrigger className="h-12 w-full rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80 px-4">
                            <SelectValue placeholder="Seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {guestCounts.map((count) => (
                              <SelectItem key={count} value={count}>{count}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="eventDate">Tarix</Label>
                        <Input id="eventDate" type="date" value={formData.eventDate} onChange={(event) => handleInputChange('eventDate', event.target.value)} className="h-12 rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Məkan</Label>
                        <Input id="location" value={formData.location} onChange={(event) => handleInputChange('location', event.target.value)} placeholder="Məkan və ya rayon" className="h-12 rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Menyu tonu</Label>
                        <Select value={formData.menuPreference} onValueChange={(value) => handleInputChange('menuPreference', value)}>
                          <SelectTrigger className="h-12 w-full rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80 px-4">
                            <SelectValue placeholder="Tədbirin üslubunu seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {eventMoodOptions.map((mood) => (
                              <SelectItem key={mood} value={mood}>{mood}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dietaryRequirements">Xüsusi qida qeydləri</Label>
                        <Input id="dietaryRequirements" value={formData.dietaryRequirements} onChange={(event) => handleInputChange('dietaryRequirements', event.target.value)} placeholder="Vegetarian, halal və s." className="h-12 rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget">Büdcə aralığı</Label>
                        <Input id="budget" value={formData.budget} onChange={(event) => handleInputChange('budget', event.target.value)} placeholder="Təxmini aralıq" className="h-12 rounded-2xl border-[rgba(98,67,45,0.14)] bg-white/80" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="additionalNotes">Əlavə qeydlər</Label>
                        <Textarea id="additionalNotes" value={formData.additionalNotes} onChange={(event) => handleInputChange('additionalNotes', event.target.value)} placeholder="Servis saatı, uşaq masası, xüsusi dekor tonu və digər qeydlər" className="min-h-36 rounded-[1.5rem] border-[rgba(98,67,45,0.14)] bg-white/80 p-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </EditorialPanel>

              <div className="lg:sticky lg:top-28">
                <Card className="border-white/60 bg-white/78 shadow-[0_24px_64px_rgba(52,34,22,0.08)] backdrop-blur-sm">
                  <CardContent className="space-y-6 p-6 sm:p-7">
                    <div className="space-y-3">
                      <SectionLabel>Canlı xülasə</SectionLabel>
                      <h3 className="display-title text-4xl leading-[0.96] text-foreground">Sorğunuz necə görünür</h3>
                      <p className="text-sm leading-7 text-[rgba(57,44,35,0.72)]">Bu blok WhatsApp mesajına göndəriləcək əsas konturu göstərir.</p>
                    </div>

                    <div className="space-y-4 rounded-[1.5rem] border border-[rgba(98,67,45,0.1)] bg-[rgba(247,239,226,0.72)] p-5">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgba(112,83,59,0.72)]">Seçilmiş xidmətlər</div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {selectedServices.length ? (
                            selectedServices.map((service) => (
                              <span key={service.id} className="rounded-full bg-white px-3 py-1 text-sm text-[rgba(57,44,35,0.82)] shadow-sm">
                                {service.label}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-[rgba(57,44,35,0.68)]">Hələ seçim edilməyib.</span>
                          )}
                        </div>
                      </div>

                      <div className="section-divider" />

                      <div className="grid gap-3 text-sm text-[rgba(57,44,35,0.76)]">
                        <div className="flex justify-between gap-4">
                          <span>Tədbir</span>
                          <span className="font-medium text-foreground">{formData.eventType || 'Seçilməyib'}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span>Qonaq sayı</span>
                          <span className="font-medium text-foreground">{formData.guestCount || 'Seçilməyib'}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span>Məkan</span>
                          <span className="font-medium text-foreground">{formData.location || 'Qeyd edilməyib'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm leading-7 text-[rgba(57,44,35,0.72)]">
                      <div className="flex items-center gap-2 text-foreground">
                        <PhoneCall className="h-4 w-4 text-[rgba(141,58,36,0.96)]" />
                        <span className="font-medium">{siteConfig.phoneDisplay}</span>
                      </div>
                      <p>{siteConfig.hours} aralığında ən rahat əlaqə forması WhatsApp-dır.</p>
                    </div>

                    <div className="grid gap-3">
                      <Button className="rounded-full bg-[rgba(141,58,36,0.96)] text-white hover:bg-[rgba(141,58,36,0.9)]" disabled={!isFormValid} onClick={generateWhatsAppMessage}>
                        Sorğunu WhatsApp ilə göndər
                      </Button>
                      <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/72 hover:bg-white">
                        <Link href="/elaqe">Əlaqə səhifəsinə keç</Link>
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
              eyebrow={<SectionLabel className="border-white/20 bg-white/10 text-white">Sürətli qərar üçün</SectionLabel>}
              title={<>Əgər tarixiniz bəllidirsə, ilkin sorğunu indi göndərmək ən düzgün addımdır.</>}
              description="Tarixiniz bəllidirsə, əlaqəyə tez keçmək daha düzgündür."
              actions={
                <>
                  <Button asChild className="rounded-full bg-white px-6 text-[rgba(34,27,23,0.94)] hover:bg-white/90">
                    <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">WhatsApp aç</a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-white/24 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white">
                    <a href={siteConfig.phoneHref}>Zəng et</a>
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
