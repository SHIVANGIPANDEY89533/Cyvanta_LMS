import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    bio: '',
    courseName: '',
    role: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.get('http://localhost:8080/api/student/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile({
          fullName: res.data.name || '',
          email: res.data.email || '',
          bio: res.data.bio || '',
          courseName: res.data.courseName || '',
          role: res.data.role?.name || res.data.role || '',
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

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');

      await axios.put(
        'http://localhost:8080/api/student/profile',
        {
          name: profile.fullName,
          bio: profile.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <section className="view-panel" style={{ display: 'grid', gap: 'var(--space-6)' }}>
      <article className="hero-card" style={{ padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
          <div
            className="avatar"
            style={{ width: '96px', height: '96px', fontSize: '2.5rem', borderRadius: '30px' }}
          >
            {profile.fullName ? profile.fullName.slice(0, 2).toUpperCase() : 'CS'}
          </div>

          <div>
            <div className="eyebrow">{profile.role || 'Student Profile'}</div>
            <h2 style={{ marginBottom: 'var(--space-2)' }}>
              {profile.fullName || 'Cyvanta Student'}
            </h2>
            <p className="muted">
              {profile.email || 'cyvanta@example.com'}
              {profile.courseName ? ` • Enrolled in ${profile.courseName}` : ''}
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

          <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                style={{
                  opacity: 0.6,
                  cursor: 'not-allowed',
                  background: 'var(--color-surface-offset)',
                }}
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
              <button
                type="button"
                className="btn primary"
                style={{ width: 'fit-content' }}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
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

              <button
                type="button"
                className="btn secondary"
                style={{ width: 'fit-content', marginTop: 'var(--space-2)' }}
              >
                Update Password
              </button>
            </form>
          </article>

          <article
            className="panel"
            style={{
              border: '1px solid color-mix(in srgb, var(--color-warning) 30%, transparent)',
            }}
          >
            <div className="section-head" style={{ marginBottom: 0, alignItems: 'center' }}>
              <div>
                <h3
                  style={{
                    color: 'var(--color-warning)',
                    fontSize: 'var(--text-base)',
                  }}
                >
                  Account Actions
                </h3>
                <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>
                  Securely log out of your current session.
                </p>
              </div>

              <button
                type="button"
                className="btn"
                style={{
                  background: 'color-mix(in srgb, var(--color-warning) 12%, transparent)',
                  color: 'var(--color-warning)',
                }}
              >
                Logout
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Profile;