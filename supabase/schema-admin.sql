-- Admin Role Management Schema
-- This extends the existing profiles table to support admin roles

-- Add role column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user';

-- Create admin roles enum for better type safety
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'admin', 'super_admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Update the role column to use the enum (optional, keeps flexibility)
-- ALTER TABLE profiles ALTER COLUMN role TYPE user_role USING role::user_role;

-- Add index for role-based queries
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Add RLS policy for admin access
CREATE POLICY IF NOT EXISTS "Admins can view all profiles"
ON profiles FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  )
);

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = user_id AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user is super admin
CREATE OR REPLACE FUNCTION is_super_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = user_id AND role = 'super_admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant usage on the functions
GRANT EXECUTE ON FUNCTION is_admin(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION is_super_admin(UUID) TO authenticated;

-- Create an admin user (run manually after creating an account)
-- UPDATE profiles SET role = 'admin' WHERE email = 'admin@sylvanity.com';

-- Admin policies for trainings
CREATE POLICY IF NOT EXISTS "Admins can manage trainings"
ON trainings FOR ALL
USING (is_admin());

-- Admin policies for leads
CREATE POLICY IF NOT EXISTS "Admins can view all leads"
ON leads FOR SELECT
USING (is_admin());

-- Admin policies for newsletter subscribers
CREATE POLICY IF NOT EXISTS "Admins can view all subscribers"
ON newsletter_subscribers FOR SELECT
USING (is_admin());

-- Admin policies for promo codes
CREATE POLICY IF NOT EXISTS "Admins can manage promo codes"
ON promo_codes FOR ALL
USING (is_admin());

-- Create admin activity log table
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES profiles(id) NOT NULL,
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on admin activity log
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

-- Admin can view all activity logs
CREATE POLICY "Admins can view activity logs"
ON admin_activity_log FOR SELECT
USING (is_admin());

-- Function to log admin activity
CREATE OR REPLACE FUNCTION log_admin_activity(
  action_name VARCHAR(100),
  resource_type VARCHAR(50),
  resource_id UUID DEFAULT NULL,
  details JSONB DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO admin_activity_log (admin_id, action, resource_type, resource_id, details)
  VALUES (auth.uid(), action_name, resource_type, resource_id, details);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION log_admin_activity(VARCHAR, VARCHAR, UUID, JSONB) TO authenticated;

-- Create stats view for admin dashboard
CREATE OR REPLACE VIEW admin_stats AS
SELECT
  (SELECT COUNT(*) FROM trainings) as total_trainings,
  (SELECT COUNT(*) FROM leads) as total_leads,
  (SELECT COUNT(*) FROM newsletter_subscribers WHERE unsubscribed_at IS NULL) as active_subscribers,
  (SELECT COUNT(*) FROM leads WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as leads_last_30_days,
  (SELECT COUNT(*) FROM newsletter_subscribers WHERE subscribed_at >= CURRENT_DATE - INTERVAL '30 days') as subscribers_last_30_days;

-- Grant access to the view
GRANT SELECT ON admin_stats TO authenticated;