import type { Recipe } from '@/types/recipe';

export type GuideLocale = 'az' | 'en';

export interface GuideRegion {
  key: string;
  label: Record<GuideLocale, string>;
  note: Record<GuideLocale, string>;
  recipeSlugs: string[];
}

export const guideRegions: GuideRegion[] = [
  {
    key: 'east-southeast-asia',
    label: { en: 'East & Southeast Asia', az: 'Şərqi və Cənub-Şərqi Asiya' },
    note: {
      en: 'Cold noodles, aromatic fish, crisp rice and deeply regional spice pastes.',
      az: 'Soyuq əriştə, ətirli balıq, xırtıldayan düyü və bölgəvi ədviyyat əzmələri.',
    },
    recipeSlugs: [
      'mie-aceh-indonesian-spicy-noodles',
      'asam-pedas-malaysian-sour-spicy-fish',
      'num-banh-chok-cambodian-fish-noodles',
      'otak-otak-malaysian-fish-cakes',
      'sai-ua-northern-thai-herb-sausage',
      'yakgwa-korean-honey-cookies',
      'nam-khao-lao-crispy-rice-salad',
      'ochazuke-japanese-tea-rice',
      'hiyashi-chuka-japanese-cold-noodles',
      'kongguksu-korean-soy-milk-noodles',
      'liangpi-xian-cold-skin-noodles',
    ],
  },
  {
    key: 'south-central-asia',
    label: { en: 'South & Central Asia', az: 'Cənubi və Mərkəzi Asiya' },
    note: {
      en: 'Fermented rice, winter vegetables, ceremonial dumplings and cultured dairy.',
      az: 'Ferment düyü, qış tərəvəzləri, mərasim kündələri və turş süd ənənələri.',
    },
    recipeSlugs: [
      'yomari-nepalese-molasses-dumplings',
      'qurutob-tajik-bread-yogurt-salad',
      'eromba-manipuri-fermented-fish-mash',
      'undhiyu-gujarati-winter-vegetable-stew',
      'pakhala-bhata-odia-fermented-rice',
    ],
  },
  {
    key: 'africa',
    label: { en: 'Africa', az: 'Afrika' },
    note: {
      en: 'Bitterleaf, berbere, chickpea flour and sealed-pot cooking build profound flavour.',
      az: 'Bitterleaf, berbere, noxud unu və qapalı qazan texnikası dərin dad yaradır.',
    },
    recipeSlugs: [
      'zigni-eritrean-berbere-beef-stew',
      'ndole-cameroonian-bitterleaf-stew',
      'shiro-wat-ethiopian-chickpea-stew',
      'rfissa-moroccan-chicken-lentils',
      'kedjenou-ivorian-chicken-stew',
      'lablabi-tunisian-chickpea-soup',
    ],
  },
  {
    key: 'europe-caucasus',
    label: { en: 'Europe & the Caucasus', az: 'Avropa və Qafqaz' },
    note: {
      en: 'Bread-saving cookery, mountain grains, yogurt bakes and small regional pastries.',
      az: 'Çörəyi dəyərləndirən mətbəx, dağ taxılları, qatıq sobası və bölgəvi xəmirlər.',
    },
    recipeSlugs: [
      'banosh-ukrainian-carpathian-cornmeal',
      'canederli-alpine-bread-dumplings',
      'sklandrausis-latvian-carrot-potato-tarts',
      'acorda-alentejana-portuguese-bread-soup',
      'mulgipuder-estonian-potato-barley-mash',
      'qirxbugum-ketesi',
      'cepelinai-lithuanian-potato-dumplings',
      'fregola-con-arselle-sardinian-clam-pasta',
      'strapatsada-greek-tomato-eggs',
      'piperade-basque-pepper-tomato-stew',
      'tave-kosi-albanian-lamb-yogurt-bake',
    ],
  },
  {
    key: 'americas-caribbean',
    label: { en: 'The Americas & Caribbean', az: 'Amerikalar və Karib' },
    note: {
      en: 'Corn, peanuts, potatoes and toasted seeds connect radically different local tables.',
      az: 'Qarğıdalı, yer fıstığı, kartof və qovrulmuş tumlar fərqli yerli süfrələri bağlayır.',
    },
    recipeSlugs: [
      'pelau-trinidad-chicken-rice',
      'baiao-de-dois-brazilian-rice-beans',
      'pepian-guatemalan-toasted-seed-stew',
      'fanesca-ecuadorian-easter-soup',
      'charquican-chilean-beef-vegetable-stew',
      'carapulcra-peruvian-dried-potato-stew',
      'conchitas-a-la-parmesana-peruvian-scallops',
      'silpancho-bolivian-beef-rice-plate',
      'chipa-guasu-paraguayan-corn-cake',
      'saltenas-bolivian-meat-pastries',
      'llapingachos-ecuadorian-potato-cakes',
      'sopa-de-mani-bolivian-peanut-soup',
      'papadzules-yucatan-egg-tacos',
      'vori-vori-paraguayan-chicken-soup',
    ],
  },
  {
    key: 'middle-east-pacific',
    label: { en: 'Middle East & Pacific', az: 'Yaxın Şərq və Sakit okean' },
    note: {
      en: 'Sumac bread, caramelised fish rice and an earth-oven root-vegetable bake.',
      az: 'Sumaqlı çörək, karamelizə balıqlı düyü və torpaq sobasında kök tərəvəz yeməyi.',
    },
    recipeSlugs: [
      'laplap-vanuatu-root-vegetable-bake',
      'sayadieh-lebanese-fish-rice',
      'musakhan-palestinian-sumac-chicken',
    ],
  },
];

export const guideRecipeSlugs = guideRegions.flatMap((region) => region.recipeSlugs);

export function getGuidePath(locale: GuideLocale) {
  return locale === 'az'
    ? '/beledciler/50-nadir-regional-yemek'
    : '/en/guides/underrepresented-regional-dishes';
}

export function getGuideRecipes(recipes: Recipe[]) {
  const recipesBySlug = new Map(recipes.map((recipe) => [recipe.slug, recipe]));
  return guideRecipeSlugs.map((slug) => recipesBySlug.get(slug)).filter((recipe): recipe is Recipe => Boolean(recipe));
}

export function getGuideRegionForRecipe(slug: string) {
  return guideRegions.find((region) => region.recipeSlugs.includes(slug));
}
