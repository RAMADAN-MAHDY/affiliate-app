'use client'
import React from 'react';
import { FcHome, FcOnlineSupport, FcKindle } from "react-icons/fc";
import { TbShoppingCartExclamation } from "react-icons/tb";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FcMenu } from "react-icons/fc";
import { useState } from 'react';
import Link from 'next/link';

import styles from './FormComponent.module.css'// If using CSS modules

const Navebar = ({ para }) => {
    console.log(para)
    const [usercode, setUsercode] = useState(typeof window !== 'undefined' ? localStorage.getItem('codeorderaffilate') || '' : '');
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
                        <Link href="#" className='inline-flex items-center'>
                            <FcOnlineSupport className='w-[60px]' />
                            تواصل معنا
                        </Link>
                    </li>
                    <li className='flex'>
                        <Link className={`text-[#fff] font-bold inline-flex rounded-3xl items-center p-2`} href={`/card/${usercode}`}>
                            <FcKindle className='w-[60px]' />
                            تقرير المسوق</Link>
                    </li>
                   

                    {/*<button  className='bg-[#c59e44] rounded-xl h-[50px] text-[#fff] hover:text-[#f43030] hover:bg-[#ebd39d] mb-3' */}
                </ul>
            </nav>
            {usercode ? <button className='flex ' onClick={() => {
                        localStorage.removeItem("emailorderform");
                        localStorage.removeItem("codeorderaffilate");
                        location.reload();
                    }} >
                        <div className='inline-flex items-center'>
                            <RiLogoutBoxFill />
                            تسجيل خروج

                        </div>
                    </button> :

                        <button className='flex'>
                            <Link className={`text-[#fff] font-bold inline-flex  rounded-3xl items-center `} href="/login">
                                <RiLogoutBoxFill />
                                تسجيل دخول</Link>
                        </button>
                    }
        </header>


    );
};

export default Navebar;
