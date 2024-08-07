'use client'

import { useEffect, useState } from 'react';
import { TbPlayerTrackNextFilled , TbPlayerTrackPrevFilled} from "react-icons/tb";
import '@/app/componant/cssSheet/carsolar.module.css';
const CarouselFadeExample = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);
  const URL= process.env.NEXT_PUBLIC_API_URL
//   console.log(URL);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${URL}/Images`);
        const data = await res.json();
        // console.log(data);

        // تحويل البيانات لتنسيق مناسب
        const formattedImages = data.flatMap((item) =>
          item.image.map((img) => ({
            src: img, // استخدام جميع الصور من الـ Array
            label: item.label,
            caption: item.caption,
          }))
        );
    
        setImages(formattedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full md:h-[70vh] sm:mt-[0px] overflow-hidden">
    <div className="relative w-full h-[35vh] md:h-[70vh] lg:h-[70vh] flex items-center justify-center">
      {images.map((image, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'} flex items-center justify-center w-full h-[50vh] md:h-[60vh] lg:h-[70vh]`}>
          <img
            src={image.src}
            alt={image.label}
            className="img-responsive"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white text-lg">{image.label}</h3>
            <p className="text-white text-sm">{image.caption}</p>
          </div>
        </div>
      ))}
    </div>
    <button onClick={prevSlide} className="absolute rounded-3xl top-1/2 left-0 transform -translate-y-1/2 p-2 bg-[#020202] bg-opacity-50 text-white">
      <TbPlayerTrackPrevFilled />
    </button>
    <button onClick={nextSlide} className="absolute rounded-3xl top-1/2 right-0 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 text-white">
      <TbPlayerTrackNextFilled />
    </button>
  </div>
  
  );
};

export default CarouselFadeExample;
