// src/components/admin/LiveControlCard.jsx
export default function LiveControlCard() {
  return (
    <article className="panel">
      <div className="section-head">
        <div>
          <h3>Live Class Control</h3>
          <p>YouTube live link, start button, ON/OFF toggle.</p>
        </div>
      </div>

      <div className="stack">
        <div className="field">
          <label>Paste YouTube Live Link</label>
          <input type="text" placeholder="https://youtube.com/live/example-stream" />
        </div>

        <button className="btn primary">Start Live</button>

        <div className="toggle-live">
          <div>
            <strong>Live Status</strong>
            <p className="helper">Streaming is active for students.</p>
          </div>

          <div className="switch"></div>
        </div>
      </div>
    </article>
  );
}