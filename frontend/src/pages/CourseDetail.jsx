import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/courses/${id}`)
      .then(res => res.json())
      .then(data => { setCourse(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const sampleCourse = {
    id: Number(id),
    title: 'Complete Python Bootcamp: Go from zero to hero in Python 3',
    description: 'Learn Python like a Professional Start from the basics and go all the way creating your own applications and games!',
    instructor: 'Dr. Angela Yu',
    rating: 4.8,
    students: '500K+',
    price: '$14.99',
    lastUpdated: 'January 2025',
    language: 'English',
    sections: [
      { title: 'Introduction', lectures: 3 },
      { title: 'Python Basics', lectures: 10 },
      { title: 'Data Structures', lectures: 8 },
      { title: 'Object-Oriented Programming', lectures: 12 },
    ],
  };

  const displayCourse = course || sampleCourse;
  const containerStyle = { maxWidth: '1200px', margin: '0 auto', padding: '24px' };
  const heroStyle = { backgroundColor: '#2d2f31', color: 'white', padding: '40px', borderRadius: '8px', marginBottom: '24px' };
  const infoStyle = { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' };
  const cardStyle = { border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: 'white' };

  if (loading) return <div style={containerStyle}>Loading...</div>;

  return (
    <div style={containerStyle}>
      <div style={heroStyle}>
        <h1 style={{ fontSize: '28px' }}>{displayCourse.title}</h1>
        <p style={{ marginTop: '16px', color: '#ccc' }}>{displayCourse.description}</p>
      </div>
      <div style={infoStyle}>
        <div>
          <div style={cardStyle}>
            <h3>What you will learn</h3>
            <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
              <li>Install Python and get started</li>
              <li>Master Python from basics to advanced</li>
              <li>Build real-world applications</li>
              <li>Understand OOP concepts</li>
            </ul>
          </div>
          <div style={{ ...cardStyle, marginTop: '16px' }}>
            <h3>Course Content</h3>
            {displayCourse.sections?.map((sec, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <span>{sec.title}</span>
                <span style={{ color: '#666' }}>{sec.lectures} lectures</span>
              </div>
            ))}
          </div>
          <div style={{ ...cardStyle, marginTop: '16px' }}>
            <h3>Instructor</h3>
            <p style={{ marginTop: '8px', fontWeight: '600' }}>{displayCourse.instructor}</p>
          </div>
        </div>
        <div style={{ ...cardStyle, height: 'fit-content' }}>
          <div style={{ backgroundColor: '#f5f5f5', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '64px' }}>🎓</span>
          </div>
          <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{displayCourse.price}</p>
          <p style={{ color: '#e59819' }}>★ {displayCourse.rating} ({displayCourse.students} students)</p>
          <button style={{ width: '100%', backgroundColor: '#a435f0', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', marginTop: '16px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}>Enroll Now</button>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '16px' }}>30-Day Money-Back Guarantee</p>
        </div>
      </div>
      <Link to="/courses" style={{ display: 'inline-block', marginTop: '24px', color: '#a435f0' }}>← Back to Courses</Link>
    </div>
  );
}

export default CourseDetail;
