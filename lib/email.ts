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
      subject: 'Welcome to Sylvanity Academy Newsletter',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header with brand color -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #8FAF91 0%, #264E70 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Welcome to Sylvanity Academy</h1>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Hi ${name || 'there'},</p>

                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">Thank you for subscribing to our newsletter! You'll now receive updates about:</p>

                      <ul style="color: #4b5563; font-size: 16px; line-height: 1.8; margin: 0 0 30px 0; padding-left: 20px;">
                        <li>New AI and Automation training programs</li>
                        <li>Leadership & Management workshops</li>
                        <li>Data & Analytics courses</li>
                        <li>Exclusive early-bird discounts</li>
                        <li>Industry insights and tips</li>
                      </ul>

                      <!-- CTA Button -->
                      <table role="presentation" style="margin: 30px 0; width: 100%;">
                        <tr>
                          <td style="text-align: center; padding: 30px; background-color: #f9fafb; border-radius: 8px;">
                            <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 20px;">Explore Our Training Programs</h3>
                            <p style="color: #6b7280; font-size: 14px; margin: 0 0 20px 0;">Find the perfect fit for your professional development</p>
                            <a href="${process.env.NEXT_PUBLIC_APP_URL}/trainings" style="display: inline-block; background: linear-gradient(135deg, #8FAF91 0%, #264E70 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">View Training Programs</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 10px 0;">
                        Best regards,<br>
                        <strong style="color: #1f2937;">The Sylvanity Academy Team</strong>
                      </p>
                      <p style="color: #6b7280; font-size: 14px; margin: 15px 0 0 0;">
                        Unit 59, FLEX Treubstraat 21, 2288EH Rijswijk, The Netherlands<br>
                        +31 84 83 32 120 | <a href="mailto:academy@sylvanity.eu" style="color: #8FAF91;">academy@sylvanity.eu</a>
                      </p>
                      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                      <p style="color: #9ca3af; font-size: 12px; line-height: 1.5; margin: 0;">
                        You can unsubscribe from these emails at any time by clicking <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe" style="color: #8FAF91; text-decoration: underline;">here</a>.<br>
                        © ${new Date().getFullYear()} <a href="https://sylvanity.eu/" style="color: #8FAF91; text-decoration: none;">Sylvanity B.V.</a> All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
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

