// src/components/common/Loader.jsx
export default function Loader({ text = "Loading..." }) {
  return (
    <div className="loader-wrap">
      <div className="loader"></div>
      <p className="muted">{text}</p>
    </div>
  );
}

