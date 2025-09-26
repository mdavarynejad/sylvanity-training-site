# Sylvanity Training Site - MVP Development Roadmap

## 🎯 Overview
This document outlines a phased MVP approach with 5 incremental stages, each building upon the previous one. Every phase delivers a working, testable application that can be run locally.

## 📈 **CURRENT STATUS: Phase 2 COMPLETED + Enhanced Features**
✅ **Phases 0, 1, and 2 are COMPLETE**
✅ **Enhanced features implemented:**
- Hero images for training pages (.webp format)
- PDF attachments with download links
- Multiple start dates per training
- Testimonials system with star ratings on homepage
- Enhanced instructor information
- Updated Supabase schema supporting all new features

**Running locally on:** http://localhost:3001

---

## 🚀 Phase 0: Project Foundation (Day 1)
**Goal:** Get a working Next.js site running locally with basic structure

### Steps:
1. **Initialize Next.js project**
   ```bash
   npx create-next-app@latest . --typescript --tailwind --app --src-dir=false --import-alias "@/*"
   ```

2. **Install core dependencies**
   ```bash
   npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
   npm install @stripe/stripe-js stripe
   npm install prisma @prisma/client
   npm install zod react-hook-form @hookform/resolvers
   npm install lucide-react
   npm install -D @types/node
   ```

3. **Install shadcn/ui**
   ```bash
   npx shadcn-ui@latest init
   ```
   Choose: TypeScript, Tailwind CSS, app structure

4. **Create basic folder structure**
   ```bash
   mkdir -p app/{api,components,lib}
   mkdir -p components/{ui,forms,layouts}
   mkdir -p lib/{supabase,utils}
   mkdir -p types
   ```

