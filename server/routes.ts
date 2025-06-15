import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDemoRequestSchema } from "@shared/schema";
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

      // In real app, send email with verification link here
      // For demo purposes, return the token (in production, this should be sent via email)
      res.json({ 
        success: true, 
        message: "Demo request submitted. Please check your email for verification.",
        // Remove this in production - only for demo
        verificationToken: verificationToken
      });
    } catch (error) {
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

      res.json({ 
        success: true, 
        message: "Email verified successfully. You can now access the demo.",
        verified: true
      });
    } catch (error) {
      res.status(500).json({ error: "Verification failed" });
    }
  });

  // Check demo access by email
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
