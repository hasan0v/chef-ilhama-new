'use client';

import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
  title: string;
  url?: string;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  onShare?: () => void; // Callback for analytics tracking
}

export default function ShareButton({ 
  title, 
  url, 
  className = '', 
  size = 'default',
  variant = 'default',
  onShare
}: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    
    const shareData = {
      title: `Chef İlhamə - ${title}`,
      text: `Bu dadlı resepti yoxlayın: ${title}`,
      url: url || window.location.href,
    };

    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(shareData.url);
        alert('Link panoya kopyalandı!');
      }
      
      // Track the share action
      if (onShare) {
        onShare();
      }
    } catch (error) {
      console.error('Paylaşım xətası:', error);
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link panoya kopyalandı!');
        
        // Track the share action even for fallback
        if (onShare) {
          onShare();
        }
      } catch (clipboardError) {
        console.error('Pano xətası:', clipboardError);
        alert('Paylaşım mümkün olmadı');
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Button
      onClick={handleShare}
      disabled={isSharing}
      size={size}
      variant={variant}
      className={className}
    >
      <Share2 className="h-4 w-4 mr-2" />
      {size !== 'icon' && (isSharing ? 'Paylaşılır...' : 'Paylaş')}
    </Button>
  );
}