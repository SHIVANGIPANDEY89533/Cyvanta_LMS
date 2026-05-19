// src/components/student/CourseContentList.jsx
export default function CourseContentList() {
  return (
    <div className="stack">
      <div className="item">
        <div>
          <strong>React Mastery Bootcamp</strong>
          <p className="muted">Instructor: Aditi Sharma</p>
        </div>
        <span className="chip-btn">View syllabus</span>
      </div>

      <div className="item">
        <div>
          <strong>Module 07 State Management</strong>
          <p className="muted">12 videos, 2 quizzes, 1 live session</p>
        </div>
        <span className="chip-btn">Open</span>
      </div>

      <div className="item">
        <div>
          <strong>Assignment Pack</strong>
          <p className="muted">Hooks challenge, API data flow, dashboard build.</p>
        </div>
        <span className="chip-btn">Submit</span>
      </div>
    </div>
  );
}