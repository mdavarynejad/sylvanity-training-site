# 🚀 Complete Netlify Deployment Guide
## Deploy to https://trainings.sylvanity.eu/

---

## 📋 **PHASE 1: PRE-DEPLOYMENT PREPARATION**

### Step 1: Verify Current Setup
```bash
# Test local build works
npm run build

# If build is successful, you'll see an 'out' folder created
ls -la out/
```

### Step 2: Commit Configuration Files
```bash
# Add the new configuration files
git add netlify.toml next.config.js
git commit -m "Add Netlify deployment configuration

🚀 Production deployment setup:
- Configure netlify.toml for redirects and headers
- Update next.config.js for static export
- Ready for trainings.sylvanity.eu deployment"

git push origin main
```

---

## 🌐 **PHASE 2: NETLIFY DEPLOYMENT**

### Step 3: Create Netlify Account & Deploy

1. **Go to Netlify**: https://app.netlify.com/
2. **Sign up/Login** (use GitHub for easy integration)
3. **Deploy from Git**:
   - Click "New site from Git"
   - Choose "GitHub" (or your git provider)
   - Select your repository: `sylvanity-training-site`

4. **Configure Build Settings**:
   ```
   Build command: npm run build
   Publish directory: out
   ```
   *(These should auto-populate from netlify.toml)*

5. **Click "Deploy Site"**
   - First deploy will take 2-3 minutes
   - You'll get a random URL like: `amazing-cupcake-123456.netlify.app`

