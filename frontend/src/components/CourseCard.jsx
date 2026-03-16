import { Link } from 'react-router-dom';

function CourseCard({ course }) {
  const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
    }
  };

  const thumbStyle = {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    backgroundColor: '#f0f0f0'
  };

  const contentStyle = {
    padding: '16px'
  };

  const titleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#2d2f31',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };

  const instructorStyle = {
    fontSize: '14px',
    color: '#7a7d81',
    marginBottom: '8px'
  };

  const ratingStyle = {
    fontSize: '14px',
    color: '#f59e0b',
    marginBottom: '8px'
  };

  const priceStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#a435f0',
    marginBottom: '12px'
  };

  const btnStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#a435f0',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'block',
    textAlign: 'center',
    transition: 'background-color 0.3s'
  };

  return (
    <Link to={`/course/${course.title}`} style={{ textDecoration: 'none' }}>
      <div style={cardStyle} onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
      }} onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      }}>
        <img src={course.thumbnail} alt={course.title} style={thumbStyle} />
        <div style={contentStyle}>
          <h3 style={titleStyle}>{course.title}</h3>
          <p style={instructorStyle}>{course.instructor}</p>
          <div style={ratingStyle}>⭐ {course.rating} ({course.students.toLocaleString()} students)</div>
          <div style={priceStyle}>{course.price === 0 ? 'FREE' : `$${course.price}`}</div>
          <button style={btnStyle} onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#922ac7';
          }} onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#a435f0';
          }}>View Course</button>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
