import type { Express } from "express";
import type { Server } from "http";
import { createServer as createViteServer } from "vite";
import path from "path";

export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    // Вказуємо корінь нашого фронтенд-додатку
    root: path.resolve(process.cwd(), "client"),
    // Ігноруємо зовнішній конфіг, щоб уникнути плутанини
    configFile: false,
    server: {
      // ==========================================================
      // ОСЬ КЛЮЧОВІ НАЛАШТУВАННЯ ДЛЯ РОБОТИ В REPLIT
      // ==========================================================
      host: "0.0.0.0", // Слухаємо на всіх інтерфейсах
      middlewareMode: true, // Включаємо режим middleware для інтеграції з Express
      hmr: {
        // Налаштування для Hot Module Replacement (HMR) за проксі Replit
        server, // HMR буде працювати на нашому існуючому http-сервері
        clientPort: 443,
      },
    },
    appType: "custom",
  });

  // Підключаємо Vite як middleware до нашого Express-додатку
  app.use(vite.middlewares);

  // Цей блок потрібен, щоб React Router працював коректно
  // Він віддає index.html на будь-який запит, що не є API
  app.use("*", async (req, res, next) => {
    // Пропускаємо API-запити
    if (req.originalUrl.startsWith("/api")) {
      return next();
    }

    try {
      // 1. Читаємо наш основний HTML-шаблон
      const template = await vite.transformIndexHtml(
        req.originalUrl,
        `
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Vite + React + TS</title>
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="/src/main.tsx"></script>
          </body>
        </html>
      `,
      );

      // 2. Віддаємо оброблену сторінку
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
