import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

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

  const containerStyle = { maxWidth: '1200px', margin: '0 auto', padding: '24px' };
  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' };
  const cardStyle = { border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', backgroundColor: 'white' };
  const cardBodyStyle = { padding: '16px' };

  const sampleCourses = [
    { id: 1, title: 'Complete Python Bootcamp', instructor: 'Dr. Angela Yu', rating: 4.8, students: '500K+', price: '$14.99' },
    { id: 2, title: 'The Web Developer Bootcamp', instructor: 'Colt Steele', rating: 4.7, students: '400K+', price: '$12.99' },
    { id: 3, title: 'Machine Learning A-Z', instructor: 'Kirill Eremenko', rating: 4.6, students: '350K+', price: '$15.99' },
    { id: 4, title: 'React - The Complete Guide', instructor: 'Maximilian Schwarzmuller', rating: 4.8, students: '300K+', price: '$13.99' },
    { id: 5, title: 'JavaScript: The Advanced Concepts', instructor: 'Andrei Neagoie', rating: 4.8, students: '280K+', price: '$14.99' },
    { id: 6, title: 'The Complete SQL Bootcamp', instructor: 'Jose Portilla', rating: 4.7, students: '200K+', price: '$11.99' },
  ];

  const displayCourses = courses.length > 0 ? courses : sampleCourses;

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: '24px' }}>All Courses</h1>
      {loading ? <p>Loading courses...</p> : (
        <div style={gridStyle}>
          {displayCourses.map(course => (
            <Link to={`/courses/${course._id || course.id}`} key={course._id || course.id} style={cardStyle}>
              <div style={{ height: '160px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '48px' }}>🎓</span>
              </div>
              <div style={cardBodyStyle}>
                <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>{course.title}</h3>
                <p style={{ fontSize: '12px', color: '#666' }}>{course.instructor}</p>
                <p style={{ fontSize: '12px', color: '#e59819' }}>★ {course.rating}</p>
                <p style={{ fontSize: '12px', color: '#666' }}>{course.students} students</p>
                <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{course.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
