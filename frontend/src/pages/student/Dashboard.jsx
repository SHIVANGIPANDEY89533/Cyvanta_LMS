import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import HeroCard from '../../components/students/HeroCard';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const role = (user?.role || '').toUpperCase().replace(/^ROLE_/, '');
  const isStudent = role === 'STUDENT';
  const displayName = isStudent ? 'Student' : 'Admin';

  return (
    <section className="view-panel" style={{ display: 'grid', gap: 'var(--space-6)' }}>
      <div className="hero">
        <HeroCard
          eyebrow="Student Dashboard"
          title={`Welcome back, ${displayName}!`}
          description="Keep learning without losing momentum. Access your enrolled courses, live sessions, and track your overall progress below."
          primaryBtn="Browse All Courses"
          secondaryBtn="Join Live Class"
          onPrimaryClick={() => navigate('/student/courses')}
          onSecondaryClick={() => navigate('/student/live')}
        />

        <div className="stats-grid">
          <article className="stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/student/courses')}>
            <span>Course Catalog</span>
            <strong>Browse</strong>
            <p className="muted">Discover and enroll in new courses.</p>
            <button className="btn primary" style={{ marginTop: '1rem', width: '100%' }}>View Courses</button>
          </article>
          
          <article className="stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/student/live')}>
            <span>Live Sessions</span>
            <strong>Join Now</strong>
            <p className="muted">Attend interactive live classes.</p>
            <button className="btn secondary" style={{ marginTop: '1rem', width: '100%' }}>Go to Live</button>
          </article>
          
          <article className="stat-card" style={{ cursor: 'pointer' }} onClick={() => navigate('/student/profile')}>
            <span>Account</span>
            <strong>Profile</strong>
            <p className="muted">Update your details and settings.</p>
            <button className="btn" style={{ marginTop: '1rem', width: '100%', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>Settings</button>
          </article>
        </div>
      </div>
    </section>
  );
};

export default StudentDashboard;