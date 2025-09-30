# Modern Google-Style Email Templates for Supabase

## How to Update Email Templates

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/gqmlvtcnzscobhrwtymd
2. Navigate to **Authentication > Email Templates**
3. Replace the default templates with the modern versions below

---

## 📧 **Confirm Signup Template**

**Subject:** `Welcome to Sylvanity Academy - Confirm Your Account`

**HTML Body:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Your Sylvanity Academy Account</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Google Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #202124;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
            padding: 40px 24px;
            text-align: center;
        }
        .logo {
            color: #ffffff;
            font-size: 28px;
            font-weight: 600;
            margin: 0;
            letter-spacing: -0.5px;
        }
        .content {
            padding: 40px 32px;
        }
        .title {
            font-size: 24px;
            font-weight: 500;
            color: #202124;
            margin: 0 0 16px 0;
            text-align: center;
        }
        .subtitle {
            font-size: 16px;
            color: #5f6368;
            margin: 0 0 32px 0;
            text-align: center;
        }
        .cta-button {
            display: inline-block;
            background: #1a73e8;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 32px;
            border-radius: 24px;
            font-weight: 500;
            font-size: 14px;
            margin: 16px 0;
            text-align: center;
            transition: background-color 0.2s;
        }
        .cta-button:hover {
            background: #1557b0;
        }
        .button-container {
            text-align: center;
            margin: 32px 0;
        }
        .info-box {
            background: #f8f9fa;
            border: 1px solid #e8eaed;
            border-radius: 8px;
            padding: 24px;
            margin: 24px 0;
        }
        .info-title {
            font-weight: 500;
            margin: 0 0 8px 0;
            color: #202124;
        }
        .info-text {
            color: #5f6368;
            font-size: 14px;
            margin: 0;
        }
        .footer {
            background: #f8f9fa;
            padding: 24px 32px;
            text-align: center;
            border-top: 1px solid #e8eaed;
        }
        .footer-text {
            color: #5f6368;
            font-size: 12px;
            margin: 0;
        }
        .link {
            color: #1a73e8;
            text-decoration: none;
        }
        .divider {
            height: 1px;
            background: #e8eaed;
            margin: 32px 0;
            border: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo">Sylvanity Academy</h1>
        </div>

        <div class="content">
            <h2 class="title">Welcome to Sylvanity Academy!</h2>
            <p class="subtitle">You're one step away from accessing world-class AI and technology training programs.</p>

            <div class="info-box">
                <h3 class="info-title">Confirm your email address</h3>
                <p class="info-text">Click the button below to verify your email and activate your training account. This link will expire in 24 hours.</p>
            </div>

            <div class="button-container">
                <a href="{{ .ConfirmationURL }}" class="cta-button">Confirm Your Account</a>
            </div>

            <hr class="divider">

            <div class="info-box">
                <h3 class="info-title">What's next?</h3>
                <p class="info-text">After confirming your account, you'll be able to browse our training programs, enroll in courses, and access your personal dashboard.</p>
            </div>

            <p style="color: #5f6368; font-size: 14px; text-align: center; margin-top: 32px;">
                If you didn't create this account, you can safely ignore this email.
            </p>
        </div>

        <div class="footer">
            <p class="footer-text">
                This email was sent by Sylvanity Academy<br>
                Need help? <a href="mailto:support@sylvanity.com" class="link">Contact our support team</a>
            </p>
        </div>
    </div>
</body>
</html>
```

---

## 🔄 **Password Reset Template**

**Subject:** `Reset Your Sylvanity Academy Password`

**HTML Body:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Google Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #202124;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #ea4335 0%, #fbbc04 100%);
            padding: 40px 24px;
            text-align: center;
        }
        .logo {
            color: #ffffff;
            font-size: 28px;
            font-weight: 600;
            margin: 0;
            letter-spacing: -0.5px;
        }
        .content {
            padding: 40px 32px;
        }
        .title {
            font-size: 24px;
            font-weight: 500;
            color: #202124;
            margin: 0 0 16px 0;
            text-align: center;
        }
        .subtitle {
            font-size: 16px;
            color: #5f6368;
            margin: 0 0 32px 0;
            text-align: center;
        }
        .cta-button {
            display: inline-block;
            background: #ea4335;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 32px;
            border-radius: 24px;
            font-weight: 500;
            font-size: 14px;
            margin: 16px 0;
            text-align: center;
        }
        .button-container {
            text-align: center;
            margin: 32px 0;
        }
        .security-box {
            background: #fef7e0;
            border: 1px solid #f9c74f;
            border-radius: 8px;
            padding: 24px;
            margin: 24px 0;
        }
        .security-title {
            font-weight: 500;
            margin: 0 0 8px 0;
            color: #202124;
        }
        .security-text {
            color: #5f6368;
            font-size: 14px;
            margin: 0;
        }
        .footer {
            background: #f8f9fa;
            padding: 24px 32px;
            text-align: center;
            border-top: 1px solid #e8eaed;
        }
        .footer-text {
            color: #5f6368;
            font-size: 12px;
            margin: 0;
        }
        .link {
            color: #ea4335;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo">Sylvanity Academy</h1>
        </div>

        <div class="content">
            <h2 class="title">Reset Your Password</h2>
            <p class="subtitle">We received a request to reset the password for your Sylvanity Academy account.</p>

            <div class="button-container">
                <a href="{{ .ConfirmationURL }}" class="cta-button">Reset Password</a>
            </div>

            <div class="security-box">
                <h3 class="security-title">🔒 Security Notice</h3>
                <p class="security-text">This link will expire in 1 hour for security reasons. If you didn't request this password reset, please ignore this email.</p>
            </div>

            <p style="color: #5f6368; font-size: 14px; text-align: center; margin-top: 32px;">
                For your security, never share this link with anyone.
            </p>
        </div>

        <div class="footer">
            <p class="footer-text">
                This email was sent by Sylvanity Academy<br>
                <a href="mailto:support@sylvanity.com" class="link">Contact support</a> if you need assistance
            </p>
        </div>
    </div>
</body>
</html>
```

---

## 📱 **Magic Link Template**

**Subject:** `Your Sylvanity Academy Sign-in Link`

**HTML Body:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign in to Sylvanity Academy</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Google Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #202124;
            background-color: #f8f9fa;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #34a853 0%, #4285f4 100%);
            padding: 40px 24px;
            text-align: center;
        }
        .logo {
            color: #ffffff;
            font-size: 28px;
            font-weight: 600;
            margin: 0;
            letter-spacing: -0.5px;
        }
        .content {
            padding: 40px 32px;
        }
        .title {
            font-size: 24px;
            font-weight: 500;
            color: #202124;
            margin: 0 0 16px 0;
            text-align: center;
        }
        .subtitle {
            font-size: 16px;
            color: #5f6368;
            margin: 0 0 32px 0;
            text-align: center;
        }
        .cta-button {
            display: inline-block;
            background: #34a853;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 32px;
            border-radius: 24px;
            font-weight: 500;
            font-size: 14px;
            margin: 16px 0;
            text-align: center;
        }
        .button-container {
            text-align: center;
            margin: 32px 0;
        }
        .footer {
            background: #f8f9fa;
            padding: 24px 32px;
            text-align: center;
            border-top: 1px solid #e8eaed;
        }
        .footer-text {
            color: #5f6368;
            font-size: 12px;
            margin: 0;
        }
        .link {
            color: #34a853;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo">Sylvanity Academy</h1>
        </div>

        <div class="content">
            <h2 class="title">Sign in to Your Account</h2>
            <p class="subtitle">Click the button below to securely sign in to your Sylvanity Academy account.</p>

            <div class="button-container">
                <a href="{{ .ConfirmationURL }}" class="cta-button">Sign In Now</a>
            </div>

            <p style="color: #5f6368; font-size: 14px; text-align: center; margin-top: 32px;">
                This link will expire in 5 minutes for security reasons.
            </p>
        </div>

        <div class="footer">
            <p class="footer-text">
                This email was sent by Sylvanity Academy<br>
                <a href="mailto:support@sylvanity.com" class="link">Contact support</a>
            </p>
        </div>
    </div>
</body>
</html>
```

---

## 📋 **How to Apply These Templates**

1. **Go to Supabase Dashboard:**
   - Navigate to **Authentication > Email Templates**

2. **For Each Template:**
   - Click the template name (e.g., "Confirm signup")
   - Replace the **Subject** field with the new subject
   - Replace the **Body (HTML)** with the new HTML code
   - Click **Save**

3. **Test the Templates:**
   - Try registering a new user
   - Check the email for the modern design

## ✨ **Features of the New Design**

- **Google Material Design** principles
- **Responsive** for mobile devices
- **Professional gradient headers**
- **Clear call-to-action buttons**
- **Consistent branding**
- **Security messaging**
- **Clean typography**

The emails will now match the modern, professional look of your Google-style website!