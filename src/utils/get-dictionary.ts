import { az } from '@/dictionaries/az';
import { en } from '@/dictionaries/en';
import { tr } from '@/dictionaries/tr';
import { ru } from '@/dictionaries/ru';

export function getDictionary(locale?: string) {
  if (locale === 'en') return en;
  if (locale === 'tr') return tr;
  if (locale === 'ru') return ru;
  return az;
}
