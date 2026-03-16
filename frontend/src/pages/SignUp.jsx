import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function SignUp({ setIsLoggedIn, setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsLoggedIn(true);
      setUser(data.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const containerStyle = { maxWidth: '400px', margin: '40px auto', padding: '30px', backgroundColor: '#f8f8f8', borderRadius: '8px' };
  const inputStyle = { width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' };
  const buttonStyle = { width: '100%', padding: '12px', backgroundColor: '#a435f0', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: '20px', color: '#2d2f31' }}>Sign up for UdemyClone</h1>
      {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} style={inputStyle} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={inputStyle} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={inputStyle} required />
        <button type="submit" style={buttonStyle} disabled={loading}>{loading ? 'Creating account...' : 'Sign up'}</button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>Already have an account? <Link to="/signin" style={{ color: '#a435f0' }}>Sign in</Link></p>
    </div>
  );
}

export default SignUp;
