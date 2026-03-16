import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  instructor: {
    type: String,
    required: [true, 'Instructor name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  students: {
    type: Number,
    default: 0,
    min: 0
  },
  thumbnail: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /youtube\.com|youtu\.be/.test(v);
      },
      message: 'Must be a valid YouTube URL'
    }
  },
  duration: {
    type: String,
    default: '0 hours'
  },
  lectures: {
    type: Number,
    default: 0
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
