import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

router.get('/enrolled', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('enrolledCourses');
    res.json(user.enrolledCourses || []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enrolled courses', error: error.message });
  }
});

router.post('/enroll/:courseId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user.enrolledCourses.includes(req.params.courseId)) {
      user.enrolledCourses.push(req.params.courseId);
      await user.save();
    }
    res.json({ message: 'Successfully enrolled' });
  } catch (error) {
    res.status(500).json({ message: 'Enrollment failed', error: error.message });
  }
});

export default router;
