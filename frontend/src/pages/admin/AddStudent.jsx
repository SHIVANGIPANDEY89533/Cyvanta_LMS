import React from 'react';

const AddStudent = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    // Yahan API call aayega jab aap backend attach karenge
    alert("Student registered successfully! You can now share these credentials with the student.");
  };

  return (
    <article className="panel">
      <div className="section-head">
        <div>
          <h3>Register New Student</h3>
          <p>Admin only: Create account and assign a temporary password.</p>
        </div>
      </div>
      
      <form onSubmit={handleRegister} className="form-grid">
        <div className="field">
          <label>Full Name</label>
          <input type="text" placeholder="e.g. Rahul Singh" required />
        </div>
        
        <div className="field">
          <label>Email Address (Login ID)</label>
          <input type="email" placeholder="rahul@student.com" required />
        </div>
        
        <div className="field">
          <label>Assign Password</label>
          {/* Type text rakha hai taaki admin ko type karte waqt password dikhe */}
          <input type="text" placeholder="e.g. Pass@123" required /> 
        </div>
        
        <div className="field">
          <label>Assign Initial Course (Optional)</label>
          <select 
            style={{
              width: '100%', 
              borderRadius: '0.9rem', 
              border: '1px solid color-mix(in srgb, var(--color-text) 10%, transparent)',
              background: 'var(--color-surface-2)', 
              padding: '.95rem 1rem', 
              color: 'var(--color-text)', 
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: 'inherit'
            }}
          >
            <option value="">-- Select a Course --</option>
            <option value="react">MERN Stack Devlopments</option>
            <option value="Python">Python Devlopments</option>
            <option value="JAVA">Java Deployment</option>
            <option value="DATA ANALYTICS">Data Analytics</option>
            <option value="AI">AI Tools Creations</option>
            <option value="IoT">IoT & Robotics</option>
            <option value="AutoCAD">AutoCAD</option>
          </select>
        </div>

        <div className="field full">
          <button type="submit" className="btn primary">Register Student</button>
        </div>
      </form>
    </article>
  );
};

export default AddStudent;