// Recipe data types for Chef Ilhama website

export interface Recipe {
  id: string;
  name: string; // Yeməyin Adı
  origin: string; // Mənşə
  region: string; // Bölgə
  category: string; // Kateqoriya
  ingredients: string[]; // Tərkib hissələri (parsed from text)
  instructions: string[]; // Hazırlanma qaydası (parsed from text)
  prepTime: string; // Hazırlanma müddəti
  difficulty: 'Asan' | 'Orta' | 'Çətin'; // Çətinlik dərəcəsi
  servings: string; // Porsiya sayı
  history: string; // Tarixi məlumat/Arxa plan
  servingSuggestions: string; // Təqdim təklifləri
  image: string; // Şəkil Linki
  tags: string[]; // Generated from categories, regions
  featured?: boolean;
  slug: string; // URL-friendly version of name
}

export interface FilterOptions {
  category: string[];
  difficulty: string[];
  region: string[];
  prepTime: string[];
  ingredients: string[];
  searchQuery: string;
}

export interface FilterState {
  filters: FilterOptions;
  sortBy: 'alphabetical' | 'difficulty' | 'prepTime' | 'popularity' | 'newest';
  sortOrder: 'asc' | 'desc';
}

// Recipe categories mapping
export const RECIPE_CATEGORIES = {
  'Əsas yemək': 'Əsas yemək',
  'Şorba/Aş': 'Şorba/Aş', 
  'Şirniyyat': 'Şirniyyat',
  'Qəlyanaltı': 'Qəlyanaltı',
  'Səhər yeməyi': 'Səhər yeməyi',
  'Kabab/Manqal': 'Kabab/Manqal',
  'Unudulmuş yemək': 'Unudulmuş yemək',
  'Çörək/Xəmir': 'Çörək/Xəmir',
  'İçki/Şərbət': 'İçki/Şərbət',
  'Şirniyyat/Xəmir': 'Şirniyyat/Xəmir',
  'Ət yeməyi/Balıq': 'Ət yeməyi/Balıq',
  'Ət yeməyi/Kabab': 'Ət yeməyi/Kabab',
  'Düyü/Plov': 'Düyü/Plov',
  'Mürəbbə/Şirniyyat': 'Mürəbbə/Şirniyyat',
  'Turşu/Konserv': 'Turşu/Konserv',
  'Çörək': 'Çörək'
} as const;

export const DIFFICULTY_LEVELS = ['Asan', 'Orta', 'Çətin'] as const;

export const REGIONS = [
  'Bakı',
  'Şəki', 
  'Gəncə',
  'Naxçıvan',
  'Qarabağ',
  'Qax',
  'Quba',
  'Laçın',
  'Astara',
  'Lənkəran',
  'Mingəçevir',
  'Şamaxı',
  'Beyləqan',
  'Qəbələ',
  'Ordubad',
  'Şuşa',
  'Kəlbəcər',
  'Füzuli',
  'Tərtər',
  'Zəngilan',
  'Cəbrayıl',
  'Qubadlı',
  'Xocavənd',
  'Ağcabədi',
  'Ağdam'
] as const;