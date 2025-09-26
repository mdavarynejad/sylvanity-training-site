# Sylvanity Training Site

A comprehensive training platform offering professional development programs with seamless registration, payment processing, lead capture, and administrative management.

---

## 🎯 Current Status: **Production Ready** ✅

**Phases 0-7 Implemented:** Complete database-driven training platform with real data persistence.

### ✅ **Implemented Features**

**Public Features:**
- **Database-Driven Training Catalog** — Dynamic course listings from Supabase with hero images, PDF materials, and multiple start dates
- **Real-Time Content Updates** — Homepage and training pages automatically reflect database changes via ISR
- **Stripe Payment System** — Complete checkout flow with success/cancel pages and demo mode fallbacks
- **Lead Capture System** — Contact forms with automatic promo code generation stored in database
- **Newsletter Subscription** — Email capture with validation and real database persistence
- **Dynamic Testimonials** — Customer testimonials loaded from database with automatic featured selection

**Admin Features:**
- **Admin Dashboard** — Complete overview with analytics and quick actions
- **Training Management** — View, create, edit, and delete training programs
- **Lead Tracking** — Comprehensive lead management with CSV export and email integration
- **Newsletter Management** — Subscriber tracking with segmentation and export capabilities
- **Role-Based Access** — Secure admin authentication with activity logging

---

## 🛠 Tech Stack

### Core
- **Next.js 14** — React framework with Pages Router
- **TypeScript** — Type safety and better DX
- **TailwindCSS** — Utility-first styling
- **React** — Component-based UI development

### Backend & Database
- **Supabase** — PostgreSQL database with full data persistence and real-time subscriptions
- **Database-Driven Architecture** — All content dynamically loaded from Supabase tables
- **Stripe** — Payment processing with graceful fallbacks
- **ISR (Incremental Static Regeneration)** — Automatic content updates with optimal performance

### Services (Production Ready)
- **Email Integration** — Console logging for MVP, ready for Resend/SendGrid
- **File Storage** — Static assets with support for hero images and PDF attachments
- **Form Handling** — Lead capture and newsletter subscription with validation

---

## 📁 Project Structure

