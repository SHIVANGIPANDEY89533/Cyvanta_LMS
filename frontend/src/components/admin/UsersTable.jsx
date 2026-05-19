// src/components/admin/UsersTable.jsx
const users = [
  { name: "Rahul Singh", email: "rahul@mail.com", role: "Student" },
  { name: "Neha Kapoor", email: "neha@mail.com", role: "Instructor" },
  { name: "Admin Team", email: "admin@mail.com", role: "Admin" },
];

export default function UsersTable() {
  return (
    <article className="table-card">
      <div className="section-head table-head">
        <div>
          <h3>Manage Users</h3>
          <p>Name, email, role, and actions.</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <div className="actions">
                  <span className="chip-btn">View</span>
                  <span className="chip-btn">Edit</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}