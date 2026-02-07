import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import geminiRoutes from './routes/gemini.js';

dotenv.config();

const app = express();

// ✅ CORS setup (allow React frontend)
app.use(cors({
  origin: [process.env.FRONTEND_URL, "http://localhost:5173", "https://skill-route-2-0.vercel.app"].filter(Boolean),
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Mongo connection
const DB_URI = process.env.MONGO_URI || process.env.MONGO_DB;
export let isMongoConnected = false;

if (DB_URI) {
  mongoose.connect(DB_URI, {
    serverSelectionTimeoutMS: 5000 // Time out quickly
  })
    .then(() => {
      console.log(`[MONGO] Connected to ${DB_URI.split('@').pop()}`);
      isMongoConnected = true;
    })
    .catch(err => {
      console.warn(`[MONGO] Connection failed (${err.message}). Running in OPTIONAL DB mode.`);
      isMongoConnected = false;
    });
} else {
  console.warn('[MONGO] MONGO_URI not set – running in OPTIONAL DB mode');
}

// ✅ Log Gemini config
if (process.env.GEMINI_API_KEY) {
  console.log('[BOOT] GEMINI_API_KEY present (length:', process.env.GEMINI_API_KEY.length, ')');
} else {
  console.log('[BOOT] GEMINI_API_KEY missing');
}
if (process.env.GEMINI_DEBUG) console.log('[BOOT] GEMINI_DEBUG enabled');

// ✅ Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`[REQ] ${req.method} ${req.originalUrl} -> ${res.statusCode} ${ms}ms`);
  });
  next();
});

// Routes
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/gemini', geminiRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
