-- Sylvanity Academy Platform - Real Content Population
-- This script populates the database with authentic Sylvanity courses
-- Updated: Removed instructor field, set max_participants to 22 (18 for Agentic AI)

-- Clear existing data (if any)
DELETE FROM testimonials;
DELETE FROM trainings;

-- Update existing records if you don't want to delete
-- UPDATE trainings SET max_participants = 22 WHERE title != 'Agentic AI Workshop';
-- UPDATE trainings SET max_participants = 18 WHERE title = 'Agentic AI Workshop';

-- Insert Real Sylvanity Academy Programs
INSERT INTO trainings (
    id,
    title,
    description,
    long_description,
    price,
    currency,
    duration,
    category,
    level,
    max_participants,
    current_participants,
    start_dates,
    hero_image_url,
    pdf_attachment_url,
    tags,
    prerequisites,
    status,
    created_at
) VALUES
(
    '550e8400-e29b-41d4-a716-446655440001',
    'AI & Prompt Engineering Workshop',
    'Master prompt engineering techniques and learn to use AI responsibly to enhance productivity in your SME.',
    'This practical, hands-on workshop demystifies AI concepts and teaches you to leverage AI tools responsibly for business productivity. You''ll learn prompt construction frameworks (RTCFE), create a personalized Prompt Library, and understand data privacy and intellectual property considerations. Designed specifically for SMEs, this intensive workshop provides confidence and skills to begin using AI responsibly to enhance productivity and innovation.',
    1099.00,
    'EUR',
    '1 day',
    'AI & Technology',
    'Beginner',
    22,
    12,
    '["2025-11-17", "2025-11-24", "2026-02-10", "2026-02-17"]'::jsonb,
    '/images/trainings/ai-prompt-engineering-hero.webp',
    '/attachments/ai-prompt-engineering-syllabus.pdf',
    ARRAY['AI', 'Prompt Engineering', 'Productivity', 'SME', 'ChatGPT', 'Automation', 'Data Privacy', 'RTCFE Framework'],
    NULL, -- no prerequisites
    'active',
    now()
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'AI-Powered Business Automation',
    'Move beyond simple AI tasks to achieve systemic efficiency gains through intelligent business automation.',
    'This one-day workshop teaches SME leaders and operators to identify high-impact automation opportunities across business functions. Learn to use low-code/no-code automation tools, build multi-step automated workflows, and incorporate AI-driven decisions into your processes. You''ll understand APIs and webhooks, master tools like Zapier, and learn to embed AI prompts into automation workflows. Participants will design and partially build an automated workflow for their own business.',
    1199.00,
    'EUR',
    '1 day',
    'AI & Technology',
    'Intermediate',
    22,
    11,
    '["2025-11-17", "2025-11-24", "2026-02-10", "2026-02-17"]'::jsonb,
    '/images/trainings/business-automation-hero.webp',
    '/attachments/automation-playbook.pdf',
    ARRAY['Automation', 'Business Processes', 'AI Workflows', 'Zapier', 'API Integration', 'Efficiency', 'Low-code', 'No-code'],
    NULL, -- no prerequisites
    'active',
    now()
),
(
    '550e8400-e29b-41d4-a716-446655440003',
    'Change Management in the AI Era',
    'Lead your SME through AI transformation with proven change management strategies and practical toolkits.',
    'This one-day leadership workshop is tailored for SME leaders who want to integrate AI into their organizations while managing the human challenges of technological transformation. Learn to build compelling visions for AI implementation, communicate transformation strategies effectively, and manage resistance and fear around technological change. Using Kotter''s 8-Step Model and practical toolkits, transform AI from a source of anxiety to a powerful catalyst for excitement, growth, and shared success.',
    1099.00,
    'EUR',
    '1 day',
    'Leadership & Management',
    'Intermediate',
    22,
    8,
    '["2025-11-17", "2025-11-24", "2026-02-10", "2026-02-17"]'::jsonb,
    '/images/trainings/change-management-hero.webp',
    '/attachments/change-management-toolkit.pdf',
    ARRAY['Change Management', 'AI Transformation', 'Leadership', 'SME', 'Digital Strategy', 'Kotter Model', 'Team Management'],
    NULL, -- no prerequisites
    'active',
    now()
),
(
    '550e8400-e29b-41d4-a716-446655440004',
    'Agentic AI Workshop',
    'Build autonomous AI teammates capable of understanding goals, breaking down tasks, and executing complex processes.',
    'Moving beyond single-prompt interactions and pre-defined workflows, this advanced course explores how to build autonomous "AI teammates." Learn to define Agentic AI, understand core AI agent components, and build agents on specialized platforms. You''ll master writing "master prompts," providing agent feedback, and designing AI agent blueprints for business needs. Create intelligent entities to handle complex business processes like market research, email management, and project planning with minimal human intervention.',
    1549.00,
    'EUR',
    '1 day',
    'AI & Technology',
    'Advanced',
    18,  -- Special max_participants for Agentic AI
    6,
    '["2025-12-12", "2026-01-23", "2026-02-20", "2026-03-17"]'::jsonb,
    '/images/trainings/agentic-ai-hero.webp',
    '/attachments/agentic-ai-blueprint.pdf',
    ARRAY['Agentic AI', 'AI Agents', 'Automation', 'Advanced AI', 'Machine Learning', 'AI Workflows', 'Autonomous Systems'],
    ARRAY['AI & Prompt Engineering Workshop', 'AI-Powered Business Automation'], -- prerequisites
    'active',
    now()
),
(
    '550e8400-e29b-41d4-a716-446655440005',
    'Practical Data Analysis for SMEs',
    'Transform gut-feel decisions into data-backed strategies using accessible tools and AI-driven insights.',
    'This hands-on workshop debunks the myth that data analysis is exclusive to large corporations. Designed for SME leaders and business professionals, learn to define core data concepts, identify internal data sources, and master data cleaning with AI tools. Perform basic descriptive analysis, craft effective AI-driven insight prompts, and create Business Insights Dashboards. Unlock the power of your existing data through practical, accessible analysis methods using spreadsheets and AI.',
    999.00,
    'EUR',
    '1 day',
    'Data & Analytics',
    'Beginner',
    22,
    14,
    '["2025-11-17", "2025-11-24", "2026-02-10", "2026-02-17"]'::jsonb,
    '/images/trainings/data-analysis-hero.webp',
    '/attachments/data-analysis-workbook.pdf',
    ARRAY['Data Analysis', 'Business Insights', 'SME', 'Spreadsheets', 'Excel', 'Visualization', 'AI-driven Analysis'],
    NULL, -- no prerequisites
    'active',
    now()
),
(
    '550e8400-e29b-41d4-a716-446655440006',
    'AI in Logistics & Supply Chain',
    'Transform your supply chain operations with AI-driven optimization, predictive analytics, and intelligent automation.',
    'Coming soon: A comprehensive workshop on implementing AI solutions across logistics and supply chain operations. Learn to leverage machine learning for demand forecasting, optimize inventory management, automate route planning, and implement predictive maintenance. Designed for supply chain professionals and logistics managers seeking to modernize their operations with cutting-edge AI technologies.',
    1299.00,
    'EUR',
    '1 day',
    'AI & Technology',
    'Intermediate',
    22,
    0,
    '[]'::jsonb,  -- Empty array for upcoming course
    '/images/trainings/logistics-ai-hero.webp',
    null,  -- No PDF yet for upcoming course
    ARRAY['AI', 'Logistics', 'Supply Chain', 'Predictive Analytics', 'Automation', 'Optimization', 'Machine Learning'],
    NULL, -- no prerequisites
    'preparation',
    now()
);

