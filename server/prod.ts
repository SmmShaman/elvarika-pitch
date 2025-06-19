// File: server/prod.ts
import express, { type Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { registerRoutes } from "./routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// --- Секція обслуговування статичних файлів для Production ---
const clientDistPath = path.resolve(
  import.meta.dirname,
  "..",
  "client",
  "dist",
);
console.log(`Serving static files from: ${clientDistPath}`);
app.use(express.static(clientDistPath));
// --- Кінець секції ---

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // Для production, ми обслуговуємо index.html на всі не-API запити
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api/")) {
      res.sendFile(path.resolve(clientDistPath, "index.html"));
    }
  });

  const port = process.env.PORT || 8080; // Cloud Run використовує 8080 за замовчуванням

  server.listen({ port, host: "0.0.0.0" }, () => {
    console.log(`Production server listening on port ${port}`);
  });
})();