5. **Create `.env.local`**
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   # Add Supabase keys later
   ```

### ✅ Test Point:
```bash
npm run dev
```
- Visit http://localhost:3000
- Should see Next.js welcome page

### Deliverable:
- Working Next.js app with TypeScript and Tailwind

---

## 📋 Phase 1: Static Training Showcase (Days 2-3) ✅ **COMPLETED**
**Goal:** Display training programs with mock data (no database yet)

### Steps:

1. **Create mock data file** (`lib/mock-data.ts`)
   ```typescript
   export const mockTrainings = [
     {
       id: '1',
       title: 'Leadership Excellence',
       description: 'Develop your leadership skills',
       price: 1299,
       duration: '3 days',
       startDate: '2024-02-01',
       maxParticipants: 20,
       currentParticipants: 12
     },
     // Add 3-4 more trainings
   ];
   ```

2. **Create training components**
   - `components/training-card.tsx` - Display individual training
   - `components/training-list.tsx` - Grid of training cards

3. **Build pages**
   - `app/page.tsx` - Homepage with featured trainings
   - `app/trainings/page.tsx` - All trainings listing
   - `app/trainings/[id]/page.tsx` - Training detail page

4. **Add navigation**
   - `components/layouts/navbar.tsx` - Simple navigation
   - `components/layouts/footer.tsx` - Basic footer

5. **Install UI components**
   ```bash
   npx shadcn-ui@latest add card button badge
   ```

### ✅ Test Points:
- Homepage displays featured trainings
- Training list shows all mock trainings
- Click training card → see details page
- Navigation works between pages

### Deliverable:
- Browseable training catalog with mock data
- Responsive design
- Clean UI with shadcn components

---

## 🔐 Phase 2: Supabase Integration & Auth (Days 4-6) ✅ **COMPLETED**
**Goal:** Add user authentication and real training data from Supabase

### Steps:

1. **Set up Supabase project**
   ```bash
   npm install @supabase/cli -D
   npx supabase init
   npx supabase login
   npx supabase link --project-ref your-project-ref
   ```

2. **Create database schema** (`supabase/migrations/001_initial_schema.sql`)
   ```sql
   -- Enable UUID extension
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

   -- Trainings table
   CREATE TABLE trainings (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     description TEXT,
     price DECIMAL(10,2),
     duration VARCHAR(100),
     start_date DATE,
     max_participants INTEGER,
     current_participants INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
   );

   -- User profiles (extends Supabase auth.users)
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     full_name VARCHAR(255),
     company VARCHAR(255),
     phone VARCHAR(50),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
   );

   -- Enable Row Level Security
   ALTER TABLE trainings ENABLE ROW LEVEL SECURITY;
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

   -- Policies
   CREATE POLICY "Trainings are viewable by everyone"
     ON trainings FOR SELECT
     USING (true);

   CREATE POLICY "Users can view own profile"
     ON profiles FOR SELECT
     USING (auth.uid() = id);

   CREATE POLICY "Users can update own profile"
     ON profiles FOR UPDATE
     USING (auth.uid() = id);
   ```

3. **Run migration**
   ```bash
   npx supabase db push
   ```

4. **Seed sample data** (`supabase/seed.sql`)
   ```sql
   INSERT INTO trainings (title, description, price, duration, start_date, max_participants)
   VALUES
     ('Leadership Excellence', 'Develop leadership skills', 1299, '3 days', '2024-02-01', 20),
     ('Agile Project Management', 'Master agile methodologies', 999, '2 days', '2024-02-15', 25),
     ('Digital Marketing Mastery', 'Complete digital marketing', 1499, '4 days', '2024-03-01', 30);
   ```

5. **Update environment variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

6. **Create Supabase client** (`lib/supabase/client.ts`)
   ```typescript
   import { createBrowserClient } from '@supabase/ssr'

   export function createClient() {
     return createBrowserClient(
       process.env.NEXT_PUBLIC_SUPABASE_URL!,
       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
     )
   }
   ```

7. **Implement auth pages**
   - `app/(auth)/login/page.tsx` - Login form
   - `app/(auth)/signup/page.tsx` - Registration form
   - `app/(auth)/logout/route.ts` - Logout handler

8. **Add auth components**
   - `components/auth/login-form.tsx`
   - `components/auth/signup-form.tsx`
   - `components/auth/user-menu.tsx`

9. **Replace mock data with Supabase queries**
   - Update training pages to fetch from database
   - Add loading states and error handling

### ✅ Test Points:
- Can create new account
- Can login/logout
- Training data loads from Supabase
- Profile page shows user info
- Protected routes redirect to login

### Deliverable:
- Working authentication system
- Real database with training data
- User profiles
- Protected routes

---

## 🌟 **ENHANCED FEATURES (Completed)**
**Goal:** Advanced training platform features beyond basic MVP

### ✅ **Implemented Features:**

1. **Hero Images System**
   - Full-width hero images on training detail pages (.webp format)
   - Responsive design (h-64 mobile, h-80 desktop)
   - Image stored in `public/images/trainings/`
   - Support for all 6 training courses

2. **PDF Attachments**
   - Downloadable course materials (syllabi, toolkits, blueprints)
   - Red download buttons with download icons
   - Files stored in `public/attachments/`
   - Automatic display in "Course Materials" section

3. **Multiple Start Dates**
   - Array of start dates per training instead of single date
   - "Next Start:" and "More Dates: +X more" display
   - Updated database schema and components
   - Better flexibility for course scheduling

4. **Testimonials System**
   - Featured testimonials on homepage with star ratings
   - Participant names, companies, and detailed feedback
   - Database table for testimonials with rating constraints
   - Visual star ratings using renderStars() function

5. **Enhanced Training Data**
   - Real instructor names (Dr. Sarah Mitchell, Prof. Michael Chen, etc.)
   - Comprehensive course descriptions and tags
   - Professional course categories and levels
   - Prerequisites for advanced courses

6. **Updated Database Schema**
   - Enhanced trainings table with new fields
   - Testimonials table with ratings and featured flags
   - Support for start_dates arrays
   - Hero image and PDF attachment URLs

### 📁 **Files Modified/Created:**
- `lib/mock-data.ts` - Enhanced with new interfaces and data
- `pages/trainings/[id].tsx` - Added hero images and PDF downloads
- `pages/index.tsx` - Added testimonials section
- `components/training-card.tsx` - Updated for multiple dates
- `supabase/schema-updated.sql` - Enhanced database schema
- `public/images/trainings/` - Hero image assets
- `public/attachments/` - PDF course materials

### 🎯 **Current Functionality:**
- ✅ Homepage with testimonials and star ratings
- ✅ Training listing with enhanced information
- ✅ Training detail pages with hero images
- ✅ PDF download functionality
- ✅ Multiple start dates display
- ✅ Professional instructor information
- ✅ Graceful fallbacks for missing Supabase config

---

## 💳 Phase 3: Lead Capture & Newsletter (Days 7-8)
**Goal:** Capture leads with forms and basic email integration

### Steps:

1. **Extend database schema**
   ```sql
   -- Newsletter subscribers
   CREATE TABLE newsletter_subscribers (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     name VARCHAR(255),
     subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
     unsubscribed_at TIMESTAMP WITH TIME ZONE
   );

   -- Lead captures with promo codes
   CREATE TABLE leads (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     email VARCHAR(255) NOT NULL,
     name VARCHAR(255),
     company VARCHAR(255),
     phone VARCHAR(50),
     interested_training_id UUID REFERENCES trainings(id),
     promo_code VARCHAR(50),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
   );

   -- Promo codes
   CREATE TABLE promo_codes (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     code VARCHAR(50) UNIQUE NOT NULL,
     discount_percent INTEGER,
     discount_amount DECIMAL(10,2),
     valid_from DATE,
     valid_until DATE,
     max_uses INTEGER,
     current_uses INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
   );
   ```

2. **Create lead capture form**
   - `components/forms/lead-capture-form.tsx`
   - Modal that appears on training detail pages
   - Auto-generates promo code on submission

3. **Newsletter subscription**
   - `components/forms/newsletter-form.tsx`
   - Add to footer
   - Simple email capture

4. **API routes**
   - `app/api/leads/route.ts` - Handle lead submission
   - `app/api/newsletter/route.ts` - Handle newsletter signup
   - `app/api/promo/generate/route.ts` - Generate unique promo codes

5. **Basic email setup (using console.log for now)**
   ```typescript
   // lib/email/send.ts
   export async function sendEmail(to: string, subject: string, html: string) {
     // For MVP, just log to console
     console.log('📧 Email would be sent:');
     console.log('To:', to);
     console.log('Subject:', subject);
     console.log('Content:', html);

     // TODO: Integrate Resend in Phase 4
     return { success: true };
   }
   ```

6. **Add shadcn components**
   ```bash
   npx shadcn-ui@latest add dialog form input label textarea select
   ```

### ✅ Test Points:
- Lead form captures information
- Promo code is generated and displayed
- Newsletter signup works
- Data is saved to Supabase
- Console shows email logs

### Deliverable:
- Lead capture system
- Newsletter subscription
- Promo code generation
- Database storage of leads

---

## 🛒 Phase 4: Stripe Checkout (Days 9-11)
**Goal:** Enable actual payments for training registration

### Steps:

1. **Set up Stripe**
   ```bash
   npm install stripe @stripe/stripe-js
   ```

2. **Update environment variables**
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

3. **Extend database**
   ```sql
   -- Training registrations
   CREATE TABLE registrations (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     training_id UUID REFERENCES trainings(id),
     status VARCHAR(50) DEFAULT 'pending',
     amount_paid DECIMAL(10,2),
     promo_code_used VARCHAR(50),
     stripe_session_id VARCHAR(255),
     stripe_payment_intent VARCHAR(255),
     registered_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
     UNIQUE(user_id, training_id)
   );
   ```

4. **Create Stripe utilities** (`lib/stripe/`)
   - `client.ts` - Browser Stripe instance
   - `server.ts` - Server Stripe instance
   - `checkout.ts` - Create checkout sessions

5. **Implement checkout flow**
   - `app/api/checkout/create-session/route.ts` - Create Stripe session
   - `app/api/stripe/webhook/route.ts` - Handle Stripe webhooks
   - `app/checkout/success/page.tsx` - Success page
   - `app/checkout/cancel/page.tsx` - Cancellation page

6. **Add registration button**
   - Update training detail page with "Register Now" button
   - Apply promo codes if user has one
   - Redirect to Stripe Checkout

7. **User dashboard**
   - `app/(protected)/dashboard/page.tsx` - Show registered trainings
   - `app/(protected)/dashboard/registrations/page.tsx` - Registration history

8. **Test Stripe locally**
   ```bash
   # Install Stripe CLI
   stripe login
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

