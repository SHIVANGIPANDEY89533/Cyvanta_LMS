import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const AdminLiveClasses = () => {
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    thumbnailUrl: '',
    scheduledAt: ''
  });
  
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchLiveClasses = async () => {
    try {
      const res = await api.get('/admin/live-sessions');
      setLiveClasses(res.data || []);
    } catch (err) {
      console.error('Failed to load live classes', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveClasses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setThumbnailUploading(true);
    try {
      const formPayload = new FormData();
      formPayload.append('file', file);

      const response = await api.post('/admin/courses/thumbnail', formPayload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedUrl = response.data.thumbnailUrl || response.data.url;
      setFormData(prev => ({ ...prev, thumbnailUrl: uploadedUrl }));
      alert('Thumbnail uploaded successfully!');
    } catch (err) {
      console.error('Failed to upload thumbnail', err);
      alert('Error uploading thumbnail. Please try again.');
    } finally {
      setThumbnailUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      await api.post('/admin/live-sessions', formData);
      setSuccess('Live Class generated successfully!');
      setFormData({ title: '', description: '', youtubeUrl: '', thumbnailUrl: '', scheduledAt: '' });
      fetchLiveClasses();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate live class.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEndClass = async (id) => {
    try {
      await api.post(`/admin/live-sessions/${id}/end`);
      fetchLiveClasses();
    } catch (err) {
      console.error('Failed to end live class', err);
    }
  };

  return (
    <section className="view-panel" style={{ display: 'grid', gap: 'var(--space-6)' }}>
      <div className="section-head">
        <div>
          <h3>Manage Live Classes</h3>
          <p>Generate new YouTube live streams and broadcast them to students.</p>
        </div>
      </div>

      <div className="admin-grid">
        {/* Left Side: Generate Form */}
        <article className="panel">
          <div className="section-head" style={{ marginBottom: '1rem' }}>
            <h4>Generate Live Class</h4>
          </div>
          
          {error && <div style={{ color: 'var(--color-danger)', marginBottom: '1rem', padding: '0.5rem', background: 'color-mix(in srgb, var(--color-danger) 10%, transparent)', borderRadius: '4px' }}>{error}</div>}
          {success && <div style={{ color: 'var(--color-success)', marginBottom: '1rem', padding: '0.5rem', background: 'color-mix(in srgb, var(--color-success) 10%, transparent)', borderRadius: '4px' }}>{success}</div>}

          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="field full">
              <label>Class Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. MERN Stack Q&A Session" required />
            </div>
            
            <div className="field full">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="What will this class cover?" rows="3" required></textarea>
            </div>

            <div className="field full">
              <label>YouTube Live URL</label>
              <input type="url" name="youtubeUrl" value={formData.youtubeUrl} onChange={handleChange} placeholder="https://youtube.com/watch?v=..." required />
            </div>

            <div className="field full">
              <label>Thumbnail Image</label>
              <input type="file" accept="image/*" onChange={handleThumbnailUpload} disabled={thumbnailUploading} />
              {thumbnailUploading && <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>Uploading image...</span>}
              {formData.thumbnailUrl && !thumbnailUploading && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <img src={formData.thumbnailUrl} alt="Preview" style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                  </div>
              )}
            </div>
            
            <div className="field full">
              <label>Scheduled Date & Time (Optional)</label>
              <input type="datetime-local" name="scheduledAt" value={formData.scheduledAt} onChange={handleChange} />
            </div>

            <div className="field full">
              <button type="submit" className="btn primary" disabled={submitting} style={{ width: '100%' }}>
                {submitting ? 'Generating...' : 'Generate Live Class'}
              </button>
            </div>
          </form>
        </article>

        {/* Right Side: Active/Upcoming Classes */}
        <div className="stack">
          <h4>Active & Upcoming Classes</h4>
          
          {loading ? (
            <p className="muted">Loading classes...</p>
          ) : liveClasses.length === 0 ? (
            <p className="muted">No live classes have been generated yet.</p>
          ) : (
            liveClasses.map(session => (
              <article key={session.id} className="panel" style={{ padding: '1rem', borderLeft: session.status === 'LIVE' ? '4px solid var(--color-danger)' : '4px solid var(--color-primary)' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <img 
                    src={session.thumbnailUrl || 'https://placehold.co/120x80/222/FFF?text=Live'} 
                    alt={session.title} 
                    style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/120x80/222/FFF?text=Live';
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h5 style={{ margin: '0 0 0.5rem 0' }}>{session.title}</h5>
                        <p className="muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>{session.description}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>
                          {session.scheduledAt ? new Date(session.scheduledAt).toLocaleString() : 'Now'}
                        </p>
                      </div>
                      <span className="badge" style={{ background: session.status === 'LIVE' ? 'var(--color-danger)' : 'var(--color-surface-2)', color: session.status === 'LIVE' ? '#fff' : 'inherit' }}>
                        {session.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <a href={session.youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn primary" style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}>
                    Open Stream
                  </a>
                  {session.status !== 'ENDED' && (
                    <button onClick={() => handleEndClass(session.id)} className="btn" style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
                      End Class
                    </button>
                  )}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminLiveClasses;
