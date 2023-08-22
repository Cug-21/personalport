import React, { useRef, useEffect } from 'react';
import './App.css';

function Carousel({ images }) {
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const scrollPosition = carouselRef.current.scrollLeft;
        const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;

        // Scroll to the beginning if we've reached the end
        if (scrollPosition >= maxScroll) {
          carouselRef.current.scrollLeft = 0;
        } else {
          carouselRef.current.scrollLeft += 200; // Pixels scrolled
        }
      }
    }, 2000); // Time interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container" ref={carouselRef}>
      {images.map((imgSrc, index) => (
        <div key={index} className="carousel-item">
          <img src={imgSrc} alt={`Carousel ${index}`} />
        </div>
      ))}
    </div>
  );
}

export default Carousel;