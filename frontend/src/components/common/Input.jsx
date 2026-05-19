// src/components/common/Input.jsx
export default function Input({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
}) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
}