"use client";

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllData } from '@/lib/authSlice';
import LoadingCard from '@/app/componant/loadingCard/loadingCards';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import Link from 'next/link';

const ProductList = () => {
  const dispatch = useDispatch();
  const { Allprodectes, status } = useSelector(state => state.prodectData);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllData());
    }
  }, [status, dispatch]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const handleAddToCart = (product) => {
    dispatch(add({ ...product, quantity: 1 }));
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div className="p-4 bg-gradient-to-b from-[#443444] to-purple-600 m-0 w-full">
      <h1 className="text-3xl font-bold text-white mb-7">منتجاتنا</h1>
      {status === 'failed' && <LoadingCard />}
      {status === 'succeeded' && (
        <div>
          {Object.keys(Allprodectes).map(category => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-[#fff]">{category}</h2>
              <Slider {...settings}>
                {Allprodectes[category].map((product) => (
                  <div
                    key={product._id}
                    className=" shadow-md dark:text-[#fff] dark:bg-gray-800 dark:shadow-none rounded-lg overflow-hidden transition-transform transform hover:scale-105 sm:w-[200px] p-4 mx-2"
                    style={{ width: '150px' }}
                  >
                    <div className='bg-[#1ffa1f]'>

                    {product.image && (
                      <img
                        className="w-full h-48 object-cover transition-opacity duration-200 hover:opacity-75"
                        src={product.image[0]}
                        alt={product.address}
                      />
                    )}
                    <div className="px-4 py-3">
                      <h2 className="text-lg font-bold text-gray-800">{product.address}</h2>
                      <p className={`text-gray-700 ${product.newprice > 0 ? 'line-through text-red-500 p-1 ' : ''}`}>
                        السعر: ج{product.price}
                      </p>
                      {product.newprice > 0 && (
                        <div className='flex justify-around'>
                          <p className="text-gray-700">السعر: ج{product.newprice}</p>
                          <p className='font-bold bg-[#ff0000] text-[#ffffff]'>{((product.price - product.newprice) / product.price * 100).toFixed(0)}%</p>
                        </div>
                      )}
                    </div>
                    <div className="px-4 pb-3 flex justify-between">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="hover:bg-blue-700 font-bold py-2 px-4 rounded-full bg-blue-500 text-white"
                      >
                        إضافة إلى السلة
                      </button>
                      <Link
                        href={`/prodect/${product._id}`}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        عرض التفاصيل
                      </Link>
                    </div>

                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
