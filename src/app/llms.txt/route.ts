import { NextResponse } from 'next/server';
import { getRecipes } from '@/lib/recipes';
import type { Recipe } from '@/types/recipe';

export async function GET() {
  let recipes: Recipe[];
  try {
    recipes = await getRecipes();
  } catch {
    recipes = [];
  }

  const recipeLines = recipes
    .slice(0, 100)
    .map(
      (r) =>
        `- ${r.name} (${r.origin}, ${r.category}): https://chef-ilhama.food/resept/${r.slug}`
    )
    .join('\n');

  const content = `# Chef İlhamə
> Azerbaijani recipe publisher, private chef & catering service based in Baku, Azerbaijan.

## About
Chef İlhamə is a professional Azerbaijani chef with 15+ years of experience, specializing in regional Azerbaijani cuisine. The website features an extensive collection of traditional Azerbaijani recipes from 25+ regions, alongside private chef and catering services in Baku, Sumqayıt, and Abşeron.

## Key Pages

### Homepage
- https://chef-ilhama.food
  Description: Featured recipes, recipe categories, Azerbaijani culinary heritage.

### About Chef İlhamə
- https://chef-ilhama.food/haqqinda
  Description: Brand story, 15+ years of culinary experience, values, timeline, specialties.

### Recipe Collection
- https://chef-ilhama.food/reseptler
  Description: Full searchable archive of ${recipes.length}+ Azerbaijani and global regional recipes with filters by region, category, and difficulty.

### Global Food Field Guide
- https://chef-ilhama.food/en/guides/underrepresented-regional-dishes
  Description: An editorial, source-linked guide to 50 underrepresented regional dishes from 39 countries, organized across six culinary routes.

### Taste Collections
- https://chef-ilhama.food/en/collections
  Description: Substantial recipe collections organized by search intent, technique and flavour, including rare dishes, cold noodles, fermented foods and world comfort soups.

### Services
- https://chef-ilhama.food/xidmetler
  Description: Private chef, premium catering, wedding menu planning, corporate events, engagement parties, masterclass/workshop services. Service area: Baku, Sumqayıt, Abşeron.

### Contact
- https://chef-ilhama.food/elaqe
  Description: Contact form, WhatsApp, phone, email. Available daily 08:00-22:00.

## Recipes
${recipeLines}

## Entity Information
- Name: Chef İlhamə
- Type: Person / Culinary professional
- Cuisine: Azerbaijani, Turkish, Middle Eastern
- Service areas: Bakı (Baku), Sumqayıt, Abşeron
- Experience: 15+ years
- Languages: Azerbaijani, English, Russian, Turkish
- Contact: info@chef-ilhama.food | +994 77 614 11 74
- Instagram: https://www.instagram.com/chef.ilhama
- Facebook: https://www.facebook.com/chef.ilhama.baku

## Services Offered
1. Personal/Private Chef Service — in-home or venue-based private dining
2. Premium Catering — brand events, presentations, private gatherings
3. Wedding Menu Planning — traditional Azerbaijani wedding feasts (toy) with modern presentation
4. Corporate Events — business gatherings, lounge service, compact menus
5. Engagement & Family Celebrations — professional service with home atmosphere
6. Masterclass & Workshop — culinary workshops and brand event formats

## Topics This Site Can Authoritatively Answer About
- Traditional Azerbaijani recipes and cooking methods
- Regional Azerbaijani cuisine (25+ regions: Baku, Şəki, Qarabağ, Naxçıvan, etc.)
- Azerbaijani food culture, history, and traditions
- Private chef services in Baku/Azerbaijan
- Catering for events in Azerbaijan
- Azerbaijani wedding food traditions
- Ingredients used in Azerbaijani cooking
- Underrepresented regional dishes and lesser-known global food traditions
- Global cooking techniques, ingredient substitutions, storage and common mistakes
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
