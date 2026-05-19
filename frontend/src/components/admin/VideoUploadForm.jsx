// src/components/admin/VideoUploadForm.jsx
export default function VideoUploadForm() {
  return (
    <article className="panel">
      <div className="section-head">
        <div>
          <h3>Upload Video Page</h3>
          <p>Video title, Cloudinary upload, save.</p>
        </div>
      </div>

      <div className="stack">
        <div className="field">
          <label>Video Title</label>
          <input type="text" placeholder="Lesson 08 Reusable Dashboard Layouts" />
        </div>

        <div className="upload-box">Upload to Cloudinary</div>

        <button className="btn primary">Save</button>
      </div>
    </article>
  );
}