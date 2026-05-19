// src/components/admin/ActionChips.jsx
export default function ActionChips({ actions = [] }) {
  return (
    <div className="actions">
      {actions.map((action, index) => (
        <span
          key={index}
          className={`chip-btn ${action.type === "warn" ? "warn" : ""}`}
        >
          {action.label}
        </span>
      ))}
    </div>
  );
}