### ✅ Test Points:
- Can click "Register" on training
- Redirects to Stripe Checkout
- Test payment with card `4242 4242 4242 4242`
- Success page shows confirmation
- Registration appears in dashboard
- Webhook updates database

### Deliverable:
- Complete payment flow
- Training registration system
- User dashboard with registrations
- Webhook handling

---

## 👨‍💼 Phase 5: Basic Admin Panel (Days 12-14)
**Goal:** Allow admins to manage trainings and view registrations

### Steps:

1. **Add admin role to profiles**
   ```sql
   ALTER TABLE profiles ADD COLUMN role VARCHAR(50) DEFAULT 'user';

   -- Make specific user admin (run after creating account)
   UPDATE profiles SET role = 'admin' WHERE email = 'admin@sylvanity.com';
   ```

2. **Create admin middleware** (`lib/auth/admin.ts`)
   ```typescript
   export async function isAdmin(userId: string) {
     const { data } = await supabase
       .from('profiles')
       .select('role')
       .eq('id', userId)
       .single();

     return data?.role === 'admin';
   }
   ```

3. **Admin pages**
   - `app/admin/page.tsx` - Dashboard overview
   - `app/admin/trainings/page.tsx` - List all trainings
   - `app/admin/trainings/new/page.tsx` - Create training
   - `app/admin/trainings/[id]/edit/page.tsx` - Edit training
   - `app/admin/registrations/page.tsx` - View all registrations
   - `app/admin/users/page.tsx` - User management

