-- Sylvanity Training Platform - Complete Database Migration
-- Run this file in Supabase SQL Editor to set up all tables

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================
-- CORE TABLES (from schema-updated.sql)
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
  featured BOOLEAN DEFAULT false,
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

-- Testimonials table for homepage
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_name VARCHAR(255) NOT NULL,
  participant_company VARCHAR(255),
  testimonial TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  training_id UUID REFERENCES public.trainings(id),
  training_title VARCHAR(255),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================
-- LEAD CAPTURE SYSTEM (from schema-lead-capture.sql)
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
-- ADMIN SYSTEM (from schema-admin.sql)
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
-- ROW LEVEL SECURITY POLICIES
-- =====================================

-- Enable RLS on all tables
ALTER TABLE public.trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_log ENABLE ROW LEVEL SECURITY;

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

-- =====================================
-- ADMIN FUNCTIONS
-- =====================================

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
-- ADMIN POLICIES
-- =====================================

-- Admin policies for trainings
CREATE POLICY "Admins can manage trainings"
ON public.trainings FOR ALL
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
CREATE OR REPLACE VIEW public.admin_stats AS
SELECT
  (SELECT COUNT(*) FROM public.trainings) as total_trainings,
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

-- =====================================
-- SAMPLE DATA (OPTIONAL)
-- =====================================

-- Insert sample training data
INSERT INTO public.trainings (
  title,
  description,
  long_description,
  price,
  currency,
  duration,
  instructor,
  category,
  level,
  max_participants,
  start_dates,
  hero_image_url,
  pdf_attachment_url,
  tags,
  featured
) VALUES
(
  'Leadership Excellence Program',
  'Master the art of transformational leadership in today''s dynamic business environment.',
  'This comprehensive leadership program is designed for experienced managers and emerging leaders who want to take their leadership skills to the next level. Through interactive workshops, real-world case studies, and peer-to-peer learning, participants will develop the emotional intelligence, strategic thinking, and communication skills necessary to lead high-performing teams and drive organizational success.',
  1299.00,
  'USD',
  '3 days',
  'Dr. Sarah Mitchell',
  'Leadership & Management',
  'Intermediate',
  20,
  '["2024-03-15", "2024-04-12", "2024-05-10"]'::jsonb,
  '/images/trainings/leadership-excellence-hero.webp',
  '/attachments/leadership-excellence-syllabus.pdf',
  ARRAY['Leadership', 'Team Management', 'Strategic Thinking', 'Communication', 'Emotional Intelligence'],
  true
),
(
  'AI for Business Leaders',
  'Navigate the AI revolution and harness artificial intelligence to transform your business operations.',
  'As AI continues to reshape industries, business leaders must understand how to leverage these powerful technologies effectively. This hands-on program provides executives and managers with practical knowledge about AI implementation, ethical considerations, and strategic planning for AI-driven transformation. Learn from industry experts and gain the confidence to lead your organization into the AI-powered future.',
  1899.00,
  'USD',
  '2 days',
  'Prof. Michael Chen',
  'AI & Technology',
  'Beginner',
  25,
  '["2024-03-22", "2024-04-19", "2024-05-17"]'::jsonb,
  '/images/trainings/ai-business-leaders-hero.webp',
  '/attachments/ai-business-leaders-toolkit.pdf',
  ARRAY['Artificial Intelligence', 'Digital Transformation', 'Business Strategy', 'Innovation', 'Technology Leadership'],
  true
);

-- Insert sample testimonials
INSERT INTO public.testimonials (
  participant_name,
  participant_company,
  testimonial,
  rating,
  training_title,
  featured
) VALUES
(
  'Jennifer Rodriguez',
  'TechStart Solutions',
  'The Leadership Excellence Program completely transformed how I approach team management. The practical frameworks and real-world case studies gave me tools I use every single day.',
  5,
  'Leadership Excellence Program',
  true
),
(
  'David Kim',
  'InnovateNow Corp',
  'As a non-technical CEO, I was intimidated by AI. This program made complex concepts accessible and gave me the confidence to lead our digital transformation initiative.',
  5,
  'AI for Business Leaders',
  true
),
(
  'Maria Santos',
  'Growth Dynamics',
  'Outstanding facilitators and incredibly well-structured content. The ROI on this training was evident within weeks of completing the program.',
  5,
  'Leadership Excellence Program',
  true
);

-- Success message
SELECT 'Database migration completed successfully! 🎉' as status;