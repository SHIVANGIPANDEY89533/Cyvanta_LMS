import React from 'react';

const LiveClass = () => {
  return (
    <section className="view-panel" style={{ display: 'grid', gap: 'var(--space-6)' }}>
      
      {/* 1. Header Section */}
      <div className="section-head">
        <div>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🔴 Live Session: React Architecture Q&A
          </h3>
          <p className="muted">Instructor: Aditi Sharma • Started 10 mins ago</p>
        </div>
        <button className="btn secondary">Leave Session</button>
      </div>

      {/* 2. Main Grid: Left (Video) | Right (Live Chat) */}
      <div className="details-grid">
        
        {/* === Left Side: Video Player Area === */}
        <article className="video-shell" style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Yahan aap YouTube ka <iframe> iframe laga sakte hain */}
          <div className="video-frame" style={{ minHeight: '420px', borderRadius: '0' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="play" style={{ margin: '0 auto var(--space-4) auto' }}>▶</div>
              <p>Stream is connecting...</p>
            </div>
          </div>
          
          <div className="course-body" style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-border)' }}>
            <h4>Session Details</h4>
            <p className="muted">
              Today we are discussing advanced component patterns, custom hooks, and state management strategies in React. 
              Drop your questions in the chat!
            </p>
          </div>
        </article>

        {/* === Right Side: Live Chat Box === */}
        <article className="panel stack" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="panel-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Live Chat</span>
            <span className="dot"></span> {/* Green online dot */}
          </div>
          
          {/* Chat Messages Area */}
          <div 
            style={{ 
              flex: 1, 
              background: 'color-mix(in srgb, var(--color-surface-offset) 40%, transparent)', 
              borderRadius: 'var(--radius-md)', 
              padding: 'var(--space-4)', 
              overflowY: 'auto', 
              minHeight: '300px', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 'var(--space-3)' 
            }}
          >
            <div style={{ fontSize: 'var(--text-sm)' }}>
              <strong style={{ color: 'var(--color-primary)' }}>Rahul:</strong> Sir, what is useMemo?
            </div>
            <div style={{ fontSize: 'var(--text-sm)' }}>
              <strong style={{ color: 'var(--color-primary)' }}>Neha Kapoor:</strong> Will this be recorded?
            </div>
            <div style={{ fontSize: 'var(--text-sm)' }}>
              <strong style={{ color: 'var(--color-warning)' }}>Admin:</strong> Yes, recordings will be available in the course portal after the class.
            </div>
          </div>

          {/* Chat Input Field */}
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'auto' }}>
            <input 
              type="text" 
              placeholder="Type a message..." 
              style={{ flex: 1, padding: '.75rem 1rem' }} 
            />
            <button className="btn primary" style={{ padding: '.75rem 1rem' }}>Send</button>
          </div>
        </article>
        
      </div>
    </section>
  );
};

export default LiveClass;