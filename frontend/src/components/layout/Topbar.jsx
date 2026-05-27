import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Topbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const role = (user?.role || '').toUpperCase().replace(/^ROLE_/, '');
  const email = user?.email || 'User';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h1>Welcome, {role === 'ADMIN' ? 'Administrator' : 'Student'}</h1>
        <p>{email}</p>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button 
          onClick={handleLogout}
          className="btn" 
          style={{ 
            background: 'var(--color-surface-2)', 
            border: '1px solid var(--color-border)', 
            color: 'var(--color-text)', 
            padding: '0.5rem 1rem', 
            borderRadius: '0.5rem',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;