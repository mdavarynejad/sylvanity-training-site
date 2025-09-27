# Supabase Database Schema Files

## 🟢 CURRENT/ACTIVE FILES (Use These)

### **`final-complete-schema.sql`** ⭐ **MASTER FILE**
- **This is the ONLY file you need to run for a fresh Supabase setup**
- Contains ALL tables including the critical `bookings` table
- Includes all authentication fixes and security policies
- **Handles existing policies safely (no conflicts)**
- **Use this to recreate the entire database from scratch**

### **`populate-real-content.sql`**
- Contains real training program data
- Run AFTER `final-complete-schema.sql` if you want sample content

### **`add-seo-fields.sql`**
- Adds SEO fields to existing tables
- Run only if you need SEO enhancements

## 🗑️ CLEANED UP FILES (Removed)

The following outdated files have been removed to avoid confusion:
- ~~`schema.sql`~~ - Original basic schema
- ~~`schema-updated.sql`~~ - Early version with enhancements
- ~~`schema-lead-capture.sql`~~ - Lead capture features only
- ~~`schema-admin.sql`~~ - Admin features only
- ~~`complete-migration.sql`~~ - Previous "complete" file but missing bookings table
- ~~`populate-content.sql`~~ - Sample/demo content (older version)

## 🚀 Setup Instructions

### For Fresh Supabase Project:
1. Go to your Supabase SQL Editor
2. Copy and paste **`final-complete-schema.sql`**
3. Run it
4. (Optional) Run **`populate-real-content.sql`** for sample data

### For Existing Project Missing Tables:
1. Use **`final-complete-schema.sql`** (it uses `CREATE TABLE IF NOT EXISTS`)
2. It will only create missing tables and policies

## 🔍 What's Included in `final-complete-schema.sql`:

- ✅ **trainings** table
- ✅ **profiles** table
- ✅ **bookings** table (CRITICAL for auth)
- ✅ **testimonials** table
- ✅ **newsletter_subscribers** table
- ✅ **leads** table
- ✅ **promo_codes** table
- ✅ **admin_activity_log** table
- ✅ All RLS policies
- ✅ Admin functions
- ✅ Triggers for updated_at
- ✅ Proper permissions

## 🎯 The Missing Piece That Was Causing Auth Issues:

The `bookings` table was missing from previous schemas, which caused:
- Dashboard errors when loading user bookings
- Authentication flow issues
- Account management problems

This is now fixed in `final-complete-schema.sql`.