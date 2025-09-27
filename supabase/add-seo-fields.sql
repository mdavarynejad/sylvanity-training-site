-- =====================================
-- ADD SEO FIELDS TO TRAININGS TABLE
-- =====================================

-- Add new SEO-optimized content columns to the trainings table
ALTER TABLE public.trainings
ADD COLUMN IF NOT EXISTS format VARCHAR(100) DEFAULT 'Interactive Workshop',
ADD COLUMN IF NOT EXISTS seo_why_choose TEXT,
ADD COLUMN IF NOT EXISTS seo_learning_outcomes TEXT,
ADD COLUMN IF NOT EXISTS seo_target_audience TEXT,
ADD COLUMN IF NOT EXISTS learning_outcomes JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS meta_title VARCHAR(160),
ADD COLUMN IF NOT EXISTS meta_description VARCHAR(320),
ADD COLUMN IF NOT EXISTS meta_keywords TEXT;

-- Add comments to explain the purpose of each field
COMMENT ON COLUMN public.trainings.format IS 'Training format (e.g., Interactive Workshop, Virtual Classroom, Self-Paced)';
COMMENT ON COLUMN public.trainings.seo_why_choose IS 'SEO-optimized content explaining why to choose this training';
COMMENT ON COLUMN public.trainings.seo_learning_outcomes IS 'SEO-optimized introduction to learning outcomes';
COMMENT ON COLUMN public.trainings.seo_target_audience IS 'SEO-optimized description of target audience';
COMMENT ON COLUMN public.trainings.learning_outcomes IS 'Array of specific learning outcomes as JSONB';
COMMENT ON COLUMN public.trainings.faqs IS 'Array of FAQ objects with question and answer fields as JSONB';
COMMENT ON COLUMN public.trainings.meta_title IS 'SEO meta title (max 160 characters)';
COMMENT ON COLUMN public.trainings.meta_description IS 'SEO meta description (max 320 characters)';
COMMENT ON COLUMN public.trainings.meta_keywords IS 'SEO keywords separated by commas';

-- Example of updating existing trainings with SEO content
-- This can be customized for each training program
UPDATE public.trainings
SET
  format = 'Interactive Workshop',
  seo_why_choose = 'Transform your career with our comprehensive training program designed for professionals seeking to master industry-leading skills in today''s competitive market.',
  seo_learning_outcomes = 'Upon completing this training, participants will gain practical expertise and industry-recognized skills that drive career advancement.',
  seo_target_audience = 'This training is ideal for professionals, managers, and executives looking to enhance their skills and advance their careers in a dynamic business environment.',
  learning_outcomes = jsonb_build_array(
    'Master fundamental and advanced concepts',
    'Apply practical skills through hands-on exercises',
    'Develop strategic thinking capabilities',
    'Build confidence in real-world implementation',
    'Network with industry professionals'
  ),
  faqs = jsonb_build_array(
    jsonb_build_object(
      'question', 'What prerequisites are needed for this training?',
      'answer', 'The prerequisites vary by course level. Beginners require no prior experience, while advanced courses assume foundational knowledge.'
    ),
    jsonb_build_object(
      'question', 'What certification will I receive?',
      'answer', 'Upon successful completion, you''ll receive an official Sylvanity Training certificate recognized by industry leaders.'
    ),
    jsonb_build_object(
      'question', 'Is this training available online?',
      'answer', 'We offer flexible delivery options including in-person, virtual, and hybrid formats to suit your needs.'
    )
  ),
  meta_title = SUBSTRING(title || ' Training | Professional Development | Sylvanity', 1, 160),
  meta_description = SUBSTRING('Join our ' || title || ' training program. Expert-led ' || category || ' course for ' || level || ' level professionals. ' || duration || ' intensive program with certification.', 1, 320),
  meta_keywords = LOWER(category || ', ' || title || ' training, professional development, ' || level || ' course, business training, Sylvanity')
WHERE meta_title IS NULL;

-- Create an index on meta_keywords for better search performance
CREATE INDEX IF NOT EXISTS idx_trainings_meta_keywords ON public.trainings USING GIN (to_tsvector('english', meta_keywords));