4. **Admin components**
   - `components/admin/training-form.tsx` - Create/edit trainings
   - `components/admin/stats-card.tsx` - Show metrics
   - `components/admin/registrations-table.tsx` - List registrations

5. **Add data tables**
   ```bash
   npx shadcn-ui@latest add table
   ```

6. **Implement CRUD operations**
   - `app/api/admin/trainings/route.ts` - Create/list trainings
   - `app/api/admin/trainings/[id]/route.ts` - Update/delete training
   - `app/api/admin/stats/route.ts` - Dashboard statistics

### ✅ Test Points:
- Admin can login and access admin panel
- Can create new training
- Can edit existing training
- Can view all registrations
- Can see dashboard statistics
- Non-admins cannot access admin routes

### Deliverable:
- Functional admin panel
- Training management
- Registration overview
- Basic analytics

---

## 🎯 **RECOMMENDED NEXT STEPS**

Based on current progress, here are the recommended next priorities:

### 🚀 **Option A: Continue with Phase 3 (Lead Capture)**
**Pros:** Follows original roadmap, enables lead generation
**Priority:** High for business value
- Implement lead capture forms on training pages
- Add newsletter subscription to footer
- Generate and manage promo codes
- Basic email integration (console.log for MVP)

### 💳 **Option B: Jump to Phase 4 (Payments)**
**Pros:** Enables revenue generation immediately
**Priority:** High for monetization
- Set up Stripe integration
- Add "Register Now" buttons to training pages
- Implement checkout flow
- User registration and booking system

