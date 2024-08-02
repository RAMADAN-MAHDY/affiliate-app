// SupportPage.js
import React from 'react';
import Navebar from '../componant/navbar';
import { FaFacebook } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
const SupportPage = () => {
  return (
    <>
    <Navebar/>
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">صفحة الدعم</h1>
        <p className="text-gray-600 mb-6">
          إذا كنت بحاجة إلى أي مساعدة، يمكنك التواصل معنا عبر القنوات التالية:
        </p>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
          <FaWhatsappSquare className='w-[40px] text-[40px] text-[#80ff00]' />
            <div>
              <span className="text-lg font-semibold text-gray-700">واتساب</span>
              <p className="text-blue-600 hover:underline">
              <a href="https://wa.me/201060800549">  للتواصل عبر الواتساب</a>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
          <FaFacebook className='w-[40px] text-[40px] text-[#0011ff]' />
            <div>
              <span className="text-lg font-semibold text-gray-700">فيسبوك</span>
              <p className="text-blue-600 hover:underline">
                <a href="https://www.facebook.com/profile.php?id=100064026521260&mibextid=ZbWKwL">   صفحتنا على الفيسبوك</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default SupportPage;
