import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import Link from "next/link";
const DropdownComp = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
        className="bg-[#494948] text-[#fff] font-bold"
          variant="bordered" 
        >
          لوحة التحكم 
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Action event example" 
      >
        <DropdownItem textValue="الرئيسيه "><Link href='/adminahmed'  > الرئيسيه</Link></DropdownItem>
        <DropdownItem textValue="اضافة منتج"><Link href='/adminahmed/addproduct'  > أضافة منتج</Link></DropdownItem>
        <DropdownItem textValue="اضافة صور او اعلان "><Link href='/adminahmed/addImageToCarsolar'  > اضافة صور او اعلان </Link></DropdownItem>
        <DropdownItem textValue="تعديل   /   حذف "><Link href='/adminahmed/showPruduct'  > تعديل   /   حذف  </Link></DropdownItem>
       
      </DropdownMenu>
    </Dropdown>
  );
}
export default DropdownComp;