import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = withLocaleAlternates('tr', 'privacy', {
  title: 'Gizlilik Politikası - Şef İlhame',
  description: 'Şef İlhame web sitesinde toplanan kişisel veriler ve bunların nasıl korunduğu hakkında bilgiler.',
});

const sections = [
  {
    index: '01',
    title: 'Hangi veriler toplanır',
    content: (
      <>
        <p>
          Web sitemiz üzerinden talep formları, WhatsApp yönlendirmeleri ve analitik araçlarla sınırlı miktarda veri toplamaktayız. Amacımız taleplerinize doğru yanıt vermek ve hizmet kalitesini analiz etmektir.
        </p>
        <ul className="prose-list list-disc">
          <li>Ad soyad ve iletişim detayları</li>
          <li>E-posta adresi ve telefon numarası</li>
          <li>Etkinlik ve hizmet taleplerine dair detaylar</li>
          <li>Anonim web sitesi kullanım istatistikleri</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Verilerin kullanım amacı',
    content: (
      <>
        <p>Toplanan tüm veriler, sizlere daha kaliteli ve hızlı bir hizmet sunabilmek için kullanılır.</p>
        <ul className="prose-list list-disc">
          <li>Rezervasyon ve catering taleplerine geri dönüş yapmak</li>
          <li>Menü ve etkinlik planlamasını kişiselleştirmek</li>
          <li>Hizmet kalitesini ve iletişim geçmişini izlemek</li>
          <li>Site performansını ve kullanıcı davranışlarını analiz etmek</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Verilerin korunması',
    content: (
      <>
        <p>Kişisel verilerinizin güvenliğini sağlamak amacıyla gerekli teknik ve operasyonel önlemler alınmaktadır.</p>
        <ul className="prose-list list-disc">
          <li>Güvenli sunucu ve veri tabanı altyapısı</li>
          <li>Yalnızca gerekli olan bilgilerin saklanması</li>
          <li>Verilere erişim yetkilerinin sınırlandırılması</li>
          <li>Üçüncü taraf araçlarında minimum veri paylaşımı ilkesi</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Üçüncü taraf hizmetler',
    content: (
      <>
        <p>Sitede bazı dış servis altyapıları kullanılmaktadır. Bu servislerin kendi gizlilik şartları mevcuttur.</p>
        <ul className="prose-list list-disc">
          <li>Analitik ölçümler için Google Analytics</li>
          <li>Hızlı iletişim ve rezervasyonlar için WhatsApp</li>
          <li>Hizmet sürekliliği için barındırma (hosting) ve e-posta altyapısı</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Haklarınız',
    content: (
      <>
        <p>Kişisel verilerinizle ilgili olarak her zaman bizimle iletişime geçebilirsiniz.</p>
        <ul className="prose-list list-disc">
          <li>Verilerinizi görüntüleme ve düzeltme talebi</li>
          <li>Verilerinizin silinmesini isteme hakkı</li>
          <li>İletişim izinlerinin iptal edilmesi</li>
          <li>Veri işleme süreçleri hakkında detaylı bilgi alma talebi</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'İletişim',
    content: (
      <>
        <p>Gizlilik politikası ile ilgili tüm soru ve talepleriniz için aşağıdaki kanalları kullanabilirsiniz.</p>
        <ul className="prose-list list-disc">
          <li>E-posta: {siteConfig.email}</li>
          <li>WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Hizmet bölgeleri: Bakü, Sumgayıt ve Abşeron genelinde</li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Gizlilik Politikası"
      title={<>Kişisel bilgilerinizin nasıl toplandığı, kullanıldığı ve korunduğu burada şeffaf bir şekilde açıklanmıştır.</>}
      description="Hukuki metinler de web sitemizin yeni tasarım diline uyarlandı: Bilgilendirmeler kolay okunabilir kartlara bölündü ve sadeleştirildi."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}
