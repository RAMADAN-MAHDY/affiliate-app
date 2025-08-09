"use client";

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllData, add } from '@/lib/authSlice';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';

const ProductList = () => {
  const dispatch = useDispatch();
  const { Allprodectes, status } = useSelector(state => state.prodectData);
  const [showMessage, setShowMessage] = useState(false);
  const currentCategory = useSelector((state) => state.prodectData.currentCategory);
  const currentCategorySlug = currentCategory.replace("/", "-");

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllData());
    }
  }, [status, dispatch]);

  // إعدادات السلايدر
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } }
    ]
  };

  const handleAddToCart = (product) => {
    dispatch(add({ ...product, quantity: 1 }));
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  // دمج كل المنتجات من جميع الفئات في مصفوفة واحدة
  const allProducts = Object.values(Allprodectes)
    .flat()
    .filter(p => p && p.address); // فلترة المنتجات الفارغة

  return (
    <div className="px-3 sm:px-6 lg:px-12 py-10 bg-gradient-to-b from-[#f0f0f8] to-[#e9e6f1] w-full text-gray-800 dark:from-[#1e1a2b] dark:to-[#431d6e] dark:text-white transition-colors duration-500">

      {/* <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 border-b-4 border-purple-600 pb-3 w-fit mx-auto tracking-wide">
         المنتجات
      </h1> */}

      {status === 'succeeded' && (
        <div>
          {/* عرض للموبايل Grid */}
          <div className="grid grid-cols-2 sm:hidden gap-3">
            {allProducts.map(product => (
              <div
                key={product._id}
                className="bg-white dark:bg-[#2c2a3a] rounded-xl shadow-md p-2 flex flex-col justify-between h-[210px] hover:shadow-lg transition-all duration-300"
              >
                {product.image && (
                  <img
                    className="w-full h-20 object-cover rounded-lg mb-1"
                    src={product.image[0]}
                    alt={product.address}
                  />
                )}
                <h2 className="text-[11px] font-bold line-clamp-2">{product.address}</h2>
                <p className={`text-[10px] ${product.newprice > 0 ? 'line-through text-red-500' : 'text-green-700 font-semibold'}`}>
                  ج{product.price}
                </p>
                {product.newprice > 0 && (
                  <p className="text-[10px] text-green-600 font-bold">ج{product.newprice}</p>
                )}
                <div className="flex justify-between mt-1">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-purple-600 hover:bg-purple-800 text-white py-[2px] px-2 rounded-full text-[9px]"
                  >
                    + سلة
                  </button>
                  <Link
                    href={`/prodect/${product._id}-${currentCategorySlug}`}
                    className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 text-black dark:text-white py-[2px] px-2 rounded-full text-[9px]"
                  >
                    تفاصيل
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* الشاشات الأكبر مع Slider */}
          <div className="hidden sm:block">
            <Slider {...settings}>
              {allProducts.map(product => (
                <div
                  key={product._id}
                  className="bg-white dark:bg-[#2c2a3a] rounded-xl shadow-md mx-2 p-3 flex flex-col justify-between h-[220px] w-[160px] hover:shadow-lg transition-all duration-300"
                >
                  {product.image && (
                    <img
                      className="w-full h-24 object-cover rounded-lg mb-1"
                      src={product.image[0]}
                      alt={product.address}
                    />
                  )}
                  <h2 className="text-[12px] font-bold line-clamp-2">{product.address}</h2>
                  <p className={`text-[11px] ${product.newprice > 0 ? 'line-through text-red-500' : 'text-green-700 font-semibold'}`}>
                    ج{product.price}
                  </p>
                  {product.newprice > 0 && (
                    <p className="text-[11px] text-green-600 font-bold">ج{product.newprice}</p>
                  )}
                  <div className="flex justify-between mt-1">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-purple-600 hover:bg-purple-800 text-white py-[3px] px-2 rounded-full text-[10px]"
                    >
                      + سلة
                    </button>
                    <Link
                      href={`/prodect/${product._id}-${currentCategorySlug}`}
                      className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 text-black dark:text-white py-[3px] px-2 rounded-full text-[10px]"
                    >
                      تفاصيل
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      {showMessage && (
        <div className="fixed bottom-6 right-6 bg-purple-700 text-white py-3 px-6 rounded-xl shadow-lg z-50">
          ✅ تم إضافة المنتج إلى السلة!
        </div>
      )}
    </div>
  );
};

export default ProductList;
