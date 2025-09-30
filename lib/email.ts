import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export const isEmailConfigured = () => Boolean(process.env.RESEND_API_KEY)

export async function sendNewsletterConfirmation(email: string, name?: string) {
  if (!isEmailConfigured() || !resend) {
    console.log('📧 Email not configured - Newsletter confirmation would be sent to:', email)
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Sylvanity Academy <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to Sylvanity Academy Newsletter!',
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to Sylvanity Academy! 🎉</h1>
        <p>Hi ${name || 'there'},</p>
        <p>Thank you for subscribing to our newsletter! You'll now receive updates about:</p>
        <ul>
          <li>🤖 New AI & Technology training programs</li>
          <li>👥 Leadership & Management workshops</li>
          <li>📊 Data & Analytics courses</li>
          <li>🎯 Exclusive early-bird discounts</li>
          <li>💡 Industry insights and tips</li>
        </ul>
        <p>We're excited to help you stay ahead in the rapidly evolving world of AI and business transformation.</p>
        <div style="background-color: #f0f9ff; border: 2px solid #2563eb; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <h3 style="color: #2563eb; margin-top: 0;">🚀 Get Started Today</h3>
          <p>Browse our current training programs and find the perfect fit for your professional development:</p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/trainings" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Training Programs</a>
        </div>
        <p style="color: #6b7280; font-size: 14px;">Best regards,<br>The Sylvanity Academy Team</p>
        <p style="color: #9ca3af; font-size: 12px;">You can unsubscribe from these emails at any time by clicking <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe" style="color: #9ca3af;">here</a>.</p>
      </div>`,
    })

    if (error) {
      console.error('Error sending newsletter confirmation:', error)
      return { success: false, error: error.message }
    }

    console.log('📧 Newsletter confirmation sent successfully:', data?.id)
    return { success: true, emailId: data?.id }
  } catch (error) {
    console.error('Email service error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

export async function sendDiscountEmail(email: string, name: string, promoCode: string, trainingTitle?: string) {
  if (!isEmailConfigured() || !resend) {
    console.log('📧 Email not configured - Discount email would be sent to:', email)
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Sylvanity Academy <onboarding@resend.dev>',
      to: [email],
      subject: `Your 10% Discount Code: ${promoCode}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Your Exclusive 10% Discount! 🎉</h1>
          <p>Hi ${name},</p>
          <p>Thank you for your interest in ${trainingTitle || 'our training programs'}!</p>
          <div style="background-color: #f0f9ff; border: 2px solid #2563eb; padding: 25px; border-radius: 12px; text-align: center; margin: 25px 0;">
            <h2 style="color: #2563eb; margin-top: 0;">Your Discount Code</h2>
            <div style="background-color: #2563eb; color: white; padding: 15px; border-radius: 8px; font-size: 24px; font-weight: bold; letter-spacing: 2px;">${promoCode}</div>
            <p style="color: #2563eb; font-weight: bold; margin: 10px 0;">Save 10% on your training!</p>
            <p style="color: #6b7280; font-size: 14px;">Valid for 30 days</p>
          </div>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/trainings" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Training Programs</a>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Best regards,<br>The Sylvanity Academy Team
          </p>
        </div>
      `
    })

    if (error) {
      console.error('Error sending discount email:', error)
      return { success: false, error: error.message }
    }

    console.log('📧 Discount email sent successfully:', data?.id)
    return { success: true, emailId: data?.id }
  } catch (error) {
    console.error('Email service error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

export async function sendTrainingConfirmation(
  email: string,
  name: string,
  trainingTitle: string,
  trainingPrice: number,
  currency: string,
  sessionId: string
) {
  if (!isEmailConfigured() || !resend) {
    console.log('📧 Email not configured - Training confirmation would be sent to:', email)
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Sylvanity Academy <onboarding@resend.dev>',
      to: [email],
      subject: `Registration Confirmed: ${trainingTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2563eb;">Registration Confirmed! 🎉</h1>

          <p>Hi ${name},</p>

          <p>Great news! Your registration for <strong>${trainingTitle}</strong> has been confirmed.</p>

          <div style="background-color: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0ea5e9; margin-top: 0;">📋 Registration Details</h3>
            <p><strong>Training:</strong> ${trainingTitle}</p>
            <p><strong>Amount Paid:</strong> ${currency === 'EUR' ? '€' : '$'}${trainingPrice}</p>
            <p><strong>Payment ID:</strong> ${sessionId}</p>
          </div>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2563eb; margin-top: 0;">📅 What's Next?</h3>
            <ul>
              <li>You'll receive detailed training information 7 days before the start date</li>
              <li>Location details and access links will be provided 48 hours prior</li>
              <li>All course materials will be available in your dashboard</li>
            </ul>

            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
               style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin-top: 10px;">
              Access My Dashboard
            </a>
          </div>

          <div style="background-color: #fef3c7; border: 1px solid #fbbf24; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>📞 Need Help?</strong> Contact our support team at support@sylvanity.eu or call +1-555-TRAINING
            </p>
          </div>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

          <p style="color: #6b7280; font-size: 14px;">
            We're excited to have you join us for this transformative learning experience!<br><br>
            Best regards,<br>
            The Sylvanity Academy Team
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending training confirmation:', error)
      return { success: false, error: error.message }
    }

    console.log('📧 Training confirmation sent successfully:', data?.id)
    return { success: true, emailId: data?.id }
  } catch (error) {
    console.error('Email service error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}