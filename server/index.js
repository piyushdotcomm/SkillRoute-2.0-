import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import geminiRoutes from './routes/gemini.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mongo connection
if (process.env.MONGO_URI) {
	mongoose.connect(process.env.MONGO_URI, { dbName: process.env.MONGO_DB || undefined })
		.then(()=> console.log('[MONGO] Connected'))
		.catch(err=> console.error('[MONGO] Connection error', err.message));
} else {
	console.warn('[MONGO] MONGO_URI not set – user persistence disabled');
}

// Log loaded Gemini config once (without exposing full key)
if (process.env.GEMINI_API_KEY) {
	console.log('[BOOT] GEMINI_API_KEY present (length:', process.env.GEMINI_API_KEY.length, ')');
} else {
	console.log('[BOOT] GEMINI_API_KEY missing');
}
if (process.env.GEMINI_DEBUG) console.log('[BOOT] GEMINI_DEBUG enabled');

// Basic request logging (can replace with morgan or pino later)
app.use((req, res, next) => {
	const start = Date.now();
	res.on('finish', () => {
		const ms = Date.now() - start;
		console.log(`[REQ] ${req.method} ${req.originalUrl} -> ${res.statusCode} ${ms}ms`);
	});
	next();
});

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/gemini', geminiRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
