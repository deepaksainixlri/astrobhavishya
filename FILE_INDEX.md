# AstroBhavishya File Index

Complete reference guide to all files in the project.

## Configuration Files

### `package.json`
- Project metadata, scripts, and dependencies
- Scripts: dev, build, start, lint, type-check, format
- All required npm packages with versions

### `tsconfig.json`
- TypeScript strict mode enabled
- Path aliases for imports (@/)
- DOM and ES2020 library support
- Output configuration

### `next.config.ts`
- Next.js 15 configuration
- PWA support via next-pwa
- Image optimization settings
- Security headers configuration
- Runtime caching strategies

### `tailwind.config.ts`
- Custom cosmic color palette
- Extended theme with animations
- Custom utilities and components
- Box shadows and gradients
- Font family configuration

### `postcss.config.js`
- Tailwind CSS processing
- Autoprefixer configuration

### `.eslintrc.json`
- ESLint rules for code quality
- Next.js recommended rules
- React hooks validation

### `.env.example`
- Template for environment variables
- All required API keys and secrets
- Configuration placeholders

### `.gitignore`
- Node modules, build artifacts
- Environment files
- IDE and OS specific files
- PWA cache files

## Application Files

### Root Layout (`app/layout.tsx`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/layout.tsx`
- HTML structure with cosmic theme
- Global metadata and viewport config
- Google Fonts import (Inter + Playfair Display)
- Footer with navigation links
- Background cosmic effects

### Landing Page (`app/page.tsx`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/page.tsx`
- Hero section with title and description
- Feature highlights (3 cards)
- How it works section (4-step process)
- Benefits and features grid
- Limited-time offer card
- CTA buttons

### Authentication - Login (`app/(auth)/login/page.tsx`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/(auth)/login/page.tsx`
- Email input field
- Password input with toggle visibility
- Remember me checkbox
- Forgot password link
- Google OAuth button
- Registration link
- Error state handling
- Loading state

### Authentication - Register (`app/(auth)/register/page.tsx`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/(auth)/register/page.tsx`
- Full name input
- Email input
- Date of birth picker
- Place of birth input
- Password input with toggle
- Confirm password input
- Terms & privacy acceptance
- Validation checks
- Google OAuth option
- Login link

### Dashboard Layout (`app/dashboard/layout.tsx`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/dashboard/layout.tsx`
- Collapsible sidebar navigation
- Menu items with icons
- Logo/branding area
- Logout button
- Settings option
- Responsive hamburger toggle
- Protected route layout

### Dashboard Page (`app/dashboard/page.tsx`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/dashboard/page.tsx`
- Welcome greeting
- Quick stats grid (3 cards)
- Create new report section
- Today's guidance section (lucky time, number, color)
- Feature exploration grid (6 cards)
- All interactive and linked

### Horoscope Page (`app/horoscope/page.tsx`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/horoscope/page.tsx`
- Hero section
- Period selector (daily/weekly/monthly)
- Zodiac sign grid (12 signs)
- Selected sign display with details
- Element, ruler, mode information
- Horoscope content
- Scores visualization (love, career, health)
- Lucky number and color display
- Personalized horoscope CTA

### Compatibility Page (`app/compatibility/page.tsx`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/compatibility/page.tsx`
- Dual-person form inputs
- Person 1 and Person 2 sections
- Birth details collection
- Results display with score
- Guna milan breakdown (7 factors)
- Compatibility insights
- Challenge analysis with remedies
- Mangal Dosha status
- Option to check another compatibility

### Pricing Page (`app/pricing/page.tsx`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/pricing/page.tsx`
- Page heading and description
- One-time reports section
- Subscription plans section
- Feature comparison table
- Popular plan highlighting
- Price display
- Feature lists per tier
- CTA buttons
- Call to action section

### Report Detail Page (`app/report/[id]/page.tsx`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/report/[id]/page.tsx`
- Back button to dashboard
- Report header with title and name
- Birth profile details grid
- Download PDF button
- Share button
- Consult button
- Multiple report sections
- Consultant support CTA

### Middleware (`app/middleware.ts`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/middleware.ts`
- Public route definitions
- Protected route definitions
- Auth verification logic
- Session checking
- Redirect to login for unauthorized access

### Global Styles (`app/globals.css`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/globals.css`
- Tailwind imports
- CSS variables for cosmic theme
- Custom button classes
- Custom card classes
- Glass effect classes
- Text gradient effects
- Border gradients
- Scrollbar styling
- Animation keyframes
- Selection styling
- Print styles

## API Routes

### Generate Chart (`app/api/generate-chart/route.ts`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/api/generate-chart/route.ts`
- POST endpoint
- Input: birthProfileId
- Output: ChartData with calculations
- Authentication required
- TODO: Implement ephemeris calculations

### Generate Report (`app/api/generate-report/route.ts`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/api/generate-report/route.ts`
- POST endpoint
- Input: chartId, reportType
- Output: Detailed astrology report
- AI-powered analysis ready
- Authentication required

### Create Order (`app/api/create-order/route.ts`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/api/create-order/route.ts`
- POST endpoint
- Razorpay integration
- Input: amount, currency, description, reportType
- Output: orderId, amount, currency, key
- User authentication required

### Verify Payment (`app/api/verify-payment/route.ts`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/api/verify-payment/route.ts`
- POST endpoint
- Razorpay signature verification
- HMAC-SHA256 validation
- Input: razorpayOrderId, razorpayPaymentId, razorpaySignature
- Output: success status
- User authentication required

### Daily Horoscope (`app/api/daily-horoscope/route.ts`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/app/api/daily-horoscope/route.ts`
- GET endpoint
- Query param: sign
- Output: Horoscope with scores and lucky info
- No authentication required
- Public endpoint

