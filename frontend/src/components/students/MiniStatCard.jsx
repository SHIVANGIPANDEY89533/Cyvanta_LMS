import React from 'react';

const MiniStatCard = ({ label, value, subtext }) => {
  return (
    <article className="mini-card stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <p className="muted">{subtext}</p>
    </article>
  );
};

export default MiniStatCard;