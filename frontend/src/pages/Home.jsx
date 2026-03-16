import { Link } from 'react-router-dom';

const sampleCourses = [
  { id: 1, title: 'Complete Python Bootcamp', instructor: 'Dr. Angela Yu', rating: 4.8, students: '500K+', price: '$14.99' },
  { id: 2, title: 'The Web Developer Bootcamp', instructor: 'Colt Steele', rating: 4.7, students: '400K+', price: '$12.99' },
  { id: 3, title: 'Machine Learning A-Z', instructor: 'Kirill Eremenko', rating: 4.6, students: '350K+', price: '$15.99' },
  { id: 4, title: 'React - The Complete Guide', instructor: 'Maximilian Schwarzmuller', rating: 4.8, students: '300K+', price: '$13.99' },
];

function Home() {
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
  };

  const heroStyle = {
    backgroundColor: '#2d2f31',
    color: 'white',
    padding: '60px 24px',
    borderRadius: '8px',
    marginBottom: '40px',
  };

  const courseGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'white',
  };

  const cardBodyStyle = {
    padding: '16px',
  };

  return (
    <div style={containerStyle}>
      <div style={heroStyle}>
        <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Learning that gets you</h1>
        <p style={{ fontSize: '16px', marginBottom: '24px' }}>Skills for your present and your future. Get started with us.</p>
        <div>
          <Link to="/courses" style={{ backgroundColor: '#a435f0', color: 'white', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontWeight: '600' }}>Get started</Link>
        </div>
      </div>

      <h2 style={{ marginBottom: '24px' }}>A broad selection of courses</h2>
      <p style={{ marginBottom: '24px', color: '#666' }}>Choose from 213,000 online video courses with new additions published every month</p>

      <div style={courseGridStyle}>
        {sampleCourses.map(course => (
          <Link to={`/courses/${course.id}`} key={course.id} style={cardStyle}>
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
    </div>
  );
}

export default Home;
