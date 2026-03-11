# AstroBhavishya Project Structure

## Directory Tree

```
astro-app/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx              # Login page with email/password form
│   │   └── register/
│   │       └── page.tsx              # Registration page with birth details
│   ├── api/
│   │   ├── generate-chart/
│   │   │   └── route.ts              # Calculate birth chart from birth details
│   │   ├── generate-report/
│   │   │   └── route.ts              # Generate AI-powered astrology reports
│   │   ├── create-order/
│   │   │   └── route.ts              # Create Razorpay payment orders
│   │   ├── verify-payment/
│   │   │   └── route.ts              # Verify Razorpay payment signatures
│   │   └── daily-horoscope/
│   │       └── route.ts              # Fetch daily horoscope for zodiac signs
│   ├── dashboard/
│   │   ├── layout.tsx                # Dashboard layout with sidebar
│   │   └── page.tsx                  # Main dashboard overview page
│   ├── horoscope/
│   │   └── page.tsx                  # Daily horoscope for all zodiac signs
│   ├── compatibility/
│   │   └── page.tsx                  # Relationship compatibility calculator
│   ├── pricing/
│   │   └── page.tsx                  # Pricing plans and subscription options
│   ├── report/
│   │   └── [id]/
│   │       └── page.tsx              # Individual report detail page
│   ├── globals.css                   # Global styles & cosmic theme
│   ├── layout.tsx                    # Root layout with header/footer
│   ├── page.tsx                      # Landing page / home
│   └── middleware.ts                 # Auth protection middleware
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Browser-side Supabase client
│   │   └── server.ts                 # Server-side Supabase client
│   ├── constants.ts                  # Zodiac signs, nakshatras, pricing, etc
│   └── types.ts                      # TypeScript interfaces for all models
├── public/
│   └── manifest.json                 # PWA web app manifest
├── .env.example                      # Environment variables template
├── .eslintrc.json                    # ESLint configuration
├── .gitignore                        # Git ignore rules
├── next.config.ts                    # Next.js config with PWA support
├── package.json                      # Dependencies and scripts
├── postcss.config.js                 # PostCSS config for Tailwind
├── README.md                         # Project documentation
├── tailwind.config.ts                # Tailwind CSS with cosmic theme
└── tsconfig.json                     # TypeScript configuration
```

## Key Files Explained

### Configuration Files

**next.config.ts**
- Enables PWA support with next-pwa
- Configures image optimization
- Sets security headers (CSP, X-Frame-Options, etc.)
- Includes runtime caching strategies for API calls

**tailwind.config.ts**
- Cosmic color palette (purples, golds, dark backgrounds)
- Custom animations (float, glow, orbit, shimmer)
- Custom shadows and border styles
- Extended fonts (Inter + Playfair Display)

**tsconfig.json**
- Strict type checking enabled
- Path aliases (@/ for project root)
- ES2020 target with DOM libraries
- Strict null checks and function types

**package.json**
- Next.js 15, React 19, TypeScript 5
- Tailwind CSS 4, Framer Motion, Lucide React
- Supabase JS, Razorpay, date-fns
- Development tools: ESLint, Prettier, TypeScript

### Source Files

**app/layout.tsx**
- Root layout with HTML structure
- Background cosmic effects
- Header and footer navigation
- Metadata and viewport configuration
- Font loading from Google Fonts

**app/page.tsx**
- Landing page with hero section
- Feature highlights (birth chart, compatibility, horoscope)
- How it works section
- Benefits and limited-time offer
- CTA buttons for signup

**app/(auth)/login/page.tsx**
- Email/password login form
- Password visibility toggle
- Remember me checkbox
- Forgot password link
- Google OAuth button
- Link to registration

**app/(auth)/register/page.tsx**
- Registration form with birth details
- Name, email, password fields
- Date of birth and place of birth
- Terms & privacy policy acceptance
- Google OAuth option

**app/dashboard/layout.tsx**
- Collapsible sidebar navigation
- Menu items: Overview, Charts, Compatibility, Settings
- Logout button
- Responsive design

**app/dashboard/page.tsx**
- Welcome message personalized
- Quick stats: charts count, reports, last reading
- Card grid for report types
- Today's guidance section
- Feature exploration cards

**app/horoscope/page.tsx**
- Zodiac sign selector grid
- Daily/weekly/monthly period selector
- Selected sign details with symbol
- Astrological information (element, ruler, mode, lucky day)
- Horoscope content with scores
- Personalized horoscope CTA

**app/compatibility/page.tsx**
- Two-person form for birth details
- Result display with compatibility score
- Guna milan breakdown with progress bars
- Compatibility insights
- Challenge analysis with remedies
- Option to check another pairing

**app/pricing/page.tsx**
- One-time reports section
- Subscription plans section
- Pricing tier cards with features
- Popular plan highlights
- Comparison table
- CTA for signup

**app/report/[id]/page.tsx**
- Report header with birth details
- Download PDF and Share buttons
- Multiple report sections with full content
- Consultation CTA
- Back to dashboard link

**lib/types.ts**
- User interface with subscription
- BirthProfile for storing birth data
- PlanetPosition with all astrological details
- ChartData with complete birth chart
- Report with sections and content
- CompatibilityResult with detailed analysis
- Payment and Horoscope interfaces
- Type definitions for zodiac signs and nakshatras

