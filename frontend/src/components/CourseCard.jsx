import { Link } from 'react-router-dom';

function CourseCard({ course }) {
  const cardStyle = {
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 32px rgba(139, 92, 246, 0.2)',
    }
  };

  const thumbContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '160px',
    overflow: 'hidden',
    backgroundColor: '#0a0a0a',
  };

  const thumbStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const playIconStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '48px',
    height: '48px',
    backgroundColor: 'rgba(139, 92, 246, 0.9)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(139, 92, 246, 0.4)',
  };

  const freeBadgeStyle = {
    position: 'absolute',
    top: '8px',
    left: '8px',
    backgroundColor: '#22c55e',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
  };

  const contentStyle = {
    padding: '16px',
    backgroundColor: '#1a1a1a',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
  };

  const titleStyle = {
    color: '#e0e0e0',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
    lineHeight: '1.4',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    minHeight: '44px',
  };

  const instructorStyle = {
    color: '#888',
    fontSize: '13px',
    marginBottom: '6px',
  };

  const ratingStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '6px',
  };

  const starStyle = {
    color: '#fbbf24',
    fontSize: '14px',
    fontWeight: '700',
  };

  const studentsStyle = {
    color: '#888',
    fontSize: '13px',
  };

  const priceStyle = {
    color: '#8b5cf6',
    fontSize: '20px',
    fontWeight: '700',
    marginTop: '10px',
  };

  return (
    <Link to={`/courses/${course.title}`}
      style={{ textDecoration: 'none' }}
    >
      <div style={cardStyle}>
        <div style={thumbContainerStyle}>
          <img
            src={course.thumbnail || 'https://img-c.udemycdn.com/course/480x270/default.jpg'}
            alt={course.title}
            style={thumbStyle}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/480x270/1a1a1a/8b5cf6?text=Course';
            }}
          />
          {course.videoUrl && (
            <div style={playIconStyle}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          )}
          {course.price === 0 && (
            <span style={freeBadgeStyle}>FREE</span>
          )}
        </div>
        <div style={contentStyle}>
          <h3 style={titleStyle}>{course.title}</h3>
          <p style={instructorStyle}>{course.instructor}</p>
          <div style={ratingStyle}>
            <span style={starStyle}>{course.rating} ★</span>
            <span style={studentsStyle}>({(course.students / 1000).toFixed(0)}K students)</span>
          </div>
          {course.lectures && course.duration && (
            <div style={{ color: '#888', fontSize: '13px' }}>
              {course.lectures} lectures • {course.duration}
            </div>
          )}
          <p style={priceStyle}>
            {course.price === 0 ? 'Free' : `₹${course.price}`}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CourseCard;
