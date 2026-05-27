import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/student/courses');
        setCourses(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error('Failed to load courses', err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading course catalog...</div>;
  }

  return (
    <div className="view-panel" style={{ display: 'grid', gap: 'var(--space-6)' }}>
      <div className="hero" style={{ padding: '2rem' }}>
        <article className="hero-card">
          <div className="eyebrow">Course Catalog</div>
          <h2>Explore All Available Courses</h2>
          <p>Find new skills, master your stack, and advance your career with our complete catalog.</p>
        </article>
      </div>

      <section>
        <div className="section-head">
          <div>
            <h3>All Published Courses</h3>
            <p>Showing {courses.length} courses</p>
          </div>
          <div>
            {localStorage.getItem('userRole') === 'ADMIN' && (
              <button className="btn primary" onClick={() => navigate('/admin')}>
                Add Course
              </button>
            )}
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
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                  </div>

                  <div className="course-body">
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{course.title}</h4>
                    <p className="muted" style={{ marginBottom: '1rem', fontSize: '0.9rem', flexGrow: 1 }}>
                      {course.description}
                    </p>
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
    </div>
  );
};

export default Courses;