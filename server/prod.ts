// File: server/prod.ts
import express, { type Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { registerRoutes } from "./routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ======================================================================
// ВИПРАВЛЕННЯ №1: Правильний і простий спосіб обслуговувати статичні файли
// Express буде шукати файли в папці 'dist/public' відносно кореня проекту.
app.use(express.static("dist/public"));
// ======================================================================

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // ======================================================================
  // ВИПРАВЛЕННЯ №2: Правильний шлях до index.html для всіх інших запитів,
  // що не є API-запитами. Це потрібно для React Router.
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) {
      // Якщо це API запит, але для нього не знайдено роут, він пройде далі
      return next();
    }
    // Для всіх інших шляхів віддаємо головну сторінку фронтенду
    res.sendFile(path.resolve("dist/public/index.html"));
  });
  // ======================================================================

  const port = process.env.PORT || 8080;

  server.listen({ port, host: "0.0.0.0" }, () => {
    console.log(`Production server listening on port ${port}`);
  });
})();
