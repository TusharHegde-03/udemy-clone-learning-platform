import express from 'express';
import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import mongoose from 'mongoose';

const router = express.Router();

// Enroll a user in a course
router.post('/enroll', async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    
    if (!userId || !courseId) {
      return res.status(400).json({ message: 'userId and courseId are required' });
    }
    
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if already enrolled
    const existing = await Enrollment.findOne({ userId, courseId });
    if (existing) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }
    
    // Create enrollment
    const enrollment = new Enrollment({ userId, courseId });
    await enrollment.save();
    
    res.status(201).json({ message: 'Successfully enrolled', enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's enrolled courses
router.get('/my-courses/:userId', async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.params.userId })
      .populate('courseId')
      .exec();
    
    const courses = enrollments.map(e => e.courseId);
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Check if user is enrolled in course
router.get('/check/:userId/:courseId', async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      userId: req.params.userId,
      courseId: req.params.courseId
    });
    
    res.json({ isEnrolled: !!enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update progress
router.put('/progress/:enrollmentId', async (req, res) => {
  try {
    const { progress, completed } = req.body;
    
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.enrollmentId,
      { progress, completed, completionDate: completed ? new Date() : null },
      { new: true }
    );
    
    res.json({ message: 'Progress updated', enrollment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
