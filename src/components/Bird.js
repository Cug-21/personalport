import React, { useEffect, useState } from 'react';
import './Bird.css';

import birdGif from './R.gif';

function Bird({ position }) {
  const [rotation, setRotation] = useState(0);
  const [prevPosition, setPrevPosition] = useState(position); // Define prevPosition here

  useEffect(() => {
    const x = position.left;
    const y = position.top;
    
    const prevX = prevPosition.left;
    const prevY = prevPosition.top;

    // Calculate the angle
    const angle = Math.atan2(y - prevY, x - prevX) * (180 / Math.PI);

    // Assuming the bird is initially facing right (0 degrees).
    // Adjust based on the actual image orientation
    setRotation(angle + 90);

  // Update 'prevPosition' for next use
  setPrevPosition({ left: x, top: y });

  }, [position]);

  return (
    <img 
      src={birdGif} 
      alt="Bird" 
      className="bird" 
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px`, 
        transform: `rotate(${rotation}deg)` 
      }}
    />
  );
}

export default Bird;