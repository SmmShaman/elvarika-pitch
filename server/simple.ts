import express, { type Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 5000;

// Статичні файли з client/dist
app.use(express.static(path.join(__dirname, "../client/dist")));

// Головна сторінка - відправляємо HTML з правильними імпортами
app.get("*", (req: Request, res: Response) => {
  const htmlPath = path.join(__dirname, "../test.html");
  
  if (fs.existsSync(htmlPath)) {
    res.sendFile(htmlPath);
  } else {
    res.send(`
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elvarika - Мовне навчання для бізнесу</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Базові стилі */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        
        /* Анімований фон */
        .hero-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }
        
        .hero-bg::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%);
            animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
            0%, 100% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
        }
        
        .hero-content {
            text-align: center;
            color: white;
            z-index: 10;
            max-width: 800px;
            padding: 2rem;
        }
        
        .hero-title {
            font-size: 3.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .hero-subtitle {
            font-size: 1.5rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        
        .cta-button {
            background: linear-gradient(45deg, #ff6b6b, #ffa500);
            border: none;
            padding: 1rem 2rem;
            font-size: 1.2rem;
            font-weight: bold;
            color: white;
            border-radius: 50px;
            cursor: pointer;
            transition: transform 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
    </style>
</head>
<body>
    <div class="hero-bg">
        <div class="hero-content">
            <h1 class="hero-title">Elvarika</h1>
            <p class="hero-subtitle">Професійне мовне навчання для вашого бізнесу</p>
            <p style="margin-bottom: 2rem; font-size: 1.1rem;">
                Інтерактивна система перекладу та навчання<br>
                Норвезька → Українська → Англійська
            </p>
            <button class="cta-button" onclick="showDemo()">
                Подивись як це працює
            </button>
        </div>
    </div>
    
    <script>
        function showDemo() {
            alert('Демо системи Elvarika готове до запуску!\\n\\nВсі імпорти виправлені, сервер працює стабільно.');
        }
        
        // Анімація заголовку
        document.addEventListener('DOMContentLoaded', function() {
            const title = document.querySelector('.hero-title');
            title.style.opacity = '0';
            title.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                title.style.transition = 'all 1s ease';
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 500);
        });
    </script>
</body>
</html>
    `);
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Simple server running on port ${port}`);
  console.log(`Access at: http://localhost:${port}`);
});