import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const roleOptions = ['ADMIN', 'INSTRUCTOR', 'STUDENT'];

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [error, setError] = useState('');
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data || []);
      setError('');
    } catch (err) {
      console.error('Failed to load users', err);
      setError('Unable to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const adminUpdate = async (userId, payload, message) => {
    setSaving((prev) => ({ ...prev, [userId]: true }));
    try {
      await api.put(`/admin/users/${userId}`, payload);
      await fetchUsers();
      if (message) alert(message);
    } catch (err) {
      console.error('Failed to update user', err);
      alert('Unable to update user.');
    } finally {
      setSaving((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handleToggleActive = async (user) => {
    await adminUpdate(user.id, { active: !user.active }, user.active ? 'User deactivated.' : 'User activated.');
  };

  const handleRoleChange = async (user, role) => {
    if (role === user.role?.name) return;
    await adminUpdate(user.id, { role }, 'User role updated.');
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user? This action cannot be undone.')) return;

    setSaving((prev) => ({ ...prev, [userId]: true }));
    try {
      await api.delete(`/admin/users/${userId}`);
      await fetchUsers();
      alert('User deleted successfully.');
    } catch (err) {
      console.error('Failed to delete user', err);
      alert('Unable to delete user.');
    } finally {
      setSaving((prev) => ({ ...prev, [userId]: false }));
    }
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();

    if (!newName || !newEmail || !newPassword) {
      alert('Name, email, and password are required for new students.');
      return;
    }

    setCreating(true);
    try {
      await api.post('/admin/users', {
        name: newName.trim(),
        email: newEmail.trim(),
        password: newPassword,
        role: 'STUDENT'
      });
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      await fetchUsers();
      alert('New student account created successfully.');
    } catch (err) {
      console.error('Failed to create student', err);
      alert('Unable to create student. Please check the details and try again.');
    } finally {
      setCreating(false);
    }
  };

  const formatDate = (value) => {
    if (!value) return '-';
    return new Date(value).toLocaleDateString();
  };

  return (
    <section className="view-panel" style={{ display: 'grid', gap: 'var(--space-6)' }}>
      <article className="panel">
        <div className="section-head">
          <div>
            <h3>Manage Users</h3>
            <p>Review all registered users and update their role or activation status.</p>
          </div>
          <button className="btn secondary" onClick={() => navigate('/admin')}>
            Back to Dashboard
          </button>
        </div>

        <form onSubmit={handleCreateStudent} className="form-grid" style={{ marginTop: '1.5rem', gridTemplateColumns: '1fr', gap: '1rem' }}>
          <h4 style={{ marginBottom: '0.75rem' }}>Create New Student</h4>
          <div className="field full">
            <label>Name</label>
            <input
              required
              placeholder="Student Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className="field full">
            <label>Email</label>
            <input
              required
              type="email"
              placeholder="student@example.com"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div className="field full">
            <label>Password</label>
            <input
              required
              type="password"
              placeholder="Set a temporary password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn primary" disabled={creating}>
            {creating ? 'Creating...' : 'Create Student'}
          </button>
        </form>
      </article>

      <article className="table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  Loading users...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: 'var(--color-danger)' }}>
                  {error}
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.role || ''}
                      onChange={(e) => handleRoleChange(user, e.target.value)}
                      disabled={saving[user.id]}
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{user.active ? 'Active' : 'Inactive'}</td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>
                    <div className="actions">
                      <span className="chip-btn" onClick={() => handleToggleActive(user)}>
                        {user.active ? 'Deactivate' : 'Activate'}
                      </span>
                      <span className="chip-btn warn" onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </article>
    </section>
  );
}
