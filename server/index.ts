import express, { type Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { registerRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve attached assets (including audio files)
app.use("/attached_assets", express.static("attached_assets"));
// Serve English audio files separately
app.use("/audio/en", express.static("attached_assets/audio/en"));
app.use("/audio/uk", express.static("attached_assets/audio"));

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;
  
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      console.log(logLine);
    }
  });
  next();
});

(async () => {
  // Умовний імпорт vite тільки для development
  let setupVite, serveStatic;
  
  if (process.env.NODE_ENV === "development") {
    try {
      const viteModule = await import("./vite.js");
      setupVite = viteModule.setupVite;
      serveStatic = viteModule.serveStatic;
    } catch (error) {
      console.log("Vite module not found, running in production mode");
      setupVite = () => Promise.resolve();
      serveStatic = (app: any) => {
        app.use(express.static("client/dist"));
      };
    }
  } else {
    // Production заглушки
    setupVite = () => Promise.resolve();
    serveStatic = (app: any) => {
      app.use(express.static("client/dist"));
    };
  }

  const server = await registerRoutes(app);
  
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Setup vite in development, serve static in production
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = process.env.PORT || 5000;
  
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    console.log(`serving on port ${port}`);
  });
})();