-- Example: Add specific SEO content for an AI training (customize as needed)
UPDATE public.trainings
SET
  seo_why_choose = 'Our AI and Machine Learning training delivers cutting-edge knowledge essential for digital transformation. Learn from industry experts who bring real-world experience in implementing AI solutions across various sectors. This comprehensive program combines theoretical foundations with practical applications, ensuring you gain immediately applicable skills.',
  seo_target_audience = 'Perfect for data scientists, software engineers, business analysts, and innovation leaders who want to harness the power of AI. Whether you''re transitioning into AI or advancing your existing expertise, this program provides the tools and insights needed to lead AI initiatives.',
  learning_outcomes = jsonb_build_array(
    'Understand core AI and machine learning algorithms',
    'Implement neural networks and deep learning models',
    'Apply natural language processing techniques',
    'Develop computer vision applications',
    'Design ethical AI solutions',
    'Deploy ML models in production environments'
  ),
  meta_title = 'AI & Machine Learning Training | Expert-Led Course | Sylvanity',
  meta_description = 'Master AI and Machine Learning with our comprehensive training program. Learn neural networks, NLP, computer vision, and ethical AI from industry experts. Get certified today!'
WHERE title ILIKE '%AI%' OR title ILIKE '%Artificial Intelligence%' OR title ILIKE '%Machine Learning%';

-- Example: Add specific SEO content for Leadership training
UPDATE public.trainings
SET
  seo_why_choose = 'Elevate your leadership capabilities with our transformative leadership development program. Designed by executive coaches and industry leaders, this training combines proven methodologies with contemporary leadership challenges. Develop the emotional intelligence, strategic thinking, and communication skills needed to inspire teams and drive organizational success.',
  seo_target_audience = 'Ideal for emerging leaders, mid-level managers, and senior executives seeking to enhance their leadership effectiveness. Perfect for professionals transitioning into leadership roles or experienced leaders looking to refine their approach in today''s complex business landscape.',
  learning_outcomes = jsonb_build_array(
    'Master adaptive leadership strategies',
    'Develop emotional intelligence and self-awareness',
    'Build high-performing, engaged teams',
    'Navigate organizational change effectively',
    'Enhance strategic decision-making skills',
    'Create inclusive and innovative workplace cultures'
  ),
  meta_title = 'Leadership Development Training | Executive Coaching | Sylvanity',
  meta_description = 'Transform your leadership style with our comprehensive training. Learn adaptive leadership, team building, and strategic decision-making from executive coaches. Enroll now!'
WHERE category = 'Leadership & Management';

-- Example: Add specific SEO content for Data Analytics training
UPDATE public.trainings
SET
  seo_why_choose = 'Master data-driven decision making with our comprehensive Data Analytics training. This hands-on program teaches you to transform raw data into actionable insights using industry-standard tools and techniques. Learn from data science experts who bring real-world experience from leading organizations.',
  seo_target_audience = 'Designed for business analysts, data enthusiasts, marketing professionals, and anyone looking to leverage data for strategic advantage. Whether you''re starting your analytics journey or advancing existing skills, this program provides practical expertise in data visualization, statistical analysis, and predictive modeling.',
  learning_outcomes = jsonb_build_array(
    'Master data cleaning and preparation techniques',
    'Create compelling data visualizations',
    'Perform statistical analysis and hypothesis testing',
    'Build predictive models using machine learning',
    'Work with SQL and Python for data analysis',
    'Present data insights to stakeholders effectively'
  ),
  meta_title = 'Data Analytics Training | Business Intelligence Course | Sylvanity',
  meta_description = 'Learn data analytics from industry experts. Master visualization, statistical analysis, and predictive modeling. Hands-on training with real-world projects. Get certified!'
WHERE category = 'Data & Analytics';

-- Function to generate meta descriptions automatically
CREATE OR REPLACE FUNCTION generate_meta_description(
  p_title TEXT,
  p_category TEXT,
  p_level TEXT,
  p_duration TEXT
) RETURNS TEXT AS $$
BEGIN
  RETURN SUBSTRING(
    'Join our ' || p_title || ' training program. Expert-led ' ||
    p_category || ' course for ' || p_level ||
    ' level professionals. ' || p_duration ||
    ' intensive program with certification. Learn practical skills from industry experts at Sylvanity Training.',
    1, 320
  );
END;
$$ LANGUAGE plpgsql;

-- Update any trainings still missing meta descriptions
UPDATE public.trainings
SET meta_description = generate_meta_description(title, category, level, duration)
WHERE meta_description IS NULL OR meta_description = '';

-- Grant necessary permissions
GRANT SELECT ON public.trainings TO anon;
GRANT ALL ON public.trainings TO authenticated;

-- Add RLS policy for the new fields (if not already covered by existing policies)
-- The existing policies should already cover these new fields since they're part of the trainings table

COMMENT ON TABLE public.trainings IS 'Training programs with comprehensive details and SEO-optimized content for better search engine visibility and user engagement';