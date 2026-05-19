// src/components/common/Button.jsx
export default function Button({
  text,
  children,
  type = "button",
  variant = "primary",
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${variant} ${className}`}
    >
      {text || children}
    </button>
  );
}