export async function sendNewsletterWelcomeBack(email: string, name?: string) {
  if (!isEmailConfigured() || !resend) {
    console.log('📧 Email not configured - Welcome back email would be sent to:', email)
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Sylvanity Academy <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome Back to Sylvanity Academy',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header with brand color -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #8FAF91 0%, #264E70 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Welcome Back to Sylvanity Academy</h1>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Hi ${name || 'there'},</p>

                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">Good to see you again! You're already subscribed to our newsletter, so you won't miss any updates.</p>

                      <div style="background-color: #ecfdf5; border-left: 4px solid #8FAF91; padding: 20px; margin: 25px 0;">
                        <p style="color: #065f46; font-size: 16px; line-height: 1.6; margin: 0;">
                          <strong>You're all set!</strong> We'll keep you updated on our latest training programs, exclusive offers, and industry insights.
                        </p>
                      </div>

                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0;">Here's what you can look forward to:</p>

                      <ul style="color: #4b5563; font-size: 16px; line-height: 1.8; margin: 0 0 30px 0; padding-left: 20px;">
                        <li>New AI and Automation training programs</li>
                        <li>Leadership & Management workshops</li>
                        <li>Data & Analytics courses</li>
                        <li>Exclusive early-bird discounts</li>
                        <li>Industry insights and tips</li>
                      </ul>

                      <!-- CTA Button -->
                      <table role="presentation" style="margin: 30px 0; width: 100%;">
                        <tr>
                          <td style="text-align: center; padding: 30px; background-color: #f9fafb; border-radius: 8px;">
                            <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 20px;">See What's New</h3>
                            <p style="color: #6b7280; font-size: 14px; margin: 0 0 20px 0;">Check out our latest training programs</p>
                            <a href="${process.env.NEXT_PUBLIC_APP_URL}/trainings" style="display: inline-block; background: linear-gradient(135deg, #8FAF91 0%, #264E70 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">View Training Programs</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 10px 0;">
                        Best regards,<br>
                        <strong style="color: #1f2937;">The Sylvanity Academy Team</strong>
                      </p>
                      <p style="color: #6b7280; font-size: 14px; margin: 15px 0 0 0;">
                        Unit 59, FLEX Treubstraat 21, 2288EH Rijswijk, The Netherlands<br>
                        +31 84 83 32 120 | <a href="mailto:academy@sylvanity.eu" style="color: #8FAF91;">academy@sylvanity.eu</a>
                      </p>
                      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                      <p style="color: #9ca3af; font-size: 12px; line-height: 1.5; margin: 0;">
                        You can unsubscribe from these emails at any time by clicking <a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe" style="color: #8FAF91; text-decoration: underline;">here</a>.<br>
                        © ${new Date().getFullYear()} <a href="https://sylvanity.eu/" style="color: #8FAF91; text-decoration: none;">Sylvanity B.V.</a> All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error sending welcome back email:', error)
      return { success: false, error: error.message }
    }

    console.log('📧 Welcome back email sent successfully:', data?.id)
    return { success: true, emailId: data?.id }
  } catch (error) {
    console.error('Email service error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

export async function sendUnsubscribeConfirmation(email: string, name?: string) {
  if (!isEmailConfigured() || !resend) {
    console.log('📧 Email not configured - Unsubscribe confirmation would be sent to:', email)
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Sylvanity Academy <onboarding@resend.dev>',
      to: [email],
      subject: 'You Have Been Unsubscribed - Sylvanity Academy',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #6b7280; padding: 40px 30px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">You've Been Unsubscribed</h1>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Hi ${name || 'there'},</p>

                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">This email confirms that you have been unsubscribed from the Sylvanity Academy newsletter.</p>

                      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 25px 0;">
                        <p style="color: #92400e; font-size: 16px; line-height: 1.6; margin: 0;">
                          <strong>You will no longer receive:</strong><br>
                          Updates about new training programs, exclusive offers, or industry insights from us.
                        </p>
                      </div>

                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 25px 0;">We're sorry to see you go. If you change your mind, you can always subscribe again through our website.</p>

                      <!-- Resubscribe CTA -->
                      <table role="presentation" style="margin: 30px 0; width: 100%;">
                        <tr>
                          <td style="text-align: center; padding: 30px; background-color: #f9fafb; border-radius: 8px;">
                            <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 20px;">Changed Your Mind?</h3>
                            <p style="color: #6b7280; font-size: 14px; margin: 0 0 20px 0;">You can resubscribe anytime</p>
                            <a href="${process.env.NEXT_PUBLIC_APP_URL}/newsletter" style="display: inline-block; background: linear-gradient(135deg, #8FAF91 0%, #264E70 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Subscribe Again</a>
                          </td>
                        </tr>
                      </table>

                      <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0;">
                        If you didn't request this unsubscription or believe this was a mistake, please contact us at <a href="mailto:academy@sylvanity.eu" style="color: #8FAF91;">academy@sylvanity.eu</a>
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 10px 0;">
                        Best regards,<br>
                        <strong style="color: #1f2937;">The Sylvanity Academy Team</strong>
                      </p>
                      <p style="color: #6b7280; font-size: 14px; margin: 15px 0 0 0;">
                        Unit 59, FLEX Treubstraat 21, 2288EH Rijswijk, The Netherlands<br>
                        +31 84 83 32 120 | <a href="mailto:academy@sylvanity.eu" style="color: #8FAF91;">academy@sylvanity.eu</a>
                      </p>
                      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                      <p style="color: #9ca3af; font-size: 12px; line-height: 1.5; margin: 0;">
                        © ${new Date().getFullYear()} <a href="https://sylvanity.eu/" style="color: #8FAF91; text-decoration: none;">Sylvanity B.V.</a> All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error sending unsubscribe confirmation:', error)
      return { success: false, error: error.message }
    }

    console.log('📧 Unsubscribe confirmation sent successfully:', data?.id)
    return { success: true, emailId: data?.id }
  } catch (error) {
    console.error('Email service error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

export async function sendContactFormResponse(email: string, name: string, message: string, promoCode: string, trainingTitle?: string) {
  if (!isEmailConfigured() || !resend) {
    console.log('📧 Email not configured - Contact form response would be sent to:', email)
    return { success: false, error: 'Email service not configured' }
  }

  // Map training titles to their PDF attachments
  const getPdfUrl = (title?: string): string | null => {
    if (!title) return null

    const pdfMap: { [key: string]: string } = {
      'AI & Prompt Engineering Workshop': '/attachments/ai-prompt-engineering-syllabus.pdf',
      'AI-Powered Business Automation': '/attachments/automation-playbook.pdf',
      'Agentic AI Workshop': '/attachments/agentic-ai-blueprint.pdf',
      'Change Management in the AI Era': '/attachments/change-management-toolkit.pdf',
      'Practical Data Analysis for SMEs': '/attachments/data-analysis-workbook.pdf'
    }

    return pdfMap[title] || null
  }

  const pdfPath = getPdfUrl(trainingTitle)
  const pdfUrl = pdfPath ? `${process.env.NEXT_PUBLIC_APP_URL}${pdfPath}` : null

  try {
    const { data, error } = await resend.emails.send({
      from: 'Sylvanity Academy <onboarding@resend.dev>',
      to: [email],
      subject: trainingTitle ? `More Information About ${trainingTitle}` : 'Thank You for Contacting Sylvanity Academy',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header with brand color -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #8FAF91 0%, #264E70 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">Thank You for Reaching Out</h1>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">Hi ${name},</p>

                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">Thank you for ${trainingTitle ? `your interest in <strong>${trainingTitle}</strong>` : 'contacting Sylvanity Academy'}. We have received your message and one of our team members will get back to you within 24 hours.</p>

                      <div style="background-color: #f0fdf4; border-left: 4px solid #8FAF91; padding: 20px; margin: 25px 0;">
                        <p style="color: #065f46; font-size: 16px; line-height: 1.6; margin: 0;">
                          <strong>Your message has been received!</strong><br>
                          We'll review your inquiry and respond as soon as possible.
                        </p>
                      </div>

                      ${pdfUrl ? `
                      <!-- PDF Download Section -->
                      <table role="presentation" style="margin: 30px 0; width: 100%;">
                        <tr>
                          <td style="background-color: #f9fafb; border-left: 4px solid #8FAF91; padding: 20px; border-radius: 8px;">
                            <h3 style="color: #264E70; margin: 0 0 10px 0; font-size: 20px;">📄 Complete Course Information</h3>
                            <p style="color: #4b5563; font-size: 14px; margin: 0 0 15px 0;">Download the detailed syllabus for ${trainingTitle}:</p>
                            <a href="${pdfUrl}" style="display: inline-block; background: linear-gradient(135deg, #8FAF91 0%, #264E70 100%); color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">📥 Download Complete Syllabus (PDF)</a>
                          </td>
                        </tr>
                      </table>
                      ` : ''}

                      <h2 style="color: #1f2937; font-size: 24px; margin: 30px 0 20px 0;">Special Gift: 10% Discount Code</h2>

                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">As a thank you for your interest, we're offering you an exclusive 10% discount on any of our training programs!</p>

                      <!-- Promo Code Box -->
                      <table role="presentation" style="margin: 25px 0; width: 100%;">
                        <tr>
                          <td style="background: linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%); border: 2px solid #8FAF91; padding: 25px; border-radius: 12px; text-align: center;">
                            <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 18px;">Your Exclusive Discount Code</h3>
                            <div style="background: linear-gradient(135deg, #8FAF91 0%, #264E70 100%); color: white; padding: 15px; border-radius: 8px; font-size: 28px; font-weight: bold; letter-spacing: 3px; margin: 15px 0;">${promoCode}</div>
                            <p style="color: #4b5563; font-weight: 600; margin: 10px 0 5px 0; font-size: 16px;">Save 10% on any training!</p>
                            <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0 0;">Valid for 30 days</p>
                          </td>
                        </tr>
                      </table>

                      <!-- CTA Button -->
                      <table role="presentation" style="margin: 30px 0; width: 100%;">
                        <tr>
                          <td style="text-align: center; padding: 30px; background-color: #f9fafb; border-radius: 8px;">
                            <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 20px;">Explore Our Training Programs</h3>
                            <p style="color: #6b7280; font-size: 14px; margin: 0 0 20px 0;">Use your discount code at checkout</p>
                            <a href="${process.env.NEXT_PUBLIC_APP_URL}/trainings" style="display: inline-block; background: linear-gradient(135deg, #8FAF91 0%, #264E70 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Browse Trainings</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb;">
                      <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0 0 10px 0;">
                        Best regards,<br>
                        <strong style="color: #1f2937;">The Sylvanity Academy Team</strong>
                      </p>
                      <p style="color: #6b7280; font-size: 14px; margin: 15px 0 0 0;">
                        Unit 59, FLEX Treubstraat 21, 2288EH Rijswijk, The Netherlands<br>
                        +31 84 83 32 120 | <a href="mailto:academy@sylvanity.eu" style="color: #8FAF91;">academy@sylvanity.eu</a>
                      </p>
                      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
                      <p style="color: #9ca3af; font-size: 12px; line-height: 1.5; margin: 0;">
                        © ${new Date().getFullYear()} <a href="https://sylvanity.eu/" style="color: #8FAF91; text-decoration: none;">Sylvanity B.V.</a> All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error sending contact form response:', error)
      return { success: false, error: error.message }
    }

    console.log('📧 Contact form response sent successfully:', data?.id)
    return { success: true, emailId: data?.id }
  } catch (error) {
    console.error('Email service error:', error)
    return { success: false, error: 'Failed to send email' }
  }
}

export async function sendContactNotificationToAdmin(email: string, name: string, company: string | undefined, message: string) {
  if (!isEmailConfigured() || !resend) {
    console.log('📧 Email not configured - Admin notification would be sent')
    return { success: false, error: 'Email service not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Sylvanity Academy <onboarding@resend.dev>',
      to: ['davarynejad@gmail.com'], // TODO: Change to mohsen@sylvanity.eu after verifying domain
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #264E70 0%, #8FAF91 100%); padding: 30px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 30px;">
                      <h2 style="color: #1f2937; font-size: 20px; margin: 0 0 20px 0;">Contact Details</h2>

                      <table style="width: 100%; margin-bottom: 20px;">
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #4b5563;">Name:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                            <span style="color: #1f2937;">${name}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #4b5563;">Email:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #ffffff; border-bottom: 1px solid #e5e7eb;">
                            <a href="mailto:${email}" style="color: #8FAF91; text-decoration: none;">${email}</a>
                          </td>
                        </tr>
                        ${company ? `
                        <tr>
                          <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                            <strong style="color: #4b5563;">Company:</strong>
                          </td>
                          <td style="padding: 12px; background-color: #f9fafb; border-bottom: 1px solid #e5e7eb;">
                            <span style="color: #1f2937;">${company}</span>
                          </td>
                        </tr>
                        ` : ''}
                      </table>

                      <h3 style="color: #1f2937; font-size: 18px; margin: 25px 0 15px 0;">Message</h3>
                      <div style="background-color: #f9fafb; border-left: 4px solid #8FAF91; padding: 20px; border-radius: 6px;">
                        <p style="color: #1f2937; font-size: 16px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                      </div>

                      <p style="color: #6b7280; font-size: 14px; margin: 25px 0 0 0;">
                        <strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'Europe/Amsterdam' })} (CET)
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f9fafb; padding: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                      <p style="color: #6b7280; font-size: 12px; margin: 0;">
                        This is an automated notification from Sylvanity Academy
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('Error sending admin notification:', error)
      return { success: false, error: error.message }
    }

    console.log('📧 Admin notification sent successfully:', data?.id)
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

  // Map training titles to their PDF attachments
  const getPdfUrl = (title?: string): string | null => {
    if (!title) return null

    const pdfMap: { [key: string]: string } = {
      'AI & Prompt Engineering Workshop': '/attachments/ai-prompt-engineering-syllabus.pdf',
      'AI-Powered Business Automation': '/attachments/automation-playbook.pdf',
      'Agentic AI Workshop': '/attachments/agentic-ai-blueprint.pdf',
      'Change Management in the AI Era': '/attachments/change-management-toolkit.pdf',
      'Practical Data Analysis for SMEs': '/attachments/data-analysis-workbook.pdf'
    }

    return pdfMap[title] || null
  }

  const pdfPath = getPdfUrl(trainingTitle)
  const pdfUrl = pdfPath ? `${process.env.NEXT_PUBLIC_APP_URL}${pdfPath}` : null

  try {
    const { data, error } = await resend.emails.send({
      from: 'Sylvanity Academy <onboarding@resend.dev>',
      to: [email],
      subject: `Your 10% Discount Code: ${promoCode}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #8FAF91;">Your Exclusive 10% Discount! 🎉</h1>
          <p>Hi ${name},</p>
          <p>Thank you for your interest in ${trainingTitle || 'our training programs'}!</p>

          ${pdfUrl ? `
          <div style="background-color: #f9fafb; border-left: 4px solid #8FAF91; padding: 20px; margin: 20px 0;">
            <h3 style="color: #264E70; margin-top: 0;">📄 Complete Course Information</h3>
            <p style="color: #4b5563; margin: 10px 0;">Download the detailed syllabus with all course information:</p>
            <a href="${pdfUrl}" style="display: inline-block; background: linear-gradient(135deg, #8FAF91 0%, #264E70 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 10px;">
              📥 Download Complete Syllabus (PDF)
            </a>
          </div>
          ` : ''}

          <div style="background-color: #f0fdf4; border: 2px solid #8FAF91; padding: 25px; border-radius: 12px; text-align: center; margin: 25px 0;">
            <h2 style="color: #264E70; margin-top: 0;">Your Discount Code</h2>
            <div style="background: linear-gradient(135deg, #8FAF91 0%, #264E70 100%); color: white; padding: 15px; border-radius: 8px; font-size: 24px; font-weight: bold; letter-spacing: 2px;">${promoCode}</div>
            <p style="color: #8FAF91; font-weight: bold; margin: 10px 0;">Save 10% on your training!</p>
            <p style="color: #6b7280; font-size: 14px;">Valid for 30 days</p>
          </div>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/trainings" style="background: linear-gradient(135deg, #8FAF91 0%, #264E70 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Training Programs</a>
          </div>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          <p style="color: #6b7280; font-size: 14px; text-align: center;">
            Unit 59, FLEX Treubstraat 21, 2288EH Rijswijk, The Netherlands<br>
            +31 84 83 32 120 | <a href="mailto:academy@sylvanity.eu" style="color: #8FAF91;">academy@sylvanity.eu</a>
          </p>
          <p style="color: #9ca3af; font-size: 12px; text-align: center;">
            © ${new Date().getFullYear()} <a href="https://sylvanity.eu/" style="color: #8FAF91;">Sylvanity B.V.</a> All rights reserved.
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
              <strong>📞 Need Help?</strong> <a href="${process.env.NEXT_PUBLIC_APP_URL}/contact" style="color: #8FAF91; text-decoration: underline;">Contact us through our contact form</a> or call +31 84 83 32 120
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