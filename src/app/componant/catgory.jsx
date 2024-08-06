import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

const DropdownCategory = ({ getCategory }) => {
    //   const [buttonText, setButtonText] = useState("اختر فئة");

    const handleAction = (key, value) => {
        // setButtonText(value); // تحديث النص في الزر
        getCategory(key); // تمرير المفتاح إلى الدالة المرسلة
    };

    return (
        // <Dropdown>
        //   <DropdownTrigger>
        //     <Button variant="faded">{buttonText}</Button>
        //   </DropdownTrigger>
        //   <DropdownMenu aria-label="Action event example">
        //     <DropdownItem
        //       key="products/5"
        //       textValue=" ستائر ومفروشات"
        //       onClick={() => handleAction("products/5", " ستائر ومفروشات")}
        //     >
        //        ستائر و مفروشات 
        //     </DropdownItem>
        //     <DropdownItem
        //       key="products/1"
        //       textValue=" منوعات"
        //       onClick={() => handleAction("products/1", " منوعات")}
        //     >
        //        منوعات
        //     </DropdownItem>
        //     <DropdownItem
        //       key="products/2"
        //       textValue="ملابس"
        //       onClick={() => handleAction("products/2", "ملابس")}
        //     >
        //       ملابس
        //     </DropdownItem>
        //     <DropdownItem
        //       key="products/3"
        //       textValue="منتجات منزلية"
        //       onClick={() => handleAction("products/3", "منتجات منزلية")}
        //     >
        //       منتجات منزلية
        //     </DropdownItem>
        //     <DropdownItem
        //       key="products/4"
        //       textValue="منتجات اوت دور (حدائق)"
        //       onClick={() => handleAction("products/4", "منتجات اوت دور (حدائق)")}
        //     >
        //       منتجات اوت دور (حدائق)
        //     </DropdownItem>
        //   </DropdownMenu>
        // </Dropdown>

        <div className="flex flex-wrap gap-6 items-center mb-3">

            <Button color="success"
                onClick={() => handleAction("products/3")}
            >
                منتجات منزلية
            </Button>
            
            <Button color="primary"
                onClick={() => handleAction("products/1")}
            >
                منوعات
            </Button>

            <Button color="secondary"
                onClick={() => handleAction("products/2", "ملابس")}
            >
                ملابس
            </Button>

            <Button color="default" onClick={() => handleAction("products/5")}>
                ستائر ومفروشات
            </Button>

            <Button color="warning"
                onClick={() => handleAction("products/4")}
            >
                منتجات اوت دور (حدائق)
            </Button>

        </div>


    );
};

export default DropdownCategory;
