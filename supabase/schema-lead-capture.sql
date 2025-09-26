-- Lead Capture Extension Schema
-- Add to existing schema for newsletter and lead capture functionality

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    subscribed_at TIMESTAMPTZ DEFAULT NOW(),
    unsubscribed_at TIMESTAMPTZ,
    source VARCHAR(100) DEFAULT 'website', -- 'website', 'training_page', 'footer', etc.
    confirmed BOOLEAN DEFAULT false,
    confirmation_token VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead captures with promo codes
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    company VARCHAR(255),
    phone VARCHAR(50),
    interested_training_id UUID REFERENCES public.trainings(id),
    message TEXT,
    source VARCHAR(100) DEFAULT 'training_page', -- 'homepage', 'training_page', 'newsletter', etc.
    promo_code VARCHAR(50),
    promo_code_used BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Promo codes table
CREATE TABLE IF NOT EXISTS public.promo_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) DEFAULT 'percentage' CHECK (discount_type IN ('percentage', 'fixed')),
    discount_percent INTEGER CHECK (discount_percent >= 0 AND discount_percent <= 100),
    discount_amount DECIMAL(10,2) CHECK (discount_amount >= 0),
    valid_from DATE DEFAULT CURRENT_DATE,
    valid_until DATE,
    max_uses INTEGER DEFAULT 1,
    current_uses INTEGER DEFAULT 0,
    training_id UUID REFERENCES public.trainings(id), -- NULL for all trainings
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;

-- Policies for newsletter_subscribers (public insert, admin read)
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Only service role can view newsletter subscribers" ON public.newsletter_subscribers
    FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Only service role can update newsletter subscribers" ON public.newsletter_subscribers
    FOR UPDATE USING (auth.role() = 'service_role');

-- Policies for leads (public insert, admin read)
CREATE POLICY "Anyone can submit leads" ON public.leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Only service role can view leads" ON public.leads
    FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "Only service role can update leads" ON public.leads
    FOR UPDATE USING (auth.role() = 'service_role');

-- Policies for promo_codes (public read active codes, admin manage)
CREATE POLICY "Anyone can view active promo codes" ON public.promo_codes
    FOR SELECT USING (active = true AND (valid_until IS NULL OR valid_until >= CURRENT_DATE));

CREATE POLICY "Only service role can manage promo codes" ON public.promo_codes
    FOR ALL USING (auth.role() = 'service_role');

-- Triggers for updated_at timestamps
CREATE TRIGGER handle_updated_at_newsletter_subscribers
    BEFORE UPDATE ON public.newsletter_subscribers
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_leads
    BEFORE UPDATE ON public.leads
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_promo_codes
    BEFORE UPDATE ON public.promo_codes
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to generate unique promo codes
CREATE OR REPLACE FUNCTION public.generate_promo_code(prefix TEXT DEFAULT 'SAVE')
RETURNS TEXT AS $$
DECLARE
    code TEXT;
    exists_code BOOLEAN := true;
BEGIN
    WHILE exists_code LOOP
        -- Generate code: PREFIX + 4 random digits
        code := prefix || LPAD(floor(random() * 10000)::text, 4, '0');

        -- Check if code already exists
        SELECT EXISTS(SELECT 1 FROM public.promo_codes WHERE promo_codes.code = code) INTO exists_code;
    END LOOP;

    RETURN code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create promo code for lead
CREATE OR REPLACE FUNCTION public.create_lead_promo_code(lead_email TEXT, training_id_param UUID DEFAULT NULL)
RETURNS TEXT AS $$
DECLARE
    promo_code TEXT;
    discount_percent INTEGER := 10; -- Default 10% discount
BEGIN
    -- Generate unique promo code
    promo_code := public.generate_promo_code('LEAD');

    -- Insert promo code
    INSERT INTO public.promo_codes (
        code,
        description,
        discount_type,
        discount_percent,
        valid_from,
        valid_until,
        max_uses,
        training_id
    ) VALUES (
        promo_code,
        'Special discount for ' || lead_email,
        'percentage',
        discount_percent,
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '30 days',
        1,
        training_id_param
    );

    RETURN promo_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert some sample promo codes
INSERT INTO public.promo_codes (code, description, discount_type, discount_percent, valid_from, valid_until, max_uses)
VALUES
    ('WELCOME10', '10% off for new customers', 'percentage', 10, CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days', 100),
    ('EARLY20', '20% early bird discount', 'percentage', 20, CURRENT_DATE, CURRENT_DATE + INTERVAL '60 days', 50),
    ('FIRSTTIME', '15% off first training', 'percentage', 15, CURRENT_DATE, CURRENT_DATE + INTERVAL '120 days', 200);