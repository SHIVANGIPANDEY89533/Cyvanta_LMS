import React from 'react';

const ProfileCard = () => {
  return (
    <article className="profile-card">
      <div className="profile-top">
        <div className="avatar">CT</div>
        <div>
          <strong>Cyvanta Student</strong>
          <p className="muted">cyvanta@example.com</p>
        </div>
      </div>
      <div>
        <div className="panel-title">Profile Page</div>
        <ul className="list">
          <li>Name: Cyvanta Student</li>
          <li>Email: cyvanta@example.com</li>
          <li>Enrolled Courses: 8</li>
          <li>Action: <span style={{ cursor: 'pointer', color: 'var(--color-notification)' }}>Logout</span></li>
        </ul>
      </div>
    </article>
  );
};

export default ProfileCard;