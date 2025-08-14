'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { add, fetchData, setCategory } from '@/lib/authSlice';
import Link from 'next/link';
import Dropdowncategory from '@/app/componant/catgory';
import { FcSearch } from 'react-icons/fc';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingCard from '@/app/componant/loadingCard/loadingCards';
import allproudect from '@/app/componant/getAllProduct';
const ProductsCard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const dispatch = useDispatch();
  const products = useSelector((state) => state.prodectData.prodectes);
  const currentCategory = useSelector((state) => state.prodectData.currentCategory);
  const showAllProducts = useSelector((state) => state.prodectData.showAllProducts);

 // handle currentCategory and send it to details slug

 const currentCategorySlug = currentCategory.replace("/","-");





  const fetchProducts = (category) => {
    dispatch(fetchData(category));
  };

  const getCategory = (category) => {
    dispatch(setCategory(category)); // تحديث الفئة الحالية في الحالة
    fetchProducts(category); // جلب المنتجات بناءً على الفئة المحددة
  };

  const notifySuccess = () => toast.success('تم اضافة المنتج الى السلة', {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Flip,
  });

  useEffect(() => {
    fetchProducts(currentCategory);
  }, [currentCategory]);

  const handleAddToCart = (product) => {
    dispatch(add({ ...product, quantity: 1 }));
    notifySuccess();
  };

  let filteredProducts = [];

  if (Array.isArray(products)) {
    filteredProducts = products.filter((product) => {
      const matchesSearchTerm = product.address.toLowerCase().includes(searchTerm.toLowerCase());
      const priceToUse = product.newprice > 0 ? product.newprice : product.price;
      const matchesMinPrice = minPrice === '' || priceToUse >= parseFloat(minPrice);
      const matchesMaxPrice = maxPrice === '' || priceToUse <= parseFloat(maxPrice);
      return matchesSearchTerm && matchesMinPrice && matchesMaxPrice;
    });
  }

  if (products.message === 'no productes fond') {
    return (
      <div className="bg-gradient-to-b m-3 from-[#443444] to-purple-600 sm:p-10 p-6 mt-[10px] w-full">
        {/* <h1 className="text-3xl font-bold text-[#000] mb-7 mt-[-20px] font-serif">منتجاتنا</h1> */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Flip}
        />
        <Dropdowncategory getCategory={getCategory} />
        <h1 className='text-[#fff] text-[24px] w-full font-bold m-9 p-3'>سيتم افتتاح هذا القسم قريبا إن شاء الله</h1>
      </div>
    );
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <LoadingCard />;
  }

  return (
    <div className="bg-gradient-to-b w-[107%] sm:w-[100%] from-[#f0e8f098] to-[#eebbee] p-3 sm:mt-[10px]">
      <h1 className="text-3xl font-bold text-[#000] mb-7 ml-[40vw] font-serif">منتجاتنا</h1>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />

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


  {showAllProducts ? (

        <allproudect/>
    
      ):
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-9">
        {filteredProducts.length > 0 ? filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md dark:bg-gray-800 dark:shadow-none rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            {product.image && (
              <div className='relative'>
                <img
                  className="w-full h-56 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg rounded-lg"
                  src={product.image[0]}
                  alt={product.address}
                  loading="lazy"
                />
               {product.newprice !== undefined && product.newprice !== null && product.newprice < product.price && product.newprice > 0 && (
  <p className='font-bold bg-red-600 p-2 text-white fixed top-3 right-2 rounded-full'>
    {((product.price - product.newprice) / product.price * 100).toFixed(0)}%
  </p>
)}

              </div>
            )}
            <div className="px-6 py-4">
              <h2 className="text-xl font-bold text-gray-800">{product.address}</h2>
              <div className='flex justify-around'>
              <p className={` ${product.newprice > 0 ? 'line-through text-red-500' : 'font-bold text-[#05950ac2]'}`}>
                السعر: ج{product.price}
              </p>
              {product.newprice <= 0  && product.commition &&
               <p className={`font-bold text-[#e56e49]`}>
               العموله: {product.commition}
             </p>
              }
             
              </div>
              {product.newprice > 0 && (
                <div className='flex justify-around'>
                  <p className="text-[#05950ac2] font-bold">السعر: ج{product.newprice}</p>
                  {product.commition&& <p class=" font-bold text-[#e56e49]">العموله: ج{product.commition}</p> }
                </div>
              )}
            </div>
            <div className="px-6 pb-4 flex justify-between">
              <button 
                onClick={() => handleAddToCart(product)}
                className="hover:bg-blue-700 font-bold py-2 px-4 rounded-full bg-blue-500 text-white"
              >
                إضافة إلى السلة
              </button>
              <Link
                href={`/prodect/${product._id}-${currentCategorySlug}`}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-1 rounded-3xl"
              >
                التفاصيل
              </Link>
            </div>
          </div>
        )) : (
          <LoadingCard />
        )}
      </div>  
}
</div>
  );
};

export default ProductsCard;
 