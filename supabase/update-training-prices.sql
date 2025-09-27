-- Update Training Prices - Per Session Pricing
-- All trainings start from 1,199 EUR, with Agentic AI as the most expensive at 1,569 EUR
-- Run this script in your Supabase SQL Editor

-- Update AI & Prompt Engineering Workshop
UPDATE public.trainings
SET price = 1199.00
WHERE title = 'AI & Prompt Engineering Workshop';

-- Update AI-Powered Business Automation
UPDATE public.trainings
SET price = 1299.00
WHERE title = 'AI-Powered Business Automation';

-- Update Change Management in the AI Era
UPDATE public.trainings
SET price = 1249.00
WHERE title = 'Change Management in the AI Era';

-- Update Agentic AI Workshop (Most Expensive)
UPDATE public.trainings
SET price = 1569.00
WHERE title = 'Agentic AI Workshop';

-- Update Practical Data Analysis for SMEs
UPDATE public.trainings
SET price = 1199.00
WHERE title = 'Practical Data Analysis for SMEs';

-- Verify the updates
SELECT
    title,
    price,
    currency,
    level,
    category
FROM public.trainings
ORDER BY price DESC;

-- Show pricing summary
SELECT
    'Pricing Updated Successfully!' as status,
    MIN(price) as min_price,
    MAX(price) as max_price,
    AVG(price) as avg_price,
    COUNT(*) as total_trainings
FROM public.trainings;