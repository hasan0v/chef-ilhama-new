'use client';

import { motion, useInView, LazyMotion, domAnimation } from 'framer-motion';
import { useRef, memo, useMemo, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChefHat, 
  Clock, 
  BookOpen, 
  Star, 
  MapPin,
  Sparkles,
  Heart,
  Award
} from 'lucide-react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import { Recipe } from '@/types/recipe';
import { getValidImageUrl } from '@/utils/imageUtils';

interface HomePageProps {
  featuredRecipes: Recipe[];
  stats: {
    totalRecipes: number;
    totalCategories: number;
    totalRegions: number;
    featuredRecipes: number;
    difficultyBreakdown: {
      easy: number;
      medium: number;
      hard: number;
    };
  };
}

function HomePage({ featuredRecipes, stats }: HomePageProps) {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuredRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const featuredInView = useInView(featuredRef, { once: true, margin: "-100px" });

  const animationVariants = useMemo(() => ({
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.3,
          staggerChildren: 0.2
        }
      }
    },
    itemVariants: {
      hidden: { y: 50, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          type: "spring" as const,
          stiffness: 100
        }
      }
    },
    floatingAnimation: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  }), []);

  const { containerVariants, itemVariants, floatingAnimation } = animationVariants;
  const router = useRouter();

  // Preload critical routes on component mount
  useEffect(() => {
    // Prefetch critical routes immediately
    router.prefetch('/reseptler');
    router.prefetch('/haqqinda');
    
    // Prefetch recipe pages after a short delay
    const prefetchTimer = setTimeout(() => {
      featuredRecipes.slice(0, 6).forEach(recipe => {
        router.prefetch(`/resept/${recipe.slug}`);
      });
    }, 100);
    
    return () => clearTimeout(prefetchTimer);
  }, [router, featuredRecipes]);

  // Handle instant navigation with optimistic updates
  const handleInstantNavigation = useCallback((href: string) => {
    // Start navigation immediately without waiting
    router.push(href);
  }, [router]);

  // Memoize featured recipes rendering for better performance
  const memoizedFeaturedRecipes = useMemo(() => {
    return featuredRecipes.map((recipe) => (
      <motion.div
        key={recipe.id}
        variants={itemVariants}
        className="group"
      >
        <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={getValidImageUrl(recipe.image)}
              alt={recipe.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                {recipe.name}
              </h3>
              <div className="flex items-center text-white/80 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{recipe.origin}</span>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline" className="text-sm">
                {recipe.category}
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{recipe.prepTime}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4">
              {recipe.history}
            </p>
            <Button 
              className="w-full"
              onClick={() => handleInstantNavigation(`/resept/${recipe.slug}`)}
              onMouseEnter={() => router.prefetch(`/resept/${recipe.slug}`)}
            >
              Resepti Gör
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    ));
  }, [featuredRecipes, itemVariants, handleInstantNavigation, router]);

  return (
    <LazyMotion features={domAnimation}>
      <PageLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50"
        >
          {/* Animated Background Elements */}
          <motion.div 
            animate={floatingAnimation}
            className="absolute top-20 left-10 w-20 h-20 bg-red-200/30 rounded-full blur-xl"
          />
          <motion.div 
            animate={{
              y: [-10, 10, -10],
              transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut" as const,
                delay: 2
              }
            }}
            className="absolute top-40 right-20 w-32 h-32 bg-orange-200/30 rounded-full blur-xl"
          />
          <motion.div 
            animate={{
              y: [-10, 10, -10],
              transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut" as const,
                delay: 4
              }
            }}
            className="absolute bottom-20 left-1/4 w-24 h-24 bg-yellow-200/30 rounded-full blur-xl"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium text-red-600 mb-6 shadow-lg">
                <Sparkles className="h-4 w-4" />
                <span>Azərbaycanın Ənənəvi Dadları</span>
              </div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                Chef İlhamə
              </span>
              <br />
              <span className="text-gray-900">Professional Aşpaz Xidməti</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Bakının ən professional şəxsi aşpazı. Katerinq xidməti, toy yeməkləri, şirkət tədbirləri.
              <br className="hidden md:block" />
              15+ il təcrübə ilə Azərbaycan mətbəxinin ən dadlı reseptlərini hazırlayırıq.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => handleInstantNavigation('/reseptler')}
                onMouseEnter={() => router.prefetch('/reseptler')}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Reseptləri Kəşf Et
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gray-300 hover:border-red-600 hover:text-red-600 px-8 py-4 text-lg rounded-full transition-all duration-300"
                onClick={() => handleInstantNavigation('/haqqinda')}
                onMouseEnter={() => router.prefetch('/haqqinda')}
              >
                <Heart className="mr-2 h-5 w-5" />
                Haqqında
              </Button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">{stats.totalRecipes}</div>
                <div className="text-gray-600 text-sm">Resept</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">{stats.totalCategories}</div>
                <div className="text-gray-600 text-sm">Kateqoriya</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stats.totalRegions}</div>
                <div className="text-gray-600 text-sm">Bölgə</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">{stats.featuredRecipes}</div>
                <div className="text-gray-600 text-sm">Seçilmiş</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section 
          ref={statsRef}
          className="py-20 bg-white"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Rəqəmlərlə Biz
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Azərbaycan mətbəxinin zənginliyini rəqəmlərlə ifadə edirik
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div variants={itemVariants}>
                <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-red-50 to-red-100">
                  <CardContent className="pt-8 pb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-red-600 mb-3">{stats.totalRecipes}</div>
                    <div className="text-gray-700 font-medium">Ənənəvi Resept</div>
                    <div className="text-sm text-gray-500 mt-2">
                      Seçkin kolleksiya
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100">
                  <CardContent className="pt-8 pb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <ChefHat className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-orange-600 mb-3">{stats.totalCategories}</div>
                    <div className="text-gray-700 font-medium">Yemək Kateqoriyası</div>
                    <div className="text-sm text-gray-500 mt-2">
                      Müxtəlif növlər
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
                  <CardContent className="pt-8 pb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <MapPin className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-green-600 mb-3">{stats.totalRegions}</div>
                    <div className="text-gray-700 font-medium">Bölgə Mətbəxi</div>
                    <div className="text-sm text-gray-500 mt-2">
                      Coğrafi müxtəliflik
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="text-center border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-yellow-50 to-yellow-100">
                  <CardContent className="pt-8 pb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-yellow-600 mb-3">{stats.featuredRecipes}</div>
                    <div className="text-gray-700 font-medium">Seçilmiş Resept</div>
                    <div className="text-sm text-gray-500 mt-2">
                      Məşhur dadlar
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Featured Recipes */}
        <section 
          ref={featuredRef}
          className="py-20 bg-gradient-to-b from-gray-50 to-white"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={featuredInView ? "visible" : "hidden"}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-100 to-orange-100 rounded-full px-6 py-3 text-sm font-medium text-red-600 mb-6">
                <Star className="h-4 w-4" />
                <span>Ən populyar reseptlər</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Seçilmiş Reseptlər
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ən məşhur və sevimli Azərbaycan yeməklərini hazırlamağı öyrənin
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {memoizedFeaturedRecipes.slice(0, 6)}
            </div>
            
            <motion.div variants={itemVariants} className="text-center mt-16">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300"
                onClick={() => handleInstantNavigation('/reseptler')}
                onMouseEnter={() => router.prefetch('/reseptler')}
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Bütün Reseptləri Gör
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Tez-tez Verilən Suallar
              </h2>
              <p className="text-xl text-gray-600">
                Şəxsi aşpaz və katerinq xidməti haqqında ən çox verilən suallar
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Aşpaz xidməti qiyməti nə qədərdir?
                </h3>
                <p className="text-gray-600">
                  Qiymətlər tədbirin növünə, qonaq sayına və menyu seçiminə görə dəyişir. Minimum 50 AZN-dən başlayır. Dəqiq qiymət üçün +994 10 379 45 77 nömrəsinə müracət edin.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Hansı sahələrdə xidmət göstərirsiniz?
                </h3>
                <p className="text-gray-600">
                  Bakı, Sumqayıt, Abşeron rayonu və ətraf bölgələrdə xidmət göstəririk. Uzaq məsafələr üçün əlavə nəqliyyat xərci tətbiq olunur.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Nə qədər əvvəldən sifariş vermək lazımdır?
                </h3>
                <p className="text-gray-600">
                  Şəxsi tədbirlər üçün minimum 48 saat, toy və böyük tədbirlər üçün isə 1-2 həftə əvvəldən sifariş verməniz tövsiyə olunur.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Toy yeməkləri üçün nə kimi xidmətlər təqdim edirsiniz?
                </h3>
                <p className="text-gray-600">
                  Toy menyusunun hazırlanması, bütün yeməklərin hazırlanması, təqdim edilməsi və xidmət personalinin təmin olunması. Ənənəvi Azərbaycan toy yeməklərindən tutmuş müasir banket menyularına qədər.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Xüsusi pəhriz tələblərini nəzərə alırsınız?
                </h3>
                <p className="text-gray-600">
                  Bəli, vegetarian, halal, diabet və digər xüsusi pəhriz tələblərini nəzərə alaraq menyu hazırlayırıq. Sifariş zamanı xüsusi istəklərinizi bildirin.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg rounded-full shadow-lg"
                onClick={() => window.open('https://wa.me/994103794577', '_blank')}
              >
                WhatsApp ilə Əlaqə
              </Button>
            </div>
          </div>
        </section>
      </div>
      </PageLayout>
    </LazyMotion>
  );
}

export default memo(HomePage);