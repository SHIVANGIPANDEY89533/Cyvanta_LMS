import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroCard from '../../components/students/HeroCard'; 
import api from '../../services/api';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
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

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/courses');
      setCourses(response.data);
    } catch (err) {
      console.error("Failed to load courses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleThumbnailUpload = async (e, isEdit) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      if (isEdit) {
        setEditThumbnailUploading(true);
      } else {
        setThumbnailUploading(true);
      }

      const response = await api.post('/admin/courses/thumbnail', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (isEdit) {
        setEditThumbnailUrl(response.data.thumbnailUrl);
      } else {
        setThumbnailUrl(response.data.thumbnailUrl);
      }
    } catch (err) {
      console.error('Failed to upload thumbnail', err);
      alert('Error uploading thumbnail.');
    } finally {
      if (isEdit) {
        setEditThumbnailUploading(false);
      } else {
        setThumbnailUploading(false);
      }
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
        freeCourse: Number(price) === 0
      });
      
      // Clear form
      resetCreateForm();
      
      // Refresh list
      await fetchCourses();
      alert("Course created successfully!");
    } catch (err) {
      console.error("Failed to create course", err);
      alert("Error creating course.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
    const file = e.target.files[0];
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

  const navigate = useNavigate();

  return (
    <section className="view-panel" style={{ display: 'grid', gap: 'var(--space-6)' }}>
      
      {/* 1. Admin Hero & Stats Section */}
      <div className="hero">
        <HeroCard 
          eyebrow="Admin Dashboard"
          title="Manage courses, videos, live classes, and users from one control room."
          description="Use the panels below to instantly create new courses that will appear on the student dashboard."
          primaryBtn="Create Course"
          secondaryBtn="Manage Users"
          onSecondaryClick={() => navigate('/admin/users')}
        />
        
        <div className="stats-grid">
          <article className="stat-card">
            <span>Total Students</span><strong>1,284</strong>
            <p className="muted">+8.4% this month.</p>
          </article>
          <article className="stat-card">
            <span>Total Courses</span><strong>{courses.length}</strong>
            <p className="muted">Published across all categories.</p>
          </article>
          <article className="stat-card">
            <span>Live Classes Today</span><strong>04</strong>
            <p className="muted">2 already streaming.</p>
          </article>
        </div>
      </div>

      {/* 2. Admin Grid (Left: Tables, Right: Forms) */}
      <section className="admin-grid">
        
        {/* ================= LEFT COLUMN: TABLES ================= */}
        <div className="stack">
          
          {/* Manage Courses Table */}
          <article className="table-card">
            <div className="section-head" style={{ padding: '1.25rem 1.25rem 0 1.25rem' }}>
              <div>
                <h3>Manage Courses</h3>
                <p>Course name, status, and actions.</p>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="4" style={{ textAlign: 'center' }}>Loading courses...</td></tr>
                ) : courses.length === 0 ? (
                  <tr><td colSpan="4" style={{ textAlign: 'center' }}>No courses found. Create one!</td></tr>
                ) : (
                  courses.map(course => (
                    <tr key={course.id}>
                      <td>{course.title}</td>
                      <td>{course.price > 0 ? `$${course.price}` : 'Free'}</td>
                      <td>{course.published ? 'Published' : 'Draft'}</td>
                      <td>
                        <div className="actions">
                          <span className="chip-btn" onClick={() => handleEditCourse(course)}>
                            Edit
                          </span>
                          <span className="chip-btn warn" onClick={() => handleDeleteCourse(course.id)}>
                            Delete
                          </span>
                          <span className="chip-btn" onClick={() => handleOpenVideoUpload(course)}>
                            Add Video
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </article>

        </div>

        {/* ================= RIGHT COLUMN: FORMS ================= */}
        <div className="stack">
          
          {/* Create Course Form */}
          <article className="panel">
            <div className="section-head">
              <div>
                <h3>{editCourse ? 'Edit Course' : 'Create New Course'}</h3>
                <p>
                  {editCourse
                    ? 'Update the selected course details.'
                    : 'Title, description, and price to publish instantly.'}
                </p>
              </div>
            </div>
            <form onSubmit={editCourse ? handleUpdateCourse : handleCreateCourse} className="form-grid">
              <div className="field full">
                <label>Course Title</label>
                <input
                  required
                  placeholder="e.g. Master MERN Stack 2024"
                  value={editCourse ? editTitle : title}
                  onChange={(e) =>
                    editCourse ? setEditTitle(e.target.value) : setTitle(e.target.value)
                  }
                />
              </div>
              <div className="field">
                <label>Course Price ($)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  placeholder="e.g. 49.99 (0 for free)"
                  value={editCourse ? editPrice : price}
                  onChange={(e) =>
                    editCourse ? setEditPrice(e.target.value) : setPrice(e.target.value)
                  }
                />
              </div>
              <div className="field">
                <label>Thumbnail Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleThumbnailUpload(e, !!editCourse)}
                  disabled={editCourse ? editThumbnailUploading : thumbnailUploading}
                />
                {editCourse ? (
                  editThumbnailUploading ? <small style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', display: 'block' }}>Uploading...</small> :
                  editThumbnailUrl && editThumbnailUrl !== 'sample-thumbnail-url' && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <img src={editThumbnailUrl} alt="Thumbnail preview" style={{ maxWidth: '100px', borderRadius: '4px' }} />
                      <small style={{ color: 'var(--color-primary)', display: 'block' }}>Thumbnail uploaded!</small>
                    </div>
                  )
                ) : (
                  thumbnailUploading ? <small style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', display: 'block' }}>Uploading...</small> :
                  thumbnailUrl && thumbnailUrl !== 'sample-thumbnail-url' && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <img src={thumbnailUrl} alt="Thumbnail preview" style={{ maxWidth: '100px', borderRadius: '4px' }} />
                      <small style={{ color: 'var(--color-primary)', display: 'block' }}>Thumbnail uploaded!</small>
                    </div>
                  )
                )}
              </div>
              <div className="field full">
                <label>Description</label>
                <textarea
                  required
                  placeholder="Write a detailed description about what students will learn..."
                  value={editCourse ? editDescription : description}
                  onChange={(e) =>
                    editCourse ? setEditDescription(e.target.value) : setDescription(e.target.value)
                  }
                />
              </div>
              <div className="field full" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button type="submit" className="btn primary" disabled={editCourse ? isUpdating : isSubmitting}>
                  {editCourse
                    ? isUpdating
                      ? 'Updating...'
                      : 'Save Changes'
                    : isSubmitting
                    ? 'Saving...'
                    : 'Save & Publish Course'}
                </button>
                {editCourse && (
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={resetEditForm}
                    style={{ minWidth: 'fit-content' }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </article>

          {videoCourse && (
            <article className="panel" style={{ marginTop: '2rem' }}>
              <div className="section-head">
                <div>
                  <h3>Upload Video for {videoCourse.title}</h3>
                  <p>Attach a new lecture file to the selected course.</p>
                </div>
              </div>
              <form onSubmit={handleUploadVideo} className="form-grid">
                <div className="field full">
                  <label>Video Title</label>
                  <input
                    required
                    placeholder="e.g. Module 1: Introduction"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                  />
                </div>
                <div className="field full">
                  <label>Video Description</label>
                  <textarea
                    placeholder="e.g. Overview of course goals and content."
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                  />
                </div>
                <div className="field full">
                  <label>Video File</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files[0])}
                  />
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
                  <label>
                    <input
                      type="checkbox"
                      checked={videoFree}
                      onChange={(e) => setVideoFree(e.target.checked)}
                    />
                    {' '}Free Video
                  </label>
                </div>
                <div className="field full" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button type="submit" className="btn primary" disabled={isUploadingVideo}>
                    {isUploadingVideo ? 'Uploading...' : 'Upload Video'}
                  </button>
                  <button type="button" className="btn secondary" onClick={resetVideoForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </article>
          )}

        </div>
      </section>
    </section>
  );
};

export default AdminDashboard;