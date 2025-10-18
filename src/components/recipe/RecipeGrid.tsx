'use client';

import { motion } from 'framer-motion';
import { Recipe } from '@/types/recipe';
import AnimatedRecipeCard from './AnimatedRecipeCard';

interface RecipeGridProps {
  recipes: Recipe[];
  className?: string;
}

export default function RecipeGrid({ recipes, className = '' }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md mx-auto">
          <motion.div 
            className="text-gray-400 mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.div>
          <motion.h3 
            className="text-lg font-medium text-gray-900 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Heç bir resept tapılmadı
          </motion.h3>
          <motion.p 
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Axtarış kriteriyalarınızı dəyişdirərək yenidən cəhd edin.
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {recipes.map((recipe, index) => (
        <AnimatedRecipeCard key={recipe.id} recipe={recipe} index={index} />
      ))}
    </motion.div>
  );
}