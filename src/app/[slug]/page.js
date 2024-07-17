'use client';
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Page({ params }) {
  const [copied, setCopied] = useState(false);
  const productID = params.slug;
  const products = useSelector((state) =>state.prodectData.prodectes );

  const filteredProduct = products.filter(
    (product) => product._id === productID
  )[0];

  const handleCopy = () => {
    navigator.clipboard
      .writeText(filteredProduct.description)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
  };

  if (!filteredProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="mt-[90px] bg-gray-50 dark:bg-gray-800 min-h-screen flex flex-col items-center justify-start p-6">
      <div className="max-w-4xl w-full bg-white shadow-xl dark:shadow-none dark:bg-gray-900 rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              {filteredProduct.name}
            </h2>
            <h3 className="text-2xl text-blue-500 dark:text-blue-300 mt-2">
              السعر: {filteredProduct.price} ج
            </h3>
            <h3 className="text-xl text-teal-500 dark:text-teal-300 mt-2">
             العموله : {filteredProduct.commission} ج
            </h3>
            <h3 className="text-xl text-teal-500 dark:text-teal-300 mt-2">
              مصاريف الشحن : {filteredProduct.Delivery} ج
            </h3>

            <div
              className={`max-w-screen-sm text-gray-600 dark:text-gray-300 mt-6 p-6 rounded-lg transition-all ${
                copied ? "bg-green-200" : "bg-gray-200"
              } hover:bg-gray-300 dark:hover:bg-gray-600`}
              onClick={handleCopy}
              style={{ cursor: "pointer" }}
            >
              {filteredProduct.description}
            </div>
            <div className="mt-2">
              {copied ? (
                <span className="text-green-500">تم نسخ النص بنجاح!</span>
              ) : (
                <span className="text-red-500">انقر لنسخ النص</span>
              )}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-6">
            {filteredProduct.imagePath.map((imagePath, idx) => (
              <div
                key={idx}
                className="group relative h-48 md:h-64 rounded-lg overflow-hidden shadow-lg transition-transform transform-gpu hover:scale-110"
              >
                <img
                  src={imagePath}
                  loading="lazy"
                  alt={`Product image ${idx}`}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"
                />
                <span className="relative ml-4 mb-3 text-white md:text-lg">Image {idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="block mx-auto bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-full transition-all duration-200 shadow-lg transform hover:-translate-y-1">
          أضف إلى السلة
        </button>
      </div>
    </div>
  );
}
