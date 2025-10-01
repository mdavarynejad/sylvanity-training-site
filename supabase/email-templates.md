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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background-color: #f9fafb;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #8FAF91 0%, #264E70 100%);
            padding: 48px 32px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: pulse 15s ease-in-out infinite;
        }
        @keyframes pulse {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-20px, -20px) scale(1.1); }
        }
        .logo {
            color: #ffffff;
            font-size: 32px;
            font-weight: 700;
            margin: 0;
            letter-spacing: -0.5px;
            position: relative;
            z-index: 1;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .tagline {
            color: rgba(255,255,255,0.95);
            font-size: 14px;
            margin-top: 8px;
            font-weight: 400;
            letter-spacing: 0.5px;
            position: relative;
            z-index: 1;
        }
        .content {
            padding: 48px 40px;
        }
        .title {
            font-size: 28px;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0 0 16px 0;
            text-align: center;
            line-height: 1.3;
        }
        .subtitle {
            font-size: 16px;
            color: #6b7280;
            margin: 0 0 40px 0;
            text-align: center;
            line-height: 1.5;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #8FAF91 0%, #779779 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 14px 40px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            text-align: center;
            box-shadow: 0 4px 14px rgba(143, 175, 145, 0.3);
            transition: all 0.3s ease;
        }
        .cta-button:hover {
            background: linear-gradient(135deg, #779779 0%, #6b8b6d 100%);
            box-shadow: 0 6px 20px rgba(143, 175, 145, 0.4);
            transform: translateY(-1px);
        }
        .button-container {
            text-align: center;
            margin: 40px 0;
        }
        .info-box {
            background: linear-gradient(135deg, #f8fffe 0%, #e8efee 100%);
            border: 1px solid #d6e3e2;
            border-radius: 12px;
            padding: 28px;
            margin: 32px 0;
            position: relative;
            overflow: hidden;
        }
        .info-box::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #8FAF91 0%, #264E70 100%);
        }
        .info-title {
            font-weight: 600;
            margin: 0 0 12px 0;
            color: #264E70;
            font-size: 18px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .info-icon {
            width: 24px;
            height: 24px;
            display: inline-block;
            background: #8FAF91;
            border-radius: 50%;
            position: relative;
        }
        .info-icon::after {
            content: '✓';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 14px;
            font-weight: bold;
        }
        .info-text {
            color: #4b5563;
            font-size: 15px;
            margin: 0;
            line-height: 1.6;
        }
        .features {
            margin: 40px 0;
            padding: 0;
            list-style: none;
        }
        .feature-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
        }
        .feature-icon {
            width: 32px;
            height: 32px;
            background: #e8efee;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 16px;
            flex-shrink: 0;
        }
        .feature-text {
            flex: 1;
        }
        .feature-title {
            font-weight: 600;
            color: #1a1a1a;
            margin: 0 0 4px 0;
            font-size: 15px;
        }
        .feature-desc {
            color: #6b7280;
            margin: 0;
            font-size: 14px;
            line-height: 1.5;
        }
        .footer {
            background: #f9fafb;
            padding: 32px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer-text {
            color: #6b7280;
            font-size: 13px;
            margin: 0 0 16px 0;
            line-height: 1.5;
        }
        .footer-links {
            margin: 16px 0;
        }
        .footer-link {
            color: #264E70;
            text-decoration: none;
            font-size: 13px;
            margin: 0 12px;
            font-weight: 500;
        }
        .footer-link:hover {
            text-decoration: underline;
        }
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%);
            margin: 40px 0;
            border: none;
        }
        .social-links {
            margin-top: 20px;
        }
        .social-link {
            display: inline-block;
            width: 32px;
            height: 32px;
            background: #e8efee;
            border-radius: 50%;
            margin: 0 6px;
            text-decoration: none;
            line-height: 32px;
            color: #264E70;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        .social-link:hover {
            background: #8FAF91;
            color: white;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo">Sylvanity Academy</h1>
            <p class="tagline">PROFESSIONAL AI DEVELOPMENT TRAINING</p>
        </div>

        <div class="content">
            <h2 class="title">Welcome to Your AI Learning Journey! 🎯</h2>
            <p class="subtitle">Just one more step to unlock comprehensive AI and technology training programs designed for modern professionals.</p>

            <div class="info-box">
                <h3 class="info-title">
                    <span class="info-icon"></span>
                    Verify Your Email Address
                </h3>
                <p class="info-text">Please confirm your email address to activate your Sylvanity Academy account and start your transformation journey. This verification link will expire in 24 hours for security reasons.</p>
            </div>

            <div class="button-container">
                <a href="{{ .ConfirmationURL }}" class="cta-button">Confirm My Account →</a>
            </div>

            <hr class="divider">

            <ul class="features">
                <li class="feature-item">
                    <div class="feature-icon">
                        <span style="color: #8FAF91;">🚀</span>
                    </div>
                    <div class="feature-text">
                        <h4 class="feature-title">Instant Access to Premium Content</h4>
                        <p class="feature-desc">Unlock our comprehensive library of AI training materials and expert-led workshops</p>
                    </div>
                </li>
                <li class="feature-item">
                    <div class="feature-icon">
                        <span style="color: #264E70;">👥</span>
                    </div>
                    <div class="feature-text">
                        <h4 class="feature-title">Join Our Professional Community</h4>
                        <p class="feature-desc">Connect with industry leaders and fellow AI enthusiasts in our exclusive network</p>
                    </div>
                </li>
                <li class="feature-item">
                    <div class="feature-icon">
                        <span style="color: #8FAF91;">📊</span>
                    </div>
                    <div class="feature-text">
                        <h4 class="feature-title">Track Your Learning Progress</h4>
                        <p class="feature-desc">Monitor your advancement with personalized dashboards and achievement certificates</p>
                    </div>
                </li>
            </ul>

            <div class="info-box" style="background: #fef3e8; border-color: #f9c74f;">
                <h3 class="info-title" style="color: #d97706;">
                    🔒 Security Notice
                </h3>
                <p class="info-text">If you didn't create this account, you can safely ignore this email. No action will be taken, and the request will expire automatically.</p>
            </div>
        </div>

        <div class="footer">
            <p class="footer-text">
                © 2025 Sylvanity Academy - Empowering professionals with AI expertise<br>
                Professional Development Programs | Amsterdam, Netherlands
            </p>
            <div class="footer-links">
                <a href="https://academy.sylvanity.eu" class="footer-link">Visit Website</a>
                <a href="mailto:academy@sylvanity.eu" class="footer-link">Contact Support</a>
                <a href="https://academy.sylvanity.eu/privacy" class="footer-link">Privacy Policy</a>
            </div>
            <div class="social-links">
                <a href="https://www.linkedin.com/company/sylvanity" class="social-link" title="LinkedIn">in</a>
                <a href="https://x.com/Sylvanity_BV" class="social-link" title="Twitter">𝕏</a>
            </div>
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
    <title>Reset Your Sylvanity Academy Password</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background-color: #f9fafb;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #8FAF91 0%, #264E70 100%);
            padding: 48px 32px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: pulse 15s ease-in-out infinite;
        }
        @keyframes pulse {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-20px, -20px) scale(1.1); }
        }
        .logo {
            color: #ffffff;
            font-size: 32px;
            font-weight: 700;
            margin: 0;
            letter-spacing: -0.5px;
            position: relative;
            z-index: 1;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .tagline {
            color: rgba(255,255,255,0.95);
            font-size: 14px;
            margin-top: 8px;
            font-weight: 400;
            letter-spacing: 0.5px;
            position: relative;
            z-index: 1;
        }
        .content {
            padding: 48px 40px;
        }
        .title {
            font-size: 28px;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0 0 16px 0;
            text-align: center;
            line-height: 1.3;
        }
        .subtitle {
            font-size: 16px;
            color: #6b7280;
            margin: 0 0 40px 0;
            text-align: center;
            line-height: 1.5;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #264E70 0%, #1a3a52 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 14px 40px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            text-align: center;
            box-shadow: 0 4px 14px rgba(38, 78, 112, 0.3);
            transition: all 0.3s ease;
        }
        .cta-button:hover {
            background: linear-gradient(135deg, #1a3a52 0%, #0f2738 100%);
            box-shadow: 0 6px 20px rgba(38, 78, 112, 0.4);
            transform: translateY(-1px);
        }
        .button-container {
            text-align: center;
            margin: 40px 0;
        }
        .info-box {
            background: linear-gradient(135deg, #f8fffe 0%, #e8efee 100%);
            border: 1px solid #d6e3e2;
            border-radius: 12px;
            padding: 28px;
            margin: 32px 0;
            position: relative;
            overflow: hidden;
        }
        .info-box::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #8FAF91 0%, #264E70 100%);
        }
        .security-box {
            background: #fef3e8;
            border: 1px solid #f9c74f;
            border-radius: 12px;
            padding: 28px;
            margin: 32px 0;
            position: relative;
            overflow: hidden;
        }
        .security-box::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #f9c74f 0%, #f39c12 100%);
        }
        .security-title {
            font-weight: 600;
            margin: 0 0 12px 0;
            color: #d97706;
            font-size: 18px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .info-text {
            color: #4b5563;
            font-size: 15px;
            margin: 0;
            line-height: 1.6;
        }
        .security-text {
            color: #92400e;
            font-size: 15px;
            margin: 0;
            line-height: 1.6;
        }
        .feature-list {
            list-style: none;
            padding: 0;
            margin: 32px 0;
        }
        .feature-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 16px;
        }
        .feature-icon {
            width: 24px;
            height: 24px;
            background: #e8efee;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            flex-shrink: 0;
            color: #8FAF91;
            font-size: 12px;
        }
        .feature-text {
            flex: 1;
            color: #4b5563;
            font-size: 15px;
            line-height: 1.5;
        }
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%);
            margin: 40px 0;
            border: none;
        }
        .footer {
            background: #f9fafb;
            padding: 32px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer-text {
            color: #6b7280;
            font-size: 13px;
            margin: 0 0 16px 0;
            line-height: 1.5;
        }
        .footer-links {
            margin: 16px 0;
        }
        .footer-link {
            color: #264E70;
            text-decoration: none;
            font-size: 13px;
            margin: 0 12px;
            font-weight: 500;
        }
        .footer-link:hover {
            text-decoration: underline;
        }
        .social-links {
            margin-top: 20px;
        }
        .social-link {
            display: inline-block;
            width: 32px;
            height: 32px;
            background: #e8efee;
            border-radius: 50%;
            margin: 0 6px;
            text-decoration: none;
            line-height: 32px;
            color: #264E70;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        .social-link:hover {
            background: #8FAF91;
            color: white;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo">Sylvanity Academy</h1>
            <p class="tagline">PROFESSIONAL AI DEVELOPMENT TRAINING</p>
        </div>

        <div class="content">
            <h2 class="title">Password Reset Request 🔐</h2>
            <p class="subtitle">We received a request to reset the password for your Sylvanity Academy account. Let's get you back on track!</p>

            <div class="info-box">
                <ul class="feature-list" style="margin: 0;">
                    <li class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-text">Your request was received at {{ .Time }}</div>
                    </li>
                    <li class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-text">This link will expire in 1 hour for security</div>
                    </li>
                    <li class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-text">You'll be able to set a new secure password</div>
                    </li>
                </ul>
            </div>

            <div class="button-container">
                <a href="{{ .ConfirmationURL }}" class="cta-button">Reset My Password →</a>
            </div>

            <hr class="divider">

            <div class="security-box">
                <h3 class="security-title">
                    🔒 Important Security Notice
                </h3>
                <p class="security-text">
                    If you didn't request this password reset, please ignore this email and your password will remain unchanged. Someone may have entered your email address by mistake.
                </p>
                <p class="security-text" style="margin-top: 12px;">
                    For your security, never share this reset link with anyone. Our support team will never ask for your password.
                </p>
            </div>

            <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 32px;">
                Need help? Our support team is here to assist you.
            </p>
        </div>

        <div class="footer">
            <p class="footer-text">
                © 2025 Sylvanity Academy - Empowering professionals with AI expertise<br>
                Professional Development Programs | Amsterdam, Netherlands
            </p>
            <div class="footer-links">
                <a href="https://academy.sylvanity.eu" class="footer-link">Visit Website</a>
                <a href="mailto:academy@sylvanity.eu" class="footer-link">Contact Support</a>
                <a href="https://academy.sylvanity.eu/privacy" class="footer-link">Privacy Policy</a>
            </div>
            <div class="social-links">
                <a href="https://www.linkedin.com/company/sylvanity" class="social-link" title="LinkedIn">in</a>
                <a href="https://x.com/Sylvanity_BV" class="social-link" title="Twitter">𝕏</a>
            </div>
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
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background-color: #f9fafb;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #8FAF91 0%, #264E70 100%);
            padding: 48px 32px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: pulse 15s ease-in-out infinite;
        }
        @keyframes pulse {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-20px, -20px) scale(1.1); }
        }
        .logo {
            color: #ffffff;
            font-size: 32px;
            font-weight: 700;
            margin: 0;
            letter-spacing: -0.5px;
            position: relative;
            z-index: 1;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .tagline {
            color: rgba(255,255,255,0.95);
            font-size: 14px;
            margin-top: 8px;
            font-weight: 400;
            letter-spacing: 0.5px;
            position: relative;
            z-index: 1;
        }
        .content {
            padding: 48px 40px;
        }
        .title {
            font-size: 28px;
            font-weight: 600;
            color: #1a1a1a;
            margin: 0 0 16px 0;
            text-align: center;
            line-height: 1.3;
        }
        .subtitle {
            font-size: 16px;
            color: #6b7280;
            margin: 0 0 40px 0;
            text-align: center;
            line-height: 1.5;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #8FAF91 0%, #779779 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 14px 40px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            text-align: center;
            box-shadow: 0 4px 14px rgba(143, 175, 145, 0.3);
            transition: all 0.3s ease;
        }
        .cta-button:hover {
            background: linear-gradient(135deg, #779779 0%, #6b8b6d 100%);
            box-shadow: 0 6px 20px rgba(143, 175, 145, 0.4);
            transform: translateY(-1px);
        }
        .button-container {
            text-align: center;
            margin: 40px 0;
        }
        .info-box {
            background: linear-gradient(135deg, #f8fffe 0%, #e8efee 100%);
            border: 1px solid #d6e3e2;
            border-radius: 12px;
            padding: 28px;
            margin: 32px 0;
            position: relative;
            overflow: hidden;
        }
        .info-box::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #8FAF91 0%, #264E70 100%);
        }
        .info-title {
            font-weight: 600;
            margin: 0 0 12px 0;
            color: #264E70;
            font-size: 18px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .info-icon {
            width: 24px;
            height: 24px;
            display: inline-block;
            background: #8FAF91;
            border-radius: 50%;
            position: relative;
        }
        .info-icon::after {
            content: '✓';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            font-size: 14px;
            font-weight: bold;
        }
        .info-text {
            color: #4b5563;
            font-size: 15px;
            margin: 0;
            line-height: 1.6;
        }
        .feature-list {
            list-style: none;
            padding: 0;
            margin: 32px 0;
        }
        .feature-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 16px;
        }
        .feature-icon {
            width: 24px;
            height: 24px;
            background: #e8efee;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            flex-shrink: 0;
            color: #8FAF91;
            font-size: 12px;
        }
        .feature-text {
            flex: 1;
            color: #4b5563;
            font-size: 15px;
            line-height: 1.5;
        }
        .security-notice {
            background: #fef8e3;
            border: 1px solid #ffd77a;
            border-radius: 8px;
            padding: 16px;
            margin: 24px 0;
            text-align: center;
        }
        .security-icon {
            display: inline-block;
            width: 32px;
            height: 32px;
            background: #ffd77a;
            border-radius: 50%;
            line-height: 32px;
            margin-bottom: 8px;
            font-size: 16px;
        }
        .security-text {
            color: #92400e;
            font-size: 14px;
            margin: 0;
        }
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, #e5e7eb 50%, transparent 100%);
            margin: 40px 0;
            border: none;
        }
        .footer {
            background: #f9fafb;
            padding: 32px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer-text {
            color: #6b7280;
            font-size: 13px;
            margin: 0 0 16px 0;
            line-height: 1.5;
        }
        .footer-links {
            margin: 16px 0;
        }
        .footer-link {
            color: #264E70;
            text-decoration: none;
            font-size: 13px;
            margin: 0 12px;
            font-weight: 500;
        }
        .footer-link:hover {
            text-decoration: underline;
        }
        .social-links {
            margin-top: 20px;
        }
        .social-link {
            display: inline-block;
            width: 32px;
            height: 32px;
            background: #e8efee;
            border-radius: 50%;
            margin: 0 6px;
            text-decoration: none;
            line-height: 32px;
            color: #264E70;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        .social-link:hover {
            background: #8FAF91;
            color: white;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo">Sylvanity Academy</h1>
            <p class="tagline">PROFESSIONAL AI DEVELOPMENT TRAINING</p>
        </div>

        <div class="content">
            <h2 class="title">Quick Access to Your Account 🚀</h2>
            <p class="subtitle">We've created a secure one-click sign-in link just for you. No password needed!</p>

            <div class="info-box">
                <h3 class="info-title">
                    <span class="info-icon"></span>
                    Secure Sign-in Link
                </h3>
                <p class="info-text">This magic link provides instant access to your Sylvanity Academy dashboard. Simply click the button below to sign in securely.</p>

                <ul class="feature-list" style="margin-top: 20px; margin-bottom: 0;">
                    <li class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-text">No password required</div>
                    </li>
                    <li class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-text">Expires in 5 minutes for security</div>
                    </li>
                    <li class="feature-item">
                        <div class="feature-icon">✓</div>
                        <div class="feature-text">One-click access to your dashboard</div>
                    </li>
                </ul>
            </div>

            <div class="button-container">
                <a href="{{ .ConfirmationURL }}" class="cta-button">Sign In Instantly →</a>
            </div>

            <div class="security-notice">
                <div class="security-icon">⏱️</div>
                <p class="security-text">
                    <strong>This link expires in 5 minutes</strong><br>
                    For your security, request a new link if this one expires
                </p>
            </div>

            <hr class="divider">

            <p style="color: #6b7280; font-size: 14px; text-align: center; margin-top: 32px;">
                <strong>Didn't request this?</strong><br>
                If you didn't request this sign-in link, you can safely ignore this email. Your account remains secure.
            </p>
        </div>

        <div class="footer">
            <p class="footer-text">
                © 2025 Sylvanity Academy - Empowering professionals with AI expertise<br>
                Professional Development Programs | Amsterdam, Netherlands
            </p>
            <div class="footer-links">
                <a href="https://academy.sylvanity.eu" class="footer-link">Visit Website</a>
                <a href="mailto:academy@sylvanity.eu" class="footer-link">Contact Support</a>
                <a href="https://academy.sylvanity.eu/privacy" class="footer-link">Privacy Policy</a>
            </div>
            <div class="social-links">
                <a href="https://www.linkedin.com/company/sylvanity" class="social-link" title="LinkedIn">in</a>
                <a href="https://x.com/Sylvanity_BV" class="social-link" title="Twitter">𝕏</a>
            </div>
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