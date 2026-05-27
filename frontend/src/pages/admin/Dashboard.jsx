import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroCard from '../../components/students/HeroCard';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const role = (user?.role || '').toUpperCase().replace(/^ROLE_/, '');
  const isAdmin = role === 'ADMIN';

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [price, setPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [editThumbnailUploading, setEditThumbnailUploading] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editThumbnailUrl, setEditThumbnailUrl] = useState('');
  const [editPrice, setEditPrice] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const [videoCourse, setVideoCourse] = useState(null);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoThumbnailUrl, setVideoThumbnailUrl] = useState('');
  const [videoThumbnailUploading, setVideoThumbnailUploading] = useState(false);
  const [videoFree, setVideoFree] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);

  const navigate = useNavigate();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/courses');
      setCourses(response.data);
    } catch (err) {
      console.error('Failed to load courses', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);


  const resetCreateForm = () => {
    setTitle('');
    setDescription('');
    setThumbnailUrl('');
    setPrice(0);
  };

  const resetEditForm = () => {
    setEditCourse(null);
    setEditTitle('');
    setEditDescription('');
    setEditThumbnailUrl('');
    setEditPrice(0);
  };

  const resetVideoForm = () => {
    setVideoCourse(null);
    setVideoTitle('');
    setVideoDescription('');
    setVideoFile(null);
    setVideoThumbnailUrl('');
    setVideoFree(false);
  };

  const handleThumbnailUpload = async (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isEdit) setEditThumbnailUploading(true);
    else setThumbnailUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/admin/courses/thumbnail', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const uploadedUrl = response.data.thumbnailUrl || response.data.url;
      if (isEdit) setEditThumbnailUrl(uploadedUrl);
      else setThumbnailUrl(uploadedUrl);

      alert('Thumbnail uploaded successfully!');
    } catch (err) {
      console.error('Failed to upload thumbnail', err);
      alert('Error uploading thumbnail. Please try again.');
    } finally {
      if (isEdit) setEditThumbnailUploading(false);
      else setThumbnailUploading(false);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!title || !description) return;

    setIsSubmitting(true);
    try {
      await api.post('/admin/courses', {
        title,
        description,
        thumbnailUrl: thumbnailUrl || 'sample-thumbnail-url',
        price: Number(price),
        published: true,
        freeCourse: Number(price) === 0,
      });
      resetCreateForm();
      await fetchCourses();
      alert('Course created successfully!');
    } catch (err) {
      console.error('Failed to create course', err);
      alert('Error creating course.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCourse = (course) => {
    setEditCourse(course);
    setEditTitle(course.title || '');
    setEditDescription(course.description || '');
    setEditThumbnailUrl(course.thumbnailUrl || '');
    setEditPrice(course.price || 0);
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    if (!editCourse) return;
    if (!editTitle || !editDescription) {
      alert('Course title and description are required.');
      return;
    }

    setIsUpdating(true);
    try {
      await api.put(`/admin/courses/${editCourse.id}`, {
        title: editTitle,
        description: editDescription,
        thumbnailUrl: editThumbnailUrl || 'sample-thumbnail-url',
        price: Number(editPrice),
        published: true,
        freeCourse: Number(editPrice) === 0,
      });
      await fetchCourses();
      resetEditForm();
      alert('Course updated successfully!');
    } catch (err) {
      console.error('Failed to update course', err);
      alert('Error updating course.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    const confirmed = window.confirm('Delete this course? This action cannot be undone.');
    if (!confirmed) return;

    try {
      await api.delete(`/admin/courses/${courseId}`);
      await fetchCourses();
      alert('Course deleted successfully!');
    } catch (err) {
      console.error('Failed to delete course', err);
      alert('Error deleting course.');
    }
  };

  const handleOpenVideoUpload = (course) => {
    setVideoCourse(course);
    setVideoTitle('');
    setVideoDescription('');
    setVideoFile(null);
    setVideoThumbnailUrl('');
    setVideoFree(false);
  };

  const handleVideoThumbnailUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setVideoThumbnailUploading(true);
      const response = await api.post('/admin/courses/thumbnail', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setVideoThumbnailUrl(response.data.thumbnailUrl);
    } catch (err) {
      console.error('Failed to upload video thumbnail', err);
      alert('Error uploading video thumbnail.');
    } finally {
      setVideoThumbnailUploading(false);
    }
  };

  const handleUploadVideo = async (e) => {
    e.preventDefault();
    if (!videoCourse) return;
    if (!videoTitle || !videoFile) {
      alert('Video title and file are required.');
      return;
    }

    setIsUploadingVideo(true);
    try {
      const formData = new FormData();
      formData.append('courseId', videoCourse.id);
      formData.append('title', videoTitle);
      formData.append('description', videoDescription);
      formData.append('freeVideo', videoFree);
      if (videoThumbnailUrl) formData.append('thumbnailUrl', videoThumbnailUrl);
      formData.append('file', videoFile);

      await api.post('/admin/videos/upload', formData);
      resetVideoForm();
      alert('Video uploaded successfully!');
    } catch (err) {
      console.error('Failed to upload video', err);
      alert('Error uploading video.');
    } finally {
      setIsUploadingVideo(false);
    }
  };

  return (
    <section className="view-panel" style={{ display: 'grid', gap: 'var(--space-6)' }}>
      <div className="hero">
        <HeroCard
          eyebrow="Admin Dashboard"
          title={isAdmin ? 'Welcome, Admin' : 'Welcome'}
          description="Manage courses, videos, live classes, and users from one control room."
          primaryBtn="Create Course"
          secondaryBtn="Manage Users"
          onSecondaryClick={() => navigate('/admin/users')}
        />

        <div className="stats-grid">
          <article className="stat-card"><span>Total Students</span><strong>1,284</strong><p className="muted">+8.4% this month.</p></article>
          <article className="stat-card"><span>Total Courses</span><strong>{courses.length}</strong><p className="muted">Published across all categories.</p></article>
          <article className="stat-card"><span>Live Classes Today</span><strong>04</strong><p className="muted">2 already streaming.</p></article>
        </div>
      </div>

      <div className="admin-grid">
        {/* Left Side: Course List */}
        <div className="stack">
          <div className="section-head">
            <div>
              <h3>Manage Courses</h3>
              <p>Update, delete, or add videos to existing courses.</p>
            </div>
          </div>
          
          {loading ? (
            <p>Loading courses...</p>
          ) : courses.length === 0 ? (
            <p className="muted">No courses found. Create one on the right!</p>
          ) : (
            courses.map(course => (
              <article key={course.id} className="panel" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img 
                  src={course.thumbnailUrl && course.thumbnailUrl !== 'sample-thumbnail-url' ? course.thumbnailUrl : 'https://placehold.co/120x80/222/FFF?text=Course'} 
                  alt={course.title} 
                  style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} 
                  onError={(e) => {
                    e.target.onerror = null; // prevent infinite loop
                    e.target.src = 'https://placehold.co/120x80/222/FFF?text=Course';
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.25rem 0' }}>{course.title}</h4>
                  <p className="muted" style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem' }}>₹{course.price > 0 ? course.price : 'Free'}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button className="btn" style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }} onClick={() => handleEditCourse(course)}>Edit</button>
                    <button className="btn primary" style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem' }} onClick={() => handleOpenVideoUpload(course)}>Add Video</button>
                    <button className="btn" style={{ fontSize: '0.8rem', padding: '0.25rem 0.5rem', color: 'var(--color-danger)' }} onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Right Side: Forms (Create/Edit/Upload) */}
        <div className="stack">
          {videoCourse ? (
            // Video Upload Form
            <article className="panel">
              <div className="section-head" style={{ marginBottom: '1rem' }}>
                <div>
                  <h3>Upload Video to: {videoCourse.title}</h3>
                  <p>Attach a new lecture file to the selected course.</p>
                </div>
                <button className="btn" onClick={resetVideoForm}>Cancel</button>
              </div>
              <form className="form-grid" onSubmit={handleUploadVideo}>
                <div className="field full">
                  <label>Video Title</label>
                  <input type="text" value={videoTitle} onChange={e => setVideoTitle(e.target.value)} required />
                </div>
                <div className="field full">
                  <label>Description (Optional)</label>
                  <textarea value={videoDescription} onChange={e => setVideoDescription(e.target.value)} rows="2"></textarea>
                </div>
                <div className="field full">
                  <label>Video File (MP4, MKV)</label>
                  <input type="file" accept="video/*" onChange={e => setVideoFile(e.target.files[0])} required />
                </div>
                <div className="field full" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" id="freeVideo" checked={videoFree} onChange={e => setVideoFree(e.target.checked)} />
                  <label htmlFor="freeVideo" style={{ margin: 0 }}>Free Preview Video</label>
                </div>
                <div className="field full">
                  <button type="submit" className="btn primary" disabled={isUploadingVideo} style={{ width: '100%' }}>
                    {isUploadingVideo ? 'Uploading Video (Please wait)...' : 'Upload Video'}
                  </button>
                </div>
              </form>
            </article>
          ) : editCourse ? (
            // Edit Course Form
            <article className="panel">
              <div className="section-head" style={{ marginBottom: '1rem' }}>
                <h3>Edit Course</h3>
                <button className="btn" onClick={resetEditForm}>Cancel</button>
              </div>
              <form className="form-grid" onSubmit={handleUpdateCourse}>
                <div className="field full">
                  <label>Course Name</label>
                  <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} required />
                </div>
                <div className="field full">
                  <label>Description</label>
                  <textarea value={editDescription} onChange={e => setEditDescription(e.target.value)} required rows="3"></textarea>
                </div>
                <div className="field full">
                  <label>Video Thumbnail (Optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleVideoThumbnailUpload}
                    disabled={videoThumbnailUploading}
                  />
                  {videoThumbnailUploading ? <small style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', display: 'block' }}>Uploading...</small> :
                  videoThumbnailUrl && videoThumbnailUrl !== 'sample-thumbnail-url' && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <img src={videoThumbnailUrl} alt="Video thumbnail preview" style={{ maxWidth: '100px', borderRadius: '4px' }} />
                      <small style={{ color: 'var(--color-primary)', display: 'block' }}>Thumbnail uploaded!</small>
                    </div>
                  )}
                </div>
                <div className="field">
                  <label>Price (₹)</label>
                  <input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} min="0" />
                </div>
                <div className="field full">
                  <label>Thumbnail Image</label>
                  <input type="file" accept="image/*" onChange={(e) => handleThumbnailUpload(e, true)} disabled={editThumbnailUploading} />
                  {editThumbnailUploading && <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>Uploading...</span>}
                  {editThumbnailUrl && !editThumbnailUploading && (
                     <div style={{ marginTop: '0.5rem' }}>
                       <img src={editThumbnailUrl} alt="Preview" style={{ width: '100px', borderRadius: '4px' }} />
                     </div>
                  )}
                </div>
                <div className="field full">
                  <button type="submit" className="btn primary" disabled={isUpdating} style={{ width: '100%' }}>
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </article>
          ) : (
            // Create Course Form
            <article className="panel">
              <div className="section-head" style={{ marginBottom: '1rem' }}>
                <h3>Create New Course</h3>
              </div>
              <form className="form-grid" onSubmit={handleCreateCourse}>
                <div className="field full">
                  <label>Course Name</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Master MERN Stack" required />
                </div>
                <div className="field full">
                  <label>Description</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Course details..." required rows="3"></textarea>
                </div>
                <div className="field">
                  <label>Price (₹)</label>
                  <input type="number" value={price} onChange={e => setPrice(e.target.value)} min="0" placeholder="0 for free" />
                </div>
                <div className="field full">
                  <label>Thumbnail Image</label>
                  <input type="file" accept="image/*" onChange={(e) => handleThumbnailUpload(e, false)} disabled={thumbnailUploading} />
                  {thumbnailUploading && <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)' }}>Uploading image...</span>}
                  {thumbnailUrl && !thumbnailUploading && (
                     <div style={{ marginTop: '0.5rem' }}>
                       <img src={thumbnailUrl} alt="Preview" style={{ width: '100px', borderRadius: '4px' }} />
                     </div>
                  )}
                </div>
                <div className="field full">
                  <button type="submit" className="btn primary" disabled={isSubmitting} style={{ width: '100%' }}>
                    {isSubmitting ? 'Creating...' : 'Create Course'}
                  </button>
                </div>
              </form>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;