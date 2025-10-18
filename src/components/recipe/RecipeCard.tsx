'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Users, ChefHat } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Recipe } from '@/types/recipe';
import { useState } from 'react';
import { getValidImageUrl } from '@/utils/imageUtils';

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

export default function RecipeCard({ recipe, className = '' }: RecipeCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Asan':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Orta':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Çətin':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getImageSrc = () => {
    if (imageError) {
      return '/placeholder-recipe.svg';
    }
    return getValidImageUrl(recipe.image);
  };

  return (
    <Card className={`group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${className}`}>
      <Link href={`/resept/${recipe.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={getImageSrc()}
            alt={recipe.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
          {recipe.featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-red-600 text-white">
                Seçilmiş
              </Badge>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Tags overlay */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-wrap gap-1">
              <Badge variant="secondary" className="text-xs bg-white/90 text-gray-800">
                {recipe.origin.split(',')[0]}
              </Badge>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Title */}
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-red-700 transition-colors">
              {recipe.name}
            </h3>

            {/* Category */}
            <Badge variant="outline" className="text-xs">
              {recipe.category}
            </Badge>

            {/* Recipe stats */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{recipe.prepTime}</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{recipe.servings}</span>
              </div>
              
              <Badge 
                variant="secondary" 
                className={`text-xs ${getDifficultyColor(recipe.difficulty)}`}
              >
                {recipe.difficulty}
              </Badge>
            </div>

            {/* Ingredients count */}
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <ChefHat className="h-4 w-4" />
              <span>{recipe.ingredients.length} məhsul</span>
            </div>

            {/* Description preview */}
            {recipe.history && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {recipe.history.substring(0, 100)}...
              </p>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}