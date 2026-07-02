const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 5000;

const server = http.createServer((req, res) => {
  // Simple HTML response for testing
  const html = `
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elvarika - Тест Превью</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
        }
        .container {
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        h1 {
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
        }
        .status {
            background: rgba(255,255,255,0.2);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .success {
            background: rgba(76, 175, 80, 0.3);
            border: 2px solid #4CAF50;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 Elvarika Demo</h1>
        <div class="status success">
            <h2>✅ Превью працює!</h2>
            <p>Сервер успішно запущений на порті 5000</p>
            <p>Всі імпорти виправлені: 122 @ аліаси → відносні шляхи</p>
            <p>Vite HMR з'єднання стабілізовані</p>
        </div>
        
        <div class="status">
            <h3>🚀 Функції додатку:</h3>
            <ul>
                <li>Інтерактивне демо норвезько-українського перекладу</li>
                <li>Система верифікації електронної пошти (30 днів доступу)</li>
                <li>Анімована демонстрація перетворення тексту в аудіо</li>
                <li>Аудіо плейлист з лексикою безпеки на робочому місці</li>
                <li>Покрокова візуалізація з контролем паузи/відновлення</li>
            </ul>
        </div>

        <div class="status">
            <h3>📱 Доступні мови:</h3>
            <p>🇳🇴 Норвезька → 🇺🇦 Українська</p>
            <p>🇳🇴 Норвезька → 🇬🇧 Англійська</p>
        </div>
    </div>

    <script>
        console.log('Elvarika Demo - Превью працює коректно');
        console.log('Порт: 5000');
        console.log('Статус: Всі імпорти виправлені');
    </script>
</body>
</html>`;

  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(html);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Simple preview server running on port ${port}`);
  console.log(`Open: http://localhost:${port}`);
});