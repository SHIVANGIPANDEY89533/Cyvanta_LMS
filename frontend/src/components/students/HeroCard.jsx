import React from 'react';

const HeroCard = ({ eyebrow, title, description, primaryBtn, secondaryBtn, onPrimaryClick, onSecondaryClick }) => {
  return (
    <article className="hero-card">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="hero-actions">
        {primaryBtn && (
          <button className="btn primary" onClick={onPrimaryClick}>
            {primaryBtn}
          </button>
        )}
        {secondaryBtn && (
          <button className="btn secondary" onClick={onSecondaryClick}>
            {secondaryBtn}
          </button>
        )}
      </div>
    </article>
  );
};

export default HeroCard;