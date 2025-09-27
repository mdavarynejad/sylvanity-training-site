# Supabase Configuration Guide

## Important: Email Verification Links

To ensure email verification links point to your production site instead of localhost:

### 1. Update Supabase Auth Settings

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Update the following settings:

   - **Site URL**: `https://sylvanity-training-site.netlify.app`
   - **Redirect URLs** (add all of these):
     - `https://sylvanity-training-site.netlify.app/auth/callback`
     - `https://sylvanity-training-site.netlify.app/`
     - `http://localhost:3000/auth/callback` (for local development)

### 2. Update Environment Variables

Make sure your Netlify deployment has these environment variables set:

```
NEXT_PUBLIC_APP_URL=https://sylvanity-training-site.netlify.app
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Email Templates (Optional)

If you want to customize the email templates:

1. Go to **Authentication** → **Email Templates**
2. Update the "Confirm signup" template
3. Make sure the confirmation link uses `{{ .SiteURL }}` instead of hardcoded localhost

Example template:
```html
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your user:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your email</a></p>
```

### 4. Testing

After making these changes:
1. Clear your browser cache
2. Try signing up with a new email
3. Check that the verification email contains the production URL

## Troubleshooting

If emails still point to localhost:
- Double-check the Site URL in Supabase Dashboard
- Ensure NEXT_PUBLIC_APP_URL is set in Netlify environment variables
- Redeploy the application after updating environment variables
- Check that no hardcoded localhost URLs exist in the codebase