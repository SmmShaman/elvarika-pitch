import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5000;

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  
  if (req.url === '/') {
    filePath = './index.html';
  } else if (req.url === '/test-preview' || req.url === '/demo') {
    filePath = './index.html';
  }
  
  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.ico': 'image/x-icon'
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // 404 - File not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
          <h1>404 - Сторінка не знайдена</h1>
          <p>Доступні сторінки:</p>
          <ul>
            <li><a href="/">Головна</a></li>
            <li><a href="/test-preview">Тест демо</a></li>
            <li><a href="/demo">Демо</a></li>
          </ul>
        `);
      } else {
        // 500 - Server error
        res.writeHead(500);
        res.end('Помилка сервера: ' + error.code);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Elvarika server running on port ${PORT}`);
  console.log(`Available routes:`);
  console.log(`- http://localhost:${PORT}/`);
  console.log(`- http://localhost:${PORT}/test-preview`);
  console.log(`- http://localhost:${PORT}/demo`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});