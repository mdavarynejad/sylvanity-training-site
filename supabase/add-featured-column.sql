-- Add featured column to trainings table and set all trainings as featured
-- Run this script in your Supabase SQL Editor

-- Add the featured column to the trainings table
ALTER TABLE public.trainings
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Set all existing trainings as featured
UPDATE public.trainings
SET featured = true
WHERE featured IS NULL OR featured = false;

-- Verify the update
SELECT
    title,
    category,
    featured,
    created_at
FROM public.trainings
ORDER BY created_at;

-- Show counts
SELECT
    COUNT(*) as total_trainings,
    COUNT(*) FILTER (WHERE featured = true) as featured_trainings,
    COUNT(*) FILTER (WHERE featured = false) as non_featured_trainings
FROM public.trainings;

SELECT 'Featured column added and all trainings set as featured!' as status;