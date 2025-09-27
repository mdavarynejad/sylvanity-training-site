-- Sample Training Modules Data
-- Run this after the main schema to populate training modules for existing trainings

-- First, let's add some modules for the AI Fundamentals training
-- (assuming there's a training with title 'AI Fundamentals for Business')

-- Get the training ID (you'll need to replace this with actual training IDs from your database)
DO $$
DECLARE
    ai_fundamentals_id UUID;
    machine_learning_id UUID;
    python_training_id UUID;
BEGIN
    -- Try to find existing trainings by title
    SELECT id INTO ai_fundamentals_id FROM public.trainings WHERE title ILIKE '%AI%' OR title ILIKE '%Artificial Intelligence%' LIMIT 1;
    SELECT id INTO machine_learning_id FROM public.trainings WHERE title ILIKE '%Machine Learning%' LIMIT 1;
    SELECT id INTO python_training_id FROM public.trainings WHERE title ILIKE '%Python%' LIMIT 1;

    -- If no specific training found, get the first training
    IF ai_fundamentals_id IS NULL THEN
        SELECT id INTO ai_fundamentals_id FROM public.trainings LIMIT 1;
    END IF;

    -- Only proceed if we have at least one training
    IF ai_fundamentals_id IS NOT NULL THEN

        -- AI Fundamentals Modules
        INSERT INTO public.training_modules (training_id, title, description, content, duration_minutes, order_index, is_mandatory) VALUES
        (ai_fundamentals_id, 'Introduction to AI', 'Overview of Artificial Intelligence and its applications in business',
         '<h2>Welcome to AI Fundamentals</h2>
         <p>Artificial Intelligence (AI) is transforming the way businesses operate. In this module, you will learn:</p>
         <ul>
         <li>What AI is and how it works</li>
         <li>Key AI technologies and their applications</li>
         <li>How AI can benefit your business</li>
         <li>Common AI use cases across industries</li>
         </ul>
         <h3>Key Takeaways</h3>
         <p>By the end of this module, you will understand the fundamental concepts of AI and how they apply to modern business environments.</p>',
         30, 1, true),

        (ai_fundamentals_id, 'Machine Learning Basics', 'Understanding the core concepts of machine learning and its business applications',
         '<h2>Machine Learning Fundamentals</h2>
         <p>Machine Learning is a subset of AI that enables computers to learn without being explicitly programmed.</p>
         <h3>Types of Machine Learning</h3>
         <ul>
         <li><strong>Supervised Learning:</strong> Learning with labeled data</li>
         <li><strong>Unsupervised Learning:</strong> Finding patterns in unlabeled data</li>
         <li><strong>Reinforcement Learning:</strong> Learning through interaction and feedback</li>
         </ul>
         <h3>Business Applications</h3>
         <p>Machine learning is used in customer segmentation, fraud detection, recommendation systems, and predictive analytics.</p>',
         45, 2, true),

        (ai_fundamentals_id, 'Data and AI Strategy', 'How to develop a data-driven AI strategy for your organization',
         '<h2>Building Your AI Strategy</h2>
         <p>A successful AI implementation requires a clear strategy and high-quality data.</p>
         <h3>Key Components</h3>
         <ul>
         <li>Data quality and governance</li>
         <li>Identifying AI use cases</li>
         <li>Building AI capabilities</li>
         <li>Change management and adoption</li>
         </ul>
         <h3>Best Practices</h3>
         <p>Start small, focus on business value, ensure data quality, and invest in talent development.</p>',
         40, 3, true),

        (ai_fundamentals_id, 'AI Ethics and Governance', 'Understanding the ethical considerations and governance frameworks for AI',
         '<h2>Responsible AI</h2>
         <p>As AI becomes more prevalent, it is crucial to implement ethical guidelines and governance frameworks.</p>
         <h3>Key Ethical Considerations</h3>
         <ul>
         <li>Bias and fairness in AI systems</li>
         <li>Transparency and explainability</li>
         <li>Privacy and data protection</li>
         <li>Accountability and responsibility</li>
         </ul>
         <h3>Governance Framework</h3>
         <p>Establish clear policies, regular audits, and continuous monitoring of AI systems.</p>',
         35, 4, true),

        (ai_fundamentals_id, 'AI Implementation and Future Trends', 'Planning AI implementation and understanding future developments',
         '<h2>Implementing AI in Your Organization</h2>
         <p>Learn how to successfully implement AI solutions and prepare for future developments.</p>
         <h3>Implementation Steps</h3>
         <ol>
         <li>Define clear objectives and success metrics</li>
         <li>Assess current capabilities and gaps</li>
         <li>Develop a phased implementation plan</li>
         <li>Build or acquire necessary skills</li>
         <li>Monitor and optimize performance</li>
         </ol>
         <h3>Future Trends</h3>
         <p>Stay informed about emerging technologies like GPT models, computer vision advances, and automated machine learning.</p>',
         50, 5, true);

        RAISE NOTICE 'Successfully created modules for AI Fundamentals training (ID: %)', ai_fundamentals_id;
    END IF;

    -- Add modules for Machine Learning training if it exists
    IF machine_learning_id IS NOT NULL AND machine_learning_id != ai_fundamentals_id THEN
        INSERT INTO public.training_modules (training_id, title, description, content, duration_minutes, order_index, is_mandatory) VALUES
        (machine_learning_id, 'ML Foundations', 'Mathematical foundations and core concepts of machine learning',
         '<h2>Mathematical Foundations of ML</h2>
         <p>Understanding the mathematical concepts that underpin machine learning algorithms.</p>
         <h3>Core Concepts</h3>
         <ul>
         <li>Linear algebra and statistics</li>
         <li>Probability and Bayes theorem</li>
         <li>Optimization and gradient descent</li>
         <li>Model evaluation metrics</li>
         </ul>',
         60, 1, true),

        (machine_learning_id, 'Supervised Learning Algorithms', 'Deep dive into supervised learning techniques and algorithms',
         '<h2>Supervised Learning Deep Dive</h2>
         <p>Comprehensive coverage of supervised learning algorithms and their applications.</p>
         <h3>Key Algorithms</h3>
         <ul>
         <li>Linear and logistic regression</li>
         <li>Decision trees and random forests</li>
         <li>Support vector machines</li>
         <li>Neural networks</li>
         </ul>',
         75, 2, true),

        (machine_learning_id, 'Model Deployment and MLOps', 'Best practices for deploying and maintaining ML models in production',
         '<h2>MLOps and Model Deployment</h2>
         <p>Learn how to deploy, monitor, and maintain machine learning models in production environments.</p>
         <h3>Key Topics</h3>
         <ul>
         <li>Model versioning and testing</li>
         <li>Continuous integration/deployment</li>
         <li>Model monitoring and drift detection</li>
         <li>Performance optimization</li>
         </ul>',
         90, 3, true);

        RAISE NOTICE 'Successfully created modules for Machine Learning training (ID: %)', machine_learning_id;
    END IF;

    -- Add modules for Python training if it exists
    IF python_training_id IS NOT NULL AND python_training_id != ai_fundamentals_id AND python_training_id != machine_learning_id THEN
        INSERT INTO public.training_modules (training_id, title, description, content, duration_minutes, order_index, is_mandatory) VALUES
        (python_training_id, 'Python Basics', 'Introduction to Python programming language',
         '<h2>Getting Started with Python</h2>
         <p>Learn the fundamentals of Python programming.</p>
         <h3>Topics Covered</h3>
         <ul>
         <li>Python syntax and data types</li>
         <li>Variables and operators</li>
         <li>Control structures (if, loops)</li>
         <li>Functions and modules</li>
         </ul>',
         45, 1, true),

        (python_training_id, 'Data Structures and Libraries', 'Working with Python data structures and popular libraries',
         '<h2>Python Data Structures</h2>
         <p>Master Python data structures and essential libraries for data science.</p>
         <h3>Key Components</h3>
         <ul>
         <li>Lists, tuples, dictionaries, sets</li>
         <li>NumPy for numerical computing</li>
         <li>Pandas for data manipulation</li>
         <li>Matplotlib for data visualization</li>
         </ul>',
         60, 2, true);

        RAISE NOTICE 'Successfully created modules for Python training (ID: %)', python_training_id;
    END IF;

END $$;

-- Success message
SELECT 'Sample training modules created successfully! 🎓' as status,
       'Modules have been added to existing trainings in your database' as details,
       'You can now test the progress tracking and certificate generation features' as next_steps;