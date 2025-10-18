'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  ChefHat, 
  X,
  Grid3X3,
  LayoutList,
  Star,
  MapPin
} from 'lucide-react';
import Image from 'next/image';
import PageLayout from '@/components/layout/PageLayout';
import { Recipe } from '@/types/recipe';
import { getValidImageUrl } from '@/utils/imageUtils';
import { useRouter } from 'next/navigation';
import { recipeMatchesCategory, getCategoryStats } from '@/utils/categoryUtils';

interface ModernRecipesPageProps {
  initialRecipes: Recipe[];
  categories: string[];
  regions: string[];
}

export default function ModernRecipesPage({ initialRecipes, categories, regions }: ModernRecipesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  const difficulties = ['Asan', 'Orta', 'Çətin'];

  const handleInstantNavigation = useCallback((href: string) => {
    router.push(href);
  }, [router]);

  const filteredRecipes = useMemo(() => {
    return initialRecipes.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.origin.toLowerCase().includes(searchTerm.toLowerCase());
      // Use the new category matching logic that supports split categories
      const matchesCategory = recipeMatchesCategory(recipe.category, selectedCategory);
      const matchesRegion = !selectedRegion || recipe.origin.includes(selectedRegion);
      const matchesDifficulty = !selectedDifficulty || recipe.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesRegion && matchesDifficulty;
    });
  }, [initialRecipes, searchTerm, selectedCategory, selectedRegion, selectedDifficulty]);
  
  // Get category statistics with split categories
  const categoryStats = useMemo(() => {
    return getCategoryStats(initialRecipes);
  }, [initialRecipes]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedRegion('');
    setSelectedDifficulty('');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Asan':
        return 'bg-green-100 text-green-800';
      case 'Orta':
        return 'bg-yellow-100 text-yellow-800';
      case 'Çətin':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto text-center text-white">
            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Bütün Reseptlər
            </motion.h1>
            <motion.p 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            >
              Azərbaycan mətbəxinin zəngin kolleksiyasını kəşf edin
            </motion.p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <Badge className="bg-white/20 text-white text-lg px-6 py-2">
                {filteredRecipes.length} resept tapıldı
              </Badge>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Resept axtar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 rounded-full border-2 focus:border-red-500"
                />
              </div>

              {/* View Toggle and Filters */}
              <div className="flex items-center gap-4">
                <div className="flex bg-gray-100 rounded-full p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-full"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-full"
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filtrlər
                </Button>
              </div>
            </div>

            {/* Filter Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t pt-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kateqoriya
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="">Hamısı</option>
                        {categories.filter(cat => cat && cat.trim()).map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Region Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bölgə
                      </label>
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="">Hamısı</option>
                        {regions.map(region => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Çətinlik
                      </label>
                      <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="">Hamısı</option>
                        {difficulties.map(difficulty => (
                          <option key={difficulty} value={difficulty}>
                            {difficulty}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Clear Filters */}
                    <div className="flex items-end">
                      <Button
                        variant="outline"
                        onClick={clearFilters}
                        className="w-full flex items-center gap-2"
                      >
                        <X className="h-4 w-4" />
                        Təmizlə
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Recipes Grid/List */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewMode}-${searchTerm}-${selectedCategory}-${selectedRegion}-${selectedDifficulty}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                  : "space-y-6"
                }
              >
                {filteredRecipes.map((recipe, index) => (
                  <motion.div 
                    key={recipe.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {viewMode === 'grid' ? (
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={getValidImageUrl(recipe.image)}
                            alt={recipe.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Featured Badge */}
                          {recipe.featured && (
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-yellow-500 text-white">
                                <Star className="h-3 w-3 mr-1" />
                                Seçilmiş
                              </Badge>
                            </div>
                          )}

                          {/* Quick View Button */}
                          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button 
                              className="w-full bg-white/90 hover:bg-white text-gray-900"
                              onClick={() => handleInstantNavigation(`/resept/${recipe.slug}`)}
                              onMouseEnter={() => router.prefetch(`/resept/${recipe.slug}`)}
                            >
                              Resepti Gör
                            </Button>
                          </div>
                        </div>

                        <CardContent className="p-6">
                          <div className="mb-3">
                            <Badge className={getDifficultyColor(recipe.difficulty)}>
                              {recipe.difficulty}
                            </Badge>
                            {recipe.category && (
                              <Badge variant="outline" className="ml-2">
                                {recipe.category}
                              </Badge>
                            )}
                          </div>

                          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-red-600 transition-colors duration-300">
                            {recipe.name}
                          </h3>

                          <p className="text-gray-600 text-sm mb-4 flex items-center line-clamp-1">
                            <MapPin className="h-4 w-4 mr-1 text-red-500 flex-shrink-0" />
                            {recipe.origin}
                          </p>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center bg-gray-50 rounded-full px-3 py-1">
                              <Clock className="h-4 w-4 mr-1" />
                              {recipe.prepTime}
                            </div>
                            <div className="flex items-center bg-gray-50 rounded-full px-3 py-1">
                              <Users className="h-4 w-4 mr-1" />
                              {recipe.servings}
                            </div>
                          </div>

                          <Button 
                            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                            onClick={() => handleInstantNavigation(`/resept/${recipe.slug}`)}
                            onMouseEnter={() => router.prefetch(`/resept/${recipe.slug}`)}
                          >
                            Hazırla
                          </Button>
                        </CardContent>
                      </Card>
                    ) : (
                      // List View
                      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex gap-6">
                            <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={getValidImageUrl(recipe.image)}
                                alt={recipe.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 
                                    className="font-bold text-xl mb-2 hover:text-red-600 transition-colors duration-300 cursor-pointer"
                                    onClick={() => handleInstantNavigation(`/resept/${recipe.slug}`)}
                                    onMouseEnter={() => router.prefetch(`/resept/${recipe.slug}`)}
                                  >
                                    {recipe.name}
                                  </h3>
                                  <p className="text-gray-600 flex items-center mb-2">
                                    <MapPin className="h-4 w-4 mr-1 text-red-500" />
                                    {recipe.origin}
                                  </p>
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                  {recipe.featured && (
                                    <Badge className="bg-yellow-500 text-white">
                                      <Star className="h-3 w-3 mr-1" />
                                      Seçilmiş
                                    </Badge>
                                  )}
                                  <Badge className={getDifficultyColor(recipe.difficulty)}>
                                    {recipe.difficulty}
                                  </Badge>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {recipe.prepTime}
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  {recipe.servings}
                                </div>
                                <div className="flex items-center">
                                  <ChefHat className="h-4 w-4 mr-1" />
                                  {recipe.ingredients.length} məhsul
                                </div>
                                {recipe.category && (
                                  <Badge variant="outline">
                                    {recipe.category}
                                  </Badge>
                                )}
                              </div>

                              <Button 
                                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                                onClick={() => handleInstantNavigation(`/resept/${recipe.slug}`)}
                                onMouseEnter={() => router.prefetch(`/resept/${recipe.slug}`)}
                              >
                                Resepti Gör
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* No Results */}
            {filteredRecipes.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Heç bir resept tapılmadı
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Axtarış kriteriyalarınızı dəyişməyi və ya filtrlər təmizləməyi sınayın.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Filtrlər təmizlə
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}