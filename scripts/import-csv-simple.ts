import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prisma = new PrismaClient()

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

function parseCSV(csvContent: string): any[] {
  const lines = csvContent.split('\n')
  const headers = lines[0].split(',')
  const recipes: any[] = []
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    
    const values: string[] = []
    let currentValue = ''
    let inQuotes = false
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j]
      
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue.trim())
        currentValue = ''
      } else {
        currentValue += char
      }
    }
    
    // Add the last value
    values.push(currentValue.trim())
    
    if (values.length >= headers.length) {
      const recipe: any = {}
      headers.forEach((header, index) => {
        recipe[header.trim()] = values[index] || ''
      })
      recipes.push(recipe)
    }
  }
  
  return recipes
}

async function importRecipes() {
  try {
    console.log('🚀 Starting CSV import...')
    
    // Clear existing data
    console.log('🗑️  Clearing existing recipes...')
    await prisma.recipe.deleteMany()
    
    const csvFilePath = path.join(__dirname, '../recipes/recipes.csv')
    
    // Read CSV file
    console.log('📖 Reading CSV file...')
    const csvContent = fs.readFileSync(csvFilePath, 'utf-8')
    const recipes = parseCSV(csvContent)
    
    console.log(`✅ Found ${recipes.length} recipes in CSV`)
    
    // Import recipes
    console.log('💾 Importing recipes to database...')
    let imported = 0
    
    for (const csvRecipe of recipes) {
      try {
        const name = csvRecipe['Yeməyin Adı'] || ''
        if (!name.trim()) continue
        
        let slug = createSlug(name)
        
        // Check if slug already exists and add number suffix if needed
        let slugExists = await prisma.recipe.findUnique({ where: { slug } })
        let counter = 1
        while (slugExists) {
          slug = `${createSlug(name)}-${counter}`
          slugExists = await prisma.recipe.findUnique({ where: { slug } })
          counter++
        }
        
        await prisma.recipe.create({
          data: {
            yemeyinAdi: name,
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
        console.log(`✅ Imported: ${name} (${imported}/${recipes.length})`)
        
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