'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  ChefHat, 
  Users, 
  Clock, 
  Award, 
  Heart,
  Phone,
  MessageCircle,
  CheckCircle,
  Star,
  Utensils,
  Home,
  Building,
  Crown
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

export default function ServicesPageClient() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [eventSize, setEventSize] = useState<string>('');
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const [customDishes, setCustomDishes] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const services = [
    {
      id: 'banquet',
      title: 'Banket Təşkili',
      icon: Crown,
      description: '10+ il təcrübə ilə böyük banketlər və məclislər',
      features: ['Tam menyu planlaması', 'Xidmət heyəti', 'Professional servis', 'Təcrübəli komanda']
    },
    {
      id: 'catering',
      title: 'Onsite Catering',
      icon: Utensils,
      description: 'Yerində hazırlanan təzə və dadlı yeməklər',
      features: ['Məkanda hazırlama', 'Təzə məhsullar', 'Professional avadanlıq', 'Həssas servis']
    },
    {
      id: 'home-service',
      title: 'Evə Servis',
      icon: Home,
      description: 'Evinizin rahatlığında professional xidmət',
      features: ['Evdə hazırlama', 'Fərdi yanaşma', 'Ailə atmosferi', 'Keyfiyyətli servis']
    },
    {
      id: 'corporate',
      title: 'Korporativ Tədbirlər',
      icon: Building,
      description: 'Şirkət tədbirləri və iş yeməkləri',
      features: ['Business lunch', 'Şirkət bayramları', 'Konfrans yeməkləri', 'VIP xidmət']
    },
    {
      id: 'special-events',
      title: 'Xüsusi Tədbirlər',
      icon: Heart,
      description: 'Nişan, şənlik və ailə tədbirləri',
      features: ['Nişan mərasimləri', 'Doğum günləri', 'Ailə şənlikləri', 'Milli bayramlar']
    },
    {
      id: 'masterclass',
      title: 'Master-klas',
      icon: ChefHat,
      description: 'Aşpazlıq sənətini öyrənin',
      features: ['Fərdi dərslər', 'Qrup dərsləri', 'Resept paylaşımı', 'Praktik təlim']
    }
  ];

  const eventSizes = [
    { value: '<50', label: '50-dən az nəfər', icon: '👥' },
    { value: '50-100', label: '50-100 nəfər', icon: '👨‍👩‍👧‍👦' },
    { value: '100-200', label: '100-200 nəfər', icon: '🏛️' },
    { value: '200-300', label: '200-300 nəfər', icon: '🎪' },
    { value: '300+', label: '300+ nəfər', icon: '🏟️' },
    { value: 'diger', label: 'Digər', icon: '📝' }
  ];

  const menuCategories = {
    plovlar: {
      title: 'Plovlar',
      icon: '🍚',
      items: [
        { id: 'doseme-plov', name: 'Döşəmə Plov', description: 'Ənənəvi Azərbaycan ər plov' },
        { id: 'shah-plov', name: 'Şah Plov', description: 'Xüsusi dadlar və ədviyyatlarla' },
        { id: 'qiymeli-plov', name: 'Qiyməli Plov', description: 'Ətin ləzzəti ilə zənginləşdirilmiş' },
        { id: 'sebzi-plov', name: 'Səbzi Plov', description: 'Tərəvəz və otlarla təbii dad' },
        { id: 'balqabaqli-plov', name: 'Balqabaqlı Plov', description: 'Payız dadları ilə' },
        { id: 'cizda-plov', name: 'Cızda Plov', description: 'Qızardılmış çörək ilə' },
        { id: 'eristeli-plov', name: 'Əriştəli Plov', description: 'İncə əriştə əlavəsi ilə' },
        { id: 'paxla-plov', name: 'Paxla Plov', description: 'Quru paxla və ədviyyatlarla' }
      ]
    },
    etYemekleri: {
      title: 'Ət Yeməkləri',
      icon: '🥩',
      items: [
        { id: 'bozbash', name: 'Bozbaş', description: 'Ənənəvi ət şorbası' },
        { id: 'buglama', name: 'Buğlama', description: 'Buxarda bişirilmiş ət' },
        { id: 'piti', name: 'Piti', description: 'Şuşa rayonunun məşhur yeməyi' },
        { id: 'nar-qovurma', name: 'Nar Qovurma', description: 'Nar turşusu ilə' },
        { id: 'kufte-bozbash', name: 'Küftə Bozbaş', description: 'Böyük köftələrlə' },
        { id: 'qaymaqli-qovurma', name: 'Qaymaqlı Qovurma', description: 'Qaymaqlı dadla' },
        { id: 'sebzi-qovurma', name: 'Səbzi Qovurma', description: 'Tərəvəzli qarışıq' }
      ]
    },
    quruIsti: {
      title: 'Quru İsti Yeməklər',
      icon: '🍲',
      items: [
        { id: 'yarpaq-dolmasi', name: 'Yarpaq Dolması', description: 'Əsl Azərbaycan ləzzəti' },
        { id: 'toyuq-cigirtmasi', name: 'Toyuq Çığırtması', description: 'Qızardılmış toyuq əti' },
        { id: 'ciz-biz', name: 'Cız-bız', description: 'Qarışıq ət və tərəvəz' }
      ]
    },
    xemirYemekleri: {
      title: 'Xəmir yeməkləri',
      icon: '🥟',
      items: [
        { id: 'manti', name: 'Mantı (xüsusi metodla)', description: 'Böyük mantı öz üslubumuzla' },
        { id: 'dusbere', name: 'Düşbərə', description: 'Kiçik mantı şorba ilə' },
        { id: 'xengel', name: 'Xəngəl', description: 'Yoğurt və sarımsaq ilə' }
      ]
    },
    duruYemekler: {
      title: 'Duru Yeməklər',
      icon: '🍜',
      items: [
        { id: 'dovga', name: 'Dovğa', description: 'Yoğurt və otlarla' },
        { id: 'shorba-novleri', name: 'Şorba növləri', description: 'Müxtəlif şorba variantları' },
        { id: 'siyiq-novleri', name: 'Sıyıq Növləri', description: 'Tərəvəz şorbaları' }
      ]
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleDishToggle = (dishId: string) => {
    setSelectedDishes(prev => 
      prev.includes(dishId) 
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId]
    );
  };

  const generateWhatsAppMessage = () => {
    const selectedServiceNames = services
      .filter(service => selectedServices.includes(service.id))
      .map(service => service.title)
      .join(', ');

    const selectedDishNames = Object.values(menuCategories)
      .flatMap(category => category.items)
      .filter(item => selectedDishes.includes(item.id))
      .map(item => item.name)
      .join(', ');

    let message = `🍽️ *Chef İlhamə Xidmət Tələbi*\n\n`;
    message += `👤 *Ad:* ${contactName}\n`;
    message += `📞 *Telefon:* ${contactPhone}\n\n`;
    message += `🎯 *Seçilmiş Xidmətlər:*\n${selectedServiceNames}\n\n`;
    message += `👥 *Tədbir Ölçüsü:* ${eventSize}\n`;
    if (eventDate) message += `📅 *Tədbir Tarixi:* ${eventDate}\n`;
    if (eventType) message += `🎉 *Tədbir Növü:* ${eventType}\n\n`;
    
    if (selectedDishNames) {
      message += `🍴 *Seçilmiş Yeməklər:*\n${selectedDishNames}\n\n`;
    }
    
    if (customDishes) {
      message += `📝 *Xüsusi Yeməklər:*\n${customDishes}\n\n`;
    }
    
    if (additionalNotes) {
      message += `💭 *Əlavə Qeydlər:*\n${additionalNotes}\n\n`;
    }
    
    message += `Xahiş edirəm mənimlə əlaqə saxlayın. Təşəkkür edirəm! 🙏`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/994103794577?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const isFormValid = () => {
    return contactName && contactPhone && selectedServices.length > 0 && eventSize;
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="flex justify-center items-center mb-6">
                <ChefHat className="h-16 w-16 text-red-600 mr-4" />
                <Award className="h-12 w-12 text-orange-500" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Professional <span className="text-red-600">Catering</span> Xidmətləri
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto">
                10+ il banket və məclis təcrübəsi • Freelance aşpaz və onsite catering • 
                Banket, nişan, şənlik, korporativ tədbirlər • Fərdi menyu, dietik və halal seçimlər • 
                Evə servis, master-klas və reseptlər
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4 text-lg">
                <Badge variant="secondary" className="px-4 py-2">
                  <Clock className="h-4 w-4 mr-2" />
                  10+ İl Təcrübə
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <Users className="h-4 w-4 mr-2" />
                  1000+ Müştəri
                </Badge>
                <Badge variant="secondary" className="px-4 py-2">
                  <Star className="h-4 w-4 mr-2" />
                  Premium Keyfiyyət
                </Badge>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Selection */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Xidmət Növlərimiz
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ehtiyacınıza uyğun xidmət növünü seçin və biz sizə ən yaxşı həlli təklif edərik
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                      selectedServices.includes(service.id) 
                        ? 'ring-2 ring-red-500 bg-red-50' 
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => handleServiceToggle(service.id)}
                  >
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <service.icon className={`h-12 w-12 ${
                          selectedServices.includes(service.id) ? 'text-red-600' : 'text-orange-500'
                        }`} />
                      </div>
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Size Selection */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tədbir Ölçüsü
              </h2>
              <p className="text-lg text-gray-600">
                Tədbirin ölçüsünü seçin ki, sizə uyğun qiymət və xidmət təklif edə bilək
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {eventSizes.map((size, index) => (
                <motion.div
                  key={size.value}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 text-center p-4 ${
                      eventSize === size.value 
                        ? 'ring-2 ring-red-500 bg-red-50' 
                        : 'hover:shadow-lg hover:scale-105'
                    }`}
                    onClick={() => setEventSize(size.value)}
                  >
                    <div className="text-3xl mb-2">{size.icon}</div>
                    <div className="font-semibold text-sm">{size.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Selection */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Menyu Seçimi
              </h2>
              <p className="text-lg text-gray-600">
                Tədbirin menyusunu təşkil etmək üçün sevdiyiniz yeməkləri seçin
              </p>
            </motion.div>

            {Object.entries(menuCategories).map(([categoryKey, category], categoryIndex) => (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  {category.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: itemIndex * 0.05 }}
                    >
                      <Card 
                        className={`cursor-pointer transition-all duration-300 h-full ${
                          selectedDishes.includes(item.id) 
                            ? 'ring-2 ring-red-500 bg-red-50' 
                            : 'hover:shadow-lg hover:scale-105'
                        }`}
                        onClick={() => handleDishToggle(item.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-gray-900 flex-1">
                              {item.name}
                            </h4>
                            {selectedDishes.includes(item.id) && (
                              <CheckCircle className="h-5 w-5 text-red-500 flex-shrink-0 ml-2" />
                            )}
                          </div>
                          {item.description && (
                            <p className="text-sm text-gray-600">{item.description}</p>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Custom Dishes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-12"
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Xüsusi Yeməklər
                </h3>
                <p className="text-gray-600 mb-4">
                  Siyahıda olmayan yeməklər istəyirsinizsə, burada qeyd edin:
                </p>
                <Textarea
                  placeholder="Məsələn: Xüsusi reseptlər, dietik yeməklər, allergen olmayan variantlar..."
                  value={customDishes}
                  onChange={(e) => setCustomDishes(e.target.value)}
                  className="min-h-[100px]"
                />
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="p-8">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl text-gray-900">
                    Tədbir Məlumatları
                  </CardTitle>
                  <p className="text-gray-600">
                    Sizinlə əlaqə saxlamaq üçün məlumatları doldurun
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adınız *
                      </label>
                      <Input
                        placeholder="Adınızı daxil edin"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon nömrəsi *
                      </label>
                      <Input
                        placeholder="+994 XX XXX XX XX"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tədbir tarixi
                      </label>
                      <Input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tədbir növü
                      </label>
                      <Input
                        placeholder="Məsələn: Nişan, toy, korporativ..."
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Əlavə qeydlər
                    </label>
                    <Textarea
                      placeholder="Xüsusi tələblər, alergiylər, dietik məhdudiyyətlər və s."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="pt-6">
                    <Button
                      onClick={generateWhatsAppMessage}
                      disabled={!isFormValid()}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                      size="lg"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      WhatsApp ilə Sifariş Ver
                    </Button>
                    
                    {!isFormValid() && (
                      <p className="text-sm text-red-600 mt-2 text-center">
                        Xahiş edirik, bütün vacib sahələri doldurun
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-12 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4">Bizimlə əlaqə</h3>
              <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-green-400" />
                  <span className="text-lg">+994 10 379 45 77</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-green-400" />
                  <span>WhatsApp üzərindən sifariş</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-orange-400" />
                  <span>24/7 Xidmət</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}