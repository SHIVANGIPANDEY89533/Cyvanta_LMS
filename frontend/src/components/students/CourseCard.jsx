import React from 'react';

const CourseCard = ({ title, instructor, category, progress, gradient }) => {
  return (
    <article className="course-card">
      {/* Agar alag gradient pass kiya hai toh wo use hoga, warna default CSS */}
      <div className="thumb" style={gradient ? { background: gradient } : {}}>
        <div className="badge-row">
          <span className="badge">{category}</span>
          <span className="badge">{progress}% done</span>
        </div>
      </div>
      
      <div className="course-body">
        <h4>{title}</h4>
        <p className="muted">Instructor: {instructor}</p>
        
        <div className="progress">
          <i style={{ '--w': `${progress}%` }}></i>
        </div>
        
        <button className="btn primary">Continue</button>
      </div>
    </article>
  );
};

export default CourseCard;