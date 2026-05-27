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


  // Extract Playlist or Video ID from URL
  const extractYoutubeIds = (url) => {
    if (!url) return { playlistId: null, videoId: null };
    const listMatch = url.match(/[?&]list=([^&]+)/);
    const videoMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    
    return {
      playlistId: listMatch ? listMatch[1] : null,
      videoId: videoMatch ? videoMatch[1] : (url.length === 11 ? url : null)
    };
  };

  const { playlistId, videoId } = extractYoutubeIds(course.youtubePlaylistUrl);

  return (
    <div className="view-panel" style={{ display: 'grid', gap: 'var(--space-6)' }}>
      
      {/* 1. Header Section */}
      <div className="hero" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="eyebrow" style={{ cursor: 'pointer' }} onClick={() => navigate('/student/courses')}>← Back to Dashboard</div>
            <h2 style={{ marginTop: '0.5rem' }}>{course.title}</h2>
            <p className="muted">{course.description}</p>
          </div>
          <div className="badge-row">
            <span className="badge" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
              {course.price > 0 ? `₹${course.price}` : 'Free'}
            </span>
          </div>
        </div>
      </div>


      {/* 2. Main Content: YouTube Playlist */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <article className="video-shell">
          <div className="video-frame" style={{ background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px' }}>
            {(playlistId || videoId) ? (
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                src={playlistId ? `https://www.youtube.com/embed/videoseries?list=${playlistId}` : `https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#666', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>
                <p>No valid YouTube link attached to this course.</p>
              </div>
            )}
          </div>
          <div className="course-body" style={{ marginTop: '1.5rem', padding: '0 1rem' }}>
            <h4>Course Content</h4>
            {playlistId ? (
              <p className="muted">Use the playlist menu in the top right corner of the video player to see all videos in this course.</p>
            ) : (
              <p className="muted">Watch the course video above.</p>
            )}
          </div>
        </article>
      </section>

    </div>
  );
};


export default CourseDetails;