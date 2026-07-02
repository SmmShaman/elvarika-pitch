const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

// Serve static files from client directory
app.use(express.static(path.join(__dirname, 'client')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Test server running on port ${port}`);
});