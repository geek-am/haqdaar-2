// Vercel entry point: every request is rewritten here (see vercel.json) and handed to the Express app.
import { connectDB } from '../src/config/db.js';
import { createApp } from '../src/app.js';

const app = createApp();

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}
