import React, { useState } from 'react';
import api from '../../services/api';

export default function AdminCreateCourse({ onSaved }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    price: '',
    freeCourse: true,
    published: true
  });
  const [saving, setSaving] = useState(false);

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/admin/courses', {
        ...form,
        price: form.price === '' ? 0 : Number(form.price)
      });
      onSaved && onSaved();
      alert('Course created successfully');
      setForm({
        title: '',
        description: '',
        thumbnailUrl: '',
        price: '',
        freeCourse: true,
        published: true
      });
    } catch (err) {
      console.error(err);
      alert('Error creating course');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="form-grid" style={{ display: 'grid', gap: '1rem' }}>
      <input name="title" value={form.title} onChange={change} placeholder="Course Title" required />
      <textarea name="description" value={form.description} onChange={change} placeholder="Course Description" required />
      <input name="thumbnailUrl" value={form.thumbnailUrl} onChange={change} placeholder="Thumbnail URL" />
      <input name="price" type="number" value={form.price} onChange={change} placeholder="Price" min="0" />
      <label><input type="checkbox" name="freeCourse" checked={form.freeCourse} onChange={change} /> Free Course</label>
      <label><input type="checkbox" name="published" checked={form.published} onChange={change} /> Published</label>
      <button className="btn primary" type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Create Course'}
      </button>
    </form>
  );
}