-- Insert Real Testimonials
INSERT INTO testimonials (
    id,
    participant_name,
    participant_company,
    training_title,
    rating,
    testimonial,
    featured,
    created_at
) VALUES
(
    '660e8400-e29b-41d4-a716-446655440003',
    'Emma Rodriguez',
    'Move Intermodal',
    'Practical Data Analysis for SMEs',
    5,
    'Finally, a data analysis course that speaks SME language! Complex statistical concepts made simple and actionable. Our decision-making process is now completely data-driven.',
    true, -- featured
    now()
);

-- Verify the data was inserted correctly
SELECT
    title,
    price,
    currency,
    level,
    category,
    max_participants,
    jsonb_array_length(start_dates) as num_start_dates,
    array_length(tags, 1) as num_tags
FROM trainings
ORDER BY created_at;

-- Show max participants summary
SELECT
    'Max Participants Summary' as info,
    COUNT(CASE WHEN max_participants = 22 THEN 1 END) as "Trainings with 22 seats",
    COUNT(CASE WHEN max_participants = 18 THEN 1 END) as "Trainings with 18 seats (Agentic AI)"
FROM trainings;

-- Show testimonials summary
SELECT
    training_title,
    count(*) as testimonial_count,
    avg(rating) as avg_rating
FROM testimonials
GROUP BY training_title
ORDER BY avg_rating DESC;