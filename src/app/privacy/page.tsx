import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = withLocaleAlternates('az', 'privacy', {
  title: 'Məxfilik Siyasəti - Chef İlhamə',
  description: 'Chef İlhamə saytında toplanan məlumatlar və onların necə qorunduğu barədə məlumat.',
});

const sections = [
  {
    index: '01',
    title: 'Hansı məlumatlar toplanır',
    content: (
      <>
        <p>
          Saytda əlaqə formaları, WhatsApp keçidləri və analitika vasitəsilə məhdud həcmdə məlumat toplanır. Məqsəd sifarişləri cavablandırmaq və xidmət keyfiyyətini izləməkdir.
        </p>
        <ul className="prose-list list-disc">
          <li>Ad və əlaqə məlumatları</li>
          <li>Email və telefon nömrəsi</li>
          <li>Tədbir və xidmət sorğusu qeydləri</li>
          <li>Anonim sayt istifadə statistikaları</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Məlumatların istifadə məqsədi',
    content: (
      <>
        <p>Toplanan məlumatlar yalnız xidmət prosesini daha dəqiq və sürətli idarə etmək üçün istifadə olunur.</p>
        <ul className="prose-list list-disc">
          <li>Sifariş və sorğulara cavab vermək</li>
          <li>Menyu və tədbir planlamasını uyğunlaşdırmaq</li>
          <li>Əlaqə tarixçəsini və xidmət keyfiyyətini izləmək</li>
          <li>Sayt performansını və istifadə axınlarını analiz etmək</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Məlumatların qorunması',
    content: (
      <>
        <p>Şəxsi məlumatların qorunması üçün texniki və əməliyyat səviyyəsində tədbirlər görülür.</p>
        <ul className="prose-list list-disc">
          <li>Təhlükəsiz hosting və giriş nəzarəti</li>
          <li>Yalnız zəruri məlumatların saxlanması</li>
          <li>Giriş hüquqlarının məhdudlaşdırılması</li>
          <li>Üçüncü tərəf alətlərindən istifadə zamanı minimum data prinsipi</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Üçüncü tərəf xidmətləri',
    content: (
      <>
        <p>Saytda bəzi xarici xidmətlərdən istifadə olunur. Bu xidmətlər öz məxfilik şərtlərinə malikdir.</p>
        <ul className="prose-list list-disc">
          <li>Google Analytics analitik məqsədlər üçün</li>
          <li>WhatsApp əlaqə və rezervasiya üçün</li>
          <li>Hosting və email infrastrukturu xidmətin davamlılığı üçün</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Sizin hüquqlarınız',
    content: (
      <>
        <p>İstənilən vaxt saxlanılan şəxsi məlumatlarla bağlı sorğu göndərə bilərsiniz.</p>
        <ul className="prose-list list-disc">
          <li>Məlumatlara baxış və düzəliş tələbi</li>
          <li>Məlumatların silinməsi ilə bağlı müraciət</li>
          <li>Kommunikasiya razılığından imtina</li>
          <li>Data emalı haqqında əlavə izah istəyi</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Əlaqə',
    content: (
      <>
        <p>Məxfilik siyasəti ilə bağlı sual və ya müraciət üçün aşağıdakı kanallardan istifadə edə bilərsiniz.</p>
        <ul className="prose-list list-disc">
          <li>Email: {siteConfig.email}</li>
          <li>WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Xidmət əhatəsi: {siteConfig.serviceAreas.join(', ')}</li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      showAnalyticsDisclosure
      eyebrow="Məxfilik siyasəti"
      title={<>Şəxsi məlumatların necə toplandığı, istifadə edildiyi və qorunduğu burada aydın şəkildə izah olunur.</>}
      description="Bu səhifə də saytın yeni dizayn sistemi ilə uyğunlaşdırılıb: hüquqi məzmun daha oxunaqlı bloklara bölünüb və kontakt informasiyası daha aydın təqdim olunur."
      sections={sections}
      updatedAt="23.07.2026"
    />
  );
}
