import React, { useEffect, useState } from 'react';
import './App.css';
function Carousel({ images }) {
  const ITEM_WIDTH = 200;
  const VISIBLE_IMAGES = 3;
  const CENTER_IMAGE = Math.floor(VISIBLE_IMAGES / 2);

  const [currentIndex, setCurrentIndex] = useState(CENTER_IMAGE);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images]);

  const adjustedImages = [...images.slice(-CENTER_IMAGE), ...images, ...images.slice(0, CENTER_IMAGE)];

  return (
    <div className="carousel-container">
      <div 
        className="arrow arrow-left" 
        onClick={() => {
          setCurrentIndex((prev) => (prev - 1 + adjustedImages.length) % adjustedImages.length);
        }}
      >❮</div>

      <div 
        className="carousel-item-container" 
        style={{ transform: `translateX(-${(currentIndex - CENTER_IMAGE) * ITEM_WIDTH}px)` }}
      >
        {adjustedImages.map((imgSrc, index) => (
          <div key={index} className="carousel-item">
            <img src={imgSrc} alt={`Carousel ${index}`} />
          </div>
        ))}
      </div>

      <div 
        className="arrow arrow-right" 
        onClick={() => {
          setCurrentIndex((prev) => (prev + 1) % adjustedImages.length);
        }}
      >❯</div>
    </div>
  );
}

export default Carousel;