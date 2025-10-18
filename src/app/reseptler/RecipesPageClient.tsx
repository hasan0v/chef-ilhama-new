'use client';

import { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import RecipeGrid from '@/components/recipe/RecipeGrid';
import SearchBar from '@/components/recipe/SearchBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Recipe } from '@/types/recipe';
import { searchRecipes, filterRecipes, sortRecipes } from '@/utils/processRecipes';
import { Filter, SortAsc, SortDesc, X } from 'lucide-react';

interface RecipesPageProps {
  initialRecipes: Recipe[];
  categories: string[];
  regions: string[];
}

export default function RecipesPage({ initialRecipes, categories, regions }: RecipesPageProps) {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(initialRecipes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('alphabetical');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters and search
  useEffect(() => {
    let result = initialRecipes;

    // Apply search
    if (searchQuery) {
      result = searchRecipes(result, searchQuery);
    }

    // Apply filters
    const filters = {
      category: selectedCategories,
      region: selectedRegions,
      difficulty: selectedDifficulties,
    };

    result = filterRecipes(result, filters);

    // Apply sorting
    result = sortRecipes(result, sortBy, sortOrder);

    setFilteredRecipes(result);
  }, [initialRecipes, searchQuery, selectedCategories, selectedRegions, selectedDifficulties, sortBy, sortOrder]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleRegionToggle = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) 
        ? prev.filter(r => r !== region)
        : [...prev, region]
    );
  };

  const handleDifficultyToggle = (difficulty: string) => {
    setSelectedDifficulties(prev => 
      prev.includes(difficulty) 
        ? prev.filter(d => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedRegions([]);
    setSelectedDifficulties([]);
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedRegions.length > 0 || selectedDifficulties.length > 0 || searchQuery;

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Bütün Reseptlər
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Azərbaycan mətbəxinin zəngin dünyasını kəşf edin
              </p>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="w-full lg:w-96">
                <SearchBar 
                  onSearch={setSearchQuery}
                  placeholder="Resept, məhsul və ya bölgə axtar..."
                  initialValue={searchQuery}
                />
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filtrlər
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedCategories.length + selectedRegions.length + selectedDifficulties.length}
                    </Badge>
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="alphabetical">Alfabetik</option>
                    <option value="difficulty">Çətinlik</option>
                    <option value="prepTime">Hazırlanma vaxtı</option>
                  </select>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">Aktiv filtrlər:</span>
                  
                  {selectedCategories.map(category => (
                    <Badge key={category} variant="secondary" className="flex items-center gap-1">
                      {category}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => handleCategoryToggle(category)}
                      />
                    </Badge>
                  ))}
                  
                  {selectedRegions.map(region => (
                    <Badge key={region} variant="secondary" className="flex items-center gap-1">
                      {region}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => handleRegionToggle(region)}
                      />
                    </Badge>
                  ))}
                  
                  {selectedDifficulties.map(difficulty => (
                    <Badge key={difficulty} variant="secondary" className="flex items-center gap-1">
                      {difficulty}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => handleDifficultyToggle(difficulty)}
                      />
                    </Badge>
                  ))}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-xs"
                  >
                    Hamısını təmizlə
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="lg:w-64 space-y-6">
                {/* Categories */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-3">Kateqoriyalar</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <label key={category} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Regions */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-3">Bölgələr</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {regions.slice(0, 10).map(region => (
                        <label key={region} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedRegions.includes(region)}
                            onChange={() => handleRegionToggle(region)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{region}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Difficulty */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-3">Çətinlik</h3>
                    <div className="space-y-2">
                      {['Asan', 'Orta', 'Çətin'].map(difficulty => (
                        <label key={difficulty} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedDifficulties.includes(difficulty)}
                            onChange={() => handleDifficultyToggle(difficulty)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{difficulty}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Results */}
            <div className="flex-1">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">
                  {filteredRecipes.length} resept tapıldı
                </p>
              </div>

              <RecipeGrid recipes={filteredRecipes} />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}