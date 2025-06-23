import express, { type Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { registerRoutes } from "./routes.js";
import { createServer as createViteServer } from "vite";
import path from "path";

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

  // Створюємо Vite сервер з дозволом всіх хостів
  const vite = await createViteServer({
    root: path.resolve(process.cwd(), "client"),
    configFile: false,
    server: {
      host: "0.0.0.0",
      middlewareMode: true,
      allowedHosts: "all", // Дозволяємо всі хости
      hmr: {
        clientPort: 443,
      },
    },
    appType: "custom",
  });

  app.use(vite.middlewares);

  // Обробка всіх не-API запитів
  app.use("*", async (req, res, next) => {
    if (req.originalUrl.startsWith("/api")) {
      return next();
    }

    try {
      const template = await vite.transformIndexHtml(
        req.originalUrl,
        `
        <!doctype html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Elvarika - Професійне мовне навчання</title>
          </head>
          <body>
            <div id="root"></div>
            <script type="module" src="/src/main.tsx"></script>
          </body>
        </html>
      `,
      );

      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  const port = Number(process.env.PORT) || 5000;

  server.listen(port, "0.0.0.0", () => {
    console.log(`Fixed development server running on port ${port}`);
    console.log(`Allowed hosts: all`);
  });
})();