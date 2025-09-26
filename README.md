# Sylvanity Training Site

A dedicated training platform for [Sylvanity](https://sylvanity.com) offering comprehensive professional development programs with seamless registration, payment processing, and user management.

---

## 🎯 Core Features

### Public Features
- **Training Catalog** — Browse available courses with detailed descriptions, schedules, and pricing
- **User Authentication** — Secure sign-up/login via Supabase Auth (email/password + OAuth)
- **Lead Generation** — Smart forms with instant promo code delivery via email
- **Newsletter System** — Email subscription with segmented marketing campaigns
- **Secure Checkout** — Stripe integration with promo codes and automatic invoice generation
- **User Dashboard** — View enrolled trainings, payment history, and certificates

### Admin Features
- **Training Management** — CRUD operations for courses, schedules, and pricing
- **User Management** — View registrations, manage access, and track engagement
- **Promo Code System** — Create and manage discount campaigns
- **Analytics Dashboard** — Track conversions, revenue, and user metrics
- **Email Campaign Manager** — Send targeted emails to user segments

---

## 🛠 Tech Stack

### Core
- **Next.js 14** — React framework with App Router
- **TypeScript** — Type safety and better DX
- **TailwindCSS** — Utility-first styling
- **Shadcn/ui** — Accessible component library

### Backend & Database
- **Supabase** — Authentication, PostgreSQL database, and real-time subscriptions
- **Prisma** — Type-safe database ORM
- **Stripe** — Payment processing and subscription management

### Services
- **Resend** — Transactional emails and marketing campaigns
- **Uploadthing** — File uploads for training materials
- **Vercel** — Deployment and edge functions

### Development
- **Zod** — Schema validation
- **React Hook Form** — Form management
- **TanStack Query** — Data fetching and caching
- **Playwright** — E2E testing

---

## 📁 Project Structure

```
sylvanity-training-site/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── reset-password/
│   ├── (public)/            # Public pages
│   │   ├── trainings/       # Training catalog and details
│   │   ├── about/
│   │   └── contact/
│   ├── (protected)/         # Auth-required pages
│   │   ├── dashboard/       # User dashboard
│   │   └── settings/        # User settings
│   ├── admin/               # Admin panel (role-based)
│   │   ├── trainings/       # Manage trainings
│   │   ├── users/           # User management
│   │   ├── promo-codes/     # Promo management
│   │   └── analytics/       # Analytics dashboard
│   ├── api/                 # API routes
│   │   ├── auth/            # Auth endpoints
│   │   ├── stripe/          # Payment webhooks
│   │   ├── trainings/       # Training CRUD
│   │   └── email/           # Email operations
│   └── layout.tsx           # Root layout
├── components/
│   ├── ui/                  # Base UI components (shadcn)
│   ├── forms/               # Form components
│   ├── layouts/             # Layout components
│   └── features/            # Feature-specific components
│       ├── training-card/
│       ├── checkout/
│       └── dashboard/
├── lib/
│   ├── supabase/           # Supabase client and utilities
│   ├── stripe/             # Stripe configuration
│   ├── email/              # Email templates and sending
│   ├── db/                 # Database queries (Prisma)
│   └── utils/              # Utility functions
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── public/                  # Static assets
└── tests/                   # Test files
    ├── unit/
    └── e2e/
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm
- Supabase account
- Stripe account
- Resend account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/sylvanity-training-site.git
   cd sylvanity-training-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   ```bash
   npx supabase init
   npx supabase start  # For local development
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your credentials:
   ```env
   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # Database
   DATABASE_URL=your_database_url

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret

   # Email (Resend)
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM=noreply@sylvanity.com

   # Upload (Uploadthing)
   UPLOADTHING_SECRET=your_uploadthing_secret
   UPLOADTHING_APP_ID=your_app_id
   ```

5. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed  # Optional: seed with sample data
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

---

## 📝 Database Schema

### Core Tables
- `users` — User profiles and authentication
- `trainings` — Training courses and details
- `schedules` — Training schedules and sessions
- `registrations` — User training enrollments
- `payments` — Payment records and invoices
- `promo_codes` — Discount codes and campaigns
- `newsletter_subscribers` — Email list management

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 📦 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment
```bash
npm run build
npm start
```

---

## 🔮 Roadmap

### Phase 1 - MVP ✅
- [x] Basic authentication system
- [x] Training catalog and details
- [x] Stripe checkout integration
- [x] Email notifications
- [x] User dashboard

### Phase 2 - Enhancement
- [ ] Advanced admin panel
- [ ] Bulk training registration
- [ ] Certificate generation system
- [ ] Waitlist management
- [ ] Training reviews and ratings

### Phase 3 - Scale
- [ ] Mobile app (React Native)
- [ ] Video training content
- [ ] Live session integration (Zoom/Teams)
- [ ] Advanced analytics and reporting
- [ ] Multi-tenant support for partners

---

## License

Proprietary © Sylvanity B.V. – All rights reserved.
