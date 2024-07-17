import React from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";


const Dropdowncategory = ({ getCategory }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="faded">الفئات</Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Action event example" 
        onAction={(key) => getCategory(key)}
      >
        <DropdownItem key="products/1" textValue="مستحضرات التجميل">
        مستحضرات التجميل
        </DropdownItem>

        <DropdownItem key="products/2" textValue="ملابس">
        ملابس
        </DropdownItem>

        <DropdownItem key="products/3" textValue="منتجات منزلية">
        منتجات منزلية
        </DropdownItem>

        <DropdownItem key="products/4" textValue="منتجات اوت دور (حدائق)">
          منتجات اوت دور (حدائق)
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Dropdowncategory;
