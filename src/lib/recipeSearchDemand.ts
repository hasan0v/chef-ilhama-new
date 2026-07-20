import type { Recipe } from '@/types/recipe';
import type { SiteLocale } from '@/lib/localeRoutes';

// Search Console export, 2026-07-20: these Azerbaijani pages already rank on
// page one but lose clicks to vague titles and history-only descriptions.
const AZ_DEMAND_TITLES: Record<string, string> = {
  'yarpaq-dolmasi': 'Yarpaq dolması resepti — içlik və bişirmə qaydası',
  'gurze': 'Gürzə resepti — xəmir, içlik və düzgün bükülmə',
  'sudlu-as': 'Südlü aş resepti — ölçülər və bişirmə qaydası',
  'dusbere': 'Düşbərə resepti — xəmir, içlik və bişirmə üsulu',
  'qatlama': 'Qatlama resepti — xəmir və addım-addım hazırlanması',
  'qovurma': 'Qovurma resepti — yumşaq ət üçün bişirmə qaydası',
  'bozbas': 'Bozbaş resepti — ərzaqlar və bişirmə qaydası',
  'fisincan-plov': 'Fisincan plov resepti — içlik və dəqiq hazırlanması',
  'yarpaq-xengeli-quru-xengelsuzme-xengel': 'Yarpaq xəngəli resepti — xəmir və hazırlanma qaydası',
  'sirin-corek-sud-coreyi': 'Şirin süd çörəyi resepti — yumşaq xəmir üsulu',
  'goyerti-qutabi-kete': 'Göyərti qutabı resepti — xəmir və içlik ölçüləri',
  'lule-kabab': 'Lülə kabab resepti — dağılmayan kababın hazırlanması',
  'piti': 'Piti resepti — Şəki üsulu ilə hazırlanması',
  'et-qutabi': 'Ət qutabı resepti — xəmir, içlik və bişirmə üsulu',
  'dovga': 'Dovğa resepti — kəsilməyən qatıqla bişirmə qaydası',
};

function compact(value: string, maxLength: number) {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

export function getSearchFocusedRecipeTitle(recipe: Recipe, locale: SiteLocale) {
  if (locale === 'az') {
    return AZ_DEMAND_TITLES[recipe.slug]
      ?? compact(`${recipe.name} resepti — ərzaqlar və hazırlanması`, 62);
  }

  if (locale === 'en') {
    return compact(`${recipe.name} recipe — ingredients & step-by-step method`, 62);
  }

  return compact(`${recipe.name} — ${recipe.origin}`, 62);
}

export function getSearchFocusedRecipeDescription(recipe: Recipe, locale: SiteLocale) {
  if (locale === 'az') {
    return compact(
      `${recipe.name} resepti: ${recipe.ingredients.length} ərzaq, ${recipe.instructions.length} aydın addım və ${recipe.prepTime}. Dəqiq ölçülər, bişirmə qaydası və servis məsləhətləri.`,
      158,
    );
  }

  if (locale === 'en') {
    return compact(
      `${recipe.name} recipe with ${recipe.ingredients.length} ingredients, ${recipe.instructions.length} clear steps and a ${recipe.prepTime} time estimate. Includes serving guidance.`,
      158,
    );
  }

  return compact(recipe.history?.trim() || `${recipe.name} recipe from ${recipe.origin}.`, 158);
}
