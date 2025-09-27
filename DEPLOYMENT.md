# Production Deployment Guide

## 🎯 Target Domain: https://trainings.sylvanity.eu/

## ✅ Pre-Deployment Checklist

### 1. Environment Variables (Production)
Create these in your hosting platform (Vercel recommended):

```env
# Production Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-production-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-key

# Production Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your-live-key
STRIPE_SECRET_KEY=sk_live_your-live-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Production URLs
NEXT_PUBLIC_APP_URL=https://trainings.sylvanity.eu
NEXTAUTH_URL=https://trainings.sylvanity.eu

# Email Service (Optional - for automated emails)
RESEND_API_KEY=re_your-resend-key
EMAIL_FROM=noreply@sylvanity.eu
```

### 2. Database Setup (Supabase Production)

1. **Create Production Supabase Project**
   - Go to https://supabase.com/dashboard
   - Create new project: "sylvanity-training-production"
   - Note down URL and keys

2. **Run Database Migrations** (in order):
   ```sql
   -- 1. Core schema
   -- Run: supabase/final-complete-schema.sql

   -- 2. Real content
   -- Run: supabase/populate-real-content.sql

   -- 3. Featured trainings
   -- Run: supabase/add-featured-column.sql

   -- 4. Updated pricing
   -- Run: supabase/update-training-prices.sql

   -- 5. Updated dates
   -- Run: supabase/update-training-dates.sql
   ```

3. **Create Admin User**
   ```sql
   -- After signing up through the app:
   UPDATE profiles SET role = 'admin'
   WHERE email = 'your-admin-email@sylvanity.eu';
   ```

### 3. Stripe Production Setup

1. **Switch to Live Mode** in Stripe Dashboard
2. **Create webhook endpoint**: `https://trainings.sylvanity.eu/api/stripe/webhook`
3. **Add events**: `checkout.session.completed`, `payment_intent.succeeded`
4. **Copy webhook secret** for environment variables

### 4. DNS Configuration

**For trainings.sylvanity.eu subdomain:**

1. **If using Vercel:**
   - Add domain in Vercel dashboard
   - Add CNAME record in your DNS:
     ```
     Type: CNAME
     Name: trainings
     Value: cname.vercel-dns.com
     ```

2. **Alternative hosting:**
   - Point A record to your hosting IP
   - Or CNAME to your hosting provider's domain

## 🚀 Deployment Steps

### Option 1: Netlify (Your Choice)

1. **Create netlify.toml** (already configured below)

2. **Connect Repository**
   - Go to https://app.netlify.com/
   - "New site from Git" → Connect your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `out`

3. **Configure Domain**
   - In Netlify dashboard: Domain settings
   - Add custom domain: `trainings.sylvanity.eu`
   - Configure DNS:
     ```
     Type: CNAME
     Name: trainings
     Value: your-site-name.netlify.app
     ```

4. **Set Environment Variables**
   - In Netlify dashboard: Site settings → Environment variables
   - Add all production variables listed above

5. **Configure Redirects** (handled in netlify.toml)

### Option 2: Vercel (Alternative)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login and deploy
   vercel login
   vercel
   ```

2. **Configure Domain**
   - In Vercel dashboard: Settings → Domains
   - Add: `trainings.sylvanity.eu`
   - Follow DNS instructions

3. **Set Environment Variables**
   - In Vercel dashboard: Settings → Environment Variables
   - Add all production variables listed above

## 🔍 Post-Deployment Testing

### Critical Tests:
- [ ] Homepage loads correctly
- [ ] Training catalog displays all courses
- [ ] Newsletter signup works (saves to database)
- [ ] Lead capture form works (generates promo codes)
- [ ] Stripe payment flow works end-to-end
- [ ] Admin panel accessible and functional
- [ ] All SQL scripts applied correctly
- [ ] Contact form sends emails
- [ ] Mobile responsiveness works

### Test User Journeys:
1. **Visitor → Lead → Customer**
   - Browse trainings → Get More Info → Receive promo code → Enroll with discount

2. **Admin Workflow**
   - Login → View leads → Check newsletter subscribers → Manage trainings

## 🛡️ Security Checklist

- [ ] All environment variables are in production (not .env.local)
- [ ] Stripe webhook endpoint is secured
- [ ] Supabase RLS policies are enabled
- [ ] HTTPS is enforced
- [ ] Admin access is restricted

## 📊 Analytics Setup (Optional)

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Hotjar or similar
NEXT_PUBLIC_HOTJAR_ID=your-hotjar-id
```

## 🚨 Rollback Plan

If issues occur:
1. Revert DNS to point to old site
2. Keep development environment running as backup
3. Database backups are automatic in Supabase

## 📝 Go-Live Checklist

- [ ] All environment variables configured
- [ ] Database migrated and populated
- [ ] Stripe webhooks working
- [ ] DNS configured for trainings.sylvanity.eu
- [ ] SSL certificate active
- [ ] All critical user flows tested
- [ ] Admin access verified
- [ ] Backup plan ready

---

**Ready for Production:** The codebase is production-ready. Focus on environment setup and testing.