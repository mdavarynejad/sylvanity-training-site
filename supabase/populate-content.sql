-- Sylvanity Training Platform - Content Population
-- Run this in Supabase SQL Editor to add all real training content

-- Clear existing sample data first
DELETE FROM public.testimonials;
DELETE FROM public.trainings;

-- Insert comprehensive training catalog
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

-- Leadership & Management Category
(
  'Leadership Excellence Program',
  'Master the art of transformational leadership in today''s dynamic business environment.',
  'This comprehensive leadership program is designed for experienced managers and emerging leaders who want to take their leadership skills to the next level. Through interactive workshops, real-world case studies, and peer-to-peer learning, participants will develop the emotional intelligence, strategic thinking, and communication skills necessary to lead high-performing teams and drive organizational success. The program covers advanced leadership theories, change management, conflict resolution, and building organizational culture.',
  1299.00,
  'USD',
  '3 days',
  'Dr. Sarah Mitchell',
  'Leadership & Management',
  'Intermediate',
  20,
  '["2024-03-15", "2024-04-12", "2024-05-10", "2024-06-14"]'::jsonb,
  '/images/trainings/leadership-excellence-hero.webp',
  '/attachments/leadership-excellence-syllabus.pdf',
  ARRAY['Leadership', 'Team Management', 'Strategic Thinking', 'Communication', 'Emotional Intelligence'],
  true
),
(
  'Strategic Decision Making',
  'Learn frameworks and methodologies for making critical business decisions under uncertainty.',
  'In today''s rapidly changing business landscape, leaders must make complex decisions with incomplete information. This intensive program teaches proven frameworks for strategic decision-making, risk assessment, and scenario planning. Participants will learn to analyze market dynamics, evaluate opportunities, and develop robust strategies that drive sustainable growth.',
  999.00,
  'USD',
  '2 days',
  'Prof. Michael Anderson',
  'Leadership & Management',
  'Advanced',
  15,
  '["2024-03-22", "2024-04-26", "2024-05-24"]'::jsonb,
  '/images/trainings/strategic-decision-hero.webp',
  '/attachments/strategic-decision-toolkit.pdf',
  ARRAY['Strategy', 'Decision Making', 'Risk Management', 'Business Analysis'],
  true
),

-- AI & Technology Category
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
  '["2024-03-22", "2024-04-19", "2024-05-17", "2024-06-21"]'::jsonb,
  '/images/trainings/ai-business-leaders-hero.webp',
  '/attachments/ai-business-leaders-toolkit.pdf',
  ARRAY['Artificial Intelligence', 'Digital Transformation', 'Business Strategy', 'Innovation', 'Technology Leadership'],
  true
),
(
  'Digital Transformation Masterclass',
  'Complete guide to leading successful digital transformation initiatives in traditional organizations.',
  'Digital transformation is not just about technology—it''s about fundamentally reimagining how your organization creates value. This comprehensive masterclass covers the entire transformation journey, from assessment and strategy development to implementation and change management. Learn proven methodologies, avoid common pitfalls, and develop the skills to lead your organization through successful digital evolution.',
  1599.00,
  'USD',
  '3 days',
  'Dr. Lisa Rodriguez',
  'AI & Technology',
  'Intermediate',
  18,
  '["2024-04-05", "2024-05-03", "2024-06-07"]'::jsonb,
  '/images/trainings/digital-transformation-hero.webp',
  '/attachments/digital-transformation-playbook.pdf',
  ARRAY['Digital Transformation', 'Change Management', 'Technology Strategy', 'Innovation'],
  false
),

-- Sales & Customer Success Category
(
  'Advanced Sales Strategy',
  'Develop sophisticated sales methodologies and build high-performing sales organizations.',
  'Modern B2B sales requires a strategic, consultative approach that focuses on creating genuine value for customers. This advanced program teaches proven sales methodologies, pipeline management, and team leadership strategies. Participants will learn to develop compelling value propositions, navigate complex sales cycles, and build sustainable revenue growth.',
  1199.00,
  'USD',
  '2 days',
  'James Thompson',
  'Sales & Customer Success',
  'Intermediate',
  20,
  '["2024-03-29", "2024-04-19", "2024-05-31"]'::jsonb,
  '/images/trainings/advanced-sales-hero.webp',
  '/attachments/sales-strategy-framework.pdf',
  ARRAY['Sales Strategy', 'B2B Sales', 'Pipeline Management', 'Revenue Growth'],
  false
),
(
  'Customer Success Excellence',
  'Build world-class customer success programs that drive retention and expansion revenue.',
  'Customer success has become the cornerstone of sustainable business growth. This comprehensive program teaches the strategies, processes, and technologies needed to build exceptional customer success organizations. Learn to reduce churn, increase expansion revenue, and create customers who become your biggest advocates.',
  899.00,
  'USD',
  '1 day',
  'Sarah Kim',
  'Sales & Customer Success',
  'Beginner',
  25,
  '["2024-04-12", "2024-05-10", "2024-06-14"]'::jsonb,
  '/images/trainings/customer-success-hero.webp',
  '/attachments/customer-success-playbook.pdf',
  ARRAY['Customer Success', 'Customer Retention', 'Account Management', 'Revenue Expansion'],
  false
),

