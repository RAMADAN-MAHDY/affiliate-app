'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"; 
import { add, fetchData ,setCategory } from '@/lib/authSlice';
import Link from 'next/link';
import Dropdowncategory from '@/app/componant/catgory';
import { FcSearch } from "react-icons/fc";
import { ToastContainer, toast , Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingCard from '@/app/componant/loadingCard/loadingCards'; 
const ProductsCard = () => {



//   const [usercode, setUsercode] = useState( typeof window !== 'undefined' ?localStorage.getItem('codeorderaffilate') || '':'');
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const dispatch = useDispatch();
  const products = useSelector((state) => state.prodectData.prodectes);
  const currentCategory = useSelector((state) => state.prodectData.currentCategory);



  const fetchProducts = (category) => {

    dispatch(fetchData(category));

  };





//send category to authSlice 

    const getCategory = (category) => {
        dispatch(setCategory(category));  // تحديث الفئة الحالية في الحالة
        fetchProducts(category);  // جلب المنتجات بناءً على الفئة المحددة
      };

  const notifySuccess = () => toast.success('تم اضافة المنتج اللي السله', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Flip,
  })


  // send category spare partes by default
  useEffect(() => {
    fetchProducts(currentCategory);
  }, [currentCategory]);
  

  const handleAddToCart = (product) => {

    dispatch(add({ ...product, quantity: 1 }));

    notifySuccess();
  };


//   filter data by name and price
const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.address.toLowerCase().includes(searchTerm.toLowerCase());
    const priceToUse = product.newprice > 0 ? product.newprice : product.price;
    const matchesMinPrice = minPrice === '' || priceToUse >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === '' || priceToUse <= parseFloat(maxPrice);
    return matchesSearchTerm && matchesMinPrice && matchesMaxPrice;
  });


console.log(products);

if(products.length > 0 ){
    return <>
    <div className=" bg-gradient-to-b from-[#443444] to-purple-600 p-10 mt-[10px]">
      <h1 className="text-3xl font-bold text-white mb-7 font-serif">منتجاتنا</h1>

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
    <h1> سيتم افتتاح هذا القسم قريبا ان شاء الله </h1>
    </div>
    </>
}

  return (
    <div className=" bg-gradient-to-b from-[#443444] to-purple-600 p-10 mt-[10px]">
      <h1 className="text-3xl font-bold text-white mb-7 font-serif">منتجاتنا</h1>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-9">


        {filteredProducts.length > 0 ? filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md dark:bg-gray-800 dark:shadow-none rounded-lg overflow-hiddowen transition-transform transform hover:scale-105"
          >
            {product.image && (<div className='relative'>
                <img
    className="w-full h-56 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg rounded-lg"
    src={product.image[0]}
    alt={product.address}
  />
{product.newprice < product.price  &&
<p className='font-bold bg-{#333} bg-[#f00] p-2 text-[#ffffff] fixed top-3 right-2 rounded-full'>{((product.price - product.newprice) / product.price * 100).toFixed(0)}%</p>
}
              </div>
            )}
            <div className="px-6 py-4">
              <h2 className="text-xl font-bold text-gray-800">{product.address}</h2>
              <p className={`text-gray-700 ${product.newprice > 0 ? 'line-through text-red-500' : ''}`}>
                السعر: ج{product.price}
              </p>
              {product.newprice > 0 && (
                <div className='flex justify-around'>
                  <p className="text-gray-700 font-bold">السعر: ج{product.newprice}</p>
                  
                </div>
              )}
            </div>
            <div className="px-6 pb-4 flex justify-between">
              <button 
                onClick={() => handleAddToCart(product)}
                className={`hover:bg-blue-700 font-bold py-2 px-4 rounded-full bg-blue-500 text-white`}
              >
                  اضافة اللي السلة 
              </button>
              <Link
                href={`/prodect/${product._id}`}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-1  rounded-3xl"
              >
                 التفاصيل
              </Link>
            </div>
          </div>
        )):
        
        <LoadingCard/>
        
        }
      </div>
    </div>
  );
};

export default ProductsCard;
