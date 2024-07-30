'use client';
import { useState } from "react";

const statuses = [
  { label: 'قيد المراجعه', color: 'blue' },
  { label: 'تم قبول الطلب', color: 'blue' },
  { label: 'جاري التوصيل', color: 'blue' },
  { label: 'تم التسليم', color: 'blue' },
  { label: 'تم تحويل العموله', color: 'green' },
];

const OrderStatus = ({ currentStatus }) => {
  return (
    <div className="relative flex items-center w-full">
      {currentStatus < 5 ? statuses.map((status, index) => (
        <div key={index} className="relative flex items-center flex-shrink-0">
          {/* Circle */}
          <div
            className={`w-9 h-9 rounded-full ${index <= currentStatus ? `bg-${status.color}-500` : 'bg-gray-300'} border-2 border-gray-800`}
          />
          <span className="mt-7 text-sm p-1">{status.label}</span>

          {/* Render lines */}
          {index < statuses.length - 1 && (
            <div
              className={`absolute top-1/2 ${index  <= currentStatus ? `bg-${status.color}-500` : 'bg-gray-300'}`}
              style={{
                left: 'calc(50% + 1rem)', // Adjust this to position the lines correctly
                transform: 'translateX(-50%)',
                width: 'calc(100% - 2rem)', // Adjust this value based on your design
                height: '6px',
              }}
            />
          )}
        </div>
      )):
      <div className="flex justify-around">
      <div
            className={`w-9 h-9 rounded-full bg-[red] border-2 border-gray-800`}
          >
          </div>
          <p className=" text-sm p-1"> الطلب ملغي </p>
     </div>
      }
    </div>
  );
};

export default OrderStatus;
