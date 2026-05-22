import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    bio: '',
    courseName: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8080/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile({
          fullName: res.data.fullName || '',
          email: res.data.email || '',
          bio: res.data.bio || '',
          courseName: res.data.courseName || '',
        });
      } catch (error) {
        console.error('Failed to load profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <section className="view-panel" style={{ display: 'grid', gap: 'var(--space-6)' }}>
      <article className="hero-card" style={{ padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
          <div className="avatar" style={{ width: '96px', height: '96px', fontSize: '2.5rem', borderRadius: '30px' }}>
            {profile.fullName ? profile.fullName.slice(0, 2).toUpperCase() : 'CS'}
          </div>
          <div>
            <div className="eyebrow">Student Profile</div>
            <h2 style={{ marginBottom: 'var(--space-2)' }}>{profile.fullName || 'Cyvanta Student'}</h2>
            <p className="muted">
              {profile.email || 'cyvanta@example.com'} • Enrolled in {profile.courseName || 'MERN Stack'}
            </p>
          </div>
        </div>
      </article>

      <div className="admin-grid">
        <article className="panel">
          <div className="section-head">
            <div>
              <h3>Personal Information</h3>
              <p>Update your basic profile details.</p>
            </div>
          </div>

          <form className="form-grid">
            <div className="field">
              <label>Full Name</label>
              <input type="text" name="fullName" value={profile.fullName} onChange={handleChange} />
            </div>

            <div className="field">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                style={{ opacity: 0.6, cursor: 'not-allowed', background: 'var(--color-surface-offset)' }}
              />
            </div>

            <div className="field full">
              <label>Bio / About Me (Optional)</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                style={{ minHeight: '100px' }}
              />
            </div>

            <div className="field full">
              <button type="button" className="btn primary" style={{ width: 'fit-content' }}>
                Save Changes
              </button>
            </div>
          </form>
        </article>

        <div className="stack">
          <article className="panel">
            <div className="section-head">
              <div>
                <h3>Security</h3>
                <p>Change your assigned password to keep your account secure.</p>
              </div>
            </div>

            <form className="stack">
              <div className="field">
                <label>Current Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="field">
                <label>New Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="field">
                <label>Confirm New Password</label>
                <input type="password" placeholder="••••••••" />
              </div>

              <button type="button" className="btn secondary" style={{ width: 'fit-content', marginTop: 'var(--space-2)' }}>
                Update Password
              </button>
            </form>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Profile;