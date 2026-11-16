import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { store } from './utils/storage.js';

import authRoutes from './routes/authRoutes.js';
import petRoutes from './routes/petRoutes.js';
import adoptionRoutes from './routes/adoptionRoutes.js';
import verificationRoutes from './routes/verificationRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import lostFoundRoutes from './routes/lostFoundRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static uploads folder
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Pet Love API',
    bilingual: ['English', 'Telugu (తెలుగు)'],
    totalPets: store.getPets().length,
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/verifications', verificationRoutes);
app.use('/api/care-reminders', reminderRoutes);
app.use('/api/lost-found', lostFoundRoutes);
app.use('/api/admin', adminRoutes);

// Serve Frontend production build if available
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  // Client-side routing catch-all
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error occurred.'
  });
});

// Initialize database & start server
const startServer = async () => {
  await connectDB();
  await store.syncFromMongoDB();

  app.listen(PORT, () => {
    console.log(`🐾 Pet Love Full-Stack Server running on http://localhost:${PORT}`);
    console.log(`✨ Available Pets Loaded: ${store.getPets().filter(p => p.adoptionStatus === 'available').length}`);
  });
};

startServer();
