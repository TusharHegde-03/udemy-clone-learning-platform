import express from 'express';
import Course from '../models/Course.js';
import mongoose from 'mongoose';

const router = express.Router();

const sampleCourses = [
  {
    title: 'Complete Python Bootcamp',
    instructor: 'Jose Portilla',
    price: 899,
    rating: 4.6,
    students: 1500000,
    thumbnail: 'https://img-c.udemycdn.com/course/480x270/396876_2ed3_12.jpg',
    description: 'Learn Python like a professional. Start from basics and build real-world applications.',
    category: 'Development',
    lectures: 150,
    duration: '22 hours',
  },
  {
    title: 'Machine Learning A-Z',
    instructor: 'Kirill Eremenko',
    price: 1299,
    rating: 4.5,
    students: 890000,
    thumbnail: 'https://img-c.udemycdn.com/course/480x270/950390_270f_3.jpg',
    description: 'Learn to create Machine Learning algorithms in Python and R.',
    category: 'Data Science',
    lectures: 320,
    duration: '42 hours',
  },
  {
    title: 'The Web Developer Bootcamp',
    instructor: 'Colt Steele',
    price: 1099,
    rating: 4.7,
    students: 720000,
    thumbnail: 'https://img-c.udemycdn.com/course/480x270/1565838_e54e_16.jpg',
    description: 'Become a full-stack web developer with HTML, CSS, JS, Node, React, and more.',
    category: 'Development',
    lectures: 280,
    duration: '55 hours',
  },
  {
    title: 'AWS Certified Solutions Architect',
    instructor: 'Stephane Maarek',
    price: 999,
    rating: 4.7,
    students: 520000,
    thumbnail: 'https://img-c.udemycdn.com/course/480x270/268818_486c_4.jpg',
    description: 'Pass the AWS Certified Solutions Architect Associate exam.',
    category: 'Cloud',
    lectures: 180,
    duration: '28 hours',
  },
  {
    title: 'Complete React Developer Course',
    instructor: 'Yihua Zhang',
    price: 799,
    rating: 4.6,
    students: 280000,
    thumbnail: 'https://img-c.udemycdn.com/course/480x270/3216560_0e79_16.jpg',
    description: 'Master React from scratch and build modern web applications.',
    category: 'Development',
    lectures: 200,
    duration: '30 hours',
  },
  {
    title: 'SQL for Data Science',
    instructor: 'Philipp Muellauer',
    price: 699,
    rating: 4.4,
    students: 180000,
    thumbnail: 'https://img-c.udemycdn.com/course/480x270/4095492_978b_2.jpg',
    description: 'Learn SQL for data analysis, data science, and business intelligence.',
    category: 'Data Science',
    lectures: 90,
    duration: '12 hours',
  },
];

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

// GET all courses
router.get('/', async (req, res) => {
  try {
    let courses;
    try {
      await connectDB();
      courses = await Course.find();
      if (courses.length === 0) {
        await Course.insertMany(sampleCourses);
        courses = await Course.find();
      }
    } catch (dbError) {
      console.log('DB connection failed, using sample data:', dbError.message);
      courses = sampleCourses;
    }
    res.json({ success: true, data: courses, message: courses === sampleCourses ? 'Sample data returned (DB unavailable)' : 'Courses fetched from database' });
  } catch (error) {
    res.status(200).json({ success: true, data: sampleCourses, message: 'Sample data returned (fallback)' });
  }
});

// GET single course
router.get('/:id', async (req, res) => {
  try {
    await connectDB();
    const course = await Course.findById(req.params.id);
    if (!course) {
      const sample = sampleCourses.find(c => c.title.toLowerCase().includes(req.params.id.toLowerCase()));
      return res.json({ success: true, data: sample || sampleCourses[0], message: sample ? 'Sample course data' : 'Sample default course' });
    }
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(200).json({ success: true, data: sampleCourses[0], message: 'Sample course data (fallback)' });
  }
});

// POST create course
router.post('/', async (req, res) => {
  try {
    await connectDB();
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
