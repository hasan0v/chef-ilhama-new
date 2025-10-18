import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-50 to-orange-50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Məxfilik <span className="text-red-600">Siyasəti</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chef İlhamə veb-saytında şəxsi məlumatlarınızın qorunması barədə məlumat
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Məlumat Toplama
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Veb-saytımızda aşağıdakı məlumatları toplaya bilərik:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Ad və əlaqə məlumatları (əlaqə formu vasitəsilə)</li>
                    <li>Email ünvanı (xidmət sifarişləri üçün)</li>
                    <li>Telefon nömrəsi (WhatsApp əlaqəsi üçün)</li>
                    <li>Veb-sayt istifadə statistikaları (Google Analytics)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Məlumatların İstifadəsi
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Topladığımız məlumatları aşağıdakı məqsədlər üçün istifadə edirik:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Aşpaz xidməti sifarişlərinin işlənməsi</li>
                    <li>Müştəri dəstəyi və əlaqə</li>
                    <li>Xidmət keyfiyyətinin yaxşılaşdırılması</li>
                    <li>Veb-saytın performansının təhlili</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Məlumatların Qorunması
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Şəxsi məlumatlarınızın təhlükəsizliyini təmin etmək üçün:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>SSL şifrələmə texnologiyasından istifadə edirik</li>
                    <li>Məlumatları təhlükəsiz serverlərdə saxlayırıq</li>
                    <li>Yalnız səlahiyyətli personala giriş icazəsi veririk</li>
                    <li>Müntəzəm təhlükəsizlik yoxlamaları aparırıq</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Üçüncü Tərəflər
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Şəxsi məlumatlarınızı üçüncü tərəflərə satmırıq. Lakin aşağıdakı hallarda paylaşa bilərik:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Google Analytics (anonim statistik məlumatlar)</li>
                    <li>WhatsApp (əlaqə üçün istifadə etdiyinizdə)</li>
                    <li>Qanuni tələblər zamanı</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Sizin Hüquqlarınız
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Şəxsi məlumatlarınızla bağlı aşağıdakı hüquqlara maliksiniz:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Məlumatlarınızı görməK və yeniləmək</li>
                    <li>Məlumatlarınızın silinməsini tələb etmək</li>
                    <li>Məlumat emalından imtina etmək</li>
                    <li>Məlumatlarınızın portativliyini tələb etmək</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Əlaqə
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Məxfilik siyasəti ilə bağlı suallarınız varsa, bizimlə əlaqə saxlayın:
                  </p>
                  <div className="space-y-2 text-gray-600">
                    <p><strong>Email:</strong> info@chef-ilhama.food</p>
                    <p><strong>WhatsApp:</strong> +994 10 379 45 77</p>
                    <p><strong>Ünvan:</strong> Bakı, Azərbaycan</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <p className="text-sm text-gray-500">
                    Bu məxfilik siyasəti sonuncu dəfə 29 sentyabr 2025-ci ildə yenilənmişdir.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}