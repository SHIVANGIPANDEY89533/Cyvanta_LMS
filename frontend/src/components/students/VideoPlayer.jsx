import React from 'react';

const VideoPlayer = () => {
  return (
    <article className="video-shell">
      <div className="video-frame">
        <div className="play">▶</div>
      </div>
      <div className="course-body">
        <h4>Live Class Page</h4>
        <p className="muted">
          Embed YouTube Live inside an iframe, keep optional live chat next to it, 
          and place a strong Join Live button below the player.
        </p>
        <button className="btn primary">Join Live</button>
      </div>
    </article>
  );
};

export default VideoPlayer;