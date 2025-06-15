import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDemoRequestSchema } from "@shared/schema";
import { sendVerificationEmail } from "./email";
import crypto from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Demo request submission
  app.post("/api/demo-request", async (req, res) => {
    try {
      const validatedData = insertDemoRequestSchema.parse(req.body);
      const verificationToken = crypto.randomUUID();
      
      const demoRequest = await storage.createDemoRequest({
        ...validatedData,
        verificationToken,
      });

      // Try to send email verification
      const emailSent = await sendVerificationEmail(
        validatedData.email,
        validatedData.name,
        verificationToken
      );

      if (emailSent) {
        res.json({ 
          success: true, 
          message: "Demo request submitted. Please check your email for verification.",
          emailSent: true
        });
      } else {
        // Demo mode - return token for testing
        res.json({ 
          success: true, 
          message: "Demo request submitted. Please check your email for verification.",
          emailSent: false,
          // Remove this in production - only for demo when email service is not configured
          verificationToken: verificationToken,
          demoNote: "Email service not configured. Use the token above for testing."
        });
      }
    } catch (error) {
      console.error('Demo request error:', error);
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  // Email verification
  app.get("/api/verify/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const verifiedRequest = await storage.verifyDemoRequest(token);
      
      if (!verifiedRequest) {
        return res.status(404).json({ error: "Invalid or expired verification token" });
      }

      // Set verification cookie that expires in 30 days
      res.cookie('demo_verified', verifiedRequest.email, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });

      res.json({ 
        success: true, 
        message: "Email verified successfully. You can now access the demo.",
        verified: true
      });
    } catch (error) {
      res.status(500).json({ error: "Verification failed" });
    }
  });

  // Check demo access by cookie
  app.get("/api/check-demo-access", async (req, res) => {
    try {
      const verifiedEmail = req.cookies?.demo_verified;
      
      if (!verifiedEmail) {
        return res.json({ 
          hasAccess: false,
          verified: false,
          needsVerification: true
        });
      }

      // Double-check that the email is still verified in our database
      const verifiedRequest = await storage.getDemoRequestByEmail(verifiedEmail);
      
      if (!verifiedRequest?.isVerified) {
        // Clear invalid cookie
        res.clearCookie('demo_verified');
        return res.json({ 
          hasAccess: false,
          verified: false,
          needsVerification: true
        });
      }

      res.json({ 
        hasAccess: true,
        verified: true,
        needsVerification: false,
        email: verifiedEmail
      });
    } catch (error) {
      res.status(500).json({ error: "Access check failed" });
    }
  });

  // Check demo access by email (fallback method)
  app.post("/api/check-demo-access", async (req, res) => {
    try {
      const { email } = req.body;
      const verifiedRequest = await storage.getDemoRequestByEmail(email);
      
      res.json({ 
        hasAccess: !!verifiedRequest,
        verified: !!verifiedRequest?.isVerified
      });
    } catch (error) {
      res.status(500).json({ error: "Access check failed" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
