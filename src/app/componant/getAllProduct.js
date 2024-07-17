"use client"

import React, { useEffect } from 'react';
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

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllData());
    }
  }, [status, dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <div className="container  p-4 bg-gradient-to-b from-[#443444] to-purple-600 m-0 w-full">
         <h1 className="text-3xl font-bold text-white mb-7">منتجاتنا</h1>
      {status === 'failed' && <LoadingCard />}
      {status === 'succeeded' && (
        <div>
          {Object.keys(Allprodectes).map(category => (
            <div key={category}>
              <h2 className="text-xl font-bold mb-4 text-[#fff]">{category}</h2>
              <Slider {...settings}>
                {Allprodectes[category].map(product => (


                  <div key={product._id} className="p-2">
                    {product.category&& <h2>  {product.category} </h2>}

                    <div className="relative border p-4 rounded-lg transition-transform duration-300 hover:scale-105 bg-[#868686]"
 
                    >
                          {product.image && product.image.length > 0 && (
                        <img 
                          src={product.image[0]} 
                          alt={product.address} 
                          className="mt-0 mb-2 w-full h-auto object-cover rounded-lg"
                        />
                      )}
                      <h3 className="text-lg font-semibold text-[#fff]">{product.address}</h3>
                      <p className="mt-2">
                        {product.newprice > 0 ? (
                          <>
                            <span className="line-through font-bold text-red-500">ج.م{product.price}</span>
                            <span className="ml-2 mr-2 font-bold text-green-500">ج.م{product.newprice}</span>
                          </>
                        ) : (
                          <span>ج.م{product.price}</span>
                        )}
                      </p>
                      {product.newprice > 0  && (
                        <p className="mt-1 text-sm font-bold text-[#fff]">
                           {Math.round(((product.price - product.newprice) / product.price) * 100)}%خصم  
                        </p>
                      )}
                      <Link
                href={`/prodect/${product._id}`}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full line-clamp-none"
              >
                 التفاصيل
              </Link>
                    </div>
                  </div>
))}
              </Slider>
            </div>
          ))}
        </div>
      )}
      {/* {status === 'failed' && <div>Error loading data</div>} */}
    </div>
  );
};

export default ProductList;
