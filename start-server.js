import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from client/src directory
app.use(express.static(path.join(__dirname, 'client', 'src')));
app.use('/assets', express.static(path.join(__dirname, 'attached_assets')));

// Handle all routes by serving the main HTML file
app.get('*', (req, res) => {
  const htmlPath = path.join(__dirname, 'client', 'src', 'index.html');
  if (fs.existsSync(htmlPath)) {
    res.sendFile(htmlPath);
  } else {
    // Fallback to root index.html
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Elvarika server running on port ${PORT}`);
  console.log(`Preview available at http://localhost:${PORT}`);
});