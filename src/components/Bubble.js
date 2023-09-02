import React from 'react';
import './Bubble.css';

function Bubble({ link, description, status }) {
  return (
    <div className="bubble-container">
      {status === 'inProgress' ? (
        <div className="bubble in-progress">
          <span className="coming-soon">Coming Soon</span>
        </div>
      ) : (
        <a href={link} className="bubble-link">
          <div className="bubble"></div>
        </a>
      )}
      <div className="bubble-description">{description}</div>
    </div>
  );
}

export default Bubble;