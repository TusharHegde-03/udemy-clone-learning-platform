import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';

const API_URL = import.meta.env.VITE_API_URL || 'https://udemy-clone-backend-wine.vercel.app';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/courses`)
      .then(res => res.json())
      .then(data => {
        setCourses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#0a0a0a',
    minHeight: '100vh',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '24px',
    paddingTop: '24px',
  };

  const titleStyle = {
    color: '#e0e0e0',
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '8px',
  };

  const subtitleStyle = {
    color: '#888',
    fontSize: '16px',
    marginBottom: '24px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>All Courses</h1>
      <p style={subtitleStyle}>
        Choose from free online video courses with YouTube tutorials.
      </p>
      {loading ? (
        <p style={{ color: '#888' }}>Loading courses...</p>
      ) : (
        <div style={gridStyle}>
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
