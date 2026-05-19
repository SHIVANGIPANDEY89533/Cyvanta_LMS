import React from 'react';

const CreateCourse = () => {
  return (
    <article className="panel">
      <div className="section-head">
        <div>
          <h3>Create Course Page</h3>
          <p>Title, category, description, thumbnail upload, save.</p>
        </div>
      </div>
      
      <div className="form-grid">
        {/* 1. Course Title */}
        <div className="field">
          <label>Course Title</label>
          <input placeholder="e.g. Master MERN Stack 2024" />
        </div>

        {/* 2. Course Category Dropdown (Aapka diya hua structure) */}
        <div className="field">
          <label>Course Category</label>
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
            <option value="">-- Select a Course Category --</option>
            <option value="react">MERN Stack Devlopments</option>
            <option value="Python">Python Devlopments</option>
            <option value="JAVA">Java Deployment</option>
            <option value="DATA ANALYTICS">Data Analytics</option>
            <option value="AI">AI Tools Creations</option>
            <option value="IoT">IoT & Robotics</option>
            <option value="AutoCAD">AutoCAD</option>
          </select>
        </div>

        {/* 3. Thumbnail Upload (Full width taaki design balanced rahe) */}
        <div className="field full">
          <label>Thumbnail Upload</label>
          <div className="upload-box">Click to browse or drag thumbnail here</div>
        </div>

        {/* 4. Description */}
        <div className="field full">
          <label>Description</label>
          <textarea placeholder="Write a detailed description about what students will learn in this course..." />
        </div>
        
        {/* 5. Save Button */}
        <div className="field full">
          <button className="btn primary">Save Course</button>
        </div>
      </div>
    </article>
  );
};

export default CreateCourse;