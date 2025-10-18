import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
const csv = require('csv-parser')

const prisma = new PrismaClient()

interface CSVRecipe {
  'Yeməyin Adı': string
  'Mənşə': string
  'Bölgə': string
  'Kateqoriya': string
  'Tərkib hissələri': string
  'Hazırlanma qaydası': string
  'Hazırlanma müddəti': string
  'Çətinlik dərəcəsi': string
  'Porsiya sayı': string
  'Tarixi məlumat/Arxa plan': string
  'Təqdim təklifləri': string
  'Şəkil Linki': string
}

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[çç]/g, 'c')
    .replace(/[əə]/g, 'e')
    .replace(/[ğğ]/g, 'g')
    .replace(/[ıı]/g, 'i')
    .replace(/[öö]/g, 'o')
    .replace(/[şş]/g, 's')
    .replace(/[üü]/g, 'u')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function importRecipes() {
  try {
    console.log('🚀 Starting CSV import...')
    
    // Clear existing data
    console.log('🗑️  Clearing existing recipes...')
    await prisma.recipe.deleteMany()
    
    const csvFilePath = path.join(__dirname, '../recipes/recipes.csv')
    const recipes: CSVRecipe[] = []
    
    // Read CSV file
    console.log('📖 Reading CSV file...')
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data: CSVRecipe) => {
          recipes.push(data)
        })
        .on('end', () => {
          console.log(`✅ Found ${recipes.length} recipes in CSV`)
          resolve()
        })
        .on('error', reject)
    })
    
    // Import recipes
    console.log('💾 Importing recipes to database...')
    let imported = 0
    
    for (const csvRecipe of recipes) {
      try {
        const slug = createSlug(csvRecipe['Yeməyin Adı'])
        
        await prisma.recipe.create({
          data: {
            yemeyinAdi: csvRecipe['Yeməyin Adı'] || '',
            slug: slug,
            mense: csvRecipe['Mənşə'] || null,
            bolge: csvRecipe['Bölgə'] || null,
            kateqoriya: csvRecipe['Kateqoriya'] || '',
            terkibHisseleri: csvRecipe['Tərkib hissələri'] || '',
            hazirlanmaQaydasi: csvRecipe['Hazırlanma qaydası'] || '',
            hazirlanmaMuddeti: csvRecipe['Hazırlanma müddəti'] || '',
            cetinlikDerecesi: csvRecipe['Çətinlik dərəcəsi'] || '',
            porsiyaSayi: csvRecipe['Porsiya sayı'] || '',
            tarixiMelumat: csvRecipe['Tarixi məlumat/Arxa plan'] || '',
            teqdimTeklifleri: csvRecipe['Təqdim təklifləri'] || '',
            sekilLinki: csvRecipe['Şəkil Linki'] || '',
            featured: imported < 6 // Mark first 6 as featured
          }
        })
        
        imported++
        console.log(`✅ Imported: ${csvRecipe['Yeməyin Adı']} (${imported}/${recipes.length})`)
        
      } catch (error) {
        console.error(`❌ Error importing ${csvRecipe['Yeməyin Adı']}:`, error)
      }
    }
    
    console.log(`🎉 Import completed! Imported ${imported} out of ${recipes.length} recipes`)
    
    // Verify import
    const totalRecipes = await prisma.recipe.count()
    console.log(`📊 Total recipes in database: ${totalRecipes}`)
    
  } catch (error) {
    console.error('💥 Import failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run import
importRecipes()