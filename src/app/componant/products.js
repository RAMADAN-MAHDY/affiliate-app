'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"; 
import { add, fetchData } from '@/lib/authSlice';
import Link from 'next/link';
import Dropdowncategory from '@/app/componant/catgory';
import { FcSearch } from "react-icons/fc";

const ProductsCard = () => {



//   const [usercode, setUsercode] = useState( typeof window !== 'undefined' ?localStorage.getItem('codeorderaffilate') || '':'');
  const [showmasage, setShowMasage] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const dispatch = useDispatch();
  const products = useSelector((state) => state.prodectData.prodectes);

//send category to authSlice 
  const getCategory = (category) => {
    console.log(category);
    dispatch(fetchData(category));
    console.log(products)

    return category;
  };

  // send category spare partes by default
  useEffect(() => {
    dispatch(fetchData("products/5"));
    console.log(products)
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(add({ ...product, quantity: 1 }));
  };


//   filter data by name and price
const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.address.toLowerCase().includes(searchTerm.toLowerCase());
    const priceToUse = product.newprice > 0 ? product.newprice : product.price;
    const matchesMinPrice = minPrice === '' || priceToUse >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === '' || priceToUse <= parseFloat(maxPrice);
    return matchesSearchTerm && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <div className=" bg-gradient-to-b from-[#443444] to-purple-600 p-10 mt-[30px]">
      <h1 className="text-3xl font-bold text-white mb-7">منتجاتنا</h1>

      <Dropdowncategory getCategory={getCategory} />

      <div className="mb-6">
      <div className="relative mb-4">
          <input
            type="text"
            placeholder="بحث بالاسم"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-md w-full pl-10"
          />
          <FcSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
        </div>
        
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="السعر الأدنى"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-2 rounded-md w-full"
          />
          <input
            type="number"
            placeholder="السعر الأقصى"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-2 rounded-md w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-9">


        {filteredProducts.length > 0 && filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md dark:bg-gray-800 dark:shadow-none rounded-lg overfl-hiddowen transition-transform transform hover:scale-105"
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
              <Link href="/cart"
                onClick={() => handleAddToCart(product)}
                className={`hover:bg-blue-700 font-bold py-2 px-4 rounded-full bg-blue-500 text-white`}
              >
                  اضافة اللي السلة 
              </Link>
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
    </div>
  );
};

export default ProductsCard;
