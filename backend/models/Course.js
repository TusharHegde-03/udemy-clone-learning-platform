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
    default: 0
  },
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/480x270'
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Development', 'Data Science', 'Cloud', 'Design', 'Business', 'Marketing']
  },
  lectures: {
    type: Number,
    default: 0
  },
  duration: {
    type: String,
    default: '0 hours'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Course', courseSchema);
