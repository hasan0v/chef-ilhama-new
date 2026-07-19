import { az } from '@/dictionaries/az';
import { en } from '@/dictionaries/en';
import { tr } from '@/dictionaries/tr';
import { ru } from '@/dictionaries/ru';
import { fr } from '@/dictionaries/fr';
import { it } from '@/dictionaries/it';
import { ar } from '@/dictionaries/ar';
import { zh } from '@/dictionaries/zh';
import { hi } from '@/dictionaries/hi';
import { es } from '@/dictionaries/es';
import { pt } from '@/dictionaries/pt';
import { nl } from '@/dictionaries/nl';
import { de } from '@/dictionaries/de';
import { ja } from '@/dictionaries/ja';
import { id } from '@/dictionaries/id';
import { bn } from '@/dictionaries/bn';

export function getDictionary(locale?: string) {
  if (locale === 'en') return en;
  if (locale === 'tr') return tr;
  if (locale === 'ru') return ru;
  if (locale === 'fr') return fr;
  if (locale === 'it') return it;
  if (locale === 'ar') return ar;
  if (locale === 'zh') return zh;
  if (locale === 'hi') return hi;
  if (locale === 'es') return es;
  if (locale === 'pt') return pt;
  if (locale === 'nl') return nl;
  if (locale === 'de') return de;
  if (locale === 'ja') return ja;
  if (locale === 'id') return id;
  if (locale === 'bn') return bn;
  return az;
}
