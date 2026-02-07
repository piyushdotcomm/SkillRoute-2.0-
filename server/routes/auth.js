import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from '../models/User.js';

const router = Router();

router.post('/register', async (_req, res) => {
  return res.status(400).json({ error: 'Registration disabled. Use Google Sign-In only.' });
});

router.post('/login', async (_req, res) => {
  return res.status(400).json({ error: 'Password login disabled. Use Google Sign-In.' });
});

// Google sign-in: expects { idToken, email, name, photoURL }
let MEMORY_USERS = {};

router.post('/google', async (req, res) => {
  try {
    const payload = req.body || {};
    // console.log('[AUTH] /google payload:', payload ? Object.keys(payload) : payload);
    const { idToken, email, name, photoURL } = payload;

    if (!idToken || !email) {
      return res.status(400).json({ error: 'Missing idToken or email' });
    }

    let user;

    // Check if Mongo is connected (1 = connected)
    if (mongoose.connection.readyState === 1) {
      try {
        user = await User.findOne({ email }).exec();
        if (!user) {
          user = await User.create({ email, name, photoURL, provider: 'google' });
        } else if ((name && user.name !== name) || (photoURL && user.photoURL !== photoURL)) {
          user.name = name || user.name;
          user.photoURL = photoURL || user.photoURL;
          await user.save();
        }
      } catch (dbErr) {
        console.warn('[AUTH] DB Error, falling back to memory:', dbErr.message);
      }
    }

    // Fallback to memory if no user found (DB down or error)
    if (!user) {
      if (!MEMORY_USERS[email]) {
        MEMORY_USERS[email] = { _id: 'mem-' + Date.now(), email, name, photoURL, provider: 'google' };
      }
      user = MEMORY_USERS[email];
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    res.json({ token, user: { email: user.email, name: user.name, photoURL: user.photoURL } });

  } catch (e) {
    console.error('Google auth error', e);
    res.status(500).json({ error: 'Auth failed', detail: e.message });
  }
});

export default router;
