import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isLoggedIn, user, onLogout }) {
  const navigate = useNavigate();

  const navbarStyle = {
    backgroundColor: '#0a0a0a',
    color: '#e0e0e0',
    padding: '14px 28px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #222',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 20px rgba(0,0,0,0.4)',
  };

  const logoStyle = {
    fontSize: '26px',
    fontWeight: '800',
    color: '#8b5cf6',
    cursor: 'pointer',
    letterSpacing: '-1px',
    textShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
  };

  const logoSpanStyle = {
    color: '#e0e0e0',
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '22px',
  };

  const navLinkStyle = {
    color: '#b0b0b0',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
    transition: 'color 0.2s',
    cursor: 'pointer',
  };

  const searchBoxStyle = {
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '22px',
    padding: '8px 14px',
    color: '#e0e0e0',
    fontSize: '14px',
    minWidth: '240px',
    outline: 'none',
  };

  const buttonPrimaryStyle = {
    backgroundColor: '#8b5cf6',
    color: '#fff',
    padding: '10px 22px',
    borderRadius: '24px',
    border: 'none',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 12px rgba(139, 92, 246, 0.3)',
  };

  const buttonSecondaryStyle = {
    backgroundColor: 'transparent',
    color: '#e0e0e0',
    padding: '10px 22px',
    borderRadius: '24px',
    border: '1px solid #444',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  };

  return (
    <nav style={navbarStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={logoStyle}>
            Udemy<span style={logoSpanStyle}>Clone</span>
          </span>
        </Link>
        <input
          type="text"
          placeholder="Search courses..."
          style={searchBoxStyle}
          onChange={(e) => {
            if (e.target.value) {
              navigate(`/courses?search=${e.target.value}`);
            } else {
              navigate('/courses');
            }
          }}
        />
      </div>
      <div style={navStyle}>
        {isLoggedIn ? (
          <>
            <Link to="/courses" style={navLinkStyle}>Courses</Link>
            <Link to="/dashboard" style={navLinkStyle}>My Learning</Link>
            <Link to="/dashboard" style={navLinkStyle}>
              <span style={{ marginRight: '8px' }}>Hi, {user?.name || 'User'}</span>
            </Link>
            <button style={buttonSecondaryStyle} onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin" style={navLinkStyle}>Log in</Link>
            <button style={buttonPrimaryStyle} onClick={() => navigate('/signup')}>
              Sign up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
