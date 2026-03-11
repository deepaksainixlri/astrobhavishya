export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
  subscription: SubscriptionStatus;
}

export interface SubscriptionStatus {
  plan: 'free' | 'starter' | 'pro' | 'annual_pro';
  status: 'active' | 'cancelled' | 'expired';
  startDate?: Date;
  endDate?: Date;
  autoRenew: boolean;
}

export interface BirthProfile {
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
  notes?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanetPosition {
  planet: 'sun' | 'moon' | 'mars' | 'mercury' | 'jupiter' | 'venus' | 'saturn' | 'rahu' | 'ketu';
  sign: ZodiacSign;
  degree: number;
  minute: number;
  second: number;
  nakshatra: Nakshatra;
  nakshatraPada: 1 | 2 | 3 | 4;
  house: number;
  isRetrograde: boolean;
  celestialLongitude: number;
}

export interface HousePosition {
  houseNumber: number;
  sign: ZodiacSign;
  degree: number;
  minute: number;
  second: number;
  celestialLongitude: number;
}

export interface DashaLord {
  planet: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  subDashas?: SubDasha[];
}

export interface SubDasha {
  planet: string;
  startDate: Date;
  endDate: Date;
  duration: number;
}

export interface Yoga {
  name: string;
  description: string;
  effect: 'beneficial' | 'neutral' | 'malefic';
  planets: string[];
}

export interface Dosha {
  name: 'mangal_dosha' | 'pitra_dosha' | 'grahan_dosha' | 'kaalsarp_yoga';
  present: boolean;
  severity: 'mild' | 'moderate' | 'severe';
  remedies?: string[];
}

export interface ChartData {
  id: string;
  birthProfileId: string;
  ascendant: ZodiacSign;
  ascendantDegree: number;
  ascendantNakshatra: Nakshatra;
  planets: PlanetPosition[];
  houses: HousePosition[];
  dashas: DashaLord[];
  yogas: Yoga[];
  doshas: Dosha[];
  muhurta?: string;
  ayanamsa: number;
  createdAt: Date;
}

export interface ReportSection {
  title: string;
  content: string;
  insights?: string[];
  recommendations?: string[];
}

export interface Report {
  id: string;
  userId: string;
  birthProfileId: string;
  reportType: 'kundli' | 'compatibility' | 'career' | 'health' | 'finance' | 'annual_horoscope' | 'monthly_horoscope';
  chartData?: ChartData;
  compatibilityPartner?: BirthProfile;
  sections: ReportSection[];
  summary: string;
  generatedBy: 'claude' | 'openai' | 'google_ai';
  isPaid: boolean;
  price?: number;
  purchasedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompatibilityResult {
  overallScore: number;
  gunaScore: number;
  gunaAnalysis: {
    varna: number;
    vashya: number;
    taraBalance: number;
    yoni: number;
    graha: number;
    bhakut: number;
    nadi: number;
  };
  doshAnalysis: {
    mangalDosha: boolean;
    remedies?: string[];
  };
  sections: ReportSection[];
  recommendations: string[];
  createdAt: Date;
}

export interface Payment {
  id: string;
  userId: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  reportType?: string;
  subscriptionPlan?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Horoscope {
  id: string;
  zodiacSign: ZodiacSign;
  date: Date;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  content: string;
  loveScore?: number;
  careerScore?: number;
  healthScore?: number;
  luckyNumber?: number;
  luckyColor?: string;
  createdAt: Date;
}

export type ZodiacSign =
  | 'aries'
  | 'taurus'
  | 'gemini'
  | 'cancer'
  | 'leo'
  | 'virgo'
  | 'libra'
  | 'scorpio'
  | 'sagittarius'
  | 'capricorn'
  | 'aquarius'
  | 'pisces';

export type Nakshatra =
  | 'ashwini'
  | 'bharani'
  | 'krittika'
  | 'rohini'
  | 'mrigashira'
  | 'ardra'
  | 'punarvasu'
  | 'pushya'
  | 'aslesha'
  | 'magha'
  | 'purva_phalguni'
  | 'uttara_phalguni'
  | 'hasta'
  | 'chitra'
  | 'swati'
  | 'vishakha'
  | 'anuradha'
  | 'jyeshtha'
  | 'mula'
  | 'purva_shadha'
  | 'uttara_shadha'
  | 'shravana'
  | 'dhanishtha'
  | 'shatabhisha'
  | 'purva_bhadrapada'
  | 'uttara_bhadrapada'
  | 'revati';

export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  type: 'one-time' | 'monthly' | 'annual';
  features: string[];
  reportTypes?: string[];
  validityDays?: number;
  popular?: boolean;
}

export interface DashaInfo {
  mahadashaLord: string;
  mahadashaStart: string | Date;
  mahadashaEnd: string | Date;
  antardashaLord: string;
  antardashaStart: string | Date;
  antardashaEnd: string | Date;
  durationPercentage: number;
}

export interface BirthDetails {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  latitude: number;
  longitude: number;
  timezone: string;
  gender?: 'male' | 'female' | 'other';
  unknownBirthTime: boolean;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}
