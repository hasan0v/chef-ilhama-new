import PageLayout from '@/components/layout/PageLayout';
import ContactForm from '@/components/contact/ContactForm';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';

export default function ContactPage() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-50 to-orange-50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional <span className="text-red-600">Aşpaz Xidməti</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Toy, banket, korporativ tədbirlər və şəxsi aşpaz xidməti üçün 
              bizimlə əlaqə saxlayın. 15+ il təcrübə ilə xidmətinizdəyik.
            </p>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Aşpaz Xidməti Sifarişi
                </h2>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Əlaqə Məlumatları
                  </h2>
                  <div className="space-y-4">
                    <Card>
                      <CardContent className="p-4 flex items-center space-x-4">
                        <Mail className="h-6 w-6 text-red-600" />
                        <div>
                          <div className="font-semibold">Email</div>
                          <div className="text-gray-600">info@chef-ilhama.food</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 flex items-center space-x-4">
                        <Phone className="h-6 w-6 text-green-600" />
                        <div className="flex-1">
                          <div className="font-semibold">WhatsApp</div>
                          <div className="text-gray-600 mb-2">+994 10 379 45 77</div>
                          <a href="https://wa.me/994103794577?text=Salam%20Chef%20İlhamə,%20aşpaz%20xidməti%20haqqında%20məlumat%20almaq%20istəyirəm" 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             className="inline-flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors">
                            <Phone className="h-4 w-4 mr-1" />
                            Mesaj Göndər
                          </a>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 flex items-center space-x-4">
                        <MapPin className="h-6 w-6 text-orange-600" />
                        <div>
                          <div className="font-semibold">Xidmət Sahələri</div>
                          <div className="text-gray-600">Bakı, Sumqayıt, Abşeron rayonu</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 flex items-center space-x-4">
                        <Clock className="h-6 w-6 text-blue-600" />
                        <div>
                          <div className="font-semibold">Xidmət Saatları</div>
                          <div className="text-gray-600">Hər gün: 08:00 - 22:00</div>
                          <div className="text-sm text-gray-500">Təcili sifarişlər üçün 24/7</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Sosial Şəbəkələr
                  </h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.instagram.com/chef.ilhama" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-shadow"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a 
                      href="https://www.facebook.com/chef.ilhama.baku" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                      aria-label="Facebook"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a 
                      href="https://wa.me/994103794577" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-green-600 text-white rounded-lg hover:shadow-lg transition-shadow"
                      aria-label="WhatsApp"
                    >
                      <Phone className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Aşpaz Xidməti haqqında Suallar
            </h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    Aşpaz xidməti qiyməti nə qədərdir?
                  </h3>
                  <p className="text-gray-600">
                    Qiymətlər tədbirin növünə, qonaq sayına və menyu seçiminə görə dəyişir. 
                    Minimum 50 AZN-dən başlayır. Dəqiq qiymət üçün WhatsApp ilə əlaqə saxlayın.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    Nə qədər əvvəldən sifariş vermək lazımdır?
                  </h3>
                  <p className="text-gray-600">
                    Şəxsi tədbirlər üçün minimum 48 saat, toy və böyük tədbirlər üçün isə 
                    1-2 həftə əvvəldən sifariş verməniz tövsiyə olunur.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    Hansı sahələrdə xidmət göstərirsiniz?
                  </h3>
                  <p className="text-gray-600">
                    Bakı, Sumqayıt, Abşeron rayonu və ətraf bölgələrdə xidmət göstəririk. 
                    Uzaq məsafələr üçün əlavə nəqliyyat xərci tətbiq olunur.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    Xüsusi pəhriz tələblərini nəzərə alırsınız?
                  </h3>
                  <p className="text-gray-600">
                    Bəli, vegetarian, halal, diabet və digər xüsi pəhriz tələblərini nəzərə alaraq 
                    menyu hazırlayırıq. Sifariş zamanı xüsi istəklərinizi bildirin.
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