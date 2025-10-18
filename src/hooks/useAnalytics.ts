import { useEffect, useCallback } from 'react';

// Track page visits
export const usePageVisit = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'visit'
          }),
        });
      } catch (error) {
        console.error('Visit tracking error:', error);
      }
    };

    trackVisit();
  }, []);
};

// Track recipe interactions
export const useRecipeTracking = (recipeSlug: string) => {
  const trackRecipeView = useCallback(async () => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'recipe',
          recipeSlug,
          recipeAction: 'view'
        }),
      });
    } catch (error) {
      console.error('Recipe view tracking error:', error);
    }
  }, [recipeSlug]);

  const trackRecipeShare = useCallback(async () => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'recipe',
          recipeSlug,
          recipeAction: 'share'
        }),
      });
    } catch (error) {
      console.error('Recipe share tracking error:', error);
    }
  }, [recipeSlug]);

  const trackRecipePrint = useCallback(async () => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'recipe',
          recipeSlug,
          recipeAction: 'print'
        }),
      });
    } catch (error) {
      console.error('Recipe print tracking error:', error);
    }
  }, [recipeSlug]);

  // Track view automatically when component mounts
  useEffect(() => {
    if (recipeSlug) {
      trackRecipeView();
    }
  }, [recipeSlug, trackRecipeView]);

  return {
    trackRecipeView,
    trackRecipeShare,
    trackRecipePrint
  };
};

// Track search queries
export const useSearchTracking = () => {
  const trackSearch = async (query: string, resultsCount: number) => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'search',
          query,
          resultsCount
        }),
      });
    } catch (error) {
      console.error('Search tracking error:', error);
    }
  };

  return { trackSearch };
};

// Contact form submission
export const useContactForm = () => {
  const submitContact = async (contactData: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Form göndərilərkən xəta baş verdi');
      }

      return result;
    } catch (error) {
      console.error('Contact form error:', error);
      throw error;
    }
  };

  return { submitContact };
};