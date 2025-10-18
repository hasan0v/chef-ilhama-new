// Utility function to validate and sanitize image URLs
export function getValidImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl || imageUrl.trim() === '') {
    return '/placeholder-recipe.svg';
  }
  
  try {
    // Check if it's already a valid URL
    new URL(imageUrl);
    return imageUrl;
  } catch {
    // If it's not a valid URL, check if it looks like a relative path
    if (imageUrl.startsWith('/')) {
      return imageUrl;
    }
    
    // For invalid URLs or non-URL strings, return placeholder
    return '/placeholder-recipe.svg';
  }
}