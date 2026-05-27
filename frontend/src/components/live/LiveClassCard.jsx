import React from 'react';

const LiveClassCard = ({ item, onPlay }) => {
  return (
    <article className="course-card">
      <div className="thumb" style={{ background: '#111', position: 'relative', overflow: 'hidden' }}>
        <div className="badge-row" style={{ position: 'relative', zIndex: 2 }}>
          <span className="badge">{item.status || 'UPCOMING'}</span>
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
        <p className="muted">{item.description}</p>
        <p className="muted">Starts: {item.startTime ? new Date(item.startTime).toLocaleString() : 'N/A'}</p>
        <button className="btn primary" onClick={() => onPlay(item)}>
          Play
        </button>
      </div>
    </article>
  );
};

export default LiveClassCard;