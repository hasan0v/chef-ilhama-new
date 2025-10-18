'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Star } from 'lucide-react';
import RecipeGrid from '@/components/recipe/RecipeGrid';
import { Recipe } from '@/types/recipe';

interface AnimatedHomepageProps {
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

export default function AnimatedHomepage({ featuredRecipes, stats }: AnimatedHomepageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const recipesRef = useRef(null);
  const categoriesRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const recipesInView = useInView(recipesRef, { once: true, amount: 0.2 });
  const categoriesInView = useInView(categoriesRef, { once: true, amount: 0.2 });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  const categories = [
    { name: 'Əsas yemək', count: stats.difficultyBreakdown.easy + stats.difficultyBreakdown.medium, icon: '🍽️', color: 'from-red-400 to-red-600' },
    { name: 'Şorba/Aş', count: 8, icon: '🍲', color: 'from-orange-400 to-orange-600' },
    { name: 'Şirniyyat', count: 12, icon: '🧁', color: 'from-pink-400 to-pink-600' },
    { name: 'Qəlyanaltı', count: 6, icon: '🥗', color: 'from-green-400 to-green-600' },
    { name: 'Kabab/Manqal', count: 10, icon: '🔥', color: 'from-yellow-400 to-yellow-600' }
  ];

  return (
    <div ref={containerRef} className="overflow-hidden">
      {/* Animated Hero Section */}
      <section ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center">
        {/* Animated Background Elements */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-30"
        >
          <div className="absolute top-20 left-10 w-32 h-32 bg-red-200 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-orange-200 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-yellow-200 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {/* Chef Hat Animation */}
            <motion.div 
              className="flex justify-center mb-8"
              variants={scaleIn}
            >
              <motion.div 
                className="relative p-6 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-2xl"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.5)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ChefHat className="h-16 w-16 text-white" />
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Star className="h-4 w-4 text-yellow-600 m-1" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Title Animation */}
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              variants={fadeInUp}
            >
              Chef{' '}
              <motion.span 
                className="text-red-600 inline-block"
                whileHover={{ 
                  scale: 1.05,
                  textShadow: "0 0 8px rgb(220, 38, 38)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                İlhamə
              </motion.span>
            </motion.h1>

            {/* Subtitle Animation */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Azərbaycan mətbəxinin zəngin dadlarını kəşf edin. 
              <br className="hidden md:block" />
              Ənənəvi reseptlərdən müasir interpretasiyalara qədər.
            </motion.p>

            {/* Buttons Animation */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center"
              variants={fadeInUp}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="text-lg px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg">
                  <Link href="/reseptler">
                    Reseptləri Kəşf Et
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" className="text-lg px-10 py-4 border-2 border-red-600 text-red-600 hover:bg-red-50">
                  <Link href="/haqqinda">
                    Haqqında
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute bottom-10 left-10 opacity-20"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-6xl">🍽️</div>
        </motion.div>
        <motion.div
          className="absolute top-20 right-10 opacity-20"
          animate={{
            y: [10, -10, 10],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="text-4xl">🥘</div>
        </motion.div>
      </section>

      {/* Animated Stats Section */}
      <section ref={statsRef} className="py-16 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,0,0,0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {[
              { value: stats.totalRecipes, label: 'Resept', color: 'text-red-600', bgColor: 'bg-red-50', icon: '📖' },
              { value: stats.totalCategories, label: 'Kateqoriya', color: 'text-green-600', bgColor: 'bg-green-50', icon: '🏷️' },
              { value: stats.totalRegions, label: 'Bölgə', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: '🗺️' },
              { value: stats.featuredRecipes, label: 'Seçilmiş', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: '⭐' }
            ].map((stat, index) => (
              <motion.div key={stat.label} variants={scaleIn}>
                <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className={`p-6 text-center ${stat.bgColor} relative overflow-hidden`}>
                    <motion.div 
                      className="text-4xl mb-3"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      {stat.icon}
                    </motion.div>
                    <motion.div 
                      className={`text-4xl font-bold ${stat.color} mb-2`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      >
                        {stat.value}
                      </motion.span>
                    </motion.div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Animated Featured Recipes */}
      <section ref={recipesRef} className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate={recipesInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              variants={fadeInUp}
            >
              Seçilmiş Reseptlər
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Chef İlhamənin ən məşhur və dadlı reseptlərini kəşf edin
            </motion.p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={recipesInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
          >
            <RecipeGrid recipes={featuredRecipes.slice(0, 8)} />
          </motion.div>
          
          <motion.div 
            className="text-center mt-16"
            initial="hidden"
            animate={recipesInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" variant="outline" className="text-lg px-10 py-4 border-2 border-red-600 text-red-600 hover:bg-red-50">
                <Link href="/reseptler">
                  Bütün Reseptləri Gör
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Animated Categories */}
      <section ref={categoriesRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            animate={categoriesInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              variants={fadeInUp}
            >
              Kateqoriyalar
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Müxtəlif yemək növlərini kəşf edin
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            initial="hidden"
            animate={categoriesInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {categories.map((category, index) => (
              <motion.div key={category.name} variants={scaleIn}>
                <motion.div
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <Card className="overflow-hidden border-0 shadow-lg">
                    <CardContent className={`p-8 text-center bg-gradient-to-br ${category.color} text-white relative`}>
                      <motion.div 
                        className="text-4xl mb-4"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {category.icon}
                      </motion.div>
                      <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.count} resept</p>
                      
                      {/* Decorative elements */}
                      <motion.div
                        className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      />
                      <motion.div
                        className="absolute bottom-2 left-2 w-1 h-1 bg-white/30 rounded-full"
                        animate={{ scale: [1, 2, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Animated Call to Action */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
            backgroundSize: '50px 50px'
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              animate={{
                textShadow: [
                  '0 0 0px rgba(255,255,255,0)',
                  '0 0 20px rgba(255,255,255,0.3)',
                  '0 0 0px rgba(255,255,255,0)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Azərbaycan Mətbəxini Kəşf Etməyə Hazırsınız?
            </motion.h2>
            <motion.p 
              className="text-xl mb-10 opacity-90"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Ənənəvi dadlardan müasir interpretasiyalara qədər hər şeyi tapın
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button asChild size="lg" variant="secondary" className="text-lg px-12 py-4 bg-white text-red-700 hover:bg-gray-100 shadow-xl">
                <Link href="/reseptler">
                  İndi Başlayın
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}