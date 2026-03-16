function Footer() {
  const footerStyle = {
    backgroundColor: '#2d2f31',
    color: 'white',
    padding: '40px 24px',
    textAlign: 'center',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 8px',
  };

  return (
    <footer style={footerStyle}>
      <div style={{ marginBottom: '20px' }}>
        <strong style={{ fontSize: '20px', color: '#a435f0' }}>UdemyClone</strong>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <a href="#" style={linkStyle}>About</a>
        <a href="#" style={linkStyle}>Careers</a>
        <a href="#" style={linkStyle}>Blog</a>
        <a href="#" style={linkStyle}>Investors</a>
      </div>
      <p style={{ color: '#ccc', fontSize: '12px' }}>
        &copy; 2025 UdemyClone. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
