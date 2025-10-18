import Image from 'next/image';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Award, BookOpen, Utensils } from 'lucide-react';
import { memo } from 'react';
import type { Metadata } from 'next';

// Cache for 1 hour since this is static content
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Haqqında - Chef İlhamə',
  description: 'Chef İlhamə haqqında məlumat və missiyamız',
};

function AboutPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-50 to-orange-50 py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Chef <span className="text-red-600">İlhamə</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Azərbaycan mətbəxinin ənənəvi dadlarını müasir dünyaya gətirən 
                  təcrübəli aşpaz və kulinariya ustası.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Badge className="bg-red-600 hover:bg-red-700 text-white px-4 py-2">
                    <ChefHat className="h-4 w-4 mr-2" />
                    Professional Chef
                  </Badge>
                  <Badge className="bg-green-600 hover:bg-green-700 text-white px-4 py-2">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Cookbook Author
                  </Badge>
                  <Badge className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2">
                    <Award className="h-4 w-4 mr-2" />
                    Culinary Expert
                  </Badge>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square relative rounded-2xl overflow-hidden">
                  <Image
                    src="/ilhama.png"
                    alt="Chef İlhamə"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-100 rounded-full opacity-50" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-100 rounded-full opacity-30" />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Missiyamız
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Azərbaycan mətbəxinin zəngin mədəni irsini qoruyub saxlamaq və gələcək nəsillərə 
              çatdırmaq üçün ənənəvi reseptləri toplayır, müasir texnikalarla birləşdirərək 
              hər kəsin evində hazırlaya biləcəyi formaya gətiririk.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Utensils className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Ənənəvi Dadlar</h3>
                  <p className="text-gray-600 text-sm">
                    Əcdadlarımızın qədim reseptlərini qoruyuruq
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Bilik Paylaşımı</h3>
                  <p className="text-gray-600 text-sm">
                    Kulinariya təcrübəmizi hamı ilə bölüşürük
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-6">
                  <ChefHat className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Müasir Yanaşma</h3>
                  <p className="text-gray-600 text-sm">
                    Ənənəvi reseptləri müasir mətbəxə uyğunlaşdırırıq
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Bizim Hekayəmiz
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    Chef İlhamə kiçik yaşlarından Azərbaycan mətbəxinin zəngin ənənələri 
                    arasında böyümüşdür. Anasının və nənəsinin mətbəxində keçirdikləri 
                    saatlar onun yemək hazırlamağa olan sevgisinin əsasını qoymuşdur.
                  </p>
                  <p>
                    Peşəkar kulinariya təcrübəsi aldıqdan sonra, İlhamə öz məqsədini 
                    Azərbaycan mətbəxinin nadir və unudulmaq üzrə olan reseptlərini 
                    qoruyub saxlamaq olaraq müəyyən etmişdir.
                  </p>
                  <p>
                    Bu veb-sayt vasitəsilə o, öz topadığı 50-dən çox unikal resepti 
                    dünya ilə paylaşır və hər bir yeməyin arxasında duran tarixi və 
                    mədəni hekayələri çatdırır.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">50+</div>
                    <div className="text-sm text-gray-600">Unikal Resept</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">25+</div>
                    <div className="text-sm text-gray-600">Bölgə</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">15+</div>
                    <div className="text-sm text-gray-600">İl Təcrübə</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                    <div className="text-sm text-gray-600">Məmnun Müştəri</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Dəyərlərimiz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Keyfiyyət</h3>
                <p className="text-gray-600">
                  Hər bir reseptimiz diqqətlə seçilmiş və sınaqdan keçmiş tərkib 
                  hissələri ilə hazırlanmışdır.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Orijinallıq</h3>
                <p className="text-gray-600">
                  Ənənəvi reseptlərin orijinal formalarını qoruyub saxlayırıq və 
                  onları müasir mətbəxə uyğunlaşdırırıq.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Mədəni İrs</h3>
                <p className="text-gray-600">
                  Azərbaycan mətbəxinin mədəni dəyərlərini qoruyub gələcək 
                  nəsillərə çatdırmaq bizim əsas məqsədimizdir.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Paylaşım</h3>
                <p className="text-gray-600">
                  Biliklərini və təcrübələrini hər kəslə sərbəst şəkildə 
                  paylaşmağa inanırıq.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}

export default memo(AboutPage);