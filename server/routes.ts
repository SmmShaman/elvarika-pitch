import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { insertDemoRequestSchema } from "../shared/schema.js";
import { sendVerificationEmail } from "./email.js";
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
        verificationToken,
      );

      if (emailSent) {
        res.json({
          success: true,
          message:
            "Demo request submitted. Please check your email for verification.",
          emailSent: true,
        });
      } else {
        // Demo mode - return token for testing
        res.json({
          success: true,
          message:
            "Demo request submitted. Please check your email for verification.",
          emailSent: false,
          // Remove this in production - only for demo when email service is not configured
          verificationToken: verificationToken,
          demoNote:
            "Email service not configured. Use the token above for testing.",
        });
      }
    } catch (error) {
      console.error("Demo request error:", error);
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  // Email verification
  app.get("/api/verify/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const verifiedRequest = await storage.verifyDemoRequest(token);

      if (!verifiedRequest) {
        return res
          .status(404)
          .json({ error: "Invalid or expired verification token" });
      }

      // Set verification cookie that expires in 30 days
      res.cookie("demo_verified", verifiedRequest.email, {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      // Redirect to home page with success message
      res.redirect("/?verified=true");
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
          needsVerification: true,
        });
      }

      // Double-check that the email is still verified in our database
      const verifiedRequest =
        await storage.getDemoRequestByEmail(verifiedEmail);

      if (!verifiedRequest?.isVerified) {
        // Clear invalid cookie
        res.clearCookie("demo_verified");
        return res.json({
          hasAccess: false,
          verified: false,
          needsVerification: true,
        });
      }

      res.json({
        hasAccess: true,
        verified: true,
        needsVerification: false,
        email: verifiedEmail,
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
        verified: !!verifiedRequest?.isVerified,
      });
    } catch (error) {
      res.status(500).json({ error: "Access check failed" });
    }
  });

  // Simple status check
  app.get("/status", (req, res) => {
    res.json({ 
      status: "OK", 
      message: "Server working", 
      timestamp: new Date().toISOString(),
      routes: ["/test-preview", "/api/check-demo-access"] 
    });
  });

  // Test route for preview with animated hero section
  app.get("/test-preview", (req, res) => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elvarika - Hero Section Preview</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow-x: hidden;
        }
        .hero-section {
            position: relative;
            width: 100%;
            min-height: 100vh;
            background: linear-gradient(135deg, #0066cc, #00a1e6, #022f36);
            overflow: hidden;
            display: flex;
            align-items: center;
        }
        .floating-element {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            animation: float 8s ease-in-out infinite;
        }
        .element-1 { top: 10%; left: 5%; width: 80px; height: 80px; animation-delay: 0s; }
        .element-2 { top: 30%; right: 20%; width: 60px; height: 60px; animation-delay: 2s; }
        .element-3 { bottom: 25%; left: 25%; width: 40px; height: 40px; animation-delay: 4s; transform: rotate(45deg); border-radius: 8px; }
        .element-4 { top: 50%; right: 8%; width: 50px; height: 50px; animation-delay: 6s; background: none; border: 2px solid rgba(255, 255, 255, 0.1); }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .content {
            position: relative;
            z-index: 10;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            align-items: center;
        }
        
        .text-content h1 {
            font-size: 48px;
            font-weight: 600;
            color: white;
            line-height: 1.2;
            margin-bottom: 24px;
            text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
            animation: slideInLeft 1.2s ease-out;
        }
        
        .text-content p {
            font-size: 18px;
            color: rgba(255, 255, 255, 0.9);
            line-height: 1.6;
            margin-bottom: 32px;
            text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
            animation: slideInLeft 1.4s ease-out;
        }
        
        .cta-button {
            display: inline-block;
            padding: 12px 32px;
            background: rgba(255, 255, 255, 0.9);
            color: #022f36;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            animation: slideInLeft 1.6s ease-out;
        }
        
        .cta-button:hover {
            background: white;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        
        .demo-showcase {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 32px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: slideInRight 1.2s ease-out;
        }
        
        .demo-steps {
            display: flex;
            justify-content: space-between;
            margin-bottom: 24px;
        }
        
        .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: white;
        }
        
        .step-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-bottom: 8px;
            animation: pulse 2s ease-in-out infinite;
        }
        
        .step-label {
            font-size: 12px;
            text-align: center;
        }
        
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @media (max-width: 768px) {
            .content { grid-template-columns: 1fr; gap: 20px; }
            .text-content h1 { font-size: 36px; }
            .hero-section { padding: 40px 0; }
        }
    </style>
</head>
<body>
    <section class="hero-section">
        <div class="floating-element element-1"></div>
        <div class="floating-element element-2"></div>
        <div class="floating-element element-3"></div>
        <div class="floating-element element-4"></div>
        
        <div class="content">
            <div class="text-content">
                <h1>Розумне навчання мови для професіоналів</h1>
                <p>Перетворюємо складні норвезькі тексти на персоналізовані аудіословники з контекстом та перекладом за 30 секунд.</p>
                <a href="#" class="cta-button">Подивись як це працює</a>
            </div>
            
            <div class="demo-showcase">
                <div class="demo-steps">
                    <div class="step">
                        <div class="step-circle">1</div>
                        <div class="step-label">Текст</div>
                    </div>
                    <div class="step">
                        <div class="step-circle">2</div>
                        <div class="step-label">Аналіз</div>
                    </div>
                    <div class="step">
                        <div class="step-circle">3</div>
                        <div class="step-label">Контекст</div>
                    </div>
                    <div class="step">
                        <div class="step-circle">4</div>
                        <div class="step-label">Переклад</div>
                    </div>
                    <div class="step">
                        <div class="step-circle">5</div>
                        <div class="step-label">Аудіо</div>
                    </div>
                </div>
                <p style="color: rgba(255, 255, 255, 0.8); text-align: center; font-size: 14px;">
                    Анімована героїчна секція з динамічним фоном працює!
                </p>
            </div>
        </div>
    </section>
</body>
</html>`;
    
    res.set('Content-Type', 'text/html');
    res.send(html);
  });

  const httpServer = createServer(app);

  return httpServer;
}
