'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ChefHat, Eye } from 'lucide-react';
import { Recipe } from '@/types/recipe';
import { getValidImageUrl } from '@/utils/imageUtils';

interface AnimatedRecipeCardProps {
  recipe: Recipe;
  index?: number;
}

export default function AnimatedRecipeCard({ recipe, index = 0 }: AnimatedRecipeCardProps) {
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" as const,
        delay: index * 0.1
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.4, ease: "easeOut" as const }
    }
  };

  const contentVariants = {
    hover: {
      y: -5,
      transition: { duration: 0.3, ease: "easeOut" as const }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group"
    >
      <Link href={`/resept/${recipe.slug}`}>
        <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            <motion.div
              variants={imageVariants}
              className="w-full h-full"
            >
              <Image
                src={getValidImageUrl(recipe.image)}
                alt={recipe.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Floating badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Badge className="bg-red-600 hover:bg-red-700 text-white shadow-lg">
                  {recipe.category}
                </Badge>
              </motion.div>
              {recipe.featured && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="mr-1"
                    >
                      ⭐
                    </motion.div>
                    Seçilmiş
                  </Badge>
                </motion.div>
              )}
            </div>

            {/* Difficulty Badge */}
            <div className="absolute top-3 right-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <Badge className={`${getDifficultyColor(recipe.difficulty)} shadow-lg border`}>
                  <ChefHat className="h-3 w-3 mr-1" />
                  {recipe.difficulty}
                </Badge>
              </motion.div>
            </div>

            {/* Hover overlay with view icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                <Eye className="h-6 w-6 text-red-600" />
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <motion.div variants={contentVariants}>
            <CardContent className="p-4 space-y-3">
              {/* Title */}
              <motion.h3 
                className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.6 }}
              >
                {recipe.name}
              </motion.h3>

              {/* Description/History */}
              <motion.p 
                className="text-sm text-gray-600 line-clamp-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.7 }}
              >
                {recipe.history || recipe.servingSuggestions || 'Dadlı Azərbaycan yeməyi'}
              </motion.p>

              {/* Recipe Stats */}
              <motion.div 
                className="flex items-center justify-between pt-2 border-t border-gray-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.8 }}
              >
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <motion.div 
                    className="flex items-center gap-1"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Clock className="h-3 w-3" />
                    <span>{recipe.prepTime}</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-1"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Users className="h-3 w-3" />
                    <span>{recipe.servings} nəfər</span>
                  </motion.div>
                </div>

                {/* Origin */}
                <motion.div 
                  className="text-xs text-red-600 font-medium"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {recipe.origin.split(',')[0]}
                </motion.div>
              </motion.div>

              {/* Tags as date alternative */}
              {recipe.tags && recipe.tags.length > 0 && (
                <motion.div 
                  className="flex items-center gap-1 text-xs text-gray-400 pt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.9 }}
                >
                  <div className="flex flex-wrap gap-1">
                    {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </CardContent>
          </motion.div>

          {/* Animated Border */}
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-red-500/0 group-hover:border-red-500/20 transition-colors duration-300"
            whileHover={{
              boxShadow: "0 0 0 1px rgba(239, 68, 68, 0.2)"
            }}
          />
        </Card>
      </Link>
    </motion.div>
  );
}