import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const LiveClasses = () => {
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveClasses = async () => {
      try {
        const res = await api.get('/student/live-sessions/upcoming');
        setLiveClasses(res.data || []);
      } catch (err) {
        console.error('Failed to load live classes', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveClasses();
  }, []);

  const handlePlay = (item) => {
    if (item.youtubeUrl) {
      window.open(item.youtubeUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert("No YouTube stream link available for this class.");
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading live classes...</div>;
  }

  return (
    <section className="view-panel" style={{ display: 'grid', gap: 'var(--space-6)' }}>
      <div className="section-head">
        <div>
          <h3>Live Classes</h3>
          <p>Join upcoming or currently running sessions.</p>
        </div>
      </div>

      <div className="courses-grid">
        {liveClasses.length === 0 ? (
          <p style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>No live classes scheduled right now.</p>
        ) : (
          liveClasses.map((item) => (
            <article key={item.id} className="course-card">
              <div className="thumb" style={{ background: '#111', position: 'relative', overflow: 'hidden' }}>
                <div className="badge-row" style={{ position: 'relative', zIndex: 2 }}>
                  <span className="badge" style={{ background: item.status === 'LIVE' ? 'var(--color-danger)' : 'var(--color-surface-2)', color: item.status === 'LIVE' ? '#fff' : 'var(--color-text)' }}>
                    {item.status || 'UPCOMING'}
                  </span>
                </div>
                {item.thumbnailUrl && (
                  <img
                    src={item.thumbnailUrl}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
              </div>
              <div className="course-body">
                <h4>{item.title}</h4>
                <p className="muted" style={{ marginBottom: '1rem' }}>{item.description}</p>
                <p className="muted" style={{ fontSize: '0.9rem' }}>
                  Starts: {item.scheduledAt ? new Date(item.scheduledAt).toLocaleString() : 'N/A'}
                </p>
                <button className="btn primary" onClick={() => handlePlay(item)} style={{ marginTop: 'auto' }}>
                  Play on YouTube
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default LiveClasses;