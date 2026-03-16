# Complete Frontend Code for Udemy Clone

Copy each code block into the corresponding file. All files go under `frontend/src/`.

---

## 1. frontend/vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()] })
```

---

## 2. frontend/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Udemy Clone - Learn Anything Online</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = { theme: { extend: { colors: { udemy: { bg: '#2d2f31', primary: '#a435f0', hover: '#6b249e', light: '#f7f9fa' } } } } }
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

---

## 3. frontend/src/index.css

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: Inter, sans-serif; }
.btn-primary { background: #a435f0; color: white; padding: 10px 20px; border-radius: 4px; font-weight: bold; transition: all 0.2s; }
.btn-primary:hover { background: #6b249e; }
.btn-outline { border: 2px solid white; color: white; padding: 10px 20px; border-radius: 4px; font-weight: bold; transition: all 0.2s; }
.btn-outline:hover { border-color: #2d2f31; color: #2d2f31; }
.input-field { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 1rem; margin-bottom: 1rem; }
.input-field:focus { border-color: #a435f0; outline: none; }
.card { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.card-img { width: 100%; height: 160px; object-fit: cover; }
.course-badge { background: #f7f9fa; color: #2d2f31; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; }
.star { color: #b4690e; }
"}
]}
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

---

## 5. frontend/src/components/Hero.jsx

```js
import React from 'react';
import { Link } from 'react-router-dom';
export default function Hero() {
  return (
    <section className="bg-udemy-bg py-20 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Learning that gets you</h1>
          <p className="text-xl text-white mb-8">Skills for your present and your future. Get started with us.</p>
          <Link to="/courses" className="btn-primary inline-block">Browse courses</Link>
        </div>
        <div className="hidden md:block">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600" alt="Learning" className="rounded-lg shadow-2xl" />
        </div>
      </div>
    </section>
  );
}
```

---

## 6. frontend/src/components/Footer.jsx

```js
import React from 'react';
import { Link } from 'react-router-dom';
export default function Footer() {
  return (
    <footer className="bg-udemy-bg text-white py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 px-4">
        <div><h3 className="font-bold mb-4">Udemy Clone</h3><p className="text-sm text-gray-400">Learn anything, anytime, anywhere.</p></div>
        <div><h3 className="font-bold mb-4">Learn</h3><Link to="/courses" className="block text-sm text-gray-400 hover:text-white">All courses</Link></div>
        <div><h3 className="font-bold mb-4">Teach</h3><p className="text-sm text-gray-400">Teach on Udemy Clone</p></div>
        <div><h3 className="font-bold mb-4">Connect</h3><p className="text-sm text-gray-400">Contact us</p></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-gray-700">
        <p className="text-sm text-gray-400">&#169; 2026 Udemy Clone. All rights reserved.</p>
      </div>
    </footer>
  );
}
```

---

## 7. frontend/src/components/CourseCard.jsx

```js
import React from 'react';
import { Link } from 'react-router-dom';
export default function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course._id}`} className="block group">
      <div className="card hover:shadow-lg transition">
        <img src={course.image || 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400'} alt={course.title} className="card-img" />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 group-hover:text-purple-600">{course.title}</h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{course.instructorName || 'Instructor'}</p>
          <div className="flex items-center gap-2 mb-2"><span className="star">&#9733;</span><span className="text-sm">{course.rating || 4.5}</span><span className="course-badge">{course.level || 'All levels'}</span></div>
          <div className="flex justify-between items-center"><span className="font-bold text-lg">${course.price || 19.99}</span><span className="text-sm text-gray-500">{course.duration || '10 hrs'}</span></div>
        </div>
      </div>
    </Link>
  );
}
```

---

## 8. frontend/src/pages/Home.jsx

