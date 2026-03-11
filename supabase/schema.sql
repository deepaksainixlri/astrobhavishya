-- AstroBhavishya: Comprehensive Supabase Database Schema
-- Created for AI Vedic Astrology Application

-- ============================================================================
-- ENUM TYPES
-- ============================================================================

CREATE TYPE subscription_tier AS ENUM ('free', 'basic', 'premium', 'annual');
CREATE TYPE report_type AS ENUM ('kundli', 'compatibility', 'annual', 'career', 'relationship', 'health');
CREATE TYPE payment_status AS ENUM ('created', 'authorized', 'captured', 'failed', 'refunded');
CREATE TYPE product_type AS ENUM ('report', 'subscription', 'credits');
CREATE TYPE subscription_plan AS ENUM ('monthly', 'annual');
CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired', 'trial');
CREATE TYPE engagement_event_type AS ENUM ('report_view', 'share', 'daily_check', 'referral_sent');
CREATE TYPE referral_status AS ENUM ('pending', 'completed', 'rewarded');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');

-- ============================================================================
-- EXTENSION SETUP
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Function to generate unique referral codes
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists_count INT;
BEGIN
  LOOP
    code := UPPER(SUBSTRING(MD5(RANDOM()::TEXT || NOW()::TEXT), 1, 8));
    SELECT COUNT(*) INTO exists_count FROM profiles WHERE referral_code = code;
    EXIT WHEN exists_count = 0;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TABLES
-- ============================================================================

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID NOT NULL PRIMARY KEY,
  full_name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  preferred_language VARCHAR(10) DEFAULT 'en',
  is_premium BOOLEAN DEFAULT FALSE,
  subscription_tier subscription_tier DEFAULT 'free',
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  credits_balance INTEGER DEFAULT 0,
  referral_code VARCHAR(8) UNIQUE,
  referred_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  karma_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_user_auth FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Birth Profiles table
CREATE TABLE birth_profiles (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  date_of_birth DATE NOT NULL,
  time_of_birth TIME,
  place_of_birth VARCHAR(255) NOT NULL,
  latitude NUMERIC(10, 6),
  longitude NUMERIC(10, 6),
  timezone VARCHAR(50),
  gender gender_type,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chart Data table (stores computed Vedic chart)
CREATE TABLE chart_data (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  birth_profile_id UUID NOT NULL REFERENCES birth_profiles(id) ON DELETE CASCADE,
  ascendant_sign VARCHAR(20),
  ascendant_degree NUMERIC(5, 2),
  ascendant_nakshatra VARCHAR(50),
  planet_positions JSONB,
  house_cusps JSONB,
  vimshottari_dasha JSONB,
  ashtakvarga JSONB,
  shadbala JSONB,
  yogas JSONB,
  doshas JSONB,
  divisional_charts JSONB,
  computed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  computation_version VARCHAR(10)
);

-- Reports table
CREATE TABLE reports (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  birth_profile_id UUID NOT NULL REFERENCES birth_profiles(id) ON DELETE CASCADE,
  chart_data_id UUID REFERENCES chart_data(id) ON DELETE SET NULL,
  report_type report_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  content JSONB,
  ai_model_used VARCHAR(100),
  ai_cost NUMERIC(10, 4),
  generation_time_ms INTEGER,
  language VARCHAR(10) DEFAULT 'en',
  is_paid BOOLEAN DEFAULT FALSE,
  payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Compatibility Reports table
CREATE TABLE compatibility_reports (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  profile_a_id UUID NOT NULL REFERENCES birth_profiles(id) ON DELETE CASCADE,
  profile_b_id UUID NOT NULL REFERENCES birth_profiles(id) ON DELETE CASCADE,
  guna_milan_score INTEGER CHECK (guna_milan_score >= 0 AND guna_milan_score <= 36),
  guna_details JSONB,
  compatibility_analysis JSONB,
  is_paid BOOLEAN DEFAULT FALSE,
  payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  razorpay_order_id VARCHAR(100),
  razorpay_payment_id VARCHAR(100) UNIQUE,
  razorpay_signature VARCHAR(255),
  amount NUMERIC(12, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  status payment_status DEFAULT 'created',
  product_type product_type NOT NULL,
  product_id VARCHAR(255),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  plan subscription_plan NOT NULL,
  status subscription_status DEFAULT 'active',
  amount NUMERIC(12, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  razorpay_subscription_id VARCHAR(100) UNIQUE,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily Horoscopes table
CREATE TABLE daily_horoscopes (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  zodiac_sign VARCHAR(20) NOT NULL,
  content JSONB NOT NULL,
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, zodiac_sign, language)
);

-- Referrals table
CREATE TABLE referrals (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  status referral_status DEFAULT 'pending',
  reward_type VARCHAR(50),
  reward_value NUMERIC(12, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(referrer_id, referred_id)
);

-- User Engagement table
CREATE TABLE user_engagement (
  id UUID NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  event_type engagement_event_type NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Profiles indexes
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_referral_code ON profiles(referral_code);
CREATE INDEX idx_profiles_subscription_tier ON profiles(subscription_tier);
CREATE INDEX idx_profiles_referred_by ON profiles(referred_by);
CREATE INDEX idx_profiles_created_at ON profiles(created_at);

-- Birth Profiles indexes
CREATE INDEX idx_birth_profiles_user_id ON birth_profiles(user_id);
CREATE INDEX idx_birth_profiles_date_of_birth ON birth_profiles(date_of_birth);
CREATE INDEX idx_birth_profiles_is_primary ON birth_profiles(is_primary);

-- Chart Data indexes
CREATE INDEX idx_chart_data_birth_profile_id ON chart_data(birth_profile_id);
CREATE INDEX idx_chart_data_computed_at ON chart_data(computed_at);
CREATE INDEX idx_chart_data_ascendant_sign ON chart_data(ascendant_sign);

-- Reports indexes
CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_birth_profile_id ON reports(birth_profile_id);
CREATE INDEX idx_reports_chart_data_id ON reports(chart_data_id);
CREATE INDEX idx_reports_report_type ON reports(report_type);
CREATE INDEX idx_reports_is_paid ON reports(is_paid);
CREATE INDEX idx_reports_created_at ON reports(created_at);
CREATE INDEX idx_reports_payment_id ON reports(payment_id);

-- Compatibility Reports indexes
CREATE INDEX idx_compatibility_reports_user_id ON compatibility_reports(user_id);
CREATE INDEX idx_compatibility_reports_profile_a_id ON compatibility_reports(profile_a_id);
CREATE INDEX idx_compatibility_reports_profile_b_id ON compatibility_reports(profile_b_id);
CREATE INDEX idx_compatibility_reports_guna_milan_score ON compatibility_reports(guna_milan_score);
CREATE INDEX idx_compatibility_reports_created_at ON compatibility_reports(created_at);

-- Payments indexes
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_razorpay_payment_id ON payments(razorpay_payment_id);
CREATE INDEX idx_payments_razorpay_order_id ON payments(razorpay_order_id);
CREATE INDEX idx_payments_product_type ON payments(product_type);
CREATE INDEX idx_payments_created_at ON payments(created_at);

-- Subscriptions indexes
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_plan ON subscriptions(plan);
CREATE INDEX idx_subscriptions_razorpay_subscription_id ON subscriptions(razorpay_subscription_id);
CREATE INDEX idx_subscriptions_current_period_end ON subscriptions(current_period_end);

-- Daily Horoscopes indexes
CREATE INDEX idx_daily_horoscopes_date ON daily_horoscopes(date);
CREATE INDEX idx_daily_horoscopes_zodiac_sign ON daily_horoscopes(zodiac_sign);
CREATE INDEX idx_daily_horoscopes_language ON daily_horoscopes(language);
CREATE INDEX idx_daily_horoscopes_date_sign_lang ON daily_horoscopes(date, zodiac_sign, language);

-- Referrals indexes
CREATE INDEX idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX idx_referrals_referred_id ON referrals(referred_id);
CREATE INDEX idx_referrals_status ON referrals(status);
CREATE INDEX idx_referrals_created_at ON referrals(created_at);

-- User Engagement indexes
CREATE INDEX idx_user_engagement_user_id ON user_engagement(user_id);
CREATE INDEX idx_user_engagement_event_type ON user_engagement(event_type);
CREATE INDEX idx_user_engagement_created_at ON user_engagement(created_at);

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Trigger to auto-create profile on auth.users insert
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, referral_code)
  VALUES (
    NEW.id,
    NEW.email,
    generate_referral_code()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();

-- Trigger to update updated_at in profiles
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE birth_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chart_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE compatibility_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_horoscopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_engagement ENABLE ROW LEVEL SECURITY;

-- Profiles RLS policies
CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can view public profile info"
ON profiles FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Birth Profiles RLS policies
CREATE POLICY "Users can view own birth profiles"
ON birth_profiles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own birth profiles"
ON birth_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own birth profiles"
ON birth_profiles FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own birth profiles"
ON birth_profiles FOR DELETE
USING (auth.uid() = user_id);

-- Chart Data RLS policies
CREATE POLICY "Users can view own chart data"
ON chart_data FOR SELECT
USING (EXISTS (
  SELECT 1 FROM birth_profiles
  WHERE birth_profiles.id = chart_data.birth_profile_id
  AND birth_profiles.user_id = auth.uid()
));

CREATE POLICY "Users can insert own chart data"
ON chart_data FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM birth_profiles
  WHERE birth_profiles.id = chart_data.birth_profile_id
  AND birth_profiles.user_id = auth.uid()
));

CREATE POLICY "Users can update own chart data"
ON chart_data FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM birth_profiles
  WHERE birth_profiles.id = chart_data.birth_profile_id
  AND birth_profiles.user_id = auth.uid()
))
WITH CHECK (EXISTS (
  SELECT 1 FROM birth_profiles
  WHERE birth_profiles.id = chart_data.birth_profile_id
  AND birth_profiles.user_id = auth.uid()
));

-- Reports RLS policies
CREATE POLICY "Users can view own reports"
ON reports FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reports"
ON reports FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reports"
ON reports FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reports"
ON reports FOR DELETE
USING (auth.uid() = user_id);

-- Compatibility Reports RLS policies
CREATE POLICY "Users can view own compatibility reports"
ON compatibility_reports FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own compatibility reports"
ON compatibility_reports FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own compatibility reports"
ON compatibility_reports FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own compatibility reports"
ON compatibility_reports FOR DELETE
USING (auth.uid() = user_id);

-- Payments RLS policies
CREATE POLICY "Users can view own payments"
ON payments FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments"
ON payments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own payments"
ON payments FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Subscriptions RLS policies
CREATE POLICY "Users can view own subscription"
ON subscriptions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription"
ON subscriptions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
ON subscriptions FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Daily Horoscopes RLS policies (public read access)
CREATE POLICY "Anyone can view daily horoscopes"
ON daily_horoscopes FOR SELECT
USING (true);

-- Referrals RLS policies
CREATE POLICY "Users can view own referrals sent"
ON referrals FOR SELECT
USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

CREATE POLICY "Users can insert referral records"
ON referrals FOR INSERT
WITH CHECK (auth.uid() = referrer_id);

CREATE POLICY "Users can update referral status"
ON referrals FOR UPDATE
USING (auth.uid() = referrer_id)
WITH CHECK (auth.uid() = referrer_id);

-- User Engagement RLS policies
CREATE POLICY "Users can view own engagement data"
ON user_engagement FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own engagement events"
ON user_engagement FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE profiles IS 'Extended user profiles with subscription and karma data';
COMMENT ON TABLE birth_profiles IS 'User birth details for astrological calculations';
COMMENT ON TABLE chart_data IS 'Computed Vedic astrological chart data including planetary positions and doshas';
COMMENT ON TABLE reports IS 'Generated astrological reports (Kundli, compatibility, career, etc.)';
COMMENT ON TABLE compatibility_reports IS 'Partner compatibility analysis reports';
COMMENT ON TABLE payments IS 'Payment transaction records via Razorpay';
COMMENT ON TABLE subscriptions IS 'User subscription plans and billing information';
COMMENT ON TABLE daily_horoscopes IS 'Daily horoscope content for all zodiac signs';
COMMENT ON TABLE referrals IS 'User referral tracking and rewards';
COMMENT ON TABLE user_engagement IS 'User activity tracking for analytics';
