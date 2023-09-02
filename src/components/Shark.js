import React, { useEffect, useState } from 'react';
import './Shark.css';
import walkingDog from './shark.gif'; 

function Shark() {
    const [position, setPosition] = useState(0); 
    const [direction, setDirection] = useState(1); 

    useEffect(() => {
        const moveDog = () => {
            if (position >= window.innerWidth - 50) { 
                setDirection(-1);
            }
            if (position <= 0) {
                setDirection(1);
            }
            setPosition((prevPosition) => prevPosition + (5 * direction)); 
        };

        const interval = setInterval(moveDog, 50); 
        return () => clearInterval(interval); 
    }, [position, direction]);

    return (
        <img 
            src={walkingDog}  
            alt="Shark" 
            className="Shark" 
            style={{ 
                left: `${position}px`, 
                transform: direction === 1 ? 'scaleX(-1)' : 'scaleX(1)'
            }} 
        />
    );
}

export default Shark;