```js
import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import CourseCard from '../components/CourseCard';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export default function Home() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/api/courses`).then(r => r.json()).then(setCourses).catch(e => console.error(e));
  }, []);
  return (
    <div>
      <Hero />
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Courses</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map(c => <CourseCard key={c._id} course={c} />)}
        </div>
      </section>
    </div>
  );
}
```

---

## 9. frontend/src/pages/SignUp.jsx

```js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export default function SignUp({ setIsLoggedIn, setUser }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsLoggedIn(true);
      setUser(data.user);
      navigate('/');
    } catch (err) { setError(err.message); }
  };
  return (
    <div className="min-h-screen bg-udemy-bg flex items-center justify-center py-20 px-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-udemy-bg">Sign Up</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full name" className="input-field" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="email" placeholder="Email" className="input-field" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input type="password" placeholder="Password" className="input-field" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <button className="btn-primary w-full mb-4">Sign Up</button>
        </form>
        <p className="text-center text-gray-600">Already have an account? <Link to="/signin" className="text-purple-600 font-bold">Sign In</Link></p>
      </div>
    </div>
  );
}
```

---

## 10. frontend/src/pages/SignIn.jsx

```js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export default function SignIn({ setIsLoggedIn, setUser }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/signin`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsLoggedIn(true);
      setUser(data.user);
      navigate('/');
    } catch (err) { setError(err.message); }
  };
  return (
    <div className="min-h-screen bg-udemy-bg flex items-center justify-center py-20 px-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-udemy-bg">Sign In</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" className="input-field" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input type="password" placeholder="Password" className="input-field" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <button className="btn-primary w-full mb-4">Sign In</button>
        </form>
        <p className="text-center text-gray-600">New to Udemy Clone? <Link to="/signup" className="text-purple-600 font-bold">Sign Up</Link></p>
      </div>
    </div>
  );
}
```c

---

## 11. frontend/src/pages/Courses.jsx

```js
import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${API_URL}/api/courses`).then(r => r.json()).then(d => { setCourses(d); setLoading(false); }).catch(e => { console.error(e); setLoading(false); });
  }, []);
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8">All Courses</h2>
      {loading ? <p>Loading courses...</p> : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.length > 0 ? courses.map(c => <CourseCard key={c._id} course={c} />) : <p className="text-gray-600">No courses available. Create some!</p>}
        </div>
      )}
    </div>
  );
}
```

---

## 12. frontend/src/pages/CourseDetail.jsx

```js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  useEffect(() => {
    fetch(`${API_URL}/api/courses/${id}`).then(r => r.json()).then(d => { setCourse(d); setLoading(false); }).catch(e => { console.error(e); setLoading(false); });
  }, [id]);
  const enroll = async () => {
    try {
      const res = await fetch(`${API_URL}/api/enrollments`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ courseId: id }) });
      alert('Enrolled successfully!');
    } catch (err) { alert('Failed to enroll'); }
  };
  if (loading) return <div className="p-8">Loading...</div>;
  if (!course) return <div className="p-8">Course not found</div>;
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <Link to="/courses" className="text-purple-600">&larr; Back to courses</Link>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-4">
        <img src={course.image || 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800'} alt={course.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description || 'No description available'}</p>
          <div className="flex gap-4 mb-6"><span className="course-badge">{course.level || 'All levels'}</span><span className="text-gray-600">{course.duration || 'Self-paced'}</span><span className="star">&#9733; {course.rating || 4.5}</span></div>
          <div className="flex items-center justify-between border-t pt-4"><div><span className="text-2xl font-bold">${course.price || 19.99}</span><p className="text-gray-600 text-sm">Instructor: {course.instructorName || 'Instructor'}</p></div><button className="btn-primary" onClick={enroll}>Enroll Now</button></div>
        </div>
      </div>
    </div>
  );
}
```

---

## 13. frontend/src/pages/Dashboard.jsx

```js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export default function Dashboard({ user }) {
  const [myCourses, setMyCourses] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    fetch(`${API_URL}/api/enrollments/my-courses`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()).then(setMyCourses).catch(e => console.error(e));
  }, [token]);
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8">Welcome, {user?.name || 'Student'}!</h2>
      <section className="mb-10">
        <h3 className="text-xl font-bold mb-4">My Enrolled Courses</h3>
        {myCourses.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {myCourses.map(c => (
              <div key={c._id} className="card">
                <img src={c.image || 'https://via.placeholder.com/300'} className="card-img" />
                <div className="p-4"><h4 className="font-bold">{c.title}</h4><Link to={`/courses/${c._id}`} className="text-purple-600 text-sm">Continue Learning</Link></div>
              </div>
            ))}
          </div>
        ) : <p className="text-gray-600">You have not enrolled in any courses yet. <Link to="/courses" className="text-purple-600">Browse courses</Link></p>}
      </section>
    </div>
  );
}
```

---

## 14. frontend/src/components/Navbar.jsx

```js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Navbar({ isLoggedIn, user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-purple-600">Udemy Clone</Link>
          <div className="hidden md:flex items-center gap-4">
            <input type="text" placeholder="Search courses" className="border px-4 py-2 rounded-md w-64" />
            <Link to="/courses" className="text-gray-700 hover:text-purple-600">Categories</Link>
            <Link to="/courses" className="text-gray-700 hover:text-purple-600">Teach on Udemy</Link>
            {isLoggedIn ? (
              <><span className="text-gray-700">Hi, {user?.name}</span><Link to="/dashboard" className="text-purple-600 font-bold">My courses</Link><button onClick={onLogout} className="text-gray-600 hover:text-red-600">Logout</button></>
            ) : (
              <><Link to="/signin" className="btn-primary">Sign In</Link><Link to="/signup" className="btn-primary">Sign Up</Link></>
            )}
          </div>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg></button>
        </div>
        {isOpen && <div className="md:hidden py-4 border-t"><Link to="/courses" className="block py-2">Courses</Link>{isLoggedIn ? (<><Link to="/dashboard" className="block py-2 text-purple-600">Dashboard</Link><button onClick={onLogout} className="block py-2 text-red-600">Logout</button></>) : (<><Link to="/signin" className="block py-2">Sign In</Link><Link to="/signup" className="block py-2">Sign Up</Link></>)}</div>}
      </div>
    </nav>
  );
}
```

---

## 15. Complete Setup - Run These Commands

```bash
# Clone and setup
git clone https://github.com/TusharHegde-03/udemy-clone-learning-platform.git
cd udemy-clone-learning-platform

