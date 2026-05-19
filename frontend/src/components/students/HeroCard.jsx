import React from 'react';

const HeroCard = ({ eyebrow, title, description, primaryBtn, secondaryBtn }) => {
  return (
    <article className="hero-card">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="hero-actions">
        {primaryBtn && <button className="btn primary">{primaryBtn}</button>}
        {secondaryBtn && <button className="btn secondary">{secondaryBtn}</button>}
      </div>
    </article>
  );
};

export default HeroCard;