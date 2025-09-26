# Sylvanity Training Platform - Admin Guide

This guide provides comprehensive instructions for administrators to manage the Sylvanity Training Platform effectively.

---

## 🎯 Quick Start for Admins

### Accessing the Admin Panel

1. **Navigate to Admin Panel**
   - Go to `https://your-domain.com/admin` or click "Admin" in the footer
   - You'll be redirected to sign in if not authenticated

2. **Admin Authentication**
   - Currently in **demo mode** - access is granted for demonstration purposes
   - In production: Admin access requires proper role assignment in the database

3. **Admin Dashboard Overview**
   - Overview statistics (trainings, leads, subscribers)
   - Quick action cards for navigation
   - Recent activity tracking

---

## 📊 Admin Dashboard Features

### Main Dashboard (`/admin`)

**Overview Statistics:**
- **Total Trainings** — Number of available training programs
- **Total Leads** — Captured leads from forms
- **Newsletter Subscribers** — Active email subscribers
- **Recent Activity** — 30-day metrics and trends

**Quick Actions:**
- **Manage Trainings** → Training management interface
- **View Leads** → Lead tracking and follow-up
- **Newsletter** → Subscriber management and campaigns

---

## 🎓 Training Management (`/admin/trainings`)

### Viewing Training Programs

**Training List Features:**
- **Visual Overview** — Training thumbnails, titles, and instructor information
- **Status Indicators** — Available (green), Almost Full (yellow), Full (red)
- **Participant Tracking** — Current vs maximum participants
- **Quick Actions** — View, Edit, Delete options

**Training Information Displayed:**
- Training title and instructor
- Category and pricing
- Next start date
- Availability status
- Participant counts

### Managing Training Content

**Current Capabilities (Demo Mode):**
- View all training programs in a professional table format
- Access training details and public pages
- Monitor enrollment status and availability

**Production Capabilities (With Database):**
- Create new training programs
- Edit existing training details
- Delete outdated programs
- Bulk operations for multiple trainings

### Adding New Training Materials

**To Add New Training (Production Mode):**

1. **Click "Create New Training"** button
2. **Fill Training Details:**
   - Training title and description
   - Instructor information
   - Category and level (Beginner/Intermediate/Advanced)
   - Duration and pricing
   - Maximum participants

3. **Add Multiple Start Dates:**
   - Set multiple session dates
   - Configure different time slots
   - Manage capacity per session

4. **Upload Materials:**
   - **Hero Image** — Upload .webp format (recommended 1200x600px)
   - **PDF Attachments** — Course syllabi, toolkits, blueprints
   - **Prerequisites** — List required knowledge/skills

5. **Set Availability:**
   - Enable/disable registration
   - Set enrollment limits
   - Configure pricing and discounts

**File Management:**
- Hero images stored in `/public/images/trainings/`
- PDF attachments in `/public/attachments/`
- Recommended naming: `training-title-hero.webp`, `training-title-syllabus.pdf`

---

## 👥 Lead Management (`/admin/leads`)

### Lead Tracking Dashboard

**Lead Information:**
- **Contact Details** — Name, email, phone, company
- **Source Tracking** — Training page vs newsletter signup
- **Promo Codes** — Generated discount codes
- **Timestamps** — When leads were captured
- **Messages** — User inquiries and interests

### Lead Management Actions

**Filter and Sort:**
- **All Sources** — View all leads
- **Training Pages** — Leads from "Get More Info" buttons
- **Newsletter Footer** — Leads from newsletter signups

**Export and Follow-up:**
- **CSV Export** — Download lead data for CRM import
- **Email Integration** — Direct mailto links for follow-up
- **View Messages** — Access user inquiries and interests

### Lead Nurturing Process

**Recommended Workflow:**
1. **Daily Review** — Check new leads in admin panel
2. **Source Analysis** — Identify highest-converting sources
3. **Follow-up Strategy** — Use email integration for personal outreach
4. **Promo Code Tracking** — Monitor discount code usage
5. **CRM Integration** — Export leads for advanced nurturing

---

## 📧 Newsletter Management (`/admin/newsletter`)

### Subscriber Overview

**Statistics Dashboard:**
- **Active Subscribers** — Currently subscribed users
- **Total Subscribers** — All-time subscription count
- **Unsubscribed** — Users who opted out
- **Growth Metrics** — Subscription trends

### Subscriber Management

**Filtering Options:**
- **Active Only** — Current subscribers
- **All Subscribers** — Complete list
- **Unsubscribed** — Opted-out users

**Export Capabilities:**
- **CSV Export** — Download subscriber lists
- **Segmented Exports** — Export by status or source
- **Email Campaign Prep** — Ready for email service integration

### Email Campaign Management

**Current Capabilities:**
- Subscriber list management
- Source tracking (footer signups)
- Status monitoring (active/unsubscribed)

**Production Capabilities (With Email Service):**
- Send targeted email campaigns
- Automated welcome sequences
- Segmented marketing messages
- A/B testing for subject lines
- Campaign performance analytics

---

## 🔧 Admin Operations

### User Role Management

**Current System:**
- Demo mode with mock authentication
- Admin access for demonstration purposes

**Production System:**
1. **Database Role Assignment:**
   ```sql
   -- Make user an admin (run in Supabase SQL editor)
   UPDATE profiles SET role = 'admin'
   WHERE email = 'admin@yourcompany.com';
   ```

