-- Create trainings table
CREATE TABLE IF NOT EXISTS public.trainings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT NOT NULL,
    price INTEGER NOT NULL,
    currency TEXT DEFAULT 'EUR',
    duration TEXT NOT NULL,
    start_dates DATE[] NOT NULL, -- Multiple start dates
    max_participants INTEGER NOT NULL,
    current_participants INTEGER DEFAULT 0,
    instructor TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT false,
    hero_image_url TEXT,
    pdf_attachment_url TEXT,
    prerequisites TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_name TEXT NOT NULL,
    participant_company TEXT,
    training_title TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    testimonial TEXT NOT NULL,
    date DATE NOT NULL,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    company TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    training_id UUID REFERENCES public.trainings(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
    stripe_payment_intent_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, training_id)
);

-- Enable Row Level Security
ALTER TABLE public.trainings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Policies for trainings (public read access)
CREATE POLICY "Trainings are viewable by everyone" ON public.trainings
    FOR SELECT USING (true);

CREATE POLICY "Only service role can insert trainings" ON public.trainings
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service role can update trainings" ON public.trainings
    FOR UPDATE USING (auth.role() = 'service_role');

-- Policies for testimonials (public read access)
CREATE POLICY "Testimonials are viewable by everyone" ON public.testimonials
    FOR SELECT USING (true);

CREATE POLICY "Only service role can insert testimonials" ON public.testimonials
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service role can update testimonials" ON public.testimonials
    FOR UPDATE USING (auth.role() = 'service_role');

-- Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Policies for bookings
CREATE POLICY "Users can view their own bookings" ON public.bookings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" ON public.bookings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" ON public.bookings
    FOR UPDATE USING (auth.uid() = user_id);

-- Functions to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER handle_updated_at_trainings
    BEFORE UPDATE ON public.trainings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_testimonials
    BEFORE UPDATE ON public.testimonials
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_profiles
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_bookings
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
    );
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update current_participants when booking is created/updated
CREATE OR REPLACE FUNCTION public.update_training_participants()
RETURNS TRIGGER AS $$
BEGIN
    -- Update current_participants count
    UPDATE public.trainings
    SET current_participants = (
        SELECT COUNT(*)
        FROM public.bookings
        WHERE training_id = COALESCE(NEW.training_id, OLD.training_id)
        AND status = 'confirmed'
    )
    WHERE id = COALESCE(NEW.training_id, OLD.training_id);

    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Triggers for participant count updates
CREATE TRIGGER update_participants_on_booking_change
    AFTER INSERT OR UPDATE OR DELETE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION public.update_training_participants();

