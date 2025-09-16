import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  name: { type: String },
  provider: { type: String, enum: ['google','local'], default: 'local' },
  photoURL: { type: String },
  passwordHash: { type: String },
  // Additional fields can be added (roles, preferences, etc.)
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
