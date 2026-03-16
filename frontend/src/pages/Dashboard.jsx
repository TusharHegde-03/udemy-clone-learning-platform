import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function Dashboard({ user }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${API_URL}/api/courses/my-courses`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => { setCourses(data || []); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, []);

  const containerStyle = { maxWidth: '1200px', margin: '0 auto', padding: '24px' };
  const cardStyle = { border: '1px solid #ddd', borderRadius: '8px', padding: '24px', backgroundColor: 'white', marginBottom: '24px' };
  const statGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '24px' };
  const statCardStyle = { backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', textAlign: 'center' };

  const myEnrolled = [
    { id: 1, title: 'Complete Python Bootcamp', progress: 45 },
    { id: 2, title: 'Machine Learning A-Z', progress: 20 },
  ];
  const displayCourses = courses.length > 0 ? courses : myEnrolled;

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: '24px' }}>Welcome back, {user?.name || 'User'}!</h1>
      <div style={statGridStyle}>
        <div style={statCardStyle}>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#a435f0' }}>{displayCourses.length}</p>
          <p>Courses Enrolled</p>
        </div>
        <div style={statCardStyle}>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#a435f0' }}>0</p>
          <p>Courses Completed</p>
        </div>
        <div style={statCardStyle}>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#a435f0' }}>0</p>
          <p>Certificates Earned</p>
        </div>
      </div>
      <div style={cardStyle}>
        <h3>My Courses</h3>
        {loading ? <p style={{ marginTop: '12px' }}>Loading...</p> : displayCourses.length === 0 ? (
          <p style={{ marginTop: '12px', color: '#666' }}>You have not enrolled in any courses yet. <Link to="/courses" style={{ color: '#a435f0' }}>Browse courses</Link></p>
        ) : (
          <div style={{ marginTop: '16px' }}>
            {displayCourses.map(course => (
              <Link to={`/courses/${course._id || course.id}`} key={course._id || course.id} style={{ display: 'block', padding: '16px 0', borderBottom: '1px solid #eee', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '500' }}>{course.title}</span>
                  <span style={{ color: '#666' }}>{course.progress}% complete</span>
                </div>
                <div style={{ width: '100%', height: '4px', backgroundColor: '#eee', borderRadius: '2px', marginTop: '8px' }}>
                  <div style={{ width: `${course.progress}%`, height: '100%', backgroundColor: '#a435f0', borderRadius: '2px' }}></div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div style={cardStyle}>
        <h3>Account Settings</h3>
        <p style={{ marginTop: '8px', color: '#666' }}>Email: {user?.email || 'N/A'}</p>
        <p style={{ color: '#666' }}>Account created: January 2025</p>
      </div>
    </div>
  );
}

export default Dashboard;
