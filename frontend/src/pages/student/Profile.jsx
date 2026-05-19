import React from 'react';

const Profile = () => {
  return (
    <section className="view-panel" style={{ display: 'grid', gap: 'var(--space-6)' }}>
      
      {/* 1. Profile Banner */}
      <article className="hero-card" style={{ padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', flexWrap: 'wrap' }}>
          <div 
            className="avatar" 
            style={{ width: '96px', height: '96px', fontSize: '2.5rem', borderRadius: '30px' }}
          >
            CS
          </div>
          <div>
            <div className="eyebrow">Student Profile</div>
            <h2 style={{ marginBottom: 'var(--space-2)' }}>Cyvanta Student</h2>
            <p className="muted">cyvanta@example.com • Enrolled in MERN Stack</p>
          </div>
        </div>
      </article>

      {/* 2. Main Grid: Left (Info Form), Right (Password Form) */}
      <div className="admin-grid">
        
        {/* === Left Side: Personal Information === */}
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
              <input type="text" defaultValue="Cyvanta Student" />
            </div>
            
            <div className="field">
              <label>Email Address</label>
              {/* Email disabled hai kyunki ise admin control karta hai */}
              <input 
                type="email" 
                defaultValue="cyvanta@example.com" 
                disabled 
                style={{ opacity: 0.6, cursor: 'not-allowed', background: 'var(--color-surface-offset)' }} 
              />
            </div>

            <div className="field full">
              <label>Bio / About Me (Optional)</label>
              <textarea 
                defaultValue="Passionate learner focusing on MERN stack and Cloud computing." 
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

        {/* === Right Side: Security & Danger Zone === */}
        <div className="stack">
          
          {/* Password Update Card */}
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

          {/* Optional: Logout/Danger Zone Card */}
          <article className="panel" style={{ border: '1px solid color-mix(in srgb, var(--color-warning) 30%, transparent)' }}>
            <div className="section-head" style={{ marginBottom: 0, alignItems: 'center' }}>
              <div>
                <h3 style={{ color: 'var(--color-warning)', fontSize: 'var(--text-base)' }}>Account Actions</h3>
                <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>Securely log out of your current session.</p>
              </div>
              <button 
                type="button" 
                className="btn" 
                style={{ background: 'color-mix(in srgb, var(--color-warning) 12%, transparent)', color: 'var(--color-warning)' }}
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