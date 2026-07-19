import { az } from '@/dictionaries/az';
import { en } from '@/dictionaries/en';

export function getDictionary(locale?: string) {
  return locale === 'en' ? en : az;
}
