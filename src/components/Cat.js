import React from 'react';
import './Cat.css';

import nike from './Nike.png';

function Cat({ x, y }) {
    return (
      <img src= {nike} alt="Cat" className="cat" style={{ top: y, left: x }} />
    );
  }

export default Cat;