import mongoose from 'mongoose';
import { env } from './env.js';

// On Vercel each warm function instance reuses this connection instead of opening a new one per request.
let connecting = null;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  if (!connecting) {
    mongoose.set('strictQuery', true);
    connecting = mongoose.connect(env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
      .then(() => console.log(`MongoDB connected: ${mongoose.connection.name}`))
      .catch((err) => { connecting = null; throw err; });
  }
  await connecting;
}
