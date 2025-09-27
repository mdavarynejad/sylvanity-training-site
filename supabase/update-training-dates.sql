-- Update Training Start Dates - 2024 Schedule
-- All trainings updated with new start dates: Nov 17, Nov 24, Feb 16, Feb 20, Feb 21
-- Run this script in your Supabase SQL Editor

-- Update AI & Prompt Engineering Workshop
UPDATE public.trainings
SET start_dates = '["2024-11-17", "2024-11-24", "2025-02-16", "2025-02-20"]'::jsonb
WHERE title = 'AI & Prompt Engineering Workshop';

-- Update AI-Powered Business Automation
UPDATE public.trainings
SET start_dates = '["2024-11-17", "2024-11-24", "2025-02-16", "2025-02-21"]'::jsonb
WHERE title = 'AI-Powered Business Automation';

-- Update Change Management in the AI Era
UPDATE public.trainings
SET start_dates = '["2024-11-17", "2025-02-16", "2025-02-20", "2025-02-21"]'::jsonb
WHERE title = 'Change Management in the AI Era';

-- Update Agentic AI Workshop
UPDATE public.trainings
SET start_dates = '["2024-11-24", "2025-02-16", "2025-02-20", "2025-02-21"]'::jsonb
WHERE title = 'Agentic AI Workshop';

-- Update Practical Data Analysis for SMEs
UPDATE public.trainings
SET start_dates = '["2024-11-17", "2024-11-24", "2025-02-16", "2025-02-20"]'::jsonb
WHERE title = 'Practical Data Analysis for SMEs';

-- Verify the updates
SELECT
    title,
    start_dates,
    jsonb_array_length(start_dates) as num_dates
FROM public.trainings
ORDER BY title;

-- Show dates summary
SELECT
    'Training Dates Updated Successfully!' as status,
    COUNT(*) as total_trainings,
    COUNT(CASE WHEN start_dates ? '2024-11-17' THEN 1 END) as nov_17_count,
    COUNT(CASE WHEN start_dates ? '2024-11-24' THEN 1 END) as nov_24_count,
    COUNT(CASE WHEN start_dates ? '2025-02-16' THEN 1 END) as feb_16_count,
    COUNT(CASE WHEN start_dates ? '2025-02-20' THEN 1 END) as feb_20_count,
    COUNT(CASE WHEN start_dates ? '2025-02-21' THEN 1 END) as feb_21_count
FROM public.trainings;