```
sylvanity-training-site/
├── pages/                    # Next.js Pages Router
│   ├── index.tsx            # Homepage with testimonials
│   ├── trainings/           # Training catalog and detail pages
│   │   ├── index.tsx        # Training list
│   │   └── [id].tsx         # Training details with payment/lead capture
│   ├── auth/                # Authentication pages
│   │   ├── signin.tsx       # Login page
│   │   └── signup.tsx       # Registration page
│   ├── admin/               # Admin panel (role-based access)
│   │   ├── index.tsx        # Admin dashboard
│   │   ├── trainings.tsx    # Training management
│   │   ├── leads.tsx        # Lead tracking
│   │   └── newsletter.tsx   # Newsletter management
│   ├── checkout/            # Stripe checkout flow
│   │   ├── success.tsx      # Payment success
│   │   └── cancel.tsx       # Payment cancelled
│   └── api/                 # API routes
│       ├── checkout/        # Stripe session creation
│       ├── leads/           # Lead submission
│       └── newsletter/      # Newsletter subscription
├── components/
│   ├── forms/               # Form components
│   │   ├── lead-capture-form.tsx
│   │   ├── newsletter-form.tsx
│   │   └── promo-code-modal.tsx
│   ├── layout/              # Layout components
│   │   └── footer.tsx       # Footer with newsletter signup
│   └── training-list.tsx    # Training catalog component
├── lib/
│   ├── supabase/           # Database integration
│   ├── stripe/             # Payment processing
│   ├── admin/              # Admin utilities and auth
│   └── mock-data.ts        # Training data and utilities
├── supabase/               # Database schema files
│   ├── schema-lead-capture.sql
│   ├── schema-admin.sql
│   └── schema-updated.sql
├── public/
│   ├── images/trainings/   # Hero images (.webp format)
│   └── attachments/        # PDF course materials
└── MVP_ROADMAP.md          # Development roadmap and progress
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm

### Quick Start

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd sylvanity-training-site
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

3. **Demo Mode Features**
   - Browse training catalog with hero images and PDF downloads
   - Test lead capture forms (generates promo codes)
   - Try newsletter subscription (validates and logs to console)
   - Experience Stripe payment flow (demo mode with clear indicators)
   - Access admin panel at `/admin` (mock authentication for demo)

### Production Setup

4. **Configure environment variables**
   ```env
   # Supabase (required for production)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # Stripe (required for payments)
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

   # Email Service (optional - defaults to console logging)
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM=noreply@yourcompany.com
   ```

5. **Set up database**
   ```bash
   # Run the migration scripts in your Supabase SQL Editor:
   # 1. supabase/complete-migration.sql (creates all tables, policies, and functions)
   # 2. supabase/populate-content.sql (adds training content and testimonials)
   ```

6. **Content Management**
   - All training content is managed through the Supabase database
   - Testimonials can be added/edited via the database or future admin interface
   - Content updates appear automatically via ISR (5-minute revalidation)
   - Training programs, pricing, and schedules controlled through database

---

## 📊 Admin Features

The platform includes a comprehensive admin panel accessible at `/admin` with the following capabilities:

### Dashboard Overview
- Training statistics and metrics
- Lead generation analytics
- Newsletter subscriber counts
- Quick navigation to management areas

### Training Management
- View all training programs in a professional table format
- Visual indicators for availability (full, almost full, available)
- Training thumbnails and instructor information
- Direct links to public training pages

### Lead Tracking
- Complete lead management with contact information
- Source tracking (training pages vs newsletter)
- Promo code tracking and management
- CSV export for CRM integration
- Direct email contact integration

### Newsletter Management
- Subscriber statistics and status tracking
- Active/unsubscribed filtering
- CSV export for email campaigns
- Subscription source tracking

---

## 🎨 Key Features

### Dual Conversion Strategy
Each training page offers two paths:
1. **"Register Now"** — Direct Stripe payment for immediate enrollment
2. **"Get More Info & Discount"** — Lead capture with promo code generation

### Professional Design
- Hero images for all training programs
- PDF course materials with download functionality
- Testimonials section with star ratings
- Mobile-responsive design throughout

### Graceful Fallbacks
- Demo mode indicators when services aren't configured
- Console logging for email functionality during development
- Mock data system for immediate testing
- Production-ready architecture with easy service integration

---

## 📝 Database Schema

### Core Tables (implemented)
- `trainings` — Training courses with hero images, PDFs, multiple start dates
- `leads` — Lead submissions with promo code generation
- `newsletter_subscribers` — Email subscription management
- `promo_codes` — Discount code system
- `profiles` — User profiles with admin role support
- `admin_activity_log` — Admin action tracking
- `testimonials` — Customer testimonials with ratings

---

## 🚢 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

The application is optimized for Vercel with proper API routes and static optimization.

---

## 🔮 Roadmap Status

### ✅ Completed Phases
- **Phase 0:** Project Foundation
- **Phase 1:** Static Training Showcase
- **Phase 2:** Supabase Integration & Auth
- **Phase 3:** Lead Capture & Newsletter
- **Phase 4:** Stripe Checkout Integration
- **Phase 5:** Admin Panel
- **Phase 6:** Production Database Setup
- **Phase 7:** Database-Driven Content System

### 🎯 Next Phase Options
- **User Dashboard:** Registration history and certificate downloads
- **Enhanced Admin:** Bulk operations and advanced analytics
- **Email Automation:** Drip campaigns and course reminders
- **Mobile App:** React Native companion app

---

## 📚 Documentation

- **Admin Guide:** See `ADMIN_GUIDE.md` for detailed admin instructions
- **Development Guide:** See `MVP_ROADMAP.md` for technical details
- **API Documentation:** Available in `/api` route handlers

---

## 🔧 Technical Highlights

- **Production-Ready:** Comprehensive error handling and graceful fallbacks
- **Type-Safe:** Full TypeScript implementation with proper interfaces
- **Scalable Architecture:** Modular components and clean separation of concerns
- **Security:** Role-based access control and input validation
- **Performance:** Optimized images, lazy loading, and efficient data fetching

---

## License

Proprietary © Sylvanity B.V. – All rights reserved.