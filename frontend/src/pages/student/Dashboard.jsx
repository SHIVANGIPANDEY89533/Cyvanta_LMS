import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';


const StudentDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [courseRes, profileRes] = await Promise.all([
          api.get('/student/courses'),
          api.get('/student/profile')
        ]);
        setCourses(courseRes.data);
        setProfile(profileRes.data);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };


  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading your dashboard...</div>;
  }


  return (
    <div className="view-panel" style={{ display: 'grid', gap: 'var(--space-6)' }}>
      
      {/* 1. Hero & Stats Section */}
      <div className="hero">
        <article className="hero-card">
          <div className="eyebrow">Student Dashboard</div>
          <h2>Welcome back, {profile?.name || 'Student'}! Keep learning without losing momentum.</h2>
          <p>Access your enrolled courses, live sessions, and track your overall progress below.</p>
          <div className="hero-actions">
            <button className="btn primary" onClick={() => navigate('/student/courses')}>Browse All Courses</button>
            <button className="btn secondary" onClick={() => navigate('/student/live')}>Live Classes</button>
          </div>
        </article>
        
        <div className="mini-grid">
          <article className="mini-card">
            <span>Available Courses</span><strong>{courses.length < 10 ? `0${courses.length}` : courses.length}</strong>
            <p className="muted">Explore new topics and mastery.</p>
          </article>
          <article className="mini-card">
            <span>Live Class</span><strong>Scheduled</strong>
            <p className="muted">Check the Live schedule.</p>
          </article>
          <article className="mini-card">
            <span>Assignments</span><strong>Pending</strong>
            <p className="muted">Check course modules.</p>
          </article>
          <article className="mini-card">
            <span>Watch Time</span><strong>Active</strong>
            <p className="muted">Consistent learning pace.</p>
          </article>
        </div>
      </div>


      {/* 3. Main Course Cards Section */}
      <section>
        <div className="section-head">
          <div>
            <h3>Your Courses</h3>
            <p>Recently updated courses for your track.</p>
          </div>
          <div className="tabs">
            <div className="tab active">All Courses</div>
          </div>
        </div>
        <div className="courses-grid">
          {courses.length === 0 ? (
            <p style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>No courses published yet.</p>
          ) : (
            courses.map((course, idx) => {
              const gradients = [
                'linear-gradient(135deg,#0d7c66,#59a985)',
                'linear-gradient(135deg,#915eff,#4587f3)',
                'linear-gradient(135deg,#e05263,#f78f8f)'
              ];
              const hasThumb = course.thumbnailUrl && course.thumbnailUrl !== 'sample-thumbnail-url';
              const bg = hasThumb ? `url(${course.thumbnailUrl}) center/cover` : gradients[idx % gradients.length];


              return (
                <article key={course.id} className="course-card">
                  <div className="thumb" style={{ background: bg, position: 'relative', overflow: 'hidden' }}>
                    <div className="badge-row" style={{ position: 'relative', zIndex: 2 }}>
                      <span className="badge">{course.price > 0 ? `₹${course.price}` : 'Free'}</span>
                    </div>
                    {hasThumb && (
                      <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                      />
                    )}
                  </div>
                  <div className="course-body">
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{course.title}</h4>
                    <p className="muted" style={{ marginBottom: '1rem', fontSize: '0.9rem', flexGrow: 1 }}>{course.description}</p>
                    <button className="btn primary" onClick={() => navigate(`/student/courses/${course.id}`)}>
                      Go to Course
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>


      {/* 4. Profile & Actions Grid */}
      <section className="details-grid">
        <article className="panel">
          <div className="section-head">
            <div>
              <h3>Quick Actions</h3>
              <p>Shortcuts for your learning tools.</p>
            </div>
          </div>
          <div className="stack">
            <div className="item">
              <div><strong>Live Classes</strong><p className="muted">Join scheduled interactive sessions.</p></div>
              <span className="chip-btn" onClick={() => navigate('/student/live')}>Open</span>
            </div>
            <div className="item">
              <div><strong>Your Profile</strong><p className="muted">Update personal info and preferences.</p></div>
              <span className="chip-btn" onClick={() => navigate('/student/profile')}>Settings</span>
            </div>
          </div>
        </article>
        
        <article className="profile-card">
          <div className="profile-top">
            <div className="avatar">{profile?.name ? profile.name.substring(0, 2).toUpperCase() : 'ST'}</div>
            <div>
              <strong>{profile?.name || 'Student'}</strong>
              <p className="muted">{profile?.email}</p>
            </div>
          </div>
          <div>
            <div className="panel-title">Account Info</div>
            <ul className="list">
              <li>Status: {profile?.active ? 'Active User' : 'Inactive'}</li>
              <li>Role: Learner</li>
              <li>Joined: {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</li>
              <li>
                <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#e05263', cursor: 'pointer', padding: 0, fontWeight: 'bold' }}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </article>
      </section>


    </div>
  );
};


export default StudentDashboard;