import React from 'react';
import './Bubble.css';

function Bubble({ link, description }) {
    return (
      <div className="bubble-container">
        <a href={link} className="bubble-link">
          <div className="bubble"></div>
        </a>
        <div className="bubble-description">{description}</div>
      </div>
    );
  }
  
  export default Bubble;