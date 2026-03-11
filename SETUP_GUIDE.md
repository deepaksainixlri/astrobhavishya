# AstroBhavishya Setup & Development Guide

## Quick Start

### 1. Initial Setup (5 minutes)

```bash
# Navigate to project directory
cd /sessions/serene-stoic-bohr/astro-app

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Environment Configuration

### Required Environment Variables

Create `.env.local` file with:

```env
# Supabase (Get from Supabase Dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...

# AI API Keys (Choose one or multiple)
OPENAI_API_KEY=sk-proj-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=AIza...

# Razorpay (For payments)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxx

# Geocoding (For location lookup)
NEXT_PUBLIC_GEOCODING_API_KEY=your_key_here

# App Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection details to `.env.local`

### 2. Create Database Tables

Run these SQL commands in Supabase SQL Editor:

```sql
-- Birth Profiles Table
CREATE TABLE birth_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  date_of_birth DATE NOT NULL,
  time_of_birth TIME,
  place_of_birth TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  timezone TEXT DEFAULT 'UTC',
  notes TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, name)
);

-- Birth Charts Table
CREATE TABLE charts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  birth_profile_id UUID NOT NULL REFERENCES birth_profiles(id) ON DELETE CASCADE,
  ascendant TEXT NOT NULL,
  ascendant_degree DECIMAL(5, 2),
  ascendant_nakshatra TEXT,
  planets JSONB,
  houses JSONB,
  dashas JSONB,
  yogas JSONB,
  doshas JSONB,
  muhurta TEXT,
  ayanamsa DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Reports Table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  birth_profile_id UUID NOT NULL REFERENCES birth_profiles(id) ON DELETE CASCADE,
  report_type TEXT NOT NULL CHECK (report_type IN ('kundli', 'compatibility', 'career', 'health', 'finance', 'annual_horoscope', 'monthly_horoscope')),
  chart_data JSONB,
  sections JSONB,
  summary TEXT,
  generated_by TEXT DEFAULT 'claude',
  is_paid BOOLEAN DEFAULT false,
  price DECIMAL(10, 2),
  purchased_at TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Payments Table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id TEXT NOT NULL UNIQUE,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  report_type TEXT,
  subscription_plan TEXT,
  razorpay_payment_id TEXT UNIQUE,
  razorpay_signature TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Horoscopes Table
CREATE TABLE horoscopes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  zodiac_sign TEXT NOT NULL,
  date DATE NOT NULL,
  period TEXT NOT NULL CHECK (period IN ('daily', 'weekly', 'monthly', 'yearly')),
  content TEXT NOT NULL,
  love_score INTEGER,
  career_score INTEGER,
  health_score INTEGER,
  lucky_number INTEGER,
  lucky_color TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(zodiac_sign, date, period)
);

-- Create Indexes for Performance
CREATE INDEX idx_birth_profiles_user_id ON birth_profiles(user_id);
CREATE INDEX idx_charts_birth_profile_id ON charts(birth_profile_id);
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_birth_profile_id ON reports(birth_profile_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_horoscopes_zodiac_date ON horoscopes(zodiac_sign, date);
```

### 3. Enable Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE birth_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Policies for birth_profiles
CREATE POLICY "Users can view own birth profiles"
  ON birth_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own birth profiles"
  ON birth_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own birth profiles"
  ON birth_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Similar policies for other tables...
```

## Razorpay Setup

### 1. Create Razorpay Account

1. Go to [razorpay.com](https://razorpay.com)
2. Sign up and verify account
3. Go to Settings → API Keys
4. Copy Key ID and Key Secret to `.env.local`

### 2. Test Payment Integration

```bash
# Use Razorpay test keys
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
```

### 3. Test Cards

```
Card: 4111 1111 1111 1111
Expiry: 12/25
CVV: 123
```

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check types
npm run type-check

# Format code
npm run format

# Run linter
npm run lint
```

## Project Dependencies

