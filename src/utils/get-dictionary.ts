import { az } from '@/dictionaries/az';
import { en } from '@/dictionaries/en';
import { tr } from '@/dictionaries/tr';

export function getDictionary(locale?: string) {
  if (locale === 'en') return en;
  if (locale === 'tr') return tr;
  return az;
}
