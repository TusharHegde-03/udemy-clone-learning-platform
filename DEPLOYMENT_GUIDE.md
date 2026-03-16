# Udemy Clone - Complete Deployment & Setup Guide

## ✨ Project Overview

A full-stack Udemy-style learning platform with:
- User authentication (Sign Up/Sign In with JWT)
- Course browsing and enrollment
- Student dashboard
- Responsive design
- Modern tech stack (React + Express + MongoDB)

## 📁 What's Already Created

✅ **Backend:**
- server.js (Express setup with MongoDB connection)
- package.json (all dependencies)
- models/ (User.js, Course.js)
- routes/ (auth.js, courses.js, users.js)
- render.yaml (Render deployment config)

✅ **Frontend:**
- package.json (React + Vite setup)

✅ **Root:**
- render.yaml (backend deployment config)
- README.md (project documentation)

## 🚀 Deployment Steps

### Step 1: Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (M0 free tier)
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/udemy_clone`
5. Add your IP address to whitelist

### Step 2: Deploy Backend to Render

1. Go to https://render.com/
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your `udemy-clone-learning-platform` repository
5. **Settings:**
   - Name: `udemy-clone-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. **Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/udemy_clone
   JWT_SECRET=your_secret_key_12345
   NODE_ENV=production
   PORT=10000
   ```
7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. Get your backend URL: `https://udemy-clone-backend-xxx.onrender.com`

### Step 3: Deploy Frontend to Vercel

1. Go to https://vercel.com/
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import `udemy-clone-learning-platform`
5. **Build Settings:**
   - Framework: `React`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Environment Variables:**
   ```
   VITE_API_URL=https://udemy-clone-backend-xxx.onrender.com
   ```
7. Click "Deploy"
8. Your frontend is live at `https://your-app.vercel.app`

## 🛠️ Local Development Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Git

### Backend Setup

```bash
cd backend
npm install

# Create .env file
echo 'PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/udemy_clone
JWT_SECRET=your_secret_key' > .env

npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Create .env file  
echo 'VITE_API_URL=http://localhost:5000' > .env

npm run dev
```

Access at http://localhost:5173

## 📝 Core API Endpoints

### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/signin` - Login user

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (auth required)

### Enrollment
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments/my-courses` - Get enrolled courses

## 📱 Frontend Features to Build

After deployment, add these components to `frontend/src`:

- **pages/**: Home, SignUp, SignIn, Courses, Dashboard
- **components/**: Navbar, Hero, CourseCard, Footer
- **App.jsx**: Main routing
- **index.css**: Tailwind styling

## 🔐 Security Features

✅ JWT-based authentication
✅ Password hashing (bcryptjs)
✅ CORS enabled
✅ Environment variables for secrets
✅ MongoDB connection with proper auth

## 📊 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Axios
- **Backend:** Express.js, Mongoose, JWT, bcryptjs
- **Database:** MongoDB Atlas
- **Deployment:** Vercel (Frontend), Render (Backend)

## ✅ Checklist

- [x] Backend files created
- [x] Frontend package.json created
- [x] GitHub repository set up
- [ ] Build remaining frontend components
- [ ] Deploy backend to Render
- [ ] Deploy frontend to Vercel
- [ ] Test all features
- [ ] Optimize performance

## 🐛 Troubleshooting

**CORS Error?**
- Backend has CORS enabled in server.js
- Check VITE_API_URL environment variable

**MongoDB Connection Failed?**
- Verify connection string
- Add your IP to MongoDB whitelist
- Check credentials

**Deployment Timeout?**
- May need Render paid plan for longer builds
- Ensure all dependencies are listed

## 📚 Next Steps

1. Clone repository locally
2. Set up MongoDB Atlas
3. Deploy backend to Render
4. Deploy frontend to Vercel
5. Build frontend components using provided package.json
6. Test authentication flow
7. Add courses and test enrollment

Good luck! 🚀