### Core Dependencies
- **next**: 15.0.0 - React framework with App Router
- **react**: 19.0.0 - UI library
- **typescript**: 5.3.0 - Static type checking
- **tailwindcss**: 4.0.0 - Utility-first CSS framework

### Database & Auth
- **@supabase/supabase-js**: 2.38.0 - Supabase client
- **@supabase/ssr**: For server-side auth

### Payments
- **razorpay**: 2.9.0 - Payment gateway

### UI & Animations
- **lucide-react**: 0.263.0 - Icon library
- **framer-motion**: 10.16.0 - Animation library

### Utilities
- **date-fns**: 2.30.0 - Date handling

### PWA
- **next-pwa**: 5.6.0 - Progressive Web App support

## Folder Structure Explanation

```
astro-app/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (grouped)
│   ├── api/               # API endpoints
│   ├── dashboard/         # Protected routes
│   └── globals.css        # Global styles
├── lib/                   # Utility functions
│   ├── supabase/         # Database clients
│   ├── constants.ts      # Constants & enums
│   └── types.ts          # TypeScript interfaces
├── public/               # Static assets
├── .env.example          # Environment template
├── next.config.ts        # Next.js config
├── tailwind.config.ts    # Tailwind config
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies
```

## Common Development Tasks

### Add a New Page

```bash
# Create page file
mkdir -p app/new-feature
touch app/new-feature/page.tsx
```

```typescript
// app/new-feature/page.tsx
export default function NewFeaturePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-gradient">
        New Feature
      </h1>
    </div>
  );
}
```

### Add a New API Route

```bash
mkdir -p app/api/new-endpoint
touch app/api/new-endpoint/route.ts
```

```typescript
// app/api/new-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Your logic here
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

### Add Styling

Use Tailwind CSS classes directly in JSX:

```tsx
<button className="btn-primary">
  Get Started
</button>

<div className="card">
  <h3 className="text-astro-gold">Title</h3>
</div>
```

## Testing

### Manual Testing Checklist

- [ ] User registration flow
- [ ] Login/logout
- [ ] Create birth profile
- [ ] Generate birth chart
- [ ] View daily horoscope
- [ ] Check compatibility
- [ ] View pricing page
- [ ] Test payment flow (use test cards)
- [ ] Verify report generation

### Performance Testing

```bash
# Lighthouse audit
npm run build
npm start
# Open http://localhost:3000 and use DevTools Lighthouse
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Dashboard → Settings → Environment Variables
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t astro-bhavishya .
docker run -p 3000:3000 astro-bhavishya
```

## Troubleshooting

### Issue: "Supabase credentials not found"
**Solution**: Check `.env.local` file has correct Supabase URL and keys

### Issue: "Build fails with TypeScript errors"
**Solution**: Run `npm run type-check` to see all errors, fix them

### Issue: "Tailwind styles not applied"
**Solution**: Ensure all components are in `app/` directory, clear cache with `rm -rf .next`

### Issue: "Payment integration not working"
**Solution**: Verify Razorpay keys are correct and account is live

## Performance Optimization Tips

1. **Images**: Use Next.js Image component
2. **Code Splitting**: Automatic with Next.js 15
3. **Caching**: Configure in next.config.ts
4. **API Routes**: Add caching headers where appropriate
5. **Database**: Use indexes on frequently queried columns

## Security Best Practices

1. **Never commit `.env.local`** - Add to `.gitignore`
2. **Validate all inputs** - Use TypeScript types
3. **Verify payment signatures** - Always validate on backend
4. **Protect sensitive routes** - Use middleware
5. **Use HTTPS in production** - Enabled by default on Vercel

## Next Steps

1. Complete Supabase and Razorpay setup
2. Test authentication flow
3. Implement birth chart calculation logic
4. Connect AI APIs for report generation
5. Customize styling to match brand
6. Deploy to staging environment
7. Perform user testing
8. Deploy to production

---

For more help, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Razorpay Documentation](https://razorpay.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
