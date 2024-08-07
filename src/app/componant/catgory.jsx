"use client";
import React, { useState } from "react";
import style from "./cssSheet/marquee.module.css"; // تأكد من إضافة ملف CSS هذا

const DropdownCategory = ({ getCategory }) => {
    const [buttonFocas, setbuttonfocas] = useState(null);

    const handleAction = (key, value) => {
        setbuttonfocas(value); // تحديث النص في الزر
        getCategory(key); // تمرير المفتاح إلى الدالة المرسلة
    };

    return (
        <div className="mb-3 overflow-x-auto flex space-x-3">
            <button
                color="secondary"
                className={`${buttonFocas==="1" ?  style.buttonActive : "p-3"} w-40 h-12 bg-[#bd02ec] rounded-3xl `}
                onClick={() => handleAction("products/3", "1")}
            >
                <div className={`${buttonFocas==="1" && style.marquee} relative overflow-hidden whitespace-nowrap`}>
                    <span className="inline-block">منتجات منزلية</span>
                </div>
            </button>
            
            <button
                color="secondary"
                className={`${buttonFocas==="2" ?  style.buttonActive : "p-1"} w-[460px] h-12 bg-[#bd02ec] rounded-3xl`}
                onClick={() => handleAction("products/1", '2')}
            >
                <div className={`${buttonFocas === "2" && style.marquee} relative overflow-hidden whitespace-nowrap`}>
                    <span className="inline-block">اجهزه الكترونيه ( ساعات - سماعات - موبيلات )</span>
                </div>
            </button>

            <button
                color="secondary"
                className={`${buttonFocas==="3" ?  style.buttonActive : "p-1"} w-[220px] h-12 bg-[#bd02ec] rounded-3xl`}
                onClick={() => handleAction("products/2", "3")}
            >
                <div className={`${buttonFocas==="3" && style.marquee} relative overflow-hidden whitespace-nowrap`}>
                    <span className="inline-block">ملابس ( رجالي - حريمي - اطفال )</span>
                </div>
            </button>

            <button
                color="secondary"
                className={`${buttonFocas==="4" ?  style.buttonActive : "p-1"} w-[175px] h-12 bg-[#bd02ec] rounded-3xl`}
                onClick={() => handleAction("products/5", '4')}
            >
                <div className={`${buttonFocas==="4" && style.marquee} relative overflow-hidden whitespace-nowrap`}>
                    <span className="inline-block">ستائر ومفروشات</span>
                </div>
            </button>

            <button
                color="secondary"
                className={`${buttonFocas==="5" ? style.buttonActive : "p-1"} w-40 h-12 bg-[#bd02ec] rounded-3xl`}
                onClick={() => handleAction("products/4", '5')}
            >
                <div className={`${buttonFocas==="5" && style.marquee} relative overflow-hidden whitespace-nowrap`}>
                    <span className="inline-block">منتجات اوت دور ( حدائق )</span>
                </div>
            </button>
        </div>
    );
};

export default DropdownCategory;