-- Innovation & Entrepreneurship Category
(
  'Innovation Leadership',
  'Foster a culture of innovation and drive breakthrough thinking in your organization.',
  'Innovation is the lifeblood of competitive advantage. This dynamic program teaches leaders how to create environments where innovation thrives, manage innovation portfolios, and transform creative ideas into business value. Learn proven frameworks for innovation management, design thinking, and building innovation capabilities at scale.',
  1399.00,
  'USD',
  '2 days',
  'Dr. Amanda Foster',
  'Innovation & Entrepreneurship',
  'Intermediate',
  16,
  '["2024-04-26", "2024-05-24", "2024-06-28"]'::jsonb,
  '/images/trainings/innovation-leadership-hero.webp',
  '/attachments/innovation-framework.pdf',
  ARRAY['Innovation', 'Design Thinking', 'Creative Leadership', 'Business Transformation'],
  false
),

-- Finance & Operations Category
(
  'Financial Strategy for Non-Financial Managers',
  'Master essential financial concepts and make data-driven business decisions with confidence.',
  'Every business leader needs to understand the financial implications of their decisions. This practical program demystifies financial statements, budgeting, and financial analysis for non-financial managers. Learn to read financial reports, understand key metrics, and use financial data to drive better business outcomes.',
  799.00,
  'USD',
  '1 day',
  'Robert Chen',
  'Finance & Operations',
  'Beginner',
  30,
  '["2024-03-15", "2024-04-12", "2024-05-17", "2024-06-21"]'::jsonb,
  '/images/trainings/financial-strategy-hero.webp',
  '/attachments/financial-analysis-toolkit.pdf',
  ARRAY['Financial Management', 'Business Analysis', 'Strategic Planning', 'Performance Metrics'],
  false
);

-- Insert comprehensive testimonials
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
  'The Leadership Excellence Program completely transformed how I approach team management. The practical frameworks and real-world case studies gave me tools I use every single day. Dr. Mitchell''s facilitation was exceptional.',
  5,
  'Leadership Excellence Program',
  true
),
(
  'David Kim',
  'InnovateNow Corp',
  'As a non-technical CEO, I was intimidated by AI. This program made complex concepts accessible and gave me the confidence to lead our digital transformation initiative. The ROI has been incredible.',
  5,
  'AI for Business Leaders',
  true
),
(
  'Maria Santos',
  'Growth Dynamics',
  'Outstanding facilitators and incredibly well-structured content. The ROI on this training was evident within weeks of completing the program. Highly recommend to any serious business leader.',
  5,
  'Leadership Excellence Program',
  true
),
(
  'Alex Thompson',
  'DataFlow Industries',
  'The Strategic Decision Making course gave me frameworks I never knew I needed. Our team''s decision quality has improved dramatically, and we''re seeing better outcomes across all our initiatives.',
  5,
  'Strategic Decision Making',
  true
),
(
  'Lisa Chen',
  'NextGen Software',
  'This digital transformation masterclass was exactly what our company needed. Dr. Rodriguez provided a clear roadmap and practical tools that we implemented immediately. Outstanding value.',
  5,
  'Digital Transformation Masterclass',
  true
),
(
  'Michael Johnson',
  'SalesForce Pro',
  'James Thompson''s sales training revolutionized our approach. Our conversion rates increased by 40% within three months of completing the program. The investment paid for itself many times over.',
  5,
  'Advanced Sales Strategy',
  false
),
(
  'Sarah Wilson',
  'CustomerFirst Inc',
  'The customer success program helped us reduce churn by 60% and increase expansion revenue significantly. Sarah Kim''s expertise and practical approach made all the difference.',
  5,
  'Customer Success Excellence',
  false
),
(
  'Robert Martinez',
  'Innovation Labs',
  'Dr. Foster''s innovation leadership program transformed our company culture. We''ve launched three breakthrough products since completing the training. Exceptional content and delivery.',
  5,
  'Innovation Leadership',
  false
),
(
  'Emma Taylor',
  'StartupSuccess',
  'As a non-financial founder, this course was a game-changer. I now understand our financials deeply and make much better strategic decisions. Robert Chen made complex concepts simple.',
  4,
  'Financial Strategy for Non-Financial Managers',
  false
);

-- Success message
SELECT 'Training content populated successfully! 🎉' as status;