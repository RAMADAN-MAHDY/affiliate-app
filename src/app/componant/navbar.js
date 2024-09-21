'use client'
import React from 'react';
import { FcHome, FcOnlineSupport, FcKindle } from "react-icons/fc";
import { TbShoppingCartExclamation } from "react-icons/tb";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FcMenu } from "react-icons/fc";
import {Avatar , Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,} from "@nextui-org/react";
import { useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Joyride from 'react-joyride';

import styles from './cssSheet/NavebarComponent.module.css'

const Navebar = ({ para }) => {
    // console.log(para)
    const products = useSelector((state) => state.prodectData.carts);

    const [usercode, setUsercode] = useState(typeof window !== 'undefined' ? localStorage.getItem('codeorderaffilate') || '' : '');
    const [userEmail, setUserEmail] = useState(typeof window !== 'undefined' ? localStorage.getItem('emailorderaffilate') || '' : '');
    const [showinfoUser , setshowinfoUser ] = useState(false);
    const [runTour, setRunTour] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const firstLetter = userEmail.charAt(0).toUpperCase()



    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isFirstVisit = localStorage.getItem('firstVisit');
            if (!isFirstVisit) {
                setRunTour(true);
                localStorage.setItem('firstVisit', 'true');
            }

            // التحقق من حجم الشاشة
            const handleResize = () => {
                setIsMobile(window.innerWidth <= 600);
            };

            handleResize(); // التحقق عند التحميل
            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        if (runTour && isMobile) {
            // فتح شريط التنقل تلقائيًا
            const menuToggle = document.getElementById('menuToggle');
            if (menuToggle && !menuToggle.checked) {
                menuToggle.checked = true;

                setTimeout(() => {
                    // تشغيل Joyride بعد فتح شريط التنقل
                    setRunTour(true);
                }, 500);
            }
        }
    }, [runTour, isMobile]);




      const steps = [
        {
            target: '.step-home',
            content: 'مرحبا بك! هذه هي الصفحة الرئيسية حيث يمكنك البدء.',
            disableBeacon: true,
        },
        {
            target: '.step-cart',
            content: 'هنا يمكنك رؤية السلة وإدارة المنتجات التي اخترتها.',
        },
        {
            target: '.step-support',
            content: 'يمكنك الوصول إلى الدعم هنا لأي استفسارات أو مساعدة.',
        },
        {
            target: '.step-affiliate',
            content: 'هذا هو تقرير المسوق حيث يمكنك متابعة طلباتك.',
        },
        {
            target: '.step-user',
            content: 'يمكنك إدارة حسابك هنا أو تسجيل الدخول.',
        },
    ];
    









    return (

        <header className={styles.header}>
  <Joyride
                steps={steps}
                run={runTour}
                continuous={true}
                showProgress={true}
                showSkipButton={true}
                styles={{
                    options: {
                        zIndex: 10000,
                    },
                }}
            />

            <input type="checkbox" className={styles.show_nav} id="menuToggle" />
            <label className={styles.label} htmlFor="menuToggle">
                <FcMenu color='red' />

            </label>

            {/* <div className={styles.headerContent}> */}
            <nav className={styles.contener_navbar}>
                <ul className={styles.ul}>
                    <li className='flex step-home' >
                        <Link href="/" className='inline-flex items-center'>
                            <FcHome className='w-[50px] font-bold' />
                            <span>الرئيسيه</span>
                        </Link>
                    </li>
                    <li className='flex step-cart'>
                        <Link href={`/cart`} className='inline-flex items-center '>

                        <div className='relative'>
                        { products.length > 0 && <span className='bg-[#ff0404] pl-1 pr-1 pb-2 w-4 h-4 rounded-full text-[11px] font-bold text-[#ffffff] fixed mt-[-7px]'>
                               { products.length}
                            </span> }
                            <TbShoppingCartExclamation className='w-[30px] font-bold text-[#05fc05]' />
                        </div>
                       
                           
                            السله
                           
                        </Link></li>

                    <li className='flex step-support'>
                        <Link href="/SupportPage" className='inline-flex items-center '>
                            <FcOnlineSupport className='w-[60px]' />
                             الدعم
                        </Link>
                    </li>
                    <li className='flex step-affiliate'>
    <Link className={`text-[#fff] font-bold inline-flex items-center p-2 pr-3 rounded-3xl whitespace-nowrap`} href={`/card/${usercode}`}>
        <FcKindle className='w-[60px] mr-1 ml-1' />
        تقرير المسوق
    </Link>
</li>

                   
                    <li className='flex step-user'>
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
                            <Link className={`font-bold inline-flex  rounded-3xl items-center text-[#000]`}
                            style={{ color: '#000' , backgroundColor:'rgb(119 255 11)',
                            
                             }}
                            href="/login">
                                <RiLogoutBoxFill className='mr-0 ml-2' />
                                تسجيل دخول</Link>
                        </button>
                    }
                    </li>
                    <li className='flex items-center justify-center'>

<img src='/WhatsApp Image 2024-07-11 at 21.01.51_df437c70.png' alt="logo" className='w-[100px] h-[100px] mt-3' loading="lazy"/>

</li>


                
                </ul>
            </nav>

       


           
        </header>


    );
};

export default Navebar;
