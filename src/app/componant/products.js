'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"; 
import { add, fetchData } from '@/lib/authSlice';
import Link from 'next/link';
import Dropdowncategory from '@/app/componant/catgory';

const ProductsCard = () => {
  const [showmasage, setShowMasage] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.prodectData.prodectes);

  const getCategory = (category) => {
    console.log(category);
    dispatch(fetchData(category));
    console.log(products)

    return category;
  };

  useEffect(() => {
    // استدعاء fetchData بدون تمرير فئة محددة في البداية لعرض كل المنتجات
    dispatch(fetchData(getCategory));
    console.log(products)
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(add({ ...product, quantity: 1 }));
    setShowMasage(true);
    setTimeout(() => setShowMasage(false), 2000);
  };

  return (
    <div className=" bg-gradient-to-b from-[#443444] to-purple-600 p-10 mt-[30px]">
      <h1 className="text-3xl font-bold text-white mb-7">منتجاتنا</h1>

      <Dropdowncategory getCategory={getCategory} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-9">
        {products.length > 0 && products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md dark:bg-gray-800 dark:shadow-none rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            {product.image && (
              <img
                className="w-full h-56 object-cover transition-opacity duration-200 hover:opacity-75"
                src={product.image[0]}
                alt={product.address}
              />
            )}
            <div className="px-6 py-4">
              <h2 className="text-xl font-bold text-gray-800">{product.address}</h2>
              <p className={`text-gray-700 ${product.newprice > 0 ? 'line-through text-red-500' : ''}`}>
                السعر: ج{product.price}
              </p>
              {product.newprice > 0 && (
                <div className='flex justify-around'>
                  <p className="text-gray-700">السعر: ج{product.newprice}</p>
                  <p className='font-bold bg-{#333} text-[#ffffff]'>{((product.price - product.newprice) / product.price * 100).toFixed(0)}%</p>
                </div>
              )}
            </div>
            <div className="px-6 pb-4 flex justify-between">
              <button
                onClick={() => handleAddToCart(product)}
                className={`hover:bg-blue-700 font-bold py-2 px-4 rounded-full bg-blue-500 text-white`}
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
        ))}
      </div>
      {showmasage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg">
          المنتج تمت إضافته إلى السلة
        </div>
      )}
    </div>
  );
};

export default ProductsCard;
