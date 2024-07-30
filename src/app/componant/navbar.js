'use client'
import React from 'react';
import { FcHome, FcOnlineSupport, FcKindle } from "react-icons/fc";
import { TbShoppingCartExclamation } from "react-icons/tb";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FcMenu } from "react-icons/fc";
import {Avatar , Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,} from "@nextui-org/react";
import { useState } from 'react';
import Link from 'next/link';

import styles from './FormComponent.module.css'// If using CSS modules

const Navebar = ({ para }) => {
    console.log(para)
    const [usercode, setUsercode] = useState(typeof window !== 'undefined' ? localStorage.getItem('codeorderaffilate') || '' : '');
    const [userEmail, setUserEmail] = useState(typeof window !== 'undefined' ? localStorage.getItem('emailorderaffilate') || '' : '');
    const [showinfoUser , setshowinfoUser ] = useState(false);

    const firstLetter = userEmail.charAt(0).toUpperCase()
    return (

        <header className={styles.header}>
            <input type="checkbox" className={styles.show_nav} id="menuToggle" />
            <label className={styles.label} htmlFor="menuToggle"><FcMenu className='text-[#fff]' />
            </label>

            {/* <div className={styles.headerContent}> */}
            <nav className={styles.contener_navbar}>
                <ul className={styles.ul}>
                    <li className='flex'>
                        <Link href="/" className='inline-flex items-center'>
                            <FcHome className='w-[50px] font-bold' />
                            <span>الرئيسيه</span>
                        </Link>
                    </li>
                    <li className='flex'>
                        <Link href={`/cart`} className='inline-flex items-center'>
                            <TbShoppingCartExclamation className='w-[30px] font-bold text-[#05fc05]' />
                            السله
                        </Link></li>

                    <li className='flex'>
                        <Link href="#" className='inline-flex items-center '>
                            <FcOnlineSupport className='w-[60px]' />
                             الدعم
                        </Link>
                    </li>
                    <li className='flex'>
                        <Link className={`text-[#fff] font-bold inline-flex rounded-3xl items-center p-2`} href={`/card/${usercode}`}>
                            <FcKindle className='w-[60px]' />
                            تقرير المسوق</Link>
                    </li>
                   
                    <li className='flex'>
                    {usercode ?
                    <>
    <Dropdown>
      <DropdownTrigger>
      <Avatar showFallback name={firstLetter} className='text-[24px] font-bold' isBordered color="success" src='hi.pravatar.cc/150?u=a042581f4e29026704' onClick={()=>{
                        setshowinfoUser(!showinfoUser)
                    }} /> 
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Action event example" 
      >
        {/* <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem> */}
        <DropdownItem  className="text-danger" color="danger">
        <button className='flex ' onClick={() => {
                        localStorage.removeItem("emailorderform");
                        localStorage.removeItem("codeorderaffilate");
                        location.reload();
                    }} >
                        <div className='inline-flex items-center'>
                            <RiLogoutBoxFill />
                            تسجيل خروج

                        </div>
                    </button> 
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>






                    </>
                    :

                        <button className='flex '>
                            <Link className={`text-[#0c0c0c] bg-[#070706] font-bold inline-flex  rounded-3xl items-center `} href="/login">
                                <RiLogoutBoxFill />
                                تسجيل دخول</Link>
                        </button>
                    }
                           
                    </li>
                    <li className='flex items-center justify-center'>

<img src='WhatsApp Image 2024-07-11 at 21.01.51_df437c70.png' alt="logo" className='w-[100px] h-[100px] mt-3' />

</li>


                
                </ul>
            </nav>

       


           
        </header>


    );
};

export default Navebar;
