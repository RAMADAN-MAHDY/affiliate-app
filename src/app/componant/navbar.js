'use client'
import React from 'react';
import { FcHome, FcOnlineSupport } from "react-icons/fc";
import { TbShoppingCartExclamation } from "react-icons/tb";
import { FcMenu } from "react-icons/fc";
import { useState } from 'react';
import Link from 'next/link';

import styles from './FormComponent.module.css'// If using CSS modules

const Navebar = () => {
    const [usercode, setUsercode] = useState( typeof window !== 'undefined' ?localStorage.getItem('codeorderform') || '':'');
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
                            <FcHome className='w-[50px]' />
                            <span>الرئيسيه</span>
                        </Link>
                    </li>
                    <li className='flex'>
                        <Link href="/card/3" className='inline-flex items-center'>
                            <TbShoppingCartExclamation className='w-[30px] text-[#05fc05]' />
                            السله
                        </Link></li>

                    <li className='flex'>
                        <Link href="#" className='inline-flex items-center'>
                            <FcOnlineSupport className='w-[50px]' />
                            تواصل معنا
                        </Link>
                    </li>
                {usercode? <li className='' onClick={() => {
                        localStorage.removeItem("emailorderform");
                        localStorage.removeItem("codeorderform");
                        location.reload();
                    }}>تسجيل خروج</li> :
                    
                    <li className='flex'>
                 <Link className={`text-[#fff] font-bold inline-flex items-center rounded-3xl text-center `} href="/login">  
                   <span className='ml-10'>..</span>تسجيل دخول</Link>
              </li>
                }    
                    {/*<button  className='bg-[#c59e44] rounded-xl h-[50px] text-[#fff] hover:text-[#f43030] hover:bg-[#ebd39d] mb-3' */}
                </ul>
            </nav>
            {/* </div> */}
        </header>


    );
};

export default Navebar;
