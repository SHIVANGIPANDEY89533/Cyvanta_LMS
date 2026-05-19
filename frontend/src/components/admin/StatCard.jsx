// src/components/admin/StatCard.jsx
export default function StatCard({ label, value, text }) {
  return (
    <article className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p className="muted">{text}</p>
    </article>
  );
}