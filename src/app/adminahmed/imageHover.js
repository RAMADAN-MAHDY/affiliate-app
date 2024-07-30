"use client"
import { useState } from "react";
const ImageHoverEffect = ({ src}) => {
    const [isClicked, setIsClicked] = useState(false);
  
    const handleClick = () => {
      setIsClicked(true);
    };
  
    const handleClose = () => {
      setIsClicked(false);
    };
  
    return (
        <>
      <div className="relative bg-[#0dec0d]">
        <img
          className='md:w-16 m-2 w-19 cursor-pointer'
          src={src}
          alt="Product"
          onClick={handleClick}
        />
      </div>

        {isClicked && (
          <div className="fixed top-[50%] right-[30%] md:top-[40%] md:bottom-[10px]  transform -translate-y-1/2 p-2 bg-white border border-gray-400 shadow-lg transition-opacity duration-300 ease-in-out">
            <button
              className="absolute top-0 right-0 m-1 text-black bg-red-200 rounded-full w-6 h-6 flex items-center justify-center"
              onClick={handleClose}
            >
              X
            </button>
            <img className="w-full h-full object-cover " src={src} alt="Product Enlarged" />
          </div>

        )}
        </>
    );
  };
  export default ImageHoverEffect ;