2. **Role Types:**
   - `user` — Regular platform users
   - `admin` — Full administrative access
   - `super_admin` — Enhanced permissions

### Data Export and Backup

**Available Exports:**
- **Leads CSV** — Complete lead information with timestamps
- **Newsletter CSV** — Subscriber data with status
- **Training Data** — Program information and metrics

**Export Format:**
- Standard CSV files compatible with Excel, Google Sheets, CRM systems
- Includes all relevant fields and timestamps
- Ready for data analysis and backup purposes

### Security and Access Control

**Current Security Features:**
- Role-based access control
- Admin activity logging
- Secure authentication checks
- Protected admin routes

**Production Security:**
- Supabase Row Level Security (RLS)
- Admin action audit trails
- Secure API endpoints
- Environment variable protection

---

## 🛠 Technical Setup for Admins

### Production Deployment Setup

**Required Services:**
1. **Supabase Database**
   - Run provided SQL schema files
   - Configure authentication
   - Set up Row Level Security

2. **Stripe Payment Processing**
   - Add API keys to environment variables
   - Configure webhook endpoints
   - Test payment flows

3. **Email Service (Optional)**
   - Resend or SendGrid API keys
   - Configure sender domains
   - Set up email templates

### Database Schema Management

**Schema Files to Run:**
1. `supabase/schema-updated.sql` — Core training and user tables
2. `supabase/schema-lead-capture.sql` — Lead and newsletter systems
3. `supabase/schema-admin.sql` — Admin roles and activity logging

**Initial Admin Setup:**
```sql
-- Create first admin user (after user signs up)
INSERT INTO profiles (id, email, role, full_name)
VALUES (
  'user-uuid-from-auth-users',
  'admin@yourcompany.com',
  'admin',
  'Admin Name'
);
```

### Environment Configuration

**Required Variables:**
```env
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Payments
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Email (optional)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@yourcompany.com
```

---

## 📈 Analytics and Reporting

### Available Metrics

**Training Analytics:**
- Enrollment numbers and trends
- Popular course categories
- Instructor performance
- Revenue by training program

**Lead Analytics:**
- Conversion rates by source
- Promo code usage patterns
- Lead quality scoring
- Follow-up success rates

**Newsletter Analytics:**
- Subscription growth rates
- Source attribution
- Engagement metrics
- Unsubscribe patterns

### Business Intelligence

**Key Performance Indicators:**
- **Conversion Rate** — Leads to paid enrollments
- **Average Order Value** — Revenue per training enrollment
- **Lead Quality** — Response rates and engagement
- **Course Popularity** — Enrollment numbers by category

**Monthly Reports:**
- Lead generation summary
- Revenue and enrollment trends
- Top-performing training programs
- Newsletter growth metrics

---

## 🔄 Workflow Best Practices

### Daily Admin Tasks

1. **Check New Leads** — Review and respond to inquiries
2. **Monitor Enrollments** — Track course capacity and availability
3. **Review Newsletter Signups** — Monitor subscription growth
4. **Follow Up** — Respond to customer inquiries

### Weekly Admin Tasks

1. **Export Lead Data** — Download for CRM integration
2. **Analyze Performance** — Review course popularity and revenue
3. **Update Training Content** — Refresh descriptions and materials
4. **Plan Email Campaigns** — Prepare newsletter content

### Monthly Admin Tasks

1. **Performance Review** — Analyze overall platform metrics
2. **Content Strategy** — Plan new training programs
3. **User Feedback** — Review and act on customer feedback
4. **System Maintenance** — Update content and fix issues

---

## 🆘 Troubleshooting

### Common Issues

**Admin Access Problems:**
- Ensure admin role is set in database
- Check authentication status
- Verify environment variables

**Data Not Displaying:**
- Check Supabase connection
- Verify schema is properly installed
- Review console for error messages

**Export Issues:**
- Ensure browser allows downloads
- Check CSV file format compatibility
- Verify data exists in selected filters

### Getting Help

**Technical Support:**
- Check console logs for error messages
- Review environment variable configuration
- Verify database connections and permissions

**Feature Requests:**
- Document desired functionality
- Provide use case examples
- Submit through appropriate channels

---

## 🎯 Success Tips

### Maximizing Lead Conversion

1. **Quick Response** — Follow up on leads within 24 hours
2. **Personalization** — Reference specific training interests
3. **Value Proposition** — Highlight unique program benefits
4. **Promo Code Strategy** — Use time-limited offers effectively

### Content Management

1. **Regular Updates** — Keep training descriptions current
2. **Quality Images** — Use professional hero images
3. **Clear Materials** — Provide detailed course syllabi
4. **Instructor Profiles** — Highlight expertise and credentials

### Newsletter Growth

1. **Valuable Content** — Share industry insights and tips
2. **Consistent Schedule** — Regular newsletter delivery
3. **Segmentation** — Target content to subscriber interests
4. **Call-to-Actions** — Clear next steps for engagement

---

This admin guide covers all current platform capabilities and provides a roadmap for production deployment and advanced features. The platform is designed to scale with your business needs while maintaining ease of use for administrators.

---

**Need Help?** Check the technical documentation in `MVP_ROADMAP.md` or review the code comments in the admin components for implementation details.