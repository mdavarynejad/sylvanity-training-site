-- Sylvanity Training Platform - FINAL COMPLETE Database Schema
-- This is the MASTER FILE - run this to recreate the entire database
-- Version: 2025-09-27 (includes auth fixes and handles existing policies)

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================
-- CORE TABLES
-- =====================================

-- Enhanced trainings table with new features
CREATE TABLE IF NOT EXISTS public.trainings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  long_description TEXT,
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  duration VARCHAR(100),
  instructor VARCHAR(255),
  category VARCHAR(100),
  level VARCHAR(20) DEFAULT 'Beginner',
  max_participants INTEGER DEFAULT 20,
  current_participants INTEGER DEFAULT 0,
  start_dates JSONB, -- Array of start dates
  hero_image_url TEXT,
  pdf_attachment_url TEXT,
  tags TEXT[], -- Array of tags/skills
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'preparation', 'cancelled')), -- Course readiness status
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  full_name VARCHAR(255),
  company VARCHAR(255),
  phone VARCHAR(50),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CRITICAL: Bookings table for user training registrations
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    training_id UUID REFERENCES public.trainings(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
    payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'failed')) DEFAULT 'pending',
    stripe_payment_intent_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Testimonials table for homepage
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_name VARCHAR(255) NOT NULL,
  participant_company VARCHAR(255),
  testimonial TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  training_id UUID REFERENCES public.trainings(id),
  training_title VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- LEAD CAPTURE SYSTEM
-- =====================================

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  source VARCHAR(100) DEFAULT 'website',
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead captures with promo codes
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  company VARCHAR(255),
  phone VARCHAR(50),
  message TEXT,
  interested_training_id UUID REFERENCES public.trainings(id),
  promo_code VARCHAR(50),
  source VARCHAR(100) DEFAULT 'training_page',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Promo codes
CREATE TABLE IF NOT EXISTS public.promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_percent INTEGER,
  discount_amount DECIMAL(10,2),
  valid_from DATE DEFAULT CURRENT_DATE,
  valid_until DATE,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- TRAINING PROGRESS & CERTIFICATES
-- =====================================

-- Training modules (lessons/chapters within a training)
CREATE TABLE IF NOT EXISTS public.training_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  training_id UUID REFERENCES public.trainings(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT, -- Lesson content
  video_url TEXT,
  duration_minutes INTEGER DEFAULT 0,
  order_index INTEGER DEFAULT 0,
  is_mandatory BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User progress tracking
CREATE TABLE IF NOT EXISTS public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  training_id UUID REFERENCES public.trainings(id) ON DELETE CASCADE,
  module_id UUID REFERENCES public.training_modules(id) ON DELETE CASCADE,
  status VARCHAR(20) CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  time_spent_minutes INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Training completion certificates
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  training_id UUID REFERENCES public.trainings(id) ON DELETE CASCADE,
  certificate_number VARCHAR(50) UNIQUE NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  certificate_data JSONB, -- Store user info, training details, etc.
  pdf_url TEXT, -- Generated certificate PDF
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Training assessments/quizzes
CREATE TABLE IF NOT EXISTS public.training_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  training_id UUID REFERENCES public.trainings(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  questions JSONB NOT NULL, -- Array of question objects
  passing_score INTEGER DEFAULT 80,
  max_attempts INTEGER DEFAULT 3,
  time_limit_minutes INTEGER,
  is_final_assessment BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User assessment attempts
CREATE TABLE IF NOT EXISTS public.assessment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES public.training_assessments(id) ON DELETE CASCADE,
  answers JSONB NOT NULL, -- User's answers
  score INTEGER DEFAULT 0,
  passed BOOLEAN DEFAULT false,
  time_taken_minutes INTEGER,
  attempt_number INTEGER DEFAULT 1,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- ADMIN SYSTEM
-- =====================================

-- Admin activity log table
CREATE TABLE IF NOT EXISTS public.admin_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES public.profiles(id) NOT NULL,
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- TRIGGERS AND FUNCTIONS
-- =====================================

-- Function to automatically update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist, then create them
DROP TRIGGER IF EXISTS handle_bookings_updated_at ON public.bookings;
CREATE TRIGGER handle_bookings_updated_at BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_profiles_updated_at ON public.profiles;
CREATE TRIGGER handle_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user is super admin
CREATE OR REPLACE FUNCTION public.is_super_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = user_id AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log admin activity
CREATE OR REPLACE FUNCTION public.log_admin_activity(
  action_name VARCHAR(100),
  resource_type VARCHAR(50),
  resource_id UUID DEFAULT NULL,
  details JSONB DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.admin_activity_log (admin_id, action, resource_type, resource_id, details)
  VALUES (auth.uid(), action_name, resource_type, resource_id, details);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================

-- Enable RLS on all tables
ALTER TABLE public.trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_attempts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies before creating new ones to avoid conflicts
DROP POLICY IF EXISTS "Trainings are viewable by everyone" ON public.trainings;
DROP POLICY IF EXISTS "Testimonials are viewable by everyone" ON public.testimonials;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can insert own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update own bookings" ON public.bookings;

-- Public read access for trainings and testimonials
CREATE POLICY "Trainings are viewable by everyone"
ON public.trainings FOR SELECT
USING (true);

CREATE POLICY "Testimonials are viewable by everyone"
ON public.testimonials FOR SELECT
USING (true);

-- Profile policies
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- CRITICAL: Booking policies for user authentication
CREATE POLICY "Users can view own bookings" ON public.bookings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings" ON public.bookings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings" ON public.bookings
    FOR UPDATE USING (auth.uid() = user_id);

-- Progress tracking policies
CREATE POLICY "Training modules are viewable by everyone" ON public.training_modules
    FOR SELECT USING (true);

CREATE POLICY "Users can view own progress" ON public.user_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON public.user_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON public.user_progress
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own certificates" ON public.certificates
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Assessments are viewable by everyone" ON public.training_assessments
    FOR SELECT USING (true);

CREATE POLICY "Users can view own assessment attempts" ON public.assessment_attempts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessment attempts" ON public.assessment_attempts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =====================================
-- ADMIN POLICIES (Drop existing first)
-- =====================================

DROP POLICY IF EXISTS "Admins can manage trainings" ON public.trainings;
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can view all leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can view all subscribers" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Admins can manage promo codes" ON public.promo_codes;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view activity logs" ON public.admin_activity_log;

-- Admin policies for trainings
CREATE POLICY "Admins can manage trainings"
ON public.trainings FOR ALL
USING (public.is_admin());

-- Admin policies for bookings
CREATE POLICY "Admins can view all bookings"
ON public.bookings FOR SELECT
USING (public.is_admin());

-- Admin policies for leads
CREATE POLICY "Admins can view all leads"
ON public.leads FOR SELECT
USING (public.is_admin());

-- Admin policies for newsletter subscribers
CREATE POLICY "Admins can view all subscribers"
ON public.newsletter_subscribers FOR SELECT
USING (public.is_admin());

-- Admin policies for promo codes
CREATE POLICY "Admins can manage promo codes"
ON public.promo_codes FOR ALL
USING (public.is_admin());

-- Admin can view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (public.is_admin());

-- Admin can view activity logs
CREATE POLICY "Admins can view activity logs"
ON public.admin_activity_log FOR SELECT
USING (public.is_admin());

-- =====================================
-- PUBLIC POLICIES FOR FORM SUBMISSIONS
-- =====================================

DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;

-- Allow anyone to submit newsletter signups
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers FOR INSERT
WITH CHECK (true);

-- Allow anyone to submit leads
CREATE POLICY "Anyone can submit leads"
ON public.leads FOR INSERT
WITH CHECK (true);

-- =====================================
-- ADMIN STATS VIEW
-- =====================================

-- Create stats view for admin dashboard
DROP VIEW IF EXISTS public.admin_stats;
CREATE OR REPLACE VIEW public.admin_stats AS
SELECT
  (SELECT COUNT(*) FROM public.trainings) as total_trainings,
  (SELECT COUNT(*) FROM public.bookings) as total_bookings,
  (SELECT COUNT(*) FROM public.leads) as total_leads,
  (SELECT COUNT(*) FROM public.newsletter_subscribers WHERE unsubscribed_at IS NULL) as active_subscribers,
  (SELECT COUNT(*) FROM public.leads WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as leads_last_30_days,
  (SELECT COUNT(*) FROM public.newsletter_subscribers WHERE subscribed_at >= CURRENT_DATE - INTERVAL '30 days') as subscribers_last_30_days;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.admin_stats TO authenticated;

-- Success message
SELECT 'FINAL COMPLETE DATABASE SCHEMA APPLIED SUCCESSFULLY! 🎉' as status,
       'This includes ALL tables: trainings, profiles, bookings, testimonials, leads, newsletter_subscribers, promo_codes, admin_activity_log' as tables_created,
       'Authentication and user management now fully functional' as auth_status,
       'All existing policies have been safely replaced' as policies_status;