import React, { useState, useEffect } from 'react';
import HeroCard from '../../components/students/HeroCard'; 
import api from '../../services/api';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [price, setPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCourses = async () => {
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
      setTitle('');
      setDescription('');
      setThumbnailUrl('');
      setPrice(0);
      
      // Refresh list
      fetchCourses();
      alert("Course created successfully!");
    } catch (err) {
      console.error("Failed to create course", err);
      alert("Error creating course.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                          <span className="chip-btn">Edit</span>
                          <span className="chip-btn warn">Delete</span>
                          <span className="chip-btn">Add Video</span>
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
                <h3>Create New Course</h3>
                <p>Title, description, and price to publish instantly.</p>
              </div>
            </div>
            <form onSubmit={handleCreateCourse} className="form-grid">
              <div className="field full">
                <label>Course Title</label>
                <input 
                  required 
                  placeholder="e.g. Master MERN Stack 2024" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="field">
                <label>Thumbnail URL (Optional)</label>
                <input 
                  type="text" 
                  placeholder="https://..." 
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                />
              </div>
              <div className="field full">
                <label>Description</label>
                <textarea 
                  required 
                  placeholder="Write a detailed description about what students will learn..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="field full">
                <button type="submit" className="btn primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save & Publish Course'}
                </button>
              </div>
            </form>
          </article>

        </div>
      </section>
    </section>
  );
};

export default AdminDashboard;