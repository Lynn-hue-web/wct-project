'use client';
import React, { useState, useEffect } from 'react';

const images = [
  '/image/doctor/slide/slide1.jpg',
  '/image/doctor/slide/slide2.jpg',
  '/image/doctor/slide/slide3.jpeg',
];

const SliderPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] flex justify-center items-start bg-gray-100">
      <div className="relative w-full h-[500px] overflow-hidden shadow-lg">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full cursor-pointer ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
              onClick={() => setCurrentIndex(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderPage;
