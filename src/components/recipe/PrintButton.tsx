'use client';

import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import { useState } from 'react';

interface PrintButtonProps {
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  onPrint?: () => void; // Callback for analytics tracking
}

export default function PrintButton({ 
  className = '', 
  size = 'default',
  variant = 'default',
  onPrint
}: PrintButtonProps) {
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    
    // Create print-friendly version
    const printStyles = `
      <style>
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          header, footer, nav, .header, .footer { display: none !important; }
          @page { margin: 1cm; }
        }
        .print-only { display: none; }
      </style>
    `;

    // Add print styles to document
    const styleElement = document.createElement('style');
    styleElement.innerHTML = printStyles;
    document.head.appendChild(styleElement);

    // Add print-area class to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.classList.add('print-area');
    }

    // Hide navigation and other non-essential elements
    const elementsToHide = document.querySelectorAll('header, footer, nav, .no-print');
    elementsToHide.forEach(el => el.classList.add('no-print'));

    // Print
    window.print();
    
    // Track the print action
    if (onPrint) {
      onPrint();
    }

    // Clean up after printing
    setTimeout(() => {
      document.head.removeChild(styleElement);
      if (mainContent) {
        mainContent.classList.remove('print-area');
      }
      elementsToHide.forEach(el => el.classList.remove('no-print'));
      setIsPrinting(false);
    }, 1000);
  };

  return (
    <Button
      onClick={handlePrint}
      disabled={isPrinting}
      size={size}
      variant={variant}
      className={className}
    >
      <Printer className="h-4 w-4 mr-2" />
      {size !== 'icon' && (isPrinting ? 'Çap edilir...' : 'Çap Et')}
    </Button>
  );
}