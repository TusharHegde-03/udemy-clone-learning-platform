import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isLoggedIn, user, onLogout }) {
  const navigate = useNavigate();

  const navbarStyle = {
    backgroundColor: '#2d2f31',
    color: 'white',
    padding: '12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#a435f0',
  };

  const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
  };

  const buttonStyle = {
    backgroundColor: '#a435f0',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
  };

  const searchBarStyle = {
    backgroundColor: 'white',
    color: '#333',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    width: '300px',
  };

  return (
    <nav style={navbarStyle}>
      <Link to="/" style={{ ...logoStyle, textDecoration: 'none' }}>
        UdemyClone
      </Link>
      <input
        type="text"
        placeholder="Search for anything"
        style={searchBarStyle}
      />
      <div style={navStyle}>
        {isLoggedIn ? (
          <>
            <Link to="/courses" style={linkStyle}>
              My Learning
            </Link>
            <Link to="/dashboard" style={linkStyle}>
              Dashboard
            </Link>
            <span style={{ color: 'white' }}>
              Hi, {user?.name || 'User'}
            </span>
            <button onClick={onLogout} style={buttonStyle}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" style={linkStyle}>
              Sign up
            </Link>
            <Link to="/signin" style={linkStyle}>
              Log in
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
