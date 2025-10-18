# Chef İlhamə - Azərbaycan Mətbəxi

Professional Azerbaijani chef services and authentic recipe platform built with Next.js 15, Prisma, and PostgreSQL.

## 🎯 Features

- **Recipe Database**: 100+ authentic Azerbaijani recipes with detailed instructions
- **Professional Chef Services**: Personal chef and catering services
- **SEO Optimized**: Structured data, meta tags, and performance optimizations
- **Responsive Design**: Mobile-first design with modern UI
- **Performance**: Optimized with caching, lazy loading, and code splitting
- **Multi-language Support**: Azerbaijani language interface

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom components
- **Animations**: Framer Motion
- **Deployment**: Vercel
- **Backend**: Supabase (PostgreSQL)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Supabase recommended)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hasan0v/chef-ilhama-new.git
cd chef-ilhama-new
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env` file based on `.env.example`:

```bash
# Database Configuration
DATABASE_URL="postgresql://..."
POSTGRES_URL_NON_POOLING="postgresql://..."

# Supabase (optional)
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_ROLE_KEY="..."
```

4. Generate Prisma client:
```bash
npm run db:generate
```

5. Run database migrations:
```bash
npx prisma db push
```

6. Start development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📦 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── reseptler/         # Recipes listing page
│   ├── resept/[slug]/     # Individual recipe pages
│   ├── xidmetler/         # Services page
│   ├── elaqe/             # Contact page
│   └── api/               # API routes
├── components/            # React components
│   ├── home/             # Homepage components
│   ├── recipe/           # Recipe-related components
│   ├── layout/           # Layout components
│   └── ui/               # Reusable UI components
├── database/             # Database services
│   └── services/         # Prisma service layer
├── lib/                  # Utilities and helpers
├── types/                # TypeScript types
└── utils/                # Utility functions

prisma/
└── schema.prisma         # Database schema

public/                   # Static assets
```

## 🗄️ Database Schema

The application uses Prisma with PostgreSQL. Main model:

```prisma
model Recipe {
  id                    String   @id @default(cuid())
  yemeyinAdi           String   // Recipe Name
  slug                 String   @unique
  kateqoriya           String   // Category
  terkibHisseleri      String   // Ingredients
  hazirlanmaQaydasi    String   // Instructions
  hazirlanmaMuddeti    String   // Prep Time
  cetinlikDerecesi     String   // Difficulty
  porsiyaSayi          String   // Servings
  featured             Boolean  @default(false)
  // ... additional fields
}
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run db:generate  # Generate Prisma client
npm run db:reset     # Reset database
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The build process automatically runs `prisma generate` before building.

### Environment Variables Required

Set these in your Vercel project settings:
- `DATABASE_URL`
- `POSTGRES_URL_NON_POOLING`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

See `DEPLOYMENT_CHECKLIST.md` for detailed deployment instructions.

## 📝 Key Features Implementation

### Recipe System
- Dynamic recipe pages with SEO optimization
- Category and region filtering
- Search functionality with Fuse.js
- Recipe cards with images and metadata

### Performance Optimizations
- Static page generation (ISR with 5-minute revalidation)
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Database query caching
- Bundle size optimization

### SEO
- Structured data (JSON-LD)
- Dynamic meta tags
- Sitemap generation
- robots.txt configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 📞 Contact

Chef İlhamə
- WhatsApp: +994 10 379 45 77
- Website: [chef-ilhama.vercel.app](https://chef-ilhama.vercel.app)

---

Built with ❤️ using Next.js 15
