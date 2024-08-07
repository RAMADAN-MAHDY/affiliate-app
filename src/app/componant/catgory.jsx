"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import style from "./cssSheet/marquee.module.css"; // تأكد من إضافة ملف CSS هذا

const DropdownCategory = ({ getCategory }) => {
    const [buttonFocas, setButtonfocas] = useState(null);

    const handleAction = (key, value) => {
        setButtonfocas(value); // تحديث النص في الزر
        getCategory(key); // تمرير المفتاح إلى الدالة المرسلة
    };

    return (
        <div className="mb-3 overflow-x-auto flex space-x-3">
            <Button
                color="secondary"
                className={`${buttonFocas==="1" ?  style.buttonActive : "p-3"} w-40 h-12`}
                onClick={() => handleAction("products/3", "1")}
            >
                <div className={style.marquee}>
                    <span>منتجات منزلية</span>
                </div>
            </Button>
            
            <Button
                color="secondary"
                className={`${buttonFocas==="2" ?  style.buttonActive : "p-1"} w-[170px] h-12`}
                onClick={() => handleAction("products/1", '2')}
            >
                <div className={style.marquee}>
                    <span>اجهزه الكترونيه ( ساعات - سماعات - موبيلات )</span>
                </div>
            </Button>

            <Button
                color="secondary"
                className={`${buttonFocas==="3" ?  style.buttonActive : "p-1"} w-40 h-12`}
                onClick={() => handleAction("products/2", "3")}
            >
                <div className={style.marquee}>
                    <span>ملابس ( رجالي - حريمي - اطفال )</span>
                </div>
            </Button>

            <Button
                color="secondary"
                className={`${buttonFocas==="4" ?  style.buttonActive : "p-1"} w-40 h-12`}
                onClick={() => handleAction("products/5", '4')}
            >
                <div className={style.marquee}>
                    <span>ستائر ومفروشات</span>
                </div>
            </Button>

            <Button
                color="secondary"
                className={`${buttonFocas==="5" ? style.buttonActive : "p-1"} w-40 h-12`}
                onClick={() => handleAction("products/4", '5')}
            >
                <div className={style.marquee}>
                    <span>منتجات اوت دور ( حدائق )</span>
                </div>
            </Button>
        </div>
    );
};

export default DropdownCategory;
