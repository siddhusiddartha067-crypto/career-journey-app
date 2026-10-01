import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');

// Health check endpoint for Cloud Run and monitoring
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static assets from dist folder
app.use(express.static(distPath));

// SPA fallback: serve index.html for all client routes
app.get('*', (_req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Application build not found. Please ensure npm run build has completed.');
  }
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`Career Journey server running at http://0.0.0.0:${PORT}`);
});
