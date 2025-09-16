import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

const router = Router();

router.post('/register', async (_req, res) => {
  return res.status(400).json({ error: 'Registration disabled. Use Google Sign-In only.' });
});

router.post('/login', async (_req, res) => {
  return res.status(400).json({ error: 'Password login disabled. Use Google Sign-In.' });
});

// Google sign-in: expects { idToken, email, name, photoURL }
// For simplicity (no firebase-admin now), we'll trust the idToken presence.
// TODO: Integrate firebase-admin to verify ID token signature.
router.post('/google', async (req, res) => {
  try {
    const { idToken, email, name, photoURL } = req.body || {};
    if (!idToken) return res.status(400).json({ error: 'Missing idToken' });
    if (!email) return res.status(400).json({ error: 'Missing email' });
    let user = await User.findOne({ email }).exec();
    if (!user) {
      user = await User.create({ email, name, photoURL, provider: 'google' });
    } else if ((name && user.name !== name) || (photoURL && user.photoURL !== photoURL)) {
      user.name = name || user.name;
      user.photoURL = photoURL || user.photoURL;
      await user.save();
    }
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });
    res.json({ token, user: { email: user.email, name: user.name, photoURL: user.photoURL } });
  } catch (e) {
    console.error('Google auth error', e);
    res.status(500).json({ error: 'Auth failed' });
  }
});

export default router;