**lib/constants.ts**
- ZODIAC_SIGNS: All 12 signs with Sanskrit names, elements, rulers
- NAKSHATRAS: All 27 nakshatras with rulers and symbolism
- PLANETS: All 9 planets with properties and exaltation/debilitation
- HOUSES: 12 houses with significations in Vedic astrology
- PRICING_TIERS: Complete pricing structure matching blueprint
- ASTROLOGICAL_REMEDIES: Gemstones, yantras, mantras for planetary issues
- DASHAS: Information about different dasha systems

**lib/supabase/client.ts**
- Browser-side Supabase client initialization
- Singleton pattern for client reuse
- Environment variable validation
- Error handling for missing credentials

**lib/supabase/server.ts**
- Server-side Supabase client with cookies
- Async client initialization
- Cookie handling for sessions
- Session management utilities

**app/globals.css**
- Tailwind imports and utilities
- Google Fonts import (Inter + Playfair Display)
- CSS variables for cosmic theme colors
- Custom button classes (.btn-primary, .btn-secondary, .btn-outline)
- Custom card classes with glass effect
- Text gradient effects
- Border gradient effects
- Scrollbar styling
- Animations (twinkle, shimmer, cosmic-pulse)

**app/middleware.ts**
- Route protection for authenticated pages
- Public routes list
- Protected routes list
- Session verification with Supabase
- Redirect to login for unauthorized access

**API Routes**
All API endpoints are protected and require authentication:
- `generate-chart`: Calculates birth chart from birth profile
- `generate-report`: Generates AI-powered astrology analysis
- `create-order`: Creates Razorpay payment order
- `verify-payment`: Verifies payment with Razorpay signature
- `daily-horoscope`: Fetches horoscope for zodiac sign

### Public Files

**public/manifest.json**
- PWA configuration for app-like experience
- App icons for different sizes and purposes
- Maskable icons for adaptive display
- App shortcuts (horoscope, chart)
- Screenshots for app stores
- Theme colors and orientation

## Data Models

### User Model
```typescript
{
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  profileImage?: string;
  subscription: {
    plan: 'free' | 'starter' | 'pro' | 'annual_pro';
    status: 'active' | 'cancelled' | 'expired';
    startDate?: Date;
    endDate?: Date;
  };
}
```

### BirthProfile Model
```typescript
{
  id: string;
  userId: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  timeOfBirth: string;
  placeOfBirth: string;
  latitude: number;
  longitude: number;
  timezone: string;
  isDefault: boolean;
}
```

### ChartData Model
```typescript
{
  id: string;
  birthProfileId: string;
  ascendant: ZodiacSign;
  planets: PlanetPosition[];
  houses: HousePosition[];
  dashas: DashaLord[];
  yogas: Yoga[];
  doshas: Dosha[];
  ayanamsa: number;
}
```

### Report Model
```typescript
{
  id: string;
  userId: string;
  birthProfileId: string;
  reportType: 'kundli' | 'compatibility' | 'career' | ...;
  sections: ReportSection[];
  summary: string;
  generatedBy: 'claude' | 'openai' | 'google_ai';
  isPaid: boolean;
  price?: number;
}
```

## Component Architecture

### Layout Components
- Root Layout: Global styles, fonts, header/footer
- Dashboard Layout: Sidebar navigation with protected routes
- Auth Layout: Centered login/register forms

### Page Components
- Home: Landing page with features and CTA
- Dashboard: User overview and quick actions
- Horoscope: Zodiac selector and daily readings
- Compatibility: Dual birth chart input and analysis
- Pricing: Plan comparison and subscription options
- Report: Detailed astrological report display

### UI Components (To be created)
- Forms: Input validation and styling
- Cards: Consistent card styling with cosmic theme
- Buttons: Primary, secondary, outline variants
- Navigation: Header and sidebar menus
- Charts: Birth chart visualization
- Results: Report displays and analysis results

## Authentication Flow

1. User registers with email, password, and birth details
2. Supabase Auth handles email verification
3. Birth profile is created in database
4. User logs in with email/password
5. Session token stored in cookies
6. Middleware verifies token on protected routes
7. User gets redirected to login if unauthorized

## Payment Flow

1. User selects report/subscription
2. Frontend calls `/api/create-order`
3. Backend creates Razorpay order
4. Frontend opens Razorpay payment modal
5. User enters card/UPI details
6. Razorpay processes payment
7. Frontend calls `/api/verify-payment`
8. Backend verifies signature
9. Payment status updated in database
10. Report/subscription access granted

## Future Enhancements

### Features to Add
- Birth chart visualization component
- Live astrologer video consultation
- AI-powered astrology chatbot
- Advanced transit predictions
- Spouse prediction analysis
- Vastu recommendations
- Numerology analysis
- Mobile app (React Native)

### Database Additions
- Consultation bookings table
- Astrologer profiles table
- User preferences table
- Saved charts table
- Subscription management

### API Enhancements
- Ephemeris calculations service
- AI report generation service
- Email notification service
- SMS notifications
- Webhook for payment updates
