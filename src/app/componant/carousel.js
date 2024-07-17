'use client'

import { useEffect, useState } from 'react';


const images = [
  { src: "/download (1).jpeg", alt: "First slide", label: "First slide label", caption: "Nulla vitae elit libero, a pharetra augue mollis interdum." },
  { src: "/download (2).jpeg", alt: "Second slide", label: "Second slide label", caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { src: "/download.jpeg", alt: "Third slide", label: "Third slide label", caption: "Praesent commodo cursus magna, vel scelerisque nisl consectetur." }
];

const CarouselFadeExample = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="relative w-full h-full overflow-hidden">
      <div className="relative w-full h-[50vh] md:h-[50vh] lg:h-[50vh]">
        {images.map((image, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'} bg-gray-900 bg-opacity-50 w-full h-[50vh] md:h-[50vh] lg:h-[50vh]`}>
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              style={{ height: '50vh' }} 
            />
              
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
              <h3 className="text-white text-lg">{image.label}</h3>
              <p className="text-white text-sm">{image.caption}</p>
           
            </div>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white">Prev</button>
      <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white">Next </button>
                
    </div>
    </>
  );
};

export default CarouselFadeExample;
