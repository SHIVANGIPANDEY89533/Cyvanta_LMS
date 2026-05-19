// src/components/common/Modal.jsx
export default function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="chip-btn" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}