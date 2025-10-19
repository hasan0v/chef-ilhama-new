'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ChefHat, 
  Users, 
  Clock,
  Phone,
  MapPin,
  Calendar,
  MessageCircle,
  CheckCircle2,
  Utensils,
  Building2,
  Crown,
  PartyPopper,
  GraduationCap,
  ClipboardCheck
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

export default function ServicesPageClient() {
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
    additionalNotes: ''
  });

  const serviceOptions = [
    { id: 'personal-chef', label: 'Şəxsi Aşpaz Xidməti', icon: ChefHat, description: 'Evinizə gələrək peşəkar yemək hazırlama' },
    { id: 'katerinq', label: 'Katerinq Xidməti', icon: Utensils, description: 'Tədbir üçün tam menyu hazırlığı' },
    { id: 'wedding', label: 'Toy Yeməkləri', icon: Crown, description: 'Toy və böyük məclis xidməti' },
    { id: 'corporate', label: 'Korporativ Tədbirlər', icon: Building2, description: 'Şirkət və iş yeməkləri' },
    { id: 'party', label: 'Nişan və Şənliklər', icon: PartyPopper, description: 'Ailə mərasimləri və tədbirlər' },
    { id: 'masterclass', label: 'Aşpazlıq Master-klass', icon: GraduationCap, description: 'Öyrənmək və inkişaf etmək' }
  ];

  const eventTypes = [
    'Toy mərasimi',
    'Nişan məclisi', 
    'Doğum günü',
    'Korporativ tədbir',
    'Ailə şənliyi',
    'İş görüşü/lanç',
    'Digər'
  ];

  const guestCounts = [
    '10-30 nəfər',
    '30-50 nəfər',
    '50-100 nəfər',
    '100-200 nəfər',
    '200-300 nəfər',
    '300+ nəfər'
  ];

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return formData.name && 
           formData.phone && 
           formData.services.length > 0 && 
           formData.eventType &&
           formData.guestCount;
  };

  const generateWhatsAppMessage = () => {
    const selectedServiceNames = serviceOptions
      .filter(service => formData.services.includes(service.id))
      .map(service => service.label)
      .join(', ');

    let message = `🍽️ *Aşpaz Xidməti Sorğusu*\n\n`;
    message += `👤 *Ad Soyad:* ${formData.name}\n`;
    message += `📞 *Telefon:* ${formData.phone}\n`;
    if (formData.email) message += `📧 *Email:* ${formData.email}\n`;
    message += `\n🎯 *Xidmət Növü:*\n${selectedServiceNames}\n\n`;
    message += `📅 *Tədbir Məlumatları:*\n`;
    message += `• Növ: ${formData.eventType}\n`;
    if (formData.eventDate) message += `• Tarix: ${formData.eventDate}\n`;
    message += `• Qonaq sayı: ${formData.guestCount}\n`;
    if (formData.location) message += `• Yer: ${formData.location}\n`;
    
    if (formData.menuPreference) {
      message += `\n🍴 *Menyu üstünlüyü:*\n${formData.menuPreference}\n`;
    }
    
    if (formData.dietaryRequirements) {
      message += `\n⚕️ *Dietik tələblər:*\n${formData.dietaryRequirements}\n`;
    }
    
    if (formData.budget) {
      message += `\n💰 *Büdcə:* ${formData.budget}\n`;
    }
    
    if (formData.additionalNotes) {
      message += `\n💭 *Əlavə qeydlər:*\n${formData.additionalNotes}\n`;
    }
    
    message += `\n---\nZəhmət olmasa mənə geri dönüş edəsiniz. Təşəkkür edirəm! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/994103794577?text=${encodedMessage}`, '_blank');
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        
        {/* Header Section */}
        <section className="relative py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <ChefHat className="h-16 w-16 mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Professional Aşpaz Xidməti
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-white/90">
                15+ il təcrübə • Bakı və Abşeron • Hər növ tədbir
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Clock className="h-4 w-4 mr-2" />
                  24/7 Əlaqə
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Users className="h-4 w-4 mr-2" />
                  1000+ Müştəri
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Təcrübəli Komanda
                </Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="shadow-xl">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b">
                  <div className="flex items-center justify-center mb-4">
                    <ClipboardCheck className="h-10 w-10 text-red-600" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl text-center text-gray-900">
                    Xidmət Sorğusu Formu
                  </CardTitle>
                  <p className="text-center text-gray-600 mt-2">
                    Formu doldurun və biz ən qısa zamanda sizinlə əlaqə saxlayaq
                  </p>
                </CardHeader>

                <CardContent className="p-6 md:p-8 space-y-8">
                  
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <Users className="h-5 w-5 text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">1. Şəxsi Məlumatlar</h3>
                      <Badge variant="destructive" className="ml-auto">Vacib</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Ad Soyad <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          placeholder="Adınızı və soyadınızı daxil edin"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="h-11"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Telefon nömrəsi <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+994 XX XXX XX XX"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="h-11"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email (İstəyə görə)
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-11"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <Utensils className="h-5 w-5 text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">2. Xidmət Növü Seçin</h3>
                      <Badge variant="destructive" className="ml-auto">Vacib</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {serviceOptions.map((service) => (
                        <motion.div
                          key={service.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card
                            className={`cursor-pointer transition-all duration-200 ${
                              formData.services.includes(service.id)
                                ? 'ring-2 ring-red-500 bg-red-50 border-red-200'
                                : 'hover:shadow-md hover:border-gray-300'
                            }`}
                            onClick={() => handleServiceToggle(service.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className={`mt-1 ${
                                  formData.services.includes(service.id) ? 'text-red-600' : 'text-gray-400'
                                }`}>
                                  <service.icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900 mb-1">
                                    {service.label}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {service.description}
                                  </p>
                                </div>
                                {formData.services.includes(service.id) && (
                                  <CheckCircle2 className="h-5 w-5 text-red-600 flex-shrink-0" />
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <Calendar className="h-5 w-5 text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">3. Tədbir Məlumatları</h3>
                      <Badge variant="destructive" className="ml-auto">Vacib</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="eventType" className="text-sm font-medium">
                          Tədbir Növü <span className="text-red-500">*</span>
                        </Label>
                        <select
                          id="eventType"
                          value={formData.eventType}
                          onChange={(e) => handleInputChange('eventType', e.target.value)}
                          className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        >
                          <option value="">Seçin...</option>
                          {eventTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="eventDate" className="text-sm font-medium">
                          Tədbir Tarixi
                        </Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={formData.eventDate}
                          onChange={(e) => handleInputChange('eventDate', e.target.value)}
                          className="h-11"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="guestCount" className="text-sm font-medium">
                          Qonaq Sayı <span className="text-red-500">*</span>
                        </Label>
                        <select
                          id="guestCount"
                          value={formData.guestCount}
                          onChange={(e) => handleInputChange('guestCount', e.target.value)}
                          className="w-full h-11 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          required
                        >
                          <option value="">Seçin...</option>
                          {guestCounts.map((count) => (
                            <option key={count} value={count}>{count}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location" className="text-sm font-medium">
                          Tədbir Yeri
                        </Label>
                        <Input
                          id="location"
                          placeholder="Məsələn: Bakı, Yasamal rayonu"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="h-11"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Menu Preferences */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                      <ChefHat className="h-5 w-5 text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">4. Menyu və Üstünlüklər</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="menuPreference" className="text-sm font-medium">
                          Menyu Üstünlüyü
                        </Label>
                        <Textarea
                          id="menuPreference"
                          placeholder="Sevdiyiniz yeməkləri qeyd edin (məsələn: Döşəmə plov, Yarpaq dolması, Piti)"
                          value={formData.menuPreference}
                          onChange={(e) => handleInputChange('menuPreference', e.target.value)}
                          rows={3}
                          className="resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dietaryRequirements" className="text-sm font-medium">
                          Dietik Tələblər və Allergenlər
                        </Label>
                        <Textarea
                          id="dietaryRequirements"
                          placeholder="Halal, vegetarian, allergen məlumatları və s."
                          value={formData.dietaryRequirements}
                          onChange={(e) => handleInputChange('dietaryRequirements', e.target.value)}
                          rows={2}
                          className="resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget" className="text-sm font-medium">
                          Təxmini Büdcə
                        </Label>
                        <Input
                          id="budget"
                          placeholder="Məsələn: 500-1000 AZN"
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="h-11"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-4">
                    <Label htmlFor="additionalNotes" className="text-sm font-medium">
                      Əlavə Qeydlər
                    </Label>
                    <Textarea
                      id="additionalNotes"
                      placeholder="Xüsusi istəklər, suallar və ya digər məlumatlar..."
                      value={formData.additionalNotes}
                      onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      onClick={generateWhatsAppMessage}
                      disabled={!isFormValid()}
                      size="lg"
                      className="w-full bg-green-600 hover:bg-green-700 text-white h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <MessageCircle className="h-6 w-6 mr-3" />
                      WhatsApp ilə Göndər
                    </Button>
                    
                    {!isFormValid() && (
                      <p className="text-sm text-red-600 mt-3 text-center flex items-center justify-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                        Zəhmət olmasa bütün vacib sahələri (*) doldurun
                      </p>
                    )}
                    
                    <p className="text-sm text-gray-500 mt-4 text-center">
                      Formu göndərdikdən sonra WhatsApp açılacaq və mesajınızı göndərə biləcəksiniz
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Banner */}
        <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Birbaşa Əlaqə</h3>
                <p className="text-gray-300">Sualınız var? Bizimlə dərhal əlaqə saxlayın</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a
                  href="tel:+994103794577"
                  className="flex flex-col items-center p-6 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Phone className="h-8 w-8 mb-3 text-green-400" />
                  <span className="font-semibold mb-1">Telefon</span>
                  <span className="text-sm text-gray-300">+994 10 379 45 77</span>
                </a>
                
                <a
                  href="https://wa.me/994103794577"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-6 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <MessageCircle className="h-8 w-8 mb-3 text-green-400" />
                  <span className="font-semibold mb-1">WhatsApp</span>
                  <span className="text-sm text-gray-300">Dərhal yazın</span>
                </a>
                
                <div className="flex flex-col items-center p-6 bg-white/10 rounded-lg">
                  <MapPin className="h-8 w-8 mb-3 text-red-400" />
                  <span className="font-semibold mb-1">Xidmət Ərazisi</span>
                  <span className="text-sm text-gray-300">Bakı, Sumqayıt, Abşeron</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