# Setup backend
cd backend
npm install
echo "PORT=5000\nMONGODB_URI=YOUR_MONGODB_CONNECTION_STRING\nJWT_SECRET=your_super_secret_jwt_key_123\nNODE_ENV=development" > .env
cd ..

# Setup frontend
cd frontend
npm install
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
echo "VITE_API_URL=http://localhost:5000" > .env
cd ..

# Update frontend/package.json to include tailwind:
npm install -D tailwindcss postcss autoprefixer

# Start both servers (in separate terminals)
cd backend && npm run dev
cd frontend && npm run dev
```

## 16. MongoDB Atlas Setup

1. Go to https://cloud.mongodb.com/
2. Create free cluster
3. Create database user
4. Get connection string: mongodb+srv://user:pass@cluster.mongodb.net/udemy_clone
5. Add to backend/.env as MONGODB_URI

## 17. Deploy to Render (Backend)

1. Go to render.com → New Web Service
2. Connect repo → Select `udemy-clone-learning-platform`
3. Root: `backend`, Build: `npm install`, Start: `npm start`
4. Add env vars: MONGODB_URI, JWT_SECRET
5. Deploy!

## 18. Deploy to Vercel (Frontend)

1. Go to vercel.com → Import Project
2. Select repo
3. Root: `frontend`, Build: `npm run build`, Output: `dist`
4. Env var: VITE_API_URL = your_render_backend_url
5. Deploy!

## Done! Your platform is live! 🚀
```
