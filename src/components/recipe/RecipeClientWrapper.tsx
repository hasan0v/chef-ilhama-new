'use client';

import { useRecipeTracking } from '@/hooks/useAnalytics';
import ShareButton from '@/components/recipe/ShareButton';
import PrintButton from '@/components/recipe/PrintButton';
import { Recipe } from '@/types/recipe';

interface RecipeActionButtonsProps {
  recipe: Recipe;
  className?: string;
  layout?: 'horizontal' | 'vertical';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export default function RecipeActionButtons({ 
  recipe, 
  className = '',
  layout = 'horizontal',
  size = 'icon',
  variant = 'default'
}: RecipeActionButtonsProps) {
  const { trackRecipeShare, trackRecipePrint } = useRecipeTracking(recipe.slug);

  const containerClass = layout === 'vertical' 
    ? 'flex flex-col space-y-4' 
    : 'flex gap-2';

  const buttonClass = layout === 'vertical' 
    ? 'w-full'
    : size === 'icon' 
      ? 'bg-white/95 hover:bg-white text-gray-900 shadow-lg'
      : '';

  return (
    <div className={`${containerClass} ${className}`}>
      <ShareButton 
        title={recipe.name}
        size={size}
        variant={layout === 'vertical' ? 'outline' : variant}
        className={buttonClass}
        onShare={trackRecipeShare}
      />
      <PrintButton 
        size={size}
        variant={layout === 'vertical' ? 'outline' : variant}
        className={buttonClass}
        onPrint={trackRecipePrint}
      />
    </div>
  );
}