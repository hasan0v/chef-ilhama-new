import { az } from '@/dictionaries/az';
import { en } from '@/dictionaries/en';
import { tr } from '@/dictionaries/tr';
import { ru } from '@/dictionaries/ru';
import { fr } from '@/dictionaries/fr';
import { it } from '@/dictionaries/it';

export function getDictionary(locale?: string) {
  if (locale === 'en') return en;
  if (locale === 'tr') return tr;
  if (locale === 'ru') return ru;
  if (locale === 'fr') return fr;
  if (locale === 'it') return it;
  return az;
}
