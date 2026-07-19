import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = withLocaleAlternates('az', 'terms', {
  title: 'İstifadə Şərtləri - Chef İlhamə',
  description: 'Chef İlhamə saytının istifadəsi və aşpaz xidmətləri ilə bağlı əsas qaydalar.',
});

const sections = [
  {
    index: '01',
    title: 'Ümumi istifadə qaydaları',
    content: (
      <>
        <p>Bu saytdan istifadə etməklə aşağıdakı prinsiplərə əməl etməyi qəbul etmiş olursunuz.</p>
        <ul className="prose-list list-disc">
          <li>Saytdan qanuni və dürüst məqsədlərlə istifadə etmək</li>
          <li>Məzmunu saxtalaşdırmamaq və ya yanlış təqdim etməmək</li>
          <li>Müəllif hüquqlarına və mənbəyə hörmət etmək</li>
          <li>Xidmət sorğularında dəqiq məlumat təqdim etmək</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Aşpaz xidməti sifarişləri',
    content: (
      <>
        <p>Xidmət sifarişləri tədbirin ölçüsünə, tarixə və seçilən menyu quruluşuna görə ayrıca təsdiqlənir.</p>
        <ul className="prose-list list-disc">
          <li>Kiçik tədbirlər üçün ən azı 48 saat əvvəl müraciət tövsiyə olunur</li>
          <li>Toy və iri tədbirlər üçün 1-2 həftə öncədən planlama daha uyğundur</li>
          <li>Qiymət və xidmət konturu sorğudan sonra ayrıca təqdim edilir</li>
          <li>Məkan və logistika şərtləri təklifə təsir göstərə bilər</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Ləğvetmə və dəyişiklik',
    content: (
      <>
        <p>Tədbir tarixində dəyişiklik və ləğvetmə halları mümkün qədər tez bildirilməlidir.</p>
        <ul className="prose-list list-disc">
          <li>Əvvəlcədən bildirilən dəyişikliklər daha rahat yenidən planlanır</li>
          <li>Qısa müddətdə edilən ləğv hallarında xərclər yarana bilər</li>
          <li>Məhsul alışı və logistika başlanmış layihələr ayrıca qiymətləndirilir</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Resept məzmunu və müəllif hüquqları',
    content: (
      <>
        <p>Saytda yerləşən resept və mətn materialları şəxsi istifadə üçün açıqdır, lakin kommersial istifadə ayrıca razılıq tələb edir.</p>
        <ul className="prose-list list-disc">
          <li>Reseptləri şəxsi mətbəxdə sərbəst istifadə edə bilərsiniz</li>
          <li>Kommersial yayım və kopiya üçün əvvəlcədən icazə tələb olunur</li>
          <li>Mənbəsiz paylaşım və tam kopyalama düzgün hesab edilmir</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Xidmət keyfiyyəti və məsuliyyət',
    content: (
      <>
        <p>Komanda yüksək xidmət standartını qorumağa çalışır, lakin bəzi hallar bizim birbaşa nəzarətimizdə olmaya bilər.</p>
        <ul className="prose-list list-disc">
          <li>Fövqəladə hallar və məkan məhdudiyyətləri ayrıca qiymətləndirilir</li>
          <li>Müştərinin təqdim etdiyi qeyri-dəqiq məlumat nəticəyə təsir göstərə bilər</li>
          <li>Üçüncü tərəf gecikmələri üzrə məsuliyyət fərqli qaydada dəyərləndirilir</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Əlaqə və şikayətlər',
    content: (
      <>
        <p>İstifadə şərtləri, xidmət keyfiyyəti və ya digər mövzularla bağlı əlaqə üçün aşağıdakı kanallar aktivdir.</p>
        <ul className="prose-list list-disc">
          <li>Email: {siteConfig.email}</li>
          <li>Telefon / WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>İş saatları: {siteConfig.hours}</li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="İstifadə şərtləri"
      title={<>Saytın istifadəsi və xidmət sifarişləri ilə bağlı əsas qaydalar daha aydın bloklar şəklində təqdim olunur.</>}
      description="Yeni dizayn hüquqi səhifələri də oxunaqlı edib: artıq uzun, yorucu mətn axını əvəzinə strukturlaşdırılmış kartlar görünür."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}