### 🔧 **Option C: Technical Improvements**
**Pros:** Better foundation, production readiness
**Priority:** Medium for stability
- Connect actual Supabase database (currently using fallbacks)
- Add proper environment configuration
- Implement proper error handling
- Add loading states and better UX

### 📊 **Option D: Content Management**
**Pros:** Self-service content updates
**Priority:** Medium for content management
- Simple admin panel for managing trainings
- Ability to upload new hero images
- Manage testimonials through UI
- Basic content CRUD operations

### 🎨 **Recommendation: Option B (Payments) + Option C (Technical)**
1. **Week 1:** Set up Stripe integration and basic checkout
2. **Week 2:** Connect real Supabase database and improve technical foundation
3. **Week 3:** Add lead capture and newsletter functionality

This approach prioritizes revenue generation while strengthening the technical foundation.

---

## 🎬 Quick Start Guide

### Day 1 - Get Started
```bash
# Clone and setup
git clone [repo]
cd sylvanity-training-site

# Run Phase 0
npx create-next-app@latest . --typescript --tailwind --app --src-dir=false
npm install [dependencies from Phase 0]
npm run dev

# ✅ Checkpoint: See Next.js welcome page
```

### Day 2-3 - Build UI
```bash
# Follow Phase 1 steps
# Create components and pages with mock data

# ✅ Checkpoint: Browse training catalog
```

### Day 4-6 - Add Database
```bash
# Setup Supabase (Phase 2)
npx supabase init
npx supabase db push

# ✅ Checkpoint: Login and see real data
```

### Day 7-8 - Capture Leads
```bash
# Add forms (Phase 3)

# ✅ Checkpoint: Submit lead form, get promo code
```

### Day 9-11 - Enable Payments
```bash
# Setup Stripe (Phase 4)
stripe listen --forward-to localhost:3000/api/stripe/webhook

# ✅ Checkpoint: Complete test payment
```

### Day 12-14 - Admin Control
```bash
# Build admin panel (Phase 5)

# ✅ Checkpoint: Admin can manage trainings
```

---

## 📊 Testing Checklist

### After Each Phase:
- [ ] `npm run dev` works without errors
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Data persists in Supabase
- [ ] Mobile responsive design works

### Final MVP Tests:
- [ ] Complete user journey: Browse → Register → Login → Enroll → Pay
- [ ] Admin journey: Login → Create training → View registrations
- [ ] Lead capture: Fill form → Receive promo code
- [ ] Newsletter signup works
- [ ] All API routes return correct data
- [ ] Error states handled gracefully

---

## 🚢 Post-MVP Considerations

### Production Readiness:
1. Add Resend for real emails
2. Implement proper error tracking (Sentry)
3. Add rate limiting
4. Implement caching strategy
5. Set up monitoring and analytics
6. Add comprehensive testing suite
7. Security audit and penetration testing

### Feature Enhancements:
1. Email templates and automation
2. Advanced promo code rules
3. Waitlist management
4. Certificate generation
5. Calendar integration
6. Multi-language support (if needed)
7. Advanced analytics dashboard

---

## 💡 Tips for Rapid Development

1. **Use shadcn/ui components** - Don't build from scratch
2. **Start with console.log for emails** - Add real email later
3. **Use Supabase Auth UI** - Don't build custom auth forms initially
4. **Test with Stripe test mode** - Use test cards
5. **Keep admin panel simple** - Just CRUD operations initially
6. **Use TypeScript strictly** - Prevents runtime errors
7. **Commit after each phase** - Easy rollback if needed

---

## 🆘 Common Issues & Solutions

### Supabase Connection Issues
```bash
# Reset local database
npx supabase db reset

# Check connection
npx supabase status
```

### Stripe Webhook Not Working
```bash
# Make sure to use the correct webhook secret
stripe listen --print-secret

# Update .env.local with the secret
```

### Type Errors
```bash
# Generate types from Supabase
npx supabase gen types typescript --local > types/supabase.ts
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```