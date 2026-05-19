import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const [courseRes, videoRes] = await Promise.all([
          api.get(`/student/courses/${id}`),
          api.get(`/student/courses/${id}/videos`)
        ]);
        setCourse(courseRes.data);
        setVideos(videoRes.data);
        if (videoRes.data.length > 0) {
          setActiveVideo(videoRes.data[0]);
        }
      } catch (err) {
        console.error("Failed to load course details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading course content...</div>;
  }

  if (!course) {
    return (
      <div className="view-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2>Course Not Found</h2>
        <p className="muted" style={{ marginBottom: '2rem' }}>The course you are looking for does not exist or has been removed.</p>
        <button className="btn primary" onClick={() => navigate('/student')}>Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="view-panel" style={{ display: 'grid', gap: 'var(--space-6)' }}>
      
      {/* 1. Header Section */}
      <div className="hero" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="eyebrow" style={{ cursor: 'pointer' }} onClick={() => navigate('/student')}>← Back to Dashboard</div>
            <h2 style={{ marginTop: '0.5rem' }}>{course.title}</h2>
            <p className="muted">{course.description}</p>
          </div>
          <div className="badge-row">
            <span className="badge" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
              {course.price > 0 ? `$${course.price}` : 'Free'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <section className="details-grid">
        
        {/* Left Side: Video Player */}
        <article className="video-shell">
          <div className="video-frame" style={{ background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {activeVideo ? (
              <video 
                controls 
                autoPlay 
                style={{ width: '100%', height: '100%', outline: 'none' }}
                src={activeVideo.secureUrl}
                poster={course.thumbnailUrl !== 'sample-thumbnail-url' ? course.thumbnailUrl : undefined}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>
                <p>No video selected.</p>
              </div>
            )}
          </div>
          <div className="course-body">
            <h4>{activeVideo ? activeVideo.title : 'No Video'}</h4>
            <p className="muted">{activeVideo ? activeVideo.description : 'Select a video from the syllabus to start watching.'}</p>
          </div>
        </article>
        
        {/* Right Side: Syllabus List */}
        <article className="panel stack">
          <div className="section-head" style={{ marginBottom: '1rem' }}>
            <div>
              <h3>Course Syllabus</h3>
              <p>Module videos and resources.</p>
            </div>
          </div>
          
          <div className="stack" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {videos.length === 0 ? (
              <p className="muted" style={{ padding: '1rem' }}>No videos have been published for this course yet.</p>
            ) : (
              videos.map((vid, idx) => (
                <div 
                  key={vid.id} 
                  className="item" 
                  style={{ 
                    cursor: 'pointer', 
                    background: activeVideo?.id === vid.id ? 'var(--color-surface-offset)' : 'transparent',
                    borderLeft: activeVideo?.id === vid.id ? '3px solid var(--color-primary)' : '3px solid transparent'
                  }}
                  onClick={() => setActiveVideo(vid)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-surface-2)', display: 'grid', placeItems: 'center', fontSize: '0.8rem' }}>
                      {idx + 1}
                    </div>
                    <div>
                      <strong style={{ color: activeVideo?.id === vid.id ? 'var(--color-primary)' : 'inherit' }}>{vid.title}</strong>
                      <p className="muted" style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>Video Lesson</p>
                    </div>
                  </div>
                  {activeVideo?.id === vid.id ? (
                    <span className="chip-btn" style={{ background: 'var(--color-primary)', color: '#fff' }}>Playing</span>
                  ) : (
                    <span className="chip-btn">Play</span>
                  )}
                </div>
              ))
            )}
          </div>
        </article>
      </section>

    </div>
  );
};

export default CourseDetails;