-- Insert sample training data
INSERT INTO public.trainings (
    id,
    title,
    description,
    long_description,
    price,
    currency,
    duration,
    start_dates,
    max_participants,
    current_participants,
    instructor,
    level,
    category,
    tags,
    featured,
    hero_image_url,
    pdf_attachment_url
) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'AI & Prompt Engineering Workshop',
    'Master prompt engineering techniques and learn to use AI responsibly to enhance productivity in your SME.',
    'This practical, hands-on workshop demystifies AI concepts and teaches you to leverage AI tools responsibly for business productivity. You''ll learn prompt construction frameworks (RTCFE), create a personalized Prompt Library, and understand data privacy and intellectual property considerations. Designed specifically for SMEs, this intensive workshop provides confidence and skills to begin using AI responsibly to enhance productivity and innovation.',
    899,
    'EUR',
    '1 day',
    '{"2024-02-15", "2024-03-12", "2024-04-09", "2024-05-14"}',
    20,
    12,
    'Dr. Sarah Mitchell',
    'Beginner',
    'AI & Technology',
    '{"AI", "prompt engineering", "productivity", "SME", "ChatGPT", "automation"}',
    true,
    '/images/trainings/ai-prompt-engineering-hero.jpg',
    '/attachments/ai-prompt-engineering-syllabus.pdf'
),
(
    '00000000-0000-0000-0000-000000000002',
    'Change Management in the AI Era',
    'Lead your SME through AI transformation with proven change management strategies and practical toolkits.',
    'This one-day leadership workshop is tailored for SME leaders who want to integrate AI into their organizations while managing the human challenges of technological transformation. Learn to build compelling visions for AI implementation, communicate transformation strategies effectively, and manage resistance and fear around technological change. Using Kotter''s 8-Step Model and practical toolkits, transform AI from a source of anxiety to a powerful catalyst for excitement, growth, and shared success.',
    1099,
    'EUR',
    '1 day',
    '{"2024-03-01", "2024-03-28", "2024-04-25", "2024-05-23"}',
    18,
    8,
    'Prof. Michael Chen',
    'Intermediate',
    'Leadership & Management',
    '{"change management", "AI transformation", "leadership", "SME", "digital strategy"}',
    true,
    '/images/trainings/change-management-hero.jpg',
    '/attachments/change-management-toolkit.pdf'
),
(
    '00000000-0000-0000-0000-000000000003',
    'Agentic AI Workshop',
    'Build autonomous AI teammates capable of understanding goals, breaking down tasks, and executing complex processes.',
    'This advanced workshop explores how to create intelligent AI agents that go beyond single-prompt interactions. Learn to design AI agents for complex business processes like market research, email management, and project planning. You''ll master agent components, build agents on specialized platforms, write master prompts, and design AI agent blueprints for your business needs. Perfect for SMEs ready to create autonomous AI systems with minimal human intervention.',
    1299,
    'EUR',
    '1 day',
    '2024-03-15',
    '2024-03-15',
    15,
    6,
    'Sylvanity Expert',
    'Advanced',
    'AI & Technology',
    '{"agentic AI", "AI agents", "automation", "advanced AI"}',
    true
),
(
    '00000000-0000-0000-0000-000000000004',
    'Practical Data Analysis for SMEs',
    'Transform gut-feel decisions into data-backed strategies using accessible tools and AI-driven insights.',
    'This hands-on workshop debunks the myth that data analysis is exclusive to large corporations. Designed for SME leaders and business professionals, learn to define core data concepts, identify internal data sources, and master data cleaning with AI tools. Perform basic descriptive analysis, craft effective AI-driven insight prompts, and create Business Insights Dashboards. Unlock the power of your existing data through practical, accessible analysis methods using spreadsheets and AI.',
    999,
    'EUR',
    '1 day',
    '2024-04-05',
    '2024-04-05',
    20,
    14,
    'Sylvanity Expert',
    'Beginner',
    'Data & Analytics',
    '{"data analysis", "business insights", "SME", "spreadsheets"}',
    false
),
(
    '00000000-0000-0000-0000-000000000005',
    'AI-Powered Business Automation',
    'Streamline your SME operations with intelligent automation solutions and AI-driven workflows.',
    'Discover how to automate repetitive business processes using AI tools and platforms. Learn to identify automation opportunities, design efficient workflows, and implement AI-powered solutions that save time and reduce errors. This practical workshop covers everything from simple task automation to complex business process optimization, specifically designed for resource-constrained SME environments.',
    1199,
    'EUR',
    '1 day',
    '2024-04-20',
    '2024-04-20',
    18,
    11,
    'Sylvanity Expert',
    'Intermediate',
    'AI & Technology',
    '{"automation", "business processes", "AI workflows", "efficiency"}',
    false
),
(
    '00000000-0000-0000-0000-000000000006',
    'AI Strategy for SME Leaders',
    'Develop a comprehensive AI strategy that aligns with your business goals and drives sustainable growth.',
    'This strategic workshop helps SME leaders create a roadmap for AI adoption that fits their unique business context. Learn to assess AI readiness, identify high-impact use cases, develop implementation timelines, and create governance frameworks. You''ll leave with a practical AI strategy document and the knowledge to lead your organization''s AI transformation confidently and effectively.',
    1399,
    'EUR',
    '1 day',
    '2024-05-10',
    '2024-05-10',
    16,
    9,
    'Sylvanity Expert',
    'Intermediate',
    'Strategy & Planning',
    '{"AI strategy", "business planning", "SME leadership", "digital transformation"}',
    false
);