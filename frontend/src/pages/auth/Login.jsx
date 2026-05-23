import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginType, setLoginType] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email: email.trim(),
        password: password.trim()
      });

      const { token, role: rawRole, email: responseEmail } = response.data;
      const roleText = typeof rawRole === 'string'
        ? rawRole
        : rawRole?.name || rawRole?.authority || '';
      const normalizedRole = roleText
        ? roleText.toUpperCase().replace(/^ROLE_/, '')
        : 'STUDENT';

      if (loginType === 'admin' && normalizedRole !== 'ADMIN') {
        setError(`Access Denied: Admin access requires ADMIN privileges. Your role: ${roleText || 'unknown'}`);
        return;
      }

      if (loginType === 'student' && normalizedRole === 'ADMIN') {
        setError('Please use the Admin Panel to log in.');
        return;
      }

      login({ token, role: normalizedRole, email: responseEmail || email });

      if (normalizedRole === 'ADMIN') navigate('/admin');
      else navigate('/student');
    } catch (err) {
      if (!err.response) setError('Cannot connect to backend. Is the Java server running?');
      else setError('Invalid email or password');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '1rem' }}>
      <article className="panel" style={{ width: '100%', maxWidth: '420px', padding: 'var(--space-6)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div className="logo" style={{ margin: '0 auto var(--space-4) auto' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z"></path>
              <path d="M7 10.8V15c0 1.8 2.3 3.2 5 3.2s5-1.4 5-3.2v-4.2"></path>
              <path d="M21 9v5"></path>
            </svg>
          </div>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.5rem' }}>Welcome Back</h2>
          <p className="muted">Sign in to your account to continue</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', background: 'var(--color-surface-2)', padding: '0.3rem', borderRadius: '0.5rem' }}>
          <button type="button" onClick={() => { setLoginType('student'); setError(''); }} style={{ flex: 1, padding: '0.6rem', borderRadius: '0.3rem', border: 'none', cursor: 'pointer', background: loginType === 'student' ? 'var(--color-primary)' : 'transparent', color: loginType === 'student' ? '#fff' : 'var(--color-text)', fontWeight: loginType === 'student' ? '600' : 'normal', transition: 'all 0.2s' }}>Student Panel</button>
          <button type="button" onClick={() => { setLoginType('admin'); setError(''); }} style={{ flex: 1, padding: '0.6rem', borderRadius: '0.3rem', border: 'none', cursor: 'pointer', background: loginType === 'admin' ? 'var(--color-primary)' : 'transparent', color: loginType === 'admin' ? '#fff' : 'var(--color-text)', fontWeight: loginType === 'admin' ? '600' : 'normal', transition: 'all 0.2s' }}>Admin Panel</button>
        </div>

        {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem', padding: '0.5rem', background: 'rgba(255,0,0,0.1)', borderRadius: '0.3rem' }}>{error}</div>}

        <form onSubmit={handleLogin} className="form-grid" style={{ gridTemplateColumns: '1fr', gap: 'var(--space-4)' }}>
          <div className="field">
            <label>Email Address</label>
            <input type="email" placeholder={loginType === 'admin' ? 'admin@cyvanta.com' : 'student@cyvanta.com'} value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn primary" style={{ width: '100%', marginTop: 'var(--space-2)' }} disabled={loading}>
            {loading ? 'Signing In...' : `Sign In as ${loginType === 'admin' ? 'Admin' : 'Student'}`}
          </button>
        </form>
      </article>
    </div>
  );
};

export default Login;