// File: server/dev.ts
import express, { type Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { registerRoutes } from "./routes.js";
import { setupVite } from "./vite.js"; // Прямий імпорт Vite хелпера

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Налаштування Vite для HMR
  await setupVite(app, server);

  const port = process.env.PORT || 5000;

  server.listen({ port, host: "0.0.0.0" }, () => {
    console.log(`Development server with Vite listening on port ${port}`);
  });
})();
