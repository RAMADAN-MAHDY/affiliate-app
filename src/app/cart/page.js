'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { addquantity } from '@/lib/authSlice';
import Navebar from '../componant/navbar';
const CartTable = ({ products, quantities, onQuantityChange }) => {

    // const dispatch = useDispatch();
// const [Delivery, setDelivary] = useState(
//     products.reduce((acc, product) => {
//       acc[product._id] = product.Delivery;
//       return acc;
//     }, {})
//   );

//   const handleDeliveryChange = (productId, newDelivery) => {
//     let deliveryValue = (newDelivery === "" || isNaN(newDelivery) || newDelivery === ".") ? "": parseFloat(newDelivery);
  
//     setDelivary({
//       ...Delivery,
//       [productId]: deliveryValue,
//     });
//     console.log(deliveryValue)
//     dispatch(addDelivary({productId , deliveryValue}));
//   };
  
  
  
  

  return (
    <table className="sm:ml-[-100px] min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <thead>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">صورة المنتج</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">اسم المنتج</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">السعر</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">العمولة</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الشحن</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[30px]">الكمية</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">إزالة</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <td className="px-6 py-4">
              <Image
                src={product.imagePath[0]}
                width={30}
                height={20}
                alt={`صورة ${product.name}`}
              />
            </td>
            <td className="px-6 py-4 text-gray-800 dark:text-white">
              {product.name}
            </td>
            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
              {product.price * quantities[product._id]} جنيه
            </td>
            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
              {product.commission * quantities[product._id]} جنيه
            </td>
            {/* <td className="px-6 py-4 w-[60px] text-gray-600 dark:text-gray-300">
             <input className='w-[60px] p-2' onChange={(e) => handleDeliveryChange(product._id, parseFloat(e.target.value))}
                value={Delivery[product._id]}/>
            </td> */}
            <td className="px-6 py-4 ">
              <input
                onChange={(e) => onQuantityChange(product._id, parseInt(e.target.value))}
                type="number"
                min="1"
                value={quantities[product._id]}
                className="border  w-[60px] p-2 rounded text-center text-gray-700"
              />
            </td>
            <td className="px-6 py-4 text-red-600 hover:text-red-800">
              <button onClick={() => onQuantityChange(product._id, 0)}>إزالة</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Cart = () => {

const dispatch = useDispatch();
  const products = useSelector((state) => state.prodectData.carts);

  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product._id] = 1;
      return acc;
    }, {})
  );

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setQuantities((prev) => {
        const newQuantities = { ...prev };
        delete newQuantities[productId];
        return newQuantities;
      });
    } else {
      setQuantities({
        ...quantities,
        [productId]: newQuantity,
      });
    }
    // const productToUpdate = products.find(product =>  product._id ==productId );
    console.log(newQuantity )
    dispatch(addquantity({productId ,newQuantity}))
  };

  const total = products.reduce((sum, product) => {


    return sum + product.price * quantities[product._id];
  }, 0);


  





  
  return (
    <>
    <Navebar/>
    

    <div className="container mx-auto p-6 mt-[40px] ml-6">
      <h1 className="text-2xl font-bold mb-4">عربة التسوق</h1>
      <CartTable products={products} quantities={quantities} onQuantityChange={handleQuantityChange} />
      <div className="flex justify-between items-center py-4">
        <h2 className="text-xl font-bold">الإجمالي: {total} جنيه</h2>
        <Link
          href="/checkOut"
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-800 transition-colors"
        >
          متابعة للدفع
        </Link>
      </div>
    </div>
    </>
  );
};

export default Cart;
