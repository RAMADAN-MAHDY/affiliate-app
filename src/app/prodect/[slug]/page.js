'use client';
import { useSelector, useDispatch } from "react-redux"; 
import { add } from '@/lib/authSlice';
import { useState } from "react";
import Navebar from "@/app/componant/navbar";
import { ToastContainer, toast , Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



export default function Page({ params }) {

    const router = useRouter();

  const dispatch = useDispatch();
  const [usercode, setUsercode] = useState( typeof window !== 'undefined' ?localStorage.getItem('codeorderaffilate') || '':'');
  const [copied, setCopied] = useState(false);

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

  const productID = params.slug;

  const products = useSelector((state) =>state.prodectData.prodectes );

  const filteredProduct = products.filter(
    (product) => product._id === productID
  )[0];

  const handleCopy = () => {
    navigator.clipboard
      .writeText(filteredProduct.details)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
  };

  const handleAddToCart = (product) => {
    dispatch(add({ ...product, quantity: 1 }));
    notifySuccess();
  };

  const handleAddToCartAndNavigate = (product) => {
    handleAddToCart(product); // أضف المنتج إلى السلة
    if (usercode) {
      router.push({
        pathname: '/form',
        query: { id: product._id },
      });
    } else {
      router.push('/login');
    }
  };

    useEffect(() => {
        if (!router.isReady) return; // التأكد من أن router جاهز
    }, [router]);

  if (!filteredProduct) {
    return (
        <>
        <Navebar/>
<div>Product not found</div>;
</>
    )
  }

  return (
    <>
    <Navebar/>

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

    <div className="mt-[90px] bg-gray-50 dark:bg-gray-800 min-h-screen flex flex-col items-center justify-start p-6">
      <div className="max-w-4xl w-full bg-white shadow-xl dark:shadow-none dark:bg-gray-900 rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {filteredProduct.address}
            </h2>
            <p className={`text-gray-700 text-[24px] ${filteredProduct.newprice > 0 ? 'line-through text-red-500' : ''}`}>
        السعر: ج{filteredProduct.price}
      </p>
      {filteredProduct.newprice > 0 &&
                    <div className='flex justify-around'>
                        <p className="text-gray-700 font-bold text-[24px] ">السعر: ج{filteredProduct.newprice}</p>
                           
                           <p className='font-bold bg-[#f82525] p-1 text-[#fafafa]'>{((filteredProduct.price - filteredProduct.newprice) / filteredProduct.price *100).toFixed(0)}%</p>
                           
                         </div>  
                           } 
            
            <div
              className={`max-w-screen-sm text-gray-600 dark:text-gray-300 mt-6 p-6 rounded-lg transition-all ${
                copied ? "bg-green-200" : "bg-gray-200"
              } hover:bg-gray-300 dark:hover:bg-gray-600`}
              onClick={handleCopy} 
              style={{ cursor: "pointer" }}
            >
              {filteredProduct.details}
            </div>
            <div className="mt-2">
              {copied ? (
                <span className="text-green-500">تم النسخ  !</span>
              ) : (
                <span className="text-red-500">انقر علي النص لنسخه</span>
              )}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6">
            {filteredProduct.image.map((image, idx) => (
              <div
                key={idx}
                className="group relative h-48 md:h-64 rounded-lg overflow-hidden shadow-lg transition-transform transform-gpu hover:scale-110"
              >
                <img
                  src={image}
                  loading="lazy"
                  alt={`Product image ${idx}`}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="px-6 pb-4 flex justify-between">
        <button className="block mx-auto bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-200 shadow-lg transform hover:-translate-y-1"
        onClick={() => handleAddToCart(filteredProduct)}
        >
       
                  اضافة اللي السلة 
              
        </button>
        
        <button
          onClick={() => handleAddToCartAndNavigate(filteredProduct)}
          className="block mx-auto bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-200 shadow-lg transform hover:-translate-y-1"
        >
          طلب المنتج
        </button>
      </div>
      </div>
    </div>
    </>
  );
}