## Library Files

### Types (`lib/types.ts`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/lib/types.ts`

Interfaces:
- User - Full user profile with subscription
- SubscriptionStatus - Plan and dates
- BirthProfile - Complete birth information
- PlanetPosition - Individual planet data
- HousePosition - House placement
- DashaLord - Dasha period information
- SubDasha - Sub-period within dasha
- Yoga - Astrological combinations
- Dosha - Doshas (Mangal, Pitra, etc.)
- ChartData - Complete birth chart
- ReportSection - Report content section
- Report - Full report with sections
- CompatibilityResult - Relationship analysis
- Payment - Payment transaction details
- Horoscope - Daily/weekly/monthly predictions
- PricingTier - Pricing plan details
- Session - User session information

Types:
- ZodiacSign - Union of 12 zodiac signs
- Nakshatra - Union of 27 lunar mansions

### Constants (`lib/constants.ts`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/lib/constants.ts`

Exports:
- ZODIAC_SIGNS - 12 signs with full details
- NAKSHATRAS - 27 nakshatras with rulers
- PLANETS - 9 planets with properties
- HOUSES - 12 houses with significations
- PRICING_TIERS - 9 complete pricing plans
- ASTROLOGICAL_REMEDIES - Gems, yantras, mantras
- DASHAS - Dasha system definitions

### Supabase Client (`lib/supabase/client.ts`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/lib/supabase/client.ts`
- Browser-side Supabase client
- Singleton pattern
- Environment variable validation
- Error handling

### Supabase Server (`lib/supabase/server.ts`)
**Location:** `/sessions/serene-stoic-bohr/astro-app/lib/supabase/server.ts`
- Server-side Supabase client
- Cookie-based sessions
- Auth utilities
- User fetching functions

## Documentation Files

### README.md
**Location:** `/sessions/serene-stoic-bohr/astro-app/README.md`
- Complete project overview
- Features list
- Tech stack explanation
- Installation instructions
- Database setup guide (SQL)
- API documentation
- Customization guide
- Deployment instructions
- Contributing guidelines

### SETUP_GUIDE.md
**Location:** `/sessions/serene-stoic-bohr/astro-app/SETUP_GUIDE.md`
- Quick start (5 minutes)
- Environment configuration
- Supabase setup with all SQL
- Razorpay configuration
- Development scripts
- Dependency explanations
- Common tasks
- Testing checklist
- Deployment guides
- Troubleshooting

### PROJECT_STRUCTURE.md
**Location:** `/sessions/serene-stoic-bohr/astro-app/PROJECT_STRUCTURE.md`
- Complete directory tree
- File-by-file descriptions
- Data model schemas
- Component architecture
- Authentication flow
- Payment flow
- Future enhancements

### FILE_INDEX.md
**Location:** `/sessions/serene-stoic-bohr/astro-app/FILE_INDEX.md`
- This file - complete file reference

## Public Assets

### manifest.json
**Location:** `/sessions/serene-stoic-bohr/astro-app/public/manifest.json`
- PWA web app manifest
- App name and icons
- Theme colors
- Display mode
- Shortcuts
- Screenshots for app stores

## Project Root Files

### ASTROBHAVISHYA_SUMMARY.txt
**Location:** `/sessions/serene-stoic-bohr/ASTROBHAVISHYA_SUMMARY.txt`
- Comprehensive project summary
- Statistics and overview
- Feature list
- Tech stack details
- Security features
- Deployment options
- Getting started guide

## Statistics

Total files by type:
- TypeScript/TSX: 25 files (~6,000+ LOC)
- CSS: 1 file (~600+ LOC)
- JSON: 4 files (config, manifest, package)
- Markdown: 4 files (documentation)
- JavaScript: 1 file (PostCSS config)
- Text: 1 file (summary)

Total project size: ~8,000+ lines of code (excluding dependencies)

## File Organization

### By Purpose

**Configuration (9 files)**
- package.json, tsconfig.json, next.config.ts
- tailwind.config.ts, postcss.config.js
- .eslintrc.json, .env.example, .gitignore
- manifest.json

**Pages (8 files)**
- app/page.tsx (home)
- app/(auth)/login/page.tsx
- app/(auth)/register/page.tsx
- app/dashboard/page.tsx
- app/horoscope/page.tsx
- app/compatibility/page.tsx
- app/pricing/page.tsx
- app/report/[id]/page.tsx

**API Routes (5 files)**
- generate-chart, generate-report
- create-order, verify-payment
- daily-horoscope

**Library & Core (5 files)**
- lib/types.ts (50+ interfaces)
- lib/constants.ts (all astrology data)
- lib/supabase/client.ts
- lib/supabase/server.ts
- app/middleware.ts

**Styling & Layout (2 files)**
- app/layout.tsx
- app/dashboard/layout.tsx

**Documentation (4 files)**
- README.md, SETUP_GUIDE.md
- PROJECT_STRUCTURE.md, FILE_INDEX.md

## Import Paths

Using @ alias from tsconfig.json:
- `@/lib/*` - Library utilities
- `@/app/*` - App components
- `@/types/*` - Type definitions
- `@/components/*` - Reusable components

Example imports:
```typescript
import { ZODIAC_SIGNS, PRICING_TIERS } from '@/lib/constants';
import type { User, ChartData } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';
```

## Next Steps

1. Read: `/sessions/serene-stoic-bohr/astro-app/README.md`
2. Setup: `/sessions/serene-stoic-bohr/astro-app/SETUP_GUIDE.md`
3. Develop: Check `PROJECT_STRUCTURE.md` for architecture
4. Deploy: Follow deployment section in SETUP_GUIDE.md