### Step 4: Test Initial Deployment
- Visit your temporary Netlify URL
- Verify homepage loads
- Check that navigation works
- Test that forms display (they won't work yet - need environment variables)

---

## 🔧 **PHASE 3: ENVIRONMENT CONFIGURATION**

### Step 5: Set Up Production Environment Variables

In Netlify Dashboard → Site Settings → Environment Variables, add:

#### Production URLs:
```env
NEXT_PUBLIC_APP_URL=https://trainings.sylvanity.eu
```

#### Supabase Production (you'll need to create this):
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-production-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-key
```

#### Stripe Production (switch to live mode):
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your-live-key
STRIPE_SECRET_KEY=sk_live_your-live-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

#### Email Service (optional):
```env
RESEND_API_KEY=re_your-resend-key
EMAIL_FROM=noreply@sylvanity.eu
```

### Step 6: Redeploy with Environment Variables
- In Netlify Dashboard → Deploys
- Click "Trigger deploy" → "Deploy site"
- Wait for deployment to complete

---

## 🌍 **PHASE 4: CUSTOM DOMAIN SETUP**

### Step 7: Configure Custom Domain

1. **In Netlify Dashboard**:
   - Go to Site Settings → Domain settings
   - Click "Add custom domain"
   - Enter: `trainings.sylvanity.eu`
   - Click "Verify" then "Add domain"

2. **Note the Netlify URL** shown (like `happy-site-123456.netlify.app`)

### Step 8: Configure DNS

**In your domain provider (where sylvanity.eu is managed):**

Add a CNAME record:
```
Type: CNAME
Name: trainings
Value: [your-netlify-site-name].netlify.app
TTL: 3600 (or Auto)
```

**Example:**
```
Type: CNAME
Name: trainings
Value: amazing-cupcake-123456.netlify.app
TTL: 3600
```

### Step 9: SSL Certificate
- Netlify automatically provisions SSL certificates
- Wait 10-60 minutes for DNS propagation
- Your site will be available at `https://trainings.sylvanity.eu`

---

## 🗄️ **PHASE 5: DATABASE SETUP**

### Step 10: Create Production Supabase Project

1. **Go to**: https://supabase.com/dashboard
2. **Create new project**: "sylvanity-training-production"
3. **Note down**:
   - Project URL: `https://[project-id].supabase.co`
   - Anon key: `eyJh...` (public key)
   - Service role key: `eyJh...` (secret key)

### Step 11: Run Database Migrations

**In Supabase SQL Editor, run these files in order:**

1. **Core Schema**: Copy from `supabase/final-complete-schema.sql`
2. **Real Content**: Copy from `supabase/populate-real-content.sql`
3. **Featured System**: Copy from `supabase/add-featured-column.sql`
4. **Updated Pricing**: Copy from `supabase/update-training-prices.sql`
5. **Updated Dates**: Copy from `supabase/update-training-dates.sql`

### Step 12: Update Environment Variables

**Back in Netlify Environment Variables, update:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[your-service-role-key]
```

### Step 13: Deploy with Database
- Trigger another deployment in Netlify
- Test that data loads on your site

---

## 💳 **PHASE 6: STRIPE PRODUCTION SETUP**

### Step 14: Switch Stripe to Live Mode

1. **In Stripe Dashboard**: Toggle from "Test" to "Live" mode
2. **Get Live Keys**:
   - Publishable key: `pk_live_...`
   - Secret key: `sk_live_...`

### Step 15: Create Production Webhook

1. **In Stripe Dashboard** → Developers → Webhooks
2. **Add endpoint**: `https://trainings.sylvanity.eu/api/stripe/webhook`
3. **Select events**:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
4. **Copy webhook secret**: `whsec_...`

### Step 16: Update Stripe Environment Variables

**In Netlify Environment Variables:**
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your-live-key
STRIPE_SECRET_KEY=sk_live_your-live-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

### Step 17: Final Deployment
- Trigger final deployment in Netlify
- All payment functionality should now work

---

## ✅ **PHASE 7: TESTING & VERIFICATION**

### Step 18: Complete Testing Checklist

Visit `https://trainings.sylvanity.eu` and test:

- [ ] **Homepage loads** with animations and testimonials
- [ ] **Training catalog** displays all 5 courses
- [ ] **Individual training pages** load with hero images
- [ ] **Newsletter signup** works (check Supabase `newsletter_subscribers`)
- [ ] **Lead capture form** works and generates promo codes
- [ ] **Contact form** submits successfully
- [ ] **Payment flow** works end-to-end (use small amount)
- [ ] **Admin panel** accessible at `/admin`
- [ ] **Mobile responsiveness** works on phone/tablet

### Step 19: Create Admin User

1. **Sign up** through the site at `/auth/signup`
2. **In Supabase SQL Editor**:
   ```sql
   UPDATE profiles SET role = 'admin'
   WHERE email = 'your-admin-email@sylvanity.eu';
   ```
3. **Test admin access** at `/admin`

---

## 🔄 **PHASE 8: REDIRECTS & SEO (Optional)**

### Step 20: Set Up Redirects from Main Domain

**If you want to redirect from sylvanity.eu/trainings to trainings.sylvanity.eu:**

In your main sylvanity.eu site, add:
```
Redirect 301 /trainings https://trainings.sylvanity.eu/
Redirect 301 /training https://trainings.sylvanity.eu/
```

### Step 21: Update Social Media Links

Update any existing links to point to:
- `https://trainings.sylvanity.eu`

---

## 🚨 **TROUBLESHOOTING**

### Common Issues:

**Build Fails:**
```bash
# Test build locally first
npm run build
# Fix any TypeScript errors before deploying
```

**Environment Variables Not Working:**
- Ensure they're set in Netlify (not just locally)
- Trigger a new deployment after adding variables
- Check spelling exactly matches what code expects

**Domain Not Working:**
- Check DNS propagation: https://dnschecker.org/
- Wait 30-60 minutes for changes to propagate
- Verify CNAME record points to correct Netlify URL

**Database Connection Issues:**
- Verify Supabase URL and keys are correct
- Check that RLS policies are enabled
- Test connection in Supabase dashboard

**Stripe Webhook Fails:**
- Ensure webhook URL is exactly: `https://trainings.sylvanity.eu/api/stripe/webhook`
- Check webhook secret matches environment variable
- Test with Stripe CLI: `stripe listen --forward-to https://trainings.sylvanity.eu/api/stripe/webhook`

---

## 📊 **PHASE 9: POST-LAUNCH MONITORING**

### Step 22: Set Up Analytics (Optional)

1. **Google Analytics**:
   - Create GA4 property
   - Add tracking ID to environment variables

2. **Netlify Analytics**:
   - Enable in Netlify Dashboard → Analytics

### Step 23: Regular Monitoring

**Weekly Checks:**
- [ ] Site loads correctly
- [ ] Forms are working
- [ ] New signups in database
- [ ] Payment webhooks functioning
- [ ] SSL certificate valid

---

## 🎉 **LAUNCH CHECKLIST**

- [ ] Site deployed to Netlify
- [ ] Custom domain `trainings.sylvanity.eu` configured
- [ ] SSL certificate active
- [ ] All environment variables set
- [ ] Database migrated and populated
- [ ] Stripe webhooks working
- [ ] Admin access configured
- [ ] End-to-end testing completed
- [ ] Social media links updated
- [ ] Team notified of launch

---

**🚀 You're now live at https://trainings.sylvanity.eu/ !**

For ongoing support, refer to:
- Netlify docs: https://docs.netlify.com/
- Supabase docs: https://supabase.com/docs
- Stripe docs: https://stripe.com/docs