import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-50 to-orange-50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              İstifadə <span className="text-red-600">Şərtləri</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Chef İlhamə veb-saytı və xidmətlərinin istifadə qaydaları
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
                    Ümumi Şərtlər
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Bu veb-saytdan istifadə etməklə aşağıdakı şərtləri qəbul etmiş olursunuz:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Veb-saytı qanuni məqsədlər üçün istifadə etmək</li>
                    <li>Başqa istifadəçilərə zərər verməmək</li>
                    <li>Müəllif hüquqlarına hörmət etmək</li>
                    <li>Yalan və ya aldadıcı məlumat paylaşmamaq</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Aşpaz Xidməti Şərtləri
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Professional aşpaz xidməti sifarişi verərkən:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Minimum 48 saat əvvəldən sifariş verilməlidir</li>
                    <li>Toy və böyük tədbirlər üçün 1-2 həftə əvvəldən rezervasiya tələb olunur</li>
                    <li>Qiymətlər tədbirin ölçüsü və menyuya görə dəyişir</li>
                    <li>Ödəniş şərtləri ayrıca razılaşdırılır</li>
                    <li>Xidmətimiz Bakı, Sumqayıt və Abşeron rayonunda mövcuddur</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Ləğvetmə Siyasəti
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Sifariş ləğvetmə qaydaları:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>24 saatdan əvvəl ləğv edilərsə, heç bir ödəniş tələb olunmaz</li>
                    <li>24 saat ərzində ləğv edilərsə, 50% ödəniş tələb oluna bilər</li>
                    <li>Tədbir günü ləğv edilərsə, tam ödəniş tələb olunur</li>
                    <li>Fövqəladə hallar ayrıca nəzərdən keçirilir</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Məsuliyyət Məhdudiyyəti
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Chef İlhamə aşağıdakı hallarda məsuliyyət daşımır:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Fövqəladə hal və təbii fəlakətlər</li>
                    <li>Müştərinin səhv məlumat verməsi</li>
                    <li>Üçüncü tərəflərin səbəb olduğu gecikmələr</li>
                    <li>Qanuni məhdudiyyətlər</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Reseptlər və Müəllif Hüquqları
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Veb-saytımızdakı reseptlər barədə:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Şəxsi istifadə üçün pulsuzdur</li>
                    <li>Kommersiya məqsədli istifadə üçün icazə tələb olunur</li>
                    <li>Mənbə göstərmədən başqa yerdə paylaşmaq qadağandır</li>
                    <li>Reseptləri dəyişdirə bilərsiniz, lakin mənbəni qeyd etməlisiniz</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Xidmət Keyfiyyəti
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Biz həmişə yüksək keyfiyyətli xidmət təqdim etməyə çalışırıq:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>15+ il təcrübə ilə professional xidmət</li>
                    <li>Təzə və keyfiyyətli məhsulların istifadəsi</li>
                    <li>Gigiyena və təhlükəsizlik standartlarına riayət</li>
                    <li>Müştəri məmnuniyyətinin prioritet olması</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Əlaqə və Şikayətlər
                  </h2>
                  <p className="text-gray-600 mb-4">
                    İstifadə şərtləri ilə bağlı suallar və şikayətlər üçün:
                  </p>
                  <div className="space-y-2 text-gray-600">
                    <p><strong>Email:</strong> info@chef-ilhama.food</p>
                    <p><strong>WhatsApp:</strong> +994 10 379 45 77</p>
                    <p><strong>İş saatları:</strong> Hər gün 08:00 - 22:00</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Şərtlərin Dəyişdirilməsi
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Bu istifadə şərtləri zaman-zaman yenilənə bilər. Əsas dəyişikliklər barədə 
                    veb-saytımızda elan ediləcək. Şərtləri müntəzəm yoxlamağı tövsiyə edirik.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <p className="text-sm text-gray-500">
                    Bu istifadə şərtləri sonuncu dəfə 29 sentyabr 2025-ci ildə yenilənmişdir.
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