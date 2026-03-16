import express from 'express';
import Course from '../models/Course.js';
import mongoose from 'mongoose';

const router = express.Router();

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/udemy-clone', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

// Sample courses with YouTube videos
const sampleCourses = [
  {
    title: 'Complete Python Bootcamp',
    instructor: 'Jose Portilla',
    description: 'Learn Python like a professional. Start from basics and build real-world applications.',
    category: 'Development',
    price: 0,
    rating: 4.6,
    students: 1500000,
    thumbnail: 'https://img-c.udemycdn.com/course/480x270/396876_2ed3_12.jpg',
    videoUrl: 'https://www.youtube.com/embed/rfscVS0vtik',
    duration: '22 hours',
    lectures: 150,
    level: 'Beginner'
  },
  {
    title: 'Machine Learning A-Z',
    instructor: 'Kirill Eremenko',
    description: 'Master Machine Learning with Python, R, and Machine Learning algorithms.',
    category: 'Development',
    price: 0,
    rating: 4.5,
    students: 890000,
    thumbnail: 'https://img-c.udemycdn.com/course/480x270/950390_270f_3.jpg',
    videoUrl: 'https://www.youtube.com/embed/GwIo3gDZCVQ',
    duration: '40 hours',
    lectures: 300,
    level: 'Intermediate'
  },
  {
    title: 'Web Development Bootcamp',
    instructor: 'Colt Steele',
    description: 'Learn web development from scratch with HTML, CSS, JavaScript, React, Node.js and more.',
    category: 'Development',
    price: 0,
    rating: 4.7,
    students: 2000000,
    thumbnail: 'https://img-c.udemycdn.com/course/480x270/1028592_68c6_2.jpg',
    videoUrl: 'https://www.youtube.com/embed/jG7uLcjwgP0',
    duration: '63 hours',
    lectures: 420,
    level: 'Beginner'
  },
  {
    title: 'Advanced JavaScript',
    instructor: 'Jonas Schmedtmann',
    description: 'Master advanced JavaScript concepts including closures, prototypes, async/await, and more.',
    category: 'Development',
    price: 0,
    rating: 4.8,
    students: 750000,
    thumbnail: 'https://img-c.udemycdn.com/course/480x270/768998_03c5.jpg',
    videoUrl: 'https://www.youtube.com/embed/W6NZfCO5tTE',
    duration: '28 hours',
    lectures: 240,
    level: 'Advanced'
  },
  {
    title: 'React.js Complete Course',
    instructor: 'Stephen Grider',
    description: 'Build amazing single page applications with React, Redux, Firebase and more.',
    category: 'Development',
    price: 0,
    rating: 4.6,
    students: 1200000,
    thumbnail: 'https://img-c.udemycdn.com/course/480x270/923574_8457_2.jpg',
    videoUrl: 'https://www.youtube.com/embed/4UZrsTqkcW4',
    duration: '32 hours',
    lectures: 280,
    level: 'Intermediate'
  },
  {
    title: 'Node.js & Express Backend',
    instructor: 'Andrew Mead',
    description: 'Build complete REST APIs with Node.js, Express, MongoDB and JWT authentication.',
    category: 'Development',
    price: 0,
    rating: 4.7,
    students: 950000,
    thumbnail: 'https://img-c.udemycdn.com/course/480x270/1156788_810f_2.jpg',
    videoUrl: 'https://www.youtube.com/embed/0B2raQ-ZLV0',
    duration: '35 hours',
    lectures: 310,
    level: 'Intermediate'
  },
  {
    title: 'Data Science with Python',
    instructor: 'Udemy Team',
    description: 'Learn data analysis, visualization, and machine learning with Python libraries like Pandas and NumPy.',
    category: 'Data Science',
    price: 0,
    rating: 4.5,
    students: 680000,
    thumbnail: 'https://img-c.udemycdn.com/course/480x270/1384056_00a6.jpg',
    videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30',
    duration: '20 hours',
    lectures: 180,
    level: 'Beginner'
  },
  {
    title: 'AWS Certified Solutions Architect',
    instructor: 'A Cloud Guru',
    description: 'Pass the AWS Solutions Architect exam with comprehensive training and hands-on labs.',
    category: 'Cloud Computing',
    price: 0,
    rating: 4.6,
    students: 500000,
    thumbnail: 'https://img-c.udemycdn.com/course/480x270/1196278_31a3.jpg',
    videoUrl: 'https://www.youtube.com/embed/Ia-UEYMA44s',
    duration: '25 hours',
    lectures: 200,
    level: 'Advanced'
  }
];

// Get all courses
router.get('/', async (req, res) => {
  try {
    await connectDB();
    
    // Try to get from MongoDB
    let courses = await Course.find();
    
    // If no courses in DB, return sample courses
    if (courses.length === 0) {
      return res.json(sampleCourses);
    }
    
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    // Return sample courses as fallback
    res.json(sampleCourses);
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    await connectDB();
    
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      // Try to find in sample courses
      const sampleCourse = sampleCourses.find(c => c.title === req.params.id);
      if (sampleCourse) return res.json(sampleCourse);
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create course (for admin)
router.post('/', async (req, res) => {
  try {
    await connectDB();
    
    const course = new Course(req.body);
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
