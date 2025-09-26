-- Updated schema with new features

-- Drop and recreate trainings table with new structure
DROP TABLE IF EXISTS public.trainings CASCADE;

-- Create trainings table with enhanced features
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

-- Insert updated sample training data
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
    '{"2024-03-15", "2024-04-12", "2024-05-10", "2024-06-14"}',
    15,
    6,
    'Dr. Elena Rodriguez',
    'Advanced',
    'AI & Technology',
    '{"agentic AI", "AI agents", "automation", "advanced AI", "machine learning", "AI workflows"}',
    true,
    '/images/trainings/agentic-ai-hero.jpg',
    '/attachments/agentic-ai-blueprint.pdf'
),
(
    '00000000-0000-0000-0000-000000000004',
    'Practical Data Analysis for SMEs',
    'Transform gut-feel decisions into data-backed strategies using accessible tools and AI-driven insights.',
    'This hands-on workshop debunks the myth that data analysis is exclusive to large corporations. Designed for SME leaders and business professionals, learn to define core data concepts, identify internal data sources, and master data cleaning with AI tools. Perform basic descriptive analysis, craft effective AI-driven insight prompts, and create Business Insights Dashboards. Unlock the power of your existing data through practical, accessible analysis methods using spreadsheets and AI.',
    999,
    'EUR',
    '1 day',
    '{"2024-04-05", "2024-04-26", "2024-05-17", "2024-06-07"}',
    20,
    14,
    'Data Scientist Alex Thompson',
    'Beginner',
    'Data & Analytics',
    '{"data analysis", "business insights", "SME", "spreadsheets", "Excel", "visualization"}',
    false,
    '/images/trainings/data-analysis-hero.jpg',
    '/attachments/data-analysis-workbook.pdf'
),
(
    '00000000-0000-0000-0000-000000000005',
    'AI-Powered Business Automation',
    'Streamline your SME operations with intelligent automation solutions and AI-driven workflows.',
    'Discover how to automate repetitive business processes using AI tools and platforms. Learn to identify automation opportunities, design efficient workflows, and implement AI-powered solutions that save time and reduce errors. This practical workshop covers everything from simple task automation to complex business process optimization, specifically designed for resource-constrained SME environments.',
    1199,
    'EUR',
    '1 day',
    '{"2024-04-20", "2024-05-11", "2024-06-01", "2024-06-22"}',
    18,
    11,
    'Automation Expert James Wilson',
    'Intermediate',
    'AI & Technology',
    '{"automation", "business processes", "AI workflows", "efficiency", "Zapier", "API integration"}',
    false,
    '/images/trainings/business-automation-hero.jpg',
    '/attachments/automation-playbook.pdf'
),
(
    '00000000-0000-0000-0000-000000000006',
    'AI Strategy for SME Leaders',
    'Develop a comprehensive AI strategy that aligns with your business goals and drives sustainable growth.',
    'This strategic workshop helps SME leaders create a roadmap for AI adoption that fits their unique business context. Learn to assess AI readiness, identify high-impact use cases, develop implementation timelines, and create governance frameworks. You''ll leave with a practical AI strategy document and the knowledge to lead your organization''s AI transformation confidently and effectively.',
    1399,
    'EUR',
    '1 day',
    '{"2024-05-10", "2024-05-31", "2024-06-21", "2024-07-12"}',
    16,
    9,
    'Strategy Consultant Maria Garcia',
    'Intermediate',
    'Strategy & Planning',
    '{"AI strategy", "business planning", "SME leadership", "digital transformation", "ROI", "governance"}',
    false,
    '/images/trainings/ai-strategy-hero.jpg',
    '/attachments/ai-strategy-framework.pdf'
);

-- Insert sample testimonials
INSERT INTO public.testimonials (
    id,
    participant_name,
    participant_company,
    training_title,
    rating,
    testimonial,
    date,
    featured
) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'Sarah Johnson',
    'TechStart Solutions',
    'AI & Prompt Engineering Workshop',
    5,
    'This workshop completely transformed how we approach AI in our startup. The practical frameworks and hands-on exercises made complex concepts accessible. Within a week, we had implemented AI solutions that saved us 10 hours weekly.',
    '2024-01-20',
    true
),
(
    '00000000-0000-0000-0000-000000000002',
    'Michael Chen',
    'BuildCorp Ltd',
    'Change Management in the AI Era',
    5,
    'Outstanding training! Prof. Chen''s approach to managing AI transformation was exactly what our team needed. The toolkit provided is invaluable, and our AI adoption rate increased by 300% post-training.',
    '2024-01-15',
    true
),
(
    '00000000-0000-0000-0000-000000000003',
    'Emma Rodriguez',
    'DataFlow Analytics',
    'Practical Data Analysis for SMEs',
    5,
    'Finally, a data analysis course that speaks SME language! Alex made complex statistical concepts simple and actionable. Our decision-making process is now completely data-driven.',
    '2024-01-10',
    true
),
(
    '00000000-0000-0000-0000-000000000004',
    'Lisa Thompson',
    'Strategic Ventures',
    'AI Strategy for SME Leaders',
    5,
    'Maria''s strategic framework helped us create a clear AI roadmap for the next 3 years. The governance guidelines alone are worth the investment. Highly recommend for any SME leader.',
    '2023-12-28',
    true
);