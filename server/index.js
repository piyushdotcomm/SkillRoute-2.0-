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
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Mongo connection
if (process.env.MONGO_DB) {
  mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('[MONGO] Connected'))
  .catch(err => console.error('[MONGO] Connection error', err.message));
} else {
  console.warn('[MONGO] MONGO_URI not set – user persistence disabled');
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
