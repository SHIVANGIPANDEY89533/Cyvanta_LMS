// src/components/admin/CourseForm.jsx
import UploadBox from "./UploadBox";

export default function CourseForm() {
  return (
    <article className="panel">
      <div className="section-head">
        <div>
          <h3>Create Course Page</h3>
          <p>Title, description, thumbnail upload, save.</p>
        </div>
      </div>

      <div className="form-grid">
        <div className="field">
          <label>Course Title</label>
          <input type="text" placeholder="Advanced React Architecture" />
        </div>

        <div className="field">
          <label>Thumbnail Upload</label>
          <UploadBox text="Upload thumbnail" />
        </div>

        <div className="field full">
          <label>Description</label>
          <textarea placeholder="Build scalable, maintainable frontend systems with routing, APIs, and reusable design patterns."></textarea>
        </div>

        <div className="field full">
          <button className="btn primary">Save Course</button>
        </div>
      </div>
    </article>
  );
}