# AstroBhavishya - AI Vedic Astrology Platform

A production-ready Next.js 15 application for AI-powered Vedic astrology services. This platform combines ancient astrological wisdom with cutting-edge AI technology to provide personalized birth chart analysis, compatibility reports, and daily horoscopes.

## Features

### Core Features
- **Birth Chart Analysis**: Complete Vedic astrology birth chart calculation and interpretation
- **Compatibility Reports**: Detailed relationship analysis with guna milan and dosha checking
- **Daily Horoscopes**: Personalized daily, weekly, and monthly horoscopes based on zodiac signs
- **Dasha Predictions**: Vimsottari Dasha and other dasha period calculations
- **Remedial Solutions**: Personalized mantras, gemstones, and rituals
- **Career Guidance**: Astrological career path recommendations

### Technical Features
- **Next.js 15** with React 19 and TypeScript 5
- **Tailwind CSS 4** with custom cosmic theme
- **Supabase** for backend and authentication
- **Razorpay** integration for payments
- **PWA Support** for mobile app experience
- **AI Integration** ready for Claude, OpenAI, or Google AI
- **Responsive Design** optimized for all devices

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Framer Motion (animations)
- Lucide React (icons)

### Backend
- Supabase (PostgreSQL + Auth)
- Next.js API Routes
- Razorpay (payments)

### Libraries
- date-fns (date handling)
- next-pwa (PWA support)
- @supabase/supabase-js (database)

## Project Structure

```
astro-app/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── api/
│   │   ├── generate-chart/
│   │   ├── generate-report/
│   │   ├── create-order/
│   │   ├── verify-payment/
│   │   └── daily-horoscope/
│   ├── dashboard/
│   ├── horoscope/
│   ├── compatibility/
│   ├── pricing/
│   ├── report/[id]/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── middleware.ts
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── constants.ts
│   └── types.ts
├── public/
├── .env.example
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Razorpay account
- (Optional) AI API keys

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd astro-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
- Supabase URL and keys
- Razorpay keys
- AI API keys (Claude, OpenAI, Google AI)
- Geocoding API key

4. **Run development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

5. **Build for production**
```bash
npm run build
npm start
```

## Database Setup

### Create Supabase Tables

The application requires the following tables:

```sql
-- Users (handled by Supabase Auth)

-- Birth Profiles
CREATE TABLE birth_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  name TEXT NOT NULL,
  gender TEXT,
  date_of_birth DATE,
  time_of_birth TIME,
  place_of_birth TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  timezone TEXT,
  is_default BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Charts
CREATE TABLE charts (
  id UUID PRIMARY KEY,
  birth_profile_id UUID REFERENCES birth_profiles,
  ascendant TEXT,
  ascendant_degree DECIMAL,
  planets JSONB,
  houses JSONB,
  dashas JSONB,
  yogas JSONB,
  doshas JSONB,
  ayanamsa DECIMAL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reports
CREATE TABLE reports (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  birth_profile_id UUID REFERENCES birth_profiles,
  report_type TEXT,
  content JSONB,
  is_paid BOOLEAN,
  price DECIMAL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  order_id TEXT,
  amount DECIMAL,
  currency TEXT,
  status TEXT,
  razorpay_payment_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Astrology
- `POST /api/generate-chart` - Generate birth chart
- `POST /api/generate-report` - Generate astrology report
- `GET /api/daily-horoscope?sign=aries` - Get daily horoscope

### Payments
- `POST /api/create-order` - Create Razorpay order
- `POST /api/verify-payment` - Verify payment

## Pricing Model

### One-Time Reports
- Free (Daily horoscope)
- Detailed Kundli (₹49-99)
- Compatibility Check (₹79-149)
- Career/Health/Finance Analysis (₹99-199)

### Subscriptions
- Monthly Membership (₹149)
- Annual Membership (₹999-1499) - Best value

## Customization

### Theme Colors
Edit `tailwind.config.ts` to customize the cosmic theme:
- Deep purples: `#6b2cff`, `#9374ff`
- Gold accents: `#d4af37`, `#e8c547`
- Dark backgrounds: `#0f0b1e`, `#0a0815`

### Fonts
Custom fonts configured in `globals.css`:
- Sans: Inter
- Serif: Playfair Display

## PWA Configuration

The app includes PWA support for mobile app-like experience:
- Service Worker (auto-generated)
- Web Manifest
- Install prompts
- Offline support (basic)

## Security

- Authentication via Supabase Auth
- Protected API routes with session verification
- CORS headers configured
- Environment variables for sensitive data
- Payment verification with Razorpay signatures

## Performance

- Next.js Image Optimization
- CSS-in-JS with Tailwind
- Code splitting (automatic with Next.js 15)
- Static generation where possible
- API route optimization

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Other Platforms
- AWS Amplify
- Railway
- Render
- Heroku (with buildpack)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License - See LICENSE file

## Support

For issues, questions, or suggestions:
- Email: support@astro-bhavishya.com
- GitHub Issues: [Link to issues]
- Documentation: [Link to docs]

## Future Enhancements

- [ ] Live astrologer consultation via video
- [ ] AI-powered chatbot for astrological queries
- [ ] Mobile app (React Native)
- [ ] Advanced transit predictions
- [ ] Spouse prediction analysis
- [ ] Vastu recommendations
- [ ] Numerology analysis
- [ ] Palmistry interpretation
- [ ] Social features (share charts, compatibility matches)
- [ ] Subscription management dashboard

---

Built with ✨ by AstroBhavishya Team
