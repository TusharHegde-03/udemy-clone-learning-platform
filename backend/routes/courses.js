import express from 'express';
import Course from '../models/Course.js';

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
    duration: '22 hours'
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
    duration: '42 hours'
  },
  {
    title: 'Web Development Bootcamp',
    instructor: 'Dr. Angela Yu',
    price: 1099,
    rating: 4.7,
    students: 720000,
    thumbnail: 'https://img-c.udemycdn.com/course/480x270/1565838_e54e_16.jpg',
    description: 'Become a full-stack web developer with HTML, CSS, JS, Node, React, and more.',
    category: 'Development',
    lectures: 280,
    duration: '55 hours'
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
    duration: '28 hours'
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
    duration: '30 hours'
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
    duration: '12 hours'
  }
];

router.get('/', async (req, res) => {
  try {
    let courses = await Course.find();
    if (courses.length === 0) {
      await Course.insertMany(sampleCourses);
      courses = await Course.find();
    }
    const { search, category, minPrice, maxPrice } = req.query;
    let filtered = courses;
    if (search) {
      filtered = filtered.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));
    }
    if (category) {
      filtered = filtered.filter(c => c.category === category);
    }
    if (minPrice) {
      filtered = filtered.filter(c => c.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter(c => c.price <= parseInt(maxPrice));
    }
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
});

export default router;
