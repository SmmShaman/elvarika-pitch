import nodemailer from 'nodemailer';

// Free email service using NodeMailer with Gmail
// User needs to provide Gmail credentials as environment variables
const createTransporter = () => {
  if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
    console.warn('Gmail credentials not provided. Email verification will use demo mode.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD, // App password, not regular password
    },
  });
};

export const sendVerificationEmail = async (
  to: string,
  name: string,
  verificationToken: string
): Promise<boolean> => {
  const transporter = createTransporter();
  
  if (!transporter) {
    console.log(`Demo mode: Verification email would be sent to ${to}`);
    return false; // Return false to indicate demo mode
  }

  // Use Replit domain or fallback to localhost for development
  const baseUrl = process.env.REPLIT_DOMAINS 
    ? `https://${process.env.REPLIT_DOMAINS.split(',')[0]}` 
    : (process.env.BASE_URL || 'http://localhost:5000');
  
  const verificationUrl = `${baseUrl}/api/verify/${verificationToken}`;
  
  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: to,
    subject: 'Elvarika Demo Access - Email Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #022f36;">Verify Your Email for Elvarika Demo</h2>
        <p>Hi ${name},</p>
        <p>Thank you for your interest in Elvarika! Please verify your email address to access our interactive demonstration.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #022f36; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Verify Email & Access Demo
          </a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
        <p>This verification link will expire in 24 hours.</p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">
          This email was sent because you requested access to the Elvarika demo. 
          If you didn't make this request, you can safely ignore this email.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};

// Alternative free services you can integrate:

/* 
1. RESEND.COM (Free tier: 3000 emails/month)
   - Setup: npm install resend
   - Code example:
   
   import { Resend } from 'resend';
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   await resend.emails.send({
     from: 'demo@yourdomain.com',
     to: [to],
     subject: 'Email Verification',
     html: htmlContent,
   });

2. EMAILJS.COM (Free tier: 200 emails/month)
   - Client-side email sending
   - No server required
   - Setup through web interface

3. BREVO (ex-Sendinblue) (Free tier: 300 emails/day)
   - Professional email service
   - Good deliverability rates

4. MAILGUN (Free tier: 5000 emails for 3 months)
   - Professional service
   - Good for high-volume

5. GMAIL + APP PASSWORD (Completely free)
   - Current implementation
   - Good for small scale testing
   - Requires 2FA setup in Gmail
   
To set up Gmail:
1. Enable 2-Factor Authentication in Google Account
2. Generate App Password: Google Account > Security > App passwords
3. Set environment variables:
   - GMAIL_EMAIL=your-email@gmail.com
   - GMAIL_APP_PASSWORD=your-16-char-app-password

For production, recommend Resend or Brevo for better deliverability.
*/