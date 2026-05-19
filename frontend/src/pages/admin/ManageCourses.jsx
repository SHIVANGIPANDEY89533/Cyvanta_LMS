// src/pages/admin/ManageCourses.jsx
export default function ManageCourses() {
  const courses = [
    { name: "React Mastery Bootcamp", instructor: "Aditi Sharma" },
    { name: "Node.js API Engineering", instructor: "Rohan Verma" },
    { name: "AWS Deployments", instructor: "Priya Menon" },
  ];

  return (
    <article className="table-card">
      <div className="section-head table-head">
        <div>
          <h3>Manage Courses</h3>
          <p>Course name, instructor, and actions.</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Instructor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.name}>
              <td>{course.name}</td>
              <td>{course.instructor}</td>
              <td>
                <div className="actions">
                  <span className="chip-btn">Edit</span>
                  <span className="chip-btn warn">Delete</span>
                  <span className="chip-btn">Add Video</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}