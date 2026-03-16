import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import mongoose from 'mongoose';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Connect to MongoDB - handle serverless functions properly
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/udemy-clone', {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    bufferCommands: false,
  });
  return mongoose.connection;
};

// In-memory demo users (fallback when DB is unavailable)
const demoUsers = [
  { email: 'demo@udemy.com', password: await bcrypt.hash('demo123', 10), name: 'Demo User' }
];

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    try {
      await connectDB();
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
      res.status(201).json({ message: 'User registered successfully', token, user: { name, email } });
    } catch (dbError) {
      // Fallback: demo registration (for testing without DB)
      const demoUser = demoUsers.find(u => u.email === email);
      if (demoUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      demoUsers.push({ email, name, password: await bcrypt.hash(password, 10) });
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
      res.status(201).json({ message: 'Demo registration successful (DB unavailable)', token, user: { name, email } });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
      await connectDB();
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ message: 'Login successful', token, user: { name: user.name, email: user.email } });
    } catch (dbError) {
      // Fallback: demo login (for testing without DB)
      const demoUser = demoUsers.find(u => u.email === email);
      if (demoUser) {
        const isMatch = await bcrypt.compare(password, demoUser.password);
        if (isMatch) {
          const token = jwt.sign({ email: demoUser.email }, JWT_SECRET, { expiresIn: '7d' });
          return res.json({ message: 'Demo login successful (DB unavailable)', token, user: { name: demoUser.name, email: demoUser.email } });
        }
      }
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
