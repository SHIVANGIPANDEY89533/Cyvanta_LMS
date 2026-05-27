import { useTheme } from '../../hooks/useTheme';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const { user } = useAuth();

  const role = (user?.role || '').toUpperCase().replace(/^ROLE_/, '');
  const isAdmin = role === 'ADMIN';

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  return (
    <aside className="sidebar">
      <div className="logo" aria-label="Edu portal logo">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z"></path>
          <path d="M7 10.8V15c0 1.8 2.3 3.2 5 3.2s5-1.4 5-3.2v-4.2"></path>
          <path d="M21 9v5"></path>
        </svg>
      </div>

      <nav className="nav-rail" aria-label="Primary navigation">
        <Link to="/student" className={`rail-btn ${isActive('/student')}`} title="Student Dashboard">🏠</Link>
        <Link to="/student/courses" className={`rail-btn ${isActive('/student/courses')}`} title="Courses">📚</Link>
        <Link to={isAdmin ? "/admin/live" : "/student/live"} className={`rail-btn ${isActive(isAdmin ? '/admin/live' : '/student/live')}`} title="Live Classes">🔴</Link>
        <Link to="/student/profile" className={`rail-btn ${isActive('/student/profile')}`} title="Profile">👤</Link>
        {isAdmin && <Link to="/admin" className={`rail-btn ${isActive('/admin')}`} title="Admin Settings">⚙️</Link>}
      </nav>

      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? '☀' : '☾'}
      </button>
    </aside>
  );
};

export default Sidebar;