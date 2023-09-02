import React, { useEffect, useState } from 'react';
import './Dog.css';

import walkingCat from './walking.gif';

function Kitten() {
    const [position, setPosition] = useState(0); // Starting from the leftmost
    const [direction, setDirection] = useState(1); // 1 is to the right, -1 is to the left

    useEffect(() => {
        const movecat = () => {
            // If dog reaches the right end, reverse direction
            if (position >= window.innerWidth - 200) {
                setDirection(-1);
            }
            // If dog reaches the left end, set direction to right
            if (position <= 0) {
                setDirection(1);
            }
            setPosition((prevPosition) => prevPosition + (5 * direction)); // Move 5 pixels at a time
        };

        const interval = setInterval(movecat, 50); // Move every 50 milliseconds
        return () => clearInterval(interval); // Cleanup
    }, [position, direction]);

    return (
        <img 
            src={walkingCat} 
            alt="Kitten" 
            className="Kitten" 
            style={{ 
                left: `${position}px`, 
                transform: direction === 1 ? 'scaleX(1)' : 'scaleX(-1)' 
            }} 
        />
    );
}

export default Kitten;
