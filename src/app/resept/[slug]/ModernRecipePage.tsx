'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import RecipeStructuredData from '@/components/recipe/RecipeStructuredData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Clock, 
  Users, 
  ChefHat, 
  ArrowLeft, 
  MapPin, 
  Star,
  Heart,
  Share2,
  Printer,
  CheckCircle2,
  Circle,
  History,
  Award
} from 'lucide-react';
import { Recipe } from '@/types/recipe';
import { getValidImageUrl } from '@/utils/imageUtils';

interface ModernRecipePageProps {
  recipe: Recipe;
}

export default function ModernRecipePage({ recipe }: ModernRecipePageProps) {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  const toggleStep = (index: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSteps(newCompleted);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Asan':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Orta':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Çətin':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <PageLayout>
      <RecipeStructuredData recipe={recipe} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
          <Image
            src={getValidImageUrl(recipe.image)}
            alt={recipe.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          {/* Back Button */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 left-8"
          >
            <Button asChild className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
              <Link href="/reseptler" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Geri
              </Link>
            </Button>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute top-8 right-8 flex gap-2"
          >
            <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
              <Printer className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Recipe Title and Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-4xl"
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-6">
                {recipe.featured && (
                  <Badge className="bg-yellow-500/90 backdrop-blur-sm text-white px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Seçilmiş
                  </Badge>
                )}
                <Badge className={`${getDifficultyColor(recipe.difficulty)} backdrop-blur-sm px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm border`}>
                  {recipe.difficulty}
                </Badge>
                {recipe.category && (
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">
                    {recipe.category}
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold text-white mb-2 sm:mb-4 leading-tight">
                {recipe.name}
              </h1>

              {/* Origin */}
              <p className="text-sm sm:text-lg md:text-2xl text-white/90 mb-3 sm:mb-6 flex items-center">
                <MapPin className="h-4 w-4 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-red-400" />
                {recipe.origin}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 text-white">
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 sm:px-4 sm:py-2">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-red-400" />
                  <span className="font-medium text-xs sm:text-sm">{recipe.prepTime}</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 sm:px-4 sm:py-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-green-400" />
                  <span className="font-medium text-xs sm:text-sm">{recipe.servings} nəfər</span>
                </div>
                <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 sm:px-4 sm:py-2">
                  <ChefHat className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-orange-400" />
                  <span className="font-medium text-xs sm:text-sm">{recipe.ingredients.length} məhsul</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Ingredients */}
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-xl bg-white">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-3xl font-bold text-gray-900 flex items-center">
                      <ChefHat className="h-8 w-8 mr-3 text-red-600" />
                      Tərkib Hissələri
                    </CardTitle>
                    <p className="text-gray-600 mt-2">
                      {recipe.ingredients.length} məhsul lazımdır
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recipe.ingredients.map((ingredient, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                          checkedIngredients.has(index)
                            ? 'bg-green-50 border-l-4 border-green-500'
                            : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => toggleIngredient(index)}
                      >
                        <div className="mr-4">
                          {checkedIngredients.has(index) ? (
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                          ) : (
                            <Circle className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <span className={`text-lg ${
                          checkedIngredients.has(index) 
                            ? 'text-green-800 line-through' 
                            : 'text-gray-800'
                        }`}>
                          {ingredient}
                        </span>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Instructions */}
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-xl bg-white">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-3xl font-bold text-gray-900 flex items-center">
                      <Award className="h-8 w-8 mr-3 text-orange-600" />
                      Hazırlanma Qaydası
                    </CardTitle>
                    <p className="text-gray-600 mt-2">
                      {recipe.instructions.length} addım
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {recipe.instructions.map((instruction, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex gap-6 p-6 rounded-xl transition-all duration-300 ${
                          completedSteps.has(index)
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => toggleStep(index)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                              completedSteps.has(index)
                                ? 'bg-green-600 text-white'
                                : 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700'
                            }`}
                          >
                            {completedSteps.has(index) ? (
                              <CheckCircle2 className="h-6 w-6" />
                            ) : (
                              <span>{index + 1}</span>
                            )}
                          </button>
                        </div>
                        <div className="flex-1">
                          <p className={`text-lg leading-relaxed ${
                            completedSteps.has(index) 
                              ? 'text-green-800' 
                              : 'text-gray-800'
                          }`}>
                            {instruction}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Historical Info */}
              {recipe.history && (
                <motion.div variants={itemVariants}>
                  <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                        <History className="h-6 w-6 mr-2 text-blue-600" />
                        Tarixi Məlumat
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">
                        {recipe.history}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Serving Suggestions */}
              {recipe.servingSuggestions && (
                <motion.div variants={itemVariants}>
                  <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                        <Users className="h-6 w-6 mr-2 text-green-600" />
                        Təqdim Təklifləri
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">
                        {recipe.servingSuggestions}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Progress Summary */}
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-50">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      İrəliləmə
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Məhsullar</span>
                        <span className="font-medium">
                          {checkedIngredients.size}/{recipe.ingredients.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(checkedIngredients.size / recipe.ingredients.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Addımlar</span>
                        <span className="font-medium">
                          {completedSteps.size}/{recipe.instructions.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${(completedSteps.size / recipe.instructions.length) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>

                    {checkedIngredients.size === recipe.ingredients.length && 
                     completedSteps.size === recipe.instructions.length && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-green-100 border border-green-300 rounded-lg p-4 text-center"
                      >
                        <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <p className="text-green-800 font-medium">
                          Təbriklər! Resept tamamlandı! 🎉
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </PageLayout